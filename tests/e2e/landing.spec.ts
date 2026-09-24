import { expect, test, type Locator, type Page } from '@playwright/test'
import { readingSpot, settle, waitForHydration } from './support/scroll'

/**
 * Where the reader ends up — after a menu link, a language switch, Back and
 * Forward — on every device profile.
 *
 * Each of these was reported by the client as the page "throwing" them
 * somewhere, and each was measured before it was fixed:
 *
 *   - A menu item clicked a second time did nothing: the page stayed 1360px
 *     past the section on all seven profiles.
 *   - Switching language from inside a section landed at that section's start
 *     (up to 2700px back on a phone), and on product pages, guides and legal
 *     notices at the very top.
 *   - Back from a product page landed 435px short of where the reader had been
 *     on the homepage — clamped to the product page's height — once the slide
 *     that used to hide it was gone; with the slide, Chromium and Firefox
 *     glided a page length after every Back and Forward.
 *
 * "Lands" means exactly: a section's top edge comes to rest at the page's
 * `scroll-padding-top` (40px, globals.css), within 2px, and is still there a
 * second later. A test that accepts "the section is somewhere in view" passed
 * throughout all of the above.
 */

const PADDING = 40

const SECTIONS = [
  { id: 'hakkimizda', label: 'Hakkımızda' },
  { id: 'urunlerimiz', label: 'Ürünler' },
  { id: 'ticaret', label: 'Uluslararası Ticaret' },
  { id: 'teklif', label: 'İletişim' },
  { id: 'ust', label: 'Ana Sayfa' },
] as const

const DOCUMENTS = [
  { tr: '/tr/urunler/ceviz-ici', en: '/en/products/walnut-kernels' },
  { tr: '/tr/rehber/ceviz-ici-cesitleri', en: '/en/guides/walnut-kernel-grades' },
  { tr: '/tr/kvkk-aydinlatma-metni', en: '/en/kvkk-aydinlatma-metni' },
] as const

function narrow(page: Page) {
  return (page.viewportSize()?.width ?? 0) < 1080
}

/** The menu this viewport shows: the header's, or the drawer's once opened. */
async function menu(page: Page): Promise<Locator> {
  if (!narrow(page)) return page.locator('header')
  await page.getByRole('button', { name: /Menüyü aç|Open menu/ }).click()
  const drawer = page.getByRole('dialog')
  await expect(drawer).toBeVisible()
  return drawer
}

async function position(page: Page, id: string) {
  return page.evaluate((id) => {
    const element = document.getElementById(id)
    const end = document.documentElement.scrollHeight - window.innerHeight
    return {
      top: element ? Math.round(element.getBoundingClientRect().top) : Number.NaN,
      y: Math.round(window.scrollY),
      atEnd: window.scrollY >= end - 2,
    }
  }, id)
}

/** The section is where an anchor puts it, and has stopped moving. */
async function expectLandedOn(page: Page, id: string) {
  await settle(page)
  const landed = await position(page, id)
  if (id === 'ust') {
    expect(landed.y, 'the hero is the top of the page').toBeLessThanOrEqual(2)
  } else if (landed.atEnd) {
    // The last section may be too short to reach the top of the screen.
    expect(landed.top).toBeLessThanOrEqual(PADDING + 2)
  } else {
    expect(
      Math.abs(landed.top - PADDING),
      `#${id} top edge at ${landed.top}px`,
    ).toBeLessThanOrEqual(2)
  }
  await page.waitForTimeout(1000)
  expect((await position(page, id)).y, `#${id} drifted after landing`).toBe(landed.y)
}

