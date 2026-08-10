# Mobil Hero Videosu — AI Üretim Prompt'u

Teknik şartlar için önce [`HERO_VIDEO_SPEC.md`](HERO_VIDEO_SPEC.md). Bu dosya
**ne yazacağını** ve **hangi araçta hangi ayarı** kullanacağını verir.

---

## 0. Onaylı videonun gerçekte ne olduğu

Masaüstü videosunu kare kare çıkardım (`docs/video-reference/`). Gerçek arkı:

| Zaman | İçerik                                                                             |
| ----- | ---------------------------------------------------------------------------------- |
| 0.0 s | Raymar logosu — düz koyu yeşil zemin                                               |
| 1.0 s | İki bütün kabuklu ceviz, yeşil kadife kumaş, çok sığ alan derinliği, alçak açı     |
| 2.0 s | Kumaşa dağılmış birkaç ceviz, orta makro                                           |
| 5.0 s | **Kilit an** — kırılmış ceviz, açığa çıkan altın rengi iç, yanında boş yarım kabuk |
| 6.0 s | Aynı kompozisyon biraz geniş, havada asılı toz/kırıntı parçacıkları                |
| 7.9 s | Aynı logo karesi                                                                   |

**Önemli:** video logoda başlayıp logoda bittiği için **döngü zaten kusursuz**.

### Ölçülmüş renkler (gerçek karelerden örneklendi)

| Yüzey                      | Hex                   |
| -------------------------- | --------------------- |
| Logo zemini (koyu yeşil)   | `#003F36`             |
| Logo altın noktaları       | `#FDB73D`             |
| Kadife — gölge             | `#15362F`             |
| Kadife — ara ton           | `#2A4E44`             |
| Kadife — ışık alan         | `#3F695B` → `#4B7464` |
| Ceviz kabuğu — ışıklı      | `#AB8153`             |
| Ceviz kabuğu — sıcak kahve | `#734E33`             |
| Ceviz içi (altın)          | `#9E622E` → `#A96421` |

Marka renkleri: kurumsal yeşil `#004C38`, kurumsal altın `#F0B038`.

---

## 1. ⚠️ Logoyu AI'a çizdirme

Üretilecek klip **sadece ceviz görüntüsü** olmalı. Raymar logosu marka varlığı —
AI'ın çizdiği logo deforme olur ve kimlik kılavuzunun "amblem ve logo deforme
edilemez" kuralını ihlal eder.

Logolu açılış/kapanış isteniyorsa: klibi üret, **resmi logo dosyasını sonradan
montajla** (`public/brand/raymar-logo-white-gold.svg`).

Aslında buna gerek de yok — sitede logo zaten header'da duruyor. Mobil için
**sadece ceviz döngüsü** daha temiz.

---

## 2. Ana prompt (kopyala-yapıştır)

