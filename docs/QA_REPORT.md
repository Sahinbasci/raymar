# QA Report

All checks below were run against the **production build** (`next build` +
`next start`), not the dev server.

## Tested viewports

| Width × height                                                       | Method                                         |
| -------------------------------------------------------------------- | ---------------------------------------------- |
| 320 / 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1728 / 1920 × 900 | Automated width ladder (overflow, hero height) |
| 390 × 844                                                            | Playwright project + visual review             |
| 768 × 1024                                                           | Playwright project + visual review             |
| 1280 × 800                                                           | Playwright project + visual review             |
| 1440 × 900                                                           | Playwright project + visual review             |
| 1280 × 420 / 560 / 680 / 900                                         | Short-window scroll-cue check                  |

## Automated results

**94 passed, 0 failed**, stable across repeated full runs. 26 skips are
intentional viewport gates (desktop-only tests on mobile projects and vice
versa).

Covered: no console errors, no ≥400 responses, section order, `/`→`/tr`
redirect, `/en` correctly 404s, single `h1`, desktop nav, header inversion,
mobile drawer (open, focus trap, Escape, scroll lock + position restore, link
dismissal), CTA targets, form validation (required / email / KVKK), successful
submission and summary, product→form prefill, form values never logged, no
horizontal overflow, hero height bounds, scroll cue above fold, 44px touch
targets, reduced motion, hero poster fallback, lazy-loading, logo aspect ratio.

## Section-by-section visual comparison

Compared against `design-source/…/Raymar Ana Sayfa.dc.html` at 1440, 1280, 768
and 390.

| Section         | Result                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Header          | ✅ Transparent over hero, ivory when scrolled; logo variant swap, nav/CTA/burger inversion, heights 88→76 / 72→64 |
| Hero            | ✅ Full-bleed video, correct scrims, cue with gold gradient rule and bobbing chevron                              |
| Giriş Sözü      | ✅ Left-aligned, asymmetric, Cormorant `clamp(44–88px)`, gold eyebrow rule, both CTAs                             |
| Deneyim Şeridi  | ✅ 4 → 2 → 1 columns, gold hairlines between cells only                                                           |
| Kurumsal Giriş  | ✅ Circular portrait with parallax, gold emblem in the left negative space                                        |
| Fındık Flagship | ✅ 52%-width photographic bleed at 50% opacity, horizontal green gradient, 4:5 portrait                           |
| Ürün Portföyü   | ✅ 1.12fr/1fr mosaic, index badges, serif titles, sliding arrows                                                  |
| Ceviz Ürünleri  | ✅ Lead card spans 2 columns with taller well; 7 cards; footnote                                                  |
| Seçkin İthal    | ✅ 4:5 crops, 38px alternating stagger, no card beds                                                              |
| 30 Yıl Hikâyesi | ✅ Centre gold line, 5 pillars with alternating dot opacity, 136px gold "30"                                      |
| Teklif          | ✅ 0.85fr/1.15fr asymmetry, all fields, KVKK, placeholders verbatim                                               |
| Footer          | ✅ Emblem watermark at 7%, italic gold tagline, 3 link columns, legal row                                         |

## Defects found and fixed during QA

1. **Reveals invisible under `prefers-reduced-motion`.** `Reveal` branched to a
   plain element when reduced motion was set. The server always renders the
   motion branch, and React hydration does not clear inline styles the client
   render omits — so `opacity: 0` stayed on the node and every revealed section
   was permanently invisible. Now the element is stable and reduced motion sets
   the animation duration to zero instead. Covered by a test.
2. **Hero collapsed to zero height where `svh` resolves to 0.** The floor was
   `clamp(min(520px, 100svh), …)`. Replaced with a height media query, which
   cannot fail that way.
3. **No fallback if the viewport observer never fires.** The prototype had a 5s
   safety timeout; it had not been carried over. Restored (4s), plus a
   `<noscript>` rule so content is visible with JavaScript disabled entirely.
   The header threshold gained an equivalent fallback — without it a silent
   observer leaves white navigation on an ivory background.
4. **Portfolio mosaic split one breakpoint too late.** The design splits it into
   two columns at 720px; it had been deferred to 1080px. Corrected.
