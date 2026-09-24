import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LibraryIndex } from '@/components/library/library-index'
import { getDictionary } from '@/content'
import { isLocale } from '@/lib/i18n'
import {
  libraryAlternates,
  libraryIndexPath,
  libraryKindFor,
  librarySections,
} from '@/lib/library'
import { socialMetadata } from '@/lib/metadata'

/**
 * `/tr/urunler`, `/tr/rehber`, `/en/products`, `/en/guides`.
 *
 * A dynamic segment rather than four folders because the segment is
 * translated: the folder name cannot be both `urunler` and `products`. The
 * static legal-page folders beside it still win for their own URLs, and
 * `dynamicParams = false` makes anything this does not generate a 404 rather
 * than an attempt to render it.
 */

interface PageParams {
  params: Promise<{ locale: string; section: string }>
}

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return []
  const { locale } = params
  return Object.values(librarySections).map((byLocale) => ({ section: byLocale[locale] }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale, section } = await params
  if (!isLocale(locale)) return {}
  const kind = libraryKindFor(locale, section)
  if (!kind) return {}

  const content = getDictionary(locale).library[kind]

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: libraryAlternates(locale, kind),
    ...socialMetadata({
      locale,
      path: libraryIndexPath(locale, kind),
      title: content.metaTitle,
      description: content.metaDescription,
    }),
  }
}

export default async function LibraryIndexPage({ params }: PageParams) {
  const { locale, section } = await params
  if (!isLocale(locale)) notFound()
  const kind = libraryKindFor(locale, section)
  if (!kind) notFound()

  return <LibraryIndex locale={locale} kind={kind} />
}
