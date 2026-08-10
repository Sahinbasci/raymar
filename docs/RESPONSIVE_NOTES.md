# Responsive Notes

## Breakpoints

The design prototype switched layout in JavaScript at exact pixel widths. Those
became the Tailwind breakpoints verbatim, so nothing was re-interpreted:

| Token    | Width    | Prototype name                  |
| -------- | -------- | ------------------------------- |
| _(base)_ | < 720px  | `mobil`                         |
| `md`     | ≥ 720px  | `tablet`                        |
| `lg`     | ≥ 1080px | `masaustu`                      |
| `xl`     | ≥ 1240px | walnut grid's own 4-column step |

Tailwind's default `sm` and `2xl` are removed so no third scale can creep in.

## Where the rules live

Ordinary responsive layout is expressed as utility classes on the components.
Two categories cannot be expressed cleanly that way and live in
`@layer components` in `globals.css`:

- rules keyed to **`nth-child` position** — experience-strip hairlines, walnut
  image-well heights, imported-grid stagger;
- rules keyed to **viewport height** — hero frame and scroll cue.

## Layout ladder per section

| Section                   | < 720                  | 720–1079                | ≥ 1080                 |
| ------------------------- | ---------------------- | ----------------------- | ---------------------- |
| Header nav                | burger                 | burger                  | full nav + lang + CTA  |
| Header height             | 72 → 64 scrolled       | 88 → 76                 | 88 → 76                |
| Statement padding         | 80 / 84                | 104 / 110               | 172 / 178              |
| Experience strip          | 1 col                  | 2 cols                  | 4 cols                 |
| Corporate intro           | 1 col                  | 1 col                   | 2 cols                 |
| Flagship                  | 1 col                  | 1 col                   | 2 cols                 |
| Portfolio mosaic          | 1 col                  | **2 cols (1.12fr 1fr)** | 2 cols (1.12fr 1fr)    |
| Portfolio lead min-height | 420px                  | 540px                   | 660px                  |
| Walnut grid               | 1 col                  | 2 cols (lead spans 2)   | 4 cols from 1240px     |
| Walnut image well         | 230px                  | 300px lead / 256px      | 284px, 250px final row |
| Imported grid             | **2 cols, no stagger** | 2 cols, staggered       | 4 cols, staggered      |
| Trade story pillars       | 1 col                  | 2 cols                  | 5 cols                 |
| Quote block               | 1 col                  | 1 col                   | 0.85fr / 1.15fr        |
| Form fields               | 1 col                  | 2 cols                  | 2 cols                 |
| Footer                    | 1 col                  | 2 cols                  | 1.4fr 1fr 1fr 1fr      |

Two entries above are worth calling out because they are easy to get wrong:

- The **portfolio mosaic** splits into two columns at the _tablet_ step, not the
  desktop one. An early implementation deferred it to 1080px; corrected.
- The **imported grid** is two columns even on the smallest phones, and the 38px
  stagger is suppressed there. Both match the design.

## Hero height

```
height: clamp(520px, 86svh, 1120px);              /* < 720px  */
height: clamp(560px, 94svh, 1120px);              /* ≥ 720px  */
height: 100svh;                                   /* window shorter than the floor */
```

The short-window case is a **height media query**, not `min(520px, 100svh)`
inside the clamp. If `svh` resolves to 0 — which happens in some embedded and
virtualised viewports — a `min()` floor collapses the entire hero to zero
height. The media query cannot fail that way: worst case it simply does not
match and the 520/560px floor applies.

The scroll cue is pulled in on short windows (`bottom: 38px`, shorter rule)
so it always clears the fold. Verified at 420 / 560 / 680 / 900px tall.

## Verified widths

Automated in `tests/e2e/responsive.spec.ts` at **320, 360, 390, 430, 768, 1024,
1280, 1440, 1728, 1920**:

- no horizontal overflow (`scrollWidth ≤ clientWidth`) at any width; the test
  names the offending elements on failure rather than just reporting a number;
- the hero stays between 400px and 1120px tall at every width;
- the scroll cue stays above the fold at four window heights;
- every mobile drawer link is at least 44px tall.

## Mobile-specific decisions

- Navigation is a real `<dialog>` opened with `showModal()`, so focus trapping,
  Escape and background inertness come from the browser. Body scroll is
  additionally pinned with `position: fixed` because iOS Safari scrolls the page
  behind a modal dialog; the reading position is restored on close.
- The hero uses `svh`, not `vh`, so the mobile browser chrome does not crop the
  scroll cue.
- The hero video is **desktop-only**. Phones (< 720px) load no video and show
  the poster, saving ~1.7 MB of cellular data; a portrait mobile cut can be
  switched on later (`docs/HERO_VIDEO_SPEC.md`). Reduced motion and Data Saver
  fall back to the poster on every viewport.
- Section top padding scales 76 / 100 / ~170px. The prototype left several
  section headers at a fixed 158–178px even on phones; see QA_REPORT.md.
- Portfolio tile titles are sized by a **container query**, not the viewport.
  These four tiles are narrow at 390px _and_ at 768px (where the mosaic splits
  into two columns), so no viewport rule can serve both; the design's 21px is
  restored as soon as the tile itself is wide enough.

## Tablet

Tablet is treated as its own layout, not a wide phone or a broken desktop: two
column experience strip, two column portfolio mosaic, two column walnut grid
with the lead card spanning both, two column footer, but a single-column
corporate intro and quote block so the measure stays readable.
