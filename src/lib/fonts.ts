import { Cormorant_Garamond, Jost } from 'next/font/google'

/**
 * Type system.
 *
 * The Raymar brand manual ('23, p.13) mandates the DIN family — "DIN(T) Light /
 * Medium / Black". No licensed DIN files were supplied with this project and
 * unlicensed copies must not be downloaded, so the body face falls back to
 * Jost, which is the fallback the approved design itself loads and is
 * metrically close to DIN. `--font-sans` in globals.css still lists the DIN
 * families first: dropping licensed `.woff2` files into `src/app/fonts/` and
 * swapping this module for `next/font/local` is the only change needed later.
 *
 * Cormorant Garamond is the display face used throughout the approved design.
 * It is NOT in the brand manual — see docs/DESIGN_SYSTEM.md, which records this
 * as an open item for the client, since the approved web design depends on it.
 *
 * Both are loaded via `next/font`, so they are self-hosted, preloaded and
 * subset — no render-blocking request to Google and no layout shift.
 */

export const jost = Jost({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-jost',
  // Turkish copy uses ı, İ, ş, ğ, ç, ö, ü — latin-ext covers these.
  fallback: ['system-ui', 'sans-serif'],
})

/*
 * Only 300 and 400 are used, in roman and — for the footer slogan alone —
 * italic. Nothing in the site sets a heavier weight, so no synthetic bold is
 * possible.
 *
 * `preload: false`. Every preloaded font competes with the hero poster, which
 * is the LCP element: measured on a throttled phone profile the six preloaded
 * faces totalled 189 KB and finished between 1.0 and 1.4 s, pushing LCP out by
 * roughly a second. The display face is not needed to paint the first viewport
 * — the hero carries no serif text — so it loads on demand and `display: swap`
 * covers the gap with Georgia.
 *
 * No `fallback` array, deliberately. Passing one puts `next/font` into its
 * manual-fallback mode, which skips the metric-adjusted `@font-face` it would
 * otherwise generate — the build emitted no `ascent-override` or `size-adjust`
 * at all, so every heading reflowed when the real face arrived. That matters
 * more here than anywhere else on the site because this is the face that sets
 * every heading, and it is the one face that is not preloaded. The Georgia /
 * Times New Roman stack is not lost: `--font-display` in globals.css already
 * spells it out after this variable.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400'],
  style: ['normal'],
  display: 'swap',
  preload: false,
  variable: '--font-cormorant',
})

/*
 * The italic is a separate face because it is used by exactly one line, the
 * footer slogan, far below the fold. Bundled into the roman declaration it
 * added ~72 KB to every visit — including a `latin-ext` italic that no glyph on
 * the site can ever match.
 */
export const cormorantItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
  display: 'swap',
  preload: false,
  variable: '--font-cormorant-italic',
})
