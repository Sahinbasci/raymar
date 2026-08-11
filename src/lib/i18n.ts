/**
 * Locale configuration.
 *
 * Turkish is the only locale with approved copy. English is declared here so
 * that routing, metadata and the header language switch are already
 * locale-driven, but it is deliberately NOT in `completeLocales` — no English
 * corporate copy has been supplied and none may be invented or machine
 * translated. Adding `'en'` to `completeLocales` is the single switch that
 * publishes the English site once `src/content/en.ts` is filled in.
 */
export const locales = ['tr', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'tr'

/** Locales whose content is approved and therefore publicly routable. */
export const completeLocales: readonly Locale[] = ['tr']

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
