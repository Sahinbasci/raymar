import { guidePages, productPages, topLevelProductPages } from '@/content/library'
import type { LibraryKind } from '@/content/library/types'
import { rangeProducts, walnutProducts } from '@/data/products'
import { localeTags, type Locale } from '@/lib/i18n'
import { imageVariant } from '@/lib/image-variant'
import { legalPath, type LegalSlugKey } from '@/lib/legal'
import {
  entryPath,
  libraryIndexPath,
  productPath,
  publishedTimestamp,
  type LibraryEntry,
} from '@/lib/library'
import { ogImage, siteUrl } from '@/lib/site'
import type { Dictionary } from '@/types/content'

/**
 * schema.org graph for the site.
 *
 * Deliberately narrow. Three types that would be easy to add are left out:
 *
 *   - `LocalBusiness` — Raymar is a trading company, not a place a buyer walks
 *     into. Claiming it invites Google to treat the Esenler office as a
 *     storefront and to expect opening hours and reviews it will never have.
 *   - `SearchAction` on the WebSite node — there is no site search. Declaring
 *     one that does not exist is a well-known way to get the markup ignored.
 *   - `AggregateRating` / `Offer` with a price — there are no public prices and
 *     no reviews. Fabricating either is a manual-action risk.
 *
 * `foundingDate` is likewise absent: the site's "30 yılı aşkın" claim has not
 * been evidenced, and a machine-readable founding year is exactly the kind of
 * assertion that should not be published before it is verified.
 */

interface OrganizationGraphOptions {
  readonly locale: Locale
  readonly dictionary: Dictionary
}

/**
 * Stable node ids so other graphs can reference these rather than repeat them.
 *
 * The organization is one entity whatever the page language, so its id is
 * locale-independent and its body carries nothing that differs by locale. The
 * website is not: `/tr` and `/en` have their own url, language and
 * description, and publishing both under one id gave a consumer that merges by
 * `@id` a single node asserting two urls and two languages. Hence one id per
 * locale for the site, one for the company.
 */
export const ORGANIZATION_ID = `${siteUrl}/#organization`
export const websiteId = (locale: Locale) => `${siteUrl}/${locale}#website`

