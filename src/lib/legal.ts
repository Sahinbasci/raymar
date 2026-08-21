import type { Locale } from '@/lib/i18n'

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
