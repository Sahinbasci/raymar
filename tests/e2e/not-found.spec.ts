import { expect, test } from '@playwright/test'

/**
 * `global-not-found.tsx` renders for every URL that matches no route — see
 * that file for why it has to be a `global-not-found` rather than a
 * route-level `not-found`. Asserting the status code alone would not catch the
 * regression that motivated it: Next's built-in English error page, with no
 * `lang` attribute and no branding, also returns 404. This exercises the
 * rendered document.
 *
 * `/en` used to be one of the paths checked here, because English was
 * unpublished. It is a real page now, so using it would assert the opposite of
 * what the site does — the paths below are ones that match no route in either
 * locale, including a plausible-looking one under a published locale.
 */
test.describe('global 404', () => {
  for (const path of ['/does-not-exist', '/fr']) {
    test(`${path} renders the branded document`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(404)

      await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page.locator('h1')).toHaveText('Aradığınız sayfa bulunamadı.')

      const cta = page.getByRole('link', { name: 'Ana Sayfaya Dön' })
      await expect(cta).toHaveAttribute('href', '/tr')
      await cta.click()
      await expect(page).toHaveURL(/\/tr$/)
    })
  }

  /*
   * One document serves both locales — a static export has no request-time
   * branch to pick a language with. The document ships in Turkish and a short
   * inline script rewrites it when the path says the visitor was reading
   * English. Before it, an English buyer who mistyped an `/en/...` URL got a
   * Turkish error page and a link into the Turkish homepage.
   */
  test('an /en URL that matches no route answers in English', async ({ page }) => {
    const response = await page.goto('/en/does-not-exist')
    expect(response?.status()).toBe(404)

    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('h1')).toHaveText(
      'The page you are looking for could not be found.',
    )
    await expect(page).toHaveTitle(/Page not found/i)

    const cta = page.getByRole('link', { name: 'Back to Home' })
    await expect(cta).toHaveAttribute('href', '/en')
    await cta.click()
    await expect(page).toHaveURL(/\/en$/)
  })
})
