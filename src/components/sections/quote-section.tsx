import { QuoteForm } from '@/components/forms/quote-form'
import { ContactMap } from '@/components/media/contact-map'
import { Reveal } from '@/components/motion/reveal'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import type { Locale } from '@/lib/i18n'
import type { QuoteContent } from '@/types/content'

/**
 * Quotation and contact block on cream.
 *
 * Asymmetric by design — a narrower copy column against a wider form panel
 * (.85fr / 1.15fr). Telephone and e-mail render the design's bracketed
 * placeholders verbatim: the values exist in the brand manual but under a
 * different legal entity and domain, so they are not published here.
 * See docs/ASSET_AUDIT.md.
 */
export function QuoteSection({
  content,
  locale,
}: {
  content: QuoteContent
  locale: Locale
}) {
  /*
   * Built from `mapQuery` — the postal address alone — and NOT from the
   * `addressLines` the visitor reads above it.
   *
   * Joining those lines was the original approach and it pinned the wrong
   * building: the first line is the legal name, and with a company name
   * leading the query Maps resolved it to a similarly named but unrelated
   * business nearby instead of geocoding the address. The two fields say
   * different things on purpose — one is what a person reads, the other is
   * what a geocoder needs.
   *
   * `output=embed` is the keyless Maps embed form: no API key, no billing
   * account, and it renders identically to one that has both.
   */
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    content.mapQuery,
  )}&output=embed`

  return (
    <section id="teklif" className="bg-raymar-cream">
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-13 pt-19 pb-19 md:gap-15 md:pt-25 md:pb-25 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24 lg:pt-41.5 lg:pb-43">
          <div>
            <Reveal className="mb-9.5">
              <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-[clamp(30px,3.5vw,54px)] leading-[1.07] tracking-[-0.01em] text-raymar-green">
                {content.heading}
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7.5 max-w-[400px] text-base leading-[1.78] font-light text-raymar-ink/82">
                {content.body}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-13 flex flex-col gap-5.5 border-t border-raymar-green/16 pt-8.5">
                <div>
                  <div className="text-xs font-normal tracking-[0.24em] text-raymar-ink/78 uppercase">
                    {content.addressLabel}
                  </div>
                  <address className="mt-2.25 text-[14.5px] leading-[1.65] font-light text-raymar-ink not-italic">
                    {content.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <div className="grid grid-cols-2 gap-5.5">
                  <div>
                    <div className="text-xs font-normal tracking-[0.24em] text-raymar-ink/78 uppercase">
                      {content.phoneLabel}
                    </div>
                    <a
                      href="tel:+905419236403"
                      className="mt-2.25 block text-[14.5px] font-light text-raymar-ink/76 transition-colors duration-300 hover:text-raymar-green"
                    >
                      {content.phoneValue}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs font-normal tracking-[0.24em] text-raymar-ink/78 uppercase">
                      {content.emailLabel}
                    </div>
                    <a
                      href={`mailto:${content.emailValue}`}
                      className="mt-2.25 block text-[14.5px] font-light text-raymar-ink/76 transition-colors duration-300 hover:text-raymar-green"
                    >
                      {content.emailValue}
                    </a>
                  </div>
                </div>
                <ContactMap
                  label={content.mapLabel}
                  title={content.mapTitle}
                  loadLabel={content.mapLoadLabel}
                  notice={content.mapNotice}
                  embedSrc={mapEmbedSrc}
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <QuoteForm content={content} locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
