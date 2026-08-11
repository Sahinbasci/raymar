'use client'

import { ArrowShort } from '@/components/ui/icons'
import { cn } from '@/lib/cn'
import { useQuoteRequest } from './quote-request-context'

/** Header height plus breathing room, so the form is not tucked under it. */
const SCROLL_OFFSET = 80

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
 * asked about, then scrolls to the form. A real `<button>`, because it performs
 * an action on the page rather than navigating to a new document.
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

  const handleClick = () => {
    requestQuote(group, name)

    const target = document.getElementById('teklif')
    if (!target) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET,
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }

  if (variant === 'arrow') {
    return (
      <button
        type="button"
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
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(
        'cursor-pointer border-0 border-b border-raymar-ink/36 bg-transparent p-0 pb-1.25 text-[12.5px] font-normal tracking-[0.04em] text-raymar-ink/78 transition-colors duration-300 hover:border-raymar-gold hover:text-raymar-green',
        className,
      )}
    >
      {children}
    </button>
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
