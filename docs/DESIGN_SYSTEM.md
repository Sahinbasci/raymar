# Design System

Single source of truth: **`src/app/globals.css`**. Every token below is declared
there once, in the Tailwind v4 `@theme` block, and consumed as a utility class.
No brand hex value is hardcoded in any component.

## Colour

| Token                        | Value            | Role                                                           |
| ---------------------------- | ---------------- | -------------------------------------------------------------- |
| `--color-raymar-green`       | `#004C38`        | Corporate green. Dark section beds, headings on light surfaces |
| `--color-raymar-green-deep`  | `#0B2A20`        | Deepest green. Card beds, type on gold                         |
| `--color-raymar-green-hover` | `#0B6047`        | Green button hover                                             |
| `--color-raymar-gold`        | `#F0B038`        | Corporate gold. Accents, rules, primary buttons                |
| `--color-raymar-gold-hover`  | `#FFC65A`        | Gold button hover                                              |
| `--color-raymar-gold-dark`   | `#8A5F0E`        | Gold-family text on light surfaces                             |
| `--color-raymar-ivory`       | `#F8F5EE`        | Page background                                                |
| `--color-raymar-cream`       | `#EFE6D5`        | Alternating section background                                 |
| `--color-raymar-white`       | `#FCFCFC`        | Broken white. Cards, type on green                             |
| `--color-raymar-ink`         | `#16352C`        | Deep green body text                                           |
| `--color-raymar-tan`         | `#E6D7BD`        | Natural product brown. Image beds                              |
| `--color-raymar-overlay`     | `#002A1F`        | Base of every scrim; used as alpha steps                       |
| `--color-raymar-alert-*`     | bed / rule / ink | Form validation                                                |

### Relationship to the printed brand manual

The manual specifies **only** `PANTONE 129` (gold) and `PANTONE 567` (green), in
CMYK, with **no RGB or HEX equivalents given**. The approved design's screen
values are faithful conversions:

- Gold `#F0B038` — the manual's Pantone 129 preview swatch renders `#F0B139`.
- Green `#004C38` — the manual's headers render `#004A36`; the logotype PDF
  ground renders `#024F3B`.

The ivory, cream, broken-white and tan tones have **no counterpart in the
manual** — they are screen-only surface colours introduced by the approved
design. They are recorded here so the client can ratify them.

### Accessibility

Every text/background pair in use was measured. All pass WCAG AA; most pass AAA.

| Pair                         | Ratio | Level |
| ---------------------------- | ----- | ----- |
| Broken white on green        | 9.79  | AAA   |
| Green on ivory               | 9.22  | AAA   |
| Ink on ivory                 | 12.21 | AAA   |
| Deep green on gold (button)  | 8.03  | AAA   |
| Gold on green (eyebrow)      | 5.25  | AA    |
| Gold-dark on ivory (eyebrow) | 5.18  | AA    |
| Gold-dark on cream           | 4.55  | AA    |
| Ink/74 on ivory (footnote)   | 5.59  | AA    |
| Alert ink on alert bed       | 7.52  | AAA   |

`--color-raymar-gold-dark` exists precisely for this reason: corporate gold on
ivory is only 1.9:1, so gold-family _text_ on light surfaces uses the darker
tone while gold _rules and marks_ keep the corporate value.

## Typography

Two families, both self-hosted through `next/font` (`src/lib/fonts.ts`).

| Role      | Family             | Weights                   | Variable           |
| --------- | ------------------ | ------------------------- | ------------------ |
| Display   | Cormorant Garamond | 300 / 400, roman + italic | `--font-cormorant` |
| Body / UI | Jost               | 300 / 400 / 500           | `--font-jost`      |

Weight 500 was declared for Cormorant initially and removed once an audit showed
nothing used it. No component sets `font-semibold` or heavier on either family,
so neither synthetic bold nor synthetic italic can occur.

### ⚠ Open item: DIN vs Cormorant Garamond

This is the one place where the brand manual and the approved web design
disagree, and it needs a client decision.

- The manual states: _"Marka kimliği yazı karakteri DIN ailesidir. Tüm yayın
  amaçlı çalışmalar ve yazışmalarda DIN ailesi fontları kullanılmalıdır."_ It
  names `DIN(T) Light`, `DIN(T) Medium`, `DIN(T) Black`, and specifies **no
  serif or display face at all**.
- The approved design uses **Cormorant Garamond** for every heading, product
  name and pull quote. It was introduced deliberately, in the revision where the
  client asked for more elegance and refinement, and it carries the site's
  entire editorial character.

**What was implemented and why:** the approved design was preserved. Removing
Cormorant would be a redesign, which is out of scope. The conflict is recorded
here for ratification.

**Body text:** no licensed DIN files were supplied, and unlicensed copies must
not be downloaded. `--font-sans` is therefore declared as:

