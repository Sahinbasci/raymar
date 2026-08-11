import type { MetadataRoute } from 'next'
import { completeLocales, defaultLocale, localeTags } from '@/lib/i18n'
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

export default function sitemap(): MetadataRoute.Sitemap {
  return completeLocales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: {
        ...Object.fromEntries(
          completeLocales.map((code) => [localeTags[code], `${siteUrl}/${code}`]),
        ),
        'x-default': `${siteUrl}/${defaultLocale}`,
      },
    },
  }))
}
