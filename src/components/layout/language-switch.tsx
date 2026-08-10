import Link from 'next/link'
import { cn } from '@/lib/cn'
import { locales, localeLabels, isPublished, type Locale } from '@/lib/i18n'

interface LanguageSwitchProps {
  current: Locale
  /** Tooltip for a locale whose copy has not been approved yet. */
  pendingLabel: string
  className?: string
}

/**
 * TR / EN control.
 *
 * A locale without approved copy renders in the design's inactive state and is
 * marked `aria-disabled` rather than being hidden or silently linked to a
 * Turkish page. Publishing English is a one-line change in `lib/i18n.ts`; this
 * component then links to it automatically.
 */
export function LanguageSwitch({
  current,
  pendingLabel,
  className,
}: LanguageSwitchProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 border-l pl-7 transition-colors duration-[450ms]',
        'border-raymar-white/20 group-data-[solid=true]/header:border-raymar-green/18',
        className,
      )}
    >
      {locales.map((locale, index) => (
        <div key={locale} className="flex items-center gap-2">
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="text-xs text-raymar-white/55 transition-colors duration-[450ms] group-data-[solid=true]/header:text-raymar-ink/76"
            >
              /
            </span>
          ) : null}

          {locale === current ? (
            <span
              aria-current="true"
              className="px-0.5 py-0.5 text-xs font-medium tracking-[0.1em] text-raymar-gold transition-colors duration-[450ms] group-data-[solid=true]/header:text-raymar-gold-dark"
            >
              {localeLabels[locale]}
            </span>
          ) : isPublished(locale) ? (
            <Link
              href={`/${locale}`}
              className="px-0.5 py-0.5 text-xs font-medium tracking-[0.1em] text-raymar-white/80 transition-colors duration-[450ms] group-data-[solid=true]/header:text-raymar-ink/78 hover:text-raymar-gold"
            >
              {localeLabels[locale]}
            </Link>
          ) : (
            <button
              type="button"
              aria-disabled="true"
              title={pendingLabel}
              className="cursor-not-allowed border-0 bg-transparent px-0.5 py-0.5 text-xs font-medium tracking-[0.1em] text-raymar-white/80 transition-colors duration-[450ms] group-data-[solid=true]/header:text-raymar-ink/78"
            >
              {localeLabels[locale]}
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
