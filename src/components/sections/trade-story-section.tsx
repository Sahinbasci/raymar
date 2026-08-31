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
      <FloatingMotif />

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
          {/*
            One rail, five numbered nodes on it — the same idea at both sizes,
            turned through ninety degrees rather than redrawn.

            An `<ol>`, not a grid of divs: these are five ordered principles and
            the order is the point, so a screen reader should hear "list, 5
            items" and the position of each. The drawn numeral is therefore
            `aria-hidden` — the list already carries what it says, and reading
            "zero one" before every title is noise.

            The rail passes BEHIND the nodes and each node is filled with the
            section's own green, which is what masks it; the rail is also inset
            to the first and last node centres so it never dangles past the
            row. Geometry lives in `.trade-steps` (globals.css), because the
            inset depends on the node size and the two have to stay in step.
          */}
          <ol className="trade-steps">
            {content.pillars.map((pillar, index) => (
              <li key={pillar} className="trade-step">
                <Reveal delay={index * 90} className="trade-step-inner">
                  <span aria-hidden="true" className="trade-step-node">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="trade-step-label">{pillar}</p>
                </Reveal>
              </li>
            ))}
          </ol>

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
