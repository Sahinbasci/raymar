/**
 * Locale configuration.
 *
 * Both locales are published. English was held back while `src/content/en.ts`
 * still re-exported the Turkish dictionary — publishing then would have served
 * the Turkish site twice under two hreflang-linked URLs, which is duplicate
 * content announced as deliberate. That file now carries a real translation and
 * sets `englishCopyApproved`, which `src/content/index.ts` checks at build time,
 * so this list and that flag cannot drift apart silently.
 */
export const locales = ['tr', 'en'] as const

export type Locale = (typeof locales)[number]

/**
 * Turkish stays the default, and `/` keeps redirecting here.
 *
 * That redirect is a 307 precisely so this stays reversible: nothing about it
 * is cached permanently in a returning visitor's browser, so `/` can become an
 * Accept-Language negotiation later without anyone being stuck on the wrong
 * locale.
 */
export const defaultLocale: Locale = 'tr'

/** Locales whose content is approved and therefore publicly routable. */
export const completeLocales: readonly Locale[] = ['tr', 'en']

/**
 * BCP-47 tags used for `<html lang>` and metadata alternates.
 *
 * Language-only, deliberately. Region-qualified tags narrow the audience: an
 * `en-GB` alternate tells Google the English page is meant for the United
 * Kingdom, which suppresses it for exactly the buyers this site exists to reach
 * — importers in Germany, Italy, the Gulf and the United States. Turkish nut
 * exports go to 122 countries; none of the pages here are region-specific.
 */
export const localeTags: Record<Locale, string> = {
  tr: 'tr',
  en: 'en',
}

/**
 * Open Graph locales, which are NOT the same shape as hreflang.
 *
 * `og:locale` is specified as `language_TERRITORY` and consumers reject a bare
 * language code, so this cannot reuse `localeTags` — those are deliberately
 * language-only so hreflang does not geo-restrict the pages.
 */
export const ogLocales: Record<Locale, string> = {
  tr: 'tr_TR',
  en: 'en_US',
}

export const localeLabels: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function isPublished(locale: Locale): boolean {
  return completeLocales.includes(locale)
}
