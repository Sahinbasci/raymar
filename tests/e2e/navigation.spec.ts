import { expect, test, type Page } from '@playwright/test'
import { expectSettledAtTop, settle, waitForHydration } from './support/scroll'

const DESKTOP = ['desktop-1440', 'laptop-1280']

test.describe('desktop navigation', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1080, 'desktop layout only')

  test('nav links resolve to their sections', async ({ page }) => {
    await page.goto('/tr')

    const nav = page.getByRole('navigation', { name: 'Ana menü' })
    await expect(nav).toBeVisible()

    await nav.getByRole('link', { name: 'Ürünler' }).click()
    await expect(page).toHaveURL(/#urunlerimiz$/)

    // The in-page glide animates, so poll rather than read once. The exact
    // landing is asserted in landing.spec.ts.
    await expect
      .poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 })
      .toBeGreaterThan(0)
    await expect(page.locator('#urunlerimiz')).toBeInViewport({ ratio: 0.05 })
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

  test('drawer opens, traps focus, and closes on Escape', async ({ page }, testInfo) => {
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

    // `showModal()`'s own initial-focus placement — engine-agnostic, and
    // confirmed correct on both Chromium and WebKit (it lands on the close
    // button, the dialog's first focusable descendant).
    const initialFocusInsideDrawer = await page.evaluate(
      () => document.activeElement?.closest('dialog') !== null,
    )
    expect(initialFocusInsideDrawer).toBe(true)

    /*
     * The rest of the focus-trap check presses Tab and expects it to stay
     * inside the dialog — true on Chromium and Firefox, where Tab includes
     * links and buttons in the default focus order. It is not true on Safari:
     * macOS and iOS only put form controls in the default Tab order unless the
     * visitor has "Full Keyboard Access" turned on system-wide, and
     * Playwright's WebKit faithfully reproduces that default — confirmed with
     * a bare three-`<a>` HTML page outside this app entirely, where Tab never
     * left `document.body` either. Asserting it here on `webkit-*` projects
     * would be testing a macOS/iOS system preference, not this component; the
     * dialog's own focus trap already proved correct above.
     */
    if (!testInfo.project.name.startsWith('webkit')) {
      await page.keyboard.press('Tab')
      const focusInsideDrawer = await page.evaluate(
        () => document.activeElement?.closest('dialog') !== null,
      )
      expect(focusInsideDrawer).toBe(true)
    }

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
    await expect(page).toHaveURL(/#urunlerimiz$/)
  })
})

test.describe('language switch', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1080, 'desktop layout only')

  /*
   * English was unpublished until 2026-08-31, and this suite asserted the
   * switch rendered a disabled `<button>` for it. Now that `en` is in
   * `completeLocales` the same control has to be a real link — the two states
   * are produced by the same component branch, so a test that only checked
   * "the switch exists" would have passed through the whole transition without
   * noticing which one shipped.
   *
   * `exact` matters throughout: Playwright matches accessible names as a
   * case-insensitive substring by default, and product cards carry aria-labels
   * containing "en", so a loose match resolves to several elements.
   */
  test('links to the other locale in both directions', async ({ page }) => {
    await page.goto('/tr')
    const toEnglish = page.getByRole('link', { name: 'EN', exact: true })
    await expect(toEnglish).toHaveAttribute('href', '/en')
    await toEnglish.click()
    await expect(page).toHaveURL(/\/en$/)

    const toTurkish = page.getByRole('link', { name: 'TR', exact: true })
    await expect(toTurkish).toHaveAttribute('href', '/tr')
    await toTurkish.click()
    await expect(page).toHaveURL(/\/tr$/)
  })

  test('marks the current locale, and marks only that one', async ({ page }) => {
    /*
     * Scoped to the header. The footer carries its own TR / EN pair as a
     * decorative, `aria-hidden` indicator, so an unscoped text match finds
     * both and resolves to more than one element.
     */
    for (const [path, active, other] of [
      ['/en', 'EN', 'TR'],
      ['/tr', 'TR', 'EN'],
    ]) {
      await page.goto(path)
      const current = page.locator('header [aria-current="true"]')
      await expect(current).toHaveCount(1)
      await expect(current).toHaveText(active)
      // The other locale must be a link, not a second "current" — a switch
      // that ignores the active locale would mark both.
      await expect(
        page.locator('header').getByRole('link', { name: other, exact: true }),
      ).toHaveCount(1)
    }
  })
})

