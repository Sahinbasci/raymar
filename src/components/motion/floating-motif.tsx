'use client'

import Image from 'next/image'
import { m, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { floatingMotif } from '@/components/motion/tokens'
import { brandAssets } from '@/data/products'
import { cn } from '@/lib/cn'

/**
 * Decorative brand motif drifting in a section's negative space.
 *
 * Uses the official gold emblem rather than cut-out product photography, so no
 * new asset has to be produced or invented, and the ornament is unmistakably
 * Raymar rather than borrowed. Purely decorative: `aria-hidden`, not focusable,
 * and `pointer-events: none` so it can never intercept a click.
 *
 * **Takes no props.** Size, opacity, drift and position all come from
 * `floatingMotif` in motion/tokens.ts, and there is deliberately no way to
 * override them per call site: when they were props, the three instances on the
 * site had drifted to three different sizes, opacities and rotations at
 * percentage-based positions that moved with section height. The client's
 * report was that they read as scattered smudges. One constant is the fix, and
 * removing the props is what stops it recurring.
 *
 * Drift is a Motion value, so scrolling does not re-render, and it is disabled
 * entirely under `prefers-reduced-motion`.
 *
 * The caller is responsible for placing this inside an `overflow-hidden`
 * parent; the responsive overflow test fails if a motif escapes.
 */
/**
 * The motif is `hidden lg:block` in every caller, but a mounted component still
 * runs its `useScroll` subscription — a per-frame scroll/resize callback against
 * a `display:none` element — on the phones where it is never shown. Gating the
 * whole subtree on the same `lg` breakpoint keeps the hooks from mounting at
 * all below it, so nothing subscribes to scroll on mobile or tablet.
 *
 * 1080px, not Tailwind's default 1024px `lg` — this project redefines
 * `--breakpoint-lg` to 1080px (globals.css), which is what every caller's
 * `lg:block` actually compiles to. The gate has to match or there is a
 * 56px-wide window where the element is mounted (and animating) while still
 * `display:none`.
 */
export function FloatingMotif() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1080px)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  if (!enabled) return null
  return <FloatingMotifInner />
}

function FloatingMotifInner() {
  const { width, opacity, drift, position } = floatingMotif
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Flattened, not removed — see the note in `parallax-media.tsx`. Dropping the
  // key left the server's `translateY` on the node for reduced-motion users.
  const travel = reduced ? 0 : drift
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel])

  const height = Math.round((width / brandAssets.emblemRatio) * 100) / 100

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute hidden select-none lg:block', position)}
      style={{ width, height, opacity }}
    >
      <m.div style={{ y }}>
        <Image
          src={brandAssets.emblemGold}
          alt=""
          width={width}
          height={height}
          unoptimized
          style={{ width, height }}
        />
      </m.div>
    </div>
  )
}
