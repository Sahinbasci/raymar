# Asset Audit

Inventory of every asset supplied with the project, where it now lives, and its
status. Nothing in `design-source/` has been modified or deleted — it is the
untouched Claude Design export kept for reference.

## 1. Brand assets — official, immutable

| Asset              | Source                                                         | Shipped as                                | Status                                          |
| ------------------ | -------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------- |
| Logo, white + gold | `project/assets/raymar-logo-white-gold.svg`                    | `public/brand/raymar-logo-white-gold.svg` | **Byte-identical** (md5 `5cf27e6f…`)            |
| Logo, green + gold | `project/assets/raymar-logo-green-gold.svg`                    | `public/brand/raymar-logo-green-gold.svg` | **Byte-identical** (md5 `bcec3bae…`)            |
| Emblem, gold       | `project/assets/raymar-emblem-gold.svg`                        | `public/brand/raymar-emblem-gold.svg`     | **Byte-identical** (md5 `0a488986…`)            |
| Logo end-frame, 4K | `project/uploads/Raymar_Official_Logo_Final_Frame_4K_16x9.png` | `public/brand/raymar-og.png`              | Copied unmodified; used as the Open Graph image |

Notes:

- `raymar-logo-white-gold.svg` is byte-identical to the separately supplied
  `Raymar_Logo_White_Gold_Transparent.svg`. The two logo files differ **only** in
  the wordmark fill (`#fcfcfc` vs `#004C38`); the six emblem dots are `#f0b038`
  in both. Neither is a recolour of the other at runtime — both are shipped.
- The artwork ratio is 184.55231 : 68.514709. `BrandLogo` derives height from
  width so the lockup cannot be distorted; a Playwright assertion guards it.
- The emblem viewBox is 62 : 68.514709 and is rendered only as a decorative mark
  and a footer watermark, always `aria-hidden`.
- `src/app/icon.svg` is generated from the emblem's own path data placed on the
  corporate green — no artwork was redrawn. Unreferenced glyph definitions were
  stripped (38 KB → 18 KB); the rendered result is unchanged.

## 2. Hero video

| Property     | Value                                                     |
| ------------ | --------------------------------------------------------- |
| Source       | `project/assets/raymar-hero.mp4`                          |
| Shipped as   | `public/video/raymar-hero.mp4`                            |
| Integrity    | **Byte-identical** (md5 `7a119450…`)                      |
| Identical to | `Generated Video August 04, 2026 - 4_07PM.mp4` (same md5) |
| Resolution   | 1280 × 720                                                |
| Duration     | 8.00 s, looping                                           |
| Codecs       | H.264 (avc1) video + AAC (mp4a) audio                     |
| Size         | 1 816 092 bytes (1.73 MB)                                 |
| Poster       | `public/images/hero-poster.jpg`, 1600 × 900, 268 KB       |

- **No transcode was performed** on the desktop clip (`ffmpeg` is not available
  in this environment). The 16:9 asset is served to desktop only.
- **Mobile now downloads its own cut, not this one.** This section originally
  described a `null` `heroMedia.videoMobile` — phones showed the poster only,
  since ~90% of traffic is mobile and this clip is 1.73 MB / landscape. The
  portrait cut specified in `docs/HERO_VIDEO_SPEC.md` has since shipped as
  `public/video/raymar-hero-mobile.mp4` (~784 KB) with a matching
  `hero-poster-mobile.jpg`; phones below 720px load that instead of this file.
- The clip carries a silent audio track. It is played muted, and `muted` is set
  as a property as well as an attribute so Safari honours autoplay.
- The video ends on the official logo frame and loops back to the opening.

## 3. Photography from the design hand-off — mostly superseded

All 14 JPEGs from the design export were originally copied unmodified to
`public/images/`, verified against the design's declared `width`/`height`
(all 14 matched, so no aspect ratio was guessed).

