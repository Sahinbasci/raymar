# İçerik Doldurma Formu (Content Intake)

Sitedeki tüm placeholder / stok / doğrulanmamış içeriği gerçeğiyle değiştirmek
için hazırlanmış soru listesi. Cevapları hazırlayıp (AI ile taslak çıkarabilirsin)
geri ver; ben ilgili dosyalara işlerim.

> **Durum notu.** Bu form yazıldıktan sonra site birkaç yapısal değişiklik
> geçirdi: "30 yıl" sorusu **25 yıl olarak cevaplanıp** tüm metinlere işlendi
> (K1 altında not düşüldü); "Fındık — Amiral Ürün" bölümü ayrı bir bölüm olmaktan
> çıkıp `range-section` ("Ürünlerimiz") içine katıldı; o birleşik bölüm artık 4
> değil **6** ürün taşıyor (Pikan Cevizi çıktı, Antep Fıstığı ve Ayçekirdeği iki
> ayrı karta bölündü — iç ve çerezlik). İlgili maddeler aşağıda güncellendi;
> geri kalanı hâlâ geçerli.

## Nasıl kullanılır

Her alanın yanında **etiketi** var:

- 🟢 **[ONAYLI]** — tasarımdan gelen, şu an iyi olan metin. Sadece değiştirmek
  istersen dokun.
- 🟡 **[DOLDUR]** — AI ile taslak yazılabilir, ama **gerçek bilgiye dayanmalı**
  (firma hakkında doğru olgular). Uydurma pazarlama cümlesi değil.
- 🔴 **[FİRMA VERİSİ]** — AI **üretemez**. Telefon, e-posta, sertifika, gerçek
  fotoğraf, yasal metin, gerçek istatistik gibi yalnızca firmadan gelebilecek
  şeyler. Yanlışı hukuki/ticari risk.
- 🔵 **[GÖRSEL]** — fotoğraf dosyası gerekiyor (aşağıda ayrı liste).

Her alanın sonundaki `kod.yolu` → içeriğin kaynak dosyadaki yeri
(`src/content/tr.ts`). Cevap verirken alan adını yazman yeter.

---

## ⚠️ ÖNCE BUNLAR — tüm siteyi etkiler

Bu üç karar cevaplanmadan gerisini yazmak boşa gider; çünkü metnin her yerine
yayılıyorlar.

### K1. "30 yıl" gerçek mi? ✅ CEVAPLANDI — 25 yıl

Cevaplandı: **25 yıl**. Sitedeki her yer buna göre güncellendi (hero, deneyim
şeridi, kurumsal başlık) — "30" hiçbir yerde kalmadı. Kuruluş yılı hâlâ
kurumsal kimlik kılavuzunda yazmadığı ve ayrıca sağlanmadığı için sitede
**hiçbir yerde iddia edilmiyor** (bilinçli tercih — bkz. `docs/ASSET_AUDIT.md`
§5). Sağlanırsa yapısal veriye (SEO/JSON-LD) eklenebilir.

### K2. Hangi tüzel kişilik + domain? 🔴 [FİRMA VERİSİ]

Kimlik kılavuzundaki tüm iletişim bilgileri **MAREX DIŞ TİC. LTD. ŞTİ.** ve
`marasintl.com` alan adına ait — bir Raymar domaini yok.

