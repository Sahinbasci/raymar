import { rangeProducts, walnutProductPage, walnutProducts } from '@/data/products'
import { defaultLocale, locales, type Locale } from '@/lib/i18n'
import { guidesEn } from './guides.en'
import { guidesTr } from './guides.tr'
import { productsEn } from './products.en'
import { productsTr } from './products.tr'
import type { GuidePage, ProductPage, ProductPageId } from './types'
import { walnutSizesEn } from './walnut-sizes.en'
import { walnutSizesTr } from './walnut-sizes.tr'

/*
 * Product pages are listed in the homepage's order — the range in the client's
 * sequence, then walnut, then the walnut sizes largest to smallest — wherever
 * they are listed: the index page, the footer, the sitemap. Derived from the
 * homepage data rather than restated, so the two cannot be reordered
 * independently.
 */
const PRODUCT_ORDER: readonly ProductPageId[] = [
  ...rangeProducts.map((product) => product.page),
  walnutProductPage,
  ...walnutProducts.map((product) => product.page),
]

const byHomepageOrder = (pages: readonly ProductPage[]) =>
  [...pages].sort((a, b) => PRODUCT_ORDER.indexOf(a.id) - PRODUCT_ORDER.indexOf(b.id))

const PRODUCTS: Record<Locale, readonly ProductPage[]> = {
  tr: byHomepageOrder([...productsTr, ...walnutSizesTr]),
  en: byHomepageOrder([...productsEn, ...walnutSizesEn]),
}
const GUIDES: Record<Locale, readonly GuidePage[]> = { tr: guidesTr, en: guidesEn }

/*
 * Checked at module load, which for a static export means at build time: a
 * page present in one locale and missing from the other, a duplicated slug, or
 * a related link to an id that does not exist would otherwise ship as an
 * hreflang pointing at a 404, two pages fighting over one URL, or a dead link.
 * Each of those is silent in the browser and only shows up months later in a
 * search console report, so the build refuses instead.
 */
function assertConsistent() {
  const idsOf = (pages: readonly { id: string }[]) =>
    pages
      .map((page) => page.id)
      .sort()
      .join(',')

  for (const [label, byLocale] of [
    ['products', PRODUCTS],
    ['guides', GUIDES],
  ] as const) {
    const reference = idsOf(byLocale[defaultLocale])
    for (const locale of locales) {
      const pages: readonly { id: string; slug: string }[] = byLocale[locale]
      if (idsOf(pages) !== reference) {
        throw new Error(
          `Library ${label}: locale "${locale}" does not have the same pages as "${defaultLocale}"`,
        )
      }
      const slugs = pages.map((page) => page.slug)
      const duplicate = slugs.find((slug, index) => slugs.indexOf(slug) !== index)
      if (duplicate) {
        throw new Error(`Library ${label}: duplicate slug "${duplicate}" in "${locale}"`)
      }
    }
  }

  const productIds = new Set(PRODUCTS[defaultLocale].map((page) => page.id))
  const guideIds = new Set(GUIDES[defaultLocale].map((page) => page.id))

  // Every page reachable from the homepage, and every homepage card reaching a page.
  const ordered = new Set(PRODUCT_ORDER)
  if (ordered.size !== PRODUCT_ORDER.length || ordered.size !== productIds.size) {
    throw new Error(
      'Library products: the homepage cards and the product pages do not match one to one',
    )
  }

  // One level of nesting, under a page that exists: the breadcrumb, the index
  // and the parent's card grid all assume it.
  for (const locale of locales) {
    for (const page of PRODUCTS[locale]) {
      if (!page.parent) continue
      const parent = PRODUCTS[locale].find((candidate) => candidate.id === page.parent)
      if (!parent || parent.parent) {
        throw new Error(`Product "${page.id}" has an invalid parent "${page.parent}"`)
      }
    }
  }
  for (const product of walnutProducts) {
    const page = PRODUCTS[defaultLocale].find(
      (candidate) => candidate.id === product.page,
    )
    if (page?.parent !== walnutProductPage) {
      throw new Error(`Walnut card "${product.id}" must link to a size page under walnut`)
    }
  }
  for (const id of PRODUCT_ORDER) {
    if (!productIds.has(id)) {
      throw new Error(`Homepage links to unknown product page "${id}"`)
    }
  }
  /*
   * Every page carries its references: at least three, each a real https
   * address, none repeated. The build fails rather than publish a page whose
   * statements rest on nothing listed — the rule the client set for the
   * content ("asla sallamasyon bilgi olmamalı").
   */
  for (const locale of locales) {
    for (const page of [...PRODUCTS[locale], ...GUIDES[locale]]) {
      if (page.sources.length < 3) {
        throw new Error(`"${page.id}" (${locale}) lists fewer than three sources`)
      }
      const urls = page.sources.map((source) => source.url)
      for (const url of urls) {
        if (!/^https:\/\/[^\s/]+\.[^\s]+$/.test(url)) {
          throw new Error(`"${page.id}" (${locale}) has a malformed source URL: ${url}`)
        }
        if (url.includes('raymarnuts.com')) {
          throw new Error(`"${page.id}" (${locale}) cites itself: ${url}`)
        }
      }
      if (new Set(urls).size !== urls.length) {
        throw new Error(`"${page.id}" (${locale}) lists a source twice`)
      }
    }
  }

  for (const locale of locales) {
    for (const page of PRODUCTS[locale]) {
      for (const id of page.relatedGuides) {
        if (!guideIds.has(id)) {
          throw new Error(`Product "${page.id}" links to unknown guide "${id}"`)
        }
      }
    }
    for (const page of GUIDES[locale]) {
      for (const id of page.relatedProducts) {
        if (!productIds.has(id)) {
          throw new Error(`Guide "${page.id}" links to unknown product "${id}"`)
        }
      }
    }
  }
}

assertConsistent()

/** Every product page, sub-pages included. */
export function productPages(locale: Locale): readonly ProductPage[] {
  return PRODUCTS[locale]
}

/** The product lines — what the index and the footer list. */
export function topLevelProductPages(locale: Locale): readonly ProductPage[] {
  return PRODUCTS[locale].filter((page) => !page.parent)
}

export function subPages(locale: Locale, parent: ProductPageId): readonly ProductPage[] {
  return PRODUCTS[locale].filter((page) => page.parent === parent)
}

export function guidePages(locale: Locale): readonly GuidePage[] {
  return GUIDES[locale]
}
