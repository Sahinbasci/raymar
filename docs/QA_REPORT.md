# QA Report

All checks below were run against the **production build** (`next build` +
`next start`), not the dev server.

## Tested viewports

| Width × height                                                       | Engine / method                                  |
| -------------------------------------------------------------------- | ------------------------------------------------ |
| 320 / 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1728 / 1920 × 900 | Automated width ladder (overflow, hero height)   |
| 412 × 839 @2.625× (Pixel 7, real touch)                              | Chromium project + visual review                 |
| 390 × 664 (iPhone 14, real touch)                                    | **WebKit** project                               |
| 768 × 1024                                                           | Chromium project + visual review                 |
| 1280 × 800                                                           | Chromium project + visual review                 |
| 1440 × 900                                                           | Chromium, **WebKit and Firefox** + visual review |
| 1280 × 420 / 560 / 680 / 900                                         | Short-window scroll-cue check                    |

The two mobile projects use real device descriptors, not a resized desktop
browser: earlier they set only the viewport, so every "mobile" assertion —
including the 44px touch-target check — actually ran hover-capable,
mouse-driven and at 1× DPR.

## Automated results

**229 passed, 0 failed** across seven projects covering all three engines
(Chromium, WebKit, Gecko), stable across repeated full runs. 44 skips are
intentional viewport gates (desktop-only tests on mobile projects and vice
versa).

Covered: no console errors, no ≥400 responses, section order, `/`→`/tr`
redirect (307, deliberately not 308), `/tR` case-canonicalisation (308), `/en`
correctly 404s and renders the branded 404 document, single `h1`, desktop nav,
header inversion, mobile drawer (open, initial focus, Escape, scroll lock and
position restore, link dismissal), CTA targets, form validation (required /
e-mail / KVKK), successful submission and summary, product→form prefill, form
values never logged, no horizontal overflow, hero height bounds, scroll cue
above fold, 44px touch targets, reduced motion, hero video actually playing
(not merely its fallback), hero poster fallback, lazy-loading, logo aspect
ratio.

### Automated accessibility scan

`tests/e2e/accessibility.spec.ts` runs axe-core against WCAG 2.0/2.1/2.2 A+AA
on four surfaces — the resting homepage, the quotation form in its _error_
state, the open mobile drawer and the 404 page — in every project. **Zero
violations.**

It complements rather than replaces the manual pass below: axe detects roughly
a third of real WCAG failures and none of the judgement calls. Note that the
scan waits for reveal animations to settle before sampling — its first run
reported a heading at 1.17:1 that was simply being measured mid-fade, and a
fixed timeout would only have moved that flake around rather than removed it.

## Section-by-section visual comparison

Compared against `design-source/…/Raymar Ana Sayfa.dc.html` at 1440, 1280, 768
and 390.

| Section          | Result                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| Header           | ✅ Transparent over hero, ivory when scrolled; logo variant swap, nav/CTA/burger inversion, heights 88→76 / 72→64 |
| Hero             | ✅ Full-bleed video, correct scrims, cue with gold gradient rule and bobbing chevron                              |
| Giriş Sözü       | ✅ Left-aligned, asymmetric, Cormorant `clamp(44–88px)`, gold eyebrow rule, both CTAs                             |
| Deneyim Şeridi   | ✅ 3 → 3 → 1 columns, gold hairlines between cells only                                                           |
| Kurumsal Giriş   | ✅ Circular portrait with parallax, gold emblem in the left negative space                                        |
| Ürün Portföyü    | ✅ 1.12fr/1fr mosaic, index badges, serif titles, sliding arrows                                                  |
| Ceviz Ürünleri   | ✅ Lead card spans 2 columns with taller well; 7 cards; footnote                                                  |
| Ürünlerimiz      | ✅ 3 → 2 → 2 column grid, no stagger, hairline under each card instead of a bed                                   |
| Ticaret Hikâyesi | ✅ Centre gold line, 5 pillars with alternating dot opacity                                                       |
| Teklif           | ✅ 0.85fr/1.15fr asymmetry, all fields, KVKK, placeholders verbatim                                               |
| Footer           | ✅ Emblem watermark at 7%, italic gold tagline, 3 link columns                                                    |

Three rows changed since the original comparison, all deliberately:

- The **"Fındık Flagship"** and **"Seçkin İthal"** sections no longer exist
  separately; both were merged into `range-section` ("Ürünlerimiz") — see
  `docs/IMPLEMENTATION_PLAN.md` §3. The alternating 38px stagger the "Seçkin
  İthal" review recorded went with them, for the reason noted above
  `.range-grid` in `globals.css`.
- The trade-story section's closing **136px gold numeral was removed** — it was
  the page's third restatement of the same figure, which the heading and the
  experience strip already carry.
- The footer's **legal link row now points at real pages**. It briefly stood
  empty: the three links named documents that did not exist and pointed at the
  quotation form instead, so a visitor clicking "Gizlilik Politikası" landed on
  the form collecting their data. The three pages have since been written and
  the links restored.

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
   **Partly superseded since:** the underlying design this patched — hiding
   content on the server and revealing it on the client — was itself the larger
   problem (see `docs/DESIGN_SYSTEM.md` § Reduced motion). `Reveal` no longer
   hides anything server-side, so the `<noscript>` rule is gone: nothing is
   hidden by default for it to rescue.

   **The 4s timer stays and is still load-bearing.** `Reveal` can still hide an
   element on the client — the ones measured below the fold at mount — and if
   the observer never reports for one of those, the timer is what shows it.
   Observed during the final device sweep: at 768×1024, scrolling the page a
   full viewport per animation frame outran the observer for two section
   eyebrows, which stayed at `opacity: 0` past 3s and were then shown by the
   fallback (hidden count 2 → 0 between 3s and 6s). No real visitor scrolls
   that fast, and the content arrived either way — which is precisely the
   safety net doing its job rather than a defect.

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

