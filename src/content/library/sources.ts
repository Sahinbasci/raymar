import type { Locale } from '@/lib/i18n'
import type { SourceReference } from './types'

/**
 * Every publication a library page cites, in one place.
 *
 * Each entry was opened and read when the statement it supports was written
 * (September 2026); the page text says no more than the source does. Titles
 * are given as the source titles itself, in its own language. The publisher
 * is named in the reader's language.
 *
 * Kept apart from the pages so a URL that moves is corrected once, and so the
 * Turkish and English versions of a page cannot drift onto different evidence.
 */

interface Reference {
  readonly title: string
  readonly url: string
  readonly lang: 'tr' | 'en'
  readonly publisher: { readonly tr: string; readonly en: string }
}

const EU = { tr: 'Avrupa Birliği (EUR-Lex)', en: 'European Union (EUR-Lex)' }
const CODEX = { tr: 'Codex Alimentarius (FAO/DSÖ)', en: 'Codex Alimentarius (FAO/WHO)' }
const MEVZUAT = {
  tr: 'Mevzuat Bilgi Sistemi',
  en: 'Turkish Legislation Information System (mevzuat.gov.tr)',
}
const TOB = {
  tr: 'T.C. Tarım ve Orman Bakanlığı',
  en: 'Ministry of Agriculture and Forestry of Türkiye',
}
const TICARET = { tr: 'T.C. Ticaret Bakanlığı', en: 'Ministry of Trade of Türkiye' }
const USDA_AMS = {
  tr: 'ABD Tarım Bakanlığı (USDA AMS)',
  en: 'USDA Agricultural Marketing Service',
}
const ECFR = {
  tr: 'ABD Federal Düzenlemeler Kanunu (eCFR), USDA',
  en: 'Electronic Code of Federal Regulations (eCFR), USDA',
}
const FAS = {
  tr: 'ABD Tarım Bakanlığı Dış Tarım Servisi (USDA FAS)',
  en: 'USDA Foreign Agricultural Service',
}
const CALIFORNIA_WALNUTS = { tr: 'California Walnuts', en: 'California Walnuts' }
const UC_ANR = {
  tr: 'Kaliforniya Üniversitesi Tarım ve Doğal Kaynaklar (UC ANR)',
  en: 'University of California Agriculture and Natural Resources',
}
const WIKIPEDIA = { tr: 'Wikipedia', en: 'Wikipedia' }
const VIKIPEDI = { tr: 'Vikipedi', en: 'Vikipedi' }
const RESMI_GAZETE = {
  tr: 'Resmî Gazete',
  en: 'Official Gazette of the Republic of Türkiye',
}
const INC = {
  tr: 'Uluslararası Kuruyemiş ve Kuru Meyve Konseyi (INC)',
  en: 'International Nut and Dried Fruit Council (INC)',
}
const WCO = { tr: 'Dünya Gümrük Örgütü (WCO)', en: 'World Customs Organization' }
const CBP = {
  tr: 'ABD Gümrük ve Sınır Koruma İdaresi (CBP)',
  en: 'U.S. Customs and Border Protection',
}
const AMS_AU = {
  tr: 'Avustralya Makadamya Derneği (AMS)',
  en: 'Australian Macadamia Society',
}
const AFI = {
  tr: 'Association of Food Industries (AFI, ABD)',
  en: 'Association of Food Industries (AFI)',
}
const NDSU = {
  tr: 'Kuzey Dakota Eyalet Üniversitesi Yayım Servisi (NDSU)',
  en: 'North Dakota State University Extension',
}
const NSA = {
  tr: 'Ulusal Ayçiçeği Birliği (NSA, ABD)',
  en: 'National Sunflower Association (USA)',
}

