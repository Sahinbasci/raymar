import Link from 'next/link'
import { MediaFrame } from '@/components/media/media-frame'
import { Reveal } from '@/components/motion/reveal'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import { ArrowLong, ArrowShort } from '@/components/ui/icons'
import {
  portfolioLead,
  portfolioSecondary,
  portfolioTiles,
  type PortfolioCard as PortfolioCardData,
} from '@/data/products'
import { cn } from '@/lib/cn'
import type { PortfolioCardCopy, PortfolioContent } from '@/types/content'

type CardSize = 'lead' | 'secondary' | 'tile'

const scrims: Record<CardSize, string> = {
  lead: 'bg-[linear-gradient(to_top,rgb(0_42_31/0.82)_0%,rgb(0_42_31/0.28)_44%,rgb(0_42_31/0.04)_72%)]',
  secondary:
    'bg-[linear-gradient(to_top,rgb(0_42_31/0.8)_0%,rgb(0_42_31/0.2)_52%,rgb(0_42_31/0)_80%)]',
  tile: 'bg-[linear-gradient(to_top,rgb(0_42_31/0.82),rgb(0_42_31/0.1))]',
}

interface PortfolioCardProps {
  card: PortfolioCardData
  copy: PortfolioCardCopy
  size: CardSize
  sizes: string
  className?: string
}

/**
 * One tile of the portfolio mosaic. The three sizes share the same anatomy —
 * cover image, gradient scrim, optional index badge, serif title and a sliding
 * arrow — at the scales the design specifies.
 */
function PortfolioCard({ card, copy, size, sizes, className }: PortfolioCardProps) {
  return (
    <Reveal delay={card.revealDelay} className={className}>
      <Link
        href={card.href}
        className={cn(
          'group @container relative block h-full overflow-hidden bg-raymar-green-deep',
          size === 'lead' && 'min-h-[420px] md:min-h-[540px] lg:min-h-[660px]',
          size === 'secondary' && 'min-h-[322px]',
          size === 'tile' && 'min-h-[152px]',
        )}
      >
        {card.image ? (
          <MediaFrame image={card.image} alt={copy.imageAlt} sizes={sizes} hoverZoom />
        ) : null}
        <span aria-hidden="true" className={cn('absolute inset-0', scrims[size])} />

        {copy.badge ? (
          <span
            className={cn(
              'absolute inline-flex items-center gap-2.5 bg-raymar-green-deep/50 text-xs font-normal tracking-[0.24em] text-raymar-gold uppercase',
              size === 'lead'
                ? 'top-8 left-8.5 px-3.25 py-2'
                : 'top-6.5 left-7 px-3 py-1.75',
            )}
          >
            {copy.badge}
          </span>
        ) : null}

        {size === 'tile' ? (
          <span className="absolute right-5 bottom-4.5 left-5 flex items-center justify-between gap-3">
            {/* Sized against the tile, not the viewport: these four tiles are
                narrow at 390px AND at 768px (where the mosaic splits into two
                columns), so a viewport rule cannot serve both. The design's
                21px is restored as soon as the tile is wide enough for it. */}
            <span className="font-[family-name:var(--font-display)] text-[16px] leading-[1.14] font-normal text-raymar-white transition-[letter-spacing] duration-500 group-hover:tracking-[0.012em] @min-[200px]:text-[18px] @min-[250px]:text-[21px]">
              {copy.title}
            </span>
            <span className="inline-flex flex-none text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
              <ArrowShort />
            </span>
          </span>
        ) : (
          <span
            className={cn(
              'absolute block',
              size === 'lead'
                ? 'right-8.5 bottom-8.5 left-8.5'
                : 'right-7 bottom-7 left-7',
            )}
          >
            <span
              className={cn(
                'block font-[family-name:var(--font-display)] font-light text-raymar-white transition-[letter-spacing] duration-500 group-hover:tracking-[0.012em]',
                size === 'lead'
                  ? 'text-[clamp(38px,5vw,54px)] leading-[1.02] tracking-[-0.01em]'
                  : 'text-[clamp(28px,3.4vw,36px)] leading-[1.06]',
              )}
            >
              {copy.title}
            </span>
            <span className="mt-3 flex items-center justify-between gap-5">
              <span className="text-[13.5px] font-normal tracking-[0.02em] text-raymar-white/84">
                {copy.subtitle}
              </span>
              <span className="inline-flex flex-none text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
                <ArrowLong />
              </span>
            </span>
          </span>
        )}
      </Link>
    </Reveal>
  )
}

export function PortfolioSection({ content }: { content: PortfolioContent }) {
  return (
    <section id="urunler" className="bg-raymar-ivory">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8 pt-19 pb-11 md:pt-25 md:pb-13 lg:pt-40 lg:pb-16.5">
          <div>
            <Reveal className="mb-9">
              <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="max-w-[640px] text-[clamp(32px,3.9vw,62px)] leading-[1.05] tracking-[-0.012em] text-raymar-green">
                {content.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="max-w-[330px] text-[15px] leading-[1.7] font-light text-raymar-ink/76">
              {content.intro}
            </p>
          </Reveal>
        </div>

        {/* The mosaic splits into two columns from the tablet step, not the
            desktop one — the design's `applyPortfolioBase` only collapses it to
            a single column below 720px. */}
        <div className="grid grid-cols-1 gap-4.5 pb-19 md:grid-cols-[1.12fr_1fr] md:pb-25 lg:pb-33">
          <PortfolioCard
            card={portfolioLead}
            copy={content.cards[portfolioLead.id]}
            size="lead"
            sizes="(min-width: 1080px) 53vw, 100vw"
          />

          <div className="grid grid-rows-[auto_auto] gap-4.5">
            <PortfolioCard
              card={portfolioSecondary}
              copy={content.cards[portfolioSecondary.id]}
              size="secondary"
              sizes="(min-width: 1080px) 45vw, 100vw"
            />
            <div className="grid grid-cols-2 gap-4.5">
              {portfolioTiles.map((tile) => (
                <PortfolioCard
                  key={`${tile.id}-${tile.revealDelay}`}
                  card={tile}
                  copy={content.cards[tile.id]}
                  size="tile"
                  sizes="(min-width: 1080px) 22vw, 50vw"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
