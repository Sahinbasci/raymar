import Image from 'next/image'
import Link from 'next/link'
import { HeroVideo } from '@/components/media/hero-video'
import { ChevronDown } from '@/components/ui/icons'
import { heroMedia } from '@/data/products'
import type { HeroContent } from '@/types/content'

/**
 * Full-bleed cinematic hero.
 *
 * The poster is a priority `next/image` painted underneath the video, so it is
 * the LCP element and the composition is correct on first frame; the video fades
 * in over it once it can play. Both are `object-cover` inside a fixed-height
 * frame, so neither ever stretches and the layout cannot shift.
 *
 * The two scrims are the design's exact gradients: a 210px top wash that keeps
 * the transparent header legible, and a bottom wash under the scroll cue. They
 * are edge treatments rather than a full-screen overlay, so the footage stays
 * readable.
 */
export function HeroSection({ content }: { content: HeroContent }) {
  return (
    <section
      id="ust"
      className="hero-frame relative overflow-hidden bg-raymar-green"
      aria-label="Raymar Nuts"
    >
      <Image
        src={heroMedia.poster}
        alt={content.posterAlt}
        aria-hidden={content.posterAlt === '' ? true : undefined}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <HeroVideo />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[210px] bg-[linear-gradient(to_bottom,rgb(0_42_31/0.6),rgb(0_42_31/0.22)_55%,rgb(0_42_31/0))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(to_top,rgb(0_42_31/0.52),rgb(0_42_31/0.12)_55%,rgb(0_42_31/0))]"
      />

      <Link
        href="#giris"
        className="hero-cue absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-raymar-white transition-[color,transform] duration-[450ms] ease-[var(--ease-raymar)] hover:translate-y-[5px] hover:text-raymar-gold"
      >
        <span className="hero-cue-label font-medium uppercase [text-shadow:0_1px_18px_rgb(0_42_31/0.55)]">
          {content.cueLabel}
        </span>
        <span
          aria-hidden="true"
          className="hero-cue-line block w-px bg-[linear-gradient(to_bottom,rgb(252_252_252/0.12),rgb(240_176_56/0.9))]"
        />
        <ChevronDown className="text-raymar-gold motion-safe:animate-raymar-bob" />
      </Link>
    </section>
  )
}
