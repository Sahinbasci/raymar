import type { Metadata } from 'next'
import { getDictionary } from '@/content'
import { completeLocales, ogLocales, type Locale } from '@/lib/i18n'
import { legalAlternates, legalPath, type LegalSlugKey } from '@/lib/legal'
import { ogImage } from '@/lib/site'

interface SocialMetadataOptions {
  readonly locale: Locale
  /** The page's canonical path; resolved against `metadataBase` by Next. */
  readonly path: string
  readonly title: string
  readonly description: string
  /** Defaults to the site-wide brand image. */
  readonly image?:
    | {
        readonly url: string
        readonly width: number
        readonly height: number
        readonly alt: string
      }
    | undefined
  /** ISO timestamps; switches the Open Graph type to `article`. */
  readonly article?:
    | {
        readonly publishedTime: string
        readonly modifiedTime: string
      }
    | undefined
}

/**
 * The full `openGraph` and `twitter` blocks for a page below the homepage.
 *
 * Returned whole because Next merges metadata shallowly: a page that sets
 * `openGraph` replaces the layout's block entirely, and a page that does not
 * set it inherits the layout's — which describes the homepage. Measured in the
 * built output before this existed: the KVKK notice carried the homepage's
 * `og:title` and `og:url` (https://raymarnuts.com/tr), so a shared link to it
 * previewed as the homepage. The same mechanism as `legalAlternates`, one
 * level over.
 */
export function socialMetadata({
  locale,
  path,
  title,
  description,
  image,
  article,
}: SocialMetadataOptions): Pick<Metadata, 'openGraph' | 'twitter'> {
  const { meta } = getDictionary(locale)
  const card = image ?? {
    url: ogImage.url,
    width: ogImage.width,
    height: ogImage.height,
    alt: meta.title,
  }

  const shared = {
    siteName: meta.siteName,
    title,
    description,
    locale: ogLocales[locale],
    alternateLocale: completeLocales
      .filter((code) => code !== locale)
      .map((code) => ogLocales[code]),
    url: path,
    images: [card],
  }

  return {
    openGraph: article
      ? {
          ...shared,
          type: 'article',
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
        }
      : { ...shared, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [card.url],
    },
  }
}

/**
 * Complete metadata for one legal document: title, description, the hreflang
 * cluster and the social blocks. Lives here rather than in `legal.ts` because
 * it reads the dictionary, and the dictionary imports `legal.ts`.
 */
export function legalMetadata(locale: Locale, key: LegalSlugKey): Metadata {
  const document = getDictionary(locale).legal[key]

  return {
    title: document.metaTitle,
    description: document.metaDescription,
    alternates: legalAlternates(locale, key),
    ...socialMetadata({
      locale,
      path: legalPath(locale, key),
      title: document.metaTitle,
      description: document.metaDescription,
    }),
  }
}
