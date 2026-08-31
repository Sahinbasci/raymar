import { countries } from '@/data/countries'
import { legalPath } from '@/lib/legal'
import type { Dictionary } from '@/types/content'

/**
 * English locale.
 *
 * This is a translation of the approved Turkish copy in `tr.ts`, not a second
 * authored text: the structure, the ordering and the claims are the same, and a
 * change on one side belongs on the other. Where a phrase carries a meaning
 * that does not survive word-for-word — the walnut grades especially — the
 * English trade term is used rather than a literal rendering, because the
 * audience for this page is an importer reading a spec, not a Turkish speaker
 * reading English.
 *
 * Three things are deliberately NOT translated:
 *
 *   - The slogan. "Tane Tane Lezzetler" is a brand asset set out in the
 *     identity manual (always quoted, italic, gold); inventing an English
 *     slogan for a company is a branding decision, not a translation one.
 *   - The legal entity name, the address and the registry identifiers. These
 *     are what they are on the trade register.
 *   - The legal documents' URL slugs. `/en/kvkk-aydinlatma-metni` reads oddly,
 *     but the slugs name real route folders shared by both locales, and the
 *     Turkish URLs are the ones already indexed. Changing them is a routing
 *     change, not a copy change.
 *
 * The legal documents are translations for convenience. They describe
 * obligations under Turkish law (KVKK, TTK) and the Turkish text remains the
 * operative one — each English document says so in its own opening paragraph
 * rather than leaving a reader to assume otherwise.
 */

/**
 * English display name per country id, generated from the ISO 3166-1 alpha-2
 * codes in `src/data/countries.ts` rather than hand-typed — 196 names typed by
 * hand is 196 chances to misspell one, and the canonical English name of a
 * country is not a thing this project should have an opinion about.
 *
 * Turkey is the one deliberate override: `Türkiye` is the name the country
 * itself registered with the UN in 2022 and the one the client trades under,
 * and it is also what the Turkish list says, so the two locales agree.
 */
const countryNames: Record<string, string> = {
  TR: 'Türkiye',
  AF: 'Afghanistan',
  AL: 'Albania',
  DZ: 'Algeria',
  AD: 'Andorra',
  AO: 'Angola',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BR: 'Brazil',
  BN: 'Brunei',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Republic of the Congo',
  CD: 'Democratic Republic of the Congo',
  CR: 'Costa Rica',
  CI: 'Ivory Coast',
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czechia',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  SZ: 'Eswatini',
  ET: 'Ethiopia',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GR: 'Greece',
  GD: 'Grenada',
  GT: 'Guatemala',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran',
  IQ: 'Iraq',
  IE: 'Ireland',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Laos',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MR: 'Mauritania',
  MU: 'Mauritius',
  MX: 'Mexico',
  FM: 'Micronesia',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  MK: 'North Macedonia',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PL: 'Poland',
  PT: 'Portugal',
  QA: 'Qatar',
  RO: 'Romania',
  RU: 'Russia',
  RW: 'Rwanda',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'São Tomé and Príncipe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  KR: 'South Korea',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syria',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TM: 'Turkmenistan',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VA: 'Vatican City',
  VE: 'Venezuela',
  VN: 'Vietnam',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
}

/**
 * Same construction as the Turkish dictionary: built from `countries` so a
 * country added to the data file cannot silently lose its English name. Throws
 * at module load — i.e. during `next build` — rather than shipping an empty
 * option.
 */
const quoteCountryOptions = Object.fromEntries(
  countries.map(({ id }) => {
    const name = countryNames[id]
    if (!name) throw new Error(`English countryNames is missing an entry for "${id}"`)
    return [id, name]
  }),
) as Dictionary['quote']['countryOptions']

/**
 * Set true once the copy below has been reviewed by Raymar.
 *
 * `src/content/index.ts` refuses to publish English while this is false, which
 * is what stops a machine translation being served as approved corporate copy.
 */
export const englishCopyApproved = true

