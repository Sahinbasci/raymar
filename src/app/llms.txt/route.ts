import { guidePages, productPages } from '@/content/library'
import { getDictionary } from '@/content'
import { completeLocales, type Locale } from '@/lib/i18n'
import { guidePath, libraryIndexPath, productPath } from '@/lib/library'
import { siteUrl } from '@/lib/site'

/**
 * `/llms.txt` — a plain Markdown map of the site for language-model agents.
 *
 * A proposed convention (llmstxt.org), not a standard any search engine has
 * committed to, so nothing depends on it. It is here because it costs nothing:
 * an answer engine that does read it gets, in one request, who the company is
 * and a one-line description of every product page and guide, in both
 * languages, without rendering a page.
 *
 * Built from the same content as the pages, at build time, so it cannot list a
 * page that does not exist or describe one differently from its own metadata.
 */

const SECTION_TITLES: Record<Locale, { products: string; guides: string; site: string }> =
  {
    tr: {
      products: 'Ürünler (Türkçe)',
      guides: 'Rehberler (Türkçe)',
      site: 'Site (Türkçe)',
    },
    en: {
      products: 'Products (English)',
      guides: 'Guides (English)',
      site: 'Site (English)',
    },
  }

function line(title: string, path: string, description: string) {
  return `- [${title}](${siteUrl}${path}): ${description}`
}

function localeSections(locale: Locale): string[] {
  const { meta, library } = getDictionary(locale)
  const titles = SECTION_TITLES[locale]

  return [
    `## ${titles.products}`,
    '',
    ...productPages(locale).map((page) =>
      line(page.heading, productPath(locale, page.id), page.metaDescription),
    ),
    '',
    `## ${titles.guides}`,
    '',
    ...guidePages(locale).map((page) =>
      line(page.heading, guidePath(locale, page.id), page.metaDescription),
    ),
    '',
    `## ${titles.site}`,
    '',
    line(meta.siteName, `/${locale}`, meta.description),
    line(
      library.products.heading,
      libraryIndexPath(locale, 'products'),
      library.products.metaDescription,
    ),
    line(
      library.guides.heading,
      libraryIndexPath(locale, 'guides'),
      library.guides.metaDescription,
    ),
    line(library.quoteBand.cta, `/${locale}#teklif`, library.quoteBand.body),
    '',
  ]
}

export function GET() {
  const en = getDictionary('en')

  const body = [
    `# ${en.meta.siteName}`,
    '',
    `> ${en.meta.description} The registered company is ${en.footer.addressLines[0]}, ${en.footer.addressLines.slice(1).join(', ')}. Contact: ${en.quote.emailValue}.`,
    '',
    'Prices, minimum quantities and specifications are given on request through the quotation form; the pages below describe the products and the trade in general terms.',
    '',
    ...completeLocales.flatMap(localeSections),
  ].join('\n')

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}

export const dynamic = 'force-static'
