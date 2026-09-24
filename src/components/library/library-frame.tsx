import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/layout/footer'
import { SiteHeader } from '@/components/layout/header'
import { getDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'

/**
 * Header, `<main>` and footer for the product pages and guides.
 *
 * Like the legal pages, these are reading pages: no hero behind the header, so
 * it opens solid, and no scroll reveals — animating the paragraph someone is
 * reading is hostile, and a crawler rendering the page should find every
 * word already visible.
 */
export function LibraryFrame({
  locale,
  alternates,
  children,
}: {
  locale: Locale
  /** The page in each locale; the paths are translated. */
  alternates: Readonly<Record<Locale, string>>
  children: ReactNode
}) {
  const dictionary = getDictionary(locale)

  return (
    <>
      <SiteHeader
        locale={locale}
        nav={dictionary.nav}
        header={dictionary.header}
        alternates={alternates}
        alwaysSolid
      />

      {/* `overflow-x-clip`, not `-hidden` as on the other pages: `hidden`
          turns `<main>` into a scroll container, and a sticky element then
          sticks to `<main>` — which never scrolls — instead of the viewport.
          The related-pages column beside a document is sticky. */}
      <main className="relative overflow-x-clip bg-raymar-ivory pt-28 md:pt-36">
        {children}
      </main>

      <SiteFooter content={dictionary.footer} locale={locale} />
    </>
  )
}
