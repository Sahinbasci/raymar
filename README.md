# Raymar Nuts — corporate website

Production implementation of the approved Claude Design homepage for Raymar
Nuts, an international B2B nuts trading company.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Motion for React · Playwright · pnpm

## Getting started

```bash
pnpm install
pnpm dev                # http://localhost:3000 → redirects to /tr
```

Set the deployment origin before building for production:

```bash
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL
```

## Commands

| Command             | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `pnpm dev`          | Development server                                             |
| `pnpm build`        | Production build                                               |
| `pnpm start`        | Serve the production build                                     |
| `pnpm lint`         | ESLint                                                         |
| `pnpm typecheck`    | `tsc --noEmit`                                                 |
| `pnpm test`         | Playwright (builds are not automatic — run `pnpm build` first) |
| `pnpm test:install` | One-time Chromium download                                     |
| `pnpm format`       | Prettier                                                       |

## Where things live

| I want to change…                          | Edit                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| Any visible Turkish text                   | `src/content/tr.ts`                                          |
| Colours, type, spacing, motion tokens      | `src/app/globals.css` (`@theme`)                             |
| Product list, images, crops, card geometry | `src/data/products.ts`                                       |
| A section's layout                         | `src/components/sections/<section>.tsx`                      |
| Header / drawer / footer                   | `src/components/layout/`                                     |
| Form fields or validation                  | `src/components/forms/quote-form.tsx`                        |
| Where the form submits                     | `src/lib/quote-submission.ts`                                |
| Animation feel                             | `src/components/motion/tokens.ts`                            |
| Publishing English                         | `src/content/en.ts` + `completeLocales` in `src/lib/i18n.ts` |
| SEO metadata                               | `src/app/[locale]/layout.tsx`                                |

## Documentation

- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — architecture, component map, migration decisions
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — tokens, typography, motion, contrast
- [`docs/RESPONSIVE_NOTES.md`](docs/RESPONSIVE_NOTES.md) — breakpoints and per-section layout ladder
- [`docs/ASSET_AUDIT.md`](docs/ASSET_AUDIT.md) — every asset, its integrity, and what is still a placeholder
- [`docs/CONTENT_INTAKE.md`](docs/CONTENT_INTAKE.md) — içerik doldurma formu (placeholder / mock envanteri)
- [`docs/HERO_VIDEO_SPEC.md`](docs/HERO_VIDEO_SPEC.md) — mobil hero videosu teknik şartnamesi
- [`docs/HERO_VIDEO_PROMPT.md`](docs/HERO_VIDEO_PROMPT.md) — mobil hero videosu AI üretim prompt'u
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md) — what was tested, what was fixed, what is still open

## Important

- `design-source/` is the untouched Claude Design export. It is the visual
  source of truth — do not delete it, and consult it before changing layout.
- The files in `public/brand/` and `public/video/` are official assets and are
  byte-identical to those supplied. Do not regenerate or recolour them.
- Bracketed strings such as `[Telefon bilgisi eklenecek]` are **deliberate
  placeholders** carried over from the approved design. See `docs/ASSET_AUDIT.md`
  before filling them in — the values in the brand manual belong to a different
  legal entity and domain.
- The quotation form does **not** deliver messages yet.
