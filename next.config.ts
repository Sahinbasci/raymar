import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

/*
 * `script-src` is the one directive that differs by environment.
 *
 * React's development build uses `eval()` to reconstruct call stacks across
 * environments — it says so itself in the console when blocked — and it
 * documents that it never does so in production. Without `unsafe-eval` in dev
 * the app still renders, but every error loses its stack and the overlay stops
 * being useful. Adding it in production would weaken the policy for no benefit,
 * so the exception is scoped to dev only and never ships.
 */
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'"

/*
 * Two directives that only make sense over HTTPS on a real domain, and that
 * actively break a plain-HTTP dev server.
 *
 * `upgrade-insecure-requests` rewrites every http:// request to https://.
 * Against `next dev` on localhost there is no TLS listener, so Safari upgraded
 * the navigation and the connection was simply dropped — the page would not
 * open at all. Chromium happened to tolerate it; Safari did not.
 *
 * `Strict-Transport-Security` is specified to be ignored when received over
 * plain HTTP, but sending it there is meaningless at best, and a browser that
 * does honour it pins localhost to HTTPS for two years — a genuinely painful
 * thing to undo on a developer's machine.
 *
 * Both ship in production, where they are correct and wanted.
 */
const httpsDirectives = isDev ? [] : ['upgrade-insecure-requests']

const nextConfig: NextConfig = {
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
    // Only local assets are served; no remote patterns are required.
    formats: ['image/avif', 'image/webp'],
    // Matches the viewport ladder documented in docs/RESPONSIVE_NOTES.md so the
    // generated srcset lands on the widths the layout actually uses.
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1440, 1728, 1920],
    imageSizes: [96, 148, 256, 320, 384, 480, 640],
    // The source files are content-stable: a photograph is only ever replaced
    // by shipping a different filename. Next's 4-hour default would have the
    // optimizer re-encode the same twenty images several times a day.
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        /*
         * Security headers for every response.
         *
         * The site loads nothing from a third party — no analytics, no CDN
         * script, no embedded map, no web font from a remote host (next/font
         * self-hosts). That is what lets the CSP stay this tight. Revisit
         * `script-src` and `connect-src` the moment analytics or a form
         * endpoint on another origin is added.
         *
         * `unsafe-inline` is required for style-src because Next injects
         * inline styles, and for script-src because the App Router bootstraps
         * with inline scripts; a nonce-based policy needs middleware-rendered
         * responses, which conflicts with the fully static export here.
         *
         * `script-src` additionally carries `unsafe-eval` in development only —
         * see the note on `scriptSrc` above.
         */
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "font-src 'self'",
              "connect-src 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'",
              ...httpsDirectives,
            ].join('; '),
          },
          ...(isDev
            ? []
            : [
                {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
                },
              ]),
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
          },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        // Content-stable assets. `images` is included because the files are
        // replaced by name only when the product photography changes, and the
        // optimizer's own output is keyed separately.
        source: '/:dir(video|brand|images)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
