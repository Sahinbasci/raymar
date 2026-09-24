import type { Metadata, Viewport } from 'next'
import { NotFoundContent } from '@/components/sections/not-found-content'
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
 * The document is rendered in the default locale, because the URL matched no
 * route and there is no locale to resolve from it. It usually still says which
 * language the visitor was reading, though, so `NotFoundContent` swaps itself
 * into English after hydration when the path starts with `/en`.
 */

const dictionary = getDictionary(defaultLocale)
const english = getDictionary('en')

export const metadata: Metadata = {
  title: dictionary.notFound.metaTitle,
  robots: { index: false, follow: false },
}

/** Mirrors `[locale]/layout.tsx` — see the comment there. Without this the 404
 *  was the one page on the site with no `theme-color`. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#004c38' },
    { media: '(prefers-color-scheme: dark)', color: '#004c38' },
  ],
}

export default function GlobalNotFound() {
  return (
    <html
      lang={localeTags[defaultLocale]}
      className={`${jost.variable} ${cormorant.variable} ${cormorantItalic.variable}`}
    >
      <body>
        <main className="flex min-h-dvh flex-col items-start justify-center bg-raymar-green">
          <NotFoundContent
            locale={defaultLocale}
            languageTag={localeTags.en}
            tr={{ ...dictionary.notFound, logoAlt: dictionary.header.logoAlt }}
            en={{ ...english.notFound, logoAlt: english.header.logoAlt }}
          />
        </main>
      </body>
    </html>
  )
}