test.describe('menu links', () => {
  test('land on each section exactly, and stay there', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await page.evaluate(() => {
      ;(window as unknown as { marker: boolean }).marker = true
    })

    for (const { id, label } of SECTIONS) {
      await (await menu(page)).getByRole('link', { name: label, exact: true }).click()
      await expect(page).toHaveURL(new RegExp(`/tr#${id}$`))
      await expectLandedOn(page, id)
    }

    // Glided within the page, not reloaded: state set on `window` survives.
    expect(
      await page.evaluate(() => (window as unknown as { marker?: boolean }).marker),
    ).toBe(true)
  })

  test('the same item clicked again still lands', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await (await menu(page)).getByRole('link', { name: 'Ürünler', exact: true }).click()
    await expectLandedOn(page, 'urunlerimiz')

    // Read on past the section; the URL still ends in #urunlerimiz.
    await page.evaluate(() => window.scrollBy({ top: 1400, behavior: 'instant' }))
    await (await menu(page)).getByRole('link', { name: 'Ürünler', exact: true }).click()
    await expectLandedOn(page, 'urunlerimiz')
  })

  test('under reduced motion, jumps instead of gliding', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/tr')
    await waitForHydration(page)
    await (
      await menu(page)
    )
      .getByRole('link', { name: 'Uluslararası Ticaret', exact: true })
      .click()
    const landing = await settle(page)
    expect(landing.changes, 'the page animated under reduced motion').toBeLessThanOrEqual(
      1,
    )
    await expectLandedOn(page, 'ticaret')
  })

  test('hands keyboard focus to the section it lands on', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await (
      await menu(page)
    )
      .getByRole('link', { name: 'Hakkımızda', exact: true })
      .click()
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.id))
      .toBe('hakkimizda')
  })

  test('from a product page, a guide and a legal notice', async ({ page }) => {
    test.setTimeout(90_000)
    for (const { tr } of DOCUMENTS) {
      for (const { id, label } of [SECTIONS[1], SECTIONS[3]]) {
        await page.goto(tr)
        await waitForHydration(page)
        await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }))
        await (await menu(page)).getByRole('link', { name: label, exact: true }).click()
        await expect(page).toHaveURL(new RegExp(`/tr#${id}$`))
        await expectLandedOn(page, id)
      }
    }
  })

  test('Back returns to where the reader was before the link', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }))
    await settle(page)

    await (await menu(page)).getByRole('link', { name: 'Ürünler', exact: true }).click()
    await expectLandedOn(page, 'urunlerimiz')
    const landed = (await position(page, 'urunlerimiz')).y

    await page.goBack()
    await expect(page).toHaveURL(/\/tr$/)
    expect((await settle(page)).y).toBe(700)

    await page.goForward()
    await expect(page).toHaveURL(/#urunlerimiz$/)
    expect((await settle(page)).y).toBe(landed)
  })
})

test.describe('language switch', () => {
  async function switchLanguage(page: Page, to: 'EN' | 'TR') {
    await (await menu(page)).getByRole('link', { name: to, exact: true }).click()
  }

  /** Scrolls so the reading line falls `fraction` of the way into `#id`. */
  async function readInto(page: Page, id: string, fraction: number) {
    await page.evaluate(
      ([id, fraction]) => {
        const rect = (document.getElementById(id) as HTMLElement).getBoundingClientRect()
        const line = window.innerHeight * 0.3
        window.scrollTo({
          top: window.scrollY + rect.top + rect.height * fraction - line,
          behavior: 'instant',
        })
      },
      [id, fraction] as const,
    )
    await settle(page)
  }

  /**
   * The same place is on the reading line, at once.
   *
   * Where the section is built the same in both languages, that means the
   * same paragraph, about as far into it. Some sections are not: the FAQs are
   * written for each language's own search questions (the Turkish pages
   * answer spelling questions — "makadamya mı makademya mı?" — that no
   * English reader asks), so there the same section, as far through it.
   */
  async function expectSamePlace(
    page: Page,
    before: Awaited<ReturnType<typeof readingSpot>>,
  ) {
    const landing = await settle(page)
    expect(landing.changes, 'the switch animated its landing').toBeLessThanOrEqual(1)
    const after = await readingSpot(page)
    expect(after.region, 'a different section is on the reading line').toBe(before.region)
    if (after.blocks === before.blocks) {
      expect(after.block, 'a different paragraph is on the reading line').toBe(
        before.block,
      )
      // As far into the block — or, where the line is past its end (the gap
      // below a photograph), as far past it.
      const expected =
        before.offset <= before.height
          ? (before.offset / Math.max(before.height, 1)) * after.height
          : after.height + (before.offset - before.height)
      expect(Math.abs(after.offset - expected)).toBeLessThanOrEqual(
        Math.max(12, after.height * 0.1),
      )
    } else {
      expect(Math.abs(after.regionRatio - before.regionRatio)).toBeLessThanOrEqual(0.08)
    }
  }

  test('from the top, lands at the top', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await switchLanguage(page, 'EN')
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    const landing = await settle(page)
    expect(landing.max).toBe(0)
  })

  for (const [id, fraction] of [
    ['urunlerimiz', 0.5],
    ['ceviz', 0.6],
    ['ticaret', 0.4],
  ] as const) {
    test(`keeps the paragraph being read, ${Math.round(fraction * 100)}% into #${id}`, async ({
      page,
    }) => {
      await page.goto('/tr')
      await waitForHydration(page)
      await readInto(page, id, fraction)
      const before = await readingSpot(page)

      await switchLanguage(page, 'EN')
      await expect(page).toHaveURL(/\/en$/)
      await expectSamePlace(page, before)
    })
  }

  test('from the very bottom, lands at the very bottom', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await page.evaluate(() =>
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'instant',
      }),
    )
    await settle(page)
    await switchLanguage(page, 'EN')
    await expect(page).toHaveURL(/\/en$/)
    await settle(page)
    expect(
      await page.evaluate(
        () =>
          window.scrollY >=
          document.documentElement.scrollHeight - window.innerHeight - 2,
      ),
    ).toBe(true)
  })

  for (const { tr, en } of DOCUMENTS) {
    test(`keeps the paragraph being read on ${tr}`, async ({ page }) => {
      await page.goto(tr)
      await waitForHydration(page)
      /*
       * Halfway down, then nudged until the reading line is actually on a
       * block. At a fixed ratio the line can fall in a gap — under a list,
       * above a heading — and the probe then measures nothing, which fails
       * for a reason that has nothing to do with the language switch.
       */
      let before = await readingSpot(page)
      for (const ratio of [0.5, 0.45, 0.55, 0.4, 0.6, 0.35, 0.65]) {
        await page.evaluate((fraction) => {
          window.scrollTo({
            top: (document.documentElement.scrollHeight - window.innerHeight) * fraction,
            behavior: 'instant',
          })
        }, ratio)
        await settle(page)
        before = await readingSpot(page)
        if (before.block >= 0) break
      }
      expect(before.block, 'the probe must start on a paragraph').toBeGreaterThanOrEqual(
        0,
      )

      await switchLanguage(page, 'EN')
      await expect(page).toHaveURL(new RegExp(`${en}$`))
      await expectSamePlace(page, before)
    })
  }

  test('there and back returns to the same pixel', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await readInto(page, 'ceviz', 0.35)
    const start = (await settle(page)).y

    await switchLanguage(page, 'EN')
    await expect(page).toHaveURL(/\/en$/)
    await settle(page)
    await switchLanguage(page, 'TR')
    await expect(page).toHaveURL(/\/tr$/)
    // Not always to the pixel: in a grid of cards the English line can meet a
    // different column's paragraph first. Within a tenth of a screen is the
    // same place to a reader; the defect was a jump of whole screens.
    const tolerance = (page.viewportSize()?.height ?? 800) * 0.1
    expect(Math.abs((await settle(page)).y - start)).toBeLessThanOrEqual(tolerance)
  })

  test('Back after a switch returns to the page and the place it left', async ({
    page,
  }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await readInto(page, 'urunlerimiz', 0.5)
    const start = (await settle(page)).y

    await switchLanguage(page, 'EN')
    await expect(page).toHaveURL(/\/en$/)
    await settle(page)
    await page.goBack()
    await expect(page).toHaveURL(/\/tr$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
    expect((await settle(page)).y).toBe(start)
  })
})

