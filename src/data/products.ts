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

/**
 * Four grades, in display order.
 *
 * Reduced from seven at the client's request, and the client's four are all
 * SIZE grades rather than the colour grades this section used to lead with.
 * That makes the order self-evident and it is deliberately kept: largest piece
 * to smallest, halves through quarters and broken down to rice. A buyer
 * scanning the row reads the grading ladder itself, left to right.
 */
export const walnutProductIds = ['yarim', 'ceyrek', 'kirik', 'pirinc'] as const

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
 * varieties, so it keeps its own section, immediately below this one. Everything
 * else is one product, one card, and they live together under "Ürünlerimiz" —
 * the range is not split by origin, because pistachio is Turkish and the old
 * "imported" heading was simply wrong for it.
 *
 * Ordering is a client decision, not alphabetical or by any other system:
 * macadamia, pecan, pumpkin seed, sunflower (kernel, then in-shell), then
 * pistachio at the end. Hazelnut was dropped from the range entirely at the
 * client's request.
 */
export const rangeProductIds = [
  'makademya',
  'pikan',
  'kabak-cekirdegi',
  'aycekirdegi-ic',
  'aycekirdegi-cerezlik',
  'antep-fistigi',
] as const

export type RangeProductId = (typeof rangeProductIds)[number]

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
  /** Reveal stagger in ms, transcribed from `data-delay` in the design. */
  readonly revealDelay: number
}

export const walnutProducts: readonly WalnutProduct[] = [
  {
    // Raymar's own photograph of the actual grade, supplied 2026-08-31 —
    // the first product image on the site that is not stock.
    id: 'yarim',
    group: 'ceviz-ici',
    image: { src: '/images/walnut-halves.jpg', width: 945, height: 1181 },
    revealDelay: 0,
  },
  {
    // Raymar's own photograph, supplied 2026-08-31.
    id: 'ceyrek',
    group: 'ceviz-ici',
    image: { src: '/images/walnut-quarter.jpg', width: 648, height: 810 },
    revealDelay: 70,
  },
  {
    // Raymar's own photograph, supplied 2026-08-31. Cropped to the product
    // itself: the frame as shot showed the carton and its liner across the top
    // half, which read as a warehouse snapshot rather than a product card.
    id: 'kirik',
    group: 'ceviz-ici',
    image: { src: '/images/walnut-broken.jpg', width: 1060, height: 670 },
    revealDelay: 140,
  },
  {
    // Raymar's own photograph. Replaces the CC BY-SA stock frame that was
    // dropped on 2026-08-29 rather than carry a photographer credit on the
    // storefront — the own-shoot it was waiting for. See docs/ASSET_AUDIT.md.
    id: 'pirinc',
    group: 'ceviz-ici',
    image: { src: '/images/walnut-rice.jpg', width: 1280, height: 960 },
    revealDelay: 210,
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
 * Six products fill both grids exactly — three rows of two, or two rows of
 * three — so no card is ever stranded on a row of its own and none needs a
 * wider span.
 */
export const rangeProducts: readonly RangeProduct[] = [
  {
    id: 'makademya',
    image: {
      src: '/images/macadamia-white.jpg',
      width: 900,
      height: 600,
      objectPosition: '46% 50%',
    },
    revealDelay: 0,
  },
  {
    /*
     * Pexels, photo 39173140 — Pexels License: commercial use permitted, no
     * attribution required, so no credit line has to appear on the page. That
     * requirement is what ruled out the Wikimedia candidates: the only
     * usable ones there are CC BY-SA, which obliges a visible credit, and a
     * photo-credit line under a product card on a corporate site was rejected.
     *
     * Graded to sit with its siblings rather than used as downloaded: the
     * original is markedly hotter than this palette, so saturation is pulled
     * to 0.92 and gamma lifted slightly. 3:2 landscape, the same shape as the
     * macadamia and pistachio cards.
     *
     * Still stock, not Raymar's own photography — replace it the moment the
     * client supplies a real one, exactly as `walnut-quarter` and
     * `walnut-broken` were replaced.
     */
    id: 'pikan',
    image: { src: '/images/pecan.jpg', width: 1600, height: 1065 },
    revealDelay: 50,
  },
  {
    id: 'kabak-cekirdegi',
    // Raymar's own photograph, replacing the stock frame. No `objectPosition`:
    // the old crop was tuned to the stock image's subject placement, and this
    // one is an evenly filled field where a centred crop is correct.
    image: { src: '/images/pumpkin-kernel.jpg', width: 945, height: 1181 },
    revealDelay: 100,
  },
  {
    id: 'aycekirdegi-ic',
    image: {
      src: '/images/sunflower-kernel.jpg',
      width: 933,
      height: 1400,
      objectPosition: '50% 60%',
    },
    revealDelay: 150,
  },
  {
    id: 'aycekirdegi-cerezlik',
    image: { src: '/images/sunflower-inshell.jpg', width: 1400, height: 933 },
    revealDelay: 200,
  },
  {
    id: 'antep-fistigi',
    image: { src: '/images/pistachio-kernel.jpg', width: 1400, height: 934 },
    revealDelay: 250,
  },
]

/**
 * Corporate-intro circular portrait.
 *
 * Walnut, not hazelnut. This was a hazelnut macro until hazelnut was dropped
 * from the range entirely — an editorial portrait of a nut the company no
 * longer lists is a quiet contradiction on the one section that introduces the
 * company. Walnut is now the lead product, and this frame is free because the
 * grade reduction released it. A dense full-bleed field of kernels also reads
 * better inside a circular mask than a subject with an obvious centre, which
 * the crop would cut.
 */
export const editorialImages = {
  corporatePortrait: {
    src: '/images/walnut-natural.jpg',
    width: 1800,
    height: 1201,
    objectPosition: '50% 45%',
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
   * Portrait, lightweight mobile cut (~784 KB, vs. 1.73 MB for the desktop
   * clip below) — produced to the spec in docs/HERO_VIDEO_SPEC.md. Typed as
   * nullable rather than required: if a future cut is ever pulled, `null`
   * makes the hero fall back to showing the poster only on phones rather than
   * requesting a missing file.
   */
  videoMobile: '/video/raymar-hero-mobile.mp4' as string | null,
  poster: '/images/hero-poster.jpg',
  posterWidth: 1600,
  posterHeight: 900,
  /**
   * Portrait poster for phones, cut from the mobile clip's FIRST frame so the
   * poster→video hand-off is seamless. It also carries the reduced-motion and
   * Data-Saver fallback on mobile, where the 16:9 poster would crop badly.
   */
  posterMobile: '/images/hero-poster-mobile.jpg',
  posterMobileWidth: 720,
  posterMobileHeight: 1280,
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
