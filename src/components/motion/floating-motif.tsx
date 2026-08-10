'use client'

import Image from 'next/image'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { brandAssets } from '@/data/products'
import { cn } from '@/lib/cn'

interface FloatingMotifProps {
  /** Positioning classes. Must place the motif inside an `overflow-hidden` parent. */
  className: string
  /** Rendered width in px; height follows the emblem's own ratio. */
  width: number
  /** Peak vertical drift in px across the section's scroll pass. */
  drift?: number
  /** 0–1. The design's footer watermark sits at 0.07; stay in that register. */
  opacity?: number
  /** Degrees. The emblem reads as a cluster, so slight rotation is safe. */
  rotate?: number
}

/**
 * Decorative brand motif drifting in a section's negative space.
 *
 * Uses the official gold emblem rather than cut-out product photography, so no
 * new asset has to be produced or invented, and the ornament is unmistakably
 * Raymar rather than borrowed. Purely decorative: `aria-hidden`, not focusable,
 * and `pointer-events: none` so it can never intercept a click.
 *
 * Deliberately restrained — a handful of marks at watermark opacity, never a
 * particle field. Drift is a Motion value, so scrolling does not re-render, and
 * it is disabled entirely under `prefers-reduced-motion`.
 *
 * The caller is responsible for placing this inside a clipping parent; the
 * responsive overflow test will fail the build's QA if a motif escapes.
 */
export function FloatingMotif({
  className,
  width,
  drift = 28,
  opacity = 0.07,
  rotate = 0,
}: FloatingMotifProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift])

  const height = Math.round((width / brandAssets.emblemRatio) * 100) / 100

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute select-none', className)}
      style={{ width, height, opacity }}
    >
      <m.div style={reduced ? {} : { y }}>
        <Image
          src={brandAssets.emblemGold}
          alt=""
          width={width}
          height={height}
          unoptimized
          style={{
            width,
            height,
            transform: rotate ? `rotate(${rotate}deg)` : undefined,
          }}
        />
      </m.div>
    </div>
  )
}
