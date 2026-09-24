import staticImageLoader from '../../image-loader'
import type { ProductImage } from '@/data/products'

/** The rung every published reference to a photograph uses — see below. */
const PUBLISHED_WIDTH = 1280

/**
 * The file a crawler is pointed at for a photograph, with its real dimensions.
 *
 * Structured data, Open Graph tags and the sitemap all name one published copy
 * of each photograph rather than the original under `/images/`, which the
 * static export does not deploy. 1280 is the rung: comfortably above the 1200px
 * Google asks of a large image preview, and a size real visitors are already
 * served.
 *
 * The dimensions are computed, not assumed. `scripts/optimize-images.mjs` never
 * upscales, so a 648px source requested at 1280 is written to the 1280 filename
 * at 648px — declaring `og:image:width` 1280 for that file would state a size
 * the file does not have. Sharp keeps the aspect ratio and rounds the height,
 * which is what this repeats.
 */
export function imageVariant(image: ProductImage) {
  const width = Math.min(PUBLISHED_WIDTH, image.width)
  return {
    url: staticImageLoader({ src: image.src, width: PUBLISHED_WIDTH }),
    width,
    height: Math.round((image.height * width) / image.width),
  }
}
