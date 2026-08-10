import { cn } from '@/lib/cn'

interface SectionEyebrowProps {
  children: string
  /** `gold` sits on the dark green surfaces; `dark` on ivory and cream. */
  tone: 'gold' | 'dark'
  className?: string
}

/**
 * The 48px rule + letterspaced caption that opens most sections.
 * The rule inherits `currentColor` at 50% opacity, exactly as in the design.
 */
export function SectionEyebrow({ children, tone, className }: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        'm-0 eyebrow',
        tone === 'gold' ? 'text-raymar-gold' : 'text-raymar-gold-dark',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="block h-px w-12 flex-none bg-current opacity-50"
      />
      {children}
    </p>
  )
}

/**
 * The smaller category label used on product cards: a 22px gold rule followed
 * by a letterspaced caption.
 */
export function CategoryLabel({ children }: { children: string }) {
  return (
    <span className="flex items-center gap-3 text-xs font-normal tracking-[0.24em] text-raymar-gold-dark uppercase">
      <span aria-hidden="true" className="block h-px w-[22px] bg-raymar-gold" />
      {children}
    </span>
  )
}
