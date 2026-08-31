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

/**
 * The decorative brand motif — one fixed treatment, used identically everywhere.
 *
 * Every value here used to be passed per call site, and they had all drifted
 * apart: three instances across two sections at 138/112/64px wide, 0.08/0.07/
 * 0.06 opacity and −8°/+10°/+14° rotation. Because the positions were set in
 * percentages, each one also landed at a different height depending on how tall
 * its section happened to be. The result read as scattered smudges rather than a
 * watermark — which is what the client reported.
 *
 * Now it is one constant. A second motif in a single section is not a variant to
 * tune, it is clutter, so `statement-section` no longer carries one.
 *
 * `top` is in px, not a percentage: that is what makes the motif land in the
 * same place in every section regardless of section height, which was the whole
 * complaint. `right` stays proportional so it tracks the shell's edge as the
 * viewport widens.
 */
export const floatingMotif = {
  /** Rendered width in px. One size everywhere. */
  width: 118,
  /**
   * Slightly above the 0.07 the design used for the footer watermark. At 0.07
   * against the dark green statement panel the mark read as a smudge rather
   * than as the emblem; 0.10 is still firmly in watermark register — it never
   * competes with the headline — but it resolves as deliberate.
   */
  opacity: 0.1,
  /** Scroll drift in px. */
  drift: 28,
  /**
   * Fixed anchor. Rotation is deliberately absent: a rotated emblem reads as a
   * mistake on a brand mark whose dot cluster has an obvious orientation.
   */
  position: 'top-[132px] right-[7%]',
} as const
