import { expect, test } from '@playwright/test'

const DESKTOP = ['desktop-1440', 'laptop-1280']

test.describe('desktop navigation', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1080, 'desktop layout only')

  test('nav links resolve to their sections', async ({ page }) => {
    await page.goto('/tr')

    const nav = page.getByRole('navigation', { name: 'Ana menü' })
    await expect(nav).toBeVisible()

    await nav.getByRole('link', { name: 'Ürünler' }).click()
    await expect(page).toHaveURL(/#urunler$/)

    // `scroll-behavior: smooth` animates, so poll rather than read once.
    await expect
      .poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 })
      .toBeGreaterThan(0)
    await expect(page.locator('#urunler')).toBeInViewport({ ratio: 0.05 })
  })

  test('header inverts once scrolled past the hero', async ({ page }) => {
    await page.goto('/tr')

    const header = page.locator('header')
    await expect(header).toHaveAttribute('data-solid', 'false')

    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, 600)
    })

    await expect(header).toHaveAttribute('data-solid', 'true')

    // The green wordmark must take over so the logo stays legible on ivory.
    const greenLogo = page.locator('header img[src*="green-gold"]')
    await expect(greenLogo).toHaveCSS('opacity', '1')
  })

  test('primary CTA reaches the quotation form', async ({ page }) => {
    await page.goto('/tr')
    await page
      .getByRole('link', { name: /Teklif Talep Et/i })
      .first()
      .click()
    await expect(page.locator('#teklif')).toBeInViewport({ ratio: 0.05 })
  })
})

test.describe('mobile navigation', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1080, 'narrow layout only')

  test('drawer opens, traps focus, and closes on Escape', async ({ page }) => {
    await page.goto('/tr')

    const burger = page.getByRole('button', { name: 'Menüyü aç' })
    await expect(burger).toBeVisible()

    // The desktop nav must be genuinely absent, not merely visually hidden.
    await expect(page.getByRole('navigation', { name: 'Ana menü' })).toBeHidden()

    await burger.click()
    const drawer = page.getByRole('dialog')
    await expect(drawer).toBeVisible()

    // Native <dialog> modality: the page behind must be inert.
    const headerReachable = await page
      .locator('header a[aria-label]')
      .first()
      .evaluate((el) => el.closest('dialog') !== null || el.matches(':disabled'))
      .catch(() => false)
    expect(headerReachable).toBe(false)

    await page.keyboard.press('Tab')
    const focusInsideDrawer = await page.evaluate(
      () => document.activeElement?.closest('dialog') !== null,
    )
    expect(focusInsideDrawer).toBe(true)

    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
  })

  test('drawer locks background scroll and restores it on close', async ({ page }) => {
    await page.goto('/tr')
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, 400)
    })

    await page.getByRole('button', { name: 'Menüyü aç' }).click()
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

    await page.getByRole('button', { name: 'Menüyü kapat' }).click()
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

    // The reading position must survive the lock.
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(300)
  })

  test('drawer link navigates and closes the drawer', async ({ page }) => {
    await page.goto('/tr')
    await page.getByRole('button', { name: 'Menüyü aç' }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Ürünler' }).click()
    await expect(page.getByRole('dialog')).toBeHidden()
    await expect(page).toHaveURL(/#urunler$/)
  })
})

test.describe('language switch', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1080, 'desktop layout only')

  test('marks the unpublished locale as disabled rather than linking to it', async ({
    page,
  }) => {
    await page.goto('/tr')
    // `exact` matters: Playwright matches accessible names as a
    // case-insensitive substring by default, and every product card now
    // carries an aria-label — "Bal Rengi Ceviz İçi için teklif talep et"
    // contains "en", so a loose match resolves to two elements.
    const en = page.getByRole('button', { name: 'EN', exact: true })
    await expect(en).toHaveAttribute('aria-disabled', 'true')
  })
})

test.describe('unpublished locale', () => {
  test('/en is not served', async ({ page }) => {
    const response = await page.goto('/en')
    expect(response?.status()).toBe(404)
  })
})

export { DESKTOP }