export function organizationGraph({ locale, dictionary }: OrganizationGraphOptions) {
  const { meta, quote, footer } = dictionary

  /*
   * The postal address is the one piece of contact data the client has
   * supplied. Phone and e-mail are still bracketed placeholders in the
   * dictionary, so they are filtered out rather than published as literal
   * "[Telefon bilgisi eklenecek]" — machine-readable nonsense is worse than an
   * absent property, because a consumer cannot tell it is a placeholder.
   */
  const isPlaceholder = (value: string) => value.trim().startsWith('[')

  /*
   * The dictionary carries the phone in the format a human should read it —
   * `+90 (541) 923 64 03`. Machines want E.164: no spaces, no brackets. Google
   * asks for the international form explicitly, and a consumer that cannot
   * parse the number silently drops the property, so the display string and
   * the marked-up string are deliberately not the same string.
   */
  const e164 = (value: string) => `+${value.replace(/\D/g, '')}`

  const contactPoint = [
    !isPlaceholder(quote.phoneValue) ? { telephone: e164(quote.phoneValue) } : null,
    !isPlaceholder(quote.emailValue) ? { email: quote.emailValue } : null,
  ].filter(Boolean)

  const organization = {
    /*
     * `Organization`, not `Corporation`: the entity is a Turkish limited
     * company (Ltd. Şti.), and schema.org's `Corporation` carries the
     * narrower sense of a listed corporation. The broader type says only what
     * is true.
     */
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: meta.siteName,
    /*
     * The brand and the legal entity differ — the site trades as Raymar Nuts
     * while the registered company is Marex Dış Tic. Ltd. Şti. Stating both
     * here is what lets a search or answer engine resolve them to one entity
     * instead of two competing ones.
     */
    legalName: footer.addressLines[0],
    alternateName: 'Raymar',
    url: siteUrl,
    logo: `${siteUrl}/brand/raymar-logo-green-gold.svg`,
    image: `${siteUrl}${ogImage.url}`,
    /*
     * The registry identifiers the legal pages already publish. `taxID` is a
     * property Google documents for `Organization`, and it is the one piece of
     * machine-readable evidence that ties this site to a registered company
     * rather than to a brand name.
     */
    taxID: '6121008134',
    identifier: {
      '@type': 'PropertyValue',
      name: 'MERSİS',
      value: '0612100813400001',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: footer.addressLines.slice(1, -1).join(', '),
      addressLocality: 'Esenler',
      addressRegion: 'İstanbul',
      postalCode: '34235',
      addressCountry: 'TR',
    },
    location: {
      '@type': 'Place',
      name: meta.siteName,
      /*
       * `hasMap` is defined on `Place`, not on `Organization`, which is where
       * it used to sit. Same query string the contact map uses, so the
       * marked-up pin and the one a visitor clicks resolve to the identical
       * place — deliberately the postal address alone, because leading with
       * the company name made Google Maps match a different business at a
       * different building. No `geo` block: latitude and longitude were never
       * supplied, and inventing coordinates for a real address is exactly the
       * kind of unevidenced assertion this graph avoids.
       */
      hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(quote.mapQuery)}`,
    },
    /*
     * `areaServed` and `knowsAbout` are the two properties an answer engine
     * leans on to decide what a company does and where it does it — the
     * question "who supplies bulk walnut kernels from Turkey" is answered from
     * these, not from prose. Both are restatements of what the page already
     * says out loud (the international-trade section; the product range), not
     * new claims: `knowsAbout` is generated from the catalogue itself, so it
     * cannot drift out of step with what the site actually sells.
     */
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    knowsAbout: [
      ...rangeProducts.map((product) => dictionary.range.products[product.id].name),
      ...walnutProducts.map((product) => dictionary.walnut.products[product.id].name),
    ],
    ...(contactPoint.length > 0
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'sales',
            areaServed: { '@type': 'Place', name: 'Worldwide' },
            availableLanguage: ['tr', 'en'],
            ...Object.assign({}, ...contactPoint),
          },
        }
      : {}),
    /*
     * `sameAs` is the property an answer engine leans on hardest to decide that
     * a company named in a directory and a company with a website are the same
     * company. It stays out until there are real profiles to point at — a
     * fabricated or empty one is worse than none.
     */
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId(locale),
    url: `${siteUrl}/${locale}`,
    name: meta.siteName,
    description: meta.description,
    inLanguage: localeTags[locale],
    publisher: { '@id': ORGANIZATION_ID },
  }

  return { '@context': 'https://schema.org', '@graph': [organization, website] }
}

interface ProductCatalogGraphOptions {
  readonly locale: Locale
  readonly dictionary: Dictionary
}

/**
 * `ItemList` of the product cards on the homepage — the range and the four
 * walnut sizes — each entry naming the page its card links to, in the order
 * the cards appear. Homepage-only: `organizationGraph` runs on every
 * page, including the legal ones, where no product is mentioned.
 *
 * Entries are `ListItem`s naming a page, not `Product` entities. This list
 * used to hold ten `Product` nodes (the range and each walnut grade), and
 * Google's product snippets require one of `offers`, `review` or
 * `aggregateRating` on every `Product` it finds. None of the three exists for
 * a B2B range with no public prices, and fabricating one is a manual-action
 * risk, so each node was an invalid item in Search Console waiting to be
 * reported. Now that each product has its own page, the list points at those
 * pages instead — which is also the more useful statement for a crawler: here
 * is the range, and here is where each product is described.
 *
 * Images go through `imageVariant`, never `image.src`: the originals under
 * `/images/` are not deployed, and marking them up pointed every node at a URL
 * answering 404, measured against the live site.
 */
export function productCatalogGraph({ locale, dictionary }: ProductCatalogGraphOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/${locale}#urunlerimiz`,
    name: dictionary.range.heading,
    itemListElement: [...rangeProducts, ...walnutProducts]
      .flatMap((card) => productPages(locale).filter((page) => page.id === card.page))
      .map((page, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: page.name,
        url: `${siteUrl}${productPath(locale, page.id)}`,
        image: `${siteUrl}${imageVariant(page.image).url}`,
      })),
  }
}