**12 of the 14 have since been replaced** by the licensed stock photography in
§3b below — the walnut, hazelnut, pumpkin and sunflower cards it lists cover
the same slots these did — and **have been deleted from `public/images/`**,
freeing ~2.8 MB that sat unreferenced after the replacement (confirmed against
`src/data/products.ts` and every content file: nothing pointed at them any
more).

Two survive because nothing replaced them:

| File                  | Dimensions | Size   | Used by                                       |
| --------------------- | ---------- | ------ | --------------------------------------------- |
| `hero-poster.jpg`     | 1600 × 900 | 268 KB | Hero poster                                   |
| `macadamia-white.jpg` | 900 × 600  | 61 KB  | Portfolio tile + `range-section` product card |

Delivery: served through `next/image`, which emits AVIF/WebP at the widths
declared in `next.config.ts`. The originals are untouched on disk.

## 3b. Stock photography added after the design hand-off

Sourced 2026-08-10 to replace product images that misrepresented the goods and
to cover products the design never had (pistachio, in-shell sunflower). Every
file was visually verified at full size before use — stock captions on these
sites are unreliable, and several candidates titled "shelled pistachio" were in
fact in-shell. All are free for commercial use with no attribution required;
credits are recorded here for provenance only.

| Shipped as                | Photographer          | Source               | Licence            |
| ------------------------- | --------------------- | -------------------- | ------------------ |
| `hazelnut-kernel.jpg`     | Anil Karakaya         | Pexels 14017007      | Pexels License     |
| `hazelnut-inshell.jpg`    | engin akyurt          | Unsplash             | Unsplash License   |
| `pistachio-kernel.jpg`    | Joanna Kosinska       | Unsplash             | Unsplash License   |
| `pistachio-inshell.jpg`   | Kairi Kaljo           | Unsplash             | Unsplash License   |
| `pumpkin-kernel.jpg`      | Karola G / Kaboompics | Pexels 4871089       | Pexels License     |
| `sunflower-kernel.jpg`    | Vie Studio            | Pexels 7421201       | Pexels License     |
| `sunflower-inshell.jpg`   | Ganajp                | Pexels 18328395      | Pexels License     |
| `walnut-honey.jpg`        | engin akyurt          | Unsplash             | Unsplash License   |
| `walnut-broken.jpg`       | RGY23                 | Pixabay 5852421      | Pixabay Content    |
| `walnut-halves-pale.jpg`  | Ajale                 | Pixabay 1049558      | Pixabay Content    |
| `walnut-natural.jpg`      | Arina Krasnikova      | Pexels 6316688       | Pexels License     |
| `walnut-quarter.jpg`      | Engin Akyurt          | Pexels 38571528      | Pexels License     |
| `walnut-red.jpg`          | Tom Hermans           | Unsplash IbL3Zd62Q7Q | Unsplash License   |
| `walnut-rice.jpg`         | Bodhi Peace           | Wikimedia Commons    | **CC BY-SA 4.0** ⚠ |
| `pistachio-band-bulk.jpg` | Engin Akyurt          | Pexels 27644256      | Pexels License     |

The first seven rows above were downscaled to a 1400px long edge at quality 62.
**The remaining six were not** — `walnut-honey.jpg` and `walnut-natural.jpg`
ship at 1800px, `walnut-quarter.jpg` at 1800px, `walnut-red.jpg` at 2400px,
`walnut-rice.jpg` at 2600px (2600×2600, square) and `pistachio-band-bulk.jpg`
at 3200px — measured directly off the shipped files, not carried over from
this note. The two Pixabay files (`walnut-broken.jpg`, `walnut-halves-pale.jpg`)
are smaller than the 1400px target and were correctly left at their native
1280px rather than upscaled. All are served through `next/image`, which emits
9–60 KB AVIF at the widths the layout actually requests — the oversized
originals cost extra encode time and disk, not extra bytes on the wire, since
`next/image` never serves a candidate wider than a slot requests.

**Excluded on licence grounds.** Several better-composed pistachio and hazelnut
candidates are hosted on `plus.unsplash.com` — that is Unsplash+, a paid
subscription licence, not the free Unsplash License, and none were used.

