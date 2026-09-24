import { libraryImages } from './images'
import { cite } from './sources'
import type { ProductPage } from './types'

/*
 * English product pages.
 *
 * Written for an importer or manufacturer buying from abroad, not translated
 * line by line from Turkish: the search terms differ ("walnut kernels
 * wholesale", "walnut halves wholesale", "light halves walnut", "pecan nuts
 * wholesale", "nuts wholesale turkey"), and so does what the reader needs.
 *
 * The same accuracy rule as the Turkish pages applies: general, verifiable
 * trade knowledge only. No company-specific moisture limits, calibres,
 * origins, certifications, minimum orders or prices — those go to the
 * quotation request. Price paragraphs name what prices generally depend on,
 * never which forms Raymar offers.
 *
 * HS codes are the six-digit international headings, verified against the US
 * Harmonized Tariff Schedule (hts.usitc.gov). National tariff lines extend them
 * and change, so the reader is told to confirm the full code for their market.
 * Raw seeds and nuts only: roasted, salted and otherwise prepared ones are
 * generally classified in Chapter 20, and every page that gives a code says so.
 *
 * Walnut size names follow the Turkish trade (halves, quarters, pieces, small
 * pieces), with a note that US grade standards name them differently. "Broken
 * pieces" is avoided: in the UNECE walnut kernel standard it names the
 * smallest style, not the mixed fraction these pages mean by "pieces".
 */
