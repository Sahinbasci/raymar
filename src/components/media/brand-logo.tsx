import Image from 'next/image'
import { brandAssets } from '@/data/products'
import { cn } from '@/lib/cn'

/**
 * Official Raymar logotype.
 *
 * The supplied SVGs are used byte-for-byte and served unoptimised, so the
 * artwork is never rasterised, recoloured or re-drawn.
 *
 * Sizing is driven by **height**, because height is the constraining dimension
 * in every placement (the approved design fixes the header logo at 40px tall,
 * the drawer at 36px, the footer at 44px). Width is derived from the artwork's
 * own 184.55 : 68.51 ratio, so the lockup can never be distorted and can never
 * overflow its row.
 *
 * Brand manual (KURUMSAL KİMLİK KILAVUZU '23, p.08) approves exactly two
 * on-brand lockups, which map to the two variants below:
 *   `white-gold` — gold emblem + white wordmark, for the green surfaces
 *   `green-gold` — gold emblem + green wordmark, for ivory/cream surfaces
 */

const LOGO_RATIO = brandAssets.logoRatio

export type LogoVariant = 'white-gold' | 'green-gold'

const sources: Record<LogoVariant, string> = {
  'white-gold': brandAssets.logoWhiteGold,
  'green-gold': brandAssets.logoGreenGold,
}

interface BrandLogoProps {
  variant: LogoVariant
  /** Rendered height in px; width follows the artwork's own ratio. */
  height: number
  alt: string
  className?: string
  priority?: boolean
}

export function BrandLogo({
  variant,
  height,
  alt,
  className,
  priority = false,
}: BrandLogoProps) {
  const width = Math.round(height * LOGO_RATIO * 100) / 100

  return (
    <Image
      src={sources[variant]}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      priority={priority}
      className={cn('object-contain object-left', className)}
      style={{ width, height }}
    />
  )
}

/**
 * The dots-only emblem, used as a small mark and as the footer's watermark.
 * Decorative in both placements, so it carries an empty alt.
 */
export function BrandEmblem({ width, className }: { width: number; className?: string }) {
  const height = Math.round((width / brandAssets.emblemRatio) * 100) / 100

  return (
    <Image
      src={brandAssets.emblemGold}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      unoptimized
      className={cn('object-contain', className)}
      style={{ width, height }}
    />
  )
}
