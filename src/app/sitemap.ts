import type { MetadataRoute } from 'next'
import { completeLocales, defaultLocale, localeTags } from '@/lib/i18n'
import { legalSlugs } from '@/lib/legal'
import { siteUrl } from '@/lib/site'

/**
 * Lists only locales with approved copy.
 *
 * `lastModified` is stamped at build time rather than hardcoded: the site is
 * fully prerendered, so a build IS the moment its content last changed, and a
 * sitemap with no date gives a crawler no recrawl signal at all.
 *
 * The `x-default` alternate mirrors the one in the page metadata. Both have to
 * agree — a sitemap that advertises a different alternate set than the pages do
 * is a common reason Google ignores the hreflang cluster entirely.
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

export default function sitemap(): MetadataRoute.Sitemap {
  const home = completeLocales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: alternatesFor(''),
  }))

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

  return [...home, ...legal]
}

/*
 * Required by `output: 'export'`: without it the build fails outright with
 * "export const dynamic = force-static not configured on route". These files
 * already compute their output from build-time constants only, so declaring it
 * changes nothing about the result — it just tells Next that explicitly.
 */
export const dynamic = 'force-static'
