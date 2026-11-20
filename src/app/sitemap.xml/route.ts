import { getDictionary } from '@/content'
import { guidePages, productPages } from '@/content/library'
import type { LibraryKind } from '@/content/library/types'
import { completeLocales, defaultLocale, localeTags } from '@/lib/i18n'
import { imageVariant } from '@/lib/image-variant'
import { legalSlugs, type LegalSlugKey } from '@/lib/legal'
import { libraryAlternates, publishedTimestamp } from '@/lib/library'
import { contentUpdated, siteUrl } from '@/lib/site'

/**
 * `/sitemap.xml`, written here rather than through Next's `sitemap.ts`.
 *
 * Next's serializer put each `<xhtml:link>` alternate before `<lastmod>`. The
 * sitemap protocol's schema (sitemaps.org/schemas/sitemap/0.9/sitemap.xsd)
 * defines `<url>` as a strict sequence — `loc`, `lastmod`, `changefreq`,
 * `priority`, and only then elements from other namespaces — so every entry
 * failed validation against it. Google parses leniently, but a sitemap is a
 * contract read by many consumers, and the order costs nothing to get right.
 *
 * What each entry carries, and why:
 *
 *   - `lastmod`: the date the page's text last changed, never the build time.
 *     Google uses it only while it keeps proving accurate, and a build stamp
 *     moved every URL on every deploy. Guides and legal documents carry their
 *     own revision dates; the homepage, the indexes and the product pages share
 *     `contentUpdated`, bumped by hand in the commit that changes their copy.
 *
 *   - No `changefreq` or `priority`. Google documents that it ignores both,
 *     and Bing treats them as hints at most; they are noise in a file whose
 *     only job is to be read correctly.
 *
 *   - `xhtml:link` alternates: the same hreflang cluster, `x-default`
 *     included, that each page declares in its own `<head>`. The two have to
 *     agree — a sitemap advertising a different set is a common reason Google
 *     ignores a hreflang cluster altogether. Library pages take theirs from
 *     `libraryAlternates`, the function their metadata uses, because their
 *     slugs are translated and cannot be derived by swapping a prefix.
 *
 *   - `image:image`: the photograph the page leads with, as the published file
 *     its markup and Open Graph tags name.
 *
 * The `xml-stylesheet` instruction points at a CSS file (not XSLT, which
 * Chrome removed in November 2026), so a person opening this URL sees a
 * readable list instead of the browser running every value into one line.
 * Crawlers ignore processing instructions.
 */

interface Entry {
  readonly loc: string
  readonly lastmod: string
  /** hreflang tag → absolute URL, `x-default` last. */
  readonly alternates: Readonly<Record<string, string>>
  readonly image?: string | undefined
}

/** The hreflang cluster for a page whose path differs only by its locale prefix. */
function prefixedAlternates(suffix: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      completeLocales.map((code) => [localeTags[code], `${siteUrl}/${code}${suffix}`]),
    ),
    'x-default': `${siteUrl}/${defaultLocale}${suffix}`,
  }
}

/** `libraryAlternates` returns paths for metadata; a sitemap needs absolute URLs. */
function absolute(languages: Readonly<Record<string, string>>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(languages).map(([tag, path]) => [tag, `${siteUrl}${path}`]),
  )
}

function entries(): Entry[] {
  const contentDate = publishedTimestamp(contentUpdated)
  const kinds: LibraryKind[] = ['products', 'guides']

  const home = completeLocales.map((locale) => ({
    loc: `${siteUrl}/${locale}`,
    lastmod: contentDate,
    alternates: prefixedAlternates(''),
  }))

  const indexes = completeLocales.flatMap((locale) =>
    kinds.map((kind) => {
      const { canonical, languages } = libraryAlternates(locale, kind)
      return {
        loc: `${siteUrl}${canonical}`,
        lastmod: contentDate,
        alternates: absolute(languages),
      }
    }),
  )

  const products = completeLocales.flatMap((locale) =>
    productPages(locale).map((page) => {
      const { canonical, languages } = libraryAlternates(locale, 'products', page.id)
      return {
        loc: `${siteUrl}${canonical}`,
        lastmod: contentDate,
        alternates: absolute(languages),
        image: `${siteUrl}${imageVariant(page.image).url}`,
      }
    }),
  )

  const guides = completeLocales.flatMap((locale) =>
    guidePages(locale).map((page) => {
      const { canonical, languages } = libraryAlternates(locale, 'guides', page.id)
      return {
        loc: `${siteUrl}${canonical}`,
        lastmod: publishedTimestamp(page.updated),
        alternates: absolute(languages),
        image: `${siteUrl}${imageVariant(page.image).url}`,
      }
    }),
  )

  const legal = completeLocales.flatMap((locale) =>
    (Object.keys(legalSlugs) as LegalSlugKey[]).map((key) => ({
      loc: `${siteUrl}/${locale}/${legalSlugs[key]}`,
      lastmod: publishedTimestamp(getDictionary(locale).legal[key].lastUpdated),
      alternates: prefixedAlternates(`/${legalSlugs[key]}`),
    })),
  )

  return [...home, ...indexes, ...products, ...guides, ...legal]
}

function escape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function serialize(entry: Entry): string {
  const lines = [
    '  <url>',
    `    <loc>${escape(entry.loc)}</loc>`,
    `    <lastmod>${escape(entry.lastmod)}</lastmod>`,
    ...Object.entries(entry.alternates).map(
      ([tag, href]) =>
        `    <xhtml:link rel="alternate" hreflang="${escape(tag)}" href="${escape(href)}"/>`,
    ),
  ]
  if (entry.image) {
    lines.push(
      '    <image:image>',
      `      <image:loc>${escape(entry.image)}</image:loc>`,
      '    </image:image>',
    )
  }
  lines.push('  </url>')
  return lines.join('\n')
}

export function GET() {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/css" href="/sitemap.css"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
      ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' +
      ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...entries().map(serialize),
    '</urlset>',
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  })
}

/*
 * Required by `output: 'export'`: the file is computed from build-time
 * constants only, and Next refuses to export a route handler that does not
 * say so.
 */
export const dynamic = 'force-static'