Üç farklı yaklaşımla taslak üretildi, puanlanıp en güçlüsü sentezlendi.
Güvenli alan oranları sitedeki gerçek ölçümden geliyor (üst %13, alt %19 →
prompt'ta pay bırakılarak %15 / %20).

```
Photoreal premium food-commercial macro, vertical 9:16 portrait, 1080x1920, eight
seconds, seamless loop. Camera first: one single continuous breathing move — a low
100mm macro at T2.8, almost level with the surface, creeps forward a few percent
toward the kernel, then decelerates and glides back to its exact starting position,
focal length and focus, so the final frame matches the first identically. No cuts,
no shake, no pan; nothing falls, nothing enters frame. The top fifteen percent and
the bottom twenty percent of the tall frame hold only deep shadowed teal-green
velvet, #15362F falling into #2A4E44, matte, calm and empty, with no highlights, no
specular hits and no moving detail. All subject matter is locked inside the central
sixty percent: one walnut cracked open dead centre revealing its pale golden kernel,
#9E622E to #A96421, the empty half-shell beside it, two or three whole in-shell
walnuts blurred behind, a light scatter of shell fragments. A soft warm key from
upper left rakes the ridged, porous, chalk-dusted shell grain, lit #AB8153 falling
to #734E33, against cool deep green ground #004C38 and lit velvet folds #3F695B to
#4B7464. Black negative fill camera right gives steep falloff to every edge. Very
shallow depth of field, creamy bokeh, clean low-noise image, smooth gradients,
restrained editorial grade. No text, no letters, no numbers, no logo, silent.
```

### Neden bu şekilde yazıldı

- **Döngü en başta.** Video modelleri ilk cümleye en çok ağırlık verir. Döngü
  "git ve aynı noktaya dön" şeklinde **fiziksel olarak çözülebilir** tarif edildi;
  sadece "loop" demek işe yaramıyor.
- **Özne donduruldu** ("nothing falls, nothing enters frame") — böylece döngüyü
  kapatması gereken tek değişken kamera kalıyor.
- **Güvenli alanlar sahne içeriği olarak** yazıldı ("sadece gölgeli boş kadife"),
  kural olarak değil. Modeller tarif edilen boşluğu, yasaklanan boşluktan daha
  güvenilir üretiyor. Ayrıca "no highlights, no specular" var — çünkü asıl risk
  beyaz UI yazısının altına parlak bir leke gelmesi.
- **Her hex belirli bir yüzeye bağlandı.** Serbest bırakılırsa model varsayılan
  "turuncu-teal" sinema gradingine kayıyor ve marka rengi tutmuyor.
- **"Clean low-noise, smooth gradients"** 800KB bütçesi için — kadife dokusu ve
  parçacık gürültüsü bitrate'i şişiren şeyler.

---

## 3. Negatif prompt

**Sadece destekleyen araçlarda** kullan (Kling, Veo/Vertex). Runway ve Luma
negatif prompt **desteklemiyor** — Luma açıkça "negatif prompt ters etki yapar"
diyor, oralarda kullanma.

```
text, letters, numbers, words, captions, watermark, logo, brand mark, packaging,
labels; visible bands, borders, split screen, letterbox or pillarbox bars, 16:9 or
square framing; hard cut or jump at the loop point, mismatched first and last frame,
camera not returning to start, speed ramp, strobing, flicker; camera shake, handheld
wobble, whip pan, snap zoom, spinning, orbiting, rotating subject; falling, dropping,
pouring, bouncing or tumbling nuts, cracking action, flying debris, splashes, liquid,
smoke, steam; hands, fingers, people, faces, nutcracker, tools; bright or busy top and
bottom edges, highlights in the upper or lower band, subject drifting to top or bottom
of frame, off-centre hero nut, subject cropped by frame edge; oversaturated, neon,
orange-and-teal grade push, HDR clipping, blown highlights, harsh contrast, lens flare,
glitter, sparkles, bokeh balls, heavy film grain, digital noise, chromatic aberration;
warping or morphing shells, duplicated or multiplying nuts, deformed kernel anatomy;
wooden table, marble, plate, bowl, basket, burlap, leaves, chocolate, honey, mixed nuts,
almonds, hazelnuts, pistachios, cluttered props; cartoon, plastic CGI look, 3D render,
audio, music, voiceover
```

> Bazı platformlar uzun negatif prompt'u kesiyor. Kesilme riski varsa **baştaki
> döngü / metin / güvenli alan / düşen nesne** maddelerini tut, sondaki prop
> listesini at.

---

## 4. Araç seçimi (güncel — Ağustos 2026 doğrulaması)

| Araç               | 9:16              | Süre     | **Döngü**            | İlk+Son kare            | Negatif      | Maks çözünürlük |
| ------------------ | ----------------- | -------- | -------------------- | ----------------------- | ------------ | --------------- |
| **Luma Ray**       | ✅ `aspect_ratio` | 5s / 10s | ✅ **`loop` native** | ✅ start+end            | ❌           | 1080×1920       |
| **Kling 3.0**      | ✅ (T2V'de)       | 3–15s    | ❌                   | ✅ `image`+`image_tail` | ✅           | 4K              |
| **Veo 3.1**        | ✅ `aspectRatio`  | 4/6/8s   | ❌                   | ✅ `image`+`lastFrame`  | ⚠️ Vertex'te | 4K              |
| **Runway Gen-4.5** | ✅ ama I2V'de     | 2–10s    | ❌                   | ❌ sadece start         | ❌           | 720×1280        |
| **Sora 2**         | ✅                | 4/8/12s  | ❌                   | ❌ sadece start         | ❌           | 1080×1920       |

### Öneri sırası

1. **Luma Dream Machine** — tek native `loop` özelliği olan araç. Kusursuz döngü
   şart olduğu için en az post-prodüksiyon işi burada. 9:16 + 1080p destekliyor.
   ⚠️ `loop` ile `10s` ve HDR birlikte çalışmıyor → **5 saniye** üret, sitede
   döngü zaten sürekli, 5s yeterli.
2. **Kling 3.0** — döngü native değil ama `image` + `image_tail` alanlarına
   **aynı görseli** verirsen model başladığı kareye dönmek zorunda kalır. Negatif
   prompt da destekliyor. 4K çıkış.
3. **Veo 3.1** — aynı ilk/son kare numarası (`image` + `lastFrame`). 8s tam
   istediğimiz süre.

### ⚠️ Sora 2 kullanma

OpenAI Sora 2 **kapanıyor**: API 2026-09-24'te kapatılıyor, tüketici uygulaması
2026-04-26'da zaten kapandı. Yerine önerilen model yok. Yeni iş için başlatma.

### ⚠️ Runway sınırı

Native çıkışı **720p** — 9:16'da 720×1280. 1080×1920 istiyorsan ayrı upscale
pass'i gerekiyor. Ayrıca portrait **sadece image-to-video** yolunda var,
text-to-video 16:9'a kilitli.

---

## 5. En sağlam yol: image-to-video (önerilen)

Saf text-to-video her seferinde farklı sonuç verir ve marka rengini tutturmak
zor. Çok daha güvenilir yol:

1. **Portre bir başlangıç karesi hazırla** — 1080×1920.
   - `docs/video-reference/05-portrait-crop-reference.jpg` zaten onaylı videodan
     alınmış 9:16 kırpma (405×720). Kompozisyon şaşırtıcı derecede iyi oturuyor:
     kırık ceviz ortada, altta sakin kadife.
   - Bunu ya upscale et, ya da bu kareyi **referans göstererek** text-to-image ile
     1080×1920 temiz bir kare ürettir (aynı prompt, "still photograph" diyerek).
2. **Aynı görseli hem başlangıç hem bitiş karesi ver** (Luma `start_frame`+
   `end_frame`, Kling `image`+`image_tail`, Veo `image`+`lastFrame`).
   → model aynı kareye dönmek zorunda, döngü kendiliğinden kapanır.
3. Ana prompt'u hareket tarifi olarak ver.

Bu yöntem hem marka rengini kilitler hem döngü sorununu kökten çözer.

### Luma için pozitif-only varyant

Luma negatif prompt istemiyor, "no ..." kalıbı da sonucu bozuyor. Son cümleyi
şununla değiştir:

```
Clean unmarked footage, bare product photography, silent.
```

---

## 6. Post-prodüksiyon (zorunlu)

Hiçbir araç 800KB / sessiz / faststart çıktı vermez. Üretim sonrası:

```bash
# 1) 9:16'ya sabitle + sessiz + web'e uygun sıkıştır
ffmpeg -i generated.mp4 -an \
  -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 30 -movflags +faststart \
  raymar-hero-mobile.mp4

# 2) boyut kontrolü — 800KB'yi aşıyorsa crf'i yükselt (30 → 32 → 34)
ls -lh raymar-hero-mobile.mp4

# 3) dikey poster (ilk kare)
ffmpeg -i raymar-hero-mobile.mp4 -frames:v 1 -q:v 3 raymar-hero-mobile.jpg
```

### Döngü dikişi tutmadıysa

```bash
# A) boomerang — özne sabit olduğu için burada görünmez, en garantili yol
ffmpeg -i in.mp4 -filter_complex "[0]reverse[r];[0][r]concat=n=2:v=1[v]" -map "[v]" -an loop.mp4

# B) kuyruğu başa çapraz geçir (0.4 sn)
ffmpeg -i in.mp4 -filter_complex \
 "[0]split[a][b];[a]trim=0:7.6,setpts=PTS-STARTPTS[main];\
  [b]trim=7.6,setpts=PTS-STARTPTS[tail];[main][tail]xfade=transition=fade:duration=0.4:offset=7.2" \
 -an loop.mp4
```

---

## 7. Teslimden önce QA — bunları mutlaka kontrol et

Araştırmada çıkan gerçek risk listesi:

- [ ] **Döngü dikişi.** Modeller kare-tam dönüş garanti etmiyor. **4–8 deneme**
      üretmeyi bütçele. Tutmazsa boomerang'e düş (özne sabit, fark edilmez).
- [ ] **Renk kayması.** Hex değerleri modele "hedef" değil "ipucu". Sıcağa kayar,
      teal doygunluğu düşer. Teslim öncesi **grading pass'i planla** — zemin
      `#004C38`/`#003F36`, kabuk `#AB8153`/`#734E33`.
- [ ] **Görünür bant artefaktı.** "Üst %15 / alt %20" talimatını bazı modeller
      **düz alarak gerçek yatay bant / çerçeve / triptik** çiziyor. Her denemede
      özellikle buna bak.
- [ ] **Güvenli alan zamanla kayıyor.** İlk kare temiz olup, push-in ortada parlak
      bir kabuğu üst banda taşıyabilir. **İlk, orta ve son kareyi** beyaz logo +
      scroll oku bindirerek kontrol et — sadece ilk kareye bakma.
- [ ] **Ceviz anatomisi.** İç kısmın beyin gibi çıkması, kabuğun hareket sırasında
      morph olması, kırık yarımla içinin ölçek tutmaması sık görülen hata. Tam
      boyutta incele — kilit anda bozuk bir iç, premium algıyı bitirir.
- [ ] **Davetsiz nesne.** Model "prodüksiyon değeri" için düşen ceviz veya el
      ekleyebilir; hem döngüyü hem sakin brief'i bozar.
- [ ] **800KB prompt'la garanti edilemez.** Kadife dokusu + kabuk greni bitrate
      şişiriyor. Gerekirse **720×1280 üret**, tarayıcı zaten ölçekliyor.

---

## 8. Geldiğinde ne yapacağım

Dosyaları `public/video/` + `public/images/` altına koy, bana söyle:

- `src/data/products.ts` → `heroMedia.videoMobile` yolunu bağlarım
- dikey posteri mobile özel gösteririm
- mobilde otomatik devreye girer, masaüstü etkilenmez

Kod tarafı hazır — şu an mobilde video hiç inmiyor, poster gösteriliyor.
