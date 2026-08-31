# Implementation Plan

Written during Phase 0 inspection and kept up to date as the build proceeded.
Status markers reflect the delivered state.

## 1. Assessment of the supplied project

**What arrived:** a Claude Design handoff bundle, not a codebase. There was no
`package.json`, no framework, no build. The working directory
`/Users/sahin/Desktop/raymar_web_site` was empty.

**Export format:** a single self-contained `.dc.html` prototype (1080 lines) —
inline-styled HTML plus a `DCLogic` class that applied all responsive behaviour,
variants and interactions imperatively in JavaScript on mount and resize.
`support.js` (1911 lines) is the Claude Design runtime, not application code.

**Consequences for migration:**

- There is no component structure to preserve; the conversion is a rewrite
  against a visual specification, not a refactor.
- All responsive behaviour had to be **read out of JavaScript** (`applyResponsive`,
  `applyWalnutBase`, `applyImportedBase`, `applyVariants`) and re-expressed
  declaratively. Base HTML inline styles are frequently _overwritten_ on mount,
  so the JS is authoritative wherever the two disagree.
- The prototype ships five design variants (`girisDuzeni`, `portfoyDuzeni`,
  `cevizDuzeni`, `headerDavranisi`, `formDuzeni`). Only the **defaults**
  (`sol`, `editoryal`, `grid`, `seffaf-ivory`, `iki-kolon`) are the approved
  design; the alternates were exploration and are deliberately **not** built.
- The remote design project was checked against the zip via the design MCP:
  file lists are identical, so the bundle is current. ✅

**Also inspected:** the corporate identity manual (54pp), the logotype PDF, the
approved hero video, and the screenshots in `uploads/` — two of which turned out
to be an _earlier_ iteration of this same design and three of which are a
competitor's site used as reference. See ASSET_AUDIT.md §6.

## 2. Architecture

Next.js App Router, TypeScript strict, Tailwind v4, Motion for React.

```
src/
  app/[locale]/     layout (document shell) · page
  app/              global-not-found.tsx · globals.css · icon.svg ·
                     apple-icon.png · manifest.ts · robots.ts · sitemap.ts
  components/
    layout/         header · mobile-drawer · language-switch · footer
    sections/       one file per approved section, in page order
    ui/             button · text-link · eyebrow · icons
    media/          brand-logo · media-frame · hero-video · pending-media
    motion/         motion-provider · reveal · parallax-media · floating-motif · tokens
    forms/          quote-form · quote-request-context · quote-request-button
    seo/            json-ld
  content/          tr.ts (complete) · en.ts (unpopulated) · index.ts
  data/             products.ts — ids, image paths, crops, card geometry
  hooks/            use-scroll-threshold · use-body-scroll-lock
  lib/              i18n · fonts · site · cn · schema · quote-submission
  types/            content.ts — the Dictionary contract
```

Deployment-side configuration (not built by Next, copied verbatim into `out/`):

```
  public/.htaccess          / → /tr · extensionless URLs · security headers · AVIF negotiation
  public/teklif-gonder.php  quotation endpoint
  scripts/optimize-images   build-time AVIF/WebP/JPEG variants
  image-loader.ts           points next/image at those variants
```

`not-found` is deliberately absent from `app/[locale]/`: the only layout
carrying `<html>` sits under that dynamic segment, so a route-level
`not-found.tsx` there has nothing static to compose against and never renders
for an unmatched URL. `app/global-not-found.tsx` is what actually serves every
404 — see that file's own comment for why.

**Server by default.** Every section is a Server Component. The client islands
are only: the header (one boolean of scroll state + drawer), the hero video,
`Reveal` / `ParallaxMedia`, and the quotation form. Providers take `children` as
a prop so the tree below them stays server-rendered. ✅

**Content is separated from layout.** Components receive typed content objects;
`src/data/products.ts` holds locale-independent structure (image paths, crops,
stagger delays) keyed by id, and `src/content/<locale>.ts` holds every string
keyed by the same ids. No duplicated component tree per language. ✅

## 3. Component map

| Design section     | Component                                     | Kind            |
| ------------------ | --------------------------------------------- | --------------- |
| Header + drawer    | `layout/header`, `layout/mobile-drawer`       | client          |
| Hero               | `sections/hero-section` + `media/hero-video`  | server + client |
| Giriş Sözü         | `sections/statement-section`                  | server          |
| Deneyim Şeridi     | `sections/experience-strip`                   | server          |
| Hakkımızda         | `sections/corporate-intro`                    | server          |
| Ürünlerimiz        | `sections/range-section`                      | server          |
| Ceviz Ürün Ailesi  | `sections/walnut-section`                     | server          |
| Ticaret Hikâyesi   | `sections/trade-story-section`                | server          |
| Teklif ve İletişim | `sections/quote-section` + `forms/quote-form` | server + client |
| Footer             | `layout/footer`                               | server          |

There is no dedicated "Fındık — Amiral Ürün" section and no separate "Seçkin
İthal Ürünler" section: both collapsed into the single `range-section`
(`id="urunlerimiz"`) during the build. Splitting them by "flagship vs.
imported" put hazelnut and pistachio — both Turkish — under an "imported"
heading, which was simply wrong; `range-section` presents every
single-variety product (macadamia, pecan, pumpkin seed, sunflower, hazelnut,
pistachio) as one group instead. The portfolio mosaic that once duplicated
this list was removed entirely for the same reason — it read as clutter
against a single, ordered range grid.

`PortfolioCard` is the only shared card abstraction — six instances at three
scales. The walnut and range cards are used once each per section and are
kept inline rather than abstracted.

## 4. Routes