export const productsEn: readonly ProductPage[] = [
  {
    id: 'walnut-kernels',
    slug: 'walnut-kernels',
    name: 'Walnut Kernels',
    metaTitle: 'Walnut Kernels Wholesale: Halves and Pieces',
    metaDescription:
      'Wholesale walnut kernels: halves, quarters, pieces and small pieces, how the standards define them, colour grades, applications, HS code 0802.32, quotes.',
    eyebrow: 'Products',
    heading: 'Walnut Kernels, Wholesale',
    lead: 'Walnut kernels are used in bakery, confectionery, ice cream, breakfast cereals and ready meals. According to the International Nut and Dried Fruit Council (INC), walnuts made up about a fifth of world tree-nut production in 2023/24. Raymar Nuts supplies walnut kernels to corporate buyers as halves, quarters, pieces and small pieces.',
    image: libraryImages.walnutKernels,
    imageAlt: 'Walnut kernels — loose, close up',
    childrenHeading: 'Walnut Kernels by Size',
    sections: [
      {
        id: 'grades',
        heading: 'Walnut Kernel Sizes: Halves, Quarters, Pieces and Small Pieces',
        paragraphs: [
          'Once separated from the shell, walnut kernels are passed over sieves and sorted by piece size. The names differ by standard: the USDA standard uses halves, “pieces and halves”, pieces and small pieces; UNECE DDP-02 uses halves, quarters, large pieces and broken pieces; and the Turkish standard TS 1276, applied in Türkiye’s export quality control, has six types — yarım, çeyrek, büyük, kırık (pirinç), küçük, and a mix of halves and large pieces.',
          'Raymar Nuts sells four sizes, from largest to smallest. Here is how each maps onto the standards. A note on the names: in TS 1276, “kırık (pirinç)” is the finest fraction — it passes an 8 mm sieve and is retained on a 3 mm one — and is what these pages call small pieces, while the larger irregular portions are the standard’s “büyük” type, sold in Raymar’s Turkish catalogue as “kırık ceviz içi”. State the standard type or the size range on an order rather than the Turkish name alone.',
        ],
        list: [
          'Halves: kernels split into two roughly equal parts (TS 1276: yarım; USDA: halves). The choice wherever appearance matters — decoration, confectionery and snack packs.',
          'Quarters: kernels split lengthways into four roughly equal parts (TS 1276: çeyrek; UNECE: quarters). For cakes, cookies and bakery products with a distinct walnut bite.',
          'Pieces: irregular portions smaller than quarters (TS 1276: büyük; USDA: pieces). For bakery, chocolate and ice cream, where the walnut need not appear whole.',
          'Small pieces: portions that pass an 8 mm sieve but not a 3 mm one (TS 1276: kırık (pirinç); UNECE: broken pieces). For baklava, fillings and blends where the walnut should spread evenly.',
        ],
      },
      {
        heading: 'Colour Grades',
        paragraphs: [
          'Walnut kernels are graded by the colour of their skin as well as by size. The USDA standard describes colour from its Walnut Color Chart, from lightest to darkest: Extra Light, Light, Light Amber and Amber, with a separate “red” description for red-skinned varieties. TS 1276 instead ties colour to quality class: Extra kernels must be light throughout, Class I no darker than light brown or lemon-yellow, and Class II no darker than dark brown.',
          'California Walnuts describes Light kernels as mild, with subtle tannins, and Light Amber as more robust and the more economical choice. Lighter grades suit products where the kernel shows; where colour is not seen — fillings and blends — darker grades can also be considered.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: [
          'Walnut kernels work both as a visible ingredient and as a flavour carried through a recipe:',
        ],
        list: [
          'Bakery: cakes, cookies, breads and tarts',
          'Baklava, kadayıf and other syrup-soaked pastries',
          'Chocolate, confectionery and bars',
          'Ice cream and chilled desserts',
          'Granola, muesli and breakfast cereals',
          'Dips such as muhammara, and sauces',
          'Snack packs and nut mixes',
        ],
      },
      {
        heading: 'Storage and Shelf Life',
        paragraphs: [
          'About 72 percent of walnut oil is polyunsaturated fat, more than in most nuts, which makes walnut kernels prone to oxidation; heat and light speed it up. Keep them cool, dry and dark, in airtight packaging and away from strong odours, which walnuts absorb over prolonged exposure.',
          'TS 1276 requires walnut kernels held for long periods to be kept in cold stores below 50 percent relative humidity. California Walnuts notes that cold storage minimises rancidity and darkening of the kernel, and advises refrigerating packs after opening.',
        ],
      },
      {
        id: 'hs-code',
        heading: 'HS Code for Walnut Kernels',
        paragraphs: [
          'Under the Harmonized System, walnuts are classified under heading 0802. Walnuts in shell fall under 0802.31 and shelled walnut kernels under 0802.32. Roasted, salted or otherwise prepared walnuts are generally classified in Chapter 20 instead.',
          'National tariff schedules add further digits to the six-digit HS code — in Türkiye’s 12-digit GTİP, digits 7 and 8 follow the EU Combined Nomenclature and the rest are national positions — so confirm the full tariff line for your market with your customs broker before declaring.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Wholesale walnut kernel prices depend on size, colour grade, volume, packaging and delivery terms. Tell us the size you need, an approximate volume and your delivery expectations through the quotation form, and our team will come back to you with suitable options.',
        ],
      },
    ],
    faq: [
      {
        question: 'What sizes are wholesale walnut kernels sold in?',
        answer:
          'Raymar Nuts supplies halves, quarters, pieces and small pieces. The standards name sizes differently: the USDA uses halves, pieces and halves, pieces and small pieces, and the Turkish standard TS 1276 defines six types, its smallest — kırık (pirinç) — being pieces that pass an 8 mm sieve but not a 3 mm one.',
      },
      {
        question: 'What does “light halves” mean?',
        answer:
          '“Light halves” combines a colour grade and a size: walnut halves in the Light colour class of the USDA standard. The trade usually quotes size and colour together in this way.',
      },
      {
        question: 'What is the difference between walnut halves and walnut pieces?',
        answer:
          'Piece size. In TS 1276 and the UNECE standard the quality class (Extra, Class I, Class II) is graded separately from size. Halves are used where the kernel shows, pieces in bakery, fillings and ice cream; small portions keep less long than whole kernels.',
      },
      {
        question: 'What is the HS code for walnut kernels?',
        answer:
          'Shelled walnut kernels are classified under HS 0802.32; walnuts in shell under 0802.31. National tariff lines add further digits, so confirm the full code for your market.',
      },
      {
        question: 'How should walnut kernels be stored?',
        answer:
          'Cool, dry and dark, in airtight packaging and away from strong odours. TS 1276 requires kernels held for long periods to be kept in cold stores below 50 percent relative humidity.',
      },
    ],
    sources: cite(
      'en',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'cwHandlingStorage',
      'incYearbook2024',
      'wikiWalnut',
      'ukTariff0802',
      'tariffFaq',
    ),
    relatedGuides: [
      'walnut-kernel-grades',
      'walnut-colour-grades',
      'storing-walnut-kernels',
      'walnut-kernel-defects',
      'walnut-harvest-season',
    ],
  },
  {
    id: 'pumpkin-seed-kernels',
    slug: 'pumpkin-seed-kernels',
    name: 'Pumpkin Seed Kernels',
    metaTitle: 'Pumpkin Seed Kernels, Wholesale',
    metaDescription:
      'Wholesale pumpkin seed kernels: hulled and hull-less varieties, uses in bakery and snacks, what a specification defines, storage and quotation requests.',
    eyebrow: 'Products',
    heading: 'Pumpkin Seed Kernels, Wholesale',
    lead: 'Green in colour, pumpkin seed kernels are widely used in bakery products and as a snack. Raymar Nuts supplies pumpkin seed kernels to corporate buyers.',
    image: libraryImages.pumpkin,
    imageAlt: 'Pumpkin seed kernels — green, hulled, loose',
    sections: [
      {
        heading: 'What Are Pumpkin Seed Kernels?',
        paragraphs: [
          'Pumpkin seed kernels are the edible part of the pumpkin seed. Most pumpkin seeds have a white outer hull and are light green once it is removed; some cultivars are hull-less and are grown only for their edible seed.',
          'That difference determines the processing: a thick, leathery hull has to be removed mechanically, while hull-less varieties skip the dehulling step altogether.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: [
          'Pumpkin seed kernels are used both as a visible topping and as an ingredient:',
        ],
        list: [
          'Bread and bakery products',
          'Roasted and seasoned snacks',
          'Mexican dishes, where the seeds are a common ingredient',
          'Pressing for pumpkin seed oil',
        ],
      },
      {
        heading: 'What Buyers Usually Check',
        paragraphs: [
          'The quality parameters for pumpkin seed kernels are agreed between buyer and supplier in the product specification. For the comparable product — sunflower kernels — the specification published by the US National Sunflower Association lists kernel size, foreign material including shells and unhulled seed, moisture, damage, broken kernels and chips, and colour, odour and flavour. Setting out the pumpkin seed parameters in the same detail is what prevents disputes on delivery.',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'Pumpkin seed kernels are rich in oil: dried, roasted seeds are about 49 percent fat. Heat and light accelerate the reaction of fats with oxygen, so store the kernels cool, dry and dark in airtight packaging.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Wholesale pumpkin seed kernel prices depend on type, grade, volume, packaging and delivery terms. Share your requirement through the quotation form and our team will come back to you.',
        ],
      },
    ],
    faq: [
      {
        question: 'Are pumpkin seed kernels traded raw?',
        answer:
          'Raw and roasted product are both traded. US customs classification rulings cover raw, hulled pumpkin seed kernels as well as roasted pumpkin seeds; which one a buyer chooses depends on the processing the final product needs.',
      },
      {
        question: 'What are hull-less pumpkin seeds?',
        answer:
          'Some pumpkin cultivars are hull-less and are grown only for their edible seed, so no hull has to be removed. Seeds with a thick hull are dehulled mechanically instead.',
      },
      {
        question: 'How should pumpkin seed kernels be stored?',
        answer:
          'Cool, dry and away from light, in airtight packaging. Heat and light speed up the reaction of the oil with oxygen, which is what turns kernels rancid.',
      },
    ],
    sources: cite(
      'en',
      'wikiPumpkinSeed',
      'pumpkinHullless',
      'nsaKernelSpec',
      'wikiRancidification',
      'cbpHulledPumpkinSeeds',
      'cbpRoastedPumpkinSeeds',
    ),
    relatedGuides: ['buying-nuts-wholesale', 'nut-export-documents'],
  },
  {
    id: 'sunflower-kernels',
    slug: 'sunflower-kernels',
    name: 'Sunflower Seed Kernels',
    metaTitle: 'Sunflower Kernels, Bulk and Wholesale',
    metaDescription:
      'Wholesale sunflower seed kernels: confectionery and oilseed types, what a kernel specification defines, applications, HS code 1206.00 and quotations.',
    eyebrow: 'Products',
    heading: 'Sunflower Seed Kernels, Wholesale',
    lead: 'Sunflower seed kernels are hulled sunflower seeds, sold raw or roasted and used in bread and other baked goods and in snack mixes. Raymar Nuts supplies sunflower seed kernels to corporate buyers.',
    image: libraryImages.sunflowerKernels,
    imageAlt: 'Sunflower seed kernels — hulled, loose',
    sections: [
      {
        heading: 'What Are Sunflower Seed Kernels?',
        paragraphs: [
          'When a sunflower seed is dehulled, the edible remainder is called the kernel or heart. Mechanically dehulled kernels are sold raw or roasted and are added to bread and other baked goods for their flavour.',
          'Seeds are classified by the pattern on their husks: solid black husks mark the oilseed types, usually pressed for their oil, while striped seeds are eaten mainly as a snack food and are therefore called confectionery sunflower seeds.',
        ],
      },
      {
        heading: 'Kernels from Confectionery and Oilseed Types',
        paragraphs: [
          'Both types can be dehulled. According to NDSU’s sunflower production guide, oilseed varieties have a thin hull that adheres to the kernel and contain 38 to 50 percent oil; confectionery types have a thicker hull that stays loosely attached, which permits more complete dehulling. Confectionery seed is larger, with a lower oil percentage and test weight.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: ['Sunflower seed kernels are used in:'],
        list: [
          'Bread and bakery products',
          'Snack and trail mixes',
          'Salads and garnishes',
          'Roasted and salted snacks',
        ],
      },
      {
        heading: 'What Buyers Usually Check',
        paragraphs: [
          'The kernel specification published by the US National Sunflower Association shows what a buyer defines:',
          'The same document describes the flavour as “good, typical, mild”, the odour as “good, clean, fresh” and the colour as off-white to grey.',
        ],
        list: [
          'Size: kernel count per ounce (about 28 g)',
          'Foreign material: including shells and unshelled seed',
          'Moisture: at or below 8 percent',
          'Damage: distinctly discoloured or insect-damaged kernels',
          'Broken kernels and chips: anything smaller than half a kernel',
          'Sticktites: kernels with a piece of shell still adhering',
        ],
      },
      {
        heading: 'Storage and HS Code',
        paragraphs: [
          'Dried sunflower seeds are about 51 percent fat, and heat and light accelerate the reaction of that oil with oxygen. Store kernels cool, dry and dark in airtight packaging.',
          'In the 2022 edition of the Harmonized System, heading 12.06 covers “sunflower seeds, whether or not broken” and has the single subheading 1206.00. Roasted, salted or otherwise prepared seeds fall in heading 20.08 instead; US customs classified roasted and salted in-shell sunflower seeds under 2008.19. Confirm the full national tariff line for your market, and use a binding tariff information decision where the classification has to be certain.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Wholesale prices depend on grade, volume, packaging and delivery terms. Share your requirement through the quotation form and our team will come back to you.',
        ],
      },
    ],
    faq: [
      {
        question:
          'What is the difference between confectionery and oilseed sunflower seeds?',
        answer:
          'Solid black-husked oilseed types are pressed mainly for oil; striped confectionery types are grown for eating. NDSU puts the oil content of oilseed varieties at 38 to 50 percent, while confectionery seed is larger and lower in oil. Kernels are produced from both.',
      },
      {
        question: 'What are sunflower kernels used for?',
        answer:
          'Mechanically dehulled kernels are sold raw or roasted and are used in bread and other baked goods, in snack mixes, on salads and as a garnish.',
      },
      {
        question: 'What is the HS code for sunflower seeds?',
        answer:
          'Raw sunflower seeds, whether or not broken, are classified under HS 1206.00; roasted or salted seeds fall in heading 20.08. National tariff lines add further digits, so confirm the full code for your market.',
      },
    ],
    sources: cite(
      'en',
      'wikiSunflowerSeed',
      'ndsuSunflowerGuide',
      'nsaKernelSpec',
      'wcoHs2022Ch12',
      'wcoHs2022Ch20',
      'cbpRoastedSunflowerSeeds',
      'tariffFaq',
      'wikiRancidification',
    ),
    relatedGuides: ['buying-nuts-wholesale', 'nut-export-documents'],
  },
  {
    id: 'in-shell-sunflower-seeds',
    slug: 'in-shell-sunflower-seeds',
    name: 'In-Shell Sunflower Seeds',
    metaTitle: 'In-Shell Sunflower Seeds, Wholesale',
    metaDescription:
      'Wholesale in-shell sunflower seeds for roasters, packers and distributors: large-seeded confectionery varieties, market preferences, storage and quotes.',
    eyebrow: 'Products',
    heading: 'In-Shell Sunflower Seeds, Wholesale',
    lead: 'In-shell sunflower seeds are widely eaten as a snack in Türkiye, as they are across the Mediterranean, Eastern Europe and Asia: roasted in the shell and sold plain, salted or flavoured. Raymar Nuts supplies in-shell sunflower seeds to roasters, packers and distributors.',
    image: libraryImages.sunflowerInShell,
    imageAlt: 'In-shell sunflower seeds — loose',
    sections: [
      {
        heading: 'What Are In-Shell Sunflower Seeds?',
        paragraphs: [
          'Snack sunflower seeds come from large-seeded confectionery varieties grown for eating. NDSU’s production guide notes that this production is geared to the in-shell market, that growers are often paid on the percentage of large seed, and that quality standards for confectionery sunflower are high, with little tolerance for off-colour and insect damage.',
          'A review published by the Trakya Agricultural Research Institute of Türkiye’s Ministry of Agriculture and Forestry describes confectionery types as larger and longer than oilseed types, with a higher hull share and an oil content of around 25 to 35 percent. The same review reports that grey-and-white striped types are the most sought after on the Turkish market, while the Balkans favour black, medium-sized seed.',
        ],
      },
      {
        heading: 'Who Buys Them',
        paragraphs: ['Wholesale in-shell sunflower seeds are mainly bought by:'],
        list: [
          'Nut roasters and snack manufacturers',
          'Retail packers',
          'Wholesale nut distributors',
          'Suppliers to supermarket chains and other retailers',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'In-shell seeds are more robust than kernels, but they should still be kept cool, dry and ventilated, away from direct sunlight and moisture. NDSU calls aeration essential for controlling seed temperature in store and notes that cooling reduces deterioration from insects and mould; the same guide advises against storing confectionery sunflower above 11 percent moisture in winter and 10 percent in summer.',
          'Lots with a high proportion of hulled or immature seed deteriorate faster in storage. For roasted product, airtight packaging helps keep it fresh.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Wholesale prices depend on seed size, volume and packaging. Share your requirement through the quotation form and our team will come back to you.',
        ],
      },
    ],
    faq: [
      {
        question: 'Are in-shell sunflower seeds the same as sunflower kernels?',
        answer:
          'No. In-shell seeds are eaten from the shell, usually roasted, the hull cracked open between the teeth. Sunflower kernels are hulled seeds, sold raw or roasted and also used in bread and other baked goods.',
      },
      {
        question: 'How should in-shell sunflower seeds be stored?',
        answer:
          'Cool, dry and ventilated, away from sunlight. NDSU calls aeration essential in store and notes that cooling the seed reduces deterioration; for roasted product, airtight packaging helps keep it fresh.',
      },
    ],
    sources: cite(
      'en',
      'ttaeConfectionerySunflower',
      'ndsuSunflowerGuide',
      'wikiSunflowerSeed',
      'wikiRancidification',
    ),
    relatedGuides: ['buying-nuts-wholesale'],
  },
  {
    id: 'macadamia',
    slug: 'macadamia-nuts',
    name: 'Macadamia Nuts',
    metaTitle: 'Macadamia Nuts, Wholesale',
    metaDescription:
      'Wholesale macadamia kernels: how Style 0 to Style 8 are defined, which style suits which application, storage temperature, HS code 0802.62 and quotes.',
    eyebrow: 'Products',
    heading: 'Macadamia Nuts, Wholesale',
    lead: 'With their cream colour and mild, buttery flavour, macadamias are used in chocolate, bakery, ice cream and snack mixes. Raymar Nuts supplies macadamia nuts to corporate buyers.',
    image: libraryImages.macadamia,
    imageAlt: 'Macadamia nuts — in shell, some cracked open to show the cream kernel',
    sections: [
      {
        heading: 'What Are Macadamia Nuts?',
        paragraphs: [
          'Macadamia is a genus of four tree species in the family Proteaceae, indigenous to Australia — north-eastern New South Wales and central and south-eastern Queensland — of which two are grown commercially for their fruit. The shell is extremely hard: ordinary nutcrackers apply insufficient force, and commercial deshelling uses rotating steel rollers. Food manufacturers therefore work with the kernel; in Australia, for example, most of the crop is cracked by processors and sold as kernel.',
          'Turkish calls the nut “makademya fındığı”, literally macadamia hazelnut, but macadamia belongs to the Proteaceae and hazel (Corylus) to the birch family, Betulaceae: the two plants are not closely related.',
        ],
      },
      {
        heading: 'Kernel Styles: Style 0 to Style 8',
        paragraphs: [
          'Macadamia kernels are traded in numbered styles. In the Australian Macadamia Society’s kernel product quality standard, each style combines a minimum share of whole or half kernels with a size range in millimetres:',
          'Definitions differ slightly between industry bodies: in the macadamia specification of the US Association of Food Industries, Style 1 is 16–20 mm and Style 8 is “fines or meal”. Confirm the exact style definitions in the specification; our guide to macadamia kernel styles lists all of them.',
        ],
        list: [
          'Style 0 — min 95 percent whole kernel, over 20 mm',
          'Style 1 — min 90 percent whole kernel, 17–20 mm',
          'Style 2 — min 50 percent whole kernel, over 13 mm',
          'Style 4L — min 80 percent halves, over 13 mm',
          'Styles 5, 6 and 7 — pieces of 8–12, 5–9 and 3–6 mm',
          'Style 8 — pieces and meal under 4 mm',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: [
          'The Australian industry’s matrix of recommended applications maps the styles as follows:',
        ],
        list: [
          'Snacking: whole kernels and large halves (Styles 0–4L)',
          'Chocolate and confectionery: everything from wholes to pieces (Styles 1–6) and paste',
          'Baking: halves, pieces and meal (Styles 4L–8) and paste',
          'Ice cream and desserts: pieces (Styles 5–7) and paste',
        ],
      },
      {
        heading: 'Storage and HS Code',
        paragraphs: [
          'Macadamia kernels are high in oil and sensitive to heat, light and oxygen. The Australian Macadamia Society recommends storing kernel below 12 °C in appropriate packaging; the AFI specification gives optimal storage as 5–10 °C at no more than 1.8 percent moisture and in the absence of oxygen, for a best-before date of up to 24 months.',
          'In the 2022 edition of the Harmonized System, macadamia nuts in shell are classified under 0802.61 and shelled kernels under 0802.62. Roasted, salted or otherwise prepared macadamias fall in heading 20.08 (2008.19) instead. Confirm the full national tariff line for your market.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Wholesale macadamia prices depend on kernel style, volume, packaging and delivery terms. Share your requirement through the quotation form.',
        ],
      },
    ],
    faq: [
      {
        question: 'Where do macadamia nuts come from?',
        answer:
          'Macadamia is indigenous to Australia. According to the INC, South Africa produced 32 percent of the 2024 world crop on a kernel basis, ahead of China and Australia with 19 percent each, Kenya with 10 percent and the USA with 4 percent.',
      },
      {
        question: 'Which macadamia style suits which application?',
        answer:
          'In the Australian industry’s recommended-applications matrix, wholes and large halves (Styles 0–4L) suit snacking, halves, pieces and meal suit baking, and pieces (Styles 5–7) suit ice cream and desserts; chocolate and confectionery use everything from wholes to pieces.',
      },
      {
        question: 'What is the HS code for macadamia nuts?',
        answer:
          'Raw (unroasted) shelled macadamia kernels are classified under HS 0802.62 and macadamia nuts in shell under 0802.61; roasted or prepared product falls under 2008.19. National tariff lines add further digits.',
      },
    ],
    sources: cite(
      'en',
      'amsKernelStandard',
      'amsTechnicalGuide',
      'afiMacadamiaSpec',
      'wikiMacadamia',
      'wikiHazel',
      'incYearbook2024',
      'wcoHs2022Ch08',
      'wcoHs2022Ch20',
    ),
    relatedGuides: [
      'what-is-macadamia',
      'macadamia-kernel-styles',
      'buying-nuts-wholesale',
    ],
  },
  {
    id: 'pecans',
    slug: 'pecan-nuts',
    name: 'Pecans',
    metaTitle: 'Pecan Nuts, Wholesale',
    metaDescription:
      'Wholesale pecan nuts: how the US standard sizes and colours shelled pecans, uses in bakery and confectionery, storage life by temperature and quotes.',
    eyebrow: 'Products',
    heading: 'Pecan Nuts, Wholesale',
    lead: 'With their rich, buttery flavour, pecans are used above all in sweet desserts such as pecan pie, in bakery and in confectionery. Raymar Nuts supplies pecans to corporate buyers.',
    image: libraryImages.pecan,
    imageAlt: 'Pecans — in-shell and kernel, close up',
    sections: [
      {
        heading: 'What Are Pecans?',
        paragraphs: [
          'The pecan (Carya illinoinensis) is a species of hickory native to the southern United States and northern Mexico, in the region of the Mississippi River. The nut is brown, cylindrical and thin-shelled, and grows inside a four-winged husk; the kernel consists of two halves.',
          'According to the INC’s 2024 yearbook, Mexico accounted for 44 percent and the USA for 43 percent of world pecan production in 2023/24 on a kernel basis, with South Africa third at 7 percent.',
        ],
      },
      {
        heading: 'How Pecans Differ from Walnuts',
        paragraphs: [
          'Pecans belong to the same family as walnuts — Juglandaceae — but to a different genus, Carya, the hickories, while walnuts are Juglans. The pecan nut is thin-shelled and elongated, whereas a walnut shell is wrinkled. Our guide on pecans versus walnuts compares the two in detail.',
        ],
      },
      {
        heading: 'Size and Colour Classifications',
        paragraphs: [
          'The US standards for shelled pecans classify halves by the number of halves per pound (454 g): Mammoth 250 or less, Junior Mammoth 251–350, Jumbo 351–450, Large 451–550, Medium 551–650, Topper 651–750 and King Topper 751 or more. A lot can also be specified directly as a count or a range of counts per pound.',
          'The same standard defines four colour classifications — Light, Light Amber, Amber and Dark Amber — against the USDA colour standards PEC-MC-1, which illustrate the intensities behind the terms golden, light brown, medium brown and dark brown.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: ['Pecans are mainly used in:'],
        list: [
          'Pecan pie, cakes and cookies',
          'Pralines and confectionery',
          'Ice cream and chilled desserts',
          'Snack and nut mixes',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'According to New Mexico State University’s storage guide, a good-quality pecan kernel is 73 to 75 percent oil, so rancidity develops at warm temperatures and is more noticeable than in most other nuts. Its table gives shelled pecans about 3 months at 21 °C, 12 months at 0–2 °C and 24 to 60 months at −18 °C; pieces keep less well than halves.',
          'Pecan kernels readily absorb odours from their surroundings, so the store should be free of odorous materials and the product kept in moisture- and odour-tight packaging. Use cold storage for stock held over longer periods.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Wholesale pecan prices generally depend on form, kernel size, volume, packaging and delivery terms. Share your requirement through the quotation form.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is a pecan a walnut?',
        answer:
          'No. Pecans belong to the same family as walnuts, Juglandaceae, but to a different genus — Carya, the hickories. They are native to the southern United States and northern Mexico; the nut is elongated and thin-shelled, with a rich, buttery flavour.',
      },
      {
        question: 'How are shelled pecans sized?',
        answer:
          'The US standard sizes pecan halves by count per pound, from Mammoth (250 or less) to King Topper (751 or more), and a lot may also be specified as an exact count or a range of counts.',
      },
      {
        question: 'How long do pecans keep?',
        answer:
          'New Mexico State University gives shelled pecans about 3 months at 21 °C, 12 months at 0–2 °C and 24 to 60 months at −18 °C. Pieces keep less well than halves, and kernels readily pick up odours from their surroundings.',
      },
    ],
    sources: cite(
      'en',
      'wikiPecan',
      'feisPecan',
      'usdaShelledPecans',
      'incYearbook2024',
      'nmsuStoringPecans',
      'ucanrNutSafety',
    ),
    relatedGuides: ['pecan-vs-walnut', 'buying-nuts-wholesale'],
  },
  {
    id: 'pistachios',
    slug: 'pistachios',
    name: 'Pistachios',
    metaTitle: 'Pistachios, Wholesale: In-Shell and Kernels',
    metaDescription:
      'Wholesale pistachios: in-shell nuts, kernels and early-harvest “boz” green kernels, the Antep designation of origin, uses, HS code 0802.52 and quotes.',
    eyebrow: 'Products',
    heading: 'Pistachios, Wholesale',
    lead: 'Pistachios are used in everything from baklava to ice cream; the most intensely green kernels come from early-harvest “boz” nuts. Raymar Nuts supplies pistachios to corporate buyers.',
    image: libraryImages.pistachio,
    imageAlt: 'Pistachio kernels — green, loose',
    sections: [
      {
        heading: 'Antep Pistachios: Where the Name Comes From',
        paragraphs: [
          'Gaziantep, historically Aintab and still informally called Antep, lends its name to the Turkish word for pistachio, “Antep fıstığı” — Antep nut. The city is the main centre for pistachio processing in Türkiye, with some 80 percent of the country’s processing.',
          'According to the USDA’s report on Türkiye, production is concentrated in two south-eastern provinces, Gaziantep and Şanlıurfa, which account for 80 percent of national output. The two Turkish types, Antep and Siirt, differ in size and shape from the pistachios grown in Iran and the USA; the Antep type is thinner and smaller than the Iranian nut.',
        ],
      },
      {
        heading: 'A Registered Designation of Origin',
        paragraphs: [
          '“Antep Fıstığı” is a registered designation of origin, entered as No. 27 at the Turkish Patent and Trademark Office by the Gaziantep Chamber of Commerce. According to the registration certificate, the geographical indication was announced in the Official Gazette of 22 April 2000, No. 24028, and registered with effect from that date; it is used by marking.',
          'The certificate names the varieties Uzun, Kırmızı, Halebi and Ohadi, whose kernel colour ranges from green through to yellow depending on the variety. Following an amendment published in Bulletin No. 190 of 3 February 2025, the geographical area covers 22 provinces, from Gaziantep and Şanlıurfa to Antalya, Aydın and Mersin.',
        ],
      },
      {
        heading: 'In-Shell, Kernels and Boz Kernels',
        paragraphs: ['Pistachios are traded in several forms:'],
        list: [
          'In shell: the kernels are often eaten whole, either fresh or roasted and salted.',
          'Kernels: shelled pistachios. The USDA reports that about 65 percent of Türkiye’s pistachios go into confectionery, above all baklava, with use in chocolate and ice cream growing over the past decade.',
          'Boz kernels: from nuts picked before full ripeness, roughly a month before the standard harvest. Prized for their dark green colour, they give baklava its characteristic golden-green colour and aroma.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: ['Pistachios are used in:'],
        list: [
          'Baklava and syrup-soaked pastries',
          'Ice cream and chilled desserts',
          'Chocolate and pralines',
          'Turkish delight, halva and confectionery',
          'Retail snack packing',
        ],
      },
      {
        heading: 'Storage and HS Code',
        paragraphs: [
          'Pistachio kernels are rich in oil and prone to rancidity, and heat and light accelerate the reaction of that oil with oxygen. Keep them cool, dry and dark in moisture- and odour-tight packaging.',
          'In the 2022 edition of the Harmonized System, pistachios in shell are classified under 0802.51 and shelled kernels under 0802.52; roasted and prepared products fall in heading 20.08 (2008.19). Confirm the full national tariff line for your market.',
        ],
      },
      {
        heading: 'Request a Quotation',
        paragraphs: [
          'Wholesale pistachio prices generally depend on form, size, volume and delivery terms. Share your requirement through the quotation form.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is boz iç pistachio?',
        answer:
          '“Boz iç” is the Turkish trade name for kernels from pistachios picked before full ripeness, roughly a month before the standard harvest. Their dark green colour is what gives baklava its characteristic colour and aroma.',
      },
      {
        question: 'Is Antep Fıstığı a protected name?',
        answer:
          '“Antep Fıstığı” is a designation of origin registered as No. 27 at the Turkish Patent and Trademark Office by the Gaziantep Chamber of Commerce. Since the 2025 amendment, the registered geographical area covers 22 provinces.',
      },
      {
        question: 'What is the HS code for shelled pistachios?',
        answer:
          'Raw (unroasted) shelled pistachios are classified under HS 0802.52 and pistachios in shell under 0802.51; roasted or prepared product falls under 2008.19. National tariff lines add further digits.',
      },
    ],
    sources: cite(
      'en',
      'turkpatentAntepFistigi',
      'gainTurkeyTreeNuts2022',
      'gainTurkeyTreeNuts2015',
      'bozPistachioHarvest',
      'pistachioSpread',
      'wikiGaziantep',
      'wikiPistachio',
      'wcoHs2022Ch08',
      'wcoHs2022Ch20',
    ),
    relatedGuides: ['buying-nuts-wholesale', 'aflatoxin-in-nuts', 'nut-export-documents'],
  },
]
