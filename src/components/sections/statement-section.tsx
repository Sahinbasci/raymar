import { FloatingMotif } from '@/components/motion/floating-motif'
import { Reveal } from '@/components/motion/reveal'
import { ButtonLink } from '@/components/ui/button'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import type { StatementContent } from '@/types/content'

/**
 * The dark-green statement block directly beneath the hero.
 *
 * Carries the page's only `h1`. Left-aligned with a deliberately narrow measure
 * against a wide field of negative space — the asymmetry is the composition, so
 * the block is not centred at any breakpoint.
 */
export function StatementSection({ content }: { content: StatementContent }) {
  return (
    <section id="giris" className="relative overflow-hidden bg-raymar-green">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,rgb(240_176_56/0),rgb(240_176_56/0.5)_30%,rgb(240_176_56/0.5)_70%,rgb(240_176_56/0))]"
      />

      {/* Negative space to the right of the 900px headline measure. Desktop
          only — the copy fills the column on narrower screens. One mark, at the
          shared size and position; see `floatingMotif` in motion/tokens.ts for
          why the second, smaller one here was removed. */}
      <FloatingMotif />
      <div className="shell">
        <div className="flex flex-col items-start pt-20 pb-21 md:pt-26 md:pb-27.5 lg:pt-43 lg:pb-44.5">
          <Reveal className="mb-10">
            <SectionEyebrow tone="gold">{content.eyebrow}</SectionEyebrow>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="max-w-[900px] text-[clamp(44px,5.6vw,88px)] leading-[1.01] tracking-[-0.012em] text-raymar-white">
              {content.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8.5 max-w-[560px] text-[17px] leading-[1.75] font-light text-raymar-white/84">
              {content.body}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-11.5 flex flex-wrap gap-3.5">
              <ButtonLink href="#urunlerimiz" variant="gold" withIcon>
                {content.primaryCta}
              </ButtonLink>
              <ButtonLink href="#teklif" variant="outline">
                {content.secondaryCta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
