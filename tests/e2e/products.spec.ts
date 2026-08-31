import { expect, test } from '@playwright/test'

/**
 * Client-requested order — see the note in `src/app/[locale]/page.tsx`. Card
 * DOM order is asserted directly against this list rather than derived from
 * `src/data/products.ts`, so a regression there fails a test instead of
 * silently reordering the storefront.
 */
const RANGE_PRODUCT_NAMES = [
  'Makadamya',
  'Pikan Cevizi',
  'Kabak Çekirdeği İçi',
  'Ay Çekirdeği İçi',
  'Çerezlik Ay Çekirdeği',
  'Antep Fıstığı',
] as const

test.describe('product range', () => {
  test('cards render in the client-requested order', async ({ page }) => {
    await page.goto('/tr')
    const names = await page.locator('#urunlerimiz article h3').allTextContents()
    expect(names).toEqual([...RANGE_PRODUCT_NAMES])
  })

  test('Ürünlerimiz precedes Ceviz Çeşitleri in document order', async ({ page }) => {
    await page.goto('/tr')
    const [rangeTop, walnutTop] = await Promise.all([
      page.locator('#urunlerimiz').evaluate((el) => el.getBoundingClientRect().top),
      page.locator('#ceviz').evaluate((el) => el.getBoundingClientRect().top),
    ])
    expect(rangeTop).toBeLessThan(walnutTop)
  })

  test('every product card carries a real photo and an accessible name', async ({
    page,
  }) => {
    /*
     * Pecan was the last card rendering `PendingMedia`, and this test used to
     * assert that empty state. It now has a photograph, so the assertion is
     * inverted: no card in the range may be left without one.
     *
     * `img:not([alt=""])` rather than a bare `img` count, because
     * `PendingMedia` draws its own brand emblem as a decorative `<img alt="">`
     * — a plain "has an img" check would have passed for the wrong reason and
     * hidden a missing photograph.
     */
    await page.goto('/tr')
    const cards = page.locator('#urunlerimiz article')
    const productPhoto = 'img:not([alt=""])'

    const count = await cards.count()
    expect(count).toBe(6)

    for (let index = 0; index < count; index += 1) {
      const card = cards.nth(index)
      const name = (await card.getByRole('heading', { level: 3 }).textContent())?.trim()
      await expect(card.locator(productPhoto), `${name} has no photo`).toHaveCount(1)
      await expect(
        card.locator(productPhoto),
        `${name}'s photo has an empty alt`,
      ).not.toHaveAttribute('alt', '')
    }

    // The placeholder must be gone from the section entirely, not just from
    // the pecan card.
    await expect(page.getByText('Ürün görseli hazırlanıyor')).toHaveCount(0)

    const pecanCard = cards.filter({ hasText: 'Pikan Cevizi' })
    await expect(
      pecanCard.getByRole('heading', { level: 3, name: 'Pikan Cevizi' }),
    ).toBeVisible()
    await expect(
      pecanCard.getByRole('link', { name: 'Pikan Cevizi için teklif talep et' }),
    ).toBeVisible()
  })
})

test.describe('portfolio section removal', () => {
  test('no remnant of the removed Ürün Portföyü section remains', async ({ page }) => {
    await page.goto('/tr')

    // `#urunler` was the portfolio mosaic's id; `#urunlerimiz` is the range
    // grid that replaced it. Confusing the two was the exact regression this
    // change introduced and then fixed (the hero CTA below).
    await expect(page.locator('#urunler')).toHaveCount(0)
    await expect(page.getByText('Ürün Portföyü')).toHaveCount(0)
  })

  test('hero CTA reaches the range section, not the removed portfolio', async ({
    page,
  }) => {
    await page.goto('/tr')
    const cta = page.locator('#giris').getByRole('link', { name: 'Ürünleri Keşfet' })
    await expect(cta).toHaveAttribute('href', '#urunlerimiz')
  })
})
