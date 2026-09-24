import Link from 'next/link'
import { MediaFrame } from '@/components/media/media-frame'
import { ArrowShort } from '@/components/ui/icons'
import type { ProductImage } from '@/data/products'

interface LibraryCardProps {
  href: string
  title: string
  image: ProductImage
  imageAlt: string
  cta: string
  excerpt?: string | undefined
  /** A small line above the title — a guide's date and reading time. */
  meta?: string | undefined
  /** `h2` in an index grid; `h3` where the grid sits under a heading of its own. */
  headingLevel?: 'h2' | 'h3'
  /** Responsive `sizes` for the photograph; defaults to the three-column index grid. */
  sizes?: string
}

/**
 * One product or guide in a grid of cards.
 *
 * The whole card is clickable, but only the title is a link: its `::after`
 * stretches over the card. A second link on the image or the CTA line would
 * give keyboard and screen-reader users two or three stops per card for one
 * destination, and the title is the text that should be announced. The CTA
 * line is therefore decorative and hidden from assistive technology.
 */
export function LibraryCard({
  href,
  title,
  image,
  imageAlt,
  cta,
  excerpt,
  meta,
  headingLevel: Heading = 'h2',
  sizes = '(min-width: 1080px) 31vw, (min-width: 720px) 46vw, 100vw',
}: LibraryCardProps) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-raymar-tan">
        <MediaFrame image={image} alt={imageAlt} sizes={sizes} hoverZoom />
      </div>

      <div className="mt-5 flex flex-1 flex-col border-t border-raymar-gold/45 pt-5">
        {meta ? (
          <p className="text-xs font-normal tracking-[0.14em] text-raymar-gold-dark uppercase">
            {meta}
          </p>
        ) : null}
        <Heading className="mt-3 font-[family-name:var(--font-display)] text-[27px] leading-[1.14] font-normal text-raymar-green first:mt-0">
          <Link
            href={href}
            className="transition-colors duration-300 group-hover:text-raymar-gold-dark after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </Heading>
        {excerpt ? (
          <p className="mt-3 text-[15px] leading-[1.68] font-light text-raymar-ink/80">
            {excerpt}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2.5 pt-5 text-xs font-normal tracking-[0.2em] text-raymar-green uppercase"
        >
          {cta}
          <span className="inline-flex text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
            <ArrowShort />
          </span>
        </span>
      </div>
    </article>
  )
}
