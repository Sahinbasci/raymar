import {
  QuoteDetailLink,
  QuoteRequestButton,
} from '@/components/forms/quote-request-button'
import { MediaFrame } from '@/components/media/media-frame'
import { PendingMedia } from '@/components/media/pending-media'
import { Reveal } from '@/components/motion/reveal'
import { CategoryLabel, SectionEyebrow } from '@/components/ui/eyebrow'
import { walnutGroupIds, walnutProducts } from '@/data/products'
import type { WalnutContent } from '@/types/content'

/**
 * Walnut kernel family, presented as headed category blocks.
 *
 * One block is rendered per entry in `walnutGroupIds`; a group with no products
 * is skipped, so adding or removing a category is a data change only. Within a
 * block the lead card spans two columns with a taller image well — column
 * counts and well heights live in `.walnut-grid` (globals.css) because they are
 * keyed to `nth-child` position.
 */
export function WalnutSection({ content }: { content: WalnutContent }) {
  const groups = walnutGroupIds
    .map((id) => ({
      id,
      heading: content.groups[id],
      products: walnutProducts.filter((product) => product.group === id),
    }))
    .filter((group) => group.products.length > 0)

  // A single group would print the section's own subject three times over —
  // section heading, group heading, then the label on every card. Category
  // dividers therefore appear only once there is more than one group to divide.
  // The product heading level follows, so no level is ever skipped.
  const showGroupHeadings = groups.length > 1
  const ProductHeading = showGroupHeadings ? 'h4' : 'h3'

  return (
    <section id="ceviz" className="bg-raymar-cream">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8 pt-19 pb-11 md:pt-25 md:pb-13 lg:pt-39.5 lg:pb-15.5">
          <div>
            <Reveal className="mb-9">
              <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="max-w-[600px] text-[clamp(32px,3.9vw,62px)] leading-[1.05] tracking-[-0.012em] text-raymar-green">
                {content.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-[360px] text-[15px] leading-[1.7] font-light text-raymar-ink/76">
              {content.intro}
            </p>
          </Reveal>
        </div>

        {groups.map((group) => (
          <div key={group.id}>
            {showGroupHeadings ? (
              /* Category divider: serif name with a gold hairline running out
                 to the section edge. */
              <Reveal className="mb-8 flex items-baseline gap-6">
                <h3 className="flex-none font-[family-name:var(--font-display)] text-[clamp(22px,2.4vw,30px)] leading-none font-normal text-raymar-green">
                  {group.heading}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 bg-raymar-gold/45" />
              </Reveal>
            ) : null}

            <div className="walnut-grid pb-8.5">
              {group.products.map((product) => {
                const copy = content.products[product.id]
                return (
                  <Reveal key={product.id} delay={product.revealDelay}>
                    <article className="group relative flex h-full flex-col overflow-hidden border border-raymar-green/10 bg-raymar-white">
                      <div className="walnut-media relative overflow-hidden bg-raymar-tan">
                        {product.image ? (
                          <MediaFrame
                            image={product.image}
                            alt={copy.imageAlt}
                            /* The lead card spans two columns at every width
                               that has more than one, so it must declare twice
                               the share the others do. Sending the 25vw string
                               for it made the optimizer emit a 384px file for a
                               slot ~1240 device px wide — a 3x upscale, and the
                               reason that card looked soft. */
                            sizes={
                              product.featured
                                ? '(min-width: 1240px) 50vw, 100vw'
                                : '(min-width: 1240px) 25vw, (min-width: 720px) 50vw, 100vw'
                            }
                            hoverZoom
                          />
                        ) : (
                          <PendingMedia label={content.imagePending} />
                        )}
                      </div>
                      <div className="flex flex-col gap-3.5 px-6 pt-6.5 pb-6">
                        <CategoryLabel>{content.categoryLabel}</CategoryLabel>
                        <ProductHeading className="font-[family-name:var(--font-display)] text-[26px] leading-[1.12] font-normal text-raymar-green transition-[letter-spacing] duration-500 group-hover:tracking-[0.012em]">
                          {copy.name}
                        </ProductHeading>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-4.5 gap-y-3">
                          <QuoteDetailLink group={content.eyebrow} name={copy.name}>
                            {content.detailsCta}
                          </QuoteDetailLink>
                          <QuoteRequestButton
                            group={content.eyebrow}
                            name={copy.name}
                            variant="underline"
                            ariaLabel={`${copy.name} için teklif talep et`}
                          >
                            {content.quoteCta}
                          </QuoteRequestButton>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        ))}

        <p className="m-0 pb-19 text-[12.5px] font-normal tracking-[0.02em] text-raymar-ink/74 md:pb-25 lg:pb-35.5">
          {content.footnote}
        </p>
      </div>
    </section>
  )
}
