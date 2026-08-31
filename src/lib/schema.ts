import staticImageLoader from '../../image-loader'
import { rangeProducts, walnutProducts } from '@/data/products'
import { localeTags, type Locale } from '@/lib/i18n'
import { legalPath, type LegalSlugKey } from '@/lib/legal'
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

/** Stable node ids so other graphs can reference these rather than repeat them. */
export const ORGANIZATION_ID = `${siteUrl}/#organization`
export const WEBSITE_ID = `${siteUrl}/#website`

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
    '@type': 'Corporation',
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
    url: `${siteUrl}/${locale}`,
    logo: `${siteUrl}/brand/raymar-logo-green-gold.svg`,
    image: `${siteUrl}${ogImage.url}`,
    description: meta.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: footer.addressLines.slice(1, -1).join(', '),
      addressLocality: 'Esenler',
      addressRegion: 'İstanbul',
      postalCode: '34235',
      addressCountry: 'TR',
    },
    /*
     * The same query string the contact map uses, so the marked-up pin and the
     * one a visitor clicks resolve to the identical place. Deliberately the
     * postal address alone: leading with the company name made Google Maps
     * match a different business at a different building, which is the bug
     * `quote.mapQuery` exists to fix. No `geo` block accompanies it — latitude
     * and longitude were never supplied, and inventing coordinates for a real
     * address is exactly the kind of unevidenced assertion this graph avoids.
     */
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(quote.mapQuery)}`,
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
            areaServed: 'Worldwide',
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
    '@id': WEBSITE_ID,
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
 * `ItemList` of every product the homepage names — the range and the seven
 * walnut grades — as `Product` entities, homepage-only (not emitted from
 * `organizationGraph`, which runs on every page including the legal ones,
 * where no product is mentioned).
 *
 * No `offers`, no `aggregateRating`, no `sku` or `gtin`: the same restraint
 * `organizationGraph` documents above for the same reason — none of these
 * exist, and Google treats a fabricated one as a manual-action risk, not a
 * free rich-result. `Product` validates without `offers`; what this buys is
 * entity clarity for a crawler or an answer engine trying to work out what
 * Raymar actually trades in, not a rich-snippet checkbox.
 */
export function productCatalogGraph({ locale, dictionary }: ProductCatalogGraphOptions) {
  const items = [
    ...rangeProducts.map((product) => ({
      copy: dictionary.range.products[product.id],
      image: product.image,
    })),
    ...walnutProducts.map((product) => ({
      copy: dictionary.walnut.products[product.id],
      image: product.image,
    })),
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/${locale}#urun-gami`,
    name: dictionary.meta.siteName,
    itemListElement: items.map(({ copy, image }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: copy.name,
        ...(copy.description ? { description: copy.description } : {}),
        /*
         * Run through the same loader the browser's `<img>` goes through, not
         * `image.src` directly.
         *
         * `image.src` names the original under `/images/`, and the static
         * export does not deploy that directory — no browser ever requests it,
         * so it is excluded from the upload. Marking it up anyway pointed all
         * ten Product nodes at URLs that answer 404, measured against the live
         * site: an image property a crawler cannot fetch is not markup, it is
         * a broken promise, and Google drops the node's image entirely.
         *
         * 1280 is the widest rung that is comfortably above the 1200px Google
         * asks for in a rich result while staying a file the CDN already has
         * warm, because it is a size real visitors are served.
         */
        ...(image
          ? { image: `${siteUrl}${staticImageLoader({ src: image.src, width: 1280 })}` }
          : {}),
        brand: { '@id': ORGANIZATION_ID },
      },
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
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dictionary.meta.siteName,
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: `${siteUrl}${legalPath(locale, slugKey)}`,
      },
    ],
  }
}
