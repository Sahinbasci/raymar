import type { Dictionary } from '@/types/content'
import { localeTags, type Locale } from '@/lib/i18n'
import { ogImage, siteUrl } from '@/lib/site'

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
 * `foundingDate` is likewise absent: the site's "25 yıl" claim has not been
 * evidenced, and a machine-readable founding year is exactly the kind of
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

  const contactPoint = [
    !isPlaceholder(quote.phoneValue) ? { telephone: quote.phoneValue } : null,
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
