import { expect, test, type Page } from '@playwright/test'

/** Section anchors in the order the approved design lays them out. */
const SECTION_IDS = [
  'ust',
  'giris',
  'kurumsal',
  'urunler',
  'ceviz',
  'urunlerimiz',
  'ticaret',
  'teklif',
] as const

/** Scrolls to the bottom in steps so every viewport-triggered reveal fires. */
async function scrollThroughPage(page: Page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = window.innerHeight * 0.8
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
    }
    window.scrollTo(0, 0)
  })
}

test.describe('homepage', () => {
  test('loads without console errors or failed requests', async ({ page }) => {
    const consoleErrors: string[] = []
    const failedRequests: string[] = []

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    page.on('response', (response) => {
      if (response.status() >= 400) {
        failedRequests.push(`${response.status()} ${response.url()}`)
      }
    })

    await page.goto('/tr')
    await scrollThroughPage(page)

    expect(consoleErrors, `console errors: ${consoleErrors.join(' | ')}`).toEqual([])
    expect(failedRequests, `failed requests: ${failedRequests.join(' | ')}`).toEqual([])
  })

  test('/ redirects to the default locale', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/tr$/)
    // Language-only by design: hreflang alternates must not geo-restrict the
    // page, and `localeTags` feeds both `<html lang>` and those alternates.
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
  })

  test('renders every section in the approved order', async ({ page }) => {
    await page.goto('/tr')

    const positions: number[] = []
    for (const id of SECTION_IDS) {
      const element = page.locator(`#${id}`)
      await expect(element).toBeAttached()
      const box = await element.boundingBox()
      expect(box, `#${id} has no layout box`).not.toBeNull()
      positions.push(
        await element.evaluate((el) => el.getBoundingClientRect().top + window.scrollY),
      )
    }

    const sorted = [...positions].sort((a, b) => a - b)
    expect(positions).toEqual(sorted)
  })

  test('exposes exactly one h1 and an ordered heading hierarchy', async ({ page }) => {
    await page.goto('/tr')

    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toContainText('Doğadan Seçilen Ürünler')
    expect(await page.locator('h2').count()).toBeGreaterThan(4)
  })

  test('content below the fold becomes visible', async ({ page }) => {
    await page.goto('/tr')
    await scrollThroughPage(page)

    // Guards the reveal system: a stuck observer must never leave copy invisible.
    await expect(page.locator('#kurumsal h2')).toBeVisible()
    await expect(page.locator('#teklif h2')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeAttached()
  })
})

test.describe('brand assets', () => {
  test('serves the official SVG logos unrasterised', async ({ page }) => {
    await page.goto('/tr')

    const logo = page.locator('header img').first()
    await expect(logo).toHaveAttribute('src', /raymar-logo-white-gold\.svg$/)

    // Aspect ratio of the supplied artwork — distortion would change this.
    const box = await logo.boundingBox()
    expect(box).not.toBeNull()
    if (box) {
      expect(box.width / box.height).toBeCloseTo(184.55231 / 68.514709, 1)
    }
  })
})
