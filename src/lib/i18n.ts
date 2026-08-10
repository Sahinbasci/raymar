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

/** BCP-47 tags used for `<html lang>` and metadata alternates. */
export const localeTags: Record<Locale, string> = {
  tr: 'tr-TR',
  en: 'en-GB',
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