| Route                                      | Rendering                          |
| ------------------------------------------ | ---------------------------------- |
| `/tr`                                      | Static (SSG)                       |
| `/`                                        | Redirect to `/tr` via `.htaccess`  |
| `/en`                                      | 404 until English copy is approved |
| `/robots.txt`, `/sitemap.xml`, `/icon.svg` | Static                             |

## 5. Media strategy

- **Video:** the approved MP4 byte-for-byte. Element loads its own source (the
  prototype's blob workaround existed only for its sandbox). `preload="none"`,
  `load()` after hydration, poster painted underneath as a priority
  `next/image`, video cross-fades in on `canplay`. Honours reduced motion and
  Data Saver. Decorative and out of the tab order.
- **Images:** `next/image` with `fill` inside sized frames, so the design's
  crops and aspect ratios are preserved and nothing shifts. Only the hero poster
  is `priority`; everything else is lazy.
- **Logos:** `next/image` with `unoptimized`, so the SVGs are served untouched.
  Height derived from the artwork ratio; distortion is impossible.

## 6. Responsive strategy

See RESPONSIVE_NOTES.md. Mobile-first, breakpoints transcribed from the
prototype's own JS thresholds.

## 7. Animation strategy

See DESIGN_SYSTEM.md § Motion. Motion for React for scroll-driven work only;
CSS for everything else; `opacity`/`transform` only.

## 8. Test strategy

Playwright against the **production build**, six projects — four Chromium
(three desktop widths plus a real Pixel 7 touch device) and two **WebKit**
(iPhone 14 and desktop Safari) — plus a width-ladder spec that drives ten
widths itself. Covers: console/network cleanliness, section order, locale
redirect and case-canonicalisation, the rendered 404 document, desktop and
mobile navigation, drawer focus and scroll lock, form validation and success,
product→form prefill, no-overflow, hero video playback _and_ its fallback,
reduced motion, logo integrity, and that form values never reach the console.

Note for anyone running the suite: `pnpm build` first. The tests run against
`out/` served by `scripts/serve-static.mjs`, which reproduces the `.htaccess`
rules the host applies — the `/` redirect, extensionless URLs, image format
negotiation and the security headers — so the suite exercises production
behaviour rather than a bare file server. It deliberately does NOT send
`upgrade-insecure-requests` or HSTS: both are correct on the deployed HTTPS
site and both are in `.htaccess`, but WebKit honours the upgrade against a
plain-HTTP test server and drops the connection.

The one thing the suite cannot reach is `public/teklif-gonder.php` — there is
no PHP interpreter behind a static file server. Those tests skip loudly rather
than pass vacuously; point them at a host that runs PHP to execute them:

    QUOTE_ENDPOINT_ORIGIN=https://raymarnuts.com pnpm test quote-api

## 9. Known uncertainties

1. **Cormorant Garamond is not in the brand manual** (DIN-only). Preserved from
   the approved design; needs client ratification. — DESIGN_SYSTEM.md
2. **Telephone / e-mail / domain.** Real values exist in the manual but under
   MAREX and `marasintl.com`. Left as the design's placeholders. — ASSET_AUDIT.md
3. **No production domain.** `NEXT_PUBLIC_SITE_URL` must be set before launch.
4. **Submission delivery is unconfigured.** The endpoint is built
   (`public/teklif-gonder.php`); it needs `QUOTE_TO_EMAIL` (or
   `QUOTE_WEBHOOK_URL`) set at the top of that file. Until then it returns 503
   and the form shows its error state — never a false success.
5. **All product photography is stock**, labelled "temsili görsel".
6. **The slogan** is rendered without quotation marks, as in the approved design;
   the manual states it should always carry them.
7. **Logo clear space** in the scrolled/mobile header is under the manual's 3X.
   — QA_REPORT.md

## 10. Work checklist

- [x] Inspect bundle, manual, video, screenshots; verify remote project matches
- [x] Asset audit; preserve source under `design-source/`
- [x] Scaffold Next.js + TS strict + Tailwind v4 + Motion + ESLint/Prettier
- [x] Extract design tokens into one `@theme` block
- [x] Typed content + data layer, Turkish complete, English scaffolded
- [x] Build all twelve sections in approved order
- [x] Header, accessible drawer, footer
- [x] Hero video with poster, reduced-motion and no-JS fallbacks
- [x] Quotation form with validation, states, honeypot, mock boundary
- [x] Reveal + parallax motion system with fallbacks
- [x] SEO metadata, sitemap, robots, favicon, OG image
- [x] Playwright suite (174 tests across 6 projects, Chromium + WebKit)
- [x] Visual QA against the design at 390 / 768 / 1280 / 1440
- [x] Cross-engine pass on WebKit (Safari's engine); throttled-4G measurement
- [x] lint · typecheck · test · production build all pass
- [ ] Client: confirm contact details, domain, font decision
- [ ] Client: supply final product photography
- [ ] Client: supply English copy
- [x] Quotation endpoint — `public/teklif-gonder.php`, with server-side
      validation, honeypot accept-and-drop, per-IP rate limiting and delivery
      by e-mail or webhook. Refuses with 503 when unconfigured rather than
      reporting a false success. **Not executed locally** — no PHP runtime was
      available on the build machine; verify it on the host after upload
- [ ] Client: choose and configure a delivery target (see `.env.example`) — the
      one remaining launch blocker
- [x] Legal pages — KVKK aydınlatma metni, gizlilik politikası, çerez politikası
      at `src/app/[locale]/<slug>/`, slugs in `src/lib/legal.ts`, drafted text in
      `src/content/tr.ts` under `legal`. Linked from the footer and from the
      form's consent line; in the sitemap; covered by `tests/e2e/legal.spec.ts`
      and scanned by axe. **Drafted, not reviewed by counsel** — see the note
      above `legal` in `tr.ts` for what the text does and does not claim
