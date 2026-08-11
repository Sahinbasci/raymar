/**
 * Product and media structure.
 *
 * Locale-independent: image paths, crops and card geometry live here; every
 * human-readable string lives in `src/content/<locale>.ts` keyed by the ids
 * below. Crops (`objectPosition`) and intrinsic sizes are transcribed verbatim
 * from the approved design and must not be changed without a design decision.
 */

export interface ProductImage {
  readonly src: string
  readonly width: number
  readonly height: number
  /** CSS `object-position`; omitted where the design used the default centre. */
  readonly objectPosition?: string
}

export const walnutProductIds = [
  'bal-rengi',
  'kizil',
  'pirinc',
  'kirik',
  'super-luks-yarim-beyaz',
  'luks-naturel',
  'ceyrek',
] as const

export type WalnutProductId = (typeof walnutProductIds)[number]

/**
 * Category groups within the walnut family.
 *
 * The approved design presents all seven products under the single label the
 * client supplied ("Ceviz İçi"), so exactly one group exists today. The section
 * renders one headed block per entry here, in order, so introducing further
 * groups is a data edit: add an id, add its heading to every locale's
 * `walnut.groups`, and set `group` on the products that belong to it.
 *
 * Group names are commercial classification and must come from Raymar — none
 * are invented here.
 */
export const walnutGroupIds = ['ceviz-ici'] as const

export type WalnutGroupId = (typeof walnutGroupIds)[number]

/**
 * The single-variety range, in display order.
 *
 * Walnut is deliberately absent: it is the one product sold as graded
 * varieties, so it keeps its own section. Everything else is one product, one
 * card, and they live together under "Ürünlerimiz" — the range is not split by
 * origin, because hazelnut and pistachio are Turkish and the old "imported"
 * heading was simply wrong for them.
 */
export const rangeProductIds = [
  'findik',
  'antep-fistigi',
  'kabak-cekirdegi',
  'aycekirdegi-ic',
  'aycekirdegi-cerezlik',
  'makademya',
] as const

export type RangeProductId = (typeof rangeProductIds)[number]

export const portfolioCardIds = [
  'findik',
  'ceviz',
  'antep-fistigi',
  'kabak-cekirdegi',
  'makademya',
  'aycekirdegi',
] as const

export type PortfolioCardId = (typeof portfolioCardIds)[number]

export interface WalnutProduct {
  readonly id: WalnutProductId
  readonly group: WalnutGroupId
  /**
   * `null` where no photograph depicts this grade.
   *
   * Grade differentiation is the entire commercial point of this section: a
   * buyer has to be able to tell Bal Rengi from Kızıl at a glance. Free stock
   * has no reddish-kernel, rice-grade or quarter-grade photograph — every
   * candidate was an ordinary golden kernel, so shipping one would assert a
   * grade the picture does not show. An honest placeholder is the lesser
   * failure until the seven grades are shot together.
   */
  readonly image: ProductImage | null
  /** The design gives the lead card a wider span and a taller image well. */
  readonly featured: boolean
  /** Reveal stagger in ms, transcribed from `data-delay` in the design. */
  readonly revealDelay: number
}

