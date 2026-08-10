'use client'

import { LazyMotion, domAnimation } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Loads only Motion's DOM animation + gesture features instead of the full
 * bundle. `strict` makes the heavyweight `motion.*` components throw, which
 * keeps every animated element on the lightweight `m.*` components.
 *
 * `children` is a prop, so everything below this boundary still renders on the
 * server — this component adds a provider, not a client subtree.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
