'use client'

import { useEffect } from 'react'

/** How many overlays currently hold the page still. */
let locks = 0
/** Work waiting for the page to be scrollable again. */
const waiting: Array<() => void> = []

/**
 * Runs `callback` once no overlay holds the page scroll: straight away if none
 * does, otherwise in the frame after the last one lets go.
 *
 * A link inside the mobile menu is clicked while the page behind the menu is
 * pinned by the lock below, so the page cannot move yet: a scroll issued at that
 * moment lands on a `position: fixed` body and goes nowhere, and the release
 * then puts the reader back where they were. Waiting a frame past the release
 * also lets the menu's `<dialog>` close first, so the page behind it is no
 * longer inert when focus is moved into it.
 */
export function afterScrollUnlock(callback: () => void): void {
  if (locks === 0) callback()
  else waiting.push(callback)
}

/**
 * Whether an overlay holds the page. While it does, the window reports a
 * scroll position of 0 that is not the reader's: the body is pinned in place
 * and the real position is only restored on release.
 */
export function scrollLocked(): boolean {
  return locks > 0
}

/**
 * Locks background scrolling while an overlay is open.
 *
 * The scrollbar width is compensated with padding so that locking does not
 * shift the fixed header sideways on desktop. iOS Safari ignores `overflow`
 * on `body` for the page scroller, so the scroll position is pinned with
 * `position: fixed` and restored on release.
 *
 * Restored only if the release happens on the page that was locked. Switching
 * locale is a client-side navigation inside the same document — measured: a
 * marker set on `window` before the click survives it — and when the new page
 * unmounts the old drawer, this cleanup used to scroll the new page to wherever
 * the reader had been on the old one: switching language 1000px down a Turkish
 * product page opened the English page 1000px down. When the page has changed,
 * the router owns the position. A changed fragment on the same page is not a
 * new page: the reader's position is restored, and an in-page link waiting in
 * `afterScrollUnlock` scrolls on from there.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { body, documentElement } = document
    const scrollY = window.scrollY
    const lockedPath = window.location.pathname
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }

    locks += 1
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
      if (window.location.pathname === lockedPath) {
        window.scrollTo({ top: scrollY, behavior: 'instant' })
      }

      locks -= 1
      if (locks === 0 && waiting.length > 0) {
        const ready = waiting.splice(0)
        requestAnimationFrame(() => {
          for (const callback of ready) callback()
        })
      }
    }
  }, [locked])
}
