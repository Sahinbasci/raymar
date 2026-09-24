# Raymar Nuts — SEO ve GEO Stratejisi

_Eylül 2026. `docs/SEO_GEO_PLAN.md`'nin yerini alır; o belge site tek sayfayken
yazıldı ve fındık gibi artık gamda olmayan ürünlere dayanıyordu. Buradaki her dış
iddia, adı geçen resmî kaynağa bağlıdır; kaynağı olmayan tahmin "çıkarım" diye
işaretlidir._

---

## 0. Kısaca

- **Site teknik olarak hazır.** Yayına alınmayı bekleyen sürüm 56 URL
  içeriyor (TR+EN ana sayfa, 2×2 dizin, 11×2 ürün, 11×2 rehber, 3×2 yasal),
  hepsi statik HTML. Başlık, açıklama, canonical, hreflang, sitemap,
  yapısal veri ve `llms.txt` sayfa sayfa test ediliyor (`tests/e2e/site-audit.spec.ts`).
- **Canlı site eski sürüm** (31 Ağustos): 23 Eylül'de ölçüldü, sitemap'te 8 URL
  var, `/tr/rehber` ve `/tr/urunler/ceviz-ici` 404 veriyor, `llms.txt` yok.
  Yeni sürüm yüklenmeden Search Console'a bağlanmak, 56 URL'lik bir sitemap'i
  8 sayfalık bir siteye göstermek demektir: önce yükleme, sonra Search Console.
- **Alan adında hâlâ Natro reklamı var.** `https://raymarnuts.com/index.html`
  200 dönüyor ve başlığı "Sınırsız Web Hosting | … Natro.com". `out/` içinde
  `index.html` olmadığı için zip açmak bu dosyayı silmez — cPanel Dosya
  Yöneticisi'nden elle silinmeli. `.htaccess`'teki 301 kuralı, dosya yeniden
  yüklenirse devreye girer.
- **İçerik kuralı değişmedi, sıkılaştı:** her rehber ve ürün sayfası
  "Kaynaklar" bölümüyle yayımlanıyor. Sayfadaki her olgusal cümle, açılıp
  okunmuş bir kaynağa (UNECE standardı, EUR-Lex, USDA, Wikipedia, TDK, resmî
  kurum) dayanıyor; kaynağı bulunamayan cümle yazılmıyor.