- Sitenin yayınlanacağı alan adı nedir? (ör. `raymar.com`) → `NEXT_PUBLIC_SITE_URL`
- İletişimde görünecek tüzel kişilik hangisi: MAREX mi, Raymar markası mı?
- Kullanılacak kurumsal e-posta ve alan adı? (aşağıda K11'de tekrar)

### K3. Ürün sayıları ve adları kesin mi? 🔴 [FİRMA VERİSİ]

Tasarımda **7 ceviz içi** + **4 ithal ürün** var, adları tasarımdan geldi.

- Bu 7 ceviz içi çeşidi ve 4 ithal ürün adı doğru mu? Ekleme/çıkarma var mı?
- "Yedi ürün grubu" ibaresi ürün sayısına bağlı — sayı değişirse bu da değişir.

---

## 1. Header / Navigasyon 🟢 [ONAYLI]

**Nerede:** Üst sabit menü + mobil çekmece.
**Şu an:** Ana Sayfa · Kurumsal · Ürünler · Uluslararası Ticaret · İletişim + "Teklif Talep Et".

- Menü isimleri bu haliyle kalsın mı? Değişecek bir başlık var mı? → `nav`
- CTA butonu metni "Teklif Talep Et" kalsın mı? → `header.cta`

---

## 2. Hero (Açılış videosu) 🟢 [ONAYLI] / 🔵 [GÖRSEL]

**Nerede:** Tam ekran açılış.
**Şu an:** Onaylı video + poster görseli. Altında "Ürünleri Keşfet" oku.

- Video onaylı, dokunmuyorum. Değişecekse yeni dosya ver. 🔵
- Alt yazı "Ürünleri Keşfet" kalsın mı? → `hero.cueLabel`

---

## 3. Giriş Sözü (Ana başlık) ✅ GÜNCELLENDİ

**Nerede:** Videonun altındaki koyu yeşil blok. Sayfanın **tek H1**'i.
**Şu an** (eski "Doğadan Seçilen Ürünler, Dünyaya Güvenle." yerine güncellendi):

> "Kuruyemiş Tedarikinde 25 Yıllık Ticaret Deneyimi"
> "Ceviz içi başta olmak üzere fındık, Antep fıstığı, çekirdek ürünleri ve makademyada kurumsal alıcılara yönelik B2B ticaret yürütüyoruz."

- Ana başlık kalsın mı, yoksa alternatif ister misin? (**2 satır, 4–8 kelime**,
  kısa ve iddialı) → `statement.headingLines`
- Alt metin kalsın mı? (**1–2 cümle, ~25–40 kelime**; ne yaptığınızı özetler) → `statement.body`
- İki buton: "Ürünleri Keşfet" + "Teklif Talep Et" — kalsın mı? → `statement.primaryCta` / `secondaryCta`

---

## 4. Deneyim Şeridi (4 kutu) 🟡 [DOLDUR] + 🔴 [FİRMA VERİSİ]

**Nerede:** Krem zeminde 4 sütun.
**Şu an:** Deneyim/**30 Yıl** · Ana Uzmanlık/**Fındık** · Portföy/**Ceviz** · Model/**B2B**.

Her kutu: küçük etiket + büyük değer + kısa açıklama.

- Kutu 1 değeri (30 Yıl) → **K1**'e bağlı. 🔴 → `experience[0]`
- Bu 4 kutu (Deneyim, Ana Uzmanlık, Portföy, Model) doğru eksenler mi? Değişsin mi?
- Her kutunun **açıklaması** kalsın mı? (**3–6 kelime**) → `experience[].caption`
- Not: sayı/istatistik eklemek istersen (ör. "X ülke", "Y ton") **sadece gerçekse**. 🔴

---

## 5. Kurumsal Giriş 🟡 [DOLDUR]

**Nerede:** Krem zemin, solda metin + sağda yuvarlak fındık görseli.
**Şu an:**

> Başlık: "Kuruyemiş ticaretinde otuz yıllık deneyim."
> Metin: "Raymar Nuts, uluslararası kuruyemiş ticaretinde uzun yıllara dayanan tecrübesiyle; ana uzmanlık alanı olan fındığın yanında ceviz ve seçkin ithal ürün gruplarında kurumsal iş ortaklarına hizmet verir."

- Başlık (**2 satır, ~5–8 kelime**) → `corporateIntro.headingLines`
- Kurumsal tanıtım metni (**2–3 cümle, ~40–60 kelime**). Firmayı gerçekçi anlat:
  ne yaparsınız, kimlere, hangi değerle. → `corporateIntro.body`
- "Kurumsal Bilgiler" linki nereye gitmeli? (şu an ticaret bölümüne) → `corporateIntro.link`

---

## 6. Fındık — Amiral Ürün — KALDIRILDI, ARTIK SORULMUYOR

Ayrı bir "Fındık — Amiral Ürün" bölümü artık yok: build sırasında bölüm 9'daki
("Seçkin İthal Ürünler") ile birleştirilip tek bir `range-section`
("Ürünlerimiz") oldu — gerekçesi hazelnut/pistachio'nun Türkiye kaynaklı olup
"ithal" başlığı altında yanlış konumlanmasıydı. Bu maddedeki sorular (başlık,
metin, placeholder not, CTA) geçersiz; aşağıdaki madde 9'a bakın.

---

## 7. Ürün Portföyü (Mozaik) 🟢 [ONAYLI]

**Nerede:** "Üç ana ürün grubu" başlıklı kart mozaiği (Fındık büyük + Ceviz + 4 küçük).
**Şu an:** Onaylı. Fındık kartının rozeti eskiden "01 · Amiral Ürün" idi,
artık sade **"01"** — düzyazının tamamı ceviz içini öne çıkardığı için rozet
onunla çelişiyordu (bkz. madde 6).

- Başlık ve giriş cümlesi kalsın mı? → `portfolio.heading` / `portfolio.intro`
- Kartların üstündeki rozet/alt yazılar ("01 · Amiral Ürün", "Yedi ürün grubu",
  "Ana uzmanlık alanı") → **K3**'e bağlı. → `portfolio.cards`

---

## 8. Ceviz İçi Ürünleri (7 kart) 🔴 [FİRMA VERİSİ] + 🟡 [DOLDUR]

**Nerede:** Krem zemin, 7 ürün kartı.
**Şu an ürün adları:** Bal Rengi · Kızıl · Pirinç · Kırık · Süper Lüks–Yarım Beyaz ·
Lüks–Naturel · Çeyrek Ceviz İçi.

- Bu 7 ad **kesin doğru mu**? (ticari sınıflandırma — sadece firma bilir) 🔴 → `walnut.products`
- Başlık "Ceviz içi ürün grupları." + giriş cümlesi kalsın mı? → `walnut.heading` / `walnut.intro`
- Kategoriye ayırmak ister misin? (ör. "Yarım", "Çeyrek", "Kırık" grupları). Grup
  isimlerini verirsen kartları başlıklara böleriz. Vermezsen tek blok kalır. 🔴 → `walnut.groups`
- 🔴 Kart altındaki "Detayları Gör" şu an teklif formuna atıyor (detay sayfası yok,
  bu senin kararındı). Değişmedi.
- 🔴 Dipnot (placeholder): "Görseller temsilidir…" → gerçek fotoğraflar gelince
  **kaldırılır** (bkz. Görsel listesi). → `walnut.footnote`

---

## 9. Ürünlerimiz (6 kart, eskiden "Seçkin İthal Ürünler" + Fındık — birleşti) 🔴 [FİRMA VERİSİ]

**Nerede:** Krem zemin, tek satırlık ürün kartı ızgarası (`range-section`).
**Şu an:** Fındık · Antep Fıstığı · Kabak Çekirdeği İçi · Ayçekirdeği İçi ·
Çerezlik Ayçekirdeği · Makademya — 4 değil **6 kart**. "Pikan Cevizi" listeden
çıktı; Antep Fıstığı ve Ayçekirdeği artık ikişer ayrı karta bölünmüş durumda
(iç ve çerezlik). Fındık da eskiden ayrı bir "Amiral Ürün" bölümüydü, şimdi bu
ızgaranın bir kartı (bkz. madde 6).

- Bu 6 ürün doğru mu, ekleme/çıkarma var mı? 🔴 → `range.products`
- Başlık "Ürünlerimiz" + giriş cümlesi kalsın mı? → `range.heading` / `range.intro`
- Her ürün için (istersen) menşe ülke eklenebilir — **sadece gerçekse**. 🔴

---

## 10. 25 Yıl / Uluslararası Ticaret ✅ GÜNCELLENDİ

**Nerede:** Koyu yeşil, 5 sütunlu "sütunlar". Büyük "30" rakam motifi
**kaldırıldı** — component artık böyle bir alan render etmiyor.
**Şu an:**

> Başlık: "Kuruyemiş ticaretini çeyrek asırdır aynı disiplinle yürütüyoruz."
> 5 sütun: Uzun soluklu ticari deneyim · Ürün bilgisi · Uluslararası ticaret yaklaşımı · Kurumsal iş ortaklıkları · Süreklilik
> Giriş cümlesi K1'in cevabı olan 25 yılı zaten içeriyor; placeholder not **tamamen kaldırıldı**, uydurma değil.

- Başlık + 5 sütun kalsın mı, gerçek güçlü yanlarınızla değişsin mi?
  → `tradeStory.heading` / `tradeStory.pillars`

---

## 11. Teklif / İletişim 🔴 [FİRMA VERİSİ]

**Nerede:** Krem zemin, solda iletişim + sağda form.

### Metin 🟡 [DOLDUR]

- Başlık "Ürün ve tedarik talepleriniz için iletişime geçin." kalsın mı? → `quote.heading`
- Giriş cümlesi kalsın mı? → `quote.body`

### İletişim bilgileri 🔴 [FİRMA VERİSİ]

- **Adres** doğru mu? Şu an (kılavuzdan): "Marex Dış Tic. Ltd. Şti. / Oruçreis Mah.
  Vadi Cad. No:108 K:8 D:491 / İstanbul Ticaret Sarayı 34235 Giyimkent / Esenler /
  İstanbul". Bu adres yayınlanacak mı? → `quote.addressLines`
- **Telefon** (placeholder) — yayınlanacak numara? → `quote.phoneValue`
- **E-posta** (placeholder) — yayınlanacak adres? → `quote.emailValue`

### Form 🟢 [ONAYLI]

- Form alanları: Ad Soyad, Firma, Ülke, E-posta, Telefon, İlgilenilen Ürün, Mesaj,
  KVKK onayı. Alan eklensin/çıksın mı? → `quote.fields`
- Ürün seçim listesi ürün adlarına bağlı (**K3**). → `quote.productOptions`
- 🔴 **Form nereye gönderilecek?** Şu an mock (hiçbir yere gitmiyor, sadece "alındı"
  gösteriyor). Gerçek için: bir e-posta adresi mi, CRM mi, başka servis mi?
  (bkz. `src/lib/quote-submission.ts`)

---

## 12. Footer 🟢 [ONAYLI] + 🔴 [FİRMA VERİSİ]

**Nerede:** Alt koyu yeşil bölüm.
**Şu an:** Logo + tanıtım + "Tane Tane Lezzetler" sloganı + 3 link sütunu + adres/tel/e-posta.

- Tanıtım metni (blurb) kalsın mı? → `footer.blurb`
- Slogan "Tane Tane Lezzetler" kalsın mı? (kılavuzda **tırnak içinde** geçiyor —
  tırnaklı mı istersin?) → `footer.tagline`
- Telefon / e-posta → **K11** ile aynı. 🔴 → `footer.phoneValue` / `footer.emailValue`
- Alt linkler (Gizlilik Politikası · KVKK Aydınlatma Metni · Yasal Bilgiler)
  **kaldırıldı**: üçü de var olmayan sayfalar yerine teklif formuna gidiyordu —
  ziyaretçiyi "gizlilik politikası" diye tıklattığı yerde veri toplama
  formuna düşürüyordu. Gerçek sayfalar gelince (**bkz. K14**) `footer.legalLinks`
  yeniden doldurulur.

---

## 13. SEO / Site Bilgisi 🟡 [DOLDUR] + 🔴 [FİRMA VERİSİ]

**Nerede:** Tarayıcı sekmesi, Google sonucu, paylaşım kartı.
**Şu an:**

> Title: "Raymar Nuts — Uluslararası Kuruyemiş Ticareti"
> Description: (footer blurb ile aynı)

- Site başlığı (title) kalsın mı? (**~50–60 karakter**) → `meta.title`
- Google açıklaması (description) (**~140–160 karakter**, arama sonucunda görünür) → `meta.description`
- Alan adı → **K2**. 🔴
- Yapısal veri (Organization) için: yayınlanacak resmi ad, adres, telefon, kuruluş
  yılı, sosyal medya profilleri (varsa). **Sadece gerçek olanlar.** 🔴

---

## 14. Yasal Metinler 🔴 [FİRMA VERİSİ]

**Nerede:** Footer linkleri + form KVKK satırı.
**Şu an:** 3 link var ama **hedef sayfa yok**; KVKK onay satırında "[Politika metni
eklenecek]" yazıyor.

- **KVKK Aydınlatma Metni** — hukuki metin, avukat/firma sağlamalı. 🔴
- **Gizlilik Politikası** — aynı. 🔴
- **Yasal Bilgiler / Kullanım Koşulları** — aynı. 🔴
- Bunlar gelince: ayrı sayfalar mı açayım (`/gizlilik`, `/kvkk`), yoksa PDF/dış link
  mi? → footer linkleri + `quote.consentText`

> Not: KVKK/gizlilik metni **uydurulamaz** — kişisel veri işleme beyanı yanlışsa
> yasal risk. Firmadan gerçek metin gelmeli.

---

## 15. Görseller (Fotoğraf listesi) 🔵 [GÖRSEL] + 🔴 [FİRMA VERİSİ]

Şu an **13 fotoğrafın hepsi stok** ("temsili görsel"). Gerçek ürün fotoğrafları
gelince alt yazılardaki "(temsili görsel)" ibaresini de kaldırırım.

İdeal olarak **her ürün için 1 kaliteli fotoğraf** yeter; ben her slota göre
kırparım. Gerekli çekimler:

| #      | Konu                   | Nerede kullanılıyor                         | Yön / oran | Min. çözünürlük |
| ------ | ---------------------- | ------------------------------------------- | ---------- | --------------- |
| 1      | Fındık — makro (iç)    | Kurumsal yuvarlak + fındık bölümü + portföy | yatay/kare | 1500 px         |
| 2      | Fındık — kabuklu       | Fındık bölümü arka plan                     | yatay      | 1500 px         |
| 3      | Bal Rengi Ceviz İçi    | Ceviz kartı                                 | yatay ~4:3 | 900 px          |
| 4      | Kızıl Ceviz İçi        | Ceviz kartı                                 | dikey      | 900 px          |
| 5      | Pirinç Ceviz İçi       | Ceviz kartı                                 | yatay      | 900 px          |
| 6      | Kırık Ceviz İçi        | Ceviz kartı                                 | yatay      | 900 px          |
| 7      | Süper Lüks–Yarım Beyaz | Ceviz kartı                                 | yatay      | 1200 px         |
| 8      | Lüks–Naturel Ceviz İçi | Ceviz kartı                                 | dikey      | 900 px          |
| 9      | Çeyrek Ceviz İçi       | Ceviz kartı                                 | yatay      | 900 px          |
| 10     | Kabak Çekirdeği İçi    | İthal kart + portföy                        | dikey 4:5  | 900 px          |
| 11     | Pikan Cevizi           | İthal kart + portföy                        | dikey 4:5  | 900 px          |
| 12     | Makademya              | İthal kart + portföy                        | dikey 4:5  | 900 px          |
| 13     | Ayçekirdeği            | İthal kart + portföy                        | dikey 4:5  | 900 px          |
| (ops.) | Hero poster            | Video açılış karesi                         | 16:9       | 1600 px         |

- Fotoğraflar profesyonel çekim mi, yoksa şimdilik stok mu kalsın? 🔴
- Marka amblemindeki altın nokta motifini dekoratif kullandım (uçuşan motif) —
  fotoğraf kesme (cut-out) istersen şeffaf zeminli PNG'ler gerekir. 🔵

---

## 16. İngilizce İçerik (EN) 🔴 [FİRMA VERİSİ]

**Şu an:** İngilizce yayında değil (`/en` kapalı). Altyapı hazır — onaylı İngilizce
metin gelince açılır.

- İngilizce sürüm gerekiyor mu?
- Gerekiyorsa: yukarıdaki **tüm metinlerin** İngilizcesi lazım. Slogan "Tane Tane
  Lezzetler" kılavuzda çevrilmemiş — İngilizce karşılığını **yazmak** gerekir (mevcut
  değil). → `src/content/en.ts`

---

## Özet: cevap verirken

1. Önce **K1–K3** (kritik). Bunlar netleşmeden gerisi değişebilir.
2. 🔴 işaretlileri firmadan **doğrula** — uydurma yok (sertifika, istatistik, telefon,
   yasal metin, menşe).
3. 🟡 işaretlileri AI ile taslak çıkar, ama gerçek olgulara dayandır.
4. 🔵 fotoğrafları ayrıca topla.
5. Cevapları alan adıyla (ör. `flagship.note: "…"`) verirsen doğrudan işlerim.
