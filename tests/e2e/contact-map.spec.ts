import { expect, test } from '@playwright/test'

/**
 * Duplicated from `quote.mapQuery` in `src/content/tr.ts` deliberately — the
 * same pattern `legal.spec.ts` uses for its slug list. A hardcoded copy turns a
 * silently-wrong map query into a failing test instead of a page that quietly
 * points at the wrong location.
 *
 * The company name is absent on purpose, and the test below asserts that. With
 * the legal name leading the query, Maps matched a similarly named but
 * unrelated business nearby and the contact section pinned the wrong building —
 * a real defect found on the live page, not a hypothetical.
 */
const MAP_QUERY =
  'Oruçreis Mah. Vadi Cad. No:108, İstanbul Ticaret Sarayı, 34235 Giyimkent, Esenler, İstanbul'
const EXPECTED_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  MAP_QUERY,
)}&output=embed`

test.describe('contact map', () => {
  test('the Google Maps embed is present without any click to reveal it', async ({
    page,
  }) => {
    await page.goto('/tr')

    // Unconditional by explicit decision (see contact-map.tsx's own doc
    // comment): the iframe must already be in the DOM on first load, not
    // behind a "load map" button — that is also why the cookie and privacy
    // policies disclose Google as an active third party rather than a
    // hypothetical one.
    const map = page.locator(
      '#teklif iframe[title="Raymar Nuts konumu — Google Haritalar"]',
    )
    await expect(map).toBeAttached()
    await expect(map).toHaveAttribute('src', EXPECTED_EMBED_SRC)
    await expect(map).toHaveAttribute('loading', 'lazy')

    await expect(
      page.locator('#teklif').getByRole('button', { name: /harita/i }),
    ).toHaveCount(0)
  })

  test('the query geocodes the address, not the company name', async ({ page }) => {
    await page.goto('/tr')
    const src = await page.locator('#teklif iframe').first().getAttribute('src')

    // The regression this guards: with "Marex Dış Tic. Ltd. Şti." leading the
    // query, Maps resolved a different company's listing and pinned the wrong
    // building. The query must carry the street address and nothing else.
    expect(decodeURIComponent(src ?? '')).not.toMatch(/Marex|Ltd|Şti/i)
    expect(decodeURIComponent(src ?? '')).toContain('Vadi Cad. No:108')
  })

  test('the embed actually requests Google once scrolled into view', async ({ page }) => {
    const mapRequest = page.waitForRequest(/^https:\/\/www\.google\.com\/maps/)

    await page.goto('/tr')
    await page.locator('#teklif iframe').scrollIntoViewIfNeeded()

    await mapRequest
  })
})
