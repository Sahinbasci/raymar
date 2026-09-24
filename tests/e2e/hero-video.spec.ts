import { expect, test, type Page } from '@playwright/test'
import { waitForHydration } from './support/scroll'

/**
 * The hero clip on the devices where "it sometimes doesn't start".
 *
 * Playwright's engines are desktop builds: none of them refuses autoplay or
 * holds back a download the way a phone does, so a suite that only loads the
 * page proves nothing about the report. Each condition a phone imposes is
 * reproduced here instead, from what the engines' sources say they do:
 *
 *   - iOS WebKit buffers no media data before `play()` (the setting
 *     `MediaDataLoadsAutomatically` is false on iOS, which caps preloading at
 *     metadata), and Android Chrome's data-saving heuristics suspend a load
 *     the same way. Reproduced by making `load()` and `preload` inert, so
 *     nothing is fetched until playback is requested.
 *   - iOS refuses autoplay in Low Power Mode and when the phone is hot, and
 *     allows `play()` only inside a user gesture. Reproduced by rejecting
 *     `play()` with `NotAllowedError` outside one.
 *   - A weak signal: the clip alone is served at a trickle by the test harness
 *     (`X-Test-Throttle`), so the page itself still loads normally.
 *
 * The previous implementation waited for the buffer before calling `play()`,
 * and its gesture retry waited for the same buffer: under the first condition
 * it never started at all, taps included.
 */

const CLIP = /\/video\/raymar-hero(-mobile)?\.mp4/
const PLAY_TR = 'Arka plan videosunu oynat'
const PAUSE_TR = 'Arka plan videosunu duraklat'

/** Nothing buffers until `play()` — iOS WebKit, Android data saving. */
const BUFFERS_ONLY_ON_PLAY = () => {
  HTMLMediaElement.prototype.load = function load() {}
  Object.defineProperty(HTMLMediaElement.prototype, 'preload', {
    configurable: true,
    get: () => 'none',
    set: () => {},
  })
}

/** `play()` is refused outside a gesture — iOS Low Power Mode. */
const PLAY_ONLY_IN_GESTURE = () => {
  let gesture = false
  for (const type of [
    'pointerdown',
    'pointerup',
    'mousedown',
    'mouseup',
    'click',
    'touchend',
    'keydown',
  ]) {
    window.addEventListener(
      type,
      () => {
        gesture = true
        setTimeout(() => {
          gesture = false
        }, 0)
      },
      { capture: true },
    )
  }
  const play = HTMLMediaElement.prototype.play
  HTMLMediaElement.prototype.play = function guardedPlay(this: HTMLMediaElement) {
    if (!gesture) {
      return Promise.reject(new DOMException('Autoplay refused', 'NotAllowedError'))
    }
    return play.call(this)
  }
}

function clip(page: Page) {
  return page.locator('video').evaluate((video: HTMLVideoElement) => ({
    paused: video.paused,
    time: video.currentTime,
    opacity: Number(getComputedStyle(video).opacity),
    requested: video.currentSrc !== '',
  }))
}

async function expectPlayingAndShown(page: Page, timeout = 12_000) {
  await expect
    .poll(
      async () => {
        const state = await clip(page)
        return !state.paused && state.time > 0.3 && state.opacity === 1
      },
      { timeout, message: 'the hero clip never came on screen playing' },
    )
    .toBe(true)
}

test.describe('hero video starts', () => {
  test('on an engine that buffers nothing until playback is requested', async ({
    page,
  }) => {
    await page.addInitScript(BUFFERS_ONLY_ON_PLAY)
    await page.goto('/tr')
    await expectPlayingAndShown(page)
  })

  test('on the first tap where autoplay is refused', async ({ page }) => {
    await page.addInitScript(PLAY_ONLY_IN_GESTURE)
    await page.goto('/tr')
    await waitForHydration(page)

    const control = page.getByRole('button', { name: PLAY_TR })
    await expect(control, 'a refused clip should offer to play').toBeVisible()
    expect((await clip(page)).paused).toBe(true)
    await expect(page.locator('video')).toHaveCSS('opacity', '0')

    // Anywhere on the page — not only the control.
    await page.locator('#giris p').first().click()
    await expectPlayingAndShown(page)
    await expect(page.getByRole('button', { name: PAUSE_TR })).toBeVisible()
  })

  test('on an iPhone in Low Power Mode: no buffering, and no autoplay', async ({
    page,
  }) => {
    await page.addInitScript(BUFFERS_ONLY_ON_PLAY)
    await page.addInitScript(PLAY_ONLY_IN_GESTURE)
    await page.goto('/tr')
    await waitForHydration(page)
    await page.waitForTimeout(1500)
    expect((await clip(page)).paused).toBe(true)

    await page.getByRole('button', { name: PLAY_TR }).click()
    await expectPlayingAndShown(page)
  })

  test('after coming back to the homepage from another page', async ({ page }) => {
    await page.goto('/tr/urunler/ceviz-ici')
    await waitForHydration(page)
    await page.locator('header a[aria-label]').first().click()
    await expect(page).toHaveURL(/\/tr(#ust)?$/)
    await expectPlayingAndShown(page)
  })

  test('after switching language on the homepage', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await expectPlayingAndShown(page)
    if ((page.viewportSize()?.width ?? 0) < 1080) {
      await page.getByRole('button', { name: 'Menüyü aç' }).click()
      await page
        .getByRole('dialog')
        .getByRole('link', { name: 'EN', exact: true })
        .click()
    } else {
      await page.locator('header').getByRole('link', { name: 'EN', exact: true }).click()
    }
    await expect(page).toHaveURL(/\/en$/)
    await expectPlayingAndShown(page)
  })
})

test.describe('hero video control', () => {
  test('pauses, keeps the pause, and plays again', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await expectPlayingAndShown(page)

    await page.getByRole('button', { name: PAUSE_TR }).click()
    await expect.poll(async () => (await clip(page)).paused).toBe(true)
    await expect(page.getByRole('button', { name: PLAY_TR })).toBeVisible()

    // Neither a gesture nor the hero leaving and re-entering the screen may
    // override a pause the visitor chose.
    await page.evaluate(() => window.scrollTo({ top: 2500, behavior: 'instant' }))
    await page.waitForTimeout(400)
    await page.locator('#hakkimizda').click({ position: { x: 5, y: 5 } })
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.waitForTimeout(800)
    expect((await clip(page)).paused).toBe(true)

    await page.getByRole('button', { name: PLAY_TR }).click()
    await expectPlayingAndShown(page)
  })

  test('is a real button with a name, on every viewport', async ({ page }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    const control = page.getByRole('button', { name: PAUSE_TR })
    await expect(control).toBeVisible()
    const box = await control.boundingBox()
    expect(box?.width ?? 0).toBeGreaterThanOrEqual(44)
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)
    // Inside the hero, clear of the scroll cue.
    const cue = await page.locator('.hero-cue').boundingBox()
    if (box && cue) {
      const overlaps =
        box.x < cue.x + cue.width &&
        cue.x < box.x + box.width &&
        box.y < cue.y + cue.height &&
        cue.y < box.y + box.height
      expect(overlaps, 'the control overlaps the scroll cue').toBe(false)
    }
  })
})

