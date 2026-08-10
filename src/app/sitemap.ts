import type { MetadataRoute } from 'next'
import { completeLocales, localeTags } from '@/lib/i18n'
import { siteUrl } from '@/lib/site'

/** Lists only locales with approved copy. */
export default function sitemap(): MetadataRoute.Sitemap {
  return completeLocales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: 'monthly' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        completeLocales.map((code) => [localeTags[code], `${siteUrl}/${code}`]),
      ),
    },
  }))
}
