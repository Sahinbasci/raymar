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
 * delivered — an element this component has hidden would stay at `opacity: 0`.
 * After this delay it is shown unconditionally. Content is never withheld by an
 * animation that did not run.
 */
const REVEAL_FALLBACK_MS = 4000

/**
 * How far below the fold an element must sit before it may be hidden.
 *
 * Transcribed from the approved design, which gated its own reveals the same
 * way: `filter((el) => el.getBoundingClientRect().top > vh * 0.9)`. Anything
 * nearer than this is already on screen or about to be, so hiding it would be
 * a visible flicker rather than an entrance.
 */
const BELOW_FOLD_RATIO = 0.9

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
 * **The hidden state is never server-rendered.** It used to be: `initial` was
 * `opacity: 0`, which put 55 transparent nodes into the prerendered HTML and
 * made every headline, product card and address below the hero wait on ~756 KB
 * of JavaScript. On a throttled 4G phone that was a blank ivory page for close
 * to three seconds. Now the element renders visible and only the entrance is
 * client-side: on mount it measures itself, and it may hide *only* if it is
 * still comfortably below the fold at that moment. Because the measurement
 * happens at hydration rather than at build time, a visitor who has already
 * scrolled past keeps everything on screen instead of watching it blink out.
 *
 * The consequence worth knowing: this component can no longer hide content from
 * a visitor whose JavaScript is slow, broken or disabled, because the hiding is
 * something JavaScript now has to opt into.
 *
 * Reduced motion resolves the animation instantly rather than rendering a
 * different element, so Motion always owns the same inline styles and hydration
 * has nothing to disagree about.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, revealViewport)
  /** Set on mount, and only for elements that were still below the fold then. */
  const [animatable, setAnimatable] = useState(false)
  const [fallbackReached, setFallbackReached] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (element.getBoundingClientRect().top <= window.innerHeight * BELOW_FOLD_RATIO) {
      return
    }

    setAnimatable(true)
    const timer = window.setTimeout(() => setFallbackReached(true), REVEAL_FALLBACK_MS)
    return () => window.clearTimeout(timer)
  }, [])

  const MotionTag = m[as as 'div']
  const shown = !animatable || Boolean(reduced) || inView || fallbackReached

  return (
    <MotionTag
      ref={ref}
      data-reveal=""
      className={className}
      /*
       * `false`, not the hidden state: it tells Motion to paint `animate`
       * directly on the first render instead of transitioning into it, which is
       * what keeps the server output visible and the hydrated output identical.
       */
      initial={false}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: revealDistance }}
      transition={
        reduced || !shown
          ? // Hiding is not an animation the visitor should ever watch — the
            // element is off screen by construction when this runs.
            { duration: 0 }
          : { ...revealTransition, delay: delay / 1000 }
      }
    >
      {children}
    </MotionTag>
  )
}
