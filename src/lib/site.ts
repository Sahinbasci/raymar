/**
 * Site-level constants.
 *
 * `NEXT_PUBLIC_SITE_URL` must be set in the deployment environment. No public
 * Raymar domain was supplied with this project, so nothing is hardcoded here —
 * the localhost default only keeps local builds and tests working. Canonical
 * URLs and Open Graph metadata are derived from this value.
 */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

/*
 * Fail the build rather than ship localhost.
 *
 * Every canonical, hreflang, Open Graph and sitemap URL is derived from this
 * value, and the whole site is statically prerendered — so an unset variable is
 * baked into the output and setting it later at runtime does not fix anything.
 * Silently defaulting meant a production deploy could tell Google that the
 * canonical version of every page lives on http://localhost:3000.
 */
if (process.env.NODE_ENV === 'production' && !configuredSiteUrl) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL is required for a production build. It is baked into ' +
      'canonical, hreflang, Open Graph and sitemap URLs at build time, so it ' +
      'cannot be supplied at runtime. Set it in the build environment, e.g. ' +
      'NEXT_PUBLIC_SITE_URL=https://raymarnuts.com pnpm build',
  )
}

/*
 * Trailing slashes stripped at this single export point, so every consumer
 * (sitemap, robots, JSON-LD, canonical, hreflang) inherits the normalization
 * rather than each concatenation site needing its own. A `NEXT_PUBLIC_SITE_URL`
 * supplied with a trailing slash is the one malformation `new URL()` accepts
 * silently — the guard above only catches a missing/invalid value — and it
 * would otherwise produce a doubled slash everywhere this is concatenated with
 * a leading-slash path, desynchronizing those URLs from the canonical.
 */
export const siteUrl = (configuredSiteUrl ?? 'http://localhost:3000').replace(/\/+$/, '')

export const ogImage = {
  url: '/brand/raymar-og.png',
  width: 3840,
  height: 2160,
} as const
