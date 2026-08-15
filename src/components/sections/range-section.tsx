import { QuoteRequestButton } from '@/components/forms/quote-request-button'
import { MediaFrame } from '@/components/media/media-frame'
import { PendingMedia } from '@/components/media/pending-media'
import { Reveal } from '@/components/motion/reveal'
import { CategoryLabel, SectionEyebrow } from '@/components/ui/eyebrow'
import { rangeProducts } from '@/data/products'
import { formatTemplate } from '@/lib/cn'
import type { RangeContent } from '@/types/content'

/**
 * The single-variety range — everything Raymar sells as one product rather than
 * as graded varieties. Walnut is absent by design: it is the only line with
 * grades, so it keeps its own section above this one.
 *
 * The section is not split by origin. Hazelnut and pistachio are Turkish, so
 * the earlier "Seçkin İthal Ürünler" heading was simply wrong for two of the
 * six products; the range is presented as one group instead.
 *
 * Card geometry lives in `.range-grid` / `.range-media` (globals.css) — see the
 * note there for why the design's alternating baseline drop is not carried
 * over, and why no `nth-child` rule is needed as a result.
 */
export function RangeSection({ content }: { content: RangeContent }) {
  return (
    <section id="urunlerimiz" className="border-t border-raymar-green/8 bg-raymar-ivory">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-7.5 pt-19 pb-11 md:pt-25 md:pb-13 lg:pt-39.5 lg:pb-17">
          <div>
            <Reveal className="mb-9">
              <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(32px,3.9vw,62px)] leading-[1.05] tracking-[-0.012em] text-raymar-green">
                {content.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-[340px] text-[15px] leading-[1.7] font-light text-raymar-ink/76">
              {content.intro}
            </p>
          </Reveal>
        </div>

        <div className="range-grid pb-19 md:pb-25 lg:pb-31.5">
          {rangeProducts.map((product) => {
            const copy = content.products[product.id]
            return (
              <Reveal key={product.id} delay={product.revealDelay}>
                <article className="group flex flex-col gap-5.5">
                  <div className="range-media relative overflow-hidden bg-raymar-tan">
                    {product.image ? (
                      <MediaFrame
                        image={product.image}
                        alt={copy.imageAlt}
                        sizes="(min-width: 1080px) 31vw, 50vw"
                        hoverZoom
                      />
                    ) : (
                      <PendingMedia label={content.imagePending} />
                    )}
                  </div>
                  {/* A gold hairline runs the full width of every card and
                      every card starts at the same baseline, so the row reads
                      as one system. This is what carries the structure now
                      that the alternating offset is gone. */}
                  <div className="border-t border-raymar-gold/45 pt-5">
                    <CategoryLabel>{content.categoryLabel}</CategoryLabel>
                    <h3 className="mt-3.5 font-[family-name:var(--font-display)] text-[28px] leading-[1.1] font-normal text-raymar-green transition-[letter-spacing] duration-500 group-hover:tracking-[0.012em]">
                      {copy.name}
                    </h3>
                    {/* Optional: the client supplies these one product at a
                        time, so a card without a description keeps its old
                        spacing rather than reserving an empty gap. */}
                    {copy.description ? (
                      <p className="mt-3 max-w-[330px] text-[14.5px] leading-[1.68] font-light text-raymar-ink/74">
                        {copy.description}
                      </p>
                    ) : null}
                    <QuoteRequestButton
                      group={copy.name}
                      name={copy.name}
                      variant="arrow"
                      className="mt-4.5"
                      ariaLabel={formatTemplate(content.quoteCtaAriaTemplate, {
                        product: copy.name,
                      })}
                    >
                      {content.quoteCta}
                    </QuoteRequestButton>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
