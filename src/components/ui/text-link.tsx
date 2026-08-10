import Link from 'next/link'
import { cn } from '@/lib/cn'
import { ArrowLong, ArrowShort } from './icons'

interface UnderlineLinkProps {
  href: string
  children: string
  /** The design uses the long arrow on section links, the short one on cards. */
  arrow?: 'long' | 'short'
  className?: string
}

/**
 * Letterspaced uppercase link with a hairline underline and a gold arrow that
 * slides on hover. The arrow travel is a CSS transition — no JS involved.
 */
export function UnderlineLink({
  href,
  children,
  arrow = 'long',
  className,
}: UnderlineLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-3.5 border-b border-raymar-green/28 pb-3 text-xs font-normal tracking-[0.2em] text-raymar-green uppercase transition-colors duration-300 hover:border-raymar-gold',
        className,
      )}
    >
      {children}
      <span className="inline-flex text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
        {arrow === 'long' ? <ArrowLong /> : <ArrowShort />}
      </span>
    </Link>
  )
}

/** Plain arrow link without the underline rule, used inside product cards. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2.5 text-xs font-normal tracking-[0.2em] text-raymar-green uppercase transition-colors duration-300 hover:text-raymar-gold-dark',
        className,
      )}
    >
      {children}
      <span className="inline-flex text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
        <ArrowShort />
      </span>
    </Link>
  )
}