/*
 * The switch as a reader actually uses it — on every viewport, not just the
 * desktop one.
 *
 * The describe above skips below 1080px, which is how two production defects
 * went unnoticed: there was no language control on phones at all, and on
 * desktop every switch threw the reader back to the top of the page. Both were
 * reported by the client and then measured on the live site; neither could have
 * been caught by a suite that never opened the drawer or scrolled before
 * clicking.
 */
test.describe('language switch, as used', () => {
  /** Clicks the EN or TR control wherever this viewport puts it. */
  async function switchTo(page: Page, label: 'EN' | 'TR', narrow: boolean) {
    if (narrow) {
      await page
        .getByRole('button', { name: /menü|menu/i })
        .first()
        .click()
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      await dialog.getByRole('link', { name: label, exact: true }).click()
    } else {
      await page.locator('header').getByRole('link', { name: label, exact: true }).click()
    }
  }

  /** The section a third of the way down the viewport — what the reader is on. */
  function sectionInView(page: Page) {
    return page.evaluate(() => {
      const probe = window.innerHeight * 0.35
      let current: string | null = null
      for (const section of document.querySelectorAll<HTMLElement>('main section[id]')) {
        if (section.getBoundingClientRect().top <= probe) current = section.id
        else break
      }
      return current
    })
  }

  test('is reachable on this viewport', async ({ page, viewport }) => {
    const narrow = (viewport?.width ?? 0) < 1024
    await page.goto('/tr')
    if (narrow) {
      await page
        .getByRole('button', { name: /menü|menu/i })
        .first()
        .click()
      const link = page.getByRole('dialog').getByRole('link', { name: 'EN', exact: true })
      await expect(link).toBeVisible()
      // A thumb target, not a cursor one.
      const box = await link.boundingBox()
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(44)
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)
    } else {
      await expect(
        page.locator('header').getByRole('link', { name: 'EN', exact: true }),
      ).toBeVisible()
    }
  })

  test('keeps the reader on the section they were reading', async ({
    page,
    viewport,
  }) => {
    const narrow = (viewport?.width ?? 0) < 1024
    await page.goto('/tr')
    await waitForHydration(page)
    await page.locator('#ceviz').evaluate((el) => el.scrollIntoView({ block: 'start' }))
    await expect.poll(() => sectionInView(page)).toBe('ceviz')

    await switchTo(page, 'EN', narrow)
    // No fragment any more: the place is carried across in script, down to
    // the paragraph (see landing.spec.ts), not approximated by a section id.
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect.poll(() => sectionInView(page)).toBe('ceviz')

    // And back, from a different section, so the direction is not assumed.
    await page
      .locator('#urunlerimiz')
      .evaluate((el) => el.scrollIntoView({ block: 'start' }))
    await expect.poll(() => sectionInView(page)).toBe('urunlerimiz')
    await switchTo(page, 'TR', narrow)
    await expect(page).toHaveURL(/\/tr$/)
    await expect.poll(() => sectionInView(page)).toBe('urunlerimiz')
  })

  test('from the top, lands at the top', async ({ page, viewport }) => {
    // No `#ust` on a switch made from the hero: the fragment is only worth
    // adding when there is somewhere to return to.
    await page.goto('/tr')
    await switchTo(page, 'EN', (viewport?.width ?? 0) < 1024)
    await expect(page).toHaveURL(/\/en$/)

    // The URL was always right — it was the landing position that was wrong.
    // The page glided to the footer over about a second after the switch, so
    // a single read straight after navigation saw 0 and passed. Settling is
    // part of the assertion.
    await expectSettledAtTop(page)
  })

  test('translates the document, not just the locale', async ({ page, viewport }) => {
    // Previously `href="/en"` on every page, so a reader switching language on
    // a legal document landed on the English homepage.
    await page.goto('/tr/kvkk-aydinlatma-metni')
    await switchTo(page, 'EN', (viewport?.width ?? 0) < 1024)
    await expect(page).toHaveURL(/\/en\/kvkk-aydinlatma-metni$/)
    await expect(page.locator('h1')).toHaveText('KVKK Personal Data Notice')
  })

  test('from deep inside a document, keeps the reader there', async ({
    page,
    viewport,
  }) => {
    /*
     * Two defects lived here. In the drawer, 1000px down a Turkish page, the
     * English page opened 1000px down: switching locale is a client-side
     * navigation, and the drawer's scroll lock, released after the router had
     * placed the new page, restored the old page's pixel offset onto it. Once
     * that was fixed the switch opened every translated document at its top,
     * which the client reported as being thrown to the start. The place is
     * now carried across by structure — landing.spec.ts checks it paragraph
     * by paragraph; this checks the drawer path does not fall back to either.
     */
    await page.goto('/tr/kvkk-aydinlatma-metni')
    await waitForHydration(page)
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000)

    await switchTo(page, 'EN', (viewport?.width ?? 0) < 1024)
    await expect(page).toHaveURL(/\/en\/kvkk-aydinlatma-metni$/)
    const landing = await settle(page)
    expect(landing.min, 'the switch slid to its landing').toBe(landing.max)
    expect(landing.y).toBeGreaterThan(900)
    expect(landing.y).toBeLessThan(1600)
  })
})