interface BreadcrumbGraphOptions {
  readonly locale: Locale
  readonly dictionary: Dictionary
  readonly slugKey: LegalSlugKey
  /** The page's own `<h1>` text — reused so the crumb names exactly what the reader is on. */
  readonly pageName: string
}

/**
 * Two-level `BreadcrumbList` (home → this document) for a legal page. Never
 * emitted on the homepage itself — a single-level breadcrumb there would
 * describe nothing a crawler does not already know from the URL.
 */
export function breadcrumbGraph({
  locale,
  dictionary,
  slugKey,
  pageName,
}: BreadcrumbGraphOptions) {
  return {
    '@context': 'https://schema.org',
    ...breadcrumbList([
      // The same name the library trails give the homepage. It used to be the
      // site name here and "Ana Sayfa" / "Home" there, so one node in one
      // graph had two names.
      { name: dictionary.library.homeLabel, path: `/${locale}` },
      { name: pageName, path: legalPath(locale, slugKey) },
    ]),
  }
}

interface Crumb {
  readonly name: string
  readonly path: string
}

function breadcrumbList(crumbs: readonly Crumb[], id?: string) {
  return {
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  }
}

/**
 * The trail a library page sits on: home, the index, the parent product for a
 * walnut size, the page. Shared by the visible breadcrumb and the markup, so
 * the two can never name different pages.
 */
export function libraryCrumbs(
  locale: Locale,
  dictionary: Dictionary,
  kind: LibraryKind,
  entry?: LibraryEntry,
): Crumb[] {
  const crumbs: Crumb[] = [
    { name: dictionary.library.homeLabel, path: `/${locale}` },
    { name: dictionary.library[kind].label, path: libraryIndexPath(locale, kind) },
  ]
  if (entry?.kind === 'products' && entry.page.parent) {
    const parent = productPages(locale).find((page) => page.id === entry.page.parent)
    if (parent) crumbs.push({ name: parent.name, path: productPath(locale, parent.id) })
  }
  if (entry) {
    crumbs.push({
      // The page's own heading, so the trail, the card that linked here and
      // the `<h1>` all say the same thing. The meta title is shorter and was
      // used here for that reason, but a breadcrumb naming the current page
      // something other than its visible heading reads as the wrong page.
      name: entry.kind === 'products' ? entry.page.name : entry.page.heading,
      path: entryPath(locale, entry),
    })
  }
  return crumbs
}

/** The publisher, stated in full rather than only by `@id`. */
function organizationReference(locale: Locale, dictionary: Dictionary) {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: dictionary.meta.siteName,
    url: `${siteUrl}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/raymar-logo-green-gold.svg`,
    },
  }
}

interface LibraryPageGraphOptions {
  readonly locale: Locale
  readonly dictionary: Dictionary
  readonly entry: LibraryEntry
}

/**
 * Graph for one product page or guide.
 *
 * Every page gets a `WebPage`, its `BreadcrumbList` and a `FAQPage` for the
 * questions it answers on the page. Guides add an `Article`.
 *
 * Product pages deliberately carry no `Product` node. Google's product
 * snippets require one of `offers`, `review` or `aggregateRating`, and none of
 * the three exists for a B2B range with no public prices — a `Product` here
 * would be reported as an invalid item on every product page. The page is
 * about the product; the markup says so through its name and breadcrumb
 * rather than through an entity Google would reject.
 *
 * FAQ rich results are no longer shown for commercial sites, which is not why
 * the node is here: the questions and answers are the part of these pages an
 * answer engine is most likely to lift, and marking them up states their
 * boundaries exactly. Every question in the markup is visible on the page —
 * `LibraryDocument` renders from the same array.
 *
 * Nodes point at each other by `@id`, and the organization is restated in
 * full where it is referenced: the site-wide organization graph is a separate
 * script block, and a consumer that does not merge blocks would otherwise see
 * an author with no name.
 */
