import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { ChevronTrail } from './icons'

/**
 * Button geometry from the design: square corners, 21px/42px padding,
 * 12px uppercase type at 0.2em tracking. No pill radii anywhere in this brand.
 */
const base =
  'inline-flex items-center gap-3 rounded-none px-[42px] py-[21px] text-xs font-medium tracking-[0.2em] uppercase transition-[background-color,border-color,transform,color] duration-300 ease-out'

const variants = {
  /** Primary action on dark green surfaces. */
  gold: 'bg-raymar-gold text-raymar-green-deep hover:bg-raymar-gold-hover hover:-translate-y-0.5',
  /** Ghost action on dark green surfaces. */
  outline:
    'border border-raymar-ivory/30 text-raymar-white hover:border-raymar-ivory hover:bg-raymar-ivory/8',
  /** Primary action on light surfaces (used by the quote form submit). */
  green:
    'bg-raymar-green text-raymar-white hover:bg-raymar-green-hover hover:-translate-y-0.5',
} as const

export type ButtonVariant = keyof typeof variants

interface ButtonLinkProps {
  href: string
  variant: ButtonVariant
  children: ReactNode
  withIcon?: boolean
  className?: string
}

export function ButtonLink({
  href,
  variant,
  children,
  withIcon = false,
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {withIcon ? <ChevronTrail /> : null}
    </Link>
  )
}

export { base as buttonBase, variants as buttonVariants }
