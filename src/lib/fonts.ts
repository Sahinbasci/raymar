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

// Only 300 and 400 are used, in roman and (for the footer tagline) italic.
// Nothing in the site sets a heavier weight, so no synthetic bold is possible.
export const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})
