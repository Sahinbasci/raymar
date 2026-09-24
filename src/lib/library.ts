import { guidePages, productPages } from '@/content/library'
import type {
  GuideId,
  GuidePage,
  LibraryKind,
  ProductPage,
  ProductPageId,
} from '@/content/library/types'
import { completeLocales, defaultLocale, localeTags, type Locale } from '@/lib/i18n'

/**
 * URL structure for the product pages and the guides.
 *
 * The section segment is translated along with the slug. An English buyer's
 * results then read `/en/products/walnut-kernels` and `/en/guides/…`, which is
 * both what they typed and what they will click; a Turkish segment in an
 * English URL is a small but real drag on click-through from a results page.
 *
 * Every path the site emits for these pages is built here, so the route files,
 * the sitemap, the hreflang cluster and every internal link cannot disagree
 * about what a page is called.
 */
export const librarySections: Record<LibraryKind, Record<Locale, string>> = {
  products: { tr: 'urunler', en: 'products' },
  guides: { tr: 'rehber', en: 'guides' },
}

export function libraryKindFor(locale: Locale, section: string): LibraryKind | null {
  for (const kind of Object.keys(librarySections) as LibraryKind[]) {
    if (librarySections[kind][locale] === section) return kind
  }
  return null
}

export function libraryIndexPath(locale: Locale, kind: LibraryKind): string {
  return `/${locale}/${librarySections[kind][locale]}`
}

function slugOf(locale: Locale, kind: LibraryKind, id: ProductPageId | GuideId): string {
  const pages = kind === 'products' ? productPages(locale) : guidePages(locale)
  const page = pages.find((candidate) => candidate.id === id)
  if (!page) throw new Error(`No ${kind} page "${id}" in locale "${locale}"`)
  return page.slug
}

export function productPath(locale: Locale, id: ProductPageId): string {
  return `${libraryIndexPath(locale, 'products')}/${slugOf(locale, 'products', id)}`
}

export function guidePath(locale: Locale, id: GuideId): string {
  return `${libraryIndexPath(locale, 'guides')}/${slugOf(locale, 'guides', id)}`
}

export type LibraryEntry =
  | { readonly kind: 'products'; readonly page: ProductPage }
  | { readonly kind: 'guides'; readonly page: GuidePage }

export function entryPath(locale: Locale, entry: LibraryEntry): string {
  return entry.kind === 'products'
    ? productPath(locale, entry.page.id)
    : guidePath(locale, entry.page.id)
}

/** Resolves a `[section]/[slug]` pair from the URL to its page, or `null`. */
export function findEntry(
  locale: Locale,
  section: string,
  slug: string,
): LibraryEntry | null {
  const kind = libraryKindFor(locale, section)
  if (kind === 'products') {
    const page = productPages(locale).find((candidate) => candidate.slug === slug)
    return page ? { kind, page } : null
  }
  if (kind === 'guides') {
    const page = guidePages(locale).find((candidate) => candidate.slug === slug)
    return page ? { kind, page } : null
  }
  return null
}

/**
 * The same page in every published locale — what the language switch links
 * to. The slugs differ per locale, so the switch cannot build these by swapping
 * the locale segment the way it does everywhere else on the site.
 */
export function entryAlternates(entry: LibraryEntry): Record<Locale, string> {
  return Object.fromEntries(
    completeLocales.map((code) => [code, entryPath(code, entry)]),
  ) as Record<Locale, string>
}

export function indexAlternates(kind: LibraryKind): Record<Locale, string> {
  return Object.fromEntries(
    completeLocales.map((code) => [code, libraryIndexPath(code, kind)]),
  ) as Record<Locale, string>
}

/*
 * Reading speed differs by language, not just by reader: Turkish is
 * agglutinative, so the same text runs to fewer, longer words than its English
 * translation. Conservative figures for considered reading of informational
 * prose rather than skimming.
 */
const WORDS_PER_MINUTE: Record<Locale, number> = { tr: 160, en: 220 }

/** Whole minutes, rounded up, never zero. */
export function readingMinutes(locale: Locale, page: GuidePage): number {
  const text = [
    page.lead,
    ...page.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.list ?? []),
    ]),
    ...page.faq.flatMap((entry) => [entry.question, entry.answer]),
  ].join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE[locale]))
}

/**
 * An ISO date from the content as a timestamp for metadata and markup.
 *
 * Pinned to Istanbul, where the pages are written. A bare date is valid ISO
 * 8601, but Google's article documentation recommends a time zone and
 * otherwise assumes Googlebot's own — for a date written at midnight, that can
 * be the previous day.
 */
export function publishedTimestamp(date: string): string {
  return `${date}T09:00:00+03:00`
}

/** The date as a reader in the locale expects to see it. */
export function formatLibraryDate(locale: Locale, date: string): string {
  return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Istanbul',
  }).format(new Date(publishedTimestamp(date)))
}

/**
 * The full `alternates` block for a library page.
 *
 * Returned whole, canonical and languages together, because a page-level
 * `alternates` in Next replaces the layout's rather than merging with it — the
 * legal pages lost their hreflang for exactly that reason. The two locales use
 * different slugs, so the cluster cannot be built by swapping a prefix: each
 * alternate is resolved by id.
 */
export function libraryAlternates(
  locale: Locale,
  kind: LibraryKind,
  id?: ProductPageId | GuideId,
) {
  const pathFor = (code: Locale) =>
    id === undefined
      ? libraryIndexPath(code, kind)
      : kind === 'products'
        ? productPath(code, id as ProductPageId)
        : guidePath(code, id as GuideId)

  return {
    canonical: pathFor(locale),
    languages: {
      ...Object.fromEntries(
        completeLocales.map((code) => [localeTags[code], pathFor(code)]),
      ),
      'x-default': pathFor(defaultLocale),
    },
  }
}
