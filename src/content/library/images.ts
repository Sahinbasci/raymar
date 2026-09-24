import {
  editorialImages,
  rangeProducts,
  walnutProducts,
  type ProductImage,
} from '@/data/products'

/**
 * Photographs for the library pages, taken from the product data rather than
 * re-declared, so a replaced photograph (and its dimensions) changes in one
 * place. Throws at build time if a referenced product has no image — a product
 * page without its product in the hero would be a worse page than no page.
 */
function imageOf(
  products: readonly { id: string; image: ProductImage | null }[],
  id: string,
) {
  const image = products.find((product) => product.id === id)?.image
  if (!image) throw new Error(`Library image: product "${id}" has no photograph`)
  return image
}

export const libraryImages = {
  walnutKernels: editorialImages.corporatePortrait,
  walnutPaleHalves: editorialImages.paleWalnutHalves,
  walnutHalves: imageOf(walnutProducts, 'yarim'),
  walnutQuarters: imageOf(walnutProducts, 'ceyrek'),
  walnutBroken: imageOf(walnutProducts, 'kirik'),
  walnutSmall: imageOf(walnutProducts, 'pirinc'),
  pumpkin: imageOf(rangeProducts, 'kabak-cekirdegi'),
  sunflowerKernels: imageOf(rangeProducts, 'aycekirdegi-ic'),
  sunflowerInShell: imageOf(rangeProducts, 'aycekirdegi-cerezlik'),
  macadamia: imageOf(rangeProducts, 'makademya'),
  pecan: imageOf(rangeProducts, 'pikan'),
  pistachio: imageOf(rangeProducts, 'antep-fistigi'),
} as const
