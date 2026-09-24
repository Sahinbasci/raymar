'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLayoutEffect, type MouseEvent } from 'react'
import { afterScrollUnlock } from '@/hooks/use-body-scroll-lock'
import { cn } from '@/lib/cn'
import { locales, localeLabels, localeTags, isPublished, type Locale } from '@/lib/i18n'
import { swapLocale } from '@/lib/locale-path'
import {
  captureReadingPosition,
  carryReadingPosition,
  restoreReadingPosition,
  takeReadingPosition,
} from '@/lib/reading-position'

interface LanguageSwitchProps {
  current: Locale
  /** Tooltip for a locale whose copy has not been approved yet. */
  pendingLabel: string
  /**
   * `header` sits on the transparent-then-solid bar over the hero. `drawer` is
   * the same control inside the mobile menu: ivory ground, and targets sized
   * for a thumb rather than a cursor.
   */
  variant?: 'header' | 'drawer'
  /**
   * The same page in each locale, for pages whose path is translated as well
   * as prefixed. The product pages and guides are: `/tr/urunler/ceviz-ici` is
   * `/en/products/walnut-kernels`, and swapping the prefix alone would send the
   * reader to `/en/urunler/ceviz-ici`, which does not exist.
   */
  alternates?: Readonly<Partial<Record<Locale, string>>> | undefined
  /**
   * Runs before the switch navigates. The drawer closes itself here, so its
   * scroll lock has let go of the page before the other locale is placed.
   */
  onNavigate?: (() => void) | undefined
  className?: string
}

const STYLES = {
  header: {
    root: 'gap-2 border-l pl-7 border-raymar-white/20 group-data-[solid=true]/header:border-raymar-green/18',
    pair: 'gap-2',
    separator:
      'text-xs text-raymar-white/55 group-data-[solid=true]/header:text-raymar-ink/76',
    item: 'px-0.5 py-0.5 text-xs font-medium tracking-[0.1em]',
    current: 'text-raymar-gold group-data-[solid=true]/header:text-raymar-gold-dark',
    link: 'text-raymar-white/80 group-data-[solid=true]/header:text-raymar-ink/78 hover:text-raymar-gold',
  },
  drawer: {
    root: 'gap-1',
    pair: 'gap-1',
    separator: 'text-sm text-raymar-green/40',
    // 48px square: comfortably over the 44px minimum, and the two options sit
    // far enough apart that a thumb aimed at one cannot land on the other.
    item: 'flex min-h-12 min-w-12 items-center justify-center text-sm font-medium tracking-[0.16em]',
    current: 'text-raymar-gold-dark',
    link: 'text-raymar-green hover:text-raymar-gold-dark',
  },
} as const

/**
 * TR / EN control.
 *
 * Three defects were measured on the live site and are the reason this is no
 * longer a pair of plain links to `/${locale}`:
 *
 *   - The target ignored the page. Switching language on a legal document went
 *     to the other locale's homepage instead of the same document translated.
 *     `swapLocale` keeps the path and replaces only the locale segment, and a
 *     page whose path is translated as well passes its `alternates`.
 *
 *   - Switching lost the reader's place. The switch is a client-side
 *     navigation (measured: state set on `window` survives it), and the router
 *     opens a new page at its top. Carrying the section across as a fragment
 *     only half fixed it: a reader deep in a section was thrown back to that
 *     section's start — up to 2700px on a phone — and on product pages, guides
 *     and legal notices, whose anchors are translated, all the way to the top.
 *     The reading position is now taken before the switch and put back on the
 *     translation, paragraph for paragraph (see `lib/reading-position`).
 *
 *   - The landing moved after it happened. With `scroll-behavior: smooth` on
 *     the page, the router's scroll ran as an animation and ended at the
 *     footer. The CSS rule is gone (see `InPageNavigation`), and the position
 *     is restored instantly, before the new page is painted.
 *
 * Only a plain primary click is intercepted: a modified click (new tab, new
 * window) keeps the browser's own behaviour and opens the plain translated URL,
 * as does a visitor without JavaScript.
 *
 * A locale without approved copy still renders disabled rather than linking to
 * a Turkish page under an English URL.
 */
export function LanguageSwitch({
  current,
  pendingLabel,
  variant = 'header',
  alternates,
  onNavigate,
  className,
}: LanguageSwitchProps) {
  const pathname = usePathname() ?? `/${current}`
  const router = useRouter()
  const styles = STYLES[variant]

  /*
   * The page this switch arrived on is the translation of the one the reader
   * left, so the position they carried is placed here — in a layout effect,
   * after the new page is in the DOM and before it is painted, so the page is
   * never seen at the wrong height. Both copies of the switch (header and
   * drawer) run this; the first takes the position and the second finds none.
   * The drawer closes itself before navigating, so its scroll lock has normally
   * let go by now; if it has not, the position waits for it rather than being
   * written to a pinned page and lost.
   */
  useLayoutEffect(() => {
    const position = takeReadingPosition(pathname)
    if (position) afterScrollUnlock(() => restoreReadingPosition(position))
  }, [pathname])

  const switchTo = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    carryReadingPosition(captureReadingPosition(), target)
    onNavigate?.()
    router.push(target, { scroll: false })
  }

  return (
    <div
      className={cn(
        'flex items-center transition-colors duration-[450ms]',
        styles.root,
        className,
      )}
    >
      {locales.map((locale, index) => {
        const target = alternates?.[locale] ?? swapLocale(pathname, locale)

        return (
          <div key={locale} className={cn('flex items-center', styles.pair)}>
            {index > 0 ? (
              <span
                aria-hidden="true"
                className={cn('transition-colors duration-[450ms]', styles.separator)}
              >
                /
              </span>
            ) : null}

            {locale === current ? (
              <span
                aria-current="true"
                lang={localeTags[locale]}
                className={cn(
                  'transition-colors duration-[450ms]',
                  styles.item,
                  styles.current,
                )}
              >
                {localeLabels[locale]}
              </span>
            ) : isPublished(locale) ? (
              <Link
                href={target}
                hrefLang={localeTags[locale]}
                lang={localeTags[locale]}
                onClick={(event) => switchTo(event, target)}
                className={cn(
                  'transition-colors duration-[450ms]',
                  styles.item,
                  styles.link,
                )}
              >
                {localeLabels[locale]}
              </Link>
            ) : (
              <button
                type="button"
                aria-disabled="true"
                title={pendingLabel}
                className={cn(
                  'cursor-not-allowed border-0 bg-transparent transition-colors duration-[450ms]',
                  styles.item,
                  styles.link,
                )}
              >
                {localeLabels[locale]}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
