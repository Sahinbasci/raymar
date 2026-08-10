'use client'

import { useEffect } from 'react'

/**
 * Locks background scrolling while an overlay is open.
 *
 * The scrollbar width is compensated with padding so that locking does not
 * shift the fixed header sideways on desktop. iOS Safari ignores `overflow`
 * on `body` for the page scroller, so the scroll position is pinned with
 * `position: fixed` and restored on release.
 */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { body, documentElement } = document
    const scrollY = window.scrollY
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth

    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }

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
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [locked])
}
