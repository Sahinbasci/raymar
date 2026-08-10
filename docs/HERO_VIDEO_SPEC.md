# Hero Video — Üretim Spesifikasyonu

Mobil için ürettirilecek **dikey (portrait)** hero videosunun teknik şartları.
Masaüstü videosu (onaylı 16:9) değişmiyor; bu sadece telefon sürümü.

## Neden ayrı mobil video

Kullanıcıların ~%90'ı mobil. Masaüstü videosu 1.73 MB / yatay 16:9 — telefonda
hem hücresel veri hem batarya maliyeti, hem de dikey ekranda yatay kare
ortadan kırpılıyor. Şu an **mobilde video hiç inmiyor, poster gösteriliyor**
(veri kazancı sağlandı). Hafif dikey video gelince telefonda da sinematik açılış
olur.

## Kesin şartlar

| Özellik             | Değer                                                                              |
| ------------------- | ---------------------------------------------------------------------------------- |
| **En-boy (aspect)** | **9:16 dikey** (telefon ekranını tam doldurur)                                     |
| **Çözünürlük**      | 1080 × 1920 (tercih) — sığmazsa 720 × 1280                                         |
| **Süre**            | ~8 sn, masaüstüyle aynı; **kusursuz döngü** (son kare → ilk kareye akmalı)         |
| **Format**          | MP4 · H.264 · `yuv420p` · `+faststart` (zorunlu, geniş uyum)                       |
| **Ses**             | **YOK** — ses kanalı tamamen çıkarılmalı (byte + iOS sorunu önler)                 |
| **Hedef boyut**     | **≤ 800 KB** ideal, ≤ 1 MB üst sınır                                               |
| **Renk/ton**        | Masaüstüyle **aynı grade** — koyu yeşil zemin, sıcak kuruyemiş (marka tutarlılığı) |
| **Opsiyonel**       | WebM/AV1 ikinci kaynak (daha küçük, modern tarayıcı)                               |

## Güvenli alan (çerçeveleme) — önemli

Dikey ekranda üstte ve altta UI var; ana görsel bunlara denk gelmemeli:

```
┌─────────────────────┐
│  ~96px  header/logo │  ← üstte kilit özne olmasın
│─────────────────────│
│                     │
│    ANA GÖRSEL       │  ← kuruyemiş/aksiyon orta %60'ta
│    (özne burada)    │
│                     │
│─────────────────────│
│ ~140px  "Ürünleri   │  ← altta scroll oku; boş/sakin kalsın
│         Keşfet" oku │
└─────────────────────┘
```

- Kilit özneyi **dikey ortada** tut; üst ~96px ve alt ~140px sakin/koyu olsun ki
  logo ve "Ürünleri Keşfet" oku okunur kalsın.
- Metin/yazı **gömme** — başlıklar siteden geliyor.

## Poster (dikey) da lazım

Videonun **ilk karesini** dikey poster olarak ver:

| Özellik    | Değer                |
| ---------- | -------------------- |
| En-boy     | 9:16 (videoyla aynı) |
| Çözünürlük | 1080 × 1920          |
| Format     | JPG (veya WebP)      |
| Boyut      | ≤ 200 KB             |

Bu, video inmeden önce (ve inmezse) gösterilecek — videonun açılış karesiyle
birebir uyumlu olmalı ki geçiş fark edilmesin.

## Nasıl üretilir

**AI ile** (senin planın): hazır prompt, negatif prompt, araç karşılaştırması ve
QA listesi için → **[`HERO_VIDEO_PROMPT.md`](HERO_VIDEO_PROMPT.md)**.
Onaylı videodan çıkarılmış referans kareler: `docs/video-reference/`.

**Elde dikey master varsa** (ffmpeg ile sıkıştırma):

```bash
# 1080x1920'ye kırp + sıkıştır, sessiz, faststart
ffmpeg -i master.mov -an \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 30 -movflags +faststart \
  raymar-hero-mobile.mp4

# ilk kareyi poster olarak al
ffmpeg -i raymar-hero-mobile.mp4 -frames:v 1 -q:v 3 raymar-hero-mobile.jpg

# (ops.) daha küçük AV1/WebM
ffmpeg -i raymar-hero-mobile.mp4 -an -c:v libsvtav1 -crf 34 raymar-hero-mobile.webm
```

`-crf` değerini boyuta göre ayarla (yüksek = küçük dosya): 800 KB'yi tutturana
kadar 30 → 34 dene.

## Teslim + devreye alma

1. Dosyaları `public/video/` (video) ve `public/images/` (poster) altına koy.
2. Bana ver — ben `src/data/products.ts` içinde:
   - `heroMedia.videoMobile = '/video/raymar-hero-mobile.mp4'`
   - dikey posteri de bağlarım (`<picture>` ile mobilde dikey, masaüstünde yatay).
3. Mobilde otomatik olarak: hafif dikey video oynar; inmezse/az-veride dikey
   poster gösterilir. Masaüstü etkilenmez.

Kod tarafı hazır — sadece dosya + tek path yeter.
