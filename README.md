# Raymar Nuts — corporate website

Production implementation of the approved Claude Design homepage for Raymar
Nuts (Marex Dış Tic. Ltd. Şti.), an international B2B nuts trading company.
Published at **https://raymarnuts.com** as a static export on Natro shared
hosting (LiteSpeed), in two locales: `/tr` and `/en`.

## Stack

Next.js 16 (App Router, `output: 'export'`) · React 19 · TypeScript (strict) ·
Tailwind CSS v4 · Motion for React · Playwright · pnpm

Nothing runs on the server. Every page is a static HTML file; the behaviour a
Node server used to provide (security headers, redirects, extensionless URLs,
image format negotiation) lives in `public/.htaccess`, and the quotation form
posts to a single PHP file.

## Getting started

```bash
pnpm install
pnpm test:install            # browsers for Playwright, once per machine
pnpm dev                     # http://localhost:3000 → redirects to /tr
```

## Commands

| Command             | Purpose                                                    |
| ------------------- | ---------------------------------------------------------- |
| `pnpm dev`          | Development server                                         |
| `pnpm build`        | Production build → `out/` (runs the image optimizer first) |
| `pnpm lint`         | ESLint                                                     |
| `pnpm typecheck`    | `tsc --noEmit`                                             |
| `pnpm format`       | Prettier                                                   |
| `pnpm test`         | Playwright — **build first**, the suite serves `out/`      |
| `pnpm test:install` | Chromium, WebKit and Firefox for Playwright                |

The production build needs the deployment origin, or canonical tags and the
sitemap point at the wrong host:

```bash
rm -rf .next && NEXT_PUBLIC_SITE_URL=https://raymarnuts.com pnpm build
node scripts/serve-static.mjs out 3210   # what the test suite talks to
pnpm test
```

## Where things live

| I want to change…                           | Edit                                                     |
| ------------------------------------------- | -------------------------------------------------------- |
| Any visible Turkish text on the homepage    | `src/content/tr.ts`                                      |
| The same in English                         | `src/content/en.ts`                                      |
| A product page or a guide (both locales)    | `src/content/library/products.*.ts`, `guides.*.ts`       |
| Walnut size pages                           | `src/content/library/walnut-sizes.*.ts`                  |
| The sources a library page cites            | `src/content/library/sources.ts` (`cite(locale, …keys)`) |
| Product list, images, crops, card geometry  | `src/data/products.ts`                                   |
| Colours, type, spacing, motion tokens       | `src/app/globals.css` (`@theme`)                         |
| A section's layout                          | `src/components/sections/<section>.tsx`                  |
| Header / drawer / footer                    | `src/components/layout/`                                 |
| Form fields or validation                   | `src/components/forms/quote-form.tsx`                    |
| Where the form submits                      | `public/teklif-gonder.php`                               |
| Page titles, descriptions, canonical, OG    | `src/lib/metadata.ts` + `src/app/[locale]/layout.tsx`    |
| Structured data (JSON-LD)                   | `src/lib/schema.ts`                                      |
| Server behaviour: headers, redirects, cache | `public/.htaccess`                                       |

Adding a library page means adding it to **both** locales: the build asserts
that every id exists in `tr` and `en`, that slugs are unique, that related
links resolve, and that every page cites at least three external https sources
(`src/content/library/index.ts`).

## Deploying

The export is a folder of files; deployment is an upload.

1. `rm -rf .next && NEXT_PUBLIC_SITE_URL=https://raymarnuts.com pnpm build`
2. `pnpm test` — the suite must be green before anything is uploaded.
3. Zip `out/`, excluding the two folders that rarely change and are large:
   ```bash
   cd out && zip -r ../raymar-deploy.zip . -x "_img/*" -x "video/*"
   ```
   Include `_img/` and `video/` when an image or the hero clip actually
   changed.
4. cPanel → File Manager → `public_html` → upload the zip → **Extract** →
   overwrite. `.htaccess` is a hidden file: make sure "Show hidden files" is on
   before checking the result.
5. Verify on the live host: `/` → `/tr` (307), `/index.html` → `/tr` (301),
   `www` → apex, `http` → `https`, a product page, a guide, the 404 page, and
   one form submission.

`public/.htaccess` documents every rule and why it exists. The parts most
likely to matter after a deploy are `DirectorySlash Off` (without it `/tr`
answers 403) and the HTML cache header (`max-age=0, must-revalidate`).

## The quotation form

`public/teklif-gonder.php` accepts the form, validates it server-side and
delivers through Brevo's transactional API over HTTPS — the host blocks
`mail()`, `sendmail` and outbound SMTP, so HTTPS is the only transport.

- The API key is read from `~/raymar-gizli.php`, **above** the document root:
  `<?php return ['brevo_api_key' => 'xkeysib-…'];`
- Without that file the endpoint answers **503** and writes the enquiry to
  `~/teklif-yedek.jsonl`. It never tells a visitor the message was sent when it
  was not.
- After any host migration, re-check both files and send one test enquiry.

## Documentation

- [`docs/SEO_GEO_STRATEGY.md`](docs/SEO_GEO_STRATEGY.md) — current search and
  AI-visibility strategy, Search Console and Bing setup, backlink plan (TR)
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md) — what is tested, what was fixed,
  what is still open
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) — architecture,
  component map, migration decisions
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — tokens, typography,
  motion, contrast
- [`docs/RESPONSIVE_NOTES.md`](docs/RESPONSIVE_NOTES.md) — breakpoints and the
  per-section layout ladder
- [`docs/ASSET_AUDIT.md`](docs/ASSET_AUDIT.md) — every asset, its integrity and
  its licence
- [`docs/CONTENT_INTAKE.md`](docs/CONTENT_INTAKE.md) — the content intake form
  the client answered (historical record)
- [`docs/CONTENT_BRIEF.md`](docs/CONTENT_BRIEF.md) — every copy line, numbered
  (TR)
- [`docs/HERO_VIDEO_SPEC.md`](docs/HERO_VIDEO_SPEC.md) and
  [`docs/HERO_VIDEO_PROMPT.md`](docs/HERO_VIDEO_PROMPT.md) — the mobile hero cut
- [`docs/SEO_GEO_PLAN.md`](docs/SEO_GEO_PLAN.md) — superseded by
  `SEO_GEO_STRATEGY.md`, kept for the record

## Important

- `design-source/` is the untouched Claude Design export. It is the visual
  source of truth — do not delete it, and consult it before changing layout.
- The files in `public/brand/` and `public/video/` are official assets and are
  byte-identical to those supplied. Do not regenerate or recolour them.
- Library pages state nothing that a listed source does not support, and no
  company-specific figure (moisture, calibre, origin, minimum order,
  certification, price) appears anywhere. Keep it that way: those belong in a
  quotation, not on a public page.
- Pages that quote legislation are dated and must be re-checked every six
  months; `docs/SEO_GEO_STRATEGY.md` §4 lists which instruments to check.
