/**
 * Drops the unoptimized source photographs from the export.
 *
 * `public/images/` holds the originals that `scripts/optimize-images.mjs` reads
 * to produce the width ladder under `public/_img/`. Next copies all of `public/`
 * into `out/`, so those originals — 6.5 MB of them — ship as well, even though
 * no browser ever asks for one: `image-loader.ts` rewrites every `/images/…`
 * path to the `/_img/…` variant before it reaches the DOM.
 *
 * Leaving them there was not merely wasteful, it was actively misleading. They
 * were excluded from the upload as dead weight, which meant the deployed site
 * and the local `out/` disagreed about which files exist — and the JSON-LD,
 * which named the originals, resolved locally while answering 404 on the live
 * site. The test suite ran against an `out/` that was not the deployment, so it
 * could not see it. Pruning here makes the two the same thing, which is what
 * lets `tests/e2e/structured-data.spec.ts` mean anything.
 *
 * The guard below is the safety catch: if anything ever emits a real `/images/`
 * URL into the markup — an `unoptimized` image, a hand-written `<img>`, an
 * `og:image` pointed at a source file — this refuses to prune and fails the
 * build rather than deleting a file the site needs. References inside the React
 * Server Component payload are expected and ignored; those are inputs to the
 * loader, not URLs a browser fetches.
 */

import { readdir, readFile, rm, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const OUT = resolve(process.argv[2] ?? 'out')
const IMAGES = join(OUT, 'images')

/** Every `.html` file in the export, recursively. */
async function htmlFiles(dir) {
  const found = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...(await htmlFiles(path)))
    else if (entry.name.endsWith('.html')) found.push(path)
  }
  return found
}

/*
 * Matches only an attribute value — `src="/images/x.jpg"` — which is a URL the
 * browser will actually request. The same path inside the flight payload is
 * escaped (`\"/images/x.jpg\"`) and does not match, which is the distinction
 * that makes this guard useful rather than permanently red.
 */
const REAL_REFERENCE = /(?:src|href|srcset|content|poster)="[^"]*\/images\//

let pruned = false
try {
  await stat(IMAGES)
  const offenders = []
  for (const file of await htmlFiles(OUT)) {
    if (REAL_REFERENCE.test(await readFile(file, 'utf8'))) offenders.push(file)
  }

  if (offenders.length > 0) {
    console.error(
      `[prune-export] refusing to prune: ${offenders.length} page(s) request /images/ directly\n` +
        offenders.map((file) => `  ${file}`).join('\n') +
        '\nEither route those through next/image, or stop pruning this directory.',
    )
    process.exit(1)
  }

  await rm(IMAGES, { recursive: true, force: true })
  pruned = true
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

console.log(
  pruned
    ? '[prune-export] removed out/images — sources are inputs to the optimizer, not deliverables'
    : '[prune-export] nothing to prune',
)
