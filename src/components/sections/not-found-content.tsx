'use client'

import { useEffect, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { BrandLogo } from '@/components/media/brand-logo'
import type { Locale } from '@/lib/i18n'

export interface NotFoundCopy {
  readonly code: string
  readonly heading: string
  readonly cta: string
  readonly metaTitle: string
  readonly logoAlt: string
}

/** The path never changes while this page is open, so nothing to subscribe to. */
const noSubscription = () => () => {}

/**
 * The body of the 404 page, in whichever language the URL implies.
 *
 * A static export has no request-time branch to pick a language with, and the
 * document that answers every unmatched URL is one file. So the server renders
 * Turkish — the default locale — and this switches to English when the path
 * says the visitor was reading English. An English buyer who mistypes an
 * `/en/...` URL would otherwise get a Turkish error page and a link into the
 * Turkish homepage.
 *
 * `useSyncExternalStore` rather than an inline script or a state update in an
 * effect. The script version was undone by React the moment it hydrated, with
 * a text-content mismatch logged to the console; this is the sanctioned way to
 * read something only the browser knows — the server snapshot renders Turkish,
 * and the client snapshot replaces it in React's own re-render.
 */
export function NotFoundContent({
  locale,
  languageTag,
  tr,
  en,
}: {
  /** The locale the document was rendered in. */
  locale: Locale
  /** The `lang` value for the English copy, when it is swapped in. */
  languageTag: string
  tr: NotFoundCopy
  en: NotFoundCopy
}) {
  const english = useSyncExternalStore(
    noSubscription,
    () => window.location.pathname.startsWith('/en'),
    () => locale === 'en',
  )
  const copy = english ? en : tr

  useEffect(() => {
    if (!english) return
    document.documentElement.lang = languageTag

    /*
     * The `<title>` belongs to Next's metadata, which React writes into the
     * head during hydration — an assignment made before that lands is simply
     * overwritten, and the tab kept saying "Sayfa bulunamadı" over an English
     * page. Setting it again on the next frame fixed it on most engines and
     * raced on others, so this watches the head instead and re-applies
     * whenever something puts the Turkish title back.
     */
    const apply = () => {
      if (document.title !== en.metaTitle) document.title = en.metaTitle
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    })
    return () => observer.disconnect()
  }, [english, languageTag, en.metaTitle])

  return (
    <div className="shell">
      <BrandLogo variant="white-gold" height={52} alt={copy.logoAlt} priority />
      <p className="mt-12 text-xs font-normal tracking-[0.3em] text-raymar-gold uppercase">
        {copy.code}
      </p>
      <h1 className="mt-6 max-w-[720px] text-[clamp(34px,4.2vw,64px)] leading-[1.04] tracking-[-0.012em] text-raymar-white">
        {copy.heading}
      </h1>
      <Link
        href={english ? '/en' : `/${locale}`}
        className="mt-12 inline-flex items-center gap-3 bg-raymar-gold px-[42px] py-[21px] text-xs font-medium tracking-[0.2em] text-raymar-green-deep uppercase transition-colors duration-300 hover:bg-raymar-gold-hover"
      >
        {copy.cta}
      </Link>
    </div>
  )
}
