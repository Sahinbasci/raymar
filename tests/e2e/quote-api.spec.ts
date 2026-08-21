import { expect, test } from '@playwright/test'

/**
 * The endpoint's own contract, exercised against the running route rather than
 * through the form.
 *
 * The rule being protected is the one the old mock broke: a request is only
 * ever reported as accepted once it has actually been delivered. The test
 * environment has no delivery configured, which is exactly the interesting
 * case — an unconfigured deployment must refuse rather than quietly swallow.
 *
 * Only one project runs these. They assert server behaviour, which cannot vary
 * by browser engine, and the rate limiter is per-process shared state — running
 * them from every project at once had them competing for the same budget and
 * failing at random. The gate is on the project *name*: three projects share a
 * 1440px viewport, so a width check does not narrow it to one.
 *
 * Each test also declares its own `x-forwarded-for`, which is what the route
 * keys the limiter on. Without that, tests would consume each other's budget
 * and the suite would depend on execution order.
 */
const VALID = {
  name: 'Test Kullanıcı',
  company: 'Test A.Ş.',
  country: 'Türkiye',
  email: 'test@firma.com',
  phone: '',
  product: 'Fındık',
  message: 'Numune talebi.',
  consent: true,
  website: '',
}

/** A distinct caller per test, so no test spends another's rate-limit budget. */
function asCaller(id: string) {
  return { 'x-forwarded-for': `203.0.113.${id}` }
}

test.describe('quote endpoint', () => {
  // The describe-level `test.skip(condition, …)` callback receives only the
  // fixtures, not `testInfo`, so the project name is read from the config
  // instead. `test.info()` is available inside a running test.
  test.beforeEach(() => {
    test.skip(
      test.info().project.name !== 'desktop-1440',
      'server contract; runs once on one project',
    )
  })

  test('refuses rather than faking success when delivery is unconfigured', async ({
    request,
  }) => {
    const response = await request.post('/api/quote', {
      headers: asCaller('10'),
      data: VALID,
    })

    // 503, not 200. A visitor told the message failed can phone instead; one
    // told it succeeded cannot.
    expect(response.status()).toBe(503)
    expect((await response.json()).ok).toBe(false)
  })

  test('rejects incomplete and malformed submissions', async ({ request }) => {
    const cases = [
      { label: 'missing name', data: { ...VALID, name: '' } },
      { label: 'missing company', data: { ...VALID, company: '' } },
      { label: 'missing message', data: { ...VALID, message: '' } },
      { label: 'malformed email', data: { ...VALID, email: 'not-an-email' } },
      { label: 'no consent', data: { ...VALID, consent: false } },
      { label: 'oversized message', data: { ...VALID, message: 'x'.repeat(5000) } },
    ]

    // One caller each: six rejections from one IP would trip the limiter and
    // turn a validation test into a rate-limit test.
    for (const [index, { label, data }] of cases.entries()) {
      const response = await request.post('/api/quote', {
        headers: asCaller(`2${index}`),
        data,
      })
      expect(response.status(), label).toBe(400)
    }
  })

  test('validation is not a field-level oracle', async ({ request }) => {
    const response = await request.post('/api/quote', {
      headers: asCaller('30'),
      data: { ...VALID, email: 'nope' },
    })

    // The client already knows which field it failed to fill; echoing the
    // reason back only helps someone probing the endpoint.
    expect(await response.json()).toEqual({ ok: false })
  })

  test('a filled honeypot is accepted and dropped, not rejected', async ({ request }) => {
    const response = await request.post('/api/quote', {
      headers: asCaller('40'),
      data: { ...VALID, website: 'https://spam.example' },
    })

    // 200 even though nothing is delivered: a bot that gets a 400 learns the
    // field is checked and drops it next time.
    expect(response.status()).toBe(200)
    expect((await response.json()).ok).toBe(true)
  })

  test('rejects a body that is not JSON', async ({ request }) => {
    const response = await request.post('/api/quote', {
      headers: { ...asCaller('50'), 'Content-Type': 'application/json' },
      data: 'not json at all',
    })

    expect(response.status()).toBe(400)
  })

  test('only POST is allowed', async ({ request }) => {
    expect((await request.get('/api/quote')).status()).toBe(405)
    expect((await request.delete('/api/quote')).status()).toBe(405)
  })

  test('rate-limits a caller that floods the endpoint', async ({ request }) => {
    const headers = asCaller('60')
    const statuses: number[] = []

    for (let i = 0; i < 8; i += 1) {
      statuses.push((await request.post('/api/quote', { headers, data: VALID })).status())
    }

    // The limiter must engage, and it must not engage on the first attempt —
    // a form that rejects a visitor's first submission is worse than no limit.
    expect(statuses[0]).not.toBe(429)
    expect(statuses).toContain(429)
  })
})
