import { expect, test } from '@playwright/test'

/**
 * Two redirect rules with no prior coverage, both load-bearing. They used to
 * live in `src/proxy.ts`; since the site became a static export they live in
 * `public/.htaccess`, and `scripts/serve-static.mjs` reproduces them so this
 * suite still exercises them.
 *
 * - Case canonicalisation. On the previous host this prevented a Next
 *   prerender-cache entry being poisoned by a differently-cased request. Static
 *   files cannot be poisoned that way, but `/TR` was a working URL and a Linux
 *   filesystem is case-sensitive, so without the rule it would start 404ing.
 * - `/` uses a 307, not a 308, specifically so it stays correctable once a
 *   second locale ships. A permanent redirect here would already be cached in
 *   returning visitors' browsers.
 *
 * `maxRedirects: 0` is what makes the status and `Location` observable at
 * all — the default `request` fixture follows redirects silently.
 */
test.describe('locale routing', () => {
  test('/tR is canonicalised to /tr', async ({ request }) => {
    const response = await request.get('/tR', { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(response.headers()['location']).toMatch(/\/tr$/)
  })

  test('/ redirects to the default locale, provisionally', async ({ request }) => {
    const response = await request.get('/', { maxRedirects: 0 })
    // Deliberately 307, not 308 — see the comment on the rule in
    // `public/.htaccess`.
    expect(response.status()).toBe(307)
    expect(response.headers()['location']).toMatch(/\/tr$/)
  })

  test('the security headers survive the move to .htaccess', async ({ request }) => {
    // These used to come from `next.config.ts`, which a static export never
    // consults. Measured before the move: an export served without `.htaccess`
    // returned none of them. This is the regression guard for that.
    const headers = (await request.get('/tr')).headers()

    expect(headers['content-security-policy']).toContain("default-src 'self'")
    expect(headers['content-security-policy']).toContain(
      'frame-src https://www.google.com',
    )
    expect(headers['x-frame-options']).toBe('DENY')
    expect(headers['x-content-type-options']).toBe('nosniff')
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  })

  test("the hosting provider's placeholder page is gone for good", async ({
    request,
  }) => {
    /*
     * The domain was parked on Natro before launch, and Natro's own landing
     * page was still being served from `/index.html` afterwards — 200, titled
     * as a hosting advertisement, on this company's domain. Deleting the file
     * fixed the symptom; a permanent redirect is what stops a re-uploaded
     * template, or a crawler holding the old URL, from ever seeing it again.
     */
    for (const path of ['/index.html', '/index.htm']) {
      const response = await request.get(path, { maxRedirects: 0 })
      expect(response.status(), path).toBe(301)
      expect(response.headers()['location']).toMatch(/\/tr$/)
    }
  })

  test('the router can fetch its own prefetch payload', async ({ request }) => {
    /*
     * Regression guard, from a bug measured on the live site rather than here.
     *
     * `.htaccess` denies the image optimizer's `manifest.json`, and an earlier
     * version of that rule also matched `__next.*.txt` — on the reasoning that
     * RSC payloads are build metadata. They are not: the App Router requests
     * `/tr/__next._tree.txt?_rsc=…` itself to prefetch routes, so the rule put
     * a 403 in every visitor's console and dropped client-side navigation back
     * to full page loads. Nothing caught it, because the harness implemented no
     * deny rule at all and so could not reproduce a wrong one.
     */
    expect((await request.get('/tr/__next._tree.txt')).status()).toBe(200)

    // The half that should stay denied: a build input nothing requests.
    expect((await request.get('/_img/manifest.json')).status()).toBe(403)
  })
})
