import { notFound } from 'next/navigation'
import { QuoteRequestProvider } from '@/components/forms/quote-request-context'
import { SiteFooter } from '@/components/layout/footer'
import { SiteHeader } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/json-ld'
import { CorporateIntro } from '@/components/sections/corporate-intro'
import { ExperienceStrip } from '@/components/sections/experience-strip'
import { HeroSection } from '@/components/sections/hero-section'
import { RangeSection } from '@/components/sections/range-section'
import { QuoteSection } from '@/components/sections/quote-section'
import { StatementSection } from '@/components/sections/statement-section'
import { TradeStorySection } from '@/components/sections/trade-story-section'
import { WalnutSection } from '@/components/sections/walnut-section'
import { getDictionary } from '@/content'
import { isLocale } from '@/lib/i18n'
import { productCatalogGraph } from '@/lib/schema'

/**
 * Raymar homepage.
 *
 * Section order is a client revision of the approved design, not the design's
 * own order: the portfolio mosaic was removed entirely (it duplicated the
 * range and walnut sections and read as cluttered), and "Ürünlerimiz" now
 * comes before "Ceviz İçi" rather than after it. Every section is a Server
 * Component; the only client islands are the header (scroll state and the
 * drawer), the hero video, the scroll reveals/parallax and the quotation form.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dictionary = getDictionary(locale)

  return (
    <QuoteRequestProvider>
      <JsonLd graph={productCatalogGraph({ locale, dictionary })} />

      <a
        href="#giris"
        className="sr-only z-[100] bg-raymar-green text-raymar-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-5 focus:py-3 focus:text-xs focus:tracking-[0.2em] focus:uppercase focus:ring-raymar-gold"
      >
        {dictionary.meta.skipToContent}
      </a>

      <SiteHeader locale={locale} nav={dictionary.nav} header={dictionary.header} />

      <main className="relative overflow-x-hidden bg-raymar-ivory">
        <HeroSection content={dictionary.hero} />
        <StatementSection content={dictionary.statement} />
        <ExperienceStrip items={dictionary.experience} />
        <CorporateIntro content={dictionary.corporateIntro} />
        <RangeSection content={dictionary.range} locale={locale} />
        <WalnutSection content={dictionary.walnut} locale={locale} />
        <TradeStorySection content={dictionary.tradeStory} />
        <QuoteSection content={dictionary.quote} locale={locale} />
      </main>

      <SiteFooter content={dictionary.footer} locale={locale} />
    </QuoteRequestProvider>
  )
}
