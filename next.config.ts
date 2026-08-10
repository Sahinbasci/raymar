import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Only local assets are served; no remote patterns are required.
    formats: ['image/avif', 'image/webp'],
    // Matches the viewport ladder documented in docs/RESPONSIVE_NOTES.md so the
    // generated srcset lands on the widths the layout actually uses.
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1440, 1728, 1920],
    imageSizes: [96, 148, 256, 320, 384, 480, 640],
  },
  async headers() {
    return [
      {
        // The hero video and the brand SVGs are immutable, content-stable assets.
        source: '/:dir(video|brand)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
