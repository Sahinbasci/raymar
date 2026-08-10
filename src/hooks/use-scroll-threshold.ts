'use client'

import { useEffect, useState } from 'react'

/**
 * How long to wait for the observer to report before falling back to a scroll
 * listener. IntersectionObserver always fires an initial callback, so anything
 * beyond a couple of frames means callbacks are not being delivered at all.
 */
const OBSERVER_GRACE_MS = 300

/**
 * Reports whether the page has scrolled past `offset` pixels.
 *
 * Primary path is a zero-height sentinel plus an IntersectionObserver: the
 * browser evaluates the threshold off the main thread and the hook only
 * re-renders on the two state flips, not on every scroll frame.
 *
 * Fallback path exists because some embedded and virtualised viewports never
 * deliver IntersectionObserver callbacks. Left unhandled, the header would stay
 * locked in its transparent state and its white navigation would be invisible
 * against the ivory page. The passive scroll listener is only attached when the
 * observer has proven silent, so the normal path costs nothing.
 */
export function useScrollThreshold(offset: number): boolean {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    Object.assign(sentinel.style, {
      position: 'absolute',
      top: `${offset}px`,
      left: '0',
      width: '1px',
      height: '1px',
      pointerEvents: 'none',
      opacity: '0',
    })
    document.body.appendChild(sentinel)

    let observerReported = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        observerReported = true
        if (entry) setPassed(!entry.isIntersecting)
      },
      { threshold: 0 },
    )
    observer.observe(sentinel)

    const onScroll = () => setPassed(window.scrollY > offset)

    const grace = window.setTimeout(() => {
      if (observerReported) return
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
    }, OBSERVER_GRACE_MS)

    return () => {
      window.clearTimeout(grace)
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
      sentinel.remove()
    }
  }, [offset])

  return passed
}