**⚠ `walnut-rice.jpg` carries an attribution obligation.** It is the ONLY image
on the site not under a no-attribution licence. CC BY-SA 4.0 requires:

1. **Attribution** — "Bodhi Peace, CC BY-SA 4.0, via Wikimedia Commons",
   visible in a reasonable place (a credits line or the walnut-section
   footnote).
2. **Share-alike** — the centre-crop is a derivative and must itself be
   offered under CC BY-SA 4.0. This does NOT relicense the site or its code;
   it binds only that one image file.
   Source: https://commons.wikimedia.org/wiki/File:Chopped_walnuts_on_board.jpg
   It was chosen only because it is the single genuinely rice-grade free photo in
   existence; its quality is below the rest of the set (harsh flash, warm cast) and
   it is a candidate for replacement by an own-shoot or a paid licence.

**Kızıl is a colour grade, not the red-pellicle cultivar.** `walnut-red.jpg`
is a warm reddish-amber kernel bed, chosen to read distinctly redder than the
pale grades. A genuinely red-pellicle ('Robert Livermore' / 'Yolo Red') kernel
photo does not exist under any free licence — four independent stock sweeps
(Pexels, Unsplash, Pixabay, Wikimedia + open web) came back empty; the only
red-kernel images are on paid libraries or a low-res, legally-gray US patent
figure. Representing the grade by its colour is the honest option.

**Best remaining fix.** A single shoot covering all seven walnut grades on one
surface would replace both compromises above (the CC BY-SA rice image and the
colour-grade kızıl stand-in) with the company's own product in one pass.

## 4. Placeholder content — REQUIRES CLIENT INPUT

These are marked as pending **in the approved design itself** and are reproduced
verbatim rather than filled in. Do not treat them as final copy.

| Placeholder                                                                     | Appears in              |
| ------------------------------------------------------------------------------- | ----------------------- |
| `[Telefon bilgisi eklenecek]`                                                   | Contact block, footer   |
| `[E-posta bilgisi eklenecek]`                                                   | Contact block, footer   |
| `[Politika metni eklenecek]`                                                    | KVKK consent line       |
| "Görseller temsilidir; nihai ürün fotoğrafları firma tarafından sağlanacaktır." | Walnut section footnote |

Two placeholders that were here at hand-off are gone, not because the client
supplied real copy but because the sections carrying them changed shape: the
"Flagship" section's placeholder note was removed when that section merged
into `range-section` (see `docs/IMPLEMENTATION_PLAN.md` §3), and the trade
story section's placeholder note was replaced outright — `tradeStory.intro`
in `src/content/tr.ts` is now real copy, flagged in that file's own comment as
new text making no factual claim beyond the client-confirmed 25 years.

Every product image alt text carries "(temsili görsel)" — _representative image_
— exactly as the design states. These are stock photographs, **not** Raymar
product photography.

### Telephone and e-mail: available but deliberately not published

The corporate identity manual **does** contain contact details:

- `T: +90 212 649 60 28`, `G: +90 531 343 66 70`
- `info@marasintl.com`, `www.marasintl.com`

They were **not** substituted into the site, for two reasons:

1. The approved design explicitly marks these fields as pending.
2. Every digital contact point in the manual belongs to **MAREX DIŞ TİC. LTD.
   ŞTİ.** on the `marasintl.com` domain — not a Raymar domain. Which entity,
   domain and mailbox the public website should present is a commercial
   decision, not an engineering one.

The postal address **is** published, because the design already publishes it and
it matches the manual verbatim.

**Action for the client:** confirm the public-facing telephone, e-mail and domain,
then edit `src/content/tr.ts` (`quote.phoneValue`, `quote.emailValue`,
`footer.phoneValue`, `footer.emailValue`) — no component changes are required.

## 5. Corporate identity manual — extracted facts