- **GEO ayrı bir iş değil.** Google'ın kendi rehberi, yapay zekâ özellikleri
  için optimizasyonun "hâlâ SEO" olduğunu açıkça söylüyor
  ([Google, AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
  Bu yüzden strateji tek: indekslenebilir, özgün, kaynaklı içerik + site
  dışında tutarlı ve gerçek bir kurumsal varlık.
- **En büyük kaldıraç site dışında:** gerçek dizin kayıtları (ihracatçı
  birliği, oda, sektör platformları), fuar katılımcı sayfaları, sektör basını.
  Satın alınan bağlantı, sahte "bahsetme" ve Wikipedia'ya kendi hakkında yazmak
  **yapılmayacak** (bkz. 8.5).

---

## 1. Mevcut durum (ölçülmüş)

### 1.1 Yayına hazır sürümde olanlar

| Alan                | Durum                                                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| İndekslenebilir URL | 56 (TR 28 + EN 28), hepsi sitemap'te, `lastmod` ve hreflang çiftleriyle                                                                                                       |
| Dil eşleşmesi       | Her sayfa çevirisini `hreflang` ile karşılıklı gösteriyor; slug'lar dile göre (`/tr/urunler/ceviz-ici` ↔ `/en/products/walnut-kernels`)                                       |
| Yapısal veri        | Organization + WebSite (her sayfa), WebPage + BreadcrumbList (her sayfa), Article (rehberler), FAQPage (SSS olan sayfalar), CollectionPage (dizinler), `citation` (kaynaklar) |
| `Product` şeması    | **Bilerek yok.** Google ürün zengin sonucu fiyat/teklif/yorum istiyor; B2B fiyatsız sitede her düğüm Search Console'da hata olurdu                                            |
| Robots              | Bütün tarayıcılar ve adıyla yapay zekâ ajanları serbest (OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended …)                                        |
| `llms.txt`          | Var. Google kullanmıyor (kaynak aşağıda); diğer sistemler için zararsız ve bedava                                                                                             |
| Performans          | CLS < 0,05 (Pixel 7), statik HTML, AVIF/WebP görsel müzakeresi, video yalnızca gerektiğinde                                                                                   |
| Erişilebilirlik     | axe WCAG 2.2 AA taraması tüm sayfalarda temiz; hero videosu için duraklatma düğmesi (WCAG 2.2.2)                                                                              |
| Test                | 7 cihaz profili × 3 motor; her yükleme öncesi tam paket                                                                                                                       |

### 1.2 Eksik olanlar (hepsi hesap/yetki gerektiriyor — kodla yapılamaz)

1. Yeni sürümün Natro'ya yüklenmesi
2. Google Search Console (bölüm 5)
3. Bing Webmaster Tools + IndexNow bildirimi (bölüm 6)
4. Google İşletme Profili — yalnızca uygunsa (bölüm 7)
5. Site dışı kurumsal varlık: dizinler, birlik ve oda kayıtları, LinkedIn (bölüm 8)

### 1.3 Bilinen riskler

- **"Antep Fıstığı" tescilli bir coğrafi işarettir:** TÜRKPATENT'te 27 numarayla
  kayıtlı **menşe adı**, tescil ettiren Gaziantep Ticaret Odası; 03.02.2025
  tarihli 190 sayılı Bülten değişikliğiyle coğrafi sınır 22 il. Satılan ürün bu
  sınırın dışındaysa adın kullanımı hukuki risk taşır. Bu nedenle İngilizce ürün
  sayfası **"Pistachios, Wholesale"** (`/en/products/pistachios`) olarak
  yayımlanıyor — "Turkish Antep Pistachios" bir menşe iddiasıydı. Ana sayfadaki
  İngilizce ürün kartı hâlâ "Antep Pistachios" diyor (müşteri metni);
  değiştirilmesi ya da menşein teyidi müşteriye bağlı, hukukçu görüşü önerilir.
- **"Raymar" adı** ilgisiz bir otel zinciriyle paylaşılıyor, benzer adlı bir
  denizcilik elektroniği markası da aramada öne çıkıyor. Çıplak "raymar" araması KPI olamaz; ölçü
  "raymar nuts", "raymar kuruyemiş" gibi markalı kombinasyonlardır.
- **Sertifika yok.** Hiçbir sayfa sertifika ima etmiyor ve etmemeli. Sahip
  olunan gerçek belgeler (gıda işletme kayıt numarası, ihracatçı birliği üyeliği)
  paylaşılırsa kurumsal sayfaya eklenir.

---

## 2. Hedef kitle ve niyet

| Kitle                                     | Dil   | Aradığı                                                                     | Karşılayan sayfa                 |
| ----------------------------------------- | ----- | --------------------------------------------------------------------------- | -------------------------------- |
| Türkiye'de toptancı, pastane, kuruyemişçi | TR    | "kırık ceviz içi toptan", "pirinç ceviz nedir", "toptan kuruyemiş istanbul" | Ürün ve boy sayfaları, ana sayfa |
| İthalatçı, re-exporter, Körfez/AB alıcısı | EN    | "walnut kernels wholesale", "pumpkin seed kernels", "antep pistachio"       | EN ürün sayfaları                |
| Satın alma / kalite sorumlusu             | TR/EN | Sınıf tanımları, renk sınıfları, saklama, aflatoksin, belgeler              | Rehberler                        |
| Yapay zekâ cevap motorları                | TR/EN | Tanım, karşılaştırma, mevzuat özeti — kaynaklı ve güncel                    | Rehberler (SSS + Kaynaklar)      |

**Negatif niyet (hedeflenmiyor):** `fiyat`, `fiyatları`, `kg fiyatı`,
`bim/a101/migros` içeren her sorgu — perakende ve fiyat karşılaştırma
sitelerinin alanı. Bu talep, sayfalardaki "Teklif Talep Et" çağrısıyla
karşılanıyor; kelime kovalanmıyor.

---

## 3. Anahtar kelime haritası

Kaynak: Google otomatik tamamlama verisi (18 Eylül 2026, TR ve EN;
`kw-suggest.json`). Otomatik tamamlama hacim vermez, **talebin varlığını**
kanıtlar. Hacim ve pozisyon, Search Console bağlanınca gerçek veriyle ölçülecek.

### 3.1 Türkçe

| Sayfa                                                 | Birincil hedef                                  | İkincil / soru kalıpları                               |
| ----------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| `/tr`                                                 | toptan kuruyemiş, kuruyemiş toptancısı istanbul | toptan kuruyemiş istanbul, kuruyemiş tedarikçisi       |
| `/tr/urunler/ceviz-ici`                               | toptan ceviz içi                                | ceviz içi toptan satış, ceviz içi çeşitleri            |
| `/tr/urunler/kirik-ceviz-ici`                         | kırık ceviz içi toptan                          | kırık ceviz içi, kırık ceviz nasıl saklanır            |
| `/tr/urunler/pirinc-ceviz-ici`                        | pirinç ceviz nedir                              | pirinç ceviz içi, baklavalık ceviz                     |
| `/tr/urunler/yarim-ceviz-ici`                         | yarım ceviz içi toptan                          | yarım ceviz içi                                        |
| `/tr/urunler/ceyrek-ceviz-ici`                        | çeyrek ceviz içi                                |                                                        |
| `/tr/urunler/kabak-cekirdegi-ici`                     | kabak çekirdeği içi toptan                      | kabak çekirdeği içi                                    |
| `/tr/urunler/ay-cekirdegi-ici`                        | ay çekirdeği içi toptan                         |                                                        |
| `/tr/urunler/antep-fistigi`                           | antep fıstığı içi toptan                        | boz iç antep fıstığı                                   |
| `/tr/urunler/makadamya`                               | makademya fındığı toptan                        | makademya fındığı nedir (rehbere yönlendirir)          |
| `/tr/urunler/pikan-cevizi`                            | pikan cevizi toptan                             | pikan cevizi nedir                                     |
| `/tr/rehber/ceviz-ici-nasil-saklanir`                 | ceviz içi nasıl saklanır                        | ceviz içi saklama koşulları, kuruyemiş nasıl saklanır  |
| `/tr/rehber/ceviz-ici-neden-acilasir`                 | ceviz içi neden acı olur                        | neden kararır, neden büzüşür, neden sarı olur          |
| `/tr/rehber/kuruyemiste-aflatoksin`                   | aflatoksin nedir                                | aflatoksin hangi gıdalarda bulunur, aflatoksin analizi |
| `/tr/rehber/ceviz-hasadi-ne-zaman`                    | ceviz hasadı ne zaman                           | ceviz hasadı hangi ayda yapılır                        |
| `/tr/rehber/pikan-cevizi-ile-ceviz-farki`             | pikan cevizi ile normal ceviz arasındaki fark   | ceviz çeşitleri pikan                                  |
| `/tr/rehber/kuruyemis-ihracati-icin-gerekli-belgeler` | kuruyemiş ihracatı için gerekli belgeler        |                                                        |

### 3.2 İngilizce

| Sayfa                                    | Birincil hedef                 | İkincil                                 |
| ---------------------------------------- | ------------------------------ | --------------------------------------- |
| `/en/products/walnut-kernels`            | walnut kernels wholesale       | walnut halves and pieces                |
| `/en/products/walnut-pieces`             | walnut pieces bulk             |                                         |
| `/en/products/pumpkin-seed-kernels`      | pumpkin seed kernels wholesale | hull-less pumpkin seeds                 |
| `/en/products/pistachios`                | pistachios wholesale           | antep pistachio, boz pistachio kernels  |
| `/en/guides/macadamia-kernel-styles`     | macadamia styles               | macadamia style 0 / 1 / 4 / 4L / 5 / 6  |
| `/en/guides/walnut-kernel-colour-grades` | light amber walnuts            | walnut kernel colour                    |
| `/en/guides/how-to-store-walnut-kernels` | how to store walnuts long term | do walnuts go rancid                    |
| `/en/guides/aflatoxins-in-nuts`          | aflatoxin in nuts              | aflatoxin in nuts and dried fruits      |
| `/en/guides/walnut-kernel-defects`       | why do walnuts go rancid       | dark walnut kernels, shrivelled kernels |
| `/en/guides/walnut-harvest-season`       | when are walnuts harvested     | walnut drying temperature               |
| `/en/guides/pecan-vs-walnut`             | pecan vs walnut                |                                         |

### 3.3 Kural: sorgu varyasyonu başına sayfa açılmaz

Google'ın rehberi, her arama varyasyonu için ayrı sayfa üretmeyi "scaled
content abuse" spam politikası kapsamında sayıyor
([kaynak](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
Yeni sayfa ancak **ayrı bir soruya** cevap veriyorsa açılır; "ceviz içi neden
kararır / acılaşır / büzüşür" tek sayfadır, üç sayfa değil.

---

## 4. İçerik ilkeleri (her sayfa için zorunlu)

1. **Kaynaksız cümle yok.** Her olgusal ifade sayfanın "Kaynaklar" listesindeki
   bir yayına dayanır. Liste görünür ve `citation` olarak yapısal veride de var.
   Kaynak tercihi: standart/mevzuat metni > resmî kurum > akademik/uzatma
   servisi > Wikipedia (genel tanımlar için). Rakip siteleri ve SEO blogları
   kaynak gösterilmez.
2. **Şirkete özgü rakam yok** (nem, kalibre, menşe, MOQ, fiyat, sertifika) —
   şirket paylaşmadıkça. Paylaşılırsa kurumsal kaynak olarak eklenir.
3. **Mevzuat tarihli ve temkinli yazılır:** "bu yazının hazırlandığı tarihte";
   yönetmelik numarası ve resmî metne bağlantı.
4. **Sağlık iddiası yok.** Besin/fayda içeriği yazılmıyor; hem perakende
   niyeti hem de mevzuat riski taşıyor.
5. **Çeviri eşdeğerliği:** TR ve EN aynı bölüm yapısında. SSS'ler bilinçli
   olarak dile göre farklı olabilir (TR yazım soruları gibi).
6. **Güncelleme:** mevzuat içeren sayfalar 6 ayda bir kontrol edilir; değişen
   rehberde `updated` tarihi güncellenir (sitemap `lastmod` ve Article
   `dateModified` otomatik izler). İlk kontrol listesi: aflatoksin rehberindeki
   Türkiye ve AB limitleri (Bulaşanlar Yönetmeliği Ek-1 ile 2023/915), sınır
   kontrol oranları (2019/1793 — ürün listesi her güncellemede değişiyor),
   numune alma tüzüğü (2023/2782) ve Antep Fıstığı coğrafi işaret kaydı.

---

## 5. Google Search Console — kurulum ve rutin

### 5.1 Doğrulama (bir kez)

**Tercih: Alan (Domain) mülkü, DNS TXT kaydıyla.** Google'a göre DNS doğrulaması
alan mülkünü doğrulamanın tek yolu; http/https ve www/çıplak alan adının
hepsini tek mülkte toplar
([Google, doğrulama yöntemleri](https://support.google.com/webmasters/answer/9008080)).

1. Search Console → Mülk ekle → **Alan** → `raymarnuts.com`
2. Verilen TXT değerini kopyala
3. Natro cPanel → **Zone Editor** (DNS) → `raymarnuts.com` → TXT kaydı ekle,
   ad `@` (veya boş), değer: Google'ın verdiği metin
4. Search Console → Doğrula. Google'a göre kaydın yayılması 2-3 gün
   sürebilir; olmazsa ertesi gün tekrar denenir.
5. **Kayıt silinmez** — silinirse doğrulama düşer (aynı kaynak).

_Alternatif:_ URL öneki mülkü + HTML dosyası. Dosya `public/` altına konup
yüklenir; bu da kalıcı olmalı. DNS'e erişim yoksa bu yol kullanılır — dosyayı
verirseniz koda eklerim.

**Hesap güvenliği:** Mülk sahibi şirketin kendi Google hesabı olmalı; ajans
veya geliştirici "tam kullanıcı" olarak eklenir, sahip olarak değil.

### 5.2 İlk gün yapılacaklar

1. **Site haritası:** Dizine ekleme → Site haritaları →
   `https://raymarnuts.com/sitemap.xml` gönder
2. **Üretken yapay zekâ ayarı:** Ayarlar → "Search generative AI" → siteyi
   **dahil** bırak. Google'a göre bu varsayılan ve bir mülk dışarıda
   bırakılırsa AI Overviews / AI Mode'da hiç görünmez
   ([Google, Search generative AI control](https://support.google.com/webmasters/answer/16908024)).
3. **URL denetimi → Dizine eklenmesini iste** — önce şu 10 URL:
   `/tr`, `/en`, `/tr/urunler`, `/en/products`, `/tr/rehber`, `/en/guides`,
   `/tr/urunler/ceviz-ici`, `/en/products/walnut-kernels`,
   `/tr/urunler/kirik-ceviz-ici`, `/tr/urunler/pirinc-ceviz-ici`
4. **Eski URL'ler:** eski sürümde olmayan bir yapı yoktu (tek sayfaydı), bu
   yüzden 404 temizliği gerekmiyor.

### 5.3 İlk 4 hafta — haftalık kontrol (15 dk)

| Rapor                     | Bakılacak                                                               |
| ------------------------- | ----------------------------------------------------------------------- |
| Dizine ekleme → Sayfalar  | 56 URL'nin kaçı dizinde; "Tarandı – dizine eklenmedi" listesinde ne var |
| Site haritaları           | "Başarılı", keşfedilen URL = 56                                         |
| Deneyim → Core Web Vitals | Mobil/masaüstü "İyi" (veri birikince)                                   |
| Geliştirmeler             | Breadcrumbs: hatasız                                                    |
| Performans                | İlk gösterimler hangi sorgulardan geliyor                               |

### 5.4 Aylık rutin (1 saat)

1. **Performans → Sorgular:** gösterimi olup tıklaması düşük (CTR < %1)
   sorgular → o sayfanın `metaTitle`/`metaDescription`'ı sorguya göre gözden
   geçirilir.
2. **Performans → Sayfalar:** gösterim alan ama hedef sorgusunda 8-20.
   sırada duran sayfalar → içerik derinleştirilir (yeni kaynaklı bölüm, SSS).
3. **Üretken yapay zekâ performans raporu:** AI Overviews ve AI Mode
   gösterimleri (yalnız gösterim sayısı; tıklama bu raporda yok)
   ([Google, Generative AI performance report](https://support.google.com/webmasters/answer/16984139)).
   Yapay zekâ trafiği ayrıca genel Performans raporunda "Web" altında sayılır
   ([Google, AI features](https://developers.google.com/search/docs/appearance/ai-features)).
4. **Bağlantılar raporu:** yeni dış bağlantılar (bölüm 8'in ölçüsü).

### 5.5 KPI

| Ölçü                                          | 3. ay   | 6. ay   | 12. ay    |
| --------------------------------------------- | ------- | ------- | --------- |
| Dizinlenmiş URL (56 içinden)                  | 40+     | 52+     | 56 + yeni |
| Hedef sorgusunda ilk 10'daki sayfa (bölüm 3)  | 3–5     | 8–12    | 15+       |
| Aylık organik tıklama                         | 50–150  | 200–600 | 800–2.000 |
| AI Overviews / AI Mode gösterimi              | ölçülür | artış   | artış     |
| Nitelikli teklif talebi / ay (form + e-posta) | 1–3     | 3–6     | 6–15      |

_Çıkarım:_ Aralıklar sektörde benzer ölçekli B2B sitelerin tipik seyrine
dayanan tahmindir, garanti değildir. İlk 3 aydan sonra gerçek veriyle
yeniden kurulur.

---

## 6. Bing Webmaster Tools ve IndexNow

Bing önemli: Microsoft Copilot web aramasında cevaplarını Bing arama
sonuçlarına dayandırıyor ([Microsoft Learn](https://learn.microsoft.com/en-us/microsoft-365/copilot/manage-public-web-access)).
Bing'de dizinde olmayan sayfa Copilot'ta da kaynak olamaz.

1. **Search Console'dan içe aktar:** Bing Webmaster → My Sites → Import →
   Google hesabıyla izin ver. Bing'e göre içe aktarılan siteler otomatik
   doğrulanır ve site haritaları da gelir
   ([Bing Webmaster Blog](https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools)).
2. **IndexNow:** Anahtar dosyası hazır
   (`/62e9be2df8f1e009ba0be63c77a0cb03.txt`, yüklemeyle canlıya çıkar). Her
   yayından sonra değişen URL'ler tek bir POST ile bildirilir; IndexNow'a göre
   bir motora yapılan bildirim katılımcı diğer motorlarla otomatik
   paylaşılıyor ([IndexNow](https://www.indexnow.org/documentation)).
   Katılımcılar: Bing, Yandex, Seznam, Naver, Yep, Internet Archive, Amazonbot
   ([searchengines.json](https://www.indexnow.org/searchengines.json)).
   Google IndexNow'a katılmıyor; Google için site haritası + Search Console.
3. **Yandex Webmaster** (isteğe bağlı): Türkiye'de payı küçük ama IndexNow
   zaten bildiriyor; doğrulama 10 dakika.

---

## 7. Google İşletme Profili — yalnızca uygunsa

Google'ın kurallarına göre profil için müşterinin **çalışma saatlerinde
ziyaret edebildiği, personelli bir fiziksel adres** (veya müşteriye giden
hizmet bölgesi) gerekiyor; sanal ofis ve posta kutusu kabul edilmiyor, işletme
adı gerçek hayatta kullanılan ad olmalı, anahtar kelime eklenmez
([Google, uygunluk kuralları](https://support.google.com/business/answer/3038177)).

- Esenler'deki adres alıcıların gelebildiği, tabelalı ve personelli bir
  işyeriyse profil açılır; ad **"Raymar Nuts"** (sitede ve belgelerde ne
  kullanılıyorsa birebir), kategori gerçek faaliyete göre.
- Değilse **açılmaz**: kuralı çiğneyen profil askıya alınır ve marka aramasına
  zarar verir.
- Profil açılırsa: telefon/adres/ad sitedekiyle birebir aynı (NAP tutarlılığı),
  web sitesi alanına `https://raymarnuts.com/tr`.

---

## 8. Site dışı otorite ve bağlantılar (backlink)

### 8.1 İlke

Google'ın spam politikası; bağlantı satın almayı, "sana bağlantı verene
bağlantı veririm" değiş tokuşlarını, otomatik bağlantı üretmeyi, düşük
kaliteli dizin ve bookmark sitelerini açıkça bağlantı spam'i sayıyor
([Google, spam politikaları](https://developers.google.com/search/docs/essentials/spam-policies)).
Google'ın yapay zekâ rehberi de "inauthentic mentions" (yapay bahsetme)
peşinde koşmanın işe yaramadığını söylüyor
([kaynak](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
Bu yüzden aşağıdaki her kalem **gerçek bir ilişkiye** dayanır.

### 8.2 Birinci halka — resmî ve kurumsal kayıtlar (günler)

Bu kayıtlar hem bağlantı hem de yapay zekâ motorlarının şirketi "gerçek bir
tüzel kişi" olarak tanımasını sağlayan tutarlı kimlik bilgisidir.

| Kayıt                                                     | Koşul                                                                                                                            |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| İstanbul İhracatçı Birlikleri üye rehberi (ilgili birlik) | Şirket üyeyse — 5910 sayılı Kanun gereği ihracatçılar bir birliğe üye                                                            |
| İstanbul Ticaret Odası üye kaydı                          | Şirketin oda kaydı                                                                                                               |
| LinkedIn şirket sayfası                                   | Şirket hesabı; web sitesi alanı `raymarnuts.com`                                                                                 |
| Europages ücretsiz tedarikçi profili                      | Yalnız B2B firmalar; ücretsiz kayıt her ülkede açık değil ([Europages](https://www.europages.co.uk/companies/free-listing.html)) |

**Tek isim dizesi:** Her kayıtta aynı ad ("Raymar Nuts") ve aynı tüzel
kişi bilgisi (Marex Dış Ticaret Ltd. Şti.), aynı adres ve telefon. Sitedeki
Organization yapısal verisi (`legalName`) bu eşleşmeyi makine-okunur hâle
getiriyor. Kayıtlar açıldıkça URL'leri Organization `sameAs` alanına eklenir —
bu, varlık çözümlemesini doğrudan güçlendirir.

### 8.3 İkinci halka — sektör (haftalar-aylar)

- **Fuarlar:** Katılınan fuarların katılımcı listeleri (ör. World Food
  İstanbul, Gulfood, ANUGA, SIAL) şirkete bağlantı verir. Katılım kararı
  ticari; SEO değeri yan etkidir.
- **Sektör kuruluşları:** INC (International Nut and Dried Fruit Council)
  üyeliği; INC'ye göre üyeler, üyelere özel bir rehberde yer alıyor ve INC
  pavyonuyla SIAL, Gulfood, Anuga gibi fuarlarda sergileyebiliyor
  ([INC, üyelik avantajları](https://inc.nutfruit.org/membership/member-benefits/)).
  Ücretli; karar ticari.
- **Sektör basını:** Gerçek bir haber olduğunda (yeni ürün hattı, fuar,
  tesis) kısa bir basın bülteni. Haber yoksa bülten yok.
- **Müşteri ve tedarikçi sayfaları:** Tedarikçi listesi yayımlayan alıcılar
  veya ortaklar varsa, bağlantı istemek doğaldır.

### 8.4 Bağlantı kazanan içerik (sürekli)

Rehberler bağlantı alınabilir varlıklardır: kaynaklı, tarihli, tarafsız.
Özellikle:

- **Ceviz içi renk ve boy sınıfları** (UNECE terimleri ↔ Türkçe ticaret adları)
- **Kuruyemişte aflatoksin** (Türk Gıda Kodeksi Ek-1 satır numaraları ve AB 2023/915
  değerleri yan yana; sınır kontrol oranları ve numune alma kuralıyla)
- **Ceviz içi neden acılaşır, kararır, büzüşür** (standart tanımları + ölçülmüş
  mekanizma: pellikül oksidasyonu, oksijen eşiği, kurutma sıcaklığı)
- **Ceviz hasadı ne zaman yapılır** (iç paket doku ölçütü, Türkiye takvimi,
  çeşit bazında tarihler, kurutma hedefleri)
- **Makadamya iç sınıfları (Style 0–8)** (AMS ile AFI tanımlarının farkı — bu
  karşılaştırma başka yerde derli toplu yok)
- **Kuruyemiş ihracatı belgeleri**

Bu sayfalar LinkedIn'de, sektör gruplarında ve müşteri yazışmalarında
paylaşılır. Başka sitelerin bunlara kaynak olarak bağlantı vermesi, en değerli
ve tamamen kurallara uygun bağlantı türüdür.

### 8.5 Yapılmayacaklar

- Ücretli bağlantı, bağlantı paketi, PBN, "backlink satın al" hizmetleri
- Toplu dizin/bookmark kayıtları
- Forum ve yorum spam'i
- **Wikipedia'da şirket hakkında makale yazmak veya kendi sitesine bağlantı
  eklemek.** Wikipedia'nın çıkar çatışması kuralı, kişinin kendi kurumu
  hakkındaki maddeleri düzenlemesini "şiddetle" caydırıyor ve kendi
  çıkarı için düzenleme yapılmamasını istiyor
  ([Wikipedia: Conflict of interest](https://en.wikipedia.org/wiki/Wikipedia:Conflict_of_interest)).
  Ayrıca Wikipedia'daki dış bağlantılar `nofollow`'dur. Doğru kullanım tersi:
  **biz** rehberlerimizde Wikipedia'yı kaynak gösteriyoruz.

---

## 9. GEO — yapay zekâ cevap motorları

### 9.1 Motorlar içeriği nereden alıyor (belgelenmiş)

| Motor                         | Kaynak                                                                                                                                                                                                             | Bizim durumumuz                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| Google AI Overviews / AI Mode | Google Arama dizini; uygunluk: dizinde ve snippet'e uygun olmak. Özel dosya/işaretleme gerekmiyor ([Google](https://developers.google.com/search/docs/appearance/ai-features))                                     | Dizinlenince uygun; `nosnippet` yok |
| ChatGPT arama                 | OAI-SearchBot; engellenen site ChatGPT arama cevaplarında gösterilmiyor ([OpenAI](https://developers.openai.com/api/docs/bots))                                                                                    | robots.txt'de izinli                |
| Claude arama                  | Claude-SearchBot ve Claude-User; engellemek görünürlüğü azaltabilir ([Anthropic](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)) | robots.txt'de izinli                |
| Perplexity                    | PerplexityBot                                                                                                                                                                                                      | robots.txt'de izinli                |
| Bing Copilot                  | Bing dizini                                                                                                                                                                                                        | Bing Webmaster + IndexNow (bölüm 6) |

### 9.2 Google'ın "gerek yok" dedikleri

Google'ın rehberine göre Google Araması için şunlar gereksiz: `llms.txt` ve
benzeri "özel" dosyalar (Google kullanmıyor; oluşturmak ne zarar ne yarar),
içeriği yapay zekâ için "parçalara bölmek", yalnız yapay zekâ için yeniden
yazmak, yapay bahsetme toplamak ve yapısal veriye aşırı odaklanmak
([Google, AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
Sitede `llms.txt` duruyor çünkü bedava ve başka sistemler için zararsız —
ama GEO teslimatı olarak sunulmaz.

### 9.3 Bizim GEO işimiz (Google'ın önerdiğiyle örtüşen)

1. **Özgün, "emtia olmayan" içerik:** Türkçe ticaret adlarını (pirinç,
   kırık, baklavalık) uluslararası sınıflara bağlayan, başka yerde
   bulunmayan eşleşmeler. Google, yaygın bilgiyi tekrarlayan içerik yerine
   özgün bakış açısı öneriyor (aynı kaynak).
2. **Soruya doğrudan cevap veren yapı:** Her sayfada başlık altı kısa
   cevap (lead), başlıklı bölümler, görünür SSS.
3. **Kaynaklı olgu:** "Kaynaklar" listesi + `citation`. Bir cevap motorunun
   alıntıladığı cümlenin arkasında doğrulanabilir kaynak olması, yanlış
   alıntılanma riskini de azaltır.
4. **Tazelik:** Rehberlerde yayın/güncelleme tarihi görünür ve yapısal
   veride (`datePublished`, `dateModified`).
5. **Kimlik tutarlılığı:** Organization verisi + site dışı kayıtlarda aynı
   ad/adres (bölüm 8.2).
6. **Görsel:** Her sayfada açıklayıcı alt metinli ürün fotoğrafı; Google
   görsellerin yapay zekâ özelliklerinde de görünebildiğini söylüyor
   (aynı kaynak). Şirketin kendi ürün/üretim fotoğrafları gelirse bu alan
   en hızlı kazanılacak alandır.

### 9.4 Ölçüm

- Google: Search Console "Generative AI performance" raporu (5.4).
- Diğer motorlar: aylık manuel test — aşağıdaki 10 soru ChatGPT, Claude,
  Perplexity ve Gemini'de sorulur; Raymar sayfası kaynak olarak geçiyor mu
  not edilir:
  1. pirinç ceviz nedir
  2. ceviz içi renk sınıfları nelerdir
  3. ceviz içi neden acılaşır
  4. kuruyemişte aflatoksin sınırı nedir
  5. kuruyemiş ihracatı için hangi belgeler gerekir
  6. walnut kernel colour grades
  7. macadamia kernel styles
  8. pecan vs walnut difference
  9. how to store walnut kernels
  10. toptan kuruyemiş tedarikçisi istanbul

---

## 10. 90 günlük eylem planı

| Hafta | İş                                                                                    | Kim                 |
| ----- | ------------------------------------------------------------------------------------- | ------------------- |
| 0     | Yeni sürümü Natro'ya yükle; canlıda yönlendirme/başlık/sitemap kontrolü               | Geliştirici + sahip |
| 0     | Search Console Domain mülkü (DNS TXT), site haritası, generative AI ayarı "dahil"     | Sahip (hesap)       |
| 0     | Bing içe aktarma, IndexNow toplu bildirimi (56 URL)                                   | Sahip + geliştirici |
| 1     | 10 öncelikli URL için dizine ekleme isteği                                            | Sahip               |
| 1–2   | LinkedIn şirket sayfası; birlik ve oda kayıtlarının web adresi güncellemesi           | Sahip               |
| 2–4   | Europages ücretsiz profili; açılan kayıtlar `sameAs`'e eklenir                        | Sahip + geliştirici |
| 4     | İlk haftalık raporların özeti: dizinlenme sorunları giderilir                         | Geliştirici         |
| 5–8   | Search Console sorgularına göre başlık/açıklama iyileştirmesi (CTR)                   | Geliştirici         |
| 5–8   | Şirketin gerçek fotoğrafları ve paylaşılabilir belgeleri (kayıt no, üyelik) sayfalara | Sahip → geliştirici |
| 9–12  | Veriye göre 2 yeni rehber (yalnız ayrı soruya cevap veren konular)                    | Geliştirici         |
| 12    | 3 aylık değerlendirme: KPI tablosu (5.5) gerçek veriyle yeniden kurulur               | Birlikte            |

---

## 11. Sahibinden gerekenler

1. Natro cPanel erişimiyle yüklemenin yapılması (veya birlikte yapılması)
2. Search Console için şirketin Google hesabı ve DNS'e TXT kaydı eklenmesi
3. Şirketin gerçek ürün/depo/paketleme fotoğrafları (stok görsel yerine)
4. Paylaşılabilir kurumsal belgeler: gıda işletme kayıt numarası, ihracatçı
   birliği üyeliği, oda kaydı — varsa ve paylaşılmak istenirse
5. LinkedIn şirket sayfası ve dizin kayıtlarının açılması
6. "Antep Fıstığı" adının kullanımı için hukukçu görüşü
