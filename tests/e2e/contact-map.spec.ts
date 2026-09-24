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
  /*
   * Nothing reaches Google until the visitor asks.
   *
   * The embed used to render unconditionally, which meant Google could set
   * cookies in a browser that had done nothing but open the page — the reason
   * a site either gates the map or carries a consent banner. This asserts the
   * gate from the network up: no request to Google while the section is on
   * screen, and no iframe in the DOM to make one.
   */
  test('requests nothing from Google before the visitor asks', async ({ page }) => {
    const requests: string[] = []
    page.on('request', (request) => {
      if (/google\.com|gstatic\.com|googleapis\.com/.test(request.url())) {
        requests.push(request.url())
      }
    })

    await page.goto('/tr')
    await page.locator('#teklif').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1500)

    expect(requests, `requested: ${requests.join(', ')}`).toEqual([])
    await expect(page.locator('#teklif iframe')).toHaveCount(0)

    // And the visitor is told what pressing it does, rather than being asked
    // to consent to something unnamed.
    const button = page.locator('#teklif').getByRole('button', { name: 'Haritayı Yükle' })
    await expect(button).toBeVisible()
    await expect(page.locator('#teklif')).toContainText('Google Haritalar’dan yüklenir')
  })

  test('loads the embed once the button is pressed', async ({ page }) => {
    await page.goto('/tr')
    const mapRequest = page.waitForRequest(/^https:\/\/www\.google\.com\/maps/)

    await page.locator('#teklif').getByRole('button', { name: 'Haritayı Yükle' }).click()

    const map = page.locator(
      '#teklif iframe[title="Raymar Nuts konumu — Google Haritalar"]',
    )
    await expect(map).toBeAttached()
    await expect(map).toHaveAttribute('src', EXPECTED_EMBED_SRC)
    await mapRequest
  })

  test('the query geocodes the address, not the company name', async ({ page }) => {
    await page.goto('/tr')
    await page.locator('#teklif').getByRole('button', { name: 'Haritayı Yükle' }).click()
    const src = await page.locator('#teklif iframe').first().getAttribute('src')

    // The regression this guards: with "Marex Dış Tic. Ltd. Şti." leading the
    // query, Maps resolved a different company's listing and pinned the wrong
    // building. The query must carry the street address and nothing else.
    expect(decodeURIComponent(src ?? '')).not.toMatch(/Marex|Ltd|Şti/i)
    expect(decodeURIComponent(src ?? '')).toContain('Vadi Cad. No:108')
  })

  test('the English page offers the same gate in English', async ({ page }) => {
    await page.goto('/en')
    await expect(page.locator('#teklif iframe')).toHaveCount(0)
    await page.locator('#teklif').getByRole('button', { name: 'Load the Map' }).click()
    await expect(
      page.locator('#teklif iframe[title="Raymar Nuts location — Google Maps"]'),
    ).toBeAttached()
  })
})
