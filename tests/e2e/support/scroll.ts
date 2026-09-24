import { expect, type Page } from '@playwright/test'

/**
 * Asserts the page comes to rest at the top, and does not leave it again once
 * it has got there.
 *
 * The defect this guards against was a delayed animation, not a jump: after a
 * route change the page reached scrollY 0, sat there for a few hundred
 * milliseconds, then glided to the footer. Two things make this awkward to
 * catch:
 *
 *   - Any check that reads the position — even two reads that agree — can land
 *     in the quiet stretch before the glide and pass. A first version of this
 *     helper did exactly that.
 *   - The starting position is not always the top. Clicking a footer link makes
 *     Playwright scroll the footer into view first, so a correct navigation
 *     legitimately starts near the bottom and moves up. A second version that
 *     recorded the furthest point reached failed every such navigation for the
 *     wrong reason.
 *
 * So a scroll listener watches a fixed window and records two things: where the
 * page finally is, and whether it ever moved away from the top AFTER having
 * arrived there. The glide fails the second; a navigation that never gets to
 * the top fails the first; a correct one that starts low and comes up passes.
 */
export async function expectSettledAtTop(page: Page) {
  const { final, strayedAfterTop } = await page.evaluate(
    () =>
      new Promise<{ final: number; strayedAfterTop: number }>((resolve) => {
        const TOP = 50
        let reachedTop = window.scrollY < TOP
        let strayed = 0
        const track = () => {
          const y = Math.round(window.scrollY)
          if (y < TOP) reachedTop = true
          else if (reachedTop) strayed = Math.max(strayed, y)
        }
        window.addEventListener('scroll', track, { passive: true })
        setTimeout(() => {
          window.removeEventListener('scroll', track)
          resolve({ final: Math.round(window.scrollY), strayedAfterTop: strayed })
        }, 2000)
      }),
  )
  expect(strayedAfterTop, 'the page reached the top and then slid away').toBe(0)
  expect(final, 'the page did not come to rest at the top').toBeLessThan(50)
}

/**
 * Resolves once the page has hydrated. `ScrollMemory` tags the history entry
 * with an id in a layout effect, which is the first thing the client does
 * after hydration — before that, a click on the language switch or a menu link
 * is a plain browser navigation and would test the fallback instead.
 */
export async function waitForHydration(page: Page) {
  await page.waitForFunction(() =>
    Boolean((history.state as Record<string, unknown> | null)?.__raymarEntry),
  )
}

/**
 * Waits for the page to stop moving and reports where it came to rest, the
 * lowest and highest positions it passed through on the way, and `changes` —
 * how many times the position moved at all.
 *
 * `changes` is what tells a jump from a glide. `min === max` does not: the
 * helper starts sampling when it is called, and on a phone a menu link first
 * closes the drawer, which releases the scroll lock a frame or two before the
 * landing. Those frames are legitimately at the old position, so an instant
 * landing can be sampled at two positions — but only ever at two. A glide
 * moves on almost every frame.
 */
export async function settle(page: Page, quietMs = 700) {
  return page.evaluate(
    (quiet) =>
      new Promise<{
        y: number
        min: number
        max: number
        moving: number
        changes: number
      }>((resolve) => {
        const start = performance.now()
        let last = window.scrollY
        let lastChange = start
        let min = last
        let max = last
        let changes = 0
        const tick = () => {
          const y = window.scrollY
          min = Math.min(min, y)
          max = Math.max(max, y)
          if (Math.abs(y - last) > 0.5) {
            last = y
            lastChange = performance.now()
            changes += 1
          }
          const now = performance.now()
          if (now - lastChange > quiet || now - start > 10_000) {
            resolve({
              y: Math.round(y),
              min: Math.round(min),
              max: Math.round(max),
              moving: Math.round(lastChange - start),
              changes,
            })
          } else requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }),
    quietMs,
  )
}

/**
 * What sits on the reader's line, a third of the way down the screen: the
 * innermost `main section` (or the footer) it runs through, the block of text
 * or imagery within that, and how far into the block the line falls.
 *
 * Indices, not ids or text, because the question is whether the same place is
 * on screen in the other language — and structure is what the two locales
 * share. Layout positions (`offsetTop`), not painted ones: photographs here
 * move with the scroll under parallax transforms, so their painted position
 * depends on when they are measured.
 */
export function readingSpot(page: Page) {
  return page.evaluate(() => {
    const box = (element: HTMLElement) => {
      let top = 0
      let node: HTMLElement | null = element
      while (node) {
        top += node.offsetTop
        node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null
      }
      return { top, height: element.offsetHeight }
    }
    const line = window.scrollY + window.innerHeight * 0.3
    const regions = [...document.querySelectorAll<HTMLElement>('main section, footer')]
    let region = -1
    regions.forEach((element, i) => {
      const { top, height } = box(element)
      if (top <= line && top + height > line) region = i
    })
    const container = regions[region]
    const y = Math.round(window.scrollY)
    if (!container) {
      return {
        region,
        regionRatio: 0,
        block: -1,
        blocks: 0,
        offset: 0,
        height: 0,
        ratio: 0,
        y,
      }
    }
    const area = box(container)
    const blocks = [
      ...container.querySelectorAll<HTMLElement>(
        'h1, h2, h3, h4, p, li, dt, dd, blockquote, figure, picture, img, form, table',
      ),
    ].filter(
      (element) =>
        element.closest('[aria-hidden="true"]') === null &&
        !(element instanceof HTMLImageElement && element.alt === ''),
    )
    let block = -1
    let nearest = -Infinity
    blocks.forEach((element, i) => {
      const { top, height } = box(element)
      if (height > 0 && top <= line && top >= nearest) {
        nearest = top
        block = i
      }
    })
    const unit = blocks[block] ? box(blocks[block] as HTMLElement) : null
    return {
      region,
      regionRatio: Math.round(((line - area.top) / area.height) * 1000) / 1000,
      block,
      blocks: blocks.length,
      /** Line minus the block's top, in px; past its end when above `height`. */
      offset: unit ? Math.round(line - unit.top) : 0,
      height: unit ? unit.height : 0,
      ratio:
        unit && unit.height > 0
          ? Math.round(((line - unit.top) / unit.height) * 100) / 100
          : 0,
      y,
    }
  })
}
