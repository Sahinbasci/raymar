import type { NextConfig } from 'next'

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
         */
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "font-src 'self'",
              "connect-src 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
