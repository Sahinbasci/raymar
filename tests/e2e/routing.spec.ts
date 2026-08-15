import { expect, test } from '@playwright/test'

/**
 * `src/proxy.ts` carries two rules with no prior coverage, both load-bearing:
 *
 * - Case canonicalisation. Next matches route segments case-insensitively, so
 *   `/tR` would otherwise reach the `[locale]` route, fail `dynamicParams:
 *   false`, and write a 404 into the file-system prerender cache under a key
 *   that — on a case-insensitive filesystem — IS the entry for `/tr`. One
 *   anonymous request is enough to serve a blank noindexed homepage to every
 *   visitor from the next restart onward.
 * - `/` uses a 307, not a 308, specifically so it stays correctable once a
 *   second locale ships. A permanent redirect here would already be cached in
 *   returning visitors' browsers.
 *
 * `maxRedirects: 0` is what makes the status and `Location` observable at
 * all — the default `request` fixture follows redirects silently.
 */
test.describe('locale routing', () => {
  test('/tR is canonicalised to /tr before Next can route it', async ({ request }) => {
    const response = await request.get('/tR', { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers()['location']).toMatch(/\/tr$/)
  })

  test('/ redirects to the default locale, provisionally', async ({ request }) => {
    const response = await request.get('/', { maxRedirects: 0 })
    // Deliberately 307, not 308 — see src/proxy.ts.
    expect(response.status()).toBe(307)
    expect(response.headers()['location']).toMatch(/\/tr$/)
  })
})
