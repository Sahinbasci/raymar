'use client'

import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'

interface ParallaxMediaProps {
  children: ReactNode
  /**
   * Peak drift in px. The media is oversized by this amount top and bottom, so
   * the crop never exposes the surface behind it at either end of the travel.
   */
  overscan: number
  /** Class names for the clipping frame (position, size, radius, background). */
  className?: string
}

/**
 * Scroll-linked parallax for a single media element.
 *
 * The design computed `translate3d(0, (elementCentre - viewportCentre) * -k, 0)`
 * on every scroll event. This reproduces the same linear relationship with a
 * Motion value, so nothing re-renders during scroll — Motion writes the
 * transform straight to the compositor.
 *
 * The inner frame is inflated by `overscan` on both axes of travel. The design
 * prototype translated a full-height image without that allowance, which
 * exposed a strip of section background at the extremes; the inflation keeps the
 * intended movement while removing the seam.
 */
export function ParallaxMedia({ children, overscan, className }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-overscan, overscan])

  return (
    <div ref={ref} className={className}>
      <m.div
        className="absolute inset-x-0"
        style={{
          top: -overscan,
          bottom: -overscan,
          ...(reduced ? {} : { y }),
        }}
      >
        {children}
      </m.div>
    </div>
  )
}
