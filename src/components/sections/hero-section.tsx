import { getImageProps } from 'next/image'
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
  // Art-direct the LCP poster with a real <picture>: only the source that
  // matches the viewport is ever downloaded. Two separate <Image fill priority>
  // elements each preloaded AND downloaded their srcset even when `display:none`,
  // so a phone fetched the ~51 KB landscape poster it never shows on top of the
  // ~15 KB portrait one it does. `getImageProps` gives us Next's optimized
  // srcset/AVIF pipeline inside markup we control.
  /*
   * `loading: 'eager'` + `fetchPriority: 'high'` rather than `priority: true`.
   *
   * `priority` is deprecated in Next 16, but the reason to drop it here is that
   * through `getImageProps` it was doing nothing at all: its only effects are
   * suppressing `loading="lazy"` and setting `preload` on the *metadata* the
   * `<Image>` component consumes to emit a `<link rel="preload">`. We take only
   * `props`, so that link was never emitted and the LCP element shipped with no
   * priority signal of any kind while the decorative header logo held the
   * page's only image preload.
   *
   * The docs' warning against `loading="eager"` for art direction (image.md
   * :1321) is about the two-`<Image>`-elements-hidden-by-CSS pattern, where it
   * would fetch both. Inside a real `<picture>` the browser still resolves to a
   * single source, which is why this file uses one in the first place.
   */
  const posterCommon = {
    alt: content.posterAlt,
    fill: true as const,
    loading: 'eager' as const,
    fetchPriority: 'high' as const,
    sizes: '100vw',
  }
  const { props: desktopPoster } = getImageProps({
    ...posterCommon,
    src: heroMedia.poster,
  })
  const { props: mobilePoster } = getImageProps({
    ...posterCommon,
    src: heroMedia.posterMobile,
  })

  return (
    <section
      id="ust"
      className="hero-frame relative overflow-hidden bg-raymar-green"
      aria-label="Raymar Nuts"
    >
      {/* Approved 16:9 poster at ≥720px (the design's `mobil` breakpoint, matched
          by HeroVideo), the portrait cut (the mobile clip's first frame) below.
          The <img> default is the mobile poster, so phones never even request the
          landscape source. The video fades in over whichever poster shows. */}
      <picture>
        <source
          media="(min-width: 720px)"
          srcSet={desktopPoster.srcSet}
          sizes={desktopPoster.sizes}
        />
        <img
          {...mobilePoster}
          alt={content.posterAlt}
          aria-hidden={content.posterAlt === '' ? true : undefined}
          className="object-cover object-center"
        />
      </picture>

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
