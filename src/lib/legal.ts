import { completeLocales, defaultLocale, localeTags, type Locale } from '@/lib/i18n'

/**
 * URL slugs for the legal pages, in one place.
 *
 * Every place that needs one of these URLs — the footer's legal column, the
 * quotation form's consent links, each page's own canonical, and the sitemap
 * — reads it from here, so the route folder name and every link to it can
 * never drift apart.
 */
export const legalSlugs = {
  kvkk: 'kvkk-aydinlatma-metni',
  gizlilik: 'gizlilik-politikasi',
  cerez: 'cerez-politikasi',
} as const

export type LegalSlugKey = keyof typeof legalSlugs

export function legalPath(locale: Locale, key: LegalSlugKey): string {
  return `/${locale}/${legalSlugs[key]}`
}

/**
 * The `alternates` block every legal page must return from `generateMetadata`.
 *
 * Each of these pages sets its own canonical, and in Next a page-level
 * `alternates` REPLACES the one inherited from the layout — it does not merge
 * with it. So a page that returns only `{ canonical }` silently drops the
 * `languages` map the layout supplies, and its hreflang tags disappear.
 *
 * That was invisible while Turkish was the only published locale: there was no
 * alternate to lose. The moment English shipped it became a real defect —
 * `/tr/gizlilik-politikasi` and `/en/gizlilik-politikasi` are near-identical
 * documents, and with no hreflang between them a crawler has nothing saying
 * they are translations rather than duplicates.
 *
 * Centralised here rather than repeated in three page files precisely because
 * the bug was one of omission: a fourth legal page that forgets the languages
 * map would reintroduce it, and `tests/e2e/legal.spec.ts` asserts every legal
 * page carries the full set.
 */
export function legalAlternates(locale: Locale, key: LegalSlugKey) {
  return {
    canonical: legalPath(locale, key),
    languages: {
      ...Object.fromEntries(
        completeLocales.map((code) => [localeTags[code], legalPath(code, key)]),
      ),
      'x-default': legalPath(defaultLocale, key),
    },
  }
}
