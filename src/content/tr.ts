import { legalPath } from '@/lib/legal'
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
        badge: '01',
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
    // Wording unchanged from the literal it replaces — see `WalnutContent`.
    quoteCtaAriaTemplate: '{product} için teklif talep et',
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
    // Wording unchanged from the literal it replaces — see `RangeContent`.
    quoteCtaAriaTemplate: '{product} için teklif talep et',
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
    closingLead:
      'Ürün ve tedarik talebinizi paylaşın, ekibimiz sizinle iletişime geçsin.',
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
   * in next.config.ts; and the confirmed absence of cookies, localStorage or
   * any third-party analytics anywhere in this codebase.
   *
   * Two things this text does NOT claim, because they are not yet true:
   *   - A connected form backend. `submitQuoteRequest` (src/lib/quote-submission.ts)
   *     is still a documented mock; nothing is transmitted anywhere yet. The
   *     KVKK metni describes the processing model a connected form will
   *     follow, in category terms (internal personnel, no named vendor),
   *     rather than naming a specific e-mail or CRM provider that does not
   *     exist yet.
   *   - A company e-mail or KEP address for KVKK applications — none has been
   *     supplied (see quote.phoneValue / footer.emailValue). The postal
   *     address and the quote form itself remain valid application channels
   *     until one is announced.
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
      lastUpdated: '2026-08-21',
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
            'Teklif formunu doldurmanız halinde, formda yer alan ve tarafınızca girilen aşağıdaki veriler, elektronik ortamda ve doğrudan sizin tarafınızdan sağlanmak suretiyle işlenir:',
          ],
          list: [
            'Kimlik bilgisi: ad ve soyad',
            'İletişim bilgisi: e-posta adresi, telefon numarası (belirtmeniz halinde), ülke bilgisi',
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
          heading: '5. Kişisel Verilerin Aktarılması',
          paragraphs: [
            'Talep formuyla ilettiğiniz kişisel veriler, yalnızca talebinizin değerlendirilmesi ve yanıtlanması amacıyla Şirket bünyesinde bu konuda yetkili personel tarafından görülür. Bu veriler, açık rızanız veya kanunda öngörülen istisnai haller dışında üçüncü kişi veya kurumlarla paylaşılmaz, yurt dışına aktarılmaz.',
            "Şirketin talep süreçlerini yürütmek üzere ileride bir e-posta gönderim hizmeti veya müşteri ilişkileri yönetimi (CRM) sistemi gibi bir hizmet sağlayıcıdan destek alması halinde, bu durum işbu metne yansıtılacak ve söz konusu aktarım KVKK'nın öngördüğü şartlara uygun şekilde yürütülecektir.",
          ],
        },
        {
          heading: '6. Kişisel Verilerin Saklama Süresi',
          paragraphs: [
            'Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve her hâlükârda ilgili mevzuatta öngörülen azami süreler — örneğin, ticari yazışmalara ilişkin olarak 6102 sayılı Türk Ticaret Kanunu m. 82 uyarınca öngörülen 10 yıllık saklama yükümlülüğü — ile sınırlı olarak saklanır. Bu sürelerin sonunda kişisel verileriniz silinir, yok edilir veya anonim hale getirilir.',
          ],
        },
        {
          heading: '7. KVKK Madde 11 Kapsamındaki Haklarınız',
          paragraphs: ['KVKK m. 11 uyarınca Şirkete başvurarak:'],
          list: [
            'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
            'İşlenmişse buna ilişkin bilgi talep etme',
            'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
            'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
            'Eksik veya yanlış işlenmişse düzeltilmesini isteme',
            "KVKK m. 7'de öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme",
            'Düzeltme, silme ve yok etme taleplerinin, verilerin aktarıldığı üçüncü kişilere de bildirilmesini isteme',
            'İşlenen verilerin münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
            'Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme',
          ],
        },
        {
          heading: '8. Başvuru Yöntemi',
          paragraphs: [
            'Yukarıda sayılan haklarınıza ilişkin taleplerinizi, kimliğinizi tevsik edici belgelerle birlikte yazılı olarak Şirketin "Oruçreis Mah. Vadi Cad. No:108 K:8 D:491, İstanbul Ticaret Sarayı 34235 Giyimkent, Esenler / İstanbul" adresine iletebilir veya Site üzerindeki teklif formunu kullanarak bizimle iletişime geçebilirsiniz. Şirketçe açıklanacak bir e-posta veya KEP (Kayıtlı Elektronik Posta) adresi üzerinden başvuru imkânı, bu bilgiler yayımlandığında burada duyurulacaktır.',
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
      lastUpdated: '2026-08-21',
      intro: [
        'Bu Gizlilik Politikası, Marex Dış Tic. Ltd. Şti. ("Şirket", "Raymar Nuts") tarafından işletilen bu internet sitesini ("Site") ziyaret ettiğinizde kişisel verilerinizin nasıl ele alındığını açıklar. Teklif formu aracılığıyla işlenen verilerin KVKK kapsamındaki işlenme amaçları, hukuki sebepleri ve haklarınız için KVKK Aydınlatma Metni\'ni inceleyebilirsiniz; bu Politika onu tamamlayan, daha genel bir çerçeve sunar.',
      ],
      sections: [
        {
          heading: 'Bu Site Kişisel Verilerinizi Nasıl Toplar',
          paragraphs: [
            'Site, ziyaretçilerinden kimlik doğrulama, üyelik veya benzeri bir işlem talep etmez. Kişisel verileriniz, yalnızca teklif formunu kendi isteğinizle doldurup gönderdiğinizde, formda yer alan alanlarla sınırlı olarak toplanır. Siteyi yalnızca gezinerek (form doldurmadan) ziyaret etmeniz halinde tarafınıza ait herhangi bir kişisel veri toplanmaz.',
          ],
        },
        {
          heading: 'Çerezler',
          paragraphs: [
            "Site herhangi bir çerez (cookie) kullanmamaktadır. Ayrıntılı bilgi için Çerez Politikası'nı inceleyebilirsiniz.",
          ],
        },
        {
          heading: 'Üçüncü Taraf Hizmetleri ve Analitik',
          paragraphs: [
            'Bu Site şu anda herhangi bir üçüncü taraf analitik, reklam veya izleme hizmeti (örn. Google Analytics, reklam pikseli) kullanmamaktadır. Sitede kullanılan yazı tipleri (fontlar) sunucu üzerinden servis edilir; bu nedenle sayfayı görüntülemeniz herhangi bir üçüncü taraf yazı tipi sağlayıcısına istek gönderilmesine yol açmaz.',
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
        'Raymar Nuts internet sitesinin çerez (cookie) kullanmadığını açıklayan çerez politikası.',
      eyebrow: 'Yasal',
      lastUpdatedLabel: 'Son güncelleme',
      heading: 'Çerez Politikası',
      lastUpdated: '2026-08-21',
      intro: [
        'Bu Çerez Politikası, bu internet sitesinin ("Site") çerez kullanımına ilişkin uygulamasını açıklar.',
      ],
      sections: [
        {
          heading: 'Çerez Kullanılmamaktadır',
          paragraphs: [
            'Bu Site, ziyaretiniz sırasında hiçbir çerez (cookie) yerleştirmez. Sitede; oturum çerezi, tercih çerezi, performans/analitik çerez, reklam veya hedefleme çerezi ile herhangi bir üçüncü taraf çerezi bulunmamaktadır.',
            "Bu nedenle Site'yi ziyaret etmeniz için herhangi bir çerez onayı vermeniz gerekmez ve Site'de bir çerez onay bandı gösterilmez.",
          ],
        },
        {
          heading: 'Benzer Teknolojiler',
          paragraphs: [
            'Site, tarayıcınızın yerel depolama alanlarını (localStorage, sessionStorage) da kullanmamaktadır. Teklif formuna girdiğiniz bilgiler yalnızca formu doldurduğunuz sırada tarayıcı belleğinde tutulur; sayfayı yenilediğinizde veya kapattığınızda bu bilgiler saklanmaz.',
          ],
        },
        {
          heading: 'İleride Çerez Kullanılması Hâlinde',
          paragraphs: [
            "Şirket, ileride site trafiğini ölçmek veya kullanıcı deneyimini iyileştirmek amacıyla çerez veya benzeri teknolojiler kullanmaya karar verirse, bu Politika güncellenecek; zorunlu olmayan çerezler için 6698 sayılı Kanun ve ilgili mevzuat uyarınca açık rızanızın alınacağı bir çerez onay mekanizması Site'ye eklenecektir.",
          ],
        },
        {
          heading: 'İletişim',
          paragraphs: [
            'Bu Politika hakkındaki sorularınız için Site üzerindeki teklif formunu kullanarak bizimle iletişime geçebilirsiniz.',
          ],
        },
      ],
    },
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
