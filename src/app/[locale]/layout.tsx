import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MotionProvider } from '@/components/motion/motion-provider'
import { getDictionary } from '@/content'
import { cormorant, cormorantItalic, jost } from '@/lib/fonts'
import { completeLocales, isLocale, localeTags, type Locale } from '@/lib/i18n'
import { ogImage, siteUrl } from '@/lib/site'
import '../globals.css'

/**
 * Root layout. Every route lives under `[locale]`, so this is the document
 * shell; `/` is redirected to the default locale by `src/middleware.ts`.
 */

export function generateStaticParams() {
  return completeLocales.map((locale) => ({ locale }))
}

export const dynamicParams = false

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
      languages: Object.fromEntries(
        completeLocales.map((code) => [localeTags[code], `/${code}`]),
      ),
    },
    openGraph: {
      type: 'website',
      siteName: meta.siteName,
      title: meta.title,
      description: meta.description,
      locale: localeTags[locale].replace('-', '_'),
      url: `/${locale}`,
      images: [{ url: ogImage.url, width: ogImage.width, height: ogImage.height }],
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
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html
      lang={localeTags[locale as Locale]}
      className={`${jost.variable} ${cormorant.variable} ${cormorantItalic.variable}`}
    >
      <head>
        {/*
          Scroll reveals are server-rendered in their hidden state so the
          animation has something to animate from. Without JavaScript that
          state would never resolve and the page would read as blank below the
          fold, so restore every revealing element unconditionally.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