test.describe('published locales', () => {
  test('both locales are served, and each declares its own language', async ({
    page,
  }) => {
    for (const [path, lang] of [
      ['/tr', 'tr'],
      ['/en', 'en'],
    ]) {
      const response = await page.goto(path)
      expect(response?.status(), `${path} should be served`).toBe(200)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
    }
  })

  test('the two locales point at each other with hreflang', async ({ page }) => {
    // A one-way hreflang is the classic way to publish a translation that
    // search engines never associate with its original: the pair has to be
    // declared from BOTH documents, and both have to name the same x-default.
    for (const path of ['/tr', '/en']) {
      await page.goto(path)
      for (const [lang, href] of [
        ['tr', '/tr'],
        ['en', '/en'],
        ['x-default', '/tr'],
      ]) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
          `${path} is missing hreflang=${lang}`,
        ).toHaveAttribute('href', new RegExp(`${href}$`))
      }
    }
  })
})

export { DESKTOP }

/*
 * Where a route change leaves the reader.
 *
 * Next.js 16 stopped suspending a site's own `scroll-behavior: smooth` during
 * navigation unless `<html data-scroll-behavior="smooth">` is set. This site
 * set smooth scrolling in globals.css without the attribute, so the router's
 * post-navigation scroll ran as an animation and ended at the footer. On the
 * live site that meant a TR → EN switch left every engine at the very bottom
 * of the page, and on Chromium a footer link from the homepage opened the KVKK
 * notice scrolled to its end. Every URL assertion in the suite passed the whole
 * time. The CSS rule is gone altogether now (landing.spec.ts guards that); these
 * keep checking the landings themselves.
 */
test.describe('landing position after navigation', () => {
  test('following a footer link to a legal page opens it at the top', async ({
    page,
  }) => {
    await page.goto('/tr')
    await page.locator('footer a[href="/tr/kvkk-aydinlatma-metni"]').first().click()
    await expect(page).toHaveURL(/\/tr\/kvkk-aydinlatma-metni$/)
    await expectSettledAtTop(page)
    await expect(page.locator('h1')).toBeInViewport()
  })

  test('moving between legal pages opens each at the top', async ({ page }) => {
    await page.goto('/tr/kvkk-aydinlatma-metni')
    await page.locator('footer a[href="/tr/gizlilik-politikasi"]').first().click()
    await expect(page).toHaveURL(/\/tr\/gizlilik-politikasi$/)
    await expectSettledAtTop(page)
  })

  test('a section link from a legal page lands on that section', async ({ page }) => {
    await page.goto('/tr/kvkk-aydinlatma-metni')
    await page.locator('footer a[href="/tr#hakkimizda"]').first().click()
    await expect(page).toHaveURL(/\/tr#hakkimizda$/)
    await expect(page.locator('#hakkimizda')).toBeInViewport({ ratio: 0.1 })
    // And stays there — the smooth-scroll defect could carry a correct landing
    // on past its target.
    await page.waitForTimeout(1200)
    await expect(page.locator('#hakkimizda')).toBeInViewport({ ratio: 0.1 })
  })
})
