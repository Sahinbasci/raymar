import type { MetadataRoute } from 'next'
import { getDictionary } from '@/content'
import { defaultLocale } from '@/lib/i18n'

/**
 * Web app manifest.
 *
 * `display: 'browser'` on purpose. This is a corporate brochure site, not an
 * app: declaring `standalone` would let a phone install it chromeless, hiding
 * the URL bar and the back button on a site whose whole navigation is in-page
 * anchors. The manifest is here for the icon and theme colour, not to make the
 * site installable.
 */
export default function manifest(): MetadataRoute.Manifest {
  const { meta } = getDictionary(defaultLocale)

  return {
    name: meta.title,
    short_name: meta.siteName,
    description: meta.description,
    lang: defaultLocale,
    start_url: `/${defaultLocale}`,
    display: 'browser',
    background_color: '#f8f5ee',
    theme_color: '#004c38',
    icons: [
      {
        src: '/brand/raymar-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/brand/raymar-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}

/*
 * Required by `output: 'export'`: without it the build fails outright with
 * "export const dynamic = force-static not configured on route". These files
 * already compute their output from build-time constants only, so declaring it
 * changes nothing about the result — it just tells Next that explicitly.
 */
export const dynamic = 'force-static'
