import type { Metadata } from 'next'
import Link from 'next/link'
import { BrandLogo } from '@/components/media/brand-logo'
import { getDictionary } from '@/content'
import { cormorant, cormorantItalic, jost } from '@/lib/fonts'
import { defaultLocale, localeTags } from '@/lib/i18n'
import './globals.css'

/**
 * 404 for every URL that matches no route.
 *
 * This has to be a `global-not-found` rather than a route-level `not-found`
 * because the only layout carrying `<html>` sits under the dynamic `[locale]`
 * segment. With no static root layout to compose against, a route-level file
 * never rendered and unmatched URLs fell through to Next's built-in English
 * page — no `lang` attribute, no branding, and a Turkish visitor following a
 * stale link got an English error.
 *
 * Next skips normal rendering for this file, so it must return the whole
 * document and pull in its own styles and fonts.
 *
 * Copy is read from the default locale's dictionary: the URL matched no route,
 * so there is no locale to resolve from it.
 */

const dictionary = getDictionary(defaultLocale)

export const metadata: Metadata = {
  title: dictionary.notFound.metaTitle,
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  const { notFound, header } = dictionary

  return (
    <html
      lang={localeTags[defaultLocale]}
      className={`${jost.variable} ${cormorant.variable} ${cormorantItalic.variable}`}
    >
      <body>
        <main className="flex min-h-screen flex-col items-start justify-center bg-raymar-green">
          <div className="shell">
            <BrandLogo variant="white-gold" height={52} alt={header.logoAlt} />
            <p className="mt-12 text-xs font-normal tracking-[0.3em] text-raymar-gold uppercase">
              {notFound.code}
            </p>
            <h1 className="mt-6 max-w-[720px] text-[clamp(34px,4.2vw,64px)] leading-[1.04] tracking-[-0.012em] text-raymar-white">
              {notFound.heading}
            </h1>
            <Link
              href={`/${defaultLocale}`}
              className="mt-12 inline-flex items-center gap-3 bg-raymar-gold px-[42px] py-[21px] text-xs font-medium tracking-[0.2em] text-raymar-green-deep uppercase transition-colors duration-300 hover:bg-raymar-gold-hover"
            >
              {notFound.cta}
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