test.describe('Back and Forward', () => {
  test('return to the exact place, without a slide', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    const card = page.locator('#urunlerimiz h3 a').nth(2)
    await card.evaluate((element) =>
      element.scrollIntoView({ block: 'center', behavior: 'instant' }),
    )
    await settle(page)
    // Where the reader is at the moment of the click: Playwright may scroll a
    // target into view its own way first (Firefox does), and that is then the
    // position the reader left from.
    await page.evaluate(() => {
      document.addEventListener(
        'click',
        () => {
          ;(window as unknown as { leftAt: number }).leftAt = Math.round(window.scrollY)
        },
        { capture: true, once: true },
      )
    })

    await card.click()
    await expect(page).toHaveURL(/\/tr\/urunler\/.+/)
    const opened = await settle(page)
    expect(opened.max, 'the product page did not open at its top').toBe(0)

    const before = await page.evaluate(
      () => (window as unknown as { leftAt: number }).leftAt,
    )
    await page.goBack()
    await expect(page).toHaveURL(/\/tr$/)
    const back = await settle(page)
    expect(back.y).toBe(before)
    expect(back.changes, 'Back slid to its position').toBeLessThanOrEqual(1)

    await page.goForward()
    await expect(page).toHaveURL(/\/tr\/urunler\/.+/)
    const forward = await settle(page)
    expect(forward.max, 'Forward did not return to the top of the product page').toBe(0)
  })

  test('a position read on a page is kept when coming back to it', async ({ page }) => {
    await page.goto('/tr/rehber/ceviz-ici-cesitleri')
    await waitForHydration(page)
    await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'instant' }))
    await settle(page)

    // Dispatched rather than clicked: a real click scrolls the footer into view
    // first, and the reader's position when leaving would be the footer.
    await page
      .locator('footer a[href="/tr/kvkk-aydinlatma-metni"]')
      .first()
      .dispatchEvent('click')
    await expect(page).toHaveURL(/\/tr\/kvkk-aydinlatma-metni$/)
    expect((await settle(page)).max, 'the notice did not open at its top').toBe(0)
    await page.goBack()
    await expect(page).toHaveURL(/\/tr\/rehber\/ceviz-ici-cesitleri$/)
    expect((await settle(page)).y).toBe(1500)
  })
})

test('the document does not animate scrolls it did not ask for', async ({ page }) => {
  // `scroll-behavior: smooth` on <html> turned the browser's own restoration
  // and the router's landing into slides. In-page links glide in script.
  await page.goto('/tr')
  expect(
    await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
  ).toBe('auto')
})