Read from `RAYMAR KUR. KIM.'23 copy.pdf` (54 pages, "KURUMSAL KİMLİK KILAVUZU",
AĞUSTOS '23). Facts recorded here for traceability; see `DESIGN_SYSTEM.md` for
how they were applied.

- **Typeface:** "Marka kimliği yazı karakteri DIN ailesidir." Specimens named:
  `DIN(T) Light`, `DIN(T) Medium`, `DIN(T) Black`. No serif or display face is
  specified anywhere in the manual.
- **Colour:** only two are specified — `PANTONE 129` (gold, `C:0 M:16 Y:77 K:0`)
  and `PANTONE 567` (green, `C:82 M:0 Y:64 K:70`), plus `Black`. **No RGB or HEX
  values appear in the manual.**
- **Proportions:** horizontal lockup is 22X wide; emblem 5X + 2X gap + wordmark
  15X. "Ölçülendirmeler standart olup, kesinlikle değiştirilmemelidir."
- **Clear space:** 3X on all four sides.
- **Minimum size:** NOT SPECIFIED.
- **Forbidden:** deforming the lockup; placing the emblem left of / above the
  wordmark; using colours outside the specified ones.
- **Slogan:** "Tane Tane Lezzetler", always shown in quotation marks, italic, gold.
- **Legal entity:** MAREX DIŞ TİC. LTD. ŞTİ.; Mersis `0612100813400001`;
  tax office `Atışalanı VD. 612 100 8134`.
- **Founding year:** NOT PRESENT in the manual — so none is claimed on the site.

No English "about us" copy exists anywhere in the manual, and the slogan is never
translated. This is why the English locale ships unpopulated.

## 6. Assets present in the export but intentionally unused

| Asset                                                          | Reason                                                                                                                             |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `uploads/Ekran Resmi 2026-08-04 21.09.41.png`, `…21.27.12.png` | Screenshots of an **earlier** iteration of this design (pre-refinement, Archivo type, 2px radii). Superseded by the approved file. |
| `uploads/Ekran Resmi 2026-08-05 12.12.49/13.06/13.28.png`      | Screenshots of a competitor site (ronlygida.com), used as reference during design. Not Raymar material.                            |
| `uploads/WhatsApp Image 2026-08-05 at 08.58.05.jpeg`           | A third party's trade-fair poster, used as a style reference. Not Raymar material.                                                 |
| `uploads/identity_pdf-1785859971194.pdf`                       | Copy of the corporate identity manual.                                                                                             |
| `Raymar Ana Sayfa v1.dc.html`                                  | Superseded first draft. Retained in `design-source/`.                                                                              |

## Deferred media work

1. **Video variants.** If a lighter mobile asset is later wanted, generate it
   from the untouched source — do not re-encode an already-encoded delivery copy:
   ```
   # audio-free (the track is silent), same visual quality
   ffmpeg -i public/video/raymar-hero.mp4 -an -c:v copy raymar-hero-noaudio.mp4
   # AV1/WebM for modern browsers
   ffmpeg -i public/video/raymar-hero.mp4 -an -c:v libsvtav1 -crf 34 raymar-hero.webm
   ```
   Then add the variants as `<source>` entries in `HeroVideo`.
2. **Final product photography.** Every product image is currently stock. Replace
   the paths in `src/data/products.ts`; alt text lives in `src/content/tr.ts` and
   should drop "(temsili görsel)" at the same time.
3. **Licensed DIN font files.** See `DESIGN_SYSTEM.md`.
4. **Walnut category names.** The section renders one headed block per entry in
   `walnutGroupIds` (`src/data/products.ts`), but only when more than one group
   exists — a single group would repeat the section's own title three times
   over. Today all seven products sit in one group. To switch the dividers on,
   Raymar must supply the category names and which product belongs to each;
   nothing is invented. Verified working with a temporary second group: two
   dividers rendered and the heading hierarchy stayed ordered.
5. **Cut-out product photography.** The floating ornament currently uses the
   brand emblem. If transparent-background product cut-outs are ever produced,
   `FloatingMotif` can take them instead.