export const en: Dictionary = {
  // Ids are DOM section ids shared by both locales — they are anchors, not
  // copy, and must not be translated or the header links stop resolving.
  nav: [
    { id: 'ust', label: 'Home' },
    { id: 'hakkimizda', label: 'About Us' },
    { id: 'urunlerimiz', label: 'Products' },
    { id: 'ticaret', label: 'International Trade' },
    { id: 'teklif', label: 'Contact' },
  ],

  header: {
    logoAlt: 'Raymar Nuts',
    homeAriaLabel: 'Raymar Nuts — Home',
    navAriaLabel: 'Main menu',
    mobileNavAriaLabel: 'Mobile menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    cta: 'Request a Quote',
    // Never shown while both locales are in `completeLocales`; kept because a
    // third locale would need it and the type requires it.
    localePending: 'Content is being prepared',
  },

  hero: {
    cueLabel: 'Explore Products',
    posterAlt: '',
  },

  statement: {
    eyebrow: 'B2B Nut Trading',
    headingLines: ['Over 30 Years of Trading', 'Experience in Nut Supply'],
    body: 'In walnut kernels above all, and in macadamia and pecan, we provide corporate customers with reliable and sustainable supply solutions.',
    primaryCta: 'Explore Products',
    secondaryCta: 'Request a Quote',
  },

  experience: [
    {
      mark: 'experience',
      label: 'Experience',
      value: 'Over 30 Years',
      caption: 'We hold over 30 years of experience in international nut trading.',
    },
    {
      mark: 'network',
      label: 'Reach',
      value: 'Global Trade Network',
      caption: 'We conduct sourcing and export on an international scale.',
    },
    {
      mark: 'partnership',
      label: 'Model',
      value: 'B2B',
      caption: 'We provide supply and trading services to corporate partners.',
    },
  ],

  corporateIntro: {
    eyebrow: 'About Us',
    headingLines: ['Over 30 Years of Experience', 'in Nut Trading'],
    body: [
      'We operate as the representative of a long-established tradition that has been part of the nut trade for more than thirty years. The knowledge, experience and commercial depth gathered over the years at different levels of the sector is what we bring to our customers today under the Raymar Nuts name.',
      "While we export Türkiye's finest nut products to international markets, we also bring products carefully sourced from around the world to the Turkish market with the assurance of Raymar Nuts.",
      'Alongside our raw-material supply to industrial food manufacturers, we also carry out wholesale of snack-grade nut varieties suitable for packing and sale directly to the consumer.',
      'We keep quality, reliability and responsibility at the core of our work, and we aim to build long-term, sustainable partnerships with our customers. We are glad to grow together, as partners, with the companies we work alongside in this sector.',
    ],
    link: 'Our Approach to Trade',
    imageAlt: 'Macro photograph of walnut kernels — illustrative image',
  },

  walnut: {
    // Must stay byte-identical to its entry in `quote.productOptions` below —
    // the walnut cards send this string as the requested product group and the
    // form matches it by string equality.
    eyebrow: 'Walnut Kernels',
    heading: 'Four Distinct Grades of Walnut Kernel',
    categoryLabel: 'Walnut Kernels',
    detailsCta: 'View Details',
    quoteCta: 'Request a Quote',
    quoteCtaAriaTemplate: 'Request a quote for {product}',
    imagePending: 'Product photograph in preparation',
    groups: {
      'ceviz-ici': 'Walnut Kernel Products',
    },
    // The trade grades, largest to smallest — the same size ladder as the
    // Turkish list. Named with the English export terms rather than literal
    // translations: an importer reading a spec expects "halves", "quarters"
    // and "pieces", not "half" and "rice".
    products: {
      yarim: {
        name: 'Walnut Halves',
        imageAlt: 'Walnut halves — whole half kernels, loose',
      },
      ceyrek: {
        name: 'Walnut Quarters',
        imageAlt: 'Walnut quarters — large pieces, loose',
      },
      kirik: {
        name: 'Broken Walnut Kernels',
        imageAlt: 'Broken walnut kernels — loose in an export carton',
      },
      pirinc: {
        name: 'Walnut Small Pieces',
        imageAlt: 'Walnut small pieces — the finest grade, loose',
      },
    },
  },

  range: {
    eyebrow: 'Product Groups',
    heading: 'Our Products',
    categoryLabel: 'Product Group',
    quoteCta: 'Request a Quote',
    quoteCtaAriaTemplate: 'Request a quote for {product}',
    imagePending: 'Product photograph in preparation',
    products: {
      makademya: { name: 'Macadamia', imageAlt: 'Macadamia' },
      pikan: {
        name: 'Pecan',
        imageAlt: 'Pecans — in-shell and kernel, close up',
      },
      'kabak-cekirdegi': {
        name: 'Pumpkin Seed Kernels',
        imageAlt: 'Pumpkin seed kernels',
      },
      'aycekirdegi-ic': {
        name: 'Sunflower Seed Kernels',
        imageAlt: 'Sunflower seed kernels',
      },
      'aycekirdegi-cerezlik': {
        name: 'In-Shell Sunflower Seeds',
        imageAlt: 'In-shell sunflower seeds',
      },
      'antep-fistigi': {
        name: 'Antep Pistachios',
        imageAlt: 'Antep pistachios',
      },
    },
  },

  tradeStory: {
    eyebrow: 'International Trade',
    heading:
      'We carry more than 30 years of experience in the nut trade forward with rigour and an understanding built on trust.',
    intro:
      'The right product selection, reliable sources and long-term business relationships form the basis of how we trade.',
    pillars: [
      'Long-Standing Commercial Experience',
      'Deep Product Knowledge',
      'International Trade Experience',
      'Reliable Business Partnerships',
      'A Sustainable Approach to Trade',
    ],
    closingLead:
      'Share your product and supply requirements with us, and our team will come back to you with suitable options.',
    cta: 'Request a Quote',
  },

  quote: {
    eyebrow: 'Quotation Request',
    heading: 'Get in touch about your product and supply requirements.',
    body: 'Tell us the product group you are interested in and your commercial requirement, and the Raymar team will get back to you.',
    addressLabel: 'Address',
    // The registered entity, its address and its registry identifiers are not
    // translated — they are what appears on the trade register.
    addressLines: [
      'Marex Dış Tic. Ltd. Şti.',
      'Oruçreis Mah. Vadi Cad. No:108 K:8 D:491',
      'İstanbul Ticaret Sarayı 34235 Giyimkent',
      'Esenler / İstanbul, Türkiye',
    ],
    phoneLabel: 'Phone',
    phoneValue: '+90 (541) 923 64 03',
    emailLabel: 'E-mail',
    emailValue: 'info@raymarnuts.com',
    fields: {
      name: { label: 'Full Name', placeholder: 'Your first and last name' },
      company: { label: 'Company', placeholder: 'Company name' },
      country: { label: 'Country' },
      email: { label: 'E-mail', placeholder: 'name@company.com' },
      phone: { label: 'Phone', placeholder: 'Phone number' },
      product: { label: 'Product of Interest' },
      message: {
        label: 'Your Request',
        placeholder:
          'Briefly tell us the product group, quantity and delivery you have in mind.',
      },
    },
    productPlaceholder: 'Select',
    // Must stay in exact sync with the product card names above: the form
    // matches the requested group against this list by string equality, and a
    // miss drops the visitor silently into "Other".
    productOptions: [
      'Macadamia',
      'Pecan',
      'Pumpkin Seed Kernels',
      'Sunflower Seed Kernels',
      'In-Shell Sunflower Seeds',
      'Antep Pistachios',
      'Walnut Kernels',
    ],
    otherProductOption: 'Other',
    countryPlaceholder: 'Select',
    countryOptions: quoteCountryOptions,
    mapLabel: 'Location',
    mapTitle: 'Raymar Nuts location — Google Maps',
    // Identical to the Turkish query, and deliberately so: this is a postal
    // address, and Google Maps resolves the real building from it. Leading
    // with the company name matched a different business nearby.
    mapQuery:
      'Oruçreis Mah. Vadi Cad. No:108, İstanbul Ticaret Sarayı, 34235 Giyimkent, Esenler, İstanbul',
    // Names the cross-border transfer explicitly — see the note on the Turkish
    // string, which this mirrors.
    consentText:
      'I consent to the processing of my data under the KVKK notice and privacy policy, and to its transfer abroad for the purpose of delivering my request.',
    consentLinks: [
      { href: legalPath('en', 'kvkk'), label: 'KVKK Notice' },
      { href: legalPath('en', 'gizlilik'), label: 'Privacy Policy' },
    ],
    submit: 'Send Request',
    requiredNote: '* Required fields',
    errorGeneric: 'Please complete all required fields correctly.',
    errorConsent: 'Please tick the KVKK consent box to continue.',
    errorFieldRequired: 'This field is required.',
    errorFieldEmail: 'Enter a valid e-mail address.',
    errorSubmit: 'Your request could not be sent right now. Please try again.',
    submitting: 'Sending…',
    successHeading: 'Your request has been received.',
    successBody: 'The Raymar team will contact you using the details you provided.',
    summaryLabel: 'Details to be sent',
    resetCta: 'Create a new request',
    emptyValue: '—',
    prefillTemplate: 'I would like to request a quotation for {product}.',
  },

  notFound: {
    code: '404',
    heading: 'The page you are looking for could not be found.',
    cta: 'Back to Home',
    metaTitle: 'Page not found',
  },

  footer: {
    logoAlt: 'Raymar Nuts',
    blurb:
      'Under Marex Dış Tic. Ltd. Şti., Raymar Nuts conducts B2B nut trading in walnut kernels, macadamia, pecan, Antep pistachios and seed products.',
    // Brand asset, left in Turkish on purpose — see the note at the top of this
    // file. Identity manual, p.145: always quoted, italic, gold.
    tagline: '“Tane Tane Lezzetler”',
    corporate: {
      heading: 'About Us',
      links: [
        { href: '#ust', label: 'Home' },
        { href: '#hakkimizda', label: 'About Us' },
        { href: '#ticaret', label: 'International Trade' },
        { href: '#teklif', label: 'Contact' },
      ],
    },
    products: {
      heading: 'Products',
      links: [
        { href: '#urunlerimiz', label: 'Macadamia' },
        { href: '#urunlerimiz', label: 'Pecan' },
        { href: '#urunlerimiz', label: 'Pumpkin Seed Kernels' },
        { href: '#urunlerimiz', label: 'Sunflower Seeds' },
        { href: '#urunlerimiz', label: 'Antep Pistachios' },
        { href: '#ceviz', label: 'Walnut Kernels' },
      ],
    },
    contactHeading: 'Contact',
    addressLines: [
      'Marex Dış Tic. Ltd. Şti.',
      'Oruçreis Mah. Vadi Cad. No:108 K:8 D:491',
      'İstanbul Ticaret Sarayı 34235 Giyimkent',
      'Esenler / İstanbul, Türkiye',
    ],
    phoneValue: '+90 (541) 923 64 03',
    emailValue: 'info@raymarnuts.com',
    copyright: '© 2026 Raymar Nuts. All rights reserved.',
    legalLinks: [
      { href: legalPath('en', 'kvkk'), label: 'KVKK Notice' },
      { href: legalPath('en', 'gizlilik'), label: 'Privacy Policy' },
      { href: legalPath('en', 'cerez'), label: 'Cookie Policy' },
    ],
  },

  /*
   * Translations of the Turkish legal documents, carrying the same caveat the
   * Turkish ones carry: drafted from verified facts and grounded in the actual
   * statutory structure, but not reviewed by counsel.
   *
   * Each document opens by stating that the Turkish text prevails. That is not
   * boilerplate — these describe obligations under Turkish law, the data
   * subject's rights are the ones KVKK grants, and a discrepancy introduced by
   * translation must not be readable as the company having promised something
   * different in English.
   *
   * `lastUpdated` matches the Turkish document, because the content is the same
   * content: dating the translation to the day it was translated would imply
   * the policy itself had changed.
   */
  legal: {
    kvkk: {
      metaTitle: 'KVKK Personal Data Notice',
      metaDescription:
        'Notice under Law No. 6698 on the Protection of Personal Data covering the personal data processed through the Raymar Nuts quotation form.',
      eyebrow: 'Legal',
      lastUpdatedLabel: 'Last updated',
      heading: 'KVKK Personal Data Notice',
      lastUpdated: '2026-08-31',
      intro: [
        'This Notice has been prepared under Article 10 of Law No. 6698 on the Protection of Personal Data ("KVKK") and the Communiqué on the Procedures and Principles to be Followed in Fulfilling the Obligation to Inform, in order to inform you about the personal data processed through the quotation form on this website (the "Site").',
        'This is a translation provided for convenience. The Turkish text of this notice is the operative version; in the event of any discrepancy, the Turkish text prevails.',
      ],
      sections: [
        {
          heading: '1. Identity of the Data Controller',
          paragraphs: [
            'Your personal data is processed by Marex Dış Tic. Ltd. Şti. (the "Company") in its capacity as data controller, within the scope of the commercial activities carried out under the Raymar Nuts brand, for the purposes and by the methods described below.',
          ],
          list: [
            'Registered name: Marex Dış Tic. Ltd. Şti.',
            'Mersis No: 0612100813400001',
            'Tax office / number: Atışalanı Tax Office, 612 100 8134',
            'Address: Oruçreis Mah. Vadi Cad. No:108 K:8 D:491, İstanbul Ticaret Sarayı 34235 Giyimkent, Esenler / İstanbul, Türkiye',
          ],
        },
        {
          heading: '2. Personal Data Processed and How It Is Collected',
          paragraphs: [
            'If you complete the quotation form, the following data entered by you in that form is processed electronically and supplied directly by you:',
          ],
          list: [
            'Identity data: first name and surname',
            'Contact data: e-mail address, telephone number (if you provide one), country',
            'Professional / commercial data: company name, the product group you are interested in',
            'Content of the request: the message you write in the form',
          ],
        },
        {
          heading: '3. Purposes of Processing',
          paragraphs: ['Your personal data is processed for the following purposes:'],
          list: [
            'Assessing and responding to the quotation request you have sent',
            'Establishing commercial contact with you and conducting a possible business relationship',
            'Keeping records of requests received',
            "Fulfilling legal obligations arising from the Company's commercial activities (for example, the retention of commercial correspondence)",
          ],
        },
        {
          heading: '4. Legal Basis for Processing',
          paragraphs: [
            'Your personal data is processed on the legal basis of the explicit consent you give by ticking the consent box before submitting the quotation form (KVKK Art. 5/1). The form is not submitted unless that box is ticked. If you wish to withdraw your consent after your request has been sent, you may use the application channels described in Section 8.',
          ],
        },
        {
          heading: '5. Transfer of Personal Data and Transfer Abroad',
          paragraphs: [
            'The personal data you send through the request form is seen only by the personnel authorised for this purpose within the Company, solely for the purpose of assessing and responding to your request. It is not used for marketing, not sold, and not shared with any third party or institution other than the service provider named below.',
            'One data processor is used, so that the form can reach the Company at all: the e-mail delivery infrastructure is provided by Brevo (Sendinblue SAS), based in France. The form you complete passes through that infrastructure on its way to the Company’s corporate e-mail address, which means your personal data is transferred abroad within the meaning of Article 9 of KVKK. That transfer rests on the explicit consent you give by ticking the consent box before submitting the form. France, as a member of the European Union, is subject to the General Data Protection Regulation (GDPR).',
            'Should the Company in future receive support from any other service provider — such as a customer relationship management (CRM) system — in order to operate its request processes, this will be reflected in this text and any such transfer will be carried out in accordance with the conditions required by KVKK.',
          ],
        },
        {
          heading: '6. Retention Period',
          paragraphs: [
            'Your personal data is retained for as long as the purpose of processing requires and, in any event, limited to the maximum periods provided for in the applicable legislation — for example, the ten-year retention obligation for commercial correspondence under Article 82 of the Turkish Commercial Code No. 6102. At the end of these periods your personal data is erased, destroyed or anonymised.',
          ],
        },
        {
          heading: '7. Your Rights Under Article 11 of KVKK',
          paragraphs: ['By applying to the Company under Article 11 of KVKK, you may:'],
          list: [
            'Learn whether your personal data is being processed',
            'Request information if it has been processed',
            'Learn the purpose of processing and whether it is used in accordance with that purpose',
            'Know the third parties, in Türkiye or abroad, to whom it has been transferred',
            'Request its correction if it has been processed incompletely or incorrectly',
            'Request its erasure or destruction within the conditions set out in Article 7 of KVKK',
            'Request that correction, erasure and destruction be notified to the third parties to whom the data has been transferred',
            'Object to a result to your detriment arising from analysis of the processed data exclusively by automated systems',
            'Claim compensation if you suffer loss because the data has been processed unlawfully',
          ],
        },
        {
          heading: '8. How to Apply',
          paragraphs: [
            'You may submit requests concerning the rights listed above, together with documents evidencing your identity, in writing to the Company at "Oruçreis Mah. Vadi Cad. No:108 K:8 D:491, İstanbul Ticaret Sarayı 34235 Giyimkent, Esenler / İstanbul, Türkiye"; by e-mail to info@raymarnuts.com from the electronic mail address you have previously notified to the Company and which is registered in our systems; or by contacting us through the quotation form on the Site. The option to apply via a KEP (registered electronic mail) address will be announced here once the Company publishes that address.',
            'Your application will be concluded as soon as possible according to the nature of the request and in any event within the thirty (30) days provided for in KVKK.',
          ],
        },
      ],
    },
    gizlilik: {
      metaTitle: 'Privacy Policy',
      metaDescription:
        'Privacy policy explaining how the Raymar Nuts website handles personal data and visitor privacy.',
      eyebrow: 'Legal',
      lastUpdatedLabel: 'Last updated',
      heading: 'Privacy Policy',
      lastUpdated: '2026-08-31',
      intro: [
        'This Privacy Policy explains how your personal data is handled when you visit this website (the "Site"), operated by Marex Dış Tic. Ltd. Şti. (the "Company", "Raymar Nuts"). For the purposes, legal bases and your rights under KVKK regarding data processed through the quotation form, please see the KVKK Personal Data Notice; this Policy complements it with a broader picture.',
        'This is a translation provided for convenience. The Turkish text of this policy is the operative version; in the event of any discrepancy, the Turkish text prevails.',
      ],
      sections: [
        {
          heading: 'How This Site Collects Your Personal Data',
          paragraphs: [
            'The Site does not ask its visitors to authenticate, register or complete any similar process. Your personal data is collected only when you choose to complete and submit the quotation form, limited to the fields in that form. If you visit the Site only to browse it, without completing the form, no personal data about you is collected.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            "The Site's own code sets no cookies. The single exception is the embedded Google Maps map in the Contact section — it loads automatically when the page loads, and Google may set its own cookies. See the Cookie Policy for details.",
          ],
        },
        {
          heading: 'Third-Party Services and Analytics',
          paragraphs: [
            'This Site uses no third-party analytics, advertising or tracking service (such as Google Analytics or an advertising pixel). The typefaces used on the Site are served from this server, so viewing a page does not cause any request to be sent to a third-party font provider.',
            "Only two third-party services are used. The first is the embedded Google Maps map in the Contact section; it is loaded from Google's own servers and is subject to Google's own privacy practices. The second is the e-mail delivery infrastructure (Brevo — Sendinblue SAS, France), which is involved only when you submit the quotation form; no data reaches that service unless you send the form. See section 5 of the KVKK Personal Data Notice for details.",
          ],
        },
        {
          heading: 'Technical Security Measures',
          paragraphs: [
            'The Site is configured to be served over HTTPS (SSL/TLS) to secure data in transit. Security headers are applied to server responses, including a Content-Security-Policy, HTTP Strict Transport Security (HSTS), X-Frame-Options against clickjacking, X-Content-Type-Options against MIME sniffing, and a Permissions-Policy restricting browser capabilities.',
          ],
        },
        {
          heading: 'Technical Records Arising from Hosting',
          paragraphs: [
            "As with any website, the server hosting this Site may keep standard technical log records — IP address, browser and operating system information, date and time of access — for security and fault diagnosis. These records arise within the hosting provider's own security practices; they are not used by the Company for marketing or profiling.",
          ],
        },
        {
          heading: 'Changes to This Policy',
          paragraphs: [
            'This Privacy Policy may be updated in line with changes to the services offered on the Site or to the applicable legislation. The current version is always published on this page, and the "last updated" date at the top of the page changes accordingly.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'For questions about our privacy practices, you may write to info@raymarnuts.com, use the quotation form on the Site, or apply in writing to the Company address.',
          ],
        },
      ],
    },
    cerez: {
      metaTitle: 'Cookie Policy',
      metaDescription:
        'Cookie policy explaining the cookies used on the Raymar Nuts website and the third-party cookies that may arrive via the embedded Google Maps map.',
      eyebrow: 'Legal',
      lastUpdatedLabel: 'Last updated',
      heading: 'Cookie Policy',
      lastUpdated: '2026-08-21',
      intro: [
        'This Cookie Policy explains this website\'s (the "Site") practice regarding the use of cookies.',
        'This is a translation provided for convenience. The Turkish text of this policy is the operative version; in the event of any discrepancy, the Turkish text prevails.',
      ],
      sections: [
        {
          heading: "The Site's Own Cookies",
          paragraphs: [
            "The Site's own code sets no cookies. There are no first-party cookies set by the Site for authentication, session tracking, analytics or advertising.",
          ],
        },
        {
          heading: 'Google Maps — Third-Party Cookie',
          paragraphs: [
            "The map showing our address in the Contact section is embedded from Google Maps and loads automatically when the page loads. Because that map is served from Google's own servers, Google may set its own cookies in your browser. These cookies are determined and managed by Google, not by the Site; for details you may consult Google's own privacy and cookie practices at policies.google.com/privacy.",
            'Apart from this single exception, there are no third-party cookies on the Site for analytics, advertising or targeting.',
          ],
        },
        {
          heading: 'Similar Technologies',
          paragraphs: [
            "The Site does not use your browser's local storage areas (localStorage, sessionStorage). The information you enter into the quotation form is held in browser memory only while you are filling the form in; it is not retained when you reload or close the page.",
          ],
        },
        {
          heading: 'If Additional Cookies Are Used in Future',
          paragraphs: [
            'If the Company decides in future to use additional cookies or similar technologies in order to measure site traffic or improve the user experience, this Policy will be updated and a cookie consent mechanism will be added to the Site to obtain your explicit consent for non-essential cookies, as required by Law No. 6698 and the related legislation.',
          ],
        },
        {
          heading: 'Contact',
          paragraphs: [
            'For questions about this Policy you may write to info@raymarnuts.com or contact us using the quotation form on the Site.',
          ],
        },
      ],
    },
  },

  meta: {
    siteName: 'Raymar Nuts',
    title: 'Raymar Nuts | B2B Nut Trading and Supply',
    titleTemplate: '%s | Raymar Nuts',
    description:
      'Raymar Nuts is a B2B trading and supply company for walnut kernels, macadamia, pecan, Antep pistachios, pumpkin seed kernels and sunflower seed kernels.',
    skipToContent: 'Skip to content',
  },
}
