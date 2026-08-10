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
  app/[locale]/     layout (document shell) · page · not-found
  app/              globals.css · icon.svg · robots.ts · sitemap.ts
  components/
    layout/         header · mobile-drawer · language-switch · footer
    sections/       one file per approved section, in page order
    ui/             button · text-link · eyebrow · icons
    media/          brand-logo · media-frame · hero-video
    motion/         motion-provider · reveal · parallax-media · tokens
    forms/          quote-form · quote-request-context · quote-request-button
  content/          tr.ts (complete) · en.ts (unpopulated) · index.ts
  data/             products.ts — ids, image paths, crops, card geometry
  hooks/            use-scroll-threshold · use-body-scroll-lock
  lib/              i18n · fonts · site · cn · quote-submission
  types/            content.ts — the Dictionary contract
  proxy.ts          / → /tr
```

**Server by default.** Every section is a Server Component. The client islands
are only: the header (one boolean of scroll state + drawer), the hero video,
`Reveal` / `ParallaxMedia`, and the quotation form. Providers take `children` as
a prop so the tree below them stays server-rendered. ✅

**Content is separated from layout.** Components receive typed content objects;
`src/data/products.ts` holds locale-independent structure (image paths, crops,
stagger delays) keyed by id, and `src/content/<locale>.ts` holds every string
keyed by the same ids. No duplicated component tree per language. ✅

## 3. Component map

| Design section       | Component                                     | Kind            |
| -------------------- | --------------------------------------------- | --------------- |
| Header + drawer      | `layout/header`, `layout/mobile-drawer`       | client          |
| Hero                 | `sections/hero-section` + `media/hero-video`  | server + client |
| Giriş Sözü           | `sections/statement-section`                  | server          |
| Deneyim Şeridi       | `sections/experience-strip`                   | server          |
| Kurumsal Giriş       | `sections/corporate-intro`                    | server          |
| Fındık — Amiral Ürün | `sections/flagship-section`                   | server          |
| Ürün Portföyü        | `sections/portfolio-section`                  | server          |
| Ceviz Ürün Ailesi    | `sections/walnut-section`                     | server          |
| Seçkin İthal Ürünler | `sections/imported-section`                   | server          |
| 30 Yıl Hikâyesi      | `sections/trade-story-section`                | server          |
| Teklif ve İletişim   | `sections/quote-section` + `forms/quote-form` | server + client |
| Footer               | `layout/footer`                               | server          |

`PortfolioCard` is the only shared card abstraction — six instances at three
scales. The walnut and imported cards are used once each per section and are
kept inline rather than abstracted.

## 4. Routes

| Route                                      | Rendering                          |
| ------------------------------------------ | ---------------------------------- |
| `/tr`                                      | Static (SSG)                       |
| `/`                                        | Redirect to `/tr` via `proxy.ts`   |
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

Playwright against the **production build**, four viewport projects, plus a
width-ladder spec that drives ten widths itself. Covers: console/network
cleanliness, section order, locale redirect, desktop and mobile navigation,
drawer focus trap and scroll lock, form validation and success, product→form
prefill, no-overflow, hero fallback, reduced motion, logo integrity, and that
form values never reach the console.

## 9. Known uncertainties

1. **Cormorant Garamond is not in the brand manual** (DIN-only). Preserved from
   the approved design; needs client ratification. — DESIGN_SYSTEM.md
2. **Telephone / e-mail / domain.** Real values exist in the manual but under
   MAREX and `marasintl.com`. Left as the design's placeholders. — ASSET_AUDIT.md
3. **No production domain.** `NEXT_PUBLIC_SITE_URL` must be set before launch.
4. **No submission backend.** The form uses a documented mock.
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
- [x] Playwright suite (94 tests across 4 viewports)
- [x] Visual QA against the design at 390 / 768 / 1280 / 1440
- [x] lint · typecheck · test · production build all pass
- [ ] Client: confirm contact details, domain, font decision
- [ ] Client: supply final product photography
- [ ] Client: supply English copy
