'use client'

import { ArrowShort } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import { useQuoteRequest } from './quote-request-context'

interface QuoteRequestButtonProps {
  /** Product group that should be preselected in the form. */
  group: string
  /** Product name written into the message prefill. */
  name: string
  children: string
  variant: 'underline' | 'arrow'
  className?: string
  /**
   * Overrides the accessible name. Every card renders the same visible label,
   * so without this a screen-reader user listing the page's buttons hears
   * "Teklif Talep Et" a dozen times with nothing to tell them apart.
   */
  ariaLabel?: string
}

/**
 * "Teklif Talep Et" affordance on a product card: records which product was
 * asked about, then hands off to the form.
 *
 * A real `<a href="#teklif">`, not a `<button>` with a manual `scrollTo` —
 * this used to be the latter, which moved the viewport but never moved focus.
 * A keyboard user who activated it landed on the form visually but stayed
 * tabbing from wherever the button sat, so the next Tab threw them back up the
 * page. Native fragment navigation both scrolls (globals.css already sets
 * `scroll-behavior: smooth` and `scroll-padding-top: 96px`, with a
 * `prefers-reduced-motion` override) and sets the browser's sequential focus
 * navigation starting point, so the next Tab continues inside the form.
 */
export function QuoteRequestButton({
  group,
  name,
  children,
  variant,
  className,
  ariaLabel,
}: QuoteRequestButtonProps) {
  const { requestQuote } = useQuoteRequest()
  const handleClick = () => requestQuote(group, name)

  if (variant === 'arrow') {
    return (
      <a
        href="#teklif"
        onClick={handleClick}
        aria-label={ariaLabel}
        className={cn(
          'group inline-flex cursor-pointer items-center gap-2.5 border-0 border-b border-raymar-green/24 bg-transparent p-0 pb-2.5 text-xs font-normal tracking-[0.2em] text-raymar-green uppercase transition-colors duration-300 hover:border-raymar-gold',
          className,
        )}
      >
        {children}
        <span className="inline-flex text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
          <ArrowShort />
        </span>
      </a>
    )
  }

  return (
    <a
      href="#teklif"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(
        'cursor-pointer border-0 border-b border-raymar-ink/36 bg-transparent p-0 pb-1.25 text-[12.5px] font-normal tracking-[0.04em] text-raymar-ink/78 transition-colors duration-300 hover:border-raymar-gold hover:text-raymar-green',
        className,
      )}
    >
      {children}
    </a>
  )
}

/**
 * "Detayları Gör" on a product card.
 *
 * Stays an anchor because it moves the reader to the `#teklif` section — the
 * browser performs the navigation; the handler only records which product was
 * being viewed so the form arrives pre-filled. There are no per-product detail
 * pages in the approved design; when they exist, only this `href` changes.
 */
export function QuoteDetailLink({
  group,
  name,
  children,
}: {
  group: string
  name: string
  children: string
}) {
  const { requestQuote } = useQuoteRequest()

  return (
    <a
      href="#teklif"
      onClick={() => requestQuote(group, name)}
      className="group inline-flex items-center gap-2.5 text-xs font-normal tracking-[0.2em] text-raymar-green uppercase transition-colors duration-300 hover:text-raymar-gold-dark max-[719px]:py-1.5"
    >
      {children}
      <span className="inline-flex text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
        <ArrowShort />
      </span>
    </a>
  )
}