```
'DIN Next LT Pro', 'DIN Pro', var(--font-jost), system-ui, sans-serif
```

Jost is the fallback the approved design itself loads, and is metrically close
to DIN. **To adopt licensed DIN later:** drop the `.woff2` files into
`src/app/fonts/`, swap `src/lib/fonts.ts` to `next/font/local`, and the token
already prefers them — no component changes.

**The logo never depends on the website font.** It is always the supplied SVG.

### Scale

Headings are fluid via `clamp()`, with the design's desktop and mobile values as
the endpoints:

| Element              | Size                                          |
| -------------------- | --------------------------------------------- |
| `h1` (statement)     | `clamp(44px, 5.6vw, 88px)` / line-height 1.01 |
| `h2` corporate intro | `clamp(34px, 4.2vw, 68px)`                    |
| `h2` flagship        | `clamp(34px, 4.3vw, 70px)`                    |
| `h2` section headers | `clamp(32px, 3.9vw, 62px)`                    |
| `h2` trade story     | `clamp(32px, 4.1vw, 66px)`                    |
| `h2` quote           | `clamp(30px, 3.5vw, 54px)`                    |
| Statistic "30"       | `clamp(88px, 11vw, 136px)`                    |
| Portfolio lead title | `clamp(38px, 5vw, 54px)`                      |
| Body copy            | 15–17px, weight 300, line-height 1.7–1.78     |
| Eyebrow / label      | 12px, 0.3em tracking, uppercase               |
| Button / link label  | 12px, 0.2em tracking, uppercase               |

Body text sets `letter-spacing: .005em` and `font-variant-numeric: lining-nums`,
matching the design.

## Ornament

Two additions were made after the initial conversion, adapting ideas from a
competitor reference (ronlygida.com) into Raymar's own language. None of them
introduces a commercial claim.

- **Floating brand motif** (`components/motion/floating-motif.tsx`) — the
  official gold emblem drifting at watermark opacity (0.06–0.08) in section
  negative space. The reference site scatters cut-out product photography;
  no such assets exist for Raymar and inventing them was not an option, so the
  brand emblem is used instead — which is also more distinctly Raymar. Desktop
  only, decorative, and restricted to sections that already clip their overflow.
- **Walnut category dividers** — serif group name with a gold hairline. Renders
  only when more than one group exists; see RESPONSIVE_NOTES.md.

Explicitly **not** adapted from the reference: its beige/gold palette, its
geometric sans, its rounded floating header card, and every one of its
credential claims (40+ years, BRCGS/IFS certification, global export network,
named production facilities). None of those are verifiable for Raymar.

## Geometry

- **Radius: 0 everywhere.** The refinement pass removed the earlier 2px radii.
  There are no pills and no rounded cards. The two exceptions are genuinely
  circular: the corporate portrait and the success tick.
- **Shell:** max-width 1320px; horizontal padding 20 / 32 / 40px.
- **Rules:** 1px hairlines. Gold at 24–55% on dark; green at 8–16% on light.
- **Buttons:** 21px × 42px padding, square, uppercase 12px at 0.2em.

## Motion

Tokens in `src/components/motion/tokens.ts`.

| Token               | Value                                      |
| ------------------- | ------------------------------------------ |
| Easing              | `cubic-bezier(0.2, 0.7, 0.2, 1)`           |
| Reveal duration     | 0.95 s                                     |
| Reveal distance     | 22px translateY                            |
| Stagger ladder      | 0 / 70–90 / 110–180 / 220–270 / 320–360 ms |
| Card image hover    | scale 1.04 over 1.1 s                      |
| Title hover         | letter-spacing → 0.012em over 0.5 s        |
| Arrow hover         | translateX 7px over 0.5 s                  |
| Header state change | 0.45 s                                     |
| Scroll cue          | `rmrBob`, 2.8 s, infinite                  |

Division of labour:

- **Motion for React** — scroll reveals (`Reveal`) and scroll-linked parallax
  (`ParallaxMedia`). Loaded through `LazyMotion` with `domAnimation` and
  `strict`, so only the lightweight `m.*` components are usable and the full
  bundle never ships.
- **CSS transitions** — every hover, colour, and header state change. No JS.

Only `opacity` and `transform` are animated. Parallax is driven by a Motion
value, so nothing re-renders during scroll.

## Reduced motion

`prefers-reduced-motion: reduce` shortens animations and disables smooth
scrolling globally, and `Reveal` resolves instantly.

Crucially, `Reveal` **does not** branch to a different element under reduced
motion. The server always renders the hidden `initial` state, and React
hydration does not clear inline styles that the client render omits — branching
would leave `opacity: 0` stuck on the node and hide the content permanently.
Reduced motion instead sets the animation duration to zero. There is also a
`<noscript>` rule that restores `[data-reveal]` when JavaScript never runs.
