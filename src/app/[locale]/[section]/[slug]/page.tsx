import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LibraryDocument } from '@/components/library/library-document'
import { guidePages, productPages } from '@/content/library'
import { isLocale } from '@/lib/i18n'
import { imageVariant } from '@/lib/image-variant'
import {
  entryPath,
  findEntry,
  libraryAlternates,
  librarySections,
  publishedTimestamp,
} from '@/lib/library'
import { socialMetadata } from '@/lib/metadata'

/**
 * One product page or guide, e.g. `/tr/urunler/ceviz-ici` or
 * `/en/guides/pecan-vs-walnut`. Generated from the library content, so a page
 * exists exactly when its document does.
 */

interface PageParams {
  params: Promise<{ locale: string; section: string; slug: string }>
}

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  const { locale } = params
  return [
    ...productPages(locale).map((page) => ({
      section: librarySections.products[locale],
      slug: page.slug,
    })),
    ...guidePages(locale).map((page) => ({
      section: librarySections.guides[locale],
      slug: page.slug,
    })),
  ]
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, section, slug } = await params
  if (!isLocale(locale)) return {}
  const entry = findEntry(locale, section, slug)
  if (!entry) return {}

  const { page } = entry
  const image = imageVariant(page.image)

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: libraryAlternates(locale, entry.kind, page.id),
    ...socialMetadata({
      locale,
      path: entryPath(locale, entry),
      title: page.metaTitle,
      description: page.metaDescription,
      image: { ...image, alt: page.imageAlt },
      article:
        entry.kind === 'guides'
          ? {
              publishedTime: publishedTimestamp(entry.page.published),
              modifiedTime: publishedTimestamp(entry.page.updated),
            }
          : undefined,
    }),
  }
}

export default async function LibraryPage({ params }: PageParams) {
  const { locale, section, slug } = await params
  if (!isLocale(locale)) notFound()
  const entry = findEntry(locale, section, slug)
  if (!entry) notFound()

  return <LibraryDocument locale={locale} entry={entry} />
}
