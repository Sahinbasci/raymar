import { QuoteForm } from '@/components/forms/quote-form'
import { Reveal } from '@/components/motion/reveal'
import { SectionEyebrow } from '@/components/ui/eyebrow'
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
export function QuoteSection({ content }: { content: QuoteContent }) {
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
                    <div className="mt-2.25 text-[14.5px] font-light text-raymar-ink/76">
                      {content.phoneValue}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-normal tracking-[0.24em] text-raymar-ink/78 uppercase">
                      {content.emailLabel}
                    </div>
                    <div className="mt-2.25 text-[14.5px] font-light text-raymar-ink/76">
                      {content.emailValue}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <QuoteForm content={content} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
