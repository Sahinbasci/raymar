import { expect, test } from '@playwright/test'

/**
 * The quotation endpoint's own contract, exercised directly rather than through
 * the form.
 *
 * The rule being protected is the one the original client-side mock broke: a
 * request is only ever reported as accepted once it has actually been delivered.
 * An unconfigured deployment is exactly the interesting case — it must refuse
 * loudly rather than quietly swallow the enquiry.
 *
 * ── WHY THESE SKIP BY DEFAULT ────────────────────────────────────────────────
 *
 * The endpoint moved from a Next.js route handler to `public/teklif-gonder.php`
 * when this site became a static export for shared LiteSpeed/Apache hosting —
 * `output: 'export'` drops API routes entirely, so there is no Node endpoint
 * left to test. The Playwright web server serves the static export, which has
 * no PHP interpreter, so these cannot run there.
 *
 * They are kept, and kept executable, because the contract did not change with
 * the language — only the runtime did. Point them at any host that runs the PHP
 * and they verify it:
 *
 *   QUOTE_ENDPOINT_ORIGIN=https://raymarnuts.com pnpm test quote-api
 *   QUOTE_ENDPOINT_ORIGIN=http://localhost:8000 pnpm test quote-api   # php -S
 *
 * Without that variable every test here skips with a message saying so, rather
 * than passing vacuously — a green suite must never imply this endpoint was
 * checked when it was not.
 *
 * Each test declares its own `x-forwarded-for`. That header is only honoured
 * when `REMOTE_ADDR` is a loopback or private address — which is what `php -S`
 * on localhost looks like, and what a reverse proxy in front of the host looks
 * like. It is deliberately ignored otherwise: trusting a caller-supplied
 * header meant the rate limit could be bypassed by rotating one value. So
 * against a local PHP server the tests each get their own budget, and against
 * a public host they share one — run them there one at a time.
 */

/** Set to a host that executes PHP to enable this file. */
const ORIGIN = process.env.QUOTE_ENDPOINT_ORIGIN
const ENDPOINT = '/teklif-gonder.php'

const VALID = {
  name: 'Test Kullanıcı',
  company: 'Test A.Ş.',
  country: 'Türkiye',
  email: 'test@firma.com',
  phone: '',
  product: 'Antep Fıstığı',
  message: 'Numune talebi.',
  consent: true,
  website: '',
}

/** A distinct caller per test, so no test spends another's rate-limit budget. */
function asCaller(id: string) {
  return { 'x-forwarded-for': `203.0.113.${id}` }
}

function url(): string {
  return `${(ORIGIN ?? '').replace(/\/+$/, '')}${ENDPOINT}`
}

test.describe('quote endpoint (PHP)', () => {
  test.beforeEach(() => {
    test.skip(
      !ORIGIN,
      'set QUOTE_ENDPOINT_ORIGIN to a host that runs PHP to exercise the endpoint',
    )
    // Server behaviour cannot vary by browser engine, and the rate limiter is
    // shared state — running these from every project at once had them
    // competing for the same budget and failing at random.
    test.skip(
      test.info().project.name !== 'desktop-1440',
      'server contract; runs once on one project',
    )
  })

  test('refuses rather than faking success when delivery is unconfigured', async ({
    request,
  }) => {
    const response = await request.post(url(), { headers: asCaller('10'), data: VALID })

    // 503, not 200. A visitor told the message failed can phone instead; one
    // told it succeeded cannot. If the deployment HAS been configured with a
    // real recipient this returns 200 — which is also correct, and why the
    // assertion accepts either rather than demanding a broken deployment.
    expect([200, 503]).toContain(response.status())
    const body = await response.json()
    expect(body.ok).toBe(response.status() === 200)
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
      const response = await request.post(url(), {
        headers: asCaller(`2${index}`),
        data,
      })
      expect(response.status(), label).toBe(400)
    }
  })

  test('validation is not a field-level oracle', async ({ request }) => {
    const response = await request.post(url(), {
      headers: asCaller('30'),
      data: { ...VALID, email: 'nope' },
    })

    // The client already knows which field it failed to fill; echoing the
    // reason back only helps someone probing the endpoint.
    expect(await response.json()).toEqual({ ok: false })
  })

  test('a filled honeypot is accepted and dropped, not rejected', async ({ request }) => {
    const response = await request.post(url(), {
      headers: asCaller('40'),
      data: { ...VALID, website: 'https://spam.example' },
    })

    // 200 even though nothing is delivered: a bot that gets a 400 learns the
    // field is checked and drops it next time.
    expect(response.status()).toBe(200)
    expect((await response.json()).ok).toBe(true)
  })

  test('rejects a body that is not JSON', async ({ request }) => {
    const response = await request.post(url(), {
      headers: { ...asCaller('50'), 'Content-Type': 'application/json' },
      data: 'not json at all',
    })

    expect(response.status()).toBe(400)
  })

  test('only POST is allowed', async ({ request }) => {
    expect((await request.get(url())).status()).toBe(405)
    expect((await request.delete(url())).status()).toBe(405)
  })

  test('rate-limits a caller that floods the endpoint', async ({ request }) => {
    const headers = asCaller('60')
    const statuses: number[] = []

    for (let i = 0; i < 8; i += 1) {
      statuses.push((await request.post(url(), { headers, data: VALID })).status())
    }

    // The limiter must engage, and it must not engage on the first attempt —
    // a form that rejects a visitor's first submission is worse than no limit.
    expect(statuses[0]).not.toBe(429)
    expect(statuses).toContain(429)
  })
})
