import { countries } from '@/data/countries'
import { legalPath } from '@/lib/legal'
import { libraryIndexPath } from '@/lib/library'
import type { Dictionary } from '@/types/content'

/**
 * Turkish display name per country id, in the same order as
 * `src/data/countries.ts` for easy cross-reference. Built as a lookup so the
 * quote form can render `<option value={id}>{name}</option>` and resolve the
 * calling code for the same id independently.
 */
const countryNames: Record<string, string> = {
  TR: 'Türkiye',
  AF: 'Afganistan',
  AL: 'Arnavutluk',
  DZ: 'Cezayir',
  AD: 'Andorra',
  AO: 'Angola',
  AG: 'Antigua ve Barbuda',
  AR: 'Arjantin',
  AM: 'Ermenistan',
  AU: 'Avustralya',
  AT: 'Avusturya',
  AZ: 'Azerbaycan',
  BS: 'Bahamalar',
  BH: 'Bahreyn',
  BD: 'Bangladeş',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belçika',
  BZ: 'Belize',
  BJ: 'Benin',
  BT: 'Bhutan',
  BO: 'Bolivya',
  BA: 'Bosna Hersek',
  BW: 'Botsvana',
  BR: 'Brezilya',
  BN: 'Brunei',
  BG: 'Bulgaristan',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Kamboçya',
  CM: 'Kamerun',
  CA: 'Kanada',
  CV: 'Yeşil Burun Adaları',
  CF: 'Orta Afrika Cumhuriyeti',
  TD: 'Çad',
  CL: 'Şili',
  CN: 'Çin',
  CO: 'Kolombiya',
  KM: 'Komorlar',
  CG: 'Kongo Cumhuriyeti',
  CD: 'Kongo Demokratik Cumhuriyeti',
  CR: 'Kosta Rika',
  CI: 'Fildişi Sahili',
  HR: 'Hırvatistan',
  CU: 'Küba',
  CY: 'Kıbrıs',
  CZ: 'Çekya',
  DK: 'Danimarka',
  DJ: 'Cibuti',
  DM: 'Dominika',
  DO: 'Dominik Cumhuriyeti',
  EC: 'Ekvador',
  EG: 'Mısır',
  SV: 'El Salvador',
  GQ: 'Ekvator Ginesi',
  ER: 'Eritre',
  EE: 'Estonya',
  SZ: 'Esvatini',
  ET: 'Etiyopya',
  FJ: 'Fiji',
  FI: 'Finlandiya',
  FR: 'Fransa',
  GA: 'Gabon',
  GM: 'Gambiya',
  GE: 'Gürcistan',
  DE: 'Almanya',
  GH: 'Gana',
  GR: 'Yunanistan',
  GD: 'Grenada',
  GT: 'Guatemala',
  GN: 'Gine',
  GW: 'Gine-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Macaristan',
  IS: 'İzlanda',
  IN: 'Hindistan',
  ID: 'Endonezya',
  IR: 'İran',
  IQ: 'Irak',
  IE: 'İrlanda',
  IL: 'İsrail',
  IT: 'İtalya',
  JM: 'Jamaika',
  JP: 'Japonya',
  JO: 'Ürdün',
  KZ: 'Kazakistan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KW: 'Kuveyt',
  KG: 'Kırgızistan',
  LA: 'Laos',
  LV: 'Letonya',
  LB: 'Lübnan',
  LS: 'Lesoto',
  LR: 'Liberya',
  LY: 'Libya',
  LI: 'Lihtenştayn',
  LT: 'Litvanya',
  LU: 'Lüksemburg',
  MO: 'Makao',
  MG: 'Madagaskar',
  MW: 'Malavi',
  MY: 'Malezya',
  MV: 'Maldivler',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Adaları',
  MR: 'Moritanya',
  MU: 'Mauritius',
  MX: 'Meksika',
  FM: 'Mikronezya',
  MD: 'Moldova',
  MC: 'Monako',
  MN: 'Moğolistan',
  ME: 'Karadağ',
  MA: 'Fas',
  MZ: 'Mozambik',
  MM: 'Myanmar',
  NA: 'Namibya',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Hollanda',
  NZ: 'Yeni Zelanda',
  NI: 'Nikaragua',
  NE: 'Nijer',
  NG: 'Nijerya',
  MK: 'Kuzey Makedonya',
  NO: 'Norveç',
  OM: 'Umman',
  PK: 'Pakistan',
  PW: 'Palau',
  PA: 'Panama',
  PG: 'Papua Yeni Gine',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Filipinler',
  PL: 'Polonya',
  PT: 'Portekiz',
  QA: 'Katar',
  RO: 'Romanya',
  RU: 'Rusya',
  RW: 'Ruanda',
  KN: 'Saint Kitts ve Nevis',
  LC: 'Saint Lucia',
  VC: 'Saint Vincent ve Grenadinler',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome ve Principe',
  SA: 'Suudi Arabistan',
  SN: 'Senegal',
  RS: 'Sırbistan',
  SC: 'Seyşeller',
  SL: 'Sierra Leone',
  SG: 'Singapur',
  SK: 'Slovakya',
  SI: 'Slovenya',
  SB: 'Solomon Adaları',
  SO: 'Somali',
  ZA: 'Güney Afrika',
  KR: 'Güney Kore',
  SS: 'Güney Sudan',
  ES: 'İspanya',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Surinam',
  SE: 'İsveç',
  CH: 'İsviçre',
  SY: 'Suriye',
  TW: 'Tayvan',
  TJ: 'Tacikistan',
  TZ: 'Tanzanya',
  TH: 'Tayland',
  TL: 'Doğu Timor',
  TG: 'Togo',
  TO: 'Tonga',
  TT: 'Trinidad ve Tobago',
  TN: 'Tunus',
  TM: 'Türkmenistan',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukrayna',
  AE: 'Birleşik Arap Emirlikleri',
  GB: 'Birleşik Krallık',
  US: 'Amerika Birleşik Devletleri',
  UY: 'Uruguay',
  UZ: 'Özbekistan',
  VU: 'Vanuatu',
  VA: 'Vatikan',
  VE: 'Venezuela',
  VN: 'Vietnam',
  YE: 'Yemen',
  ZM: 'Zambiya',
  ZW: 'Zimbabve',
}

