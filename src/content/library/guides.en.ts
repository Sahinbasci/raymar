import { libraryImages } from './images'
import { cite } from './sources'
import type { GuidePage } from './types'

/*
 * English guides.
 *
 * Same topics and ids as the Turkish guides, written for an English-speaking
 * buyer rather than translated sentence by sentence: the export-documents guide
 * reads from the importer's side of the shipment, and the macadamia guide drops
 * the Turkish spelling question an English reader never asks.
 *
 * Same accuracy rule: general, verifiable information. Where requirements vary
 * by product, destination and date (documents, customs), nothing is stated as a
 * rule without its source, and the reader is pointed at the authority that
 * decides. "Türkiye" in body copy, as everywhere else on the English site.
 */
const PUBLISHED = '2026-09-15'
/** The source check of 2026-09-18 rewrote every guide against its references. */
const UPDATED = '2026-09-18'
/** The guides added in the second wave, researched and written on this date. */
const ADDED = '2026-09-21'

export const guidesEn: readonly GuidePage[] = [
  {
    id: 'walnut-kernel-grades',
    slug: 'walnut-kernel-grades',
    metaTitle: 'Walnut Kernel Grades: Halves to Small Pieces',
    metaDescription:
      'Walnut halves, quarters, pieces and small pieces: how the USDA, UNECE and Turkish standards define each size, and which size suits which product.',
    eyebrow: 'Guide',
    heading: 'Walnut Kernel Grades: Halves, Quarters, Pieces and Small Pieces',
    lead: 'Walnut kernels are traded in distinct sizes once they leave the shell. The names differ by standard: the USDA, UNECE and the Turkish standard TS 1276 each name them their own way, and Turkish trade names such as “kırık” and “pirinç” do not map one to one onto the English ones. This guide explains what each size is, how the standards define it and where it is used.',
    image: libraryImages.walnutBroken,
    imageAlt: 'Walnut pieces in a lined carton',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Why Walnut Kernels Are Sized',
        paragraphs: [
          'When walnuts are cracked, some kernels come out as halves and others break into pieces of different sizes. After cracking, kernels are sorted and passed over sieves that separate them by piece size, and the standards define the sizes by those sieve openings.',
          'Each size suits a different use, and price varies with size too: the USDA’s 2024 report on Ukraine records halves trading at a premium to pieces in that market.',
        ],
      },
      {
        heading: 'The Turkish Standard: Six Types',
        paragraphs: [
          'TS 1276, the standard applied in Türkiye’s export quality control, divides walnut kernels by size into six types:',
        ],
        list: [
          'Yarım (halves): a whole kernel split into two roughly equal parts',
          'Çeyrek (quarters): a whole kernel split lengthways into four roughly equal parts',
          'Büyük (large pieces): portions smaller than three-quarters of a half but larger than kırık',
          'Kırık (pirinç): portions that pass an 8 mm sieve but not a 3 mm one',
          'Küçük (small): portions smaller than a quarter that do not pass a 3 mm sieve',
          'Yarım ve büyük: a mix of halves and large pieces',
          'Note: the standard defines “küçük” by comparison with a quarter rather than by an upper sieve, so its range overlaps kırık (pirinç). State the sieve range next to the type name on an order.',
        ],
      },
      {
        heading: 'Walnut Halves',
        paragraphs: [
          'A half is a kernel split into two roughly equal parts, and the most uniform-looking size. In the USDA standard a lot counts as “halves” when at least 85 percent of it, by weight, is half kernels.',
          'California Walnuts recommends halves for products that show the walnut’s natural shape: confectionery, garnishing and decorating baked goods, and nut mixes.',
        ],
      },
      {
        heading: 'Walnut Quarters',
        paragraphs: [
          'A quarter is a kernel split lengthways into four; TS 1276 and UNECE DDP-02 define the type the same way. The USDA standard has no separate quarters class — quarters fall within its “pieces”.',
          'Quarters are used in bakery products such as cakes, cookies and bread, where the walnut should be felt as large pieces.',
        ],
      },
      {
        heading: 'Walnut Pieces',
        paragraphs: [
          'Walnut pieces are irregular portions smaller than quarters and larger than small pieces; this size is the “büyük” type in TS 1276 and “large pieces” in UNECE DDP-02. Remember that TS 1276’s own “kırık (pirinç)” is the smallest type, not this one — while the Turkish trade, Raymar included, sells this larger size as “kırık ceviz içi”.',
          'California Walnuts recommends medium pieces for baking mixes and chocolate candy bars, where flavour and texture should be even throughout, and large pieces for ice cream and bars.',
        ],
      },
      {
        heading: 'Small Pieces',
        paragraphs: [
          'Small pieces are the smallest size. TS 1276 defines this type, under the name “kırık (pirinç)”, as portions that pass an 8 mm sieve but not a 3 mm one.',
          'California Walnuts notes that small pieces spread evenly through premixed bakery blends. Walnut baklava and kadayıf are also made with finely chopped walnuts.',
        ],
      },
      {
        heading: 'Which Size for Which Product?',
        paragraphs: ['California Walnuts’ size recommendations, in short:'],
        list: [
          'Confectionery, garnishing and nut mixes: halves',
          'Ice cream, bars and toppings for baked goods: large pieces',
          'Baking mixes and chocolate candy bars: medium pieces',
          'Seasoning and breading mixes, baking mixes, ice-cream toppings: small pieces',
        ],
      },
      {
        heading: 'Check the Colour Grade Too',
        paragraphs: [
          'Walnut kernels are graded by colour as well as size, and the USDA standard requires the colour class to be stated together with the size class — “Light Halves”, for example. We explain the colour grades in a separate guide.',
        ],
      },
    ],
    faq: [
      {
        question: 'Are walnut pieces a lower-quality product?',
        answer:
          'No. In TS 1276 and UNECE DDP-02 the quality class (Extra, Class I, Class II) is graded separately from size, so any size can be in any class. The difference is piece size; UC Davis reports that diced nuts keep for roughly half as long as whole ones.',
      },
      {
        question: 'Are small pieces the same as walnut meal?',
        answer:
          'No. Small pieces are, by the standard, portions between 3 and 8 mm. Walnut meal is the finest form of walnut, ranging from a coarse meal to a fine powder.',
      },
      {
        question: 'Which walnut size is used for baklava?',
        answer:
          'Walnut baklava is usually made with finely chopped walnuts. The standards have no “baklava” size, so specify the TS 1276 type or the size range on the order.',
      },
    ],
    sources: cite(
      'en',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'cwSizeChart',
      'ucDavisDicedNuts',
      'gainUkraineTreeNuts2025',
      'wikiBaklava',
      'vikipediKadayif',
    ),
    relatedProducts: ['walnut-kernels'],
  },
  {
    id: 'walnut-colour-grades',
    slug: 'walnut-kernel-colour-grades',
    metaTitle: 'Walnut Colour Grades: Extra Light to Amber',
    metaDescription:
      'What Extra Light, Light, Light Amber and Amber mean: the USDA colour classes, how the Turkish standard handles colour, why kernel colour varies, and flavour.',
    eyebrow: 'Guide',
    heading: 'Walnut Kernel Colour Grades: Extra Light, Light, Light Amber and Amber',
    lead: 'Alongside size, colour is the main feature a walnut kernel is traded on. The USDA standard describes kernel colour, from lightest to darkest, as Extra Light, Light, Light Amber and Amber; the Turkish standard TS 1276 ties colour to quality class instead. This guide explains what the grades mean and how they affect a purchase.',
    image: libraryImages.walnutPaleHalves,
    imageAlt: 'Pale, intact walnut halves — close up',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'What a Colour Grade Describes',
        paragraphs: [
          'The colour grade describes the thin skin around the kernel. The USDA standard defines four classes from its Walnut Color Chart: Extra Light, Light, Light Amber and Amber. There is a separate “red” description for red-skinned varieties, and “off color” is not a colour class at all.',
          'Researchers at the University of California, Davis note that these four classes are widely used in walnut grading, and that a lighter skin earns a better grade and a higher price.',
        ],
      },
      {
        heading: 'Colour in TS 1276: Quality Classes',
        paragraphs: [
          'The Turkish standard TS 1276 uses no colour names; it ties colour to quality class:',
        ],
        list: [
          'Extra: light-coloured throughout, with no dark, lemon-yellow or dark-brown marks',
          'Class I: no darker than light brown or lemon-yellow',
          'Class II: no darker than dark brown; darker kernels may be included but must be marked',
        ],
      },
      {
        heading: 'Why Kernel Colour Varies',
        paragraphs: ['Research points to these factors:'],
        list: [
          'Variety: skin colour is heritable; Chandler, for example, gives lighter kernels than Jamal.',
          'Growing conditions: excessive sun and heat stress darken kernels.',
          'Harvest and drying: late harvest and drying air above 43 °C darken the kernel.',
          'Storage: in long storage, phenolics in the skin react with oxygen and darken it; cold storage limits this.',
        ],
      },
      {
        heading: 'Colour and Flavour',
        paragraphs: [
          'California Walnuts describes Light kernels as earthy and mild, with subtle tannins, and Light Amber kernels as more robust, with round tannins and a slightly sweet finish.',
          'Not every use needs the lightest grade: California Walnuts describes Light Amber as the more economical choice. Lighter grades suit products where the walnut shows; where it disappears into a dough or a filling, darker grades can also be considered.',
        ],
      },
      {
        heading: 'Size and Colour Are Quoted Together',
        paragraphs: [
          'The USDA standard requires the colour class to be stated together with the size class. “Light Halves” means halves in the Light class; “Light Amber Pieces” means pieces (the USDA “pieces” class) in the Light Amber class.',
          'Specifying both size and colour when you ask for quotes makes offers easier to compare and keeps what arrives in line with what you expected.',
        ],
      },
      {
        heading: 'Where Each Grade Is Used',
        paragraphs: ['California Walnuts’ application ideas for each colour grade:'],
        list: [
          'Light: puréed for light-coloured dressings and sauces; chopped for crusts and coatings; sprinkled on tarts, confections and salads',
          'Light Amber: toasted and puréed for sauces and spreads; with rich chocolate desserts; finely chopped for coating and frying',
        ],
      },
    ],
    faq: [
      {
        question: 'What does “light halves” mean?',
        answer:
          '“Light halves” is a trade description based on the USDA colour classes: “light” is the colour class and “halves” the size.',
      },
      {
        question: 'Are dark walnut kernels spoiled?',
        answer:
          'Not on colour alone. In a UC Davis study, peroxide values did not differ between light and dark kernels; colour also reflects variety and growing conditions. A paint-thinner smell, a soft texture or visible mould are what indicate spoilage.',
      },
    ],
    sources: cite(
      'en',
      'usdaShelledWalnuts',
      'ts1276Gazette',
      'cwSizeColor',
      'walnutSkinLightness',
      'ucanrDehydration',
      'ucanrHomeOrchardNuts',
      'cwHandlingStorage',
      'cwBuyCare',
    ),
    relatedProducts: ['walnut-kernels'],
  },
  {
    id: 'storing-walnut-kernels',
    slug: 'how-to-store-walnut-kernels',
    metaTitle: 'How to Store Walnut Kernels and Slow Rancidity',
    metaDescription:
      'Why walnut kernels go rancid and whether to refrigerate or freeze them: the storage conditions the standards and walnut industry recommend for bulk stock.',
    eyebrow: 'Guide',
    heading: 'How to Store Walnut Kernels: Conditions That Slow Rancidity',
    lead: 'Walnut kernels are rich in oil, which makes them prone to rancidity through oxidation, and room temperature speeds the process up. For bulk buyers, storage conditions directly affect the quality of the product. This guide explains why walnut kernels deteriorate and the storage conditions the sources recommend.',
    image: libraryImages.walnutSmall,
    imageAlt: 'Small walnut pieces — the finest size, loose',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Why Walnut Kernels Go Rancid',
        paragraphs: [
          'Most nuts are high in monounsaturated fatty acids, but about 72 percent of walnut oil is polyunsaturated. These fats react with oxygen and turn rancid; according to California Walnuts, rancid walnuts smell like paint thinner.',
          'Rancidity is not staleness: the USDA standard distinguishes a stale kernel, whose flavour is flat but not objectionable, from a rancid one. Heat and light speed up the reaction of fats with oxygen, and hot, humid conditions encourage mould.',
        ],
      },
      {
        heading: 'Basic Storage Rules',
        paragraphs: [
          'The recommendations of California Walnuts and TS 1276 come down to these rules:',
        ],
        list: [
          'Keep them cool: below 10 °C short term, and 0–5 °C for storage of up to six months.',
          'Keep them dry: below 65 percent relative humidity; TS 1276 asks for below 50 percent for kernels held for long periods.',
          'Keep out light and air: use packaging that lets neither in.',
          'Keep them away from odours: walnuts absorb odours they are exposed to over time.',
          'Rotate stock: first in, first out.',
        ],
      },
      {
        heading: 'Can Walnut Kernels Be Refrigerated or Frozen?',
        paragraphs: [
          'Yes. California Walnuts advises refrigerating walnuts for storage of up to six months and freezing them for longer; what matters is an airtight container and distance from strong-smelling foods.',
          'Condensation can be a problem when nuts come out of frozen storage; postharvest specialists at UC Davis advise warming them to at least 7 °C first, then gradually to room temperature.',
        ],
      },
      {
        heading: 'Storing Bulk Stock',
        paragraphs: [
          'TS 1276 requires walnut kernels held for long periods to be kept in cold stores below 50 percent relative humidity. California Walnuts also recommends shipping walnuts in refrigerated trucks and containers during hot months.',
          'Packaging that keeps out light and air, and flushing the pack with nitrogen to replace the oxygen, extend the shelf life of unopened product. In one study, vacuum packaging and storage at 4 °C kept oxidation in walnut kernels lowest. First-in, first-out stock rotation keeps product from sitting in the warehouse longer than necessary.',
        ],
      },
      {
        heading: 'How to Tell If Walnut Kernels Have Gone Off',
        paragraphs: ['These signs suggest walnut kernels have deteriorated:'],
        list: [
          'A paint-thinner smell, or a sharp, bitter taste',
          'A soft or rubbery texture instead of a crisp one',
          'Visible mould',
          'Marked darkening in storage (not proof of spoilage on its own — check smell and taste too)',
        ],
      },
    ],
    faq: [
      {
        question: 'Do walnut kernels go bad?',
        answer:
          'Yes. Being rich in oil, walnut kernels oxidise and turn rancid over time. Storing them cool, dry and dark in airtight packaging slows the process, and California Walnuts notes that cold storage minimises rancidity.',
      },
      {
        question: 'Can walnut kernels be frozen?',
        answer:
          'Yes. California Walnuts recommends freezing for storage longer than six months. To avoid condensation, UC Davis advises warming frozen nuts to at least 7 °C first, then gradually to room temperature.',
      },
    ],
    sources: cite(
      'en',
      'wikiWalnut',
      'wikiRancidification',
      'usdaShelledWalnuts',
      'ts1276Gazette',
      'cwHandlingStorage',
      'cwUsageStorage',
      'cwBuyCare',
      'ucDavisDicedNuts',
      'walnutStorageVacuum',
      'walnutSkinLightness',
      'ucanrNutSafety',
      'codexAflatoxinTreeNuts',
    ),
    relatedProducts: ['walnut-kernels', 'pecans'],
  },
  {
    id: 'walnut-kernel-defects',
    slug: 'walnut-kernel-defects',
    metaTitle: 'Walnut Kernel Defects and Their Causes',
    metaDescription:
      'Why walnut kernels turn rancid, dark or shrivelled: how the standards define each defect, the measured mechanism, where it starts and how the grades count it.',
    eyebrow: 'Guide',
    heading: 'Why Walnut Kernels Turn Rancid, Dark or Shrivelled',
    lead: 'Three defects account for most disputes over a walnut lot: rancidity, darkening and shrivelling. Each has a written definition in the standards, a measured cause, and a place in the grade tables. This guide sets out where each one comes from and what slows it down.',
    image: libraryImages.walnutBroken,
    imageAlt: 'Walnut pieces in a lined carton',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'How the Standards Define These Defects',
        paragraphs: [
          'Defect names are used loosely in trade, but the UNECE standard layout for dry and dried produce defines each of them. Referring to those definitions in a specification is what keeps both sides talking about the same thing:',
        ],
        list: [
          'Rancidity: oxidation of lipids or free fatty acid production giving a characteristic disagreeable flavour. The same text warns that an oily appearance of the flesh does not necessarily indicate a rancid condition.',
          'Shrivelled and shrunken: a kernel that is abnormally wrinkled or flat, and/or dehydrated, dried out or tough.',
          'Insufficiently developed: a kernel that is misshapen, abnormally small or partially aborted — shrivelled and shrunken kernels are included in this term.',
          'Heat damage: damage caused by excessive heat during drying or processing, which significantly affects the flavour, appearance or edibility of the product.',
          'Discolouration: a significant and widespread change of the typical external or internal colour, in particular blackening and the appearance of very dark colours.',
        ],
      },
      {
        heading: 'Rancidity: the Cause and the Pace',
        paragraphs: [
          'Walnuts are among the nuts most prone to rancidity, and a study at the University of California says why: the kernel is roughly 65 to 70 percent oil, much of it polyunsaturated. Deterioration runs along two routes — lipid hydrolysis releases free fatty acids, and those acids are in turn more susceptible to oxidation.',
          'How fast it happens is a storage question. A Turkish review of nut storage notes that kernels stored in bulk can be starved of air, and that the pressure of the pile damages cell membranes and so accelerates rancidity; the same review reports that low temperature delays it. In practice that means a ventilated, cool and dark store rather than a high stack.',
        ],
      },
      {
        heading: 'Darkening: Pellicle, Oxygen and Temperature',
        paragraphs: [
          'Walnut darkening comes mainly from the oxidation of phenolic compounds in the pellicle — the thin skin around the kernel — by polyphenoloxidases, rather than from the Maillard browning seen in some other nuts. In a University of California trial on pellicle integrity, kernels whose pellicle was heavily damaged during shelling (20 to 22 percent of the surface) browned into the amber classes far more often, and their free fatty acid concentrations were always higher. The gentler the cracking, the lighter the lot stays.',
          'Oxygen and temperature decide the rest: below 6 kPa, kernels were protected from browning for three weeks, while at exactly 6 kPa about 20 percent went amber. Drying temperature matters directly too — UC ANR’s dehydration chapter states that the air should not exceed 110 °F (43 °C), because temperatures above that darken kernels and reduce their storage life. Delay works the same way: according to UC Cooperative Extension, most of the loss in quality occurs within the first nine hours after harvest, and kernels darken faster at higher temperatures.',
        ],
      },
      {
        heading: 'Shrivelling Usually Starts in the Orchard',
        paragraphs: [
          'A shrivelled kernel is generally the result of the growing season, not the warehouse. UC IPM’s walnut guidelines record that heavy aphid numbers cause leaf drop, exposing nuts to sunburn, which darkens or shrivels the kernels, and that the same infestation level in late summer results in shrivelled kernels at harvest. An early-season walnut husk fly infestation (late July to mid-August) likewise leads to shrivelled and darkened kernels and increased mould growth.',
          'Irrigation timing counts as well: terminating the water too early before harvest can lead to shrivelling of hulls and kernels with darkened pellicles, while over-irrigating keeps hulls green, delays drying and makes the nut more susceptible to kernel mould. The Turkish literature describes the same balance from the harvest side: nuts picked too early have not filled out, so immature kernels shrivel during drying, while a late harvest darkens both the shell and the kernel, and brings insect damage.',
        ],
      },
      {
        heading: 'How the Grades Count Them',
        paragraphs: [
          'These defects turn into numbers in the grade tables. In the US standard for shelled walnuts, shrivelling counts as “damage” when more than one-eighth of the portion of kernel is severely shrivelled, as “serious damage” above one-fourth and as “very serious damage” above 50 percent; mould and discolouration of the meat have their own thresholds. Rancidity and insect injury are not measured by area at all: any amount is very serious damage. U.S. No. 1, by definition, consists of kernels free from insect injury, decay and rancidity, and free from damage caused by shrivelling, mould or discolouration.',
          'The UNECE walnut kernel standard applies the same logic through tolerances: produce that is rancid or carries a foreign smell or taste is limited to 1 percent in Extra and Class I and 2 percent in Class II, and mouldy produce to 0.5, 1 and 2 percent respectively. The same standard requires walnut kernels to have a moisture content not exceeding 5.0 percent — dryness is the common condition on both the mould and the rancidity side.',
        ],
      },
      {
        heading: 'What Can Be Done',
        paragraphs: [
          'Three things help on the buyer’s side. First, write the defect names into the specification with their standard definitions, and refer to the class tolerance. Second, hold the lot cool, dry and dark, and in low-oxygen (vacuum) packaging where possible: the Codex code of practice for tree nuts recommends storage facilities with relative humidity below 70 percent and, if possible, a temperature between 0 °C and 10 °C, and the Turkish review pairs low temperature and humidity with vacuum conditions and darkness. Third, ask for the colour class separately from the size.',
          'Our guide on storing walnut kernels covers the storage conditions in detail, and the colour-grade guide covers the classes. One note: a bitter taste is not always rancidity — the Turkish Ministry of Agriculture and Forestry’s grower document records that walnut bacterial blight spreads into the kernel, changing its colour and turning the taste bitter.',
        ],
      },
    ],
    faq: [
      {
        question: 'Why do walnut kernels taste bitter or rancid?',
        answer:
          'Rancidity is, by the standard definition, the oxidation of lipids or the production of free fatty acids. A walnut kernel is roughly 65 to 70 percent oil, much of it polyunsaturated, and heat, light and oxygen accelerate the process. Diseases such as bacterial blight can also make the kernel taste bitter.',
      },
      {
        question: 'Why do walnut kernels go dark?',
        answer:
          'Darkening comes mainly from the oxidation of phenolic compounds in the pellicle. Pellicle damage during shelling, high oxygen, warm storage, drying air above 43 °C and a delayed harvest all speed it up.',
      },
      {
        question: 'Are shrivelled kernels a lower grade?',
        answer:
          'Shrivelling is a defined, measured defect: in the US standard, more than one-eighth of a kernel severely shrivelled counts as damage and more than one-fourth as serious damage. The cause is usually in the orchard and at harvest — early picking, water stress, sunburn or pest pressure.',
      },
    ],
    sources: cite(
      'en',
      'uneceStandardLayout',
      'uneceWalnutKernels',
      'usdaShelledWalnutsPdf',
      'ortizPellicle',
      'ucipmWalnut',
      'ucceWalnutSeason',
      'ucanrDehydration',
      'kibarNutStorage',
      'unalWalnutHarvest',
      'gkgmCeviz',
      'codexAflatoxinTreeNuts',
    ),
    relatedProducts: ['walnut-kernels', 'walnut-pieces'],
  },
  {
    id: 'walnut-harvest-season',
    slug: 'walnut-harvest-season',
    metaTitle: 'When Are Walnuts Harvested?',
    metaDescription:
      'When walnuts are harvested, how maturity is judged, what early and late picking cost, and the temperature and moisture target for drying after harvest.',
    eyebrow: 'Guide',
    heading: 'When Are Walnuts Harvested?',
    lead: 'Harvest timing is the single decision that most affects walnut kernel quality: nuts picked early have not filled out, and nuts picked late darken and pick up mould and pest damage. This guide covers the maturity index, the Turkish calendar and post-harvest drying.',
    image: libraryImages.walnutKernels,
    imageAlt: 'Walnut kernels — loose, close up',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'The Maturity Index: Packing Tissue Brown',
        paragraphs: [
          'Walnut maturity cannot be judged from the outside. The Turkish Ministry of Agriculture and Forestry’s grower document puts it in one sentence: because the green hull ripens after the kernel, determining harvest time in walnut differs from other species, and the harvest criterion is the packing tissue turning brown. The nut is cut open and inspected; when the tissue between the two kernel halves has turned brown, the kernel is mature.',
          'Californian practice rests on the same index. UC IPM’s guidelines state that walnut kernels are mature and of lightest colour and highest quality when the packing tissue between the kernel halves turns brown, and that harvest should be as close as possible to the point where most nuts have reached that stage. The same guidelines note that hull dehiscence usually comes later than kernel maturity, and that hot weather delays it further.',
        ],
      },
      {
        heading: 'The Harvest Calendar in Türkiye',
        paragraphs: [
          'In Türkiye the walnut harvest generally runs from mid-September to the end of October, and the Ministry of National Education’s growing module adds that early cultivars can be picked from mid-August. A peer-reviewed Turkish paper on harvest mechanisation gives the same window and notes that timing varies with cultivar, tree age and climate.',
          'Cultivar differences show up directly in the calendar. In the registered-cultivar booklet of the Atatürk Central Horticultural Research Institute, the harvest period is given as mid-September for Gültekin-1 and Yalova-1, late September for Bilecik, and “from 15 August onwards” for Kaplan-86.',
        ],
      },
      {
        heading: 'Three Field Triggers',
        paragraphs: [
          'Packing tissue brown is judged with a knife, and the practical thresholds that accompany it differ by source. It is worth knowing all three:',
        ],
        list: [
          'One third of the green hulls split (Turkish MEGEP growing module)',
          '80 percent of the nuts removable by shaking (harvest study in the BAHÇE journal)',
          'More than 95 percent of the nuts can be hulled (UC Cooperative Extension)',
        ],
      },
      {
        heading: 'What Early and Late Harvest Cost',
        paragraphs: [
          'Picking early costs weight and quality: the nuts have not filled out, so immature kernels shrivel during drying. Picking late brings darkening of the shell and the kernel colour, and worm damage. UC IPM records the same risk: if harvest is delayed or nuts remain on the ground too long, kernels may be damaged by high temperatures, moulds or navel orangeworms, which readily enter nuts after the husks have split.',
          'Even the hours within harvest day matter. According to UC Cooperative Extension, most of the loss in quality occurs within the first nine hours after harvest, so shaking should be planned for the cool part of the day and the nuts delivered promptly to the huller and dryer; kernels darken faster at higher temperatures.',
        ],
      },
      {
        heading: 'After Harvest: Drying',
        paragraphs: [
          'Harvested walnuts are dried at once. UC ANR’s dehydration chapter sets the target plainly: walnuts must be dried to 8 percent wet-basis moisture soon after harvest to maintain optimal storage life and quality, with air heated to no more than 110 °F (43 °C) — above that, kernels darken and storage life falls. Nuts arriving early in the season at 30 to 40 percent moisture need 24 to 36 hours of drying; at the end of the season they arrive nearly dry.',
          'Turkish sources give the same figures. The harvest-mechanisation paper states that the heated air should be between 38 and 43 °C, that higher temperatures lower fruit quality, and that walnuts are usually dried from 30–40 percent to 8 percent moisture within about 24 hours. The MEGEP module adds the standards side: under TSE, dried in-shell walnuts are required to be at 8 percent moisture and kernels at 5 percent, and the nuts should not be dried in direct sunlight.',
        ],
      },
      {
        heading: 'New Crop and the Trade Calendar',
        paragraphs: [
          'The “new crop” question in trade follows this calendar directly. In the USDA’s report on Türkiye the walnut marketing year begins in September; the same report notes that, depending on the year, around 45 to 55 percent of total Turkish walnut consumption is supplied from domestic production, the rest being imported. New-crop kernels reach the market in autumn, after harvest and drying; the previous year’s crop is judged on how it was stored.',
          'When you order, ask which crop year a lot comes from and how it has been stored — that is as decisive as size and colour class. Our guides explain what the kernel sizes mean and how kernels should be stored.',
        ],
      },
    ],
    faq: [
      {
        question: 'In which months are walnuts harvested in Türkiye?',
        answer:
          'Generally from mid-September to the end of October, with early cultivars picked from mid-August. Among registered Turkish cultivars, Kaplan-86 can be harvested from 15 August, Gültekin-1 and Yalova-1 in mid-September and Bilecik in late September.',
      },
      {
        question: 'How do you know a walnut is ripe?',
        answer:
          'The index is the packing tissue between the two kernel halves turning brown. In the field it is accompanied by hull split and by the nuts coming off the tree: the thresholds used are one third of hulls split, 80 percent removable by shaking, or more than 95 percent of them ready to hull, depending on the source.',
      },
      {
        question: 'What happens if the harvest is late?',
        answer:
          'Shell and kernel darken, and mould and insect damage become more likely. UC Cooperative Extension reports that most of the loss in quality occurs within the first nine hours after harvest, and that kernels darken faster the warmer they are.',
      },
    ],
    sources: cite(
      'en',
      'gkgmCeviz',
      'ucipmWalnut',
      'ucceWalnutSeason',
      'ucanrDehydration',
      'megepCeviz',
      'unalWalnutHarvest',
      'yalovaCultivars',
      'gainTurkeyTreeNuts2020',
    ),
    relatedProducts: ['walnut-kernels', 'walnut-halves'],
  },
  {
    id: 'pecan-vs-walnut',
    slug: 'pecan-vs-walnut',
    metaTitle: 'Pecan vs Walnut: The Differences Explained',
    metaDescription:
      'Pecan or walnut? How the two nuts differ in origin, shell, kernel colour, flavour, oil content and uses — a sourced comparison for buyers.',
    eyebrow: 'Guide',
    heading: 'Pecan vs Walnut: How the Two Nuts Differ',
    lead: 'Pecans and walnuts are related: both belong to the walnut family, Juglandaceae. They still differ in origin, appearance, flavour and use. This guide compares the two, with the sources for each point.',
    image: libraryImages.pecan,
    imageAlt: 'Pecans — in-shell and kernel, close up',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Origin and Classification',
        paragraphs: [
          'Walnuts and pecans belong to the same family, Juglandaceae, but to different genera: the walnut is a Juglans, while the pecan belongs with the hickories to the genus Carya.',
          'The common walnut, Juglans regia, is considered native to south-eastern Europe and south-western and Central Asia, though its exact natural range is obscured by its long history of cultivation. According to the International Nut and Dried Fruit Council (INC), China produced 51 percent and the United States 28 percent of the world’s walnuts in 2023/24. The pecan, Carya illinoinensis, is native to the southern United States and northern Mexico; according to the same source, Mexico produced 44 percent of the world crop and the United States 43 percent.',
        ],
      },
      {
        heading: 'Shell and Appearance',
        paragraphs: [
          'A walnut shell is wrinkled. The pecan is brown, cylindrical and thin-shelled.',
          'Kernel colour is graded on separate scales: the USDA standards grade walnut kernels from Extra Light to Amber, and pecan kernels on their own scale from golden to dark brown.',
        ],
      },
      {
        heading: 'Flavour and Use',
        paragraphs: [
          'The walnut’s thin skin contains tannins that give it a slightly astringent taste; the USDA standard adds that this astringency should not be confused with rancidity.',
          'In the United States the pecan is best known in sweet dishes such as pecan pie and pralines. Walnuts appear in desserts such as baklava, cakes and brownies, but also in savoury dishes such as muhammara.',
        ],
      },
      {
        heading: 'Oil Content',
        paragraphs: [
          'Both are rich in oil, but the two figures measure different things. According to New Mexico State University, a good-quality pecan kernel is 73–75 percent oil — a share of the kernel — and that oil is mostly oleic and linoleic acid. The comparable figure for walnut is that the kernel is roughly 65 to 70 percent oil. That about 72 percent of walnut oil is polyunsaturated describes the composition of the oil, not its share of the kernel.',
        ],
      },
      {
        heading: 'Applications',
        paragraphs: ['Where each nut stands out, according to the sources:'],
        list: [
          'Pecans: pecan pie, pralines, butter-pecan cookies, cakes and ice cream, snacking',
          'Walnuts: baklava and syrup-soaked pastries, cakes and brownies, muesli, dips such as muhammara',
        ],
      },
      {
        heading: 'Can They Replace Each Other?',
        paragraphs: [
          'When substituting one for the other in a recipe, allow for the difference in flavour and colour — above all where the astringency of the walnut skin is part of the character of the product.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is a pecan a walnut?',
        answer:
          'Botanically, no. The pecan (Carya illinoinensis) belongs to the walnut family, Juglandaceae, but to a different genus, Carya — the hickories. It is native to the southern United States and northern Mexico, with a cylindrical, thin shell.',
      },
      {
        question: 'How do pecans and walnuts differ in taste?',
        answer:
          'The walnut’s thin skin contains tannins that give it a slightly astringent taste. Pecans are best known in the United States in sweet dishes such as pecan pie and pralines.',
      },
    ],
    sources: cite(
      'en',
      'wikiJuglandaceae',
      'wikiWalnut',
      'wikiJuglansRegia',
      'wikiPecan',
      'vikipediPekan',
      'feisPecan',
      'incYearbook2024',
      'usdaShelledWalnuts',
      'usdaShelledPecans',
      'cwFlavor',
      'nmsuStoringPecans',
      'wikiMuhammara',
    ),
    relatedProducts: ['pecans', 'walnut-kernels'],
  },
  {
    id: 'what-is-macadamia',
    slug: 'what-are-macadamia-nuts',
    metaTitle: 'What Are Macadamia Nuts? Origin and Uses',
    metaDescription:
      'Where macadamia nuts come from, why their shell is so hard to crack, where they are grown today and how they are used in food production.',
    eyebrow: 'Guide',
    heading: 'What Are Macadamia Nuts? Origin, Characteristics and Uses',
    lead: 'Macadamia nuts are known for their creamy texture and mild, buttery flavour. This guide covers where they come from, what sets them apart and where they are used.',
    image: libraryImages.macadamia,
    imageAlt: 'Macadamia nuts — in shell, some cracked open to show the cream kernel',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Where Macadamia Comes From',
        paragraphs: [
          'Macadamia is a genus of four tree species in the family Proteaceae, indigenous to Australia — north-eastern New South Wales and central and south-eastern Queensland — and growing in the rainforests of the east. Two species, M. integrifolia and M. tetraphylla, are commercially important for their fruit.',
          'Ferdinand von Mueller, the German-Australian botanist, gave the genus its name in 1857 in honour of John Macadam, the Scottish-Australian chemist, medical teacher and politician born in Glasgow in 1827. Production has long since moved beyond Australia: on the INC’s 2024 figures, South Africa accounted for 32 percent of world production on a kernel basis, China and Australia for 19 percent each, Kenya for 10 percent and the USA for 4 percent.',
        ],
      },
      {
        heading: 'A Note on the Name',
        paragraphs: [
          'In Turkish, macadamia is often called “makademya fındığı” — literally “macadamia hazelnut” — although macadamia belongs to the Proteaceae and hazel (Corylus) to the birch family, Betulaceae, so the two plants are not closely related. The nutrition differs too: raw macadamias are about 76 percent fat and 8 percent protein, raw hazelnuts 61 percent fat and 15 percent protein.',
        ],
      },
      {
        heading: 'Characteristics',
        paragraphs: [
          'The macadamia shell is extremely hard — it is often called the hardest edible nut to crack: ordinary nutcrackers apply insufficient force, which is why specialist crackers exist and why commercial deshelling uses rotating steel rollers. The kernel inside is cream to off-white.',
          'The flavour is mild and buttery. Macadamias are rich in fat, and 59 percent of the fat in raw kernels is monounsaturated.',
        ],
      },
      {
        heading: 'Where Macadamia Is Used',
        paragraphs: [
          'The Australian industry’s matrix of recommended applications maps the kernel styles to uses:',
        ],
        list: [
          'Snacking: whole kernels and large halves',
          'Chocolate and confectionery: everything from wholes to pieces, and paste',
          'Baking: halves, pieces and meal, and paste — macadamia is a classic inclusion in cookies and biscuits',
          'Ice cream and desserts: pieces and paste',
        ],
      },
      {
        heading: 'Storage',
        paragraphs: [
          'Because of their high oil content, macadamias are affected by heat, light and oxygen. The Australian Macadamia Society recommends storing kernel below 12 °C in appropriate packaging, and the AFI specification gives optimal storage as 5–10 °C at no more than 1.8 percent moisture and in the absence of oxygen, for a best-before date of up to 24 months. For shorter periods, cool, dry, dark and airtight is enough.',
        ],
      },
    ],
    faq: [
      {
        question: 'Where are macadamia nuts from?',
        answer:
          'Macadamia is indigenous to Australia — north-eastern New South Wales and central and south-eastern Queensland. Most of the crop is now grown elsewhere: on INC figures for 2024, South Africa produced 32 percent of the world total on a kernel basis, China and Australia 19 percent each and Kenya 10 percent.',
      },
      {
        question: 'Why are macadamia nuts so hard to crack?',
        answer:
          'Macadamias are the hardest edible nut to crack; ordinary nutcrackers apply insufficient force, and commercial deshelling uses rotating steel rollers. Most of the Australian crop, for example, is cracked by processors and sold as kernel.',
      },
      {
        question: 'Is macadamia related to the hazelnut?',
        answer:
          'No. Macadamia belongs to the family Proteaceae and hazel to the birch family, Betulaceae. The Turkish name “makademya fındığı” reflects the look of the nut, not a botanical relationship.',
      },
    ],
    sources: cite(
      'en',
      'wikiMacadamia',
      'wikiJohnMacadam',
      'wikiHazel',
      'wikiHazelnut',
      'amsTechnicalGuide',
      'afiMacadamiaSpec',
      'incYearbook2024',
    ),
    relatedProducts: ['macadamia'],
  },
  {
    id: 'macadamia-kernel-styles',
    slug: 'macadamia-kernel-styles',
    metaTitle: 'Macadamia Kernel Styles: Style 0 to 8',
    metaDescription:
      'Macadamia kernel styles from Style 0 to Style 8: size ranges, where the AMS and AFI definitions differ, how a lot is labelled and which style suits which use.',
    eyebrow: 'Guide',
    heading: 'Macadamia Kernel Styles: Style 0 to Style 8',
    lead: 'Macadamia kernels are bought and sold in numbered styles. This guide sets out how the styles are defined, where the industry standards differ and which style belongs in which product.',
    image: libraryImages.macadamia,
    imageAlt: 'Macadamia nuts — in shell, some cracked open to show the cream kernel',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'What Is a Style?',
        paragraphs: [
          'The Australian macadamia industry uses the term “style” to define kernel sizes and blends. Each style states two things at once: the minimum share of whole or half kernels in the lot, and a size range in millimetres. A style is therefore a size and a blend, not a size alone.',
          'Sizes are set with round screens: unless otherwise defined, the product passes over a smaller round screen and through a larger one, with a 10 percent tolerance for over- or undersized kernels.',
        ],
      },
      {
        heading: 'The Style Table',
        paragraphs: [
          'The definitions accepted for labelling in the Australian Macadamia Society (AMS) kernel product quality standard are:',
        ],
        list: [
          'Style 0 — min 95% whole kernel, over 20 mm',
          'Style 1 — min 90% whole kernel, 17–20 mm',
          'Style 1S — min 90% whole kernel, 14–18 mm',
          'Style 2 — min 50% whole kernel, over 13 mm',
          'Style 3 — min 15% whole kernel, over 13 mm',
          'Style 4L — min 80% halves, over 13 mm',
          'Style 4S — halves and pieces, 10–14 mm',
          'Style 5 — pieces, 8–12 mm',
          'Style 6 — pieces, 5–9 mm',
          'Style 7 — pieces, 3–6 mm',
          'Style 8 — pieces and meal, under 4 mm',
        ],
      },
      {
        heading: 'Where AMS and AFI Differ',
        paragraphs: [
          'The same numbering is used in the macadamia specification of the US Association of Food Industries (AFI), but some rows are not identical. State which document a style refers to when you order:',
        ],
        list: [
          'Style 1: 17–20 mm at AMS, 16–20 mm at AFI',
          'Style 1S: 14–18 mm at AMS, 13–18 mm at AFI',
          'Style 4S: “halves and pieces 10–14 mm” at AMS, “min 50% halves 10–14 mm” at AFI',
          'Style 8: “pieces/meal under 4 mm” at AMS, “fines or meal” at AFI',
        ],
      },
      {
        heading: 'How a Lot Is Labelled',
        paragraphs: [
          'The AMS standard asks for the quality grade and the roast to be labelled alongside the style: PREM for premium and COM for commercial; DR for dry roasted unsalted, DRS for dry roasted and salted, OR for oil roasted and ORS for oil roasted and salted. Non-standard styles carry the prefix “SP”. The standard’s own example: a blend of 70 percent whole and 30 percent half kernel in the 17–20 mm range, dry roasted and salted, is labelled “PREM Style 1 70%W 17-20mm DRS”.',
          'The AFI specification defines the grades themselves: premium kernel is fully mature kernel free from significant defects; commercial grade kernel shows minor visual defects such as surface discolouration and immaturity and is usually further processed by dicing or coating; reject kernel carries defects such as insect damage, mould or internal discolouration.',
        ],
      },
      {
        heading: 'Which Style for Which Application',
        paragraphs: [
          'The Australian industry’s matrix of recommended applications maps the styles to uses:',
        ],
        list: [
          'Snacking and mixed nuts: Styles 0–4L (wholes and large halves)',
          'Chocolate and confectionery: Styles 1–6, and paste',
          'Baking and bread: Styles 4L–8, and paste',
          'Ice cream, desserts and toppings: Styles 5–7, and paste',
        ],
      },
      {
        heading: 'What to Confirm When You Order',
        paragraphs: [
          'Write into the specification which standard the style refers to (AMS or AFI), the quality grade, the roast and the tolerance you accept. Because the definitions move by a few millimetres between documents, “Style 1” on its own can leave the two sides expecting different product. For wholesale supply, see our macadamia product page and send your requirement through the quotation form.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is the difference between Style 0 and Style 1?',
        answer:
          'In the AMS standard, Style 0 is at least 95 percent whole kernel over 20 mm, while Style 1 is at least 90 percent whole kernel in the 17–20 mm range. The AFI specification puts Style 1 at 16–20 mm.',
      },
      {
        question: 'What does Style 4L mean?',
        answer:
          'Style 4L is defined in the AMS standard as at least 80 percent halves over 13 mm. Being halves-dominated, it suits bakery and snack mixes where the kernel is visible.',
      },
      {
        question: 'What is Style 8 used for?',
        answer:
          'Style 8 is pieces and meal under 4 mm in the AMS standard, called “fines or meal” by AFI. It is used in bakery, bread and sauces, and in paste production.',
      },
    ],
    sources: cite(
      'en',
      'amsKernelStandard',
      'amsTechnicalGuide',
      'afiMacadamiaSpec',
      'wikiMacadamia',
    ),
    relatedProducts: ['macadamia'],
  },
  {
    id: 'aflatoxin-in-nuts',
    slug: 'aflatoxins-in-nuts',
    metaTitle: 'Aflatoxins in Nuts: Limits and Controls',
    metaDescription:
      'What aflatoxins are, the maximum levels for nuts in Türkiye and the EU, border control frequencies, how mycotoxin sampling works and how contamination is prevented.',
    eyebrow: 'Guide',
    heading: 'Aflatoxins in Nuts: Limits, Controls and Prevention',
    lead: 'Aflatoxin is one of the few test results that can have a nut consignment rejected on its own. This guide covers what aflatoxins are, the maximum levels in force in Türkiye and the European Union, the checks at the EU border, the sampling rules a lab report rests on, and what prevents contamination in the supply chain.',
    image: libraryImages.pistachio,
    imageAlt: 'Pistachio kernels — green, loose',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'What Are Aflatoxins?',
        paragraphs: [
          'Aflatoxins are mycotoxins produced by moulds, chiefly Aspergillus flavus and Aspergillus parasiticus. The World Health Organization notes that these moulds grow in soil, decaying vegetation, hay and grains, and lists tree nuts — pistachio, almond, walnut, coconut and Brazil nut — among the crops frequently affected.',
          'Contamination can arise before or after harvest, and processing does not remove it: most mycotoxins are chemically stable and survive food processing. The health effects are serious — large doses can cause acute poisoning, aflatoxins are genotoxic, and there is evidence that they cause liver cancer in humans. The International Agency for Research on Cancer classifies aflatoxins (B1, B2, G1, G2, M1) in Group 1, carcinogenic to humans.',
        ],
      },
      {
        heading: 'Maximum Levels in the European Union',
        paragraphs: [
          'In the EU the maximum levels sit in Annex I of Commission Regulation (EU) 2023/915, and Article 2 makes them binding: food listed in Annex I may not be placed on the market, or used as a raw material or as an ingredient, where it contains a contaminant at a level above the maximum.',
          'Walnuts have no row of their own — they fall under “tree nuts”, and the level depends on whether the lot will still be sorted. The figures, in µg/kg:',
        ],
        list: [
          'Tree nuts to be subjected to sorting or other physical treatment before being placed on the market for the final consumer (row 1.1.6): aflatoxin B1 5.0 µg/kg; sum of B1, B2, G1 and G2 10.0 µg/kg',
          'Tree nuts placed on the market for the final consumer or used as an ingredient (row 1.1.7): aflatoxin B1 2.0 µg/kg; sum 4.0 µg/kg',
          'Almonds, pistachios and apricot kernels (rows 1.1.8 and 1.1.9): 12.0 / 15.0 when to be sorted, 8.0 / 10.0 for the final consumer',
          'Hazelnuts and Brazil nuts (rows 1.1.10 and 1.1.11): 8.0 / 15.0 when to be sorted, 5.0 / 10.0 for the final consumer',
          'Dried figs, which have their own row (1.1.3): 6.0 / 10.0',
        ],
      },
      {
        heading: 'Lots Sold for Sorting Must Say So',
        paragraphs: [
          'The higher limits come with a labelling duty. In the Turkish contaminants regulation, article 8 requires product destined for sorting to carry the sentence: “a product that has to be subjected to sorting or other physical treatment in order to reduce the level of [the contaminant] before being placed on the market for the final consumer or used as a food ingredient”. The same article requires the lot identification code to appear indelibly on each package label and on the accompanying documents.',
        ],
      },
      {
        heading: 'The Same Levels in Türkiye',
        paragraphs: [
          'Türkiye sets its limits in the Turkish Food Codex Contaminants Regulation, published in the Official Gazette of 5 November 2023, No. 32360. Article 5 is explicit: food containing a contaminant above the maximum level in Annex 1 may not be placed on the market or used as a raw material or ingredient, and compliant food may not be mixed with non-compliant food.',
          'Annex 1 follows the EU row for row, and the two dated step-downs it contained (31 December 2024 and 31 December 2025) have both passed. The figures in force for “sert kabuklu meyveler” — tree nuts, the category walnuts fall into — are therefore the same as the EU’s: B1 5.0 and total 10.0 µg/kg for lots to be sorted, and B1 2.0 and total 4.0 µg/kg for product going to the final consumer. Almonds and pistachios (12.0/15.0 and 8.0/10.0) and hazelnuts (8.0/15.0 and 5.0/10.0) match as well, so a supplier exporting to the EU can work from one specification. Annex 1 also notes that where tree nuts are analysed in shell, the contamination is assumed to be entirely in the edible part.',
        ],
      },
      {
        heading: 'Increased Checks at the Border',
        paragraphs: [
          'Beyond the limits, certain country-product pairs face increased official controls on entry into the EU. In Annex II of Commission Implementing Regulation (EU) 2019/1793, the Türkiye row covers two products: dried figs and products containing them, for “aflatoxins and ochratoxin A”, at 30 percent of consignments; and pistachios in shell and shelled, pistachio paste and similar products, for aflatoxins, at 50 percent. A separate row covers pistachios of US origin dispatched from Türkiye, also at 50 percent.',
          'Walnuts do not appear in that regulation at all: Turkish walnuts are not subject to the increased-control regime and are governed by the ordinary maximum levels and normal official controls. The Turkish side mirrors this — the Ministry of Agriculture and Forestry’s procedure for dried fruit exports to the EU covers dried figs and pistachios. The same procedure notes that for products outside Annex II the model certificate is not mandatory, but may be issued under the procedure if the exporter or the buyer asks for it: a practical route where a buyer wants official documentation for a product such as walnut.',
        ],
      },
      {
        heading: 'Sampling: Why the Numbers Are So Large',
        paragraphs: [
          'Aflatoxin is not distributed evenly through a lot, which is why sampling is regulated. In the EU the rules are in Commission Implementing Regulation (EU) 2023/2782, which repealed Regulation (EC) No 401/2006 — worth knowing when a lab report cites its method.',
          'Tree nuts belong to the large-particle category. The incremental sample weighs about 200 g; for lots of 15 tonnes and above, 100 incremental samples are taken to form a 20 kg aggregate sample, which is mixed and divided into two 10 kg laboratory samples before grinding. For lots under 15 tonnes the number of incremental samples ranges from 10 to 100 and the aggregate sample is up to 20 kg.',
        ],
      },
      {
        heading: 'Prevention in the Supply Chain',
        paragraphs: [
          'The Codex code of practice for the prevention and reduction of aflatoxin contamination in tree nuts puts good agricultural practice first, followed by good manufacturing and good storage practice. Its thresholds are the practical guide: Aspergillus flavus and A. parasiticus cannot grow or produce aflatoxins at water activities below 0.7, relative humidity below 70 percent and temperatures below 10 °C.',
          'That translates into three steps. Dehulled nuts should be dried as soon as possible to a safe moisture level corresponding to a water activity below 0.70 at 25 °C. Sorting must remove insect-damaged and early-split nuts, which carry a high risk of aflatoxin contamination. Storage facilities should be clean, dry and well vented, with relative humidity below 70 percent and, if possible, a temperature between 0 °C and 10 °C. Sorting out visible mould is not sufficient on its own: analysis and the sampling method behind it belong in the contract.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is the aflatoxin limit for walnuts?',
        answer:
          'Walnuts have no separate row; they fall under “tree nuts”. In both the EU’s Regulation 2023/915 and the Turkish Food Codex Contaminants Regulation the figures in force are the same: aflatoxin B1 5.0 µg/kg and total aflatoxins 10.0 µg/kg for lots to be sorted, and 2.0 and 4.0 µg/kg for product going to the final consumer.',
      },
      {
        question: 'Does cooking destroy aflatoxin?',
        answer:
          'No. The World Health Organization states that most mycotoxins are chemically stable and survive food processing. The answer is to prevent contamination, sort out the high-risk nuts and verify the lot by analysis.',
      },
      {
        question: 'Why is the sample for an aflatoxin test so large?',
        answer:
          'Because contamination is patchy. Under Regulation (EU) 2023/2782, the incremental sample for tree nuts is about 200 g; for lots of 15 tonnes and above, 100 incremental samples form a 20 kg aggregate sample, which is divided into two 10 kg laboratory samples before grinding.',
      },
    ],
    sources: cite(
      'en',
      'eu2023_915',
      'eu2019_1793',
      'eu2023_2782',
      'tgkBulasanlar',
      'tgkBulasanlarEk1',
      'gkgmDriedFruitExport',
      'codexAflatoxinTreeNuts',
      'whoMycotoxins',
      'iarcClassifications',
    ),
    relatedProducts: ['walnut-kernels', 'pistachios'],
  },
  {
    id: 'buying-nuts-wholesale',
    slug: 'buying-nuts-wholesale',
    metaTitle: 'Buying Nuts Wholesale: An Importer’s Checklist',
    metaDescription:
      'Quality criteria, lab analysis reports, samples, packaging, Incoterms and supplier evaluation: a checklist for buying nuts wholesale.',
    eyebrow: 'Guide',
    heading: 'Buying Nuts Wholesale: What to Check',
    lead: 'Buying nuts wholesale involves far more variables than a retail purchase: product quality, food safety, packaging, delivery terms and supplier reliability all have to be weighed at once. This guide is a checklist for corporate buyers.',
    image: libraryImages.pistachio,
    imageAlt: 'Pistachio kernels — green, loose',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: '1. Define Your Requirement Precisely',
        paragraphs: [
          'The first step to an accurate quotation is a clear requirement. The same product name covers very different qualities and prices, and the more precisely you describe what you need, the more fairly you can compare offers.',
        ],
        list: [
          'Product and form (in-shell, kernels, pieces, small pieces)',
          'Size and colour grade',
          'Processing (raw, roasted, salted)',
          'Estimated annual or seasonal volume',
          'Packaging type and unit weight',
          'Delivery location and schedule',
        ],
      },
      {
        heading: '2. Ask for Quality Criteria in Writing',
        paragraphs: [
          'Ask for the product specification in writing so that quality is not left to interpretation. Nuts are typically assessed on size distribution, colour, moisture, broken-kernel content, foreign matter and sensory characteristics such as smell and taste.',
        ],
      },
      {
        heading: '3. Ask for the Analysis Reports',
        paragraphs: [
          'Food safety is non-negotiable in the nut trade. Aflatoxins and pesticide residues in nuts are subject to legal maximum levels (in the EU, Regulation (EU) 2023/915 and Regulation (EC) No 396/2005), and Codex Alimentarius identifies Salmonella as the main microbiological hazard in low-moisture foods such as nuts. Asking for lot-specific laboratory reports on all three is therefore a reasonable request.',
          'It is also worth checking the supplier’s legal registration or approval as a food business, lot-level traceability, and any food safety management systems it operates.',
        ],
      },
      {
        heading: '4. Take a Sample and Compare It with the Delivery',
        paragraphs: [
          'Asking for a sample before a large purchase lets you test the quality in your own application. Keeping the sample lets you check later whether the delivered lot matches the quality you approved.',
        ],
      },
      {
        heading: '5. Set the Packaging and Transport Conditions',
        paragraphs: [
          'Nuts are sensitive to heat and moisture: hot, humid conditions encourage mould growth and aflatoxin formation. How well the packaging protects the product (vacuum, modified atmosphere, multi-layer bags) and whether temperature and humidity are controlled in transit directly affect the quality you receive.',
        ],
      },
      {
        heading: '6. Settle Delivery and Payment Terms',
        paragraphs: [
          'In international purchases, the delivery term (Incoterms rules such as EXW, FOB or CIF), insurance, customs responsibility and payment terms should be stated clearly in the contract. Only with these terms side by side can you compare the real cost of two offers.',
        ],
      },
      {
        heading: '7. Plan Purchases Around the New Crop',
        paragraphs: [
          'Ask the supplier to state which crop year the product comes from, and plan purchases around the period when the new crop reaches the market. Oil-rich nuts such as walnuts lose freshness over time, so the old and new crop of the same product are not the same.',
        ],
      },
      {
        heading: '8. Evaluate the Supplier',
        paragraphs: [
          'A good supplier is judged not only on price but on transparency, consistent quality, reliable delivery and how responsibly problems are handled. The criteria beyond price — the analysis report, the packaging, the delivery term and delivery reliability — shape the total cost of repeat purchases as much as the price does.',
        ],
      },
    ],
    faq: [
      {
        question: 'What documents should I ask for when buying nuts wholesale?',
        answer:
          'Typically the product specification, analysis reports such as aflatoxin and pesticide residue results, and the supplier’s food business registration or approval details. For international purchases, origin and health documents also matter.',
      },
    ],
    sources: cite(
      'en',
      'codexAflatoxinTreeNuts',
      'codexLowMoisture',
      'eu2023_915',
      'eu396_2005',
      'eu178_2002',
      'eu852_2004',
      'usdaShelledWalnutsPdf',
      'incoterms',
    ),
    relatedProducts: ['walnut-kernels', 'pistachios', 'pumpkin-seed-kernels'],
  },
  {
    id: 'nut-export-documents',
    slug: 'nut-export-documents',
    metaTitle: 'Nut Export Documents: Shipping from Türkiye',
    metaDescription:
      'Documents that commonly travel with a nut shipment from Türkiye: commercial invoice, certificate of origin, phytosanitary certificate and lab reports.',
    eyebrow: 'Guide',
    heading: 'Nut Export Documents: What Travels with a Shipment from Türkiye',
    lead: 'Complete, correct documents are the first condition for a nut shipment to clear smoothly. The exact set depends on the product and the destination, but most shipments share a common core. This guide gives a general overview of those documents from both the exporter’s and the importer’s side.',
    image: libraryImages.sunflowerInShell,
    imageAlt: 'In-shell sunflower seeds — loose',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Important Note',
        paragraphs: [
          'This article is general information. Export and import rules differ by product and destination and change over time. Before shipping, confirm current requirements with the relevant authorities in both countries, your customs broker or your trade association.',
        ],
      },
      {
        heading: 'On the Turkish Side: Exporters’ Association Membership',
        paragraphs: [
          'Under Article 4 of Law No. 5910, exporters in Türkiye are required to be members of the relevant exporters’ association. For dried fruit and nuts, the sector associations are also a useful source of guidance on regulations and procedures.',
        ],
      },
      {
        heading: 'Commercial Documents',
        paragraphs: ['These core documents accompany almost every export shipment:'],
        list: [
          'Commercial invoice: shows the product, quantity, unit price and delivery term.',
          'Packing list: shows the contents, number and weights of the packages.',
          'Transport document: a bill of lading by sea, a CMR consignment note by road, an air waybill by air.',
          'Export declaration: the goods must be declared under the correct tariff code.',
        ],
      },
      {
        heading: 'Origin Documents',
        paragraphs: [
          'A certificate of origin shows the non-preferential origin of the goods and is issued when the importing country asks for one. In Türkiye the exporter or its legal representative completes and e-signs it, and a chamber of commerce or industry, or an exporters’ association, checks and approves it; some destinations also require consular legalisation.',
          'For destinations with a preferential trade agreement, proofs of origin such as EUR.1 are used to benefit from reduced customs duty; agricultural products exported to the European Union are covered too.',
        ],
      },
      {
        heading: 'Plant Health and Food Safety Documents',
        paragraphs: [
          'Many countries require a phytosanitary certificate for plant products; in Türkiye it is issued by the Ministry of Agriculture and Forestry.',
          'Because aflatoxins and pesticide residues in nuts are subject to legal limits, buyers may ask for analysis reports; for some products and markets they are mandatory.',
          'At the time of writing (Implementing Regulation (EU) 2019/1793 as applicable from 30 June 2026), the EU checks 50 percent of consignments of pistachios and pistachio products from Türkiye for aflatoxins, and 30 percent of consignments of dried figs and fig products for aflatoxins and ochratoxin A. Each consignment must travel with an official certificate issued by the competent authority and the results of sampling and analysis. The lists are reviewed at least every six months, so check the current version at the official source.',
        ],
      },
      {
        heading: 'Destination-Specific Requirements',
        paragraphs: ['Some countries apply additional requirements:'],
        list: [
          'Prior registration of the foreign food manufacturer — China, for example, requires overseas food manufacturers to register with its General Administration of Customs (GACC); at the time of writing, under Decree No. 280 in force since 1 June 2026, nuts and seeds and dried fruit are among the categories whose registration also needs an audit report and recommendation letter from the exporting country’s competent authority',
          'Country-specific labelling and packaging rules',
          'Additional analyses or certificates required by the importing country’s food law',
        ],
      },
      {
        heading: 'Why the Correct Tariff Code Matters',
        paragraphs: [
          'The tariff code under which goods are declared determines the duties, documents and controls that apply. In the international HS system, for example, shelled walnuts fall under 0802.32 and shelled pistachios under 0802.52, while roasted or otherwise prepared nuts are generally classified in a different chapter. The full national tariff line should be confirmed against the current tariff schedule.',
        ],
      },
    ],
    faq: [
      {
        question: 'What documents are needed to export nuts?',
        answer:
          'Almost every shipment carries a commercial invoice, packing list, transport document and export declaration. Origin documents such as a certificate of origin or EUR.1, a phytosanitary certificate and analysis reports are required depending on the destination and the buyer. Confirm current requirements with the relevant authorities.',
      },
      {
        question: 'Who issues a certificate of origin in Türkiye?',
        answer:
          'The exporter completes the certificate of origin electronically, and a chamber of commerce or industry, or an exporters’ association, approves it. Preferential proofs of origin such as EUR.1 are used where a trade agreement applies.',
      },
    ],
    sources: cite(
      'en',
      'law5910',
      'gaibAbout',
      'oaibDocuments',
      'originFaq',
      'originGuide',
      'customsCommunique149',
      'plantHealthExports',
      'eu2019_1793',
      'gainDecree280',
      'gainDecree280Guidance',
      'wcoHs2022',
      'tariffFaq',
    ),
    relatedProducts: ['walnut-kernels', 'pistachios', 'sunflower-kernels'],
  },
]
