import type { Dictionary } from '@/types/content'

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
    { id: 'kurumsal', label: 'Kurumsal' },
    { id: 'urunler', label: 'Ürünler' },
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
    localePending: 'İngilizce içerik hazırlanıyor',
  },

  hero: {
    cueLabel: 'Ürünleri Keşfet',
    posterAlt: '',
  },

  statement: {
    // Set in title case; `.eyebrow` uppercases it in CSS, and the document is
    // lang="tr-TR" so the i/İ mapping is the Turkish one.
    eyebrow: 'B2B Kuruyemiş Ticareti',
    headingLines: ['Kuruyemiş Tedarikinde', '25 Yıllık Ticaret Deneyimi'],
    body: 'Ceviz içi başta olmak üzere fındık, Antep fıstığı, çekirdek ürünleri ve makademyada kurumsal alıcılara yönelik B2B ticaret yürütüyoruz.',
    primaryCta: 'Ürünleri Keşfet',
    secondaryCta: 'Teklif Talep Et',
  },

  // Captions are complete sentences with the verb in its natural final
  // position — the earlier fragments read as inverted Turkish.
  experience: [
    {
      mark: 'experience',
      label: 'Deneyim',
      value: '25 Yıl',
      caption: 'Uluslararası kuruyemiş ticaretinde çeyrek asırlık birikime sahibiz.',
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
    eyebrow: 'Kurumsal',
    headingLines: ['Kuruyemiş Ticaretinde', '25 Yıllık Deneyim'],
    body: 'Raymar Nuts, Marex Dış Tic. Ltd. Şti. çatısı altında; ceviz içi, fındık, Antep fıstığı, çekirdek ürünleri ve makademyanın B2B ticaretini yürütür.',
    link: 'Kurumsal Bilgiler',
    imageAlt: 'Fındık makro çekimi — temsili görsel',
  },

  portfolio: {
    eyebrow: 'Ürün Portföyü',
    heading: 'Kurumsal alımlar için geniş kuruyemiş portföyü',
    intro:
      'Ceviz içinden fındığa, Antep fıstığından çekirdek ürünleri ve makademyaya uzanan B2B ürün gamı.',
    cards: {
      findik: {
        badge: '01 · Amiral Ürün',
        title: 'Fındık',
        subtitle: 'Kabuklu ve İç',
        imageAlt: 'Fındık ürün grubu (temsili görsel)',
      },
      ceviz: {
        badge: '02',
        title: 'Ceviz İçi',
        subtitle: '7 Ayrı Kalite',
        imageAlt: 'Ceviz içi ürün grubu (temsili görsel)',
      },
      'kabak-cekirdegi': {
        badge: '',
        title: 'Kabak Çekirdeği İçi',
        imageAlt: 'Kabak çekirdeği içi (temsili görsel)',
      },
      'antep-fistigi': {
        badge: '',
        title: 'Antep Fıstığı',
        imageAlt: 'Antep Fıstığı',
      },
      makademya: {
        badge: '',
        title: 'Makademya',
        imageAlt: 'Makademya (temsili görsel)',
      },
      aycekirdegi: {
        badge: '',
        title: 'Ayçekirdeği',
        imageAlt: 'Ayçekirdeği (temsili görsel)',
      },
    },
  },

  walnut: {
    // Also the value the walnut cards send as the requested product group, so
    // it has to stay byte-identical to its entry in `quote.productOptions`.
    eyebrow: 'Ceviz İçi',
    heading: 'Ceviz İçinde Yedi Ayrı Kalite',
    intro:
      'Bal Rengi, Kızıl, Pirinç, Kırık, Süper Lüks Yarım Beyaz, Lüks Naturel ve Çeyrek olmak üzere yedi farklı ceviz içi kalitesi sunulur.',
    categoryLabel: 'Ceviz İçi',
    detailsCta: 'Detayları Gör',
    quoteCta: 'Teklif Talep Et',
    // The second sentence is the CC BY-SA 4.0 attribution that `walnut-rice.jpg`
    // (the Pirinç card) legally requires. It is the only attributed image on the
    // site; remove this credit only when that photograph is replaced by an
    // own-shoot or a no-attribution licence. See docs/ASSET_AUDIT.md.
    footnote:
      'Görseller temsilidir; nihai ürün fotoğrafları firma tarafından sağlanacaktır. Pirinç görseli: Bodhi Peace, Wikimedia Commons, CC BY-SA 4.0.',
    imagePending: 'Ürün görseli hazırlanıyor',
    // One group today, using the label the approved design already applies to
    // every walnut card. Further groups must be named by Raymar.
    groups: {
      'ceviz-ici': 'Ceviz İçi Ürünleri',
    },
    products: {
      'bal-rengi': {
        name: 'Bal Rengi Ceviz İçi',
        imageAlt: 'Bal Rengi Ceviz İçi (temsili görsel)',
      },
      kizil: {
        name: 'Kızıl Ceviz İçi',
        imageAlt: 'Kızıl Ceviz İçi (temsili görsel)',
      },
      pirinc: {
        name: 'Pirinç Ceviz İçi',
        imageAlt: 'Pirinç Ceviz İçi (temsili görsel)',
      },
      kirik: {
        name: 'Kırık Ceviz İçi',
        imageAlt: 'Kırık Ceviz İçi (temsili görsel)',
      },
      'super-luks-yarim-beyaz': {
        name: 'Süper Lüks – Yarım Beyaz Ceviz İçi',
        imageAlt: 'Süper Lüks – Yarım Beyaz Ceviz İçi (temsili görsel)',
      },
      'luks-naturel': {
        name: 'Lüks Ceviz İçi – Naturel',
        imageAlt: 'Lüks Ceviz İçi – Naturel (temsili görsel)',
      },
      ceyrek: {
        name: 'Çeyrek Ceviz İçi',
        imageAlt: 'Çeyrek Ceviz İçi (temsili görsel)',
      },
    },
  },

  range: {
    eyebrow: 'Ürün Grupları',
    heading: 'Ürünlerimiz',
    intro:
      'Ceviz içinin yanı sıra fındık, Antep fıstığı, kabak çekirdeği içi, ayçekirdeği içi, çerezlik ayçekirdeği ve makademya ürün gamımızda yer alır.',
    categoryLabel: 'Ürün Grubu',
    quoteCta: 'Teklif Talep Et',
    imagePending: 'Ürün görseli hazırlanıyor',
    products: {
      findik: {
        name: 'Fındık',
        imageAlt: 'Kabuklu fındık',
        description:
          'Kabuklu ve iç fındık seçenekleri, kurumsal alım ve B2B ticaret talepleri kapsamında sunulur.',
      },
      'antep-fistigi': {
        name: 'Antep Fıstığı',
        imageAlt: 'Antep Fıstığı',
      },
      'kabak-cekirdegi': {
        name: 'Kabak Çekirdeği İçi',
        imageAlt: 'Kabak Çekirdeği İçi',
      },
      'aycekirdegi-ic': {
        name: 'Ayçekirdeği İçi',
        imageAlt: 'Ayçekirdeği İçi',
      },
      'aycekirdegi-cerezlik': {
        name: 'Çerezlik Ayçekirdeği',
        imageAlt: 'Çerezlik Ayçekirdeği',
      },
      makademya: { name: 'Makademya', imageAlt: 'Makademya' },
    },
  },

  tradeStory: {
    eyebrow: 'Uluslararası Ticaret',
    heading: 'Kuruyemiş ticaretini çeyrek asırdır aynı disiplinle yürütüyoruz.',
    // NEW COPY — written here, not transcribed from the approved design. It
    // makes no factual claim beyond the 25 years the client confirmed.
    intro:
      'Bu iş; ürünü tanımayı, doğru kaynağa ulaşmayı ve verilen sözü zamanında tutmayı gerektirir. Ticaret yaklaşımımızı beş başlıkta topluyoruz.',
    pillars: [
      'Uzun soluklu ticari deneyim',
      'Ürün bilgisi',
      'Uluslararası ticaret yaklaşımı',
      'Kurumsal iş ortaklıkları',
      'Süreklilik',
    ],
    closingLead: 'Ürün ve tedarik talebinizi paylaşın, ekibimiz sizinle iletişime geçsin.',
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
    phoneValue: '[Telefon bilgisi eklenecek]',
    emailLabel: 'E-posta',
    emailValue: '[E-posta bilgisi eklenecek]',
    fields: {
      name: { label: 'Ad Soyad', placeholder: 'Adınız ve soyadınız' },
      company: { label: 'Firma', placeholder: 'Firma adı' },
      country: { label: 'Ülke', placeholder: 'Ülke' },
      email: { label: 'E-posta', placeholder: 'ornek@firma.com' },
      phone: { label: 'Telefon', placeholder: '+90' },
      product: { label: 'İlgilenilen Ürün' },
      message: {
        label: 'Talep Mesajı',
        placeholder: 'Ürün grubu, miktar ve teslim beklentinizi kısaca paylaşın.',
      },
    },
    productPlaceholder: 'Seçiniz',
    // Must stay in exact sync with the product card names: `quote-form.tsx`
    // matches the requested group against this list by string equality, and a
    // miss drops the visitor silently into "Diğer".
    productOptions: [
      'Fındık',
      'Ceviz İçi',
      'Antep Fıstığı',
      'Kabak Çekirdeği İçi',
      'Ayçekirdeği İçi',
      'Çerezlik Ayçekirdeği',
      'Makademya',
    ],
    otherProductOption: 'Diğer',
    consentText:
      'KVKK ve gizlilik politikası kapsamında verilerimin işlenmesine onay veriyorum.',
    consentPolicyNote: '[Politika metni eklenecek]',
    submit: 'Talebi Gönder',
    requiredNote: '* Zorunlu alanlar',
    errorGeneric: 'Lütfen zorunlu alanları eksiksiz ve doğru doldurun.',
    errorConsent: 'Devam etmek için KVKK onayını işaretleyin.',
    errorFieldRequired: 'Bu alan zorunludur.',
    errorFieldEmail: 'Geçerli bir e-posta adresi girin.',
    errorSubmit: 'Talebiniz şu anda iletilemedi. Lütfen tekrar deneyin.',
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
      'Raymar Nuts, Marex Dış Tic. Ltd. Şti. çatısı altında ceviz içi, fındık, Antep fıstığı, çekirdek ürünleri ve makademyada B2B kuruyemiş ticareti yürütür.',
    // Identity manual, p.145: the slogan is always set in quotation marks,
    // italic, gold. See docs/ASSET_AUDIT.md.
    tagline: '“Tane Tane Lezzetler”',
    corporate: {
      heading: 'Kurumsal',
      links: [
        { href: '#ust', label: 'Ana Sayfa' },
        { href: '#kurumsal', label: 'Kurumsal' },
        { href: '#ticaret', label: 'Uluslararası Ticaret' },
        { href: '#teklif', label: 'İletişim' },
      ],
    },
    products: {
      heading: 'Ürünler',
      links: [
        { href: '#urunlerimiz', label: 'Fındık' },
        { href: '#ceviz', label: 'Ceviz İçi' },
        { href: '#urunlerimiz', label: 'Antep Fıstığı' },
        { href: '#urunlerimiz', label: 'Kabak Çekirdeği İçi' },
        { href: '#urunlerimiz', label: 'Ayçekirdeği' },
        { href: '#urunlerimiz', label: 'Makademya' },
      ],
    },
    contactHeading: 'İletişim',
    addressLines: [
      'Marex Dış Tic. Ltd. Şti.',
      'Oruçreis Mah. Vadi Cad. No:108 K:8 D:491',
      'İstanbul Ticaret Sarayı 34235 Giyimkent',
      'Esenler / İstanbul',
    ],
    phoneValue: '[Telefon bilgisi eklenecek]',
    emailValue: '[E-posta bilgisi eklenecek]',
    copyright: '© 2026 Raymar Nuts. Tüm hakları saklıdır.',
    legalLinks: [
      { href: '#teklif', label: 'Gizlilik Politikası' },
      { href: '#teklif', label: 'KVKK Aydınlatma Metni' },
      { href: '#teklif', label: 'Yasal Bilgiler' },
    ],
  },

  meta: {
    siteName: 'Raymar Nuts',
    title: 'Raymar Nuts | B2B Kuruyemiş Ticareti ve Tedariki',
    titleTemplate: '%s | Raymar Nuts',
    description:
      'Raymar Nuts; ceviz içi, fındık, Antep fıstığı, çekirdek ürünleri ve makademyada kurumsal alıcılara yönelik B2B ticaret ve tedarik hizmeti sunar.',
    skipToContent: 'İçeriğe geç',
  },
}