export const walnutProducts: readonly WalnutProduct[] = [
  {
    id: 'bal-rengi',
    group: 'ceviz-ici',
    image: { src: '/images/walnut-honey.jpg', width: 1800, height: 1200 },
    featured: true,
    revealDelay: 0,
  },
  {
    id: 'kizil',
    group: 'ceviz-ici',
    image: null,
    featured: false,
    revealDelay: 70,
  },
  {
    id: 'pirinc',
    group: 'ceviz-ici',
    image: null,
    featured: false,
    revealDelay: 110,
  },
  {
    id: 'kirik',
    group: 'ceviz-ici',
    image: { src: '/images/walnut-broken.jpg', width: 1280, height: 853 },
    featured: false,
    revealDelay: 150,
  },
  {
    // Judged on how each photograph reads *cropped into the card*, not on how
    // the full frame looks: `walnut-natural` is the lighter of the two at full
    // size, but its card crop lands on a dense shadowed patch and renders as
    // the darkest tile in the grid — the exact opposite of what "yarım beyaz"
    // claims. The paler-reading crop takes the paler grade.
    id: 'super-luks-yarim-beyaz',
    group: 'ceviz-ici',
    image: {
      src: '/images/walnut-halves-pale.jpg',
      width: 1280,
      height: 848,
      objectPosition: '50% 40%',
    },
    featured: false,
    revealDelay: 190,
  },
  {
    id: 'luks-naturel',
    group: 'ceviz-ici',
    image: {
      src: '/images/walnut-natural.jpg',
      width: 1800,
      height: 1201,
      objectPosition: '50% 30%',
    },
    featured: false,
    revealDelay: 230,
  },
  {
    id: 'ceyrek',
    group: 'ceviz-ici',
    image: { src: '/images/walnut-quarter.jpg', width: 1800, height: 1350 },
    featured: false,
    revealDelay: 270,
  },
]

export interface RangeProduct {
  readonly id: RangeProductId
  /**
   * `null` while no photograph of the product exists. The card then renders its
   * own tan bed instead of borrowing a picture of a different nut — a wrong
   * photograph on a trading site is worse than an honest empty frame.
   */
  readonly image: ProductImage | null
  readonly revealDelay: number
}

/**
 * Six products divide evenly into both the two-up and the three-up grid, so
 * every row fills and no card is ever stranded on a row of its own. That is why
 * none of them is given a wider span: the count already resolves the layout.
 */
export const rangeProducts: readonly RangeProduct[] = [
  {
    id: 'findik',
    image: { src: '/images/hazelnut-inshell.jpg', width: 1400, height: 933 },
    revealDelay: 0,
  },
  {
    id: 'antep-fistigi',
    image: { src: '/images/pistachio-kernel.jpg', width: 1400, height: 934 },
    revealDelay: 90,
  },
  {
    id: 'kabak-cekirdegi',
    image: {
      src: '/images/pumpkin-kernel.jpg',
      width: 933,
      height: 1400,
      objectPosition: '50% 45%',
    },
    revealDelay: 140,
  },
  {
    id: 'aycekirdegi-ic',
    image: {
      src: '/images/sunflower-kernel.jpg',
      width: 933,
      height: 1400,
      objectPosition: '50% 60%',
    },
    revealDelay: 190,
  },
  {
    id: 'aycekirdegi-cerezlik',
    image: { src: '/images/sunflower-inshell.jpg', width: 1400, height: 933 },
    revealDelay: 240,
  },
  {
    id: 'makademya',
    image: {
      src: '/images/macadamia-white.jpg',
      width: 900,
      height: 600,
      objectPosition: '46% 50%',
    },
    revealDelay: 290,
  },
]

export interface PortfolioCard {
  readonly id: PortfolioCardId
  readonly href: string
  /** `null` until the product has a photograph. See `RangeProduct.image`. */
  readonly image: ProductImage | null
  readonly revealDelay: number
}

/**
 * The hero tile of the portfolio mosaic.
 *
 * Points at the range section, not at `#urunler` — that was the section the
 * tile itself sits in, so the largest card on the page scrolled the reader back
 * to where they already were.
 */
export const portfolioLead: PortfolioCard = {
  id: 'findik',
  href: '#urunlerimiz',
  image: { src: '/images/hazelnut-inshell.jpg', width: 1400, height: 933 },
  revealDelay: 0,
}

/**
 * The tall secondary tile beside the lead.
 *
 * Was `walnut-bulk.jpg` — a dark mixed lot with broken and blackened pieces,
 * which is a poor shop window for the whole walnut category. The pale graded
 * kernel field reads as merchandise instead.
 */
export const portfolioSecondary: PortfolioCard = {
  id: 'ceviz',
  href: '#ceviz',
  image: { src: '/images/walnut-natural.jpg', width: 1800, height: 1201 },
  revealDelay: 90,
}