export function libraryPageGraph({ locale, dictionary, entry }: LibraryPageGraphOptions) {
  const { page } = entry
  const url = `${siteUrl}${entryPath(locale, entry)}`
  const image = imageVariant(page.image)
  const imageUrl = `${siteUrl}${image.url}`

  /*
   * The references listed under the page, as `citation`. The same objects
   * render the visible list, so the markup cannot cite something the page
   * does not show. Carried by the page's main entity: the article for a guide,
   * the page itself for a product.
   */
  const citation =
    page.sources.length > 0
      ? {
          citation: page.sources.map((source) => ({
            '@type': 'CreativeWork',
            name: source.title,
            url: source.url,
            inLanguage: source.lang,
            publisher: { '@type': 'Organization', name: source.publisher },
          })),
        }
      : {}

  const webPage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.metaTitle,
    description: page.metaDescription,
    inLanguage: localeTags[locale],
    isPartOf: { '@id': websiteId(locale) },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: image.width,
      height: image.height,
    },
    ...(entry.kind === 'products' ? citation : {}),
  }

  const faq =
    page.faq.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          url,
          inLanguage: localeTags[locale],
          isPartOf: { '@id': `${url}#webpage` },
          mainEntity: page.faq.map((entryItem) => ({
            '@type': 'Question',
            name: entryItem.question,
            acceptedAnswer: { '@type': 'Answer', text: entryItem.answer },
          })),
        }
      : null

  const article =
    entry.kind === 'guides'
      ? {
          '@type': 'Article',
          '@id': `${url}#article`,
          headline: entry.page.heading,
          description: entry.page.metaDescription,
          image: [imageUrl],
          datePublished: publishedTimestamp(entry.page.published),
          dateModified: publishedTimestamp(entry.page.updated),
          inLanguage: localeTags[locale],
          author: organizationReference(locale, dictionary),
          publisher: organizationReference(locale, dictionary),
          mainEntityOfPage: { '@id': `${url}#webpage` },
          ...citation,
        }
      : null

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage,
      ...(article ? [article] : []),
      ...(faq ? [faq] : []),
      breadcrumbList(
        libraryCrumbs(locale, dictionary, entry.kind, entry),
        `${url}#breadcrumb`,
      ),
    ],
  }
}

interface LibraryIndexGraphOptions {
  readonly locale: Locale
  readonly dictionary: Dictionary
  readonly kind: LibraryKind
}

/** `CollectionPage` listing every page in the index, in display order. */
export function libraryIndexGraph({
  locale,
  dictionary,
  kind,
}: LibraryIndexGraphOptions) {
  const content = dictionary.library[kind]
  const url = `${siteUrl}${libraryIndexPath(locale, kind)}`
  const entries: LibraryEntry[] =
    kind === 'products'
      ? topLevelProductPages(locale).map((page) => ({ kind, page }))
      : guidePages(locale).map((page) => ({ kind, page }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: content.metaTitle,
        description: content.metaDescription,
        inLanguage: localeTags[locale],
        isPartOf: { '@id': websiteId(locale) },
        breadcrumb: { '@id': `${url}#breadcrumb` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: entries.map((entry, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: entry.kind === 'products' ? entry.page.name : entry.page.heading,
            url: `${siteUrl}${entryPath(locale, entry)}`,
          })),
        },
      },
      breadcrumbList(libraryCrumbs(locale, dictionary, kind), `${url}#breadcrumb`),
    ],
  }
}
