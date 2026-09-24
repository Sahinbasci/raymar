import Image from 'next/image'
import type { ProductImage } from '@/data/products'
import { cn } from '@/lib/cn'

interface MediaFrameProps {
  image: ProductImage
  alt: string
  /** Responsive `sizes`; required so the srcset matches the real layout width. */
  sizes: string
  /** Adds the 1.04 scale-up the design applies when the parent card is hovered. */
  hoverZoom?: boolean
  priority?: boolean
  className?: string
}

/**
 * A cover-cropped image that fills its positioned parent.
 *
 * The parent supplies the box (and therefore the aspect ratio), which keeps the
 * design's intentional crops intact and prevents layout shift. `objectPosition`
 * is carried through from the product data so each focal point is preserved.
 */
export function MediaFrame({
  image,
  alt,
  sizes,
  hoverZoom = false,
  priority = false,
  className,
}: MediaFrameProps) {
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      // `priority` on `next/image` is deprecated in Next 16; its documented
      // replacement for an above-the-fold image is eager loading at high
      // fetch priority — the same pair the hero poster uses.
      loading={priority ? 'eager' : 'lazy'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={cn(
        'object-cover',
        hoverZoom &&
          'transition-transform duration-[1100ms] ease-[var(--ease-raymar)] group-focus-within:scale-[1.04] group-hover:scale-[1.04]',
        className,
      )}
      style={image.objectPosition ? { objectPosition: image.objectPosition } : undefined}
    />
  )
}