5. **Portfolio tile titles crowded.** 21px forced a three-line wrap at 390px and
   768px. Now sized by a container query against the tile's own width.
6. **Footer locale indicator missing.** The design's static TR / EN pair had
   been omitted. Added, marked decorative.

## Accessibility

- Landmarks: `header`, `main`, `footer`, two labelled `nav`s. Skip link first in
  the tab order.
- Exactly one `h1`; `h2` per section; `h3` per product. No level skipped.
- Mobile navigation is a native `<dialog>` via `showModal()` — focus trap,
  Escape and background inertness come from the browser, not hand-rolled JS.
- Focus is never removed: a 2px gold `:focus-visible` ring at 3px offset.
- All interactive elements are `<button>` or `<a>`. No `div` handlers.
- Form: every control has a real `<label>`, correct `type`/`autocomplete`,
  `aria-invalid` on failure, an assertive live region, and focus moves to the
  first invalid field.
- Decorative media (`hero video`, scrims, emblem, footer watermark, locale
  indicator) is `aria-hidden`; the video is also removed from the tab order.
- Contrast: every text pair measured, all AA or better — see DESIGN_SYSTEM.md.
- No autoplaying audio; the hero video is muted by attribute and property.
- Reduced motion preserves all content and hierarchy (asserted, not assumed).

Not done: no screen-reader pass with VoiceOver/NVDA, and no automated axe run.

## Performance (production build, 1440×900, local)

| Metric          | Value                                                  |
| --------------- | ------------------------------------------------------ |
| LCP             | ~156 ms (hero poster, `priority`)                      |
| CLS             | **0.0000**                                             |
| CSS transferred | ~10 KB gzipped                                         |
| JS transferred  | ~190 KB gzipped                                        |
| Fonts           | 185 KB woff2, 14 files, self-hosted and preloaded      |
| Hero video      | 1.73 MB, `preload="none"`, fetched after hydration     |
| Images          | `next/image`, AVIF/WebP, only the poster is `priority` |

Notes:

- Zero layout shift: every image sits in a frame with a fixed aspect ratio or
  height, and the logo's dimensions come from the artwork ratio.
- The font payload is the largest fixed cost, driven by needing `latin-ext` for
  Turkish across two families. Cormorant weight 500 was found unused and
  removed. Adopting licensed DIN would let Jost be dropped entirely.
- The video is excluded from the critical path and is not requested at all under
  reduced motion or Data Saver.

## Browser considerations

- **Safari/iOS:** `muted` is set as a property as well as an attribute, and
  `playsInline` is set, so autoplay is permitted. Body scroll lock uses
  `position: fixed` because iOS ignores `overflow: hidden` on `body` for the
  page scroller; the scroll position is restored on close. `svh` avoids the
  dynamic-toolbar viewport problem.
- **Drawer transitions** use `@starting-style` and `transition-behavior:
allow-discrete` (Chrome 117+, Safari 17.4+). Where unsupported the drawer
  opens and closes instantly — degraded, not broken.
- **Container queries** are used for the portfolio tile titles (all current
  evergreen browsers).
- Verified in Chromium only. **Not yet verified on real Safari or Firefox.**

## Known limitations and open items

1. Telephone, e-mail and the KVKK policy text remain the design's placeholders —
   see ASSET_AUDIT.md §4 for why, and what the client must confirm.
2. All product photography is stock, labelled "temsili görsel".
3. The quotation form posts to a documented mock; no messages are delivered.
   `src/lib/quote-submission.ts` marks where the endpoint connects.
4. `NEXT_PUBLIC_SITE_URL` must be set before launch or canonical/OG URLs will
   point at localhost.
5. Cormorant Garamond is not in the brand manual (DIN-only) — needs ratification.
6. The slogan renders without quotation marks, matching the approved design; the
   manual states it should always carry them. Left as designed.
7. **Logo clear space.** The manual requires 3X on all sides (≈24px at the
   header's 172px logo). The design's 88px header satisfies this, but its
   scrolled (76px → 18px) and mobile (64px → 12px) states do not. Preserved as
   approved rather than silently altering the design; flagged for sign-off.
8. No English locale. `/en` 404s until `src/content/en.ts` is filled and `'en'`
   is added to `completeLocales`.
9. No automated visual-regression baselines; comparison was manual.
