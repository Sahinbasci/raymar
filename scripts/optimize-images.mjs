/**
 * Build-time image optimizer for the static export.
 *
 * WHY THIS EXISTS
 *
 * On Vercel, `next/image` optimized every photograph on demand: it resized to
 * the slot the layout actually asked for and re-encoded to AVIF, which took the
 * homepage's imagery from 5.3 MB of source JPEG down to 266 KB on the wire.
 * A static export has no server, so that optimizer is gone — and without a
 * replacement the browser downloads the untouched originals instead. Measured
 * on this site: the homepage went from 5.16 MB to 9.90 MB, with the image
 * portion alone rising from 266 KB to 5,276 KB. That is a real, visible
 * regression on the mobile connections most of this site's buyers are on.
 *
 * This script restores the missing half of the pipeline: it pre-generates, at
 * build time, exactly the variants the runtime optimizer used to produce.
 * `image-loader.ts` then points `next/image` at them, so every component keeps
 * using `<Image>` unchanged and no layout, `sizes` or lazy-loading behaviour
 * moves.
 *
 * WHY THREE FORMATS
 *
 * The loader can only name one URL per width, and it names the `.jpg` — the
 * format every browser in existence can render. `public/.htaccess` then
 * upgrades that request to `.avif` or `.webp` when the browser's own `Accept`
 * header says it can handle one, and leaves it alone when it cannot. So the
 * fallback is not a worse-case edge path: it is a real, correct JPEG that is
 * served whenever the upgrade does not apply, including if `mod_rewrite` is
 * unavailable on the host. No visitor can end up with a broken image.
 *
 * Measured on `walnut-quarter.jpg` (1800px, 726 KB source) at a 960px slot:
 *   JPEG q72  109 KB   ← the floor, and what a non-negotiating browser gets
 *   WebP q72  106 KB
 *   AVIF q55   79 KB
 * Most of the win is the resize, not the codec, which is why the JPEG fallback
 * is not a meaningful downgrade for the browsers that take it.
 *
 * Run by `pnpm build` via the `prebuild` script; output is written into
 * `public/_img/` so `next build` copies it into `out/` like any other asset.
 */

import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

const SOURCE_DIR = 'public/images'
const OUT_DIR = 'public/_img'

/**
 * Must stay in sync with `deviceSizes` + `imageSizes` in `next.config.ts`.
 *
 * The loader is handed one of those widths and returns a filename built from
 * it, so a width missing here is a 404 rather than a smaller image. The ladder
 * is deliberately shorter than Next's default: every extra rung multiplies
 * across 16 photographs and 3 formats, and the layout only has four distinct
 * image slots.
 */
const WIDTHS = [256, 384, 480, 640, 960, 1280, 1920, 2880]

/*
 * Quality settings.
 *
 * JPEG and WebP sit at 72, AVIF at 55 — AVIF's scale is not the same as JPEG's,
 * and 55 there is visually equivalent to roughly 75 in JPEG while encoding
 * appreciably smaller. `mozjpeg` is on because it is a free ~10% over libjpeg
 * at identical visual quality.
 */
const QUALITY = { jpeg: 72, webp: 72, avif: 55 }

/**
 * Never upscale.
 *
 * Several sources are far larger than any slot needs (`pistachio-band-bulk` is
 * 3200px wide), but a few are not. Enlarging a 1280px source to 2880 would cost
 * bytes and add nothing, so sharp is told to cap at the source's own width. The
 * file for that rung is still written, so the loader's URL always resolves.
 */
const RESIZE_OPTIONS = { withoutEnlargement: true }

/** Cache key: re-encoding 16 images × 8 widths × 3 formats on every build is slow. */
async function sourceFingerprint(path) {
  const buffer = await readFile(path)
  return createHash('sha1').update(buffer).digest('hex').slice(0, 12)
}

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`[optimize-images] ${SOURCE_DIR} not found`)
    process.exit(1)
  }

  await mkdir(OUT_DIR, { recursive: true })

  const entries = (await readdir(SOURCE_DIR)).filter((name) =>
    /\.(jpe?g|png)$/i.test(name),
  )

  if (entries.length === 0) {
    console.error(`[optimize-images] no raster sources in ${SOURCE_DIR}`)
    process.exit(1)
  }

  const manifestPath = join(OUT_DIR, 'manifest.json')
  const previous = existsSync(manifestPath)
    ? JSON.parse(await readFile(manifestPath, 'utf8'))
    : {}
  const manifest = {}

  let written = 0
  let skipped = 0

  for (const entry of entries) {
    const sourcePath = join(SOURCE_DIR, entry)
    const stem = basename(entry, extname(entry))
    const fingerprint = await sourceFingerprint(sourcePath)
    manifest[stem] = fingerprint

    // Unchanged source and every variant still on disk: nothing to do.
    if (previous[stem] === fingerprint) {
      const complete = WIDTHS.every((width) =>
        ['jpg', 'webp', 'avif'].every((ext) =>
          existsSync(join(OUT_DIR, `${stem}-${width}.${ext}`)),
        ),
      )
      if (complete) {
        skipped += WIDTHS.length * 3
        continue
      }
    }

    const source = sharp(sourcePath)
    const { width: sourceWidth } = await source.metadata()

    for (const width of WIDTHS) {
      // `sharp()` instances are single-use once consumed, so re-open per width.
      const base = sharp(sourcePath).resize(width, null, RESIZE_OPTIONS)

      await Promise.all([
        base
          .clone()
          .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
          .toFile(join(OUT_DIR, `${stem}-${width}.jpg`)),
        base
          .clone()
          .webp({ quality: QUALITY.webp })
          .toFile(join(OUT_DIR, `${stem}-${width}.webp`)),
        base
          .clone()
          .avif({ quality: QUALITY.avif })
          .toFile(join(OUT_DIR, `${stem}-${width}.avif`)),
      ])
      written += 3

      // Past the source's own width every further rung is byte-identical to
      // this one; still emitted so the loader's URLs resolve, but no point
      // re-encoding beyond the first capped rung.
      if (sourceWidth && width >= sourceWidth) {
        for (const larger of WIDTHS.filter((w) => w > width)) {
          await Promise.all(
            ['jpg', 'webp', 'avif'].map(async (ext) => {
              const from = join(OUT_DIR, `${stem}-${width}.${ext}`)
              await writeFile(
                join(OUT_DIR, `${stem}-${larger}.${ext}`),
                await readFile(from),
              )
            }),
          )
          written += 3
        }
        break
      }
    }
  }

  /*
   * Variants whose source is gone.
   *
   * Nothing used to delete these, so a photograph removed from `images/` kept
   * shipping its 24 rungs for ever: five retired frames accounted for 5.5 MB
   * of the export, downloaded to the server on every deploy and referenced by
   * no page. The manifest is the list of sources that still exist, so anything
   * in the output whose stem is missing from it is stale by definition.
   */
  const stale = (await readdir(OUT_DIR)).filter((name) => {
    if (name === 'manifest.json') return false
    const stem = basename(name, extname(name)).replace(/-\d+$/, '')
    return !(stem in manifest)
  })
  for (const name of stale) await unlink(join(OUT_DIR, name))

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(
    `[optimize-images] ${entries.length} sources · ${written} variants written · ${skipped} reused` +
      (stale.length > 0 ? ` · ${stale.length} stale removed` : ''),
  )
}

await main()
