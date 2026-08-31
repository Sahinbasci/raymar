import type { CountryId } from '@/data/countries'
import type { RangeProductId, WalnutGroupId, WalnutProductId } from '@/data/products'

export type SectionId =
  'ust' | 'giris' | 'hakkimizda' | 'ceviz' | 'urunlerimiz' | 'ticaret' | 'teklif'

export interface NavItem {
  readonly id: SectionId
  readonly label: string
}

export interface LinkItem {
  readonly href: string
  readonly label: string
}

export interface Eyebrow {
  readonly label: string
}

export interface HeaderContent {
  readonly logoAlt: string
  readonly homeAriaLabel: string
  readonly navAriaLabel: string
  readonly mobileNavAriaLabel: string
  readonly openMenu: string
  readonly closeMenu: string
  readonly cta: string
  /** Tooltip shown on the language option that has no approved copy yet. */
  readonly localePending: string
}

export interface HeroContent {
  readonly cueLabel: string
  readonly posterAlt: string
}

export interface StatementContent {
  readonly eyebrow: string
  /** Rendered as separate lines; the design breaks this headline manually. */
  readonly headingLines: readonly string[]
  readonly body: string
  readonly primaryCta: string
  readonly secondaryCta: string
}

/** Which credential mark heads an experience cell. See `ui/icons.tsx`. */
export type ExperienceMark = 'experience' | 'network' | 'partnership'

export interface ExperienceItem {
  readonly mark: ExperienceMark
  readonly label: string
  readonly value: string
  readonly caption: string
}

export interface CorporateIntroContent {
  readonly eyebrow: string
  readonly headingLines: readonly string[]
  /** One `<p>` per paragraph — the client's own "Hakkımızda" copy runs several. */
  readonly body: readonly string[]
  readonly link: string
  readonly imageAlt: string
}

export interface ProductCopy {
  readonly name: string
  readonly imageAlt: string
  /**
   * One or two sentences under the product name. Optional because the client
   * supplies these product by product; a card without one renders the name and
   * the quote link only, exactly as before.
   */
  readonly description?: string
}

export interface WalnutContent {
  readonly eyebrow: string
  readonly heading: string
  /*
   * No `intro` and no `footnote`.
   *
   * The intro paragraph named the same seven grades the cards below are, and
   * the footnote was the "temsili görsel" disclaimer. Both removed at the
   * client's request. `RangeContent` lost its `intro` in the same pass.
   */
  readonly categoryLabel: string
  readonly detailsCta: string
  readonly quoteCta: string
  /**
   * Per-card accessible name for the quote CTA, since every card renders the
   * same visible `quoteCta` label. A template string, not a function, for the
   * same reason as `QuoteContent.prefillTemplate`: it crosses the
   * server/client boundary. `{product}` is substituted by `formatTemplate`.
   */
  readonly quoteCtaAriaTemplate: string
  /** Shown on a grade whose photograph does not exist yet. */
  readonly imagePending: string
  /** Heading per category group, keyed by `WalnutGroupId`. */
  readonly groups: Readonly<Record<WalnutGroupId, string>>
  readonly products: Readonly<Record<WalnutProductId, ProductCopy>>
}

export interface RangeContent {
  readonly eyebrow: string
  readonly heading: string
  /*
   * No `intro` here, unlike `WalnutContent` and `TradeStoryContent`.
   *
   * This section had a paragraph beside its heading listing the same products
   * the grid below already shows, card by card. It was removed at the client's
   * request as duplication — the cards are the list.
   */
  readonly categoryLabel: string
  readonly quoteCta: string
  /** See `WalnutContent.quoteCtaAriaTemplate` — same mechanism, same reason. */
  readonly quoteCtaAriaTemplate: string
  /** Shown on a card whose product has no photograph yet. */
  readonly imagePending: string
  readonly products: Readonly<Record<RangeProductId, ProductCopy>>
}

export interface TradeStoryContent {
  readonly eyebrow: string
  readonly heading: string
  readonly intro: string
  readonly pillars: readonly string[]
  readonly closingLead: string
  readonly cta: string
}

export interface QuoteFieldCopy {
  readonly label: string
  readonly placeholder?: string
}