/** The 2x2 block of compact tiles beneath the secondary tile. */
export const portfolioTiles: readonly PortfolioCard[] = [
  {
    // The in-shell cut here, the kernel cut on the range card, so the two
    // sections never show the reader the same photograph twice.
    id: 'antep-fistigi',
    href: '#urunlerimiz',
    image: { src: '/images/pistachio-inshell.jpg', width: 931, height: 1400 },
    revealDelay: 140,
  },
  {
    id: 'kabak-cekirdegi',
    href: '#urunlerimiz',
    image: {
      src: '/images/pumpkin-kernel.jpg',
      width: 933,
      height: 1400,
      objectPosition: '50% 45%',
    },
    revealDelay: 180,
  },
  {
    id: 'makademya',
    href: '#urunlerimiz',
    image: { src: '/images/macadamia-white.jpg', width: 900, height: 600 },
    revealDelay: 220,
  },
  {
    id: 'aycekirdegi',
    href: '#urunlerimiz',
    image: {
      src: '/images/sunflower-kernel.jpg',
      width: 933,
      height: 1400,
      objectPosition: '50% 60%',
    },
    revealDelay: 260,
  },
]

/**
 * Corporate-intro circular portrait.
 *
 * Blanched kernels on a warm putty seamless: the roundness of the nuts and the
 * cream ground both sit well inside the circular mask, and it is the only
 * hazelnut frame in the library that is not already carrying a product card.
 * The flagship section's two images left with the section itself.
 */
export const editorialImages = {
  corporatePortrait: {
    src: '/images/hazelnut-kernel.jpg',
    width: 1400,
    height: 933,
    objectPosition: '50% 55%',
  },
} satisfies Record<string, ProductImage>

/**
 * Full-bleed band that closes the footer.
 *
 * A dense bulk field was the wrong instinct here. Cropped to roughly 4:1 and
 * run the full width of the page, a mass of loose walnut kernels read as busy
 * noise rather than as product — there was no subject for the eye to land on.
 * This frame is the opposite: shallow depth of field, one pistachio sharp in
 * the foreground with its kernel showing, everything behind it falling into
 * warm bokeh. It also happens to sit exactly on the brand palette, gold through
 * cream with the green of the kernel.
 *
 * `objectPosition` has to account for the mask, not just the crop. The parabola
 * hides the upper half of the band through the centre, so the only part visible
 * where the eye actually lands is the BOTTOM of the crop window. Centring the
 * sharp nut in the window therefore hides it; the value is pulled up until that
 * nut sits low in the window and so lands inside the visible strip.
 *
 * The source has to be genuinely wide because the band spans the viewport: an
 * early version used a 900px file stretched past 1900px and the upscale was
 * plain to see.
 */
export const footerBand = {
  src: '/images/pistachio-band-bulk.jpg',
  width: 3200,
  height: 2400,
  objectPosition: '50% 52%',
} satisfies ProductImage

export const heroMedia = {
  /** Desktop cut — the approved 16:9 clip, byte-for-byte. */
  video: '/video/raymar-hero.mp4',
  /**
   * Portrait, lightweight mobile cut. `null` until it is produced, and while it
   * is null the hero shows the poster only on phones — no video is downloaded,
   * which saves ~1.7 MB of cellular data per visit. Drop the file in and set the
   * path here to switch it on. See docs/HERO_VIDEO_SPEC.md for the exact
   * production spec.
   */
  videoMobile: null as string | null,
  poster: '/images/hero-poster.jpg',
  posterWidth: 1600,
  posterHeight: 900,
  /** Source runtime in seconds; the design loops the clip continuously. */
  durationSeconds: 8,
} as const

export const brandAssets = {
  logoWhiteGold: '/brand/raymar-logo-white-gold.svg',
  logoGreenGold: '/brand/raymar-logo-green-gold.svg',
  emblemGold: '/brand/raymar-emblem-gold.svg',
  /** Intrinsic ratios of the official artwork — never distort these. */
  logoRatio: 184.55231 / 68.514709,
  emblemRatio: 62 / 68.514709,
} as const
