import { libraryImages } from './images'
import { cite } from './sources'
import type { ProductPage } from './types'

/*
 * Walnut kernel sizes — one page per size, under `walnut-kernels`.
 *
 * The English names follow the USDA standard (halves, pieces, small pieces)
 * and UNECE DDP-02 (quarters), which is what an importer searches for and
 * works from. The Turkish trade names differ, and the Turkish standard TS 1276
 * differs from both: its "kırık (pirinç)" is ONE type, the 3–8 mm fraction,
 * which is what these pages call small pieces; the larger portions sold here
 * as walnut pieces are its "büyük" type. Each page says so once, because a
 * buyer sourcing from Türkiye will meet the Turkish names on documents.
 *
 * Removed in the source check of 2026-09-18: "the same flavour as halves" (no
 * source; the standards only grade quality separately from size), "about the
 * size of a grain of rice" (the standards define the size by sieves), "broken
 * walnut kernels" as a synonym for pieces (in UNECE, "broken pieces" is the
 * smallest style), and cost comparisons for quarters (no source).
 *
 * Nothing company-specific. Millimetre values are the standards' definitions,
 * not product specifications.
 */
export const walnutSizesEn: readonly ProductPage[] = [
  {
    id: 'walnut-halves',
    parent: 'walnut-kernels',
    slug: 'walnut-halves',
    name: 'Walnut Halves',
    metaTitle: 'Walnut Halves Wholesale: Uses and Ordering',
    metaDescription:
      'Wholesale walnut halves: how the USDA and Turkish standards define them, choosing a colour grade, uses, what to specify, storage and quotations.',
    eyebrow: 'Walnut Kernels',
    heading: 'Walnut Halves, Wholesale',
    lead: 'Walnut halves are kernels split into two roughly equal parts; the Turkish standard TS 1276 calls them “yarım (çenet)”. They are the size for products that show the walnut’s natural shape. Raymar Nuts supplies walnut halves wholesale to corporate buyers.',
    image: libraryImages.walnutHalves,
    imageAlt: 'Walnut halves — intact half kernels, loose',
    sections: [
      {
        heading: 'What Are Walnut Halves?',
        paragraphs: [
          'TS 1276 defines a half as a whole kernel separated into two roughly equal parts. In the USDA standard a half kernel is the separated half of a kernel with not more than one-eighth broken off, and a lot is classified as “halves” when 85 percent or more of it, by weight, is half kernels.',
          'How many halves a lot yields depends on the shell: research at the University of California, Davis found that nuts with weak shell sutures crack in the wrong direction, reducing or eliminating the recovery of kernel halves.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: [
          'Walnut halves are used where the walnut’s natural shape should show:',
        ],
        list: [
          'Decorating cakes, pastries and desserts',
          'Confectionery',
          'Snack packs and nut mixes',
        ],
      },
      {
        heading: 'Choosing a Colour Grade',
        paragraphs: [
          'Because halves are usually visible in the finished product, colour matters most in this size. The USDA standard grades colour from Extra Light through Light and Light Amber to Amber, and California Walnuts notes that lighter walnuts are the most popular for aesthetic reasons. The trade quotes size and colour together: “Light Halves” means halves in the Light colour grade.',
        ],
      },
      {
        heading: 'What to Specify When Ordering',
        paragraphs: ['Settling these points makes offers easier to compare:'],
        list: [
          'Colour grade',
          'The share of other portions tolerated in a halves lot',
          'Packaging type and carton weight',
          'Approximate volume, delivery location and schedule',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'About 72 percent of walnut oil is polyunsaturated fat, more than in most nuts, which makes walnut kernels prone to oxidation; heat and light speed it up. Keep walnut halves cool, dry and dark, in airtight packaging and away from odorous materials. TS 1276 requires walnut kernels held for long periods to be kept in cold stores below 50 percent relative humidity.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Prices for walnut halves depend on colour grade, volume, packaging and delivery terms. Share your requirement through the quotation form and our team will come back with suitable options.',
        ],
      },
    ],
    faq: [
      {
        question: 'Why do walnut halves cost more than walnut pieces?',
        answer:
          'Halves have to stay intact, and market reports show halves selling at a premium to pieces; the USDA’s 2024 report on Ukraine is one example. Quality class is graded separately from size, so pieces can be of the same class.',
      },
      {
        question: 'What are walnut halves used for?',
        answer:
          'Decorating cakes and desserts, confectionery and snack packs — wherever the walnut’s natural shape should show.',
      },
    ],
    sources: cite(
      'en',
      'ts1276Gazette',
      'ts1276Current',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'walnutSutureStrength',
      'wikiWalnut',
      'gainUkraineTreeNuts2025',
    ),
    relatedGuides: ['walnut-kernel-grades', 'walnut-colour-grades'],
  },
  {
    id: 'walnut-quarters',
    parent: 'walnut-kernels',
    slug: 'walnut-quarters',
    name: 'Walnut Quarters',
    metaTitle: 'Walnut Quarters Wholesale: Uses and Ordering',
    metaDescription:
      'Wholesale walnut quarters: how UNECE and the Turkish standard define them, uses in cakes, cookies and bakery, ordering criteria, storage and quotations.',
    eyebrow: 'Walnut Kernels',
    heading: 'Walnut Quarters, Wholesale',
    lead: 'Walnut quarters are kernels split lengthways into four roughly equal parts; TS 1276 and the UNECE standard define the type the same way. They are used where the walnut should be felt as large pieces. Raymar Nuts supplies walnut quarters wholesale to corporate buyers.',
    image: libraryImages.walnutQuarters,
    imageAlt: 'Walnut quarters — large pieces, loose',
    sections: [
      {
        heading: 'What Are Walnut Quarters?',
        paragraphs: [
          'TS 1276 defines a quarter as a whole kernel split lengthways into four roughly equal parts. The walnut kernel standard of the United Nations Economic Commission for Europe, UNECE DDP-02, defines “quarters” the same way, as kernels split lengthways into four.',
          'The USDA standard has no separate quarters class; quarter-size portions fall within its “pieces” class.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: [
          'Walnut quarters are used where the walnut should be felt as large pieces:',
        ],
        list: [
          'Cakes, cookies and muffins',
          'Walnut bread and bakery products',
          'Brownies and tarts',
          'Bars and ice cream',
        ],
      },
      {
        heading: 'Ordering Criteria',
        paragraphs: ['These are usually specified when buying walnut quarters:'],
        list: [
          'Uniformity of piece size',
          'Share of fine pieces and dust',
          'Colour grade',
          'Packaging type, volume and delivery terms',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'Walnut quarters are affected by heat, light, moisture and oxygen; keep them cool, dry and dark in airtight packaging. California Walnuts advises moving opened walnuts to an airtight container, and TS 1276 requires kernels held for long periods to be kept in cold storage.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Prices for walnut quarters depend on colour grade, volume, packaging and delivery terms. Share your requirement through the quotation form and our team will get back to you.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is the difference between walnut quarters and walnut pieces?',
        answer:
          'Quarters are regular portions, split lengthways into four. Walnut pieces are irregular portions smaller than quarters; in TS 1276 that size is the “büyük” type. The difference is texture and appearance; quality class is graded separately from size.',
      },
      {
        question: 'What are walnut quarters mostly used for?',
        answer:
          'Bakery products where the walnut should be felt as large pieces: cakes, cookies, walnut bread and brownies.',
      },
    ],
    sources: cite(
      'en',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'cwBuyCare',
    ),
    relatedGuides: ['walnut-kernel-grades', 'storing-walnut-kernels'],
  },
  {
    id: 'walnut-pieces',
    parent: 'walnut-kernels',
    slug: 'walnut-pieces',
    name: 'Walnut Pieces',
    metaTitle: 'Walnut Pieces Wholesale: Uses and Ordering',
    metaDescription:
      'Wholesale walnut pieces: how the USDA, UNECE and Turkish standards define them, bakery and food-industry uses, colour choice, ordering and quotations.',
    eyebrow: 'Walnut Kernels',
    heading: 'Walnut Pieces, Wholesale',
    lead: 'Walnut pieces are irregular portions of kernel, smaller than quarters and larger than small pieces. They are used wherever the walnut does not need to appear whole. Sourcing from Türkiye, note the names: this size is the “büyük” type in the Turkish standard TS 1276, and is sold in the Turkish trade as “kırık ceviz içi”, although TS 1276 reserves “kırık (pirinç)” for the smallest type.',
    image: libraryImages.walnutBroken,
    imageAlt: 'Walnut pieces in a lined carton',
    sections: [
      {
        heading: 'What Are Walnut Pieces?',
        paragraphs: [
          'In the USDA standard, “pieces” are portions of kernels that cannot pass through a sieve with 24/64-inch (about 9.5 mm) round openings. UNECE DDP-02 calls portions smaller than three-quarters of a half but larger than broken pieces “large pieces”, and TS 1276 defines its “büyük” type the same way.',
          'A note on the names: in TS 1276, “kırık (pirinç)” is the finest fraction — it passes an 8 mm sieve and is retained on a 3 mm one — and is what these pages call small pieces, while the larger irregular portions are the standard’s “büyük” type, sold in Raymar’s Turkish catalogue as “kırık ceviz içi”. State the standard type or the size range on an order rather than the Turkish name alone.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: [
          'Walnut pieces are used where the walnut matters for flavour and texture but need not appear whole:',
        ],
        list: [
          'Cakes, cookies and bakery products',
          'Chocolate and bars',
          'Ice cream',
          'Baking mixes',
        ],
      },
      {
        heading: 'Choosing a Colour Grade',
        paragraphs: [
          'Lighter grades suit products where the walnut shows; where colour is not in the foreground, darker grades can also be considered. California Walnuts describes Light Amber as the more economical choice.',
        ],
      },
      {
        heading: 'Ordering Criteria',
        paragraphs: ['These are usually settled when buying walnut pieces:'],
        list: [
          'Size range or standard type',
          'Share of fine pieces and dust',
          'Tolerance for shell fragments and foreign material',
          'Colour grade',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'Small portions keep less long than whole kernels: postharvest specialists at UC Davis report that diced almonds, pecans and hazelnuts keep for roughly half as long as whole ones. For walnut pieces, cool, dry and dark storage, airtight packaging and steady stock rotation therefore matter even more; long-term stock belongs in cold storage.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Walnut pieces carry no requirement to stay whole; the USDA’s 2024 report on Ukraine likewise records pieces trading below halves. Prices depend on colour grade, volume, packaging and delivery terms; share your requirement through the quotation form.',
        ],
      },
    ],
    faq: [
      {
        question: 'What are walnut pieces?',
        answer:
          'Irregular portions of walnut kernel, smaller than quarters and larger than small pieces. In the USDA standard they are portions that do not pass a 24/64-inch sieve; in the Turkish standard TS 1276 this size is the “büyük” type.',
      },
      {
        question: 'Are walnut pieces a lower-quality product?',
        answer:
          'No. In TS 1276 and UNECE DDP-02 the quality class (Extra, Class I, Class II) is graded separately from size, so any size can be in any class. The differences are piece size and a shorter storage life.',
      },
      {
        question: 'Do walnut pieces go rancid faster?',
        answer:
          'Small portions keep less long than whole kernels. Store them cool, dry and dark in airtight packaging, and use opened packs quickly.',
      },
    ],
    sources: cite(
      'en',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'ucDavisDicedNuts',
      'gainUkraineTreeNuts2025',
    ),
    relatedGuides: ['walnut-kernel-grades', 'storing-walnut-kernels'],
  },
  {
    id: 'walnut-small-pieces',
    parent: 'walnut-kernels',
    slug: 'walnut-small-pieces',
    name: 'Walnut Small Pieces',
    metaTitle: 'Walnut Small Pieces Wholesale: Uses and Storage',
    metaDescription:
      'Wholesale walnut small pieces: the 3–8 mm size in the Turkish standard, uses in baklava and fillings, how they differ from walnut meal, storage and quotes.',
    eyebrow: 'Walnut Kernels',
    heading: 'Walnut Small Pieces, Wholesale',
    lead: 'Walnut small pieces are the smallest size of walnut kernel. The Turkish standard TS 1276 defines this type, which it calls “kırık (pirinç)”, as pieces that pass an 8 mm sieve but are retained on a 3 mm one. Raymar Nuts supplies walnut small pieces wholesale to corporate buyers.',
    image: libraryImages.walnutSmall,
    imageAlt: 'Walnut small pieces — the finest size, loose',
    sections: [
      {
        heading: 'What Are Walnut Small Pieces?',
        paragraphs: [
          'TS 1276 defines the kırık (pirinç) type as portions of kernel that pass through a sieve with 8 mm openings but not through one with 3 mm openings. UNECE DDP-02 calls the same range “broken pieces”; the closest USDA class is “small pieces”, which pass a 24/64-inch sieve but not an 8/64-inch one.',
          'In the Turkish trade names used by Raymar Nuts, “pirinç” is this smallest type and “kırık” means the larger pieces. Stating the standard type on the order avoids confusion.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: [
          'Small pieces are used where the walnut should spread evenly through the product:',
        ],
        list: [
          'Baklava, kadayıf and syrup-soaked desserts',
          'Fillings for cookies and pastries',
          'Dips such as muhammara',
          'Toppings for desserts and ice cream',
        ],
      },
      {
        heading: 'Small Pieces vs Walnut Meal',
        paragraphs: [
          'Small pieces are, by the standard, portions between 3 and 8 mm. Walnut meal is the finest form of walnut; according to California Walnuts it ranges from a coarse meal to a fine powder and is used to dust cakes, in doughs and batters, and in walnut compounds.',
        ],
      },
      {
        heading: 'What Is “Baklavalık Ceviz”?',
        paragraphs: [
          '“Baklavalık ceviz” — Turkish for “walnut for baklava” — is not a size name and is not one of the types in TS 1276. Since no standard defines the size sold under that name, specify the standard type or size range when ordering. Walnut baklava is usually made with finely chopped walnuts.',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'Small portions keep less long than whole kernels; UC Davis postharvest specialists report that diced nuts (almonds, pecans, hazelnuts) keep for roughly half as long as whole ones. Store small pieces cool, dry and dark in airtight packaging and, as California Walnuts advises, rotate stock first in, first out.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Prices for walnut small pieces depend on colour grade, volume, packaging and delivery terms. Share your requirement through the quotation form and our team will get back to you.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is “pirinç” walnut?',
        answer:
          '“Pirinç” is the Turkish trade name for the smallest walnut size. TS 1276 defines it, under “kırık (pirinç)”, as pieces that pass an 8 mm sieve but are retained on a 3 mm one. It is used in baklava, kadayıf and fillings.',
      },
      {
        question: 'Which size is used for baklava?',
        answer:
          'Walnut baklava is usually made with finely chopped walnuts. “Baklavalık ceviz” is not a standard size, so specify the standard type or size range you need on the order.',
      },
    ],
    sources: cite(
      'en',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeChart',
      'cwHandlingStorage',
      'ucDavisDicedNuts',
      'wikiBaklava',
      'wikiMuhammara',
      'vikipediKadayif',
    ),
    relatedGuides: ['walnut-kernel-grades', 'storing-walnut-kernels'],
  },
]