Automated axe scan: see § Automated accessibility scan above — zero violations
across four surfaces in every project.

Still not done: no screen-reader pass with VoiceOver/NVDA. That is the one
remaining accessibility gap, and it is the kind axe cannot close — whether the
announcements actually make sense in order is a listening judgement.

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
- **All three engines now run in CI and locally.** `playwright.config.ts` adds
  `webkit-iphone` and `webkit-desktop-1440` (Safari's engine — which every iOS
  browser embeds, whatever its name) and `firefox-desktop-1440` (Gecko).
  Not real hardware, but the actual rendering and JS engines rather than
  Chromium alone. Firefox passed on the first run with no changes needed. Three
  things worth recording from the WebKit pass:
  - The hero video's fetch behaviour differs from what its own comments once
    assumed (`preload="none"` does not block `video.load()`'s fetch in any of
    the three engines — confirmed by tracing media events; all reach `canplay`
    and start playback with no user gesture).
  - **WebKit issues two requests for the clip, and that is correct.** It sends
    `Range: bytes=0-1` first — two bytes, to learn the length and confirm the
    server supports ranges — then `Range: bytes=0-<end>` for the file. Measured
    over the wire: 1,816,094 bytes against a 1,816,092-byte file, i.e. **two
    bytes of overhead, not a second download**. Chromium and Firefox use a
    single open-ended `Range: bytes=0-`. Do not "fix" the request count.
  - **Safari's default keyboard behaviour excludes links and buttons from the
    Tab order** — only form fields are included unless the visitor has "Full
    Keyboard Access" turned on system-wide. This is not a defect in the mobile
    drawer's focus trap (confirmed separately: `showModal()`'s own initial
    focus placement, and Escape-to-close, both work correctly in WebKit); it
    means a Tab-driven walk through the drawer's links specifically is a macOS/
    iOS system preference, not something this site controls. The Playwright
    suite accounts for this per-project rather than asserting it universally.

## Known limitations and open items

1. Telephone and e-mail remain the design's placeholders — see ASSET_AUDIT.md §4
   for why, and what the client must confirm. The legal texts they used to be
   grouped with have since been written (item 11).
2. All product photography is stock, labelled "temsili görsel".
3. **The quotation endpoint needs a delivery target before launch.**
   `public/teklif-gonder.php` validates, drops honeypot hits, rate-limits per
   IP and delivers by e-mail or webhook — but only once `QUOTE_TO_EMAIL` (or
   `QUOTE_WEBHOOK_URL`) is set at the top of that file. With neither set it
   returns 503 and the form shows its error state. This replaced a mock that resolved `{ ok: true }`
   unconditionally, i.e. thanked every buyer for an enquiry it had discarded.
   Refusing loudly is the intended unconfigured behaviour, not a gap; the gap is
   that nobody has chosen where enquiries should land.
4. `NEXT_PUBLIC_SITE_URL` must be set before launch — the build now refuses to
   run without it rather than silently baking in localhost.
5. Cormorant Garamond is not in the brand manual (DIN-only) — needs ratification.
6. The slogan renders without quotation marks, matching the approved design; the
   manual states it should always carry them. Left as designed.
7. **Logo clear space — now compliant in every state.** The manual requires 3X
   of clear space on all four sides, where X is 1/22 of the lockup's width.
   This entry previously assumed a 172px logo and put the requirement at ≈24px;
   the header logo is actually 107.7px wide, so X = 4.9px and the requirement
   is **14.7px**. Measured against that, only one of the four header states
   fell short — the scrolled bar on phones, at 12px. It was fixed by scaling
   that one state's lockup to 36px (see the comment in `header.tsx`), which
   lowers the requirement to 13.2px and raises the available space to 14px.
   Measured after the fix:

   | State             | Header | Lockup   | Needs 3X | Top / bottom |
   | ----------------- | ------ | -------- | -------- | ------------ |
   | Desktop, at rest  | 89px   | 107.7×40 | 14.7px   | 24 / 25 ✅   |
   | Desktop, scrolled | 77px   | 107.7×40 | 14.7px   | 18 / 19 ✅   |
   | Mobile, at rest   | 73px   | 107.7×40 | 14.7px   | 16 / 17 ✅   |
   | Mobile, scrolled  | 65px   | 97×36    | 13.2px   | 14 / 15 ✅   |

   The lockup's aspect ratio measures 2.693 in all four states, i.e. the
   artwork is never deformed — the manual's other hard rule.

8. No English locale. `/en` 404s until `src/content/en.ts` is filled and `'en'`
   is added to `completeLocales`. Doing the second without the first now fails
   the build — `src/content/index.ts` asserts it, because `en.ts` re-exports
   the Turkish dictionary and publishing it would serve the Turkish site again
   under `/en` as a declared English translation.
9. No automated visual-regression baselines; comparison was manual.
10. No screen-reader pass (VoiceOver/NVDA) — see § Accessibility.
11. **The legal texts are drafted, not reviewed by counsel.** KVKK aydınlatma
    metni, gizlilik politikası and çerez politikası are written and published
    from verified facts only — the legal entity, Mersis and tax numbers from the
    identity manual, the exact fields the form collects, the security headers
    actually set, and the confirmed absence of cookies or third-party analytics.
    They follow KVKK's statutory structure (Art. 10 disclosure order, Art. 11
    rights, TTK Art. 82 retention). Two things they deliberately do not claim: a
    connected form backend, and a KVKK application e-mail or KEP address, since
    neither exists yet. Both need adding to the text the moment they do. A
    lawyer's pass is still worth having before these become load-bearing.
