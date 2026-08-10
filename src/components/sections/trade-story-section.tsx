import { FloatingMotif } from '@/components/motion/floating-motif'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import type { TradeStoryContent } from '@/types/content'

/**
 * Trade narrative on deep green.
 *
 * Five pillars sit under gold hairlines, numbered rather than bulleted: the
 * design's alternating dot gave the row rhythm but no hierarchy, and at five
 * across the titles alone left the band reading thin.
 *
 * The section used to close on a 136px gold "25". That was the page's third
 * statement of the same number — the credential strip and this section's own
 * heading already carry it — and it dead-ended the page just before the form.
 * It now closes on a line and a button into the quotation section, so the
 * narrative hands the reader somewhere to go.
 *
 * A faint vertical gold line runs down the centre of the section behind
 * everything.
 */
export function TradeStorySection({ content }: { content: TradeStoryContent }) {
  return (
    <section id="ticaret" className="relative overflow-hidden bg-raymar-green">
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-full w-px bg-[linear-gradient(to_bottom,rgb(240_176_56/0),rgb(240_176_56/0.18),rgb(240_176_56/0))]"
      />

      {/* Clear of the 840px heading measure and of the stat block below. */}
      <FloatingMotif
        className="top-[22%] right-[9%] hidden lg:block"
        width={112}
        drift={30}
        opacity={0.07}
        rotate={10}
      />

      <div className="relative shell">
        <div className="max-w-[840px] pt-19 md:pt-25 lg:pt-44.5">
          <Reveal className="mb-10">
            <SectionEyebrow tone="gold">{content.eyebrow}</SectionEyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-[clamp(32px,4.1vw,66px)] leading-[1.04] tracking-[-0.012em] text-raymar-white">
              {content.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-[560px] text-[16.5px] leading-[1.78] font-light text-raymar-white/80">
              {content.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 pb-19 md:mt-18 md:pb-25 lg:mt-24 lg:pb-33">
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6.5 md:gap-y-13 lg:grid-cols-5">
            {content.pillars.map((pillar, index) => (
              <Reveal key={pillar} delay={index * 90}>
                <div className="border-t border-raymar-gold/50 pt-6">
                  <span
                    aria-hidden="true"
                    className="block font-[family-name:var(--font-display)] text-[30px] leading-none font-light text-raymar-gold"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-5 font-[family-name:var(--font-display)] text-[25px] leading-[1.2] font-normal text-raymar-white">
                    {pillar}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-15 flex flex-wrap items-center justify-between gap-8 border-t border-raymar-gold/24 pt-11 lg:mt-22">
              <p className="m-0 max-w-[520px] font-[family-name:var(--font-display)] text-[clamp(24px,2.6vw,34px)] leading-[1.22] font-light text-raymar-white">
                {content.closingLead}
              </p>
              <ButtonLink href="#teklif" variant="gold" withIcon>
                {content.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