test.describe('hero video, battery and data', () => {
  test('pauses while the hero is off screen and resumes when it returns', async ({
    page,
  }) => {
    await page.goto('/tr')
    await waitForHydration(page)
    await expectPlayingAndShown(page)

    await page.evaluate(() =>
      window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'instant' }),
    )
    await expect.poll(async () => (await clip(page)).paused).toBe(true)

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await expectPlayingAndShown(page)
  })

  for (const [name, setUp] of [
    [
      'reduced motion',
      async (page: Page) => page.emulateMedia({ reducedMotion: 'reduce' }),
    ],
    [
      'Data Saver',
      async (page: Page) =>
        page.addInitScript(() => {
          Object.defineProperty(navigator, 'connection', {
            configurable: true,
            value: { saveData: true },
          })
        }),
    ],
  ] as const) {
    test(`under ${name}, nothing is downloaded until the visitor asks`, async ({
      page,
    }) => {
      await setUp(page)
      const requests: string[] = []
      page.on('request', (request) => {
        if (CLIP.test(request.url())) requests.push(request.url())
      })
      await page.goto('/tr')
      await waitForHydration(page)
      await page.waitForTimeout(1500)
      expect(requests, 'the clip was fetched without being asked for').toEqual([])
      await expect(page.locator('video')).toHaveCSS('opacity', '0')

      await page.getByRole('button', { name: PLAY_TR }).click()
      await expectPlayingAndShown(page)
      expect(requests.length).toBeGreaterThan(0)
    })
  }
})

test.describe('hero video on a weak signal', () => {
  test('appears from its first frame, only once it can run without freezing', async ({
    page,
  }, testInfo) => {
    // One project per engine: this is a slow test, and what it measures is
    // the engine's buffering, not the viewport.
    test.skip(
      !['mobile-pixel7', 'webkit-iphone', 'firefox-desktop-1440'].includes(
        testInfo.project.name,
      ),
      'one project per engine',
    )
    test.setTimeout(90_000)
    // Roughly a weak indoor 4G signal, below the clip's own bitrate, so the
    // download cannot keep up with playback until much of it is buffered.
    const rate = testInfo.project.name === 'firefox-desktop-1440' ? 160_000 : 60_000
    await page.route(CLIP, (route) =>
      route.continue({
        headers: { ...route.request().headers(), 'x-test-throttle': String(rate) },
      }),
    )
    await page.addInitScript(() => {
      const log = { shownAt: -1, timeAtShow: -1, stallsAfterShow: 0 }
      ;(window as unknown as { heroLog: typeof log }).heroLog = log
      document.addEventListener(
        'waiting',
        (event) => {
          if (event.target instanceof HTMLVideoElement && log.shownAt >= 0)
            log.stallsAfterShow += 1
        },
        true,
      )
      const watch = () => {
        const video = document.querySelector('video')
        if (!video) return requestAnimationFrame(watch)
        new MutationObserver(() => {
          if (log.shownAt < 0 && video.style.opacity === '1') {
            log.shownAt = performance.now()
            log.timeAtShow = video.currentTime
          }
        }).observe(video, { attributes: true, attributeFilter: ['style'] })
      }
      requestAnimationFrame(watch)
    })

    await page.goto('/tr')
    await expect
      .poll(
        () =>
          page.evaluate(
            () => (window as unknown as { heroLog: { shownAt: number } }).heroLog.shownAt,
          ),
        { timeout: 75_000, message: 'the clip never came on screen' },
      )
      .toBeGreaterThan(0)

    // Watched for a while after it appears: no freeze, and it keeps moving.
    const start = (await clip(page)).time
    await page.waitForTimeout(5000)
    const log = await page.evaluate(
      () =>
        (
          window as unknown as {
            heroLog: { timeAtShow: number; stallsAfterShow: number }
          }
        ).heroLog,
    )
    expect(log.timeAtShow, 'the clip did not appear from its first frame').toBeLessThan(
      0.6,
    )
    expect(log.stallsAfterShow, 'the clip froze after it came on screen').toBe(0)
    const end = (await clip(page)).time
    expect(end === start, 'the clip stopped moving').toBe(false)
  })
})