const REFERENCES = {
  // ── Food law and safety ────────────────────────────────────────────────
  codexAflatoxinTreeNuts: {
    title:
      'Code of Practice for the Prevention and Reduction of Aflatoxin Contamination in Tree Nuts (CAC/RCP 59-2005)',
    url: 'https://www.fao.org/input/download/standards/10221/CXP_059e.pdf',
    lang: 'en',
    publisher: CODEX,
  },
  codexLowMoisture: {
    title: 'Code of Hygienic Practice for Low-Moisture Foods (CAC/RCP 75-2015)',
    url: 'https://www.fao.org/input/download/standards/13921/CXP_075e_2015.pdf',
    lang: 'en',
    publisher: CODEX,
  },
  eu2023_915: {
    title:
      'Commission Regulation (EU) 2023/915 on maximum levels for certain contaminants in food',
    url: 'https://data.europa.eu/eli/reg/2023/915/oj',
    lang: 'en',
    publisher: EU,
  },
  eu396_2005: {
    title:
      'Regulation (EC) No 396/2005 on maximum residue levels of pesticides in or on food and feed',
    url: 'https://data.europa.eu/eli/reg/2005/396/oj',
    lang: 'en',
    publisher: EU,
  },
  eu178_2002: {
    title:
      'Regulation (EC) No 178/2002 laying down the general principles and requirements of food law',
    url: 'https://data.europa.eu/eli/reg/2002/178/oj',
    lang: 'en',
    publisher: EU,
  },
  eu852_2004: {
    title: 'Regulation (EC) No 852/2004 on the hygiene of foodstuffs',
    url: 'https://data.europa.eu/eli/reg/2004/852/oj',
    lang: 'en',
    publisher: EU,
  },
  eu2019_1793: {
    title:
      'Commission Implementing Regulation (EU) 2019/1793 on the temporary increase of official controls and emergency measures',
    url: 'https://data.europa.eu/eli/reg_impl/2019/1793/oj',
    lang: 'en',
    publisher: EU,
  },
  tgkContaminantsNews: {
    title: 'Türk Gıda Kodeksi Bulaşanlar Yönetmeliği Güncellendi',
    url: 'https://www.tarimorman.gov.tr/GKGM/Haber/650/Turk-Gida-Kodeksi-Bulasanlar-Yonetmeligi-Guncellendi',
    lang: 'tr',
    publisher: TOB,
  },
  law5996: {
    title: 'Veteriner Hizmetleri, Bitki Sağlığı, Gıda ve Yem Kanunu (5996)',
    url: 'https://www.mevzuat.gov.tr/mevzuatmetin/1.5.5996.pdf',
    lang: 'tr',
    publisher: MEVZUAT,
  },

  // ── Export procedure ───────────────────────────────────────────────────
  law5910: {
    title:
      'Türkiye İhracatçılar Meclisi ile İhracatçı Birliklerinin Kuruluş ve Görevleri Hakkında Kanun (5910)',
    url: 'https://mevzuat.gov.tr/mevzuatmetin/1.5.5910.pdf',
    lang: 'tr',
    publisher: MEVZUAT,
  },
  customsCommunique149: {
    title: 'Gümrük Genel Tebliği (Gümrük İşlemleri) (Seri No: 149)',
    url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=24608&MevzuatTur=9&MevzuatTertip=5',
    lang: 'tr',
    publisher: MEVZUAT,
  },
  originGuide: {
    title: 'Menşe İspat ve Dolaşım Belgeleri Nasıl Düzenlenirler?',
    url: 'https://gumrukrehberi.gov.tr/sayfa/men%C5%9Fe-ispat-ve-dola%C5%9F%C4%B1m-belgeleri-nas%C4%B1l-d%C3%BCzenlenirler',
    lang: 'tr',
    publisher: {
      tr: 'T.C. Ticaret Bakanlığı, Gümrük Rehberi',
      en: 'Ministry of Trade of Türkiye, Customs Guide',
    },
  },
  originFaq: {
    title: 'Sıkça Sorulan Sorular: Menşe',
    url: 'https://ticaret.gov.tr/gumruk-islemleri/sikca-sorulan-sorular/ticari/mense',
    lang: 'tr',
    publisher: TICARET,
  },
  tariffFaq: {
    title: 'Sıkça Sorulan Sorular: Tarife',
    url: 'https://ticaret.gov.tr/gumruk-islemleri/sikca-sorulan-sorular/ticari/tarife',
    lang: 'tr',
    publisher: TICARET,
  },
  oaibDocuments: {
    title: 'Belgeler (Özet)',
    url: 'https://oaib.org.tr/bilgi-ve-operasyon-merkezi/ihracat-belgeleri/belgeler-ozet',
    lang: 'tr',
    publisher: {
      tr: 'Orta Anadolu İhracatçı Birlikleri',
      en: 'Central Anatolian Exporters’ Associations (OAİB)',
    },
  },
  gaibAbout: {
    title: 'Hakkımızda',
    url: 'https://www.gaib.org.tr/tr/kurumeyve/genel-sayfa/kurumsal/hakkimizda-22.html',
    lang: 'tr',
    publisher: {
      tr: 'GAİB Kuru Meyve ve Mamulleri İhracatçıları Birliği',
      en: 'Southeastern Anatolia Exporters’ Associations, Dried Fruits (GAİB)',
    },
  },
  plantHealthExports: {
    title:
      'Bitki, Bitkisel Ürün ve Diğer Maddelerin İhracat, İthalat ve Transit İşlemleri',
    url: 'https://www.tarimorman.gov.tr/GKGM/Sayfalar/Detay.aspx?SayfaId=59',
    lang: 'tr',
    publisher: TOB,
  },
  gainDecree280: {
    title: 'Decree 280 - GACC Update to Overseas Food Facility Registration',
    url: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Decree+280+-+GACC+Update+to+Overseas+Food+Facility+Registration+_Beijing_China+-+People%27s+Republic+of_CH2025-0204',
    lang: 'en',
    publisher: FAS,
  },
  gainDecree280Guidance: {
    title: 'GACC Issues Decree 280 Implementation Guidance',
    url: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=GACC+Issues+Decree+280+Implementation+Guidance_Beijing_China+-+People%27s+Republic+of_CH2026-0034.pdf',
    lang: 'en',
    publisher: FAS,
  },
  wcoHs2022: {
    title: 'HS Nomenclature 2022 edition',
    url: 'https://www.wcoomd.org/en/topics/nomenclature/instrument-and-tools/hs-nomenclature-2022-edition/hs-nomenclature-2022-edition.aspx',
    lang: 'en',
    publisher: WCO,
  },
  wcoHs2022Ch08: {
    title:
      'HS Nomenclature 2022 edition, Chapter 8: Edible fruit and nuts; peel of citrus fruit or melons',
    url: 'https://www.wcoomd.org/-/media/wco/public/global/pdf/topics/nomenclature/instruments-and-tools/hs-nomenclature-2022/2022/0208_2022e.pdf',
    lang: 'en',
    publisher: WCO,
  },
  wcoHs2022Ch12: {
    title:
      'HS Nomenclature 2022 edition, Chapter 12: Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit',
    url: 'https://www.wcoomd.org/-/media/wco/public/global/pdf/topics/nomenclature/instruments-and-tools/hs-nomenclature-2022/2022/0212_2022e.pdf',
    lang: 'en',
    publisher: WCO,
  },
  wcoHs2022Ch20: {
    title:
      'HS Nomenclature 2022 edition, Chapter 20: Preparations of vegetables, fruit, nuts or other parts of plants',
    url: 'https://www.wcoomd.org/-/media/wco/public/global/pdf/topics/nomenclature/instruments-and-tools/hs-nomenclature-2022/2022/0420_2022e.pdf',
    lang: 'en',
    publisher: WCO,
  },
  cbpHulledPumpkinSeeds: {
    title: 'HQ H108019 — Classification of hulled pumpkin seeds',
    url: 'https://rulings.cbp.gov/ruling/H108019',
    lang: 'en',
    publisher: CBP,
  },
  cbpRoastedPumpkinSeeds: {
    title:
      'NY N245441 — The tariff classification, country of origin, and marking of in-shell roasted pumpkin seeds from Bulgaria',
    url: 'https://rulings.cbp.gov/ruling/N245441',
    lang: 'en',
    publisher: CBP,
  },
  cbpRoastedSunflowerSeeds: {
    title:
      'NY N245481 — The tariff classification, country of origin, and marking of striped in-shell roasted and salted sunflower seeds from Bulgaria',
    url: 'https://rulings.cbp.gov/ruling/N245481',
    lang: 'en',
    publisher: CBP,
  },
  ukTariff0802: {
    title: 'Other nuts, fresh or dried, whether or not shelled or peeled (0802)',
    url: 'https://www.trade-tariff.service.gov.uk/headings/0802',
    lang: 'en',
    publisher: {
      tr: 'Birleşik Krallık Gümrük Tarifesi (GOV.UK)',
      en: 'UK Integrated Online Tariff (GOV.UK)',
    },
  },
  incoterms: {
    title: 'Know Your Incoterms',
    url: 'https://www.trade.gov/know-your-incoterms',
    lang: 'en',
    publisher: {
      tr: 'ABD Ticaret Bakanlığı Uluslararası Ticaret İdaresi (ITA)',
      en: 'International Trade Administration (U.S. Department of Commerce)',
    },
  },

  // ── Walnut standards ───────────────────────────────────────────────────
  ts1276Gazette: {
    title:
      'Revize Edilen TS 1275 Kabuklu Ceviz ve TS 1276 Ceviz İçi Standardlarının Dış Ticarette Zorunlu Uygulamaya Konulmasına İlişkin Tebliğ (Tebliğ No: 2008/53)',
    url: 'https://www.resmigazete.gov.tr/eskiler/2008/10/20081011-12.htm',
    lang: 'tr',
    publisher: RESMI_GAZETE,
  },
  ts1276Current: {
    title:
      'Ek–1/C Türk Standartlarına Göre Ticari Kalite Denetimine Tabi Ürünler – Kuru ve Kurutulmuş Ürünler',
    url: 'https://onlineislemler.uib.org.tr/downloads/duyuru_ek/kuru_ve_kurutulmus_urunler.pdf',
    lang: 'tr',
    publisher: {
      tr: 'Uludağ İhracatçı Birlikleri (UİB)',
      en: 'Uludağ Exporters’ Associations (UİB)',
    },
  },
  uneceWalnutKernels: {
    title: 'Standard for walnut kernels (UNECE standard DDP-02)',
    url: 'https://documents.un.org/api/symbol/access?s=ECE/CTCS/WP.7/GE.2/2025/5&l=en&t=pdf',
    lang: 'en',
    publisher: {
      tr: 'Birleşmiş Milletler Avrupa Ekonomik Komisyonu (UNECE)',
      en: 'United Nations Economic Commission for Europe (UNECE)',
    },
  },
  usdaShelledWalnuts: {
    title: 'United States Standards for Shelled English Walnuts (Juglans Regia)',
    url: 'https://www.ecfr.gov/current/title-7/subtitle-B/chapter-I/subchapter-C/part-51/subpart-X',
    lang: 'en',
    publisher: ECFR,
  },
  usdaShelledWalnutsPdf: {
    title: 'United States Standards for Grades of Shelled Walnuts',
    url: 'https://www.ams.usda.gov/sites/default/files/media/ShelledWalnutStandards.pdf',
    lang: 'en',
    publisher: USDA_AMS,
  },
  usdaShelledPecans: {
    title: 'United States Standards for Grades of Shelled Pecans',
    url: 'https://www.ecfr.gov/current/title-7/subtitle-B/chapter-I/subchapter-C/part-51/subpart-N',
    lang: 'en',
    publisher: ECFR,
  },

  uneceStandardLayout: {
    title:
      'Standard Layout for UNECE Standards on Dry and Dried Produce (ECE/CTCS/WP.7/2022/9)',
    url: 'https://documents.un.org/api/symbol/access?s=ECE/CTCS/WP.7/2022/9&l=en&t=pdf',
    lang: 'en',
    publisher: {
      tr: 'Birleşmiş Milletler Avrupa Ekonomik Komisyonu (UNECE)',
      en: 'United Nations Economic Commission for Europe (UNECE)',
    },
  },

  // ── Walnut trade, quality and storage ──────────────────────────────────
  cwSizeColor: {
    title: 'Taste, Versatility, Size & Color',
    url: 'https://walnuts.org/food-professionals/why-walnuts/taste-versatility-size-color/',
    lang: 'en',
    publisher: CALIFORNIA_WALNUTS,
  },
  cwSizeChart: {
    title: 'Size Color Charts and Information',
    url: 'https://walnuts.org/wp-content/uploads/2018/02/CWB-J0349-Size-Color-Chart_web.pdf',
    lang: 'en',
    publisher: CALIFORNIA_WALNUTS,
  },
  cwHandlingStorage: {
    title: 'Best Practices for Handling & Storage',
    url: 'https://walnuts.org/wp-content/uploads/2023/11/CWC-Storage-and-Handling-Guide-for-Retailers-1.pdf',
    lang: 'en',
    publisher: CALIFORNIA_WALNUTS,
  },
  cwUsageStorage: {
    title: 'Usage, Storage & Purchase Tips',
    url: 'https://walnuts.org/food-professionals/usage-storage-purchase-tips/',
    lang: 'en',
    publisher: CALIFORNIA_WALNUTS,
  },
  cwBuyCare: {
    title: 'How to Buy, Care & Store',
    url: 'https://walnuts.org/how-to/how-to-buy-care/',
    lang: 'en',
    publisher: CALIFORNIA_WALNUTS,
  },
  cwFlavor: {
    title: 'To Understand Walnut Flavor, Get Under the Skin',
    url: 'https://walnuts.org/news/to-understand-walnut-flavor-get-under-the-skin-california-walnuts/',
    lang: 'en',
    publisher: CALIFORNIA_WALNUTS,
  },
  ucDavisDicedNuts: {
    title: 'Commercial storage of whole and diced almonds, pecans and hazelnuts?',
    url: 'https://postharvest.ucdavis.edu/ask-produce-docs/commercial-storage-whole-and-diced-almonds-pecans-and-hazelnuts',
    lang: 'en',
    publisher: {
      tr: 'UC Davis Hasat Sonrası Araştırma ve Yayım Merkezi',
      en: 'UC Davis Postharvest Research and Extension Center',
    },
  },
  ucanrHomeOrchardNuts: {
    title:
      'Harvesting and Storing Your Home Orchard’s Nut Crop: Almonds, Walnuts, Pecans, Pistachios, and Chestnuts (Publication 8005)',
    url: 'https://ucanr.edu/sites/default/files/2020-09/335707.pdf',
    lang: 'en',
    publisher: UC_ANR,
  },
  ucanrDehydration: {
    title: 'Walnut Production Manual, Chapter 34: Dehydration',
    url: 'https://ucanr.edu/sites/default/files/2010-06/19005.pdf',
    lang: 'en',
    publisher: UC_ANR,
  },
  walnutSkinLightness: {
    title:
      'Physical and chemical characteristics of walnut (Juglans regia L.) kernels with different skin lightness',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13281142/',
    lang: 'en',
    publisher: {
      tr: 'Journal of Food Science (PMC)',
      en: 'Journal of Food Science (PMC)',
    },
  },
  walnutStorageVacuum: {
    title:
      'Quality Preservation of Walnut Kernels: Effect of Storage Temperature and Vacuum Packaging',
    url: 'https://link.springer.com/article/10.1007/s10341-023-00944-2',
    lang: 'en',
    publisher: {
      tr: 'Applied Fruit Science (Springer)',
      en: 'Applied Fruit Science (Springer)',
    },
  },
  walnutSutureStrength: {
    title:
      'Quantitative phenotyping of shell suture strength in walnut (Juglans regia L.) enhances precision for detection of QTL and genome-wide association mapping',
    url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0231144',
    lang: 'en',
    publisher: { tr: 'PLOS ONE', en: 'PLOS ONE' },
  },
  gainUkraineTreeNuts2025: {
    title: 'Tree Nuts Annual – Ukraine (UP2025-0029)',
    url: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Tree+Nuts+Annual_Kyiv_Ukraine_UP2025-0029.pdf',
    lang: 'en',
    publisher: FAS,
  },
  incYearbook2024: {
    title: 'Nuts & Dried Fruits Statistical Yearbook 2024',
    url: 'https://inc.nutfruit.org/wp-content/uploads/2025/01/Statistical-Yearbook-2024.pdf',
    lang: 'en',
    publisher: INC,
  },

  feisPecan: {
    title: 'Carya illinoinensis, pecan',
    url: 'https://research.fs.usda.gov/feis/species-reviews/carill',
    lang: 'en',
    publisher: {
      tr: 'ABD Orman Servisi, Yangın Etkileri Bilgi Sistemi (USDA FS FEIS)',
      en: 'USDA Forest Service, Fire Effects Information System',
    },
  },
  nmsuStoringPecans: {
    title: 'Storing Pecans (Guide H-620)',
    url: 'https://pubs.nmsu.edu/_h/H620/index.html',
    lang: 'en',
    publisher: {
      tr: 'New Mexico Eyalet Üniversitesi Yayım Servisi (NMSU)',
      en: 'New Mexico State University Cooperative Extension',
    },
  },
  ucanrNutSafety: {
    title:
      'Nuts: Safe Methods for Consumers to Handle, Store, and Enjoy (Publication 8406)',
    url: 'https://ucfoodsafety.ucdavis.edu/sites/g/files/dgvnsk7366/files/inline-files/44384.pdf',
    lang: 'en',
    publisher: UC_ANR,
  },

  // ── Walnut orchard, harvest and kernel deterioration ───────────────────
  ortizPellicle: {
    title:
      'Walnut (Juglans regia L.) kernel postharvest deterioration as affected by pellicle integrity, cultivar and oxygen concentration',
    url: 'https://crisosto.ucdavis.edu/sites/g/files/dgvnsk6166/files/inline-files/Pellicle-Ortiz-2019.pdf',
    lang: 'en',
    publisher: {
      tr: 'Postharvest Biology and Technology (UC Davis)',
      en: 'Postharvest Biology and Technology (UC Davis)',
    },
  },
  ucipmWalnut: {
    title: 'UC IPM Pest Management Guidelines: Walnut (UC ANR Publication 3477)',
    url: 'https://ipm.ucanr.edu/pdf/pmg/pmgwalnut.pdf',
    lang: 'en',
    publisher: {
      tr: 'Kaliforniya Üniversitesi Entegre Zararlı Yönetimi Programı (UC IPM)',
      en: 'UC Statewide Integrated Pest Management Program, University of California',
    },
  },
  ucceWalnutSeason: {
    title: 'Finish Walnut Season Strong for Best Crop Production',
    url: 'https://ucanr.edu/site/ucce-central-sierra-agriculture/article/finish-walnut-season-strong-best-crop-production',
    lang: 'en',
    publisher: {
      tr: 'Kaliforniya Üniversitesi Yayım Servisi, Central Sierra (UCCE)',
      en: 'UC Cooperative Extension Central Sierra',
    },
  },
  gkgmCeviz: {
    title: 'Ceviz (Üretici Bilgi Köşesi)',
    url: 'https://www.tarimorman.gov.tr/GKGM/Belgeler/Uretici_Bilgi_Kosesi/Dokumanlar/ceviz.pdf',
    lang: 'tr',
    publisher: TOB,
  },
  unalWalnutHarvest: {
    title: 'Ceviz Yetiştiriciliğinde Hasat ve Hasat Sonrası Mekanizasyon Uygulamaları',
    url: 'https://dergipark.org.tr/tr/download/article-file/39641',
    lang: 'tr',
    publisher: {
      tr: 'BAHÇE dergisi, Atatürk Bahçe Kültürleri Merkez Araştırma Enstitüsü (DergiPark)',
      en: 'BAHÇE journal, Atatürk Central Horticultural Research Institute (DergiPark)',
    },
  },
  kibarNutStorage: {
    title: 'Sert Kabuklu Meyvelerin Depolanması (Derleme)',
    url: 'https://dergipark.org.tr/tr/download/article-file/3115484',
    lang: 'tr',
    publisher: {
      tr: 'Selçuk Tarım ve Gıda Bilimleri Dergisi (DergiPark)',
      en: 'Selçuk Journal of Agriculture and Food Sciences (DergiPark)',
    },
  },
  megepCeviz: {
    title: 'Ceviz Yetiştiriciliği (MEGEP)',
    url: 'https://megep.meb.gov.tr/mte_program_modul/moduller_pdf/Ceviz%20Yeti%C5%9Ftiricili%C4%9Fi.pdf',
    lang: 'tr',
    publisher: {
      tr: 'T.C. Millî Eğitim Bakanlığı, MEGEP',
      en: 'Ministry of National Education of Türkiye (MEGEP)',
    },
  },
  yalovaCultivars: {
    title: 'Tescilli Çeşitlerimiz — Meyve Çeşitleri',
    url: 'https://arastirma.tarimorman.gov.tr/yalovabahce/Belgeler/tescilliCesitlerimiz/meyveCesitleri.pdf',
    lang: 'tr',
    publisher: {
      tr: 'Atatürk Bahçe Kültürleri Merkez Araştırma Enstitüsü (Yalova)',
      en: 'Atatürk Central Horticultural Research Institute (Yalova)',
    },
  },
  gainTurkeyTreeNuts2020: {
    title: 'Tree Nuts Annual – Turkey (TU2020-0031)',
    url: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Tree+Nuts+Annual_Ankara_Turkey_09-15-2020',
    lang: 'en',
    publisher: FAS,
  },

  // ── Aflatoxin ──────────────────────────────────────────────────────────
  whoMycotoxins: {
    title: 'Mycotoxins',
    url: 'https://www.who.int/news-room/fact-sheets/detail/mycotoxins',
    lang: 'en',
    publisher: { tr: 'Dünya Sağlık Örgütü (DSÖ)', en: 'World Health Organization' },
  },
  iarcClassifications: {
    title: 'Agents Classified by the IARC Monographs, Volumes 1–123',
    url: 'https://monographs.iarc.who.int/wp-content/uploads/2018/09/ClassificationsAlphaOrder.pdf',
    lang: 'en',
    publisher: {
      tr: 'Uluslararası Kanser Araştırmaları Ajansı (IARC), DSÖ',
      en: 'International Agency for Research on Cancer (IARC), WHO',
    },
  },
  eu2023_2782: {
    title:
      'Commission Implementing Regulation (EU) 2023/2782 laying down the methods of sampling and analysis for the control of the levels of mycotoxins in food',
    url: 'https://data.europa.eu/eli/reg_impl/2023/2782/oj',
    lang: 'en',
    publisher: EU,
  },
  tgkBulasanlar: {
    title: 'Türk Gıda Kodeksi Bulaşanlar Yönetmeliği',
    url: 'https://www.resmigazete.gov.tr/eskiler/2023/11/20231105-1.htm',
    lang: 'tr',
    publisher: RESMI_GAZETE,
  },
  tgkBulasanlarEk1: {
    title:
      'Türk Gıda Kodeksi Bulaşanlar Yönetmeliği Ek-1: Gıdalardaki belirli bulaşanlar için maksimum limitler',
    url: 'https://www.resmigazete.gov.tr/eskiler/2023/11/20231105-1-1.pdf',
    lang: 'tr',
    publisher: RESMI_GAZETE,
  },
  gkgmDriedFruitExport: {
    title: 'Avrupa Birliği Ülkelerine Yapılacak Kuru Meyve İhracatına Dair Prosedür',
    url: 'https://kms.kaysis.gov.tr/Home/Goster/196117',
    lang: 'tr',
    publisher: TOB,
  },

  // ── Macadamia, pecan, seed and pistachio standards ─────────────────────
  amsKernelStandard: {
    title: 'Kernel product quality standard (AMKQS-V2)',
    url: 'https://trade.australian-macadamias.org/wp-content/uploads/2025/04/Australian-Macadamia-Kernel-Product-Quality-Standard-190624.pdf',
    lang: 'en',
    publisher: AMS_AU,
  },
  amsTechnicalGuide: {
    title: 'Australian Macadamias Technical Guide',
    url: 'https://trade.australian-macadamias.org/wp-content/uploads/2025/07/AM-TECHNICAL-GUIDELINES-SECURE-ENG.pdf',
    lang: 'en',
    publisher: AMS_AU,
  },
  afiMacadamiaSpec: {
    title: 'AFI Specifications for Macadamia Kernels',
    url: 'https://afius.org/afi-specifications-for-macadamia-kernels/',
    lang: 'en',
    publisher: AFI,
  },
  ndsuSunflowerGuide: {
    title: 'Sunflower Production Guide (A1995)',
    url: 'https://www.ndsu.edu/agriculture/sites/default/files/2023-12/a1995.pdf',
    lang: 'en',
    publisher: NDSU,
  },
  nsaKernelSpec: {
    title: 'Product Specifications: U.S. Sunflower Kernel',
    url: 'https://www.sunflowernsa.com/seed/seedproduct-specs-kernel/',
    lang: 'en',
    publisher: NSA,
  },
  ttaeConfectionerySunflower: {
    title: 'Türkiye’deki Çerezlik Ayçiçeği ve Tohumculuğu',
    url: 'https://arastirma.tarimorman.gov.tr/ttae/Sayfalar/Detay.aspx?SayfaId=52',
    lang: 'tr',
    publisher: {
      tr: 'T.C. Tarım ve Orman Bakanlığı, Trakya Tarımsal Araştırma Enstitüsü',
      en: 'Trakya Agricultural Research Institute, Ministry of Agriculture and Forestry of Türkiye',
    },
  },
  pumpkinHullless: {
    title:
      'Interspecific hybridization for transfer of hull-less seed trait from Cucurbita pepo to C. moschata',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10030865/',
    lang: 'en',
    publisher: { tr: 'Scientific Reports (PMC)', en: 'Scientific Reports (PMC)' },
  },
  turkpatentAntepFistigi: {
    title: 'Antep Fıstığı — Coğrafi İşaret Tescil Belgesi (Menşe Adı, No: 27)',
    url: 'https://ci.turkpatent.gov.tr/Files/GeographicalSigns/d7d577fc-66f2-43e1-a2a9-c1abb8dce55f.pdf',
    lang: 'tr',
    publisher: {
      tr: 'Türk Patent ve Marka Kurumu',
      en: 'Turkish Patent and Trademark Office',
    },
  },
  gainTurkeyTreeNuts2022: {
    title: 'Tree Nuts Annual – Turkey (TU2022-0041)',
    url: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Tree+Nuts+Annual_Ankara_Turkey_TU2022-0041',
    lang: 'en',
    publisher: FAS,
  },
  gainTurkeyTreeNuts2015: {
    title: 'Tree Nuts Annual – Turkey (TR5050)',
    url: 'https://apps.fas.usda.gov/newgainapi/api/report/downloadreportbyfilename?filename=Tree+Nuts+Annual_Ankara_Turkey_9-9-2015.pdf',
    lang: 'en',
    publisher: FAS,
  },
  bozPistachioHarvest: {
    title:
      'Antepfıstığında Hasat Sonrası Erken Hasat (Boz Fıstık) ve Normal Hasat (Ben Fıstık) Meyvelerin Kurutma İşlemlerinin İncelenmesi ve Depolama Esnasında Serbest Yağ Asitliği ve Peroksit Değerinin Değişimi',
    url: 'https://dergipark.org.tr/tr/pub/humder/issue/75183/1214758',
    lang: 'tr',
    publisher: {
      tr: 'Harran Üniversitesi Mühendislik Dergisi (DergiPark)',
      en: 'Harran University Journal of Engineering (DergiPark)',
    },
  },
  pistachioSpread: {
    title:
      'Impact of Formulation on the Rheological, Textural, and Sensory Properties of Pistachio Spread',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12692659/',
    lang: 'en',
    publisher: { tr: 'Foods (PMC)', en: 'Foods (PMC)' },
  },

  // ── Encyclopedias ──────────────────────────────────────────────────────
  wikiWalnut: {
    title: 'Walnut',
    url: 'https://en.wikipedia.org/wiki/Walnut',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiJuglansRegia: {
    title: 'Juglans regia',
    url: 'https://en.wikipedia.org/wiki/Juglans_regia',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiJuglandaceae: {
    title: 'Juglandaceae',
    url: 'https://en.wikipedia.org/wiki/Juglandaceae',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiPecan: {
    title: 'Pecan',
    url: 'https://en.wikipedia.org/wiki/Pecan',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiMacadamia: {
    title: 'Macadamia',
    url: 'https://en.wikipedia.org/wiki/Macadamia',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  vikipediMacadamia: {
    title: 'Macadamia',
    url: 'https://tr.wikipedia.org/wiki/Macadamia',
    lang: 'tr',
    publisher: VIKIPEDI,
  },
  wikiJohnMacadam: {
    title: 'John Macadam',
    url: 'https://en.wikipedia.org/wiki/John_Macadam',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiHazel: {
    title: 'Hazel',
    url: 'https://en.wikipedia.org/wiki/Hazel',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiHazelnut: {
    title: 'Hazelnut',
    url: 'https://en.wikipedia.org/wiki/Hazelnut',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiChocolateChipCookie: {
    title: 'Chocolate chip cookie',
    url: 'https://en.wikipedia.org/wiki/Chocolate_chip_cookie',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiPumpkinSeed: {
    title: 'Pumpkin seed',
    url: 'https://en.wikipedia.org/wiki/Pumpkin_seed',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiSunflowerSeed: {
    title: 'Sunflower seed',
    url: 'https://en.wikipedia.org/wiki/Sunflower_seed',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiGaziantep: {
    title: 'Gaziantep',
    url: 'https://en.wikipedia.org/wiki/Gaziantep',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiPistachio: {
    title: 'Pistachio',
    url: 'https://en.wikipedia.org/wiki/Pistachio',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiRancidification: {
    title: 'Rancidification',
    url: 'https://en.wikipedia.org/wiki/Rancidification',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiBaklava: {
    title: 'Baklava',
    url: 'https://en.wikipedia.org/wiki/Baklava',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  wikiMuhammara: {
    title: 'Muhammara',
    url: 'https://en.wikipedia.org/wiki/Muhammara',
    lang: 'en',
    publisher: WIKIPEDIA,
  },
  vikipediPekan: {
    title: 'Carya illinoinensis',
    url: 'https://tr.wikipedia.org/wiki/Pekan_cevizi',
    lang: 'tr',
    publisher: VIKIPEDI,
  },
  vikipediKadayif: {
    title: 'Kadayıf',
    url: 'https://tr.wikipedia.org/wiki/Kaday%C4%B1f',
    lang: 'tr',
    publisher: VIKIPEDI,
  },
} as const satisfies Record<string, Reference>

export type ReferenceKey = keyof typeof REFERENCES

/** The references behind a page, with the publisher named in `locale`. */
export function cite(
  locale: Locale,
  ...keys: readonly ReferenceKey[]
): SourceReference[] {
  return keys.map((key) => {
    const reference: Reference = REFERENCES[key]
    return {
      title: reference.title,
      publisher: reference.publisher[locale],
      url: reference.url,
      lang: reference.lang,
    }
  })
}
