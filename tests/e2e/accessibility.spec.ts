import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

/**
 * Automated WCAG scan.
 *
 * This complements, and does not replace, the manual accessibility work
 * recorded in docs/QA_REPORT.md — axe catches perhaps a third of real WCAG
 * failures, and none of the judgement calls (is this alt text *useful*, does
 * the focus order make sense). It is here to stop a whole class of mechanical
 * regressions silently landing: a contrast token edited to an unreadable
 * value, a heading level skipped by a new section, a control that loses its
 * name.
 *
 * `wcag22aa` is the target the project already claims. Colour contrast is
 * included deliberately — four of the defects this suite was written after
 * were contrast failures.
 */
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/**
 * Renders every reveal and waits for the animations to finish.
 *
 * Both halves matter. Without the scroll pass, sections below the fold are
 * never revealed and go unscanned. Without the settle, axe reads a heading
 * *mid-fade* and computes contrast against the blended colour — the first run
 * of this suite reported `#d8d7c6` on cream at 1.17:1 for a heading that is
 * actually `--color-raymar-green` (`#004c38`), because it was sampled at
 * roughly 10% opacity. Polling the opacity is what makes the scan deterministic;
 * a fixed timeout would only move the flake around.
 */
async function revealEverything(page: Page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    const step = window.innerHeight
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => requestAnimationFrame(resolve))
    }
    window.scrollTo(0, 0)
  })

  await expect
    .poll(
      () =>
        page.evaluate(
          () =>
            [...document.querySelectorAll('[data-reveal]')].filter(
              (el) => Number(getComputedStyle(el).opacity) < 0.99,
            ).length,
        ),
      { timeout: 10_000, message: 'reveal animations never settled' },
    )
    .toBe(0)
}

test.describe('accessibility', () => {
  test('homepage has no detectable WCAG violations', async ({ page }) => {
    await page.goto('/tr')
    await revealEverything(page)

    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()

    expect(
      violations,
      violations
        .map(
          (v) =>
            `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(' '))
              .join('\n  ')}`,
        )
        .join('\n\n'),
    ).toEqual([])
  })

  test('the quotation form in its error state has no violations', async ({ page }) => {
    await page.goto('/tr')
    await revealEverything(page)

    // Submitting empty is what renders every per-field error, the assertive
    // live region and the `aria-invalid` states — none of which exist in the
    // resting page the test above scans.
    await page.getByRole('button', { name: 'Talebi Gönder' }).click()
    await expect(page.locator('#teklif [role="alert"]')).toBeVisible()

    const { violations } = await new AxeBuilder({ page })
      .include('#teklif')
      .withTags(TAGS)
      .analyze()

    expect(
      violations,
      violations.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
    ).toEqual([])
  })

  test('the open mobile drawer has no violations', async ({ page }, testInfo) => {
    test.skip((testInfo.project.use.viewport?.width ?? 0) >= 1080, 'narrow layout only')

    await page.goto('/tr')
    await page.getByRole('button', { name: 'Menüyü aç' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()

    expect(
      violations,
      violations.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
    ).toEqual([])
  })

  test('the 404 page has no violations', async ({ page }) => {
    await page.goto('/does-not-exist')

    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()

    expect(
      violations,
      violations.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
    ).toEqual([])
  })

  /*
   * The legal pages carry the site's longest continuous prose and its only
   * compliance obligation, which makes them the pages a screen-reader user is
   * most likely to be sent to directly. They are also the pages most easily
   * forgotten in a design pass, so they are scanned explicitly rather than
   * assumed to inherit the homepage's result.
   */
  for (const slug of [
    'kvkk-aydinlatma-metni',
    'gizlilik-politikasi',
    'cerez-politikasi',
  ]) {
    test(`/tr/${slug} has no violations`, async ({ page }) => {
      await page.goto(`/tr/${slug}`)

      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()

      expect(
        violations,
        violations.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
      ).toEqual([])
    })
  }
})
