import { expect, test } from '@playwright/test'

/**
 * `global-not-found.tsx` renders for every URL that matches no route — see
 * that file for why it has to be a `global-not-found` rather than a
 * route-level `not-found`. The sibling test in navigation.spec.ts
 * ("/en is not served") only asserts the status code; the regression that
 * motivated `global-not-found` in the first place — Next's built-in English
 * error page, no `lang` attribute, no branding — would still return 404 and
 * pass that assertion. This exercises the rendered document itself.
 */
test.describe('global 404', () => {
  for (const path of ['/en', '/does-not-exist']) {
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
})