export interface QuoteContent {
  readonly eyebrow: string
  readonly heading: string
  readonly body: string
  readonly addressLabel: string
  readonly addressLines: readonly string[]
  readonly phoneLabel: string
  readonly phoneValue: string
  readonly emailLabel: string
  readonly emailValue: string
  readonly fields: {
    readonly name: QuoteFieldCopy
    readonly company: QuoteFieldCopy
    readonly country: QuoteFieldCopy
    readonly email: QuoteFieldCopy
    readonly phone: QuoteFieldCopy
    readonly product: QuoteFieldCopy
    readonly message: QuoteFieldCopy
  }
  readonly productPlaceholder: string
  readonly productOptions: readonly string[]
  readonly otherProductOption: string
  readonly countryPlaceholder: string
  /** Turkish display name per country, keyed by the ISO id in `data/countries.ts`. */
  readonly countryOptions: Readonly<Record<CountryId, string>>
  /** Label above the embedded map, styled like `addressLabel`. */
  readonly mapLabel: string
  /** Accessible title on the map `<iframe>`. */
  readonly mapTitle: string
  /**
   * What the map is asked to find — the postal address ONLY, never the company
   * name.
   *
   * Kept separate from `addressLines` rather than derived from it. Feeding the
   * joined address lines to Google put the legal name at the front of the
   * query, and Maps resolved it against a business listing for a similarly
   * named but unrelated company nearby — so the contact section pinned the
   * wrong building. Geocoding the street address alone lands on the actual
   * premises.
   */
  readonly mapQuery: string
  readonly consentText: string
  /** Links to the legal pages the consent statement refers to, e.g. KVKK and privacy. */
  readonly consentLinks: readonly LinkItem[]
  readonly submit: string
  readonly requiredNote: string
  readonly errorGeneric: string
  readonly errorConsent: string
  /** Attached to an empty required field via `aria-describedby`. */
  readonly errorFieldRequired: string
  /** Attached to a malformed e-mail field via `aria-describedby`. */
  readonly errorFieldEmail: string
  readonly errorSubmit: string
  readonly submitting: string
  readonly successHeading: string
  readonly successBody: string
  readonly summaryLabel: string
  readonly resetCta: string
  readonly emptyValue: string
  /**
   * Prefill written into the message box when a product CTA is used.
   * A template string, not a function — the dictionary crosses the
   * server/client boundary and must stay serialisable. `{product}` is
   * substituted by `formatTemplate`.
   */
  readonly prefillTemplate: string
}

export interface NotFoundContent {
  readonly code: string
  readonly heading: string
  readonly cta: string
  readonly metaTitle: string
}

export interface FooterColumn {
  readonly heading: string
  readonly links: readonly LinkItem[]
}

/** One clause of a legal page — a heading, its prose, and an optional list. */
export interface LegalSection {
  readonly heading: string
  readonly paragraphs: readonly string[]
  /** Rendered as an unordered list under the paragraphs, when present. */
  readonly list?: readonly string[]
}

export interface LegalPageContent {
  readonly metaTitle: string
  readonly metaDescription: string
  /** Small caption above the title, e.g. "Yasal". */
  readonly eyebrow: string
  /** Prefixes the rendered revision date, e.g. "Son güncelleme". */
  readonly lastUpdatedLabel: string
  /** The page's one `<h1>`. */
  readonly heading: string
  /** ISO date (YYYY-MM-DD); the page renders it localised. */
  readonly lastUpdated: string
  readonly intro: readonly string[]
  readonly sections: readonly LegalSection[]
}

export interface LegalContent {
  readonly kvkk: LegalPageContent
  readonly gizlilik: LegalPageContent
  readonly cerez: LegalPageContent
}

export interface FooterContent {
  readonly logoAlt: string
  readonly blurb: string
  readonly tagline: string
  readonly corporate: FooterColumn
  readonly products: FooterColumn
  readonly contactHeading: string
  readonly addressLines: readonly string[]
  readonly phoneValue: string
  readonly emailValue: string
  readonly copyright: string
  readonly legalLinks: readonly LinkItem[]
}

export interface Dictionary {
  readonly nav: readonly NavItem[]
  readonly header: HeaderContent
  readonly hero: HeroContent
  readonly statement: StatementContent
  readonly experience: readonly ExperienceItem[]
  readonly corporateIntro: CorporateIntroContent
  readonly walnut: WalnutContent
  readonly range: RangeContent
  readonly tradeStory: TradeStoryContent
  readonly quote: QuoteContent
  readonly notFound: NotFoundContent
  readonly footer: FooterContent
  readonly legal: LegalContent
  readonly meta: {
    readonly siteName: string
    readonly title: string
    readonly titleTemplate: string
    readonly description: string
    readonly skipToContent: string
  }
}
