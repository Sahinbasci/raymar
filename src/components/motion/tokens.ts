import type { Transition } from 'motion/react'

/**
 * Motion tokens — the single source of truth for animation feel.
 *
 * Values are transcribed from the approved design's inline transitions:
 *   reveal   `opacity .95s cubic-bezier(.2,.7,.2,1), transform .95s …`
 *   distance `translateY(22px)`
 *   stagger  the `data-delay` ladder (0 / 70-90 / 110-180 / 220-270 / 320-360)
 */
export const easeRaymar = [0.2, 0.7, 0.2, 1] as const

export const durations = {
  reveal: 0.95,
  hover: 0.5,
  imageHover: 1.1,
} as const

/** Vertical offset a revealing element travels, in px. */
export const revealDistance = 22

export const revealTransition: Transition = {
  duration: durations.reveal,
  ease: easeRaymar,
}

/**
 * Viewport rule for scroll reveals.
 *
 * `amount` mirrors the design's IntersectionObserver `threshold: 0.08`; the
 * negative bottom margin mirrors its `rootMargin: '0px 0px -12% 0px'`, so an
 * element only reveals once it is meaningfully inside the viewport.
 */
export const revealViewport = {
  once: true,
  amount: 0.08,
  margin: '0px 0px -12% 0px',
} as const

/** Parallax drift, in px, for each media element the design marks. */
export const parallaxOverscan = {
  /** `data-parallax="0.06"` — circular corporate portrait. */
  portrait: 32,
  /** `data-parallax="0.1"` — flagship section backdrop. */
  backdrop: 56,
} as const
