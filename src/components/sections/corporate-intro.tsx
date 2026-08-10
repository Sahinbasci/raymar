import { BrandEmblem } from '@/components/media/brand-logo'
import { MediaFrame } from '@/components/media/media-frame'
import { ParallaxMedia } from '@/components/motion/parallax-media'
import { Reveal } from '@/components/motion/reveal'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import { UnderlineLink } from '@/components/ui/text-link'
import { parallaxOverscan } from '@/components/motion/tokens'
import { editorialImages } from '@/data/products'
import type { CorporateIntroContent } from '@/types/content'

/**
 * Corporate introduction on cream: text left, a circular hazelnut portrait
 * right, with the gold emblem tucked against the circle's lower-left. The
 * portrait drifts gently on scroll — the design's `data-parallax="0.06"`.
 */
export function CorporateIntro({ content }: { content: CorporateIntroContent }) {
  return (
    <section id="kurumsal" className="overflow-hidden bg-raymar-cream">
      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-[54px] py-19 md:gap-16 md:py-25 lg:grid-cols-2 lg:gap-24 lg:pt-42 lg:pb-43.5">
          <div>
            <Reveal className="mb-10">
              <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="max-w-[520px] text-[clamp(34px,4.2vw,68px)] leading-[1.04] tracking-[-0.012em] text-raymar-green">
                {content.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-9 max-w-[498px] text-[17px] leading-[1.78] font-light text-raymar-ink/84">
                {content.body}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <UnderlineLink href="#ticaret" className="mt-10.5">
                {content.link}
              </UnderlineLink>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative flex justify-end">
            <ParallaxMedia
              overscan={parallaxOverscan.portrait}
              className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-full bg-raymar-tan"
            >
              <MediaFrame
                image={editorialImages.corporatePortrait}
                alt={content.imageAlt}
                sizes="(min-width: 1080px) 480px, (min-width: 720px) 45vw, 100vw"
              />
            </ParallaxMedia>
            <BrandEmblem width={44} className="absolute bottom-6.5 left-3.5 opacity-90" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
