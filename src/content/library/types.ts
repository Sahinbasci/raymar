import type { ProductImage } from '@/data/products'

/**
 * Long-form pages: one page per product line, and a set of guides.
 *
 * These live apart from the homepage dictionaries (`src/content/tr.ts`,
 * `en.ts`) on purpose. The dictionaries are UI copy, read in one piece by every
 * page; these are documents, each read by exactly one route. Folding forty
 * articles into the dictionaries would ship every word of them into every
 * page's server render for no reason.
 *
 * Ids are locale-independent and pair a page with its translation. Slugs are
 * per locale, because a buyer searching in English should see
 * `/en/products/walnut-kernels`, not `/en/urunler/ceviz-ici`.
 */

export type ProductPageId =
  | 'walnut-kernels'
  | 'walnut-halves'
  | 'walnut-quarters'
  | 'walnut-pieces'
  | 'walnut-small-pieces'
  | 'pumpkin-seed-kernels'
  | 'sunflower-kernels'
  | 'in-shell-sunflower-seeds'
  | 'macadamia'
  | 'pecans'
  | 'pistachios'

export type GuideId =
  | 'walnut-kernel-grades'
  | 'walnut-colour-grades'
  | 'storing-walnut-kernels'
  | 'walnut-kernel-defects'
  | 'walnut-harvest-season'
  | 'pecan-vs-walnut'
  | 'what-is-macadamia'
  | 'macadamia-kernel-styles'
  | 'aflatoxin-in-nuts'
  | 'buying-nuts-wholesale'
  | 'nut-export-documents'

export type LibraryKind = 'products' | 'guides'

/** One headed block of prose. `id` makes the heading linkable. */
export interface LibrarySection {
  /** Anchor id — only where something links to this heading directly. */
  readonly id?: string
  readonly heading: string
  readonly paragraphs: readonly string[]
  readonly list?: readonly string[]
}

export interface FaqEntry {
  readonly question: string
  readonly answer: string
}

/**
 * A published source the page's facts rest on: a standard, a regulation, an
 * encyclopedia entry. Listed under the page as its references and emitted as
 * `citation` in its structured data. Only sources that were opened and read
 * are listed, and every factual statement on the page traces to one of them —
 * the site states nothing about a product that it cannot point to.
 */
export interface SourceReference {
  /** As the source titles itself. */
  readonly title: string
  /** Who publishes it: a standards body, a regulator, an encyclopedia. */
  readonly publisher: string
  readonly url: string
  /** The source's language, so a Turkish reader knows an English one is English. */
  readonly lang: 'tr' | 'en'
}

interface LibraryDocument {
  readonly slug: string
  /** `<title>` before the site-wide `| Raymar Nuts` suffix. Keep it under ~46 chars. */
  readonly metaTitle: string
  /**
   * 70–170 characters: what the page answers, in the searcher's words. Also the
   * excerpt on index cards and in `llms.txt`.
   */
  readonly metaDescription: string
  readonly eyebrow: string
  /** The page's one `<h1>`. */
  readonly heading: string
  /** The opening paragraph, under the `<h1>`. */
  readonly lead: string
  readonly sections: readonly LibrarySection[]
  /**
   * Rendered on the page AND emitted as FAQPage markup. Markup without the
   * visible questions would be structured data describing content the page
   * does not have, which search engines treat as spam.
   */
  readonly faq: readonly FaqEntry[]
  /** The page's references. See `SourceReference`. */
  readonly sources: readonly SourceReference[]
  readonly image: ProductImage
  readonly imageAlt: string
}

export interface ProductPage extends LibraryDocument {
  readonly id: ProductPageId
  /** Card title on the index and in related links, e.g. "Ceviz İçi". */
  readonly name: string
  /**
   * The product line a page belongs to, for the walnut sizes: each size has a
   * page of its own under `walnut-kernels`. Sub-pages sit one level deeper in
   * the breadcrumb and are listed on their parent rather than on the index.
   */
  readonly parent?: ProductPageId | undefined
  /** Heading over the sub-page cards, on a page that has sub-pages. */
  readonly childrenHeading?: string | undefined
  readonly relatedGuides: readonly GuideId[]
}

export interface GuidePage extends LibraryDocument {
  readonly id: GuideId
  /** ISO date. */
  readonly published: string
  /** ISO date. Equal to `published` until the text actually changes. */
  readonly updated: string
  readonly relatedProducts: readonly ProductPageId[]
}
