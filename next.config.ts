import type { NextConfig } from 'next'

/*
 * STATIC EXPORT BUILD
 *
 * This site is deployed as plain files to shared LiteSpeed/Apache hosting, not
 * to a Node host, so `next build` writes a complete static site to `out/` and
 * nothing runs on the server at request time.
 *
 * Two things that used to live here now live in `public/.htaccess`, because a
 * static export has no server to apply them:
 *
 *   1. The security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy,
 *      Permissions-Policy). Next resolves `headers()` into its routes manifest,
 *      which only a Next server reads — with `output: 'export'` the manifest is
 *      never consulted and every header silently disappears. Verified by
 *      measurement: a static export served without `.htaccess` returns none of
 *      them. `public/.htaccess` is now the single source of truth for all of
 *      them, and the CSP there is the same policy this file used to emit.
 *
 *   2. The `/` → `/tr` redirect and the locale-case canonicalisation, formerly
 *      `src/proxy.ts`. Proxies/middleware do not run in a static export.
 *
 * `public/.htaccess` is copied into `out/` like any other asset, so the two are
 * always deployed together.
 */
const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    /*
     * The only layout carrying <html> lives under the dynamic `[locale]`
     * segment, which is one of the two cases Next names as needing this: with
     * no static root layout there is nothing for a route-level `not-found` to
     * compose against, so unmatched URLs fell through to Next's built-in
     * English error page with no `lang` attribute. `global-not-found.tsx`
     * returns its own complete document instead.
     */
    globalNotFound: true,
  },
  images: {
    /*
     * A static export has no `/_next/image` route, so the default loader emits
     * URLs that 404 on the host — 272 of them in the homepage alone, i.e. every
     * photograph broken. `image-loader.ts` points `next/image` at variants that
     * `scripts/optimize-images.mjs` writes ahead of the build instead, which
     * keeps the optimizer's output without needing its runtime. Every component
     * keeps using `<Image>` unchanged.
     */
    loader: 'custom',
    loaderFile: './image-loader.ts',
    /*
     * Must stay in sync with `WIDTHS` in BOTH `image-loader.ts` and
     * `scripts/optimize-images.mjs`: Next picks a width from these lists, the
     * loader turns it into a filename, and the optimizer has to have written
     * that file. A width here that the optimizer does not emit is a 404.
     *
     * Deliberately shorter than the ladder this site used on Vercel, where
     * variants were produced on demand and an unused rung cost nothing. Every
     * rung now multiplies across 16 photographs and 3 formats at build time,
     * and the layout only has four distinct image slots. 2880 is kept because
     * the hero poster and footer band declare `sizes="100vw"`, and a 1440px
     * window on a 2x display genuinely needs 2880 device pixels.
     */
    deviceSizes: [640, 960, 1280, 1920, 2880],
    imageSizes: [256, 384, 480],
  },
}

export default nextConfig
