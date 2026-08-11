import { expect, test } from '@playwright/test'

test.describe('reduced motion', () => {
  // `page.emulateMedia` is applied explicitly: the context-level `reducedMotion`
  // fixture did not reach `matchMedia` in this Playwright/Chromium combination,
  // which silently turned these into no-op assertions.
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
  })

  test('preserves all content and hierarchy', async ({ page }) => {
    await page.goto('/tr')
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, document.body.scrollHeight)
      window.scrollTo(0, 0)
    })

    // Nothing may be left transparent or displaced by a suppressed animation.
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('#kurumsal h2')).toBeVisible()
    await expect(page.locator('#ticaret h2')).toBeVisible()
    await expect(page.locator('#teklif h2')).toBeVisible()

    // Retried rather than sampled once: the reveal's hidden state is
    // server-rendered, so this resolves as hydration applies the
    // reduced-motion preference. A one-shot read races that under load.
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const targets = ['h1', '#kurumsal h2', '#urunler h2', '#teklif h2']
            return targets.filter((selector) => {
              const el = document.querySelector(selector)
              if (!el) return true
              let node: Element | null = el
              while (node && node !== document.body) {
                if (Number(getComputedStyle(node).opacity) < 0.99) return true
                node = node.parentElement
              }
              return false
            })
          }),
        { timeout: 5000, message: 'elements still hidden under reduced motion' },
      )
      .toEqual([])
  })

  test('hero shows the poster and does not autoplay', async ({ page }) => {
    await page.goto('/tr')
    const paused = await page
      .locator('video')
      .evaluate((el: HTMLVideoElement) => el.paused)
    expect(paused).toBe(true)
    await expect(page.locator('#ust img:visible').first()).toBeVisible()
  })
})

test.describe('hero media', () => {
  test('video is decorative, muted, inline and looping', async ({ page }) => {
    await page.goto('/tr')

    const video = page.locator('video')
    await expect(video).toHaveAttribute('aria-hidden', 'true')
    await expect(video).toHaveAttribute('playsinline', '')
    await expect(video).toHaveAttribute('loop', '')

    const state = await video.evaluate((el: HTMLVideoElement) => ({
      muted: el.muted,
      controls: el.controls,
      tabIndex: el.tabIndex,
    }))
    expect(state.muted).toBe(true)
    expect(state.controls).toBe(false)
    expect(state.tabIndex).toBe(-1)
  })

  test('poster fallback carries the hero when the video cannot load', async ({
    page,
  }) => {
    // Block every hero clip — desktop and the portrait mobile cut — so the test
    // exercises the fallback on whichever viewport it runs in.
    await page.route('**/video/raymar-hero*.mp4', (route) => route.abort())
    await page.goto('/tr')

    // The composition and all hero information survive without playback. Two
    // art-directed posters exist (16:9 desktop, portrait mobile); exactly one is
    // shown per viewport, so assert against the visible one.
    const poster = page.locator('#ust img:visible').first()
    await expect(poster).toBeVisible()
    await expect(
      page.locator('#ust').getByRole('link', { name: /Ürünleri Keşfet/ }),
    ).toBeVisible()

    const box = await page.locator('#ust').boundingBox()
    expect(box?.height ?? 0).toBeGreaterThan(400)

    // The video element must be transparent so the poster reads cleanly.
    await expect(page.locator('video')).toHaveCSS('opacity', '0')
  })

  test('poster is served as the LCP-critical image and is not lazy', async ({ page }) => {
    await page.goto('/tr')
    const poster = page.locator('#ust img:visible').first()
    await expect(poster).not.toHaveAttribute('loading', 'lazy')
  })

  test('below-the-fold product imagery is lazy-loaded', async ({ page }) => {
    await page.goto('/tr')
    const lazyCount = await page.locator('#ceviz img[loading="lazy"]').count()
    expect(lazyCount).toBeGreaterThan(0)
  })
})
