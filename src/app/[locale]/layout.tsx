import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { MotionProvider } from '@/components/motion/motion-provider'
import { JsonLd } from '@/components/seo/json-ld'
import { getDictionary } from '@/content'
import { cormorant, cormorantItalic, jost } from '@/lib/fonts'
import {
  completeLocales,
  defaultLocale,
  isLocale,
  localeTags,
  ogLocales,
  type Locale,
} from '@/lib/i18n'
import { organizationGraph } from '@/lib/schema'
import { ogImage, siteUrl } from '@/lib/site'
import '../globals.css'

/**
 * Root layout. Every route lives under `[locale]`, so this is the document
 * shell; `/` is redirected to the default locale by `src/proxy.ts`.
 */

export function generateStaticParams() {
  return completeLocales.map((locale) => ({ locale }))
}

export const dynamicParams = false

/**
 * The corporate green tints the browser chrome on Android and the status bar in
 * iOS standalone mode, so the page does not open framed by a default grey. Two
 * entries because the light/dark pair is what stops the bar flipping to white
 * for a visitor whose phone is in light mode — the site itself has no dark
 * theme, so both resolve to the same brand colour deliberately.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#004c38' },
    { media: '(prefers-color-scheme: dark)', color: '#004c38' },
  ],
}

interface LayoutParams {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { meta } = getDictionary(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: meta.titleTemplate,
    },
    description: meta.description,
    applicationName: meta.siteName,
    alternates: {
      canonical: `/${locale}`,
      // Only locales with approved copy are advertised. English is added here
      // automatically once it is listed in `completeLocales`.
      //
      // `x-default` names the page served to a visitor whose language matches
      // no alternate — without it, a German or Gulf buyer has nothing declared
      // to fall back to. It points at the default locale today and should move
      // to `/en` the moment English publishes, since English is the fallback an
      // international audience expects.
      languages: {
        ...Object.fromEntries(
          completeLocales.map((code) => [localeTags[code], `/${code}`]),
        ),
        'x-default': `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: meta.siteName,
      title: meta.title,
      description: meta.description,
      locale: ogLocales[locale],
      url: `/${locale}`,
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      /*
       * `max-snippet: -1` and `max-image-preview: large` lift the caps on how
       * much of the page may be quoted in a rich result or an AI Overview.
       * Since the goal here is to be quoted, capping that would work directly
       * against it — and there is no confidential copy on the site to protect.
       */
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dictionary = getDictionary(locale)

  return (
    <html
      lang={localeTags[locale as Locale]}
      className={`${jost.variable} ${cormorant.variable} ${cormorantItalic.variable}`}
    >
      <head>
        {/*
          No `<noscript>` reveal rescue here any more. Scroll reveals used to be
          server-rendered in their hidden state, which needed one; `Reveal` now
          renders visible and hides an element only after JavaScript has
          measured it below the fold, so there is nothing left to restore.
        */}
        <JsonLd graph={organizationGraph({ locale, dictionary })} />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