/**
 * `Record<CountryId, string>` built from `countries`, not hand-typed against
 * the type — so adding or removing a country in the data file cannot silently
 * drift out of sync with the name list here. Throws at module load (i.e. at
 * build time) if a name is missing, rather than shipping an English fallback
 * or an empty option silently.
 */
const quoteCountryOptions = Object.fromEntries(
  countries.map(({ id }) => {
    const name = countryNames[id]
    if (!name) throw new Error(`countryNames is missing an entry for "${id}"`)
    return [id, name]
  }),
) as Dictionary['quote']['countryOptions']

/**
 * Turkish is the approved, complete locale.
 *
 * Every string here is transcribed verbatim from the approved Claude Design
 * source (design-source/.../Raymar Ana Sayfa.dc.html). Bracketed values such as
 * `[Telefon bilgisi eklenecek]` are placeholders that the design itself marks as
 * pending client input — they are intentionally preserved, not filled in.
 */
export const tr: Dictionary = {
  nav: [
    { id: 'ust', label: 'Ana Sayfa' },
    { id: 'hakkimizda', label: 'Hakkımızda' },
    { id: 'urunlerimiz', label: 'Ürünler' },
    { id: 'ticaret', label: 'Uluslararası Ticaret' },
    { id: 'teklif', label: 'İletişim' },
  ],

  header: {
    logoAlt: 'Raymar Nuts',
    homeAriaLabel: 'Raymar Nuts — Ana Sayfa',
    navAriaLabel: 'Ana menü',
    mobileNavAriaLabel: 'Mobil menü',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    cta: 'Teklif Talep Et',
    // Yalnızca `completeLocales` dışında bir dil olduğunda gösterilir. İki dil
    // de yayında olduğu için şu an hiç render edilmiyor; metin bu yüzden
    // dilden bağımsız tutuldu — "İngilizce hazırlanıyor" demek artık yanlış.
    localePending: 'İçerik hazırlanıyor',
  },

  hero: {
    cueLabel: 'Ürünleri Keşfet',
    posterAlt: '',
    videoPause: 'Arka plan videosunu duraklat',
    videoPlay: 'Arka plan videosunu oynat',
  },

  statement: {
    // Set in title case; `.eyebrow` uppercases it in CSS, and the document is
    // lang="tr-TR" so the i/İ mapping is the Turkish one.
    eyebrow: 'B2B Kuruyemiş Ticareti',
    headingLines: ['Kuruyemiş Tedarikinde', '30 Yılı Aşkın Ticaret Deneyimi'],
    body: 'Ceviz içi başta olmak üzere makadamya ve pikan ürünlerinde, kurumsal müşterilerimize güvenilir ve sürdürülebilir tedarik çözümleri sunuyoruz.',
    primaryCta: 'Ürünleri Keşfet',
    secondaryCta: 'Teklif Talep Et',
  },

  // Captions are complete sentences with the verb in its natural final
  // position — the earlier fragments read as inverted Turkish.
  experience: [
    {
      mark: 'experience',
      label: 'Deneyim',
      value: '30 Yılı Aşkın',
      caption: 'Uluslararası kuruyemiş ticaretinde 30 yılı aşkın tecrübeye sahibiz.',
    },
    {
      // The value carries the whole noun phrase. Split as label "Ticaret Ağı"
      // over value "Küresel" it read backwards — the adjective landed under
      // the noun it was meant to qualify.
      mark: 'network',
      label: 'Kapsam',
      value: 'Küresel Ticaret Ağı',
      caption: 'Tedarik ve ihracatı uluslararası ölçekte yürütüyoruz.',
    },
    {
      mark: 'partnership',
      label: 'Çalışma Modeli',
      value: 'B2B',
      caption: 'Kurumsal iş ortaklarımıza tedarik ve ticaret hizmeti sunuyoruz.',
    },
  ],

  corporateIntro: {
    eyebrow: 'Hakkımızda',
    headingLines: ['Kuruyemiş Ticaretinde', '30 Yılı Aşkın Deneyim'],
    // Client-supplied "Hakkımızda" copy, verbatim (2026-08-29) — one string
    // per paragraph, not one long string, so it renders as the source text's
    // own four paragraphs rather than a single run-on block.
    body: [
      '30 yılı aşkın süredir kuruyemiş ticaretinin içinde yer alan köklü bir geleneğin temsilcisi olarak faaliyet gösteriyoruz. Sektörün farklı kademelerinde yıllar içinde edindiğimiz bilgi, deneyim ve ticari birikimi bugün Raymar Nuts çatısı altında müşterilerimizle buluşturuyoruz.',
      "Türkiye'nin seçkin kuruyemiş ürünlerini uluslararası pazarlara ihraç ederken, dünyanın farklı bölgelerinden özenle tedarik ettiğimiz ürünleri de Raymar Nuts güvencesiyle Türkiye pazarına sunuyoruz.",
      'Endüstriyel gıda üreticilerine yönelik ham madde tedarikimizin yanı sıra; paketlenerek doğrudan tüketiciye sunulmaya uygun çerezlik kuruyemiş çeşitlerinin de toptan satışını gerçekleştiriyoruz.',
      'Kalite, güvenilirlik ve sorumluluk anlayışını işimizin temelinde tutuyor; müşterilerimizle uzun vadeli ve sürdürülebilir iş birlikleri kurmayı hedefliyoruz. Kuruyemiş sektöründe faaliyet gösteren değerli firmalarla iş ortağı olarak birlikte büyümekten memnuniyet duyuyoruz.',
    ],
    // Points at #ticaret, not a "Hakkımızda" section of its own — "Kurumsal
    // Bilgiler" named a section that no longer exists after the rename.
    link: 'Ticaret Yaklaşımımız',
    imageAlt: 'Ceviz içi makro çekimi — temsili görsel',
  },

  walnut: {
    // Also the value the walnut cards send as the requested product group, so
    // it has to stay byte-identical to its entry in `quote.productOptions`.
    eyebrow: 'Ceviz İçi',
    heading: 'Ceviz İçinde Dört Ayrı Boy',
    categoryLabel: 'Ceviz İçi',
    detailsCta: 'Detayları Gör',
    quoteCta: 'Teklif Talep Et',
    // Wording unchanged from the literal it replaces — see `WalnutContent`.
    quoteCtaAriaTemplate: '{product} için teklif talep et',
    imagePending: 'Ürün görseli hazırlanıyor',
    // One group today, using the label the approved design already applies to
    // every walnut card. Further groups must be named by Raymar.
    groups: {
      'ceviz-ici': 'Ceviz İçi Ürünleri',
    },
    // Keys and order follow `walnutProductIds` — a size ladder, largest to
    // smallest. Bal Rengi, Kızıl, Süper Lüks and Lüks Naturel were removed
    // with the reduction to four grades.
    products: {
      yarim: {
        name: 'Yarım Ceviz İçi',
        imageAlt: 'Yarım ceviz içi — bütün yarımlar, dökme',
      },
      ceyrek: {
        name: 'Çeyrek Ceviz İçi',
        imageAlt: 'Çeyrek ceviz içi — iri parçalı, dökme',
      },
      kirik: {
        name: 'Kırık Ceviz İçi',
        imageAlt: 'Kırık ceviz içi — naylon kaplı koli içinde',
      },
      pirinc: {
        name: 'Pirinç Ceviz İçi',
        imageAlt: 'Pirinç ceviz içi — en küçük boy, dökme',
      },
    },
  },

  range: {
    eyebrow: 'Ürün Grupları',
    heading: 'Ürünlerimiz',
    detailsCta: 'Detayları Gör',
    categoryLabel: 'Ürün Grubu',
    quoteCta: 'Teklif Talep Et',
    // Wording unchanged from the literal it replaces — see `RangeContent`.
    quoteCtaAriaTemplate: '{product} için teklif talep et',
    imagePending: 'Ürün görseli hazırlanıyor',
    // Keyed in display order — see `rangeProductIds` in data/products.ts.
    products: {
      makademya: { name: 'Makadamya', imageAlt: 'Makadamya' },
      pikan: {
        name: 'Pikan Cevizi',
        imageAlt: 'Pikan cevizi — kabuklu ve iç, yakın çekim',
      },
      'kabak-cekirdegi': {
        name: 'Kabak Çekirdeği İçi',
        imageAlt: 'Kabak Çekirdeği İçi',
      },
      'aycekirdegi-ic': {
        name: 'Ay Çekirdeği İçi',
        imageAlt: 'Ay Çekirdeği İçi',
      },
      'aycekirdegi-cerezlik': {
        name: 'Çerezlik Ay Çekirdeği',
        imageAlt: 'Çerezlik Ay Çekirdeği',
      },
      'antep-fistigi': {
        name: 'Antep Fıstığı',
        imageAlt: 'Antep Fıstığı',
      },
    },
  },

  tradeStory: {
    eyebrow: 'Uluslararası Ticaret',
    // Client copy, 2026-08-31. "30" as a numeral, not "otuz", at their request.
    heading:
      'Kuruyemiş ticaretinde 30 yılı aşkın deneyimimizi, titizlik ve güvene dayalı bir anlayışla sürdürüyoruz.',
    intro:
      'Doğru ürün seçimi, güvenilir kaynaklar ve uzun vadeli iş ilişkileri; ticaret yaklaşımımızın temelini oluşturuyor.',
    // Başlık düzeni (her kelimenin ilk harfi büyük). "İş" noktalı İ ile —
    // Türkçede i'nin büyüğü İ'dir; CSS `text-transform` kullanılmıyor, çünkü
    // tarayıcının dil eşlemesine güvenmek yerine metin doğrudan doğru yazıldı.
    pillars: [
      'Uzun Soluklu Ticari Deneyim',
      'Güçlü Ürün Bilgisi',
      'Uluslararası Ticaret Deneyimi',
      'Güvenilir İş Ortaklıkları',
      'Sürdürülebilir Ticaret Anlayışı',
    ],
    closingLead:
      'Ürün ve tedarik ihtiyaçlarınızı bizimle paylaşın, ekibimiz size uygun seçeneklerle dönüş yapsın.',
    cta: 'Teklif Talep Et',
  },

  quote: {
    eyebrow: 'Teklif Talebi',
    heading: 'Ürün ve tedarik talepleriniz için iletişime geçin.',
    body: 'İlgilendiğiniz ürün grubunu ve ticari talebinizi paylaşın; Raymar ekibi sizinle iletişime geçsin.',
    addressLabel: 'Adres',
    addressLines: [
      'Marex Dış Tic. Ltd. Şti.',
      'Oruçreis Mah. Vadi Cad. No:108 K:8 D:491',
      'İstanbul Ticaret Sarayı 34235 Giyimkent',
      'Esenler / İstanbul',
    ],
    phoneLabel: 'Telefon',
    phoneValue: '+90 (541) 923 64 03',
    emailLabel: 'E-posta',
    emailValue: 'info@raymarnuts.com',
    fields: {
      name: { label: 'Ad Soyad', placeholder: 'Adınız ve soyadınız' },
      company: { label: 'Firma', placeholder: 'Firma adı' },
      // No `placeholder`: the field is a `<select>` now, and its placeholder
      // *option* is `countryPlaceholder` below, not an input placeholder.
      country: { label: 'Ülke' },
      email: { label: 'E-posta', placeholder: 'ornek@firma.com' },
      // No hardcoded "+90": the dial code is now shown as its own prefix,
      // driven by the selected country, so the placeholder only needs to
      // describe what belongs in the input itself.
      phone: { label: 'Telefon', placeholder: 'Telefon numarası' },
      product: { label: 'İlgilenilen Ürün' },
      message: {
        label: 'Talep Mesajı',
        placeholder: 'Ürün grubu, miktar ve teslim beklentinizi kısaca paylaşın.',
      },
    },
    productPlaceholder: 'Seçiniz',
    // Must stay in exact sync with the product card names: `quote-form.tsx`
    // matches the requested group against this list by string equality, and a
    // miss drops the visitor silently into "Diğer". Order matches the
    // homepage's own product priority — see `rangeProductIds`.
    productOptions: [
      'Makadamya',
      'Pikan Cevizi',
      'Kabak Çekirdeği İçi',
      'Ay Çekirdeği İçi',
      'Çerezlik Ay Çekirdeği',
      'Antep Fıstığı',
      'Ceviz İçi',
    ],
    otherProductOption: 'Diğer',
    countryPlaceholder: 'Seçiniz',
    countryOptions: quoteCountryOptions,
    mapLabel: 'Konum',
    mapTitle: 'Raymar Nuts konumu — Google Haritalar',
    // Şirket adı bilerek yok: sorgunun başında olduğunda Google Haritalar
    // yakındaki benzer adlı başka bir firmanın işletme kaydına eşleyip yanlış
    // binayı işaretliyordu. Yalnız posta adresi verilince doğru noktaya
    // geliyor. Bkz. `QuoteContent['mapQuery']`.
    mapQuery:
      'Oruçreis Mah. Vadi Cad. No:108, İstanbul Ticaret Sarayı, 34235 Giyimkent, Esenler, İstanbul',
    /*
     * The consent line names the cross-border transfer explicitly.
     *
     * KVKK m. 9 requires explicit consent for a transfer abroad, and explicit
     * consent has to be specific and informed. The quotation form reaches the
     * company through Brevo, whose infrastructure is in France, so the
     * transfer is not a hypothetical — it happens on every submission. Relying
     * on the linked aydınlatma metni alone to carry that fact would leave the
     * tick box consenting to something it does not mention.
     */
    consentText:
      'KVKK ve gizlilik politikası kapsamında verilerimin işlenmesine ve talebimin iletilmesi amacıyla yurt dışına aktarılmasına onay veriyorum.',
    consentLinks: [
      { href: legalPath('tr', 'kvkk'), label: 'KVKK Aydınlatma Metni' },
      { href: legalPath('tr', 'gizlilik'), label: 'Gizlilik Politikası' },
    ],
    submit: 'Talebi Gönder',
    requiredNote: '* Zorunlu alanlar',
    errorGeneric: 'Lütfen zorunlu alanları eksiksiz ve doğru doldurun.',
    errorConsent: 'Devam etmek için KVKK onayını işaretleyin.',
    errorFieldRequired: 'Bu alan zorunludur.',
    errorFieldEmail: 'Geçerli bir e-posta adresi girin.',
    errorSubmit:
      'Talebiniz şu anda iletilemedi. Lütfen tekrar deneyin ya da doğrudan bize ulaşın: +90 (541) 923 64 03 · info@raymarnuts.com',
    errorTooMany:
      'Bu bağlantıdan kısa sürede çok fazla talep gönderildi. Birkaç dakika bekleyip tekrar deneyebilir ya da bize doğrudan ulaşabilirsiniz: +90 (541) 923 64 03 · info@raymarnuts.com',
    noscriptNotice:
      'Tarayıcınızda JavaScript kapalı görünüyor. Form yine çalışır; gönderdiğinizde sonucu ayrı bir sayfada görürsünüz. Dilerseniz +90 (541) 923 64 03 numarasını arayabilir ya da info@raymarnuts.com adresine yazabilirsiniz.',
    submitting: 'Gönderiliyor…',
    successHeading: 'Talebiniz alındı.',
    successBody:
      'Raymar ekibi paylaştığınız bilgiler üzerinden sizinle iletişime geçecek.',
    summaryLabel: 'Gönderilecek bilgiler',
    resetCta: 'Yeni talep oluştur',
    emptyValue: '—',
    prefillTemplate: '{product} ürün grubu için teklif talebimi iletmek istiyorum.',
  },

  notFound: {
    code: '404',
    heading: 'Aradığınız sayfa bulunamadı.',
    cta: 'Ana Sayfaya Dön',
    metaTitle: 'Sayfa bulunamadı',
  },

  footer: {
    logoAlt: 'Raymar Nuts',
    blurb:
      'Raymar Nuts, Marex Dış Tic. Ltd. Şti. çatısı altında ceviz içi, makadamya, pikan cevizi, Antep fıstığı ve çekirdek ürünlerinde B2B kuruyemiş ticareti yürütür.',
    // Identity manual, p.145: the slogan is always set in quotation marks,
    // italic, gold. See docs/ASSET_AUDIT.md.
    tagline: '“Tane Tane Lezzetler”',
    corporate: {
      heading: 'Hakkımızda',
      links: [
        { href: '#ust', label: 'Ana Sayfa' },
        { href: '#hakkimizda', label: 'Hakkımızda' },
        { href: '#ticaret', label: 'Uluslararası Ticaret' },
        { href: libraryIndexPath('tr', 'guides'), label: 'Kuruyemiş Rehberi' },
        { href: '#teklif', label: 'İletişim' },
      ],
    },
    // Links are the product pages themselves — see `FooterContent.products`.
    products: {
      heading: 'Ürünler',
    },
    contactHeading: 'İletişim',
    addressLines: [
      'Marex Dış Tic. Ltd. Şti.',
      'Oruçreis Mah. Vadi Cad. No:108 K:8 D:491',
      'İstanbul Ticaret Sarayı 34235 Giyimkent',
      'Esenler / İstanbul',
    ],
    phoneValue: '+90 (541) 923 64 03',
    emailValue: 'info@raymarnuts.com',
    copyright: '© 2026 Raymar Nuts. Tüm hakları saklıdır.',
    // Real pages now exist under src/app/[locale]/(legal)/ — see
    // src/lib/legal.ts for the slugs. These used to point at `#teklif` (the
    // quotation form), which sent a visitor reading "Gizlilik Politikası"
    // straight into the form that collects their data instead of the
    // document its label promised.
    legalLinks: [
      { href: legalPath('tr', 'kvkk'), label: 'KVKK Aydınlatma Metni' },
      { href: legalPath('tr', 'gizlilik'), label: 'Gizlilik Politikası' },
      { href: legalPath('tr', 'cerez'), label: 'Çerez Politikası' },
    ],
  },

  /*
   * Drafted from verified facts only: the legal entity, Mersis number, tax
   * office and address transcribed in docs/ASSET_AUDIT.md §5 from the
   * corporate identity manual; the exact fields the quote form collects
   * (src/components/forms/quote-form.tsx); the security headers actually set
   * in public/.htaccess; and the confirmed absence of cookies, localStorage or
   * any third-party analytics anywhere in this codebase.
   *
   * Delivery, and why section 5 names a processor. `submitQuoteRequest`
   * (src/lib/quote-submission.ts) posts to public/teklif-gonder.php, which
   * hands the submission to Brevo's HTTPS API for delivery to
   * info@raymarnuts.com. That is not a design preference: the hosting plan
   * disables `mail()`, `sendmail` and every function that could reach them,
   * and drops outbound SMTP, so an external service is the only way a message
   * leaves the server at all — measured, see the header of teklif-gonder.php.
   *
   * Brevo is Sendinblue SAS, based in France, which makes every submission a
   * cross-border transfer under KVKK m. 9. Two things follow, and both are
   * done: section 5 names the processor and the transfer rather than saying
   * data stays in Türkiye, and `quote.consentText` says "yurt dışına
   * aktarılmasına" out loud — m. 9 wants explicit consent, and consent to
   * something the tick box does not mention is not explicit.
   *
   * One thing this text still does NOT claim: a KEP (Kayıtlı Elektronik Posta)
   * address, because none exists. info@raymarnuts.com is now listed as an
   * application channel alongside the postal address and the form — with the
   * Tebliğ's own qualifier, that it is valid from an e-mail address already
   * registered with the company, since a plain mailbox proves no identity by
   * itself. (The phone number is real, but a phone call is not a valid formal
   * başvuru channel — no identity verification, no written record — so it is
   * deliberately absent from the Art. 11 channels list below, not an oversight.)
   *
   * This is a drafted legal text grounded in KVKK's actual statutory
   * structure (Art. 10 disclosure order, Art. 11 rights, TTK Art. 82 retention
   * citation) — not filler — but it has not been reviewed by counsel. Treat it
   * the same as any other client-owned legal document on this site: publishable
   * as a good-faith draft, worth a lawyer's pass before it is load-bearing.
   */
  legal: {
    kvkk: {
      metaTitle: 'KVKK Aydınlatma Metni',
      metaDescription:
        'Raymar Nuts teklif formu aracılığıyla işlenen kişisel verilere ilişkin 6698 sayılı KVKK kapsamındaki aydınlatma metni.',
      eyebrow: 'Yasal',
      lastUpdatedLabel: 'Son güncelleme',
      heading: 'KVKK Aydınlatma Metni',
      lastUpdated: '2026-08-31',
      intro: [
        'İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") m. 10 ile Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, bu internet sitesi ("Site") üzerindeki teklif formu aracılığıyla işlenen kişisel verileriniz hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.',
      ],
      sections: [
        {
          heading: '1. Veri Sorumlusunun Kimliği',
          paragraphs: [
            'Kişisel verileriniz, veri sorumlusu sıfatıyla Marex Dış Tic. Ltd. Şti. ("Şirket") tarafından, Raymar Nuts markası altında yürütülen ticari faaliyetler kapsamında, aşağıda açıklanan amaç ve yöntemlerle işlenmektedir.',
          ],
          list: [
            'Unvan: Marex Dış Tic. Ltd. Şti.',
            'Mersis No: 0612100813400001',
            'Vergi Dairesi / No: Atışalanı Vergi Dairesi, 612 100 8134',
            'Adres: Oruçreis Mah. Vadi Cad. No:108 K:8 D:491, İstanbul Ticaret Sarayı 34235 Giyimkent, Esenler / İstanbul',
          ],
        },
        {
          heading: '2. İşlenen Kişisel Veriler ve Toplanma Yöntemi',
          paragraphs: [
            'Teklif formunu doldurmanız hâlinde, formda yer alan ve tarafınızca girilen aşağıdaki veriler, elektronik ortamda ve doğrudan sizin tarafınızdan sağlanmak suretiyle işlenir:',
          ],
          list: [
            'Kimlik bilgisi: ad ve soyad',
            'İletişim bilgisi: e-posta adresi, telefon numarası (belirtmeniz hâlinde), ülke bilgisi',
            'Mesleki / ticari bilgi: firma unvanı, ilgilendiğiniz ürün grubu',
            'Talep içeriği: formda yazdığınız talep mesajı',
          ],
        },
        {
          heading: '3. Kişisel Verilerin İşlenme Amaçları',
          paragraphs: ['Kişisel verileriniz aşağıdaki amaçlarla işlenir:'],
          list: [
            'İlettiğiniz teklif talebinin değerlendirilmesi ve yanıtlanması',
            'Tarafınızla ticari amaçlı iletişim kurulması ve olası bir iş ilişkisinin yürütülmesi',
            'Taleplere ilişkin kayıtların tutulması',
            'Şirketin ticari faaliyetlerinden doğan hukuki yükümlülüklerin (örn. ticari yazışmaların saklanması) yerine getirilmesi',
          ],
        },
        {
          heading: '4. Kişisel Verilerin İşlenmesinin Hukuki Sebebi',
          paragraphs: [
            'Kişisel verileriniz, teklif formunu göndermeden önce işaretlediğiniz onay kutusuyla verdiğiniz açık rızanız (KVKK m. 5/1) hukuki sebebine dayanılarak işlenmektedir. Onay kutusunu işaretlemediğiniz sürece form gönderilmez. Talebiniz gönderildikten sonra rızanızı geri çekmek isterseniz, 7. maddede açıklanan başvuru yollarını kullanabilirsiniz.',
          ],
        },
        {
          heading: '5. Kişisel Verilerin Aktarılması ve Yurt Dışına Aktarım',
          paragraphs: [
            'Talep formuyla ilettiğiniz kişisel veriler, yalnızca talebinizin değerlendirilmesi ve yanıtlanması amacıyla Şirket bünyesinde bu konuda yetkili personel tarafından görülür. Bu veriler pazarlama amacıyla kullanılmaz, satılmaz ve aşağıda belirtilen hizmet sağlayıcı dışında hiçbir üçüncü kişi veya kurumla paylaşılmaz.',
            'Formun Şirkete ulaşabilmesi için iki hizmet sağlayıcıdan yararlanılır: form gönderiminin teknik olarak işlendiği barındırma (hosting) sunucusu ve e-posta iletim altyapısı. E-posta iletimi, merkezi Fransa’da bulunan Brevo (Sendinblue SAS) tarafından sağlanmaktadır. Doldurduğunuz form, Şirketin kurumsal e-posta adresine iletilirken bu altyapı üzerinden geçer; dolayısıyla kişisel verileriniz KVKK m. 9 kapsamında yurt dışına aktarılmış olur. Aktarım, formu göndermeden önce işaretlediğiniz onay kutusuyla verdiğiniz açık rızaya dayanır. Fransa, Avrupa Birliği üyesi olarak Genel Veri Koruma Tüzüğü (GDPR) rejimine tabidir.',
            'Bunun dışında Şirket, talep süreçlerini yürütmek üzere ileride başka bir hizmet sağlayıcıdan (örneğin bir müşteri ilişkileri yönetimi sistemi) destek alırsa, bu durum işbu metne yansıtılacak ve söz konusu aktarım KVKK’nın öngördüğü şartlara uygun şekilde yürütülecektir.',
          ],
        },
        {
          heading: '6. Kişisel Verilerin Saklama Süresi',
          paragraphs: [
            'Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve her hâlükârda ilgili mevzuatta öngörülen azami süreler — örneğin, ticari yazışmalara ilişkin olarak 6102 sayılı Türk Ticaret Kanunu m. 82 uyarınca öngörülen 10 yıllık saklama yükümlülüğü — ile sınırlı olarak saklanır. Bu sürelerin sonunda kişisel verileriniz silinir, yok edilir veya anonim hâle getirilir.',
          ],
        },
        {
          heading: '7. KVKK Madde 11 Kapsamındaki Haklarınız',
          paragraphs: [
            'KVKK m. 11 uyarınca Şirkete başvurarak aşağıdaki haklarınızı kullanabilirsiniz:',
          ],
          list: [
            'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
            'İşlenmişse buna ilişkin bilgi talep etme',
            'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
            'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
            'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
            "KVKK m. 7'de öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
            'Düzeltme, silme ve yok etme taleplerinin, verilerin aktarıldığı üçüncü kişilere de bildirilmesini isteme',
            'İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
            'Kanuna aykırı işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
          ],
        },
        {
          heading: '8. Başvuru Yöntemi',
          paragraphs: [
            'Yukarıda sayılan haklarınıza ilişkin taleplerinizi, kimliğinizi tevsik edici belgelerle birlikte yazılı olarak Şirketin "Oruçreis Mah. Vadi Cad. No:108 K:8 D:491, İstanbul Ticaret Sarayı 34235 Giyimkent, Esenler / İstanbul" adresine iletebilir, daha önce Şirkete bildirdiğiniz ve sistemimizde kayıtlı bulunan elektronik posta adresinizi kullanarak info@raymarnuts.com adresine gönderebilir veya Site üzerindeki teklif formunu kullanarak bizimle iletişime geçebilirsiniz. Şirketin KEP (Kayıtlı Elektronik Posta) adresi üzerinden başvuru imkânı, bu bilgi yayımlandığında burada duyurulacaktır.',
            "Başvurunuz, talebin niteliğine göre en kısa sürede ve her hâlükârda KVKK'da öngörülen otuz (30) gün içinde sonuçlandırılır.",
          ],
        },
      ],
    },
    gizlilik: {
      metaTitle: 'Gizlilik Politikası',
      metaDescription:
        'Raymar Nuts internet sitesinin kişisel verilerin korunmasına ve ziyaretçi gizliliğine ilişkin uygulamalarını açıklayan gizlilik politikası.',
      eyebrow: 'Yasal',
      lastUpdatedLabel: 'Son güncelleme',
      heading: 'Gizlilik Politikası',
      lastUpdated: '2026-08-31',
      intro: [
        'Bu Gizlilik Politikası, Marex Dış Tic. Ltd. Şti. ("Şirket", "Raymar Nuts") tarafından işletilen bu internet sitesini ("Site") ziyaret ettiğinizde kişisel verilerinizin nasıl ele alındığını açıklar. Teklif formu aracılığıyla işlenen verilerin KVKK kapsamındaki işlenme amaçları, hukuki sebepleri ve haklarınız için KVKK Aydınlatma Metni\'ni inceleyebilirsiniz; bu Politika onu tamamlayan, daha genel bir çerçeve sunar.',
      ],
      sections: [
        {
          heading: 'Bu Site Kişisel Verilerinizi Nasıl Toplar',
          paragraphs: [
            'Site, ziyaretçilerinden kimlik doğrulama, üyelik veya benzeri bir işlem talep etmez. Kişisel verileriniz, yalnızca teklif formunu kendi isteğinizle doldurup gönderdiğinizde, formda yer alan alanlarla sınırlı olarak toplanır. Siteyi yalnızca gezinerek (form doldurmadan) ziyaret etmeniz hâlinde tarafınıza ait herhangi bir kişisel veri toplanmaz.',
          ],
        },
        {
          heading: 'Çerezler',
          paragraphs: [
            "Site'nin kendi kodu hiçbir çerez (cookie) yerleştirmez. Tek istisna, İletişim bölümündeki gömülü Google Haritalar haritasıdır — bu harita sayfa yüklendiğinde otomatik olarak yüklenir ve Google kendi çerezlerini yerleştirebilir. Ayrıntılı bilgi için Çerez Politikası'nı inceleyebilirsiniz.",
          ],
        },
        {
          heading: 'Üçüncü Taraf Hizmetleri ve Analitik',
          paragraphs: [
            'Bu Site herhangi bir üçüncü taraf analitik, reklam veya izleme hizmeti (örn. Google Analytics, reklam pikseli) kullanmamaktadır. Sitede kullanılan yazı tipleri (fontlar) sunucu üzerinden servis edilir; bu nedenle sayfayı görüntülemeniz herhangi bir üçüncü taraf yazı tipi sağlayıcısına istek gönderilmesine yol açmaz.',
            "Yalnızca iki üçüncü taraf hizmeti kullanılmaktadır. Birincisi, İletişim bölümündeki gömülü Google Haritalar haritasıdır; bu harita Google'ın kendi sunucularından yüklenir ve Google'ın kendi gizlilik uygulamalarına tabidir. İkincisi, yalnızca teklif formunu gönderdiğinizde devreye giren e-posta iletim altyapısıdır (Brevo — Sendinblue SAS, Fransa); formu göndermediğiniz sürece bu hizmete hiçbir veri ulaşmaz. Ayrıntı için KVKK Aydınlatma Metni'nin 5. maddesine bakabilirsiniz.",
          ],
        },
        {
          heading: 'Teknik Güvenlik Önlemleri',
          paragraphs: [
            'Site, aktarım güvenliğini sağlamak amacıyla HTTPS (SSL/TLS) üzerinden hizmet verecek şekilde yapılandırılmıştır. Sunucu yanıtlarında; içerik güvenliği politikası (Content-Security-Policy), HTTP Strict Transport Security (HSTS), tıklama hırsızlığı (clickjacking) saldırılarına karşı X-Frame-Options, içerik türü koklamasını (MIME sniffing) engelleyen X-Content-Type-Options ve tarayıcı izinlerini kısıtlayan Permissions-Policy gibi güvenlik başlıkları uygulanmaktadır.',
          ],
        },
        {
          heading: 'Barındırma (Hosting) Kaynaklı Teknik Kayıtlar',
          paragraphs: [
            'Her internet sitesinde olduğu gibi, siteyi barındıran sunucu; güvenlik ve arıza tespiti amacıyla IP adresi, tarayıcı ve işletim sistemi bilgisi, erişim tarihi/saati gibi standart teknik günlük (log) kayıtlarını tutabilir. Bu kayıtlar barındırma hizmet sağlayıcısının kendi güvenlik uygulamaları kapsamında oluşur; Şirket tarafından pazarlama veya profil oluşturma amacıyla kullanılmaz.',
          ],
        },
        {
          heading: 'Politikada Değişiklik',
          paragraphs: [
            'Bu Gizlilik Politikası, Site\'de sunulan hizmetlerdeki veya ilgili mevzuattaki değişikliklere bağlı olarak güncellenebilir. Güncel sürüm her zaman bu sayfada yayımlanır; sayfanın üst kısmındaki "son güncelleme" tarihi buna göre değişir.',
          ],
        },
        {
          heading: 'İletişim',
          paragraphs: [
            'Gizlilik uygulamalarımıza ilişkin sorularınız için Site üzerindeki teklif formunu kullanarak veya Şirket adresimize yazılı olarak başvurabilirsiniz.',
          ],
        },
      ],
    },
    cerez: {
      metaTitle: 'Çerez Politikası',
      metaDescription:
        'Raymar Nuts internet sitesinde kullanılan çerezleri ve gömülü Google Haritalar üzerinden gelebilecek üçüncü taraf çerezlerini açıklayan çerez politikası.',
      eyebrow: 'Yasal',
      lastUpdatedLabel: 'Son güncelleme',
      heading: 'Çerez Politikası',
      lastUpdated: '2026-08-21',
      intro: [
        'Bu Çerez Politikası, bu internet sitesinin ("Site") çerez kullanımına ilişkin uygulamasını açıklar.',
      ],
      sections: [
        {
          heading: 'Sitenin Kendi Çerezleri',
          paragraphs: [
            "Site'nin kendi kodu hiçbir çerez (cookie) yerleştirmez. Kimlik doğrulama, oturum takibi, analitik veya reklam amacıyla Site tarafından yerleştirilen herhangi bir birinci taraf çerez bulunmamaktadır.",
          ],
        },
        {
          heading: 'Google Haritalar — Üçüncü Taraf Çerezi',
          paragraphs: [
            "İletişim bölümünde adresimizi gösteren harita, Google Haritalar üzerinden gömülü (embed) olarak sunulur ve sayfa yüklendiği anda otomatik olarak yüklenir. Bu harita Google'ın kendi sunucularından servis edildiği için Google, kendi çerezlerini tarayıcınıza yerleştirebilir. Bu çerezler Site tarafından değil, Google tarafından belirlenir ve yönetilir; ayrıntılı bilgi için Google'ın kendi gizlilik ve çerez uygulamalarına (policies.google.com/privacy) başvurabilirsiniz.",
            "Bu tek istisna dışında, Site'de hiçbir üçüncü taraf çerezi (analitik, reklam veya hedefleme amaçlı) bulunmamaktadır.",
          ],
        },
        {
          heading: 'Benzer Teknolojiler',
          paragraphs: [
            'Site, tarayıcınızın yerel depolama alanlarını (localStorage, sessionStorage) kullanmamaktadır. Teklif formuna girdiğiniz bilgiler yalnızca formu doldurduğunuz sırada tarayıcı belleğinde tutulur; sayfayı yenilediğinizde veya kapattığınızda bu bilgiler saklanmaz.',
          ],
        },
        {
          heading: 'İleride Ek Çerez Kullanılması Hâlinde',
          paragraphs: [
            "Şirket, ileride site trafiğini ölçmek veya kullanıcı deneyimini iyileştirmek amacıyla ek çerez veya benzeri teknolojiler kullanmaya karar verirse, bu Politika güncellenecek; zorunlu olmayan çerezler için 6698 sayılı Kanun ve ilgili mevzuat uyarınca açık rızanızın alınacağı bir çerez onay mekanizması Site'ye eklenecektir.",
          ],
        },
        {
          heading: 'İletişim',
          paragraphs: [
            'Bu Politika hakkındaki sorularınız için info@raymarnuts.com adresine yazabilir veya Site üzerindeki teklif formunu kullanarak bizimle iletişime geçebilirsiniz.',
          ],
        },
      ],
    },
  },

  /*
   * Chrome for the product pages and guides; the documents themselves live in
   * `src/content/library/`. The index headings use the phrasing people search
   * with — "toptan kuruyemiş" and "kuruyemiş rehberi" both lead Google's
   * autocomplete for their topic.
   */
  library: {
    breadcrumbAriaLabel: 'Sayfa konumu',
    homeLabel: 'Ana Sayfa',
    products: {
      metaTitle: 'Toptan Kuruyemiş Ürünleri',
      metaDescription:
        'Toptan ceviz içi, Antep fıstığı, makadamya, pikan cevizi, kabak çekirdeği ve ay çekirdeği ürünleri: Raymar Nuts B2B kuruyemiş tedariki ve teklif talebi.',
      eyebrow: 'Ürünler',
      heading: 'Toptan Kuruyemiş Ürünleri',
      intro:
        'Raymar Nuts; ceviz içi, makadamya, pikan cevizi, Antep fıstığı, kabak çekirdeği içi, ay çekirdeği içi ve çerezlik ay çekirdeğini kurumsal alıcılara toptan olarak tedarik eder. Her ürün sayfasında ürünün ticarette nasıl sınıflandırıldığını, kullanım alanlarını ve depolama koşullarını bulabilirsiniz.',
      label: 'Ürünler',
    },
    guides: {
      metaTitle: 'Kuruyemiş Rehberi: Ceviz İçi ve Toptan Alım',
      metaDescription:
        'Ceviz içi çeşitleri ve renk sınıfları, saklama koşulları, pikan cevizi ile ceviz farkı, makadamya, toptan kuruyemiş alımı ve ihracat belgeleri üzerine rehberler.',
      eyebrow: 'Rehber',
      heading: 'Kuruyemiş Rehberi',
      intro:
        'Kuruyemiş ticaretinde sık sorulan soruları yanıtlayan rehberler: ceviz içi boyları ve renk sınıfları, saklama koşulları, ürün karşılaştırmaları, toptan alımda dikkat edilmesi gerekenler ve ihracat belgeleri.',
      label: 'Rehber',
    },
    faqHeading: 'Sık Sorulan Sorular',
    relatedGuidesHeading: 'İlgili Rehberler',
    relatedProductsHeading: 'İlgili Ürünler',
    productCardCta: 'Ürünü İncele',
    guideCardCta: 'Rehberi Oku',
    publishedLabel: 'Yayın tarihi',
    updatedLabel: 'Son güncelleme',
    readingTimeTemplate: '{minutes} dk. okuma',
    sourcesHeading: 'Kaynaklar',
    sourcesNote:
      'Bu sayfadaki bilgiler aşağıdaki yayınlara dayanır. Mevzuata ilişkin bilgiler, sayfanın hazırlandığı tarihteki durumu yansıtır; işlem öncesinde güncel metin resmî kaynağından kontrol edilmelidir.',
    sourceLanguages: { tr: 'Türkçe', en: 'İngilizce' },
    quoteBand: {
      eyebrow: 'Teklif Talebi',
      heading: 'Toptan fiyat teklifi alın',
      body: 'İhtiyaç duyduğunuz ürünü, boyu ve yaklaşık miktarı paylaşın; ekibimiz size uygun seçeneklerle dönüş yapsın.',
      cta: 'Teklif Talep Et',
    },
  },

  meta: {
    siteName: 'Raymar Nuts',
    // "toptan kuruyemiş" is the head term buyers type, and "toptan kuruyemiş
    // istanbul" leads its autocomplete; the company is in Esenler, İstanbul.
    title: 'Raymar Nuts | Toptan Kuruyemiş ve Ceviz İçi Tedariki',
    titleTemplate: '%s | Raymar Nuts',
    description:
      'İstanbul merkezli Raymar Nuts; ceviz içi, Antep fıstığı, makadamya, pikan cevizi, kabak ve ay çekirdeği ürünlerini kurumsal alıcılara toptan tedarik eder.',
    skipToContent: 'İçeriğe geç',
  },
}
