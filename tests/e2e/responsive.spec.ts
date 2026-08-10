import { expect, test } from '@playwright/test'

/**
 * The full width ladder is checked in a single spec run rather than as
 * Playwright projects, so intermediate widths — where layouts usually break —
 * are covered without multiplying the project matrix.
 */
const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1728, 1920]

test.describe('responsive integrity', () => {
  test.skip(
    ({ viewport }) => viewport?.width !== 1440,
    'runs once, drives its own widths',
  )

  test('no horizontal overflow at any supported width', async ({ page }) => {
    await page.goto('/tr')

    const offenders: string[] = []

    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto'
        window.scrollTo(0, 0)
      })

      const result = await page.evaluate(() => {
        const doc = document.documentElement
        const overflowing = doc.scrollWidth > doc.clientWidth
        if (!overflowing) return null

        // Identify the widest offending element to make failures actionable.
        const culprits = [...document.querySelectorAll<HTMLElement>('body *')]
          .filter((el) => {
            const rect = el.getBoundingClientRect()
            return rect.right > doc.clientWidth + 1 || rect.left < -1
          })
          .slice(0, 3)
          .map((el) => `${el.tagName}.${String(el.className).slice(0, 40)}`)

        return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, culprits }
      })

      if (result) {
        offenders.push(
          `${width}px: scrollWidth ${result.scrollWidth} > ${result.clientWidth} — ${result.culprits.join(', ')}`,
        )
      }
    }

    expect(offenders, offenders.join('\n')).toEqual([])
  })

  test('hero keeps a usable height across the width ladder', async ({ page }) => {
    await page.goto('/tr')

    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      const box = await page.locator('#ust').boundingBox()
      expect(box, `hero missing at ${width}px`).not.toBeNull()
      if (box) {
        expect(box.height, `hero collapsed at ${width}px`).toBeGreaterThan(400)
        expect(box.height, `hero overgrown at ${width}px`).toBeLessThanOrEqual(1121)
      }
    }
  })

  test('hero cue stays above the fold on short windows', async ({ page }) => {
    await page.goto('/tr')

    for (const height of [420, 560, 680, 900]) {
      await page.setViewportSize({ width: 1280, height })
      const cue = page.locator('#ust').getByRole('link', { name: /Ürünleri Keşfet/ })
      const box = await cue.boundingBox()
      expect(box, `cue missing at ${height}px tall`).not.toBeNull()
      if (box) {
        expect(
          box.y + box.height,
          `cue below fold at ${height}px tall`,
        ).toBeLessThanOrEqual(height + 1)
      }
    }
  })

  test('touch targets in the mobile drawer are large enough', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/tr')
    await page.getByRole('button', { name: 'Menüyü aç' }).click()

    const links = page.getByRole('dialog').getByRole('link')
    const count = await links.count()
    expect(count).toBeGreaterThan(4)

    for (let index = 0; index < count; index += 1) {
      const box = await links.nth(index).boundingBox()
      expect(box).not.toBeNull()
      if (box) expect(box.height).toBeGreaterThanOrEqual(44)
    }
  })
})
