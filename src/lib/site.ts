/**
 * Site-level constants.
 *
 * `NEXT_PUBLIC_SITE_URL` must be set in the deployment environment. No public
 * Raymar domain was supplied with this project, so nothing is hardcoded here —
 * the localhost default only keeps local builds and tests working. Canonical
 * URLs and Open Graph metadata are derived from this value.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const ogImage = {
  url: '/brand/raymar-og.png',
  width: 3840,
  height: 2160,
} as const
