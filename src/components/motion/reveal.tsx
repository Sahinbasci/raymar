'use client'

import { m, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { ElementType, ReactNode } from 'react'
import { revealDistance, revealTransition, revealViewport } from './tokens'

/**
 * Safety net, carried over from the approved design's own
 * `this._revealFallback = setTimeout(…, 5000)`.
 *
 * If the viewport observer never reports — which happens in embedded or
 * virtualised viewports where IntersectionObserver callbacks are not
 * delivered — every revealing element would stay at `opacity: 0` and the page
 * would render blank below the fold. After this delay the content is shown
 * unconditionally. Content is never withheld by an animation that did not run.
 */
const REVEAL_FALLBACK_MS = 4000

interface RevealProps {
  children: ReactNode
  /** Stagger in milliseconds, matching the design's `data-delay` attribute. */
  delay?: number
  /** Explicitly nullable: callers forward an optional class through. */
  className?: string | undefined
  /** Rendered element. Defaults to `div`; pass `p`, `article`, … to keep semantics. */
  as?: ElementType
}

/**
 * Scroll-triggered entrance used across every section.
 *
 * Only `opacity` and `transform` animate, and the reveal runs once. Children
 * are passed through untouched, so section markup stays server-rendered.
 *
 * Reduced motion is handled by resolving the animation instantly rather than by
 * rendering a different element. That distinction matters: the server always
 * renders the hidden `initial` state, and React's hydration does not clear
 * inline styles that the client render omits — branching to a plain element
 * here would leave `opacity: 0` stuck on the node and hide the content
 * permanently. Driving `shown` instead lets Motion overwrite those styles.
 *
 * `data-reveal` pairs with the `<noscript>` rule in the layout, so the content
 * is visible even when JavaScript never runs at all.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, revealViewport)
  const [fallbackReached, setFallbackReached] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setFallbackReached(true), REVEAL_FALLBACK_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const MotionTag = m[as as 'div']
  const shown = Boolean(reduced) || inView || fallbackReached

  return (
    <MotionTag
      ref={ref}
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: revealDistance }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: revealDistance }}
      transition={
        reduced
          ? { duration: 0 }
          : { ...revealTransition, delay: shown ? delay / 1000 : 0 }
      }
    >
      {children}
    </MotionTag>
  )
}
