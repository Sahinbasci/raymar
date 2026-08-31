/**
 * Custom `next/image` loader for the static export.
 *
 * A static export has no image optimizer route, so the default loader's
 * `/_next/image?url=…` URLs would 404 on the host — measured on this site:
 * 272 of them in `tr.html` alone, i.e. every photograph broken. Pointing the
 * loader at files generated ahead of time by `scripts/optimize-images.mjs`
 * keeps `next/image` itself — and therefore every component, `sizes` value,
 * `fill` layout and lazy-loading behaviour — completely unchanged.
 *
 * The URL always names the `.jpg`. `public/.htaccess` rewrites it to the
 * `.avif` or `.webp` sibling when the browser advertises support, so modern
 * clients get the small file and everything else gets a genuine JPEG. Naming
 * the JPEG rather than the AVIF is deliberate: the fallback has to be the
 * format that cannot fail, because a rewrite that does not fire (an older
 * browser, or a host without `mod_rewrite`) must still serve a real image.
 *
 * SVGs never reach here — every `<Image>` pointing at one already passes
 * `unoptimized`, which bypasses the loader entirely and keeps the official
 * brand artwork byte-for-byte as supplied.
 */

interface LoaderArgs {
  src: string
  width: number
  quality?: number
}

/**
 * Widths that `scripts/optimize-images.mjs` actually writes. Must stay in sync
 * with `deviceSizes` + `imageSizes` in `next.config.ts`; a width Next requests
 * that is not on disk would be a 404, so anything unexpected is snapped up to
 * the next rung that exists rather than guessed.
 */
const WIDTHS = [256, 384, 480, 640, 960, 1280, 1920, 2880] as const

export default function staticImageLoader({ src, width }: LoaderArgs): string {
  // Anything not produced by the optimizer (an SVG that somehow reaches here,
  // or an absolute URL) is passed through untouched rather than rewritten into
  // a path that does not exist.
  if (!/^\/images\/.+\.(jpe?g|png)$/i.test(src)) return src

  const stem = src.replace(/^\/images\//, '').replace(/\.(jpe?g|png)$/i, '')
  const rung = WIDTHS.find((candidate) => candidate >= width) ?? WIDTHS[WIDTHS.length - 1]

  return `/_img/${stem}-${rung}.jpg`
}
