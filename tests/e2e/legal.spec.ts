import { expect, test } from '@playwright/test'

/**
 * The legal pages are the one part of the site with a compliance obligation
 * behind them, so the things asserted here are the things that make them count
 * as published: they resolve, they are reachable from the places that promise
 * them, and they are indexable.
 *
 * The slug list is duplicated from `src/lib/legal.ts` deliberately. The route
 * folders are named literally, so a rename there would otherwise 404 every
 * link on the site silently; a hardcoded copy is what makes that a failing
 * test rather than a broken link in production.
 */
const LEGAL = [
  { slug: 'kvkk-aydinlatma-metni', heading: 'KVKK Aydınlatma Metni' },
  { slug: 'gizlilik-politikasi', heading: 'Gizlilik Politikası' },
  { slug: 'cerez-politikasi', heading: 'Çerez Politikası' },
]

test.describe('legal pages', () => {
  for (const { slug, heading } of LEGAL) {
    test(`/tr/${slug} renders and is indexable`, async ({ page }) => {
      const response = await page.goto(`/tr/${slug}`)
      expect(response?.status()).toBe(200)

      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toHaveText(heading)

      // A legal document nobody can find is not published. These must stay
      // indexable even though they carry no marketing value.
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new RegExp(`/tr/${slug}$`),
      )
      // The layout sets a site-wide robots directive, so the tag is present on
      // every page; what matters is that these pages are not excluded from it.
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        /^index, follow/,
      )

      /*
       * hreflang, which these pages lost silently.
       *
       * A page-level `alternates` in Next REPLACES the layout's rather than
       * merging with it, so returning only `{ canonical }` — which all three
       * of these pages did — dropped the languages map and emitted no
       * hreflang at all. Invisible while Turkish was the only locale; a real
       * defect once the English documents shipped, because the two are
       * near-identical texts with nothing declaring them translations.
       * Measured on the live site before it was fixed.
       */
      for (const [lang, expected] of [
        ['tr', `/tr/${slug}`],
        ['en', `/en/${slug}`],
        ['x-default', `/tr/${slug}`],
      ]) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
          `/tr/${slug} is missing hreflang=${lang}`,
        ).toHaveAttribute('href', new RegExp(`${expected}$`))
      }

      // Substantive text, not a stub: every page has multiple clauses.
      expect(await page.locator('main h2').count()).toBeGreaterThan(2)
    })
  }

  test('the footer links to all three from the homepage', async ({ page }) => {
    await page.goto('/tr')

    for (const { slug, heading } of LEGAL) {
      const link = page.locator('footer').getByRole('link', { name: heading })
      await expect(link).toHaveAttribute('href', `/tr/${slug}`)
    }
  })

  test('the consent line links to the documents it refers to', async ({ page }) => {
    await page.goto('/tr')

    const consentLabel = page.locator('#teklif label').filter({ hasText: 'KVKK' })
    const kvkk = consentLabel.getByRole('link', { name: 'KVKK Aydınlatma Metni' })

    await expect(kvkk).toHaveAttribute('href', '/tr/kvkk-aydinlatma-metni')
    // New tab, so a part-filled form is never discarded to read the policy.
    await expect(kvkk).toHaveAttribute('target', '_blank')
    await expect(kvkk).toHaveAttribute('rel', /noopener/)
  })

  test('reading the policy from the form does not toggle consent', async ({ page }) => {
    await page.goto('/tr')

    const consent = page.locator('#teklif').getByRole('checkbox')
    await expect(consent).not.toBeChecked()

    // The links sit inside the wrapping <label>, so without stopPropagation a
    // click here would forward to the checkbox and consent on the visitor's
    // behalf while they were only trying to read the document.
    await page
      .locator('#teklif label')
      .filter({ hasText: 'KVKK' })
      .getByRole('link', { name: 'KVKK Aydınlatma Metni' })
      .click({ modifiers: ['Shift'] })

    await expect(consent).not.toBeChecked()
  })

  test('the header still navigates home from a legal page', async ({
    page,
  }, testInfo) => {
    test.skip(
      (testInfo.project.use.viewport?.width ?? 0) < 1080,
      'desktop navigation only',
    )

    await page.goto('/tr/kvkk-aydinlatma-metni')

    // Bare `#urunlerimiz` fragments would resolve against this document and do
    // nothing; the links are locale-absolute so they navigate home and scroll.
    await page
      .getByRole('navigation', { name: 'Ana menü' })
      .getByRole('link', { name: 'Ürünler' })
      .click()

    await expect(page).toHaveURL(/\/tr#urunlerimiz$/)
    await expect(page.locator('#urunlerimiz')).toBeInViewport({ ratio: 0.05 })
  })

  test('every footer link works from a legal page, not just the header', async ({
    page,
  }) => {
    await page.goto('/tr/gizlilik-politikasi')

    /*
     * The regression this guards, found in the built output rather than in a
     * browser: the footer took no `locale`, so it rendered its section links
     * as bare `#hakkimizda` / `#urunlerimiz` fragments. On the homepage those
     * work; on a legal document they resolve against a page that has no such
     * id, so ten footer links did nothing at all on each of the three legal
     * pages. The header had been fixed for exactly this and the footer was
     * missed — and the whole suite stayed green, because nothing clicked the
     * footer from anywhere but the homepage.
     */
    const links = page.locator('footer a[href^="#"]')
    expect(
      await links.count(),
      'footer must not emit bare fragments off the homepage',
    ).toBe(0)

    // And the links that do exist have to reach the homepage section.
    const products = page.locator('footer').getByRole('link', { name: 'Makadamya' })
    await expect(products).toHaveAttribute('href', '/tr#urunlerimiz')

    await products.click()
    await expect(page).toHaveURL(/\/tr#urunlerimiz$/)
    await expect(page.locator('#urunlerimiz')).toBeInViewport({ ratio: 0.05 })
  })

  test('all three appear in the sitemap', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()

    for (const { slug } of LEGAL) {
      expect(xml).toContain(`/tr/${slug}`)
    }
  })
})
