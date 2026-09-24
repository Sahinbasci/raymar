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
 * The observer is the *trigger*, not the answer. Its callback re-reads
 * `window.scrollY` instead of trusting `entry.isIntersecting`, and the effect
 * reads it once on mount before the observer has said anything at all.
 *
 * The motive is the failure mode, not a reproduction: every state this hook
 * can be wrong about is one it never gets a second chance at. The header's
 * two states differ by more than decoration — transparent means white
 * navigation, and on the ivory page below the hero that is white on
 * near-white. If the state is ever settled wrongly while the page is already
 * scrolled — the reader scrolled during hydration, the browser restored a
 * position, the URL carried a fragment — no further scroll is coming to
 * correct it. `entry.isIntersecting` is a snapshot of whenever the browser
 * last computed the intersection; `window.scrollY` is the position now. The
 * second costs one property read, cannot be stale, and leaves the observer
 * doing what it is good at: telling us *when* to look, without a listener on
 * every scroll frame.
 *
 * To be clear about what this is: a rare `data-solid` failure did show up
 * once in Firefox under a full parallel suite, and it is what sent me here,
 * but it did not reproduce — not in isolation, not at ten workers, not with
 * the JavaScript held back so the scroll lands before hydration. This is the
 * more defensible of two equally cheap readings, not a diagnosed fix.
 *
 * Fallback path exists because some embedded and virtualised viewports never
 * deliver IntersectionObserver callbacks. Left unhandled, the header would stay
 * locked in its transparent state. The passive scroll listener is only attached
 * when the observer has proven silent, so the normal path costs nothing.
 */
export function useScrollThreshold(offset: number): boolean {
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const read = () => setPassed(window.scrollY > offset)

    read()

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
      () => {
        observerReported = true
        read()
      },
      { threshold: 0 },
    )
    observer.observe(sentinel)

    const grace = window.setTimeout(() => {
      if (observerReported) return
      read()
      window.addEventListener('scroll', read, { passive: true })
    }, OBSERVER_GRACE_MS)

    return () => {
      window.clearTimeout(grace)
      window.removeEventListener('scroll', read)
      observer.disconnect()
      sentinel.remove()
    }
  }, [offset])

  return passed
}
