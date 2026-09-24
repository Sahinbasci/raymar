import type { MetadataRoute } from 'next'
import { guidePages, productPages } from '@/content/library'
import type { LibraryKind } from '@/content/library/types'
import { completeLocales, defaultLocale, localeTags } from '@/lib/i18n'
import { imageVariant } from '@/lib/image-variant'
import { legalSlugs } from '@/lib/legal'
import { libraryAlternates, publishedTimestamp } from '@/lib/library'
import { siteUrl } from '@/lib/site'

/**
 * Lists only locales with approved copy.
 *
 * `lastModified` is stamped at build time rather than hardcoded: the site is
 * fully prerendered, so a build IS the moment its content last changed, and a
 * sitemap with no date gives a crawler no recrawl signal at all. Guides are the
 * exception — they carry their own revision date, which is the honest signal.
 *
 * The `x-default` alternate mirrors the one in the page metadata. Both have to
 * agree — a sitemap that advertises a different alternate set than the pages do
 * is a common reason Google ignores the hreflang cluster entirely. The library
 * pages take theirs from `libraryAlternates`, the very function their metadata
 * uses, because their slugs differ per locale and cannot be derived by swapping
 * a prefix.
 */
const lastModified = new Date()

/** Builds the hreflang cluster for one path suffix ('' for the homepage). */
function alternatesFor(suffix: string) {
  return {
    languages: {
      ...Object.fromEntries(
        completeLocales.map((code) => [localeTags[code], `${siteUrl}/${code}${suffix}`]),
      ),
      'x-default': `${siteUrl}/${defaultLocale}${suffix}`,
    },
  }
}

/** `libraryAlternates` returns paths for metadata; a sitemap needs absolute URLs. */
function absoluteAlternates({ languages }: ReturnType<typeof libraryAlternates>) {
  return {
    languages: Object.fromEntries(
      Object.entries(languages).map(([tag, path]) => [tag, `${siteUrl}${path}`]),
    ),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home = completeLocales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: alternatesFor(''),
  }))

  const kinds: LibraryKind[] = ['products', 'guides']

  const libraryIndexes = completeLocales.flatMap((locale) =>
    kinds.map((kind) => {
      const alternates = libraryAlternates(locale, kind)
      return {
        url: `${siteUrl}${alternates.canonical}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
        alternates: absoluteAlternates(alternates),
      }
    }),
  )

  /*
   * Each page lists its photograph as well. It is the same published copy the
   * page's markup and Open Graph tags name, so image search indexes the file
   * that actually exists rather than discovering it second-hand.
   */
  const products = completeLocales.flatMap((locale) =>
    productPages(locale).map((page) => {
      const alternates = libraryAlternates(locale, 'products', page.id)
      return {
        url: `${siteUrl}${alternates.canonical}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
        alternates: absoluteAlternates(alternates),
        images: [`${siteUrl}${imageVariant(page.image).url}`],
      }
    }),
  )

  const guides = completeLocales.flatMap((locale) =>
    guidePages(locale).map((page) => {
      const alternates = libraryAlternates(locale, 'guides', page.id)
      return {
        url: `${siteUrl}${alternates.canonical}`,
        lastModified: new Date(publishedTimestamp(page.updated)),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
        alternates: absoluteAlternates(alternates),
        images: [`${siteUrl}${imageVariant(page.image).url}`],
      }
    }),
  )

  /*
   * The legal pages are listed so they can be indexed and found, but at a low
   * priority and a yearly cadence: they are real, linked destinations rather
   * than content anyone searches for, and advertising them as frequently
   * changing would spend crawl budget that belongs to the product pages.
   */
  const legal = completeLocales.flatMap((locale) =>
    Object.values(legalSlugs).map((slug) => ({
      url: `${siteUrl}/${locale}/${slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
      alternates: alternatesFor(`/${slug}`),
    })),
  )

  return [...home, ...libraryIndexes, ...products, ...guides, ...legal]
}

/*
 * Required by `output: 'export'`: without it the build fails outright with
 * "export const dynamic = force-static not configured on route". These files
 * already compute their output from build-time constants only, so declaring it
 * changes nothing about the result — it just tells Next that explicitly.
 */
export const dynamic = 'force-static'
