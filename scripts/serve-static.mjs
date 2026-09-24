/**
 * Local stand-in for the deployment host, used by the Playwright suite.
 *
 * This site ships as a static export to shared LiteSpeed/Apache hosting, so
 * `next start` no longer applies — and serving `out/` with a naive file server
 * would test something the visitor never gets. Everything that makes the
 * deployed site work now lives in `public/.htaccess`: the `/` → `/tr` redirect,
 * the extensionless-URL rewrite, the AVIF/WebP negotiation and every security
 * header. A plain file server has none of that, so the suite would be green
 * against a site that does not exist.
 *
 * This implements the same rules in Node, so the E2E run exercises the real
 * production behaviour. It is a test harness, not a deployment target — the
 * host runs Apache, and `.htaccess` remains the source of truth. Keep the two
 * in step: a rule added there should be added here, or the suite stops
 * covering it.
 */

import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const ROOT = resolve(process.argv[2] ?? 'out')
const PORT = Number(process.argv[3] ?? 3210)

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
}

/** Mirrors the `<IfModule mod_headers.c>` block in `public/.htaccess`. */
const SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; media-src 'self'; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()',
  'X-DNS-Prefetch-Control': 'on',
}
/*
 * `upgrade-insecure-requests` and HSTS are deliberately NOT sent here.
 *
 * Both are correct on the deployed HTTPS site and both are in `.htaccess`, but
 * this harness serves plain HTTP on localhost. `upgrade-insecure-requests`
 * rewrites every request to https://, where nothing is listening — Safari drops
 * the connection and the page never opens. This is the same reason the previous
 * Next config gated them behind `ALLOW_INSECURE_LAN`.
 */

function isFile(path) {
  try {
    return statSync(path).isFile()
  } catch {
    return false
  }
}

/** Blocks `..` escapes before any path touches the filesystem. */
function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const joined = join(root, normalize(decoded).replace(/^(\.\.[/\\])+/, ''))
  return joined.startsWith(root) ? joined : null
}

/*
 * Byte ranges, as the production host serves them.
 *
 * Without this the harness answered a `Range: bytes=0-1` probe with `200` and
 * the whole file, where LiteSpeed answers `206` with two bytes — so every
 * hero-video test ran against a server the site is never actually served
 * from. Measured afterwards, it happened not to change the playback timings
 * that prompted the check (first play and stall counts came out within a few
 * percent either way), but a harness that exists to reproduce production
 * should not be wrong about the one request pattern `<video>` depends on.
 *
 * Two things this harness still does NOT reproduce, and which matter when
 * reading a throttled measurement taken against it: responses are neither
 * compressed nor multiplexed (LiteSpeed serves HTTP/2 with gzip), so every
 * page-load time here is slower than production. Compare runs against each
 * other on this harness, never against numbers taken on the live site.
 *
 * A single range is all a `<video>` element asks for; multipart ranges are not
 * implemented and fall back to the full body, which a server is allowed to do.
 */
const SINGLE_RANGE = /^bytes=(\d*)-(\d*)$/

/*
 * Test hook, never sent by a browser on its own: `X-Test-Throttle: <bytes per
 * second>` streams the response body at that rate. A test adds the header to
 * the hero clip's request alone (`page.route` → `route.continue({ headers })`),
 * which reproduces a weak mobile signal for the video without also slowing the
 * page and its scripts the way a browser-wide throttle does — that would push
 * hydration, and so the clip's first request, past any reasonable timeout.
 */
function stream(response, filePath, request, range = {}) {
  const rate = Number(request?.headers['x-test-throttle'] ?? 0)
  if (!(rate > 0)) {
    createReadStream(filePath, range).pipe(response)
    return
  }
  // Chunks of a tenth of a second's worth, each followed by the pause that
  // keeps the running total at `rate`.
  const source = createReadStream(filePath, {
    ...range,
    highWaterMark: Math.max(1024, Math.round(rate / 10)),
  })
  source.on('data', (chunk) => {
    source.pause()
    response.write(chunk)
    setTimeout(() => source.resume(), (chunk.length / rate) * 1000)
  })
  source.on('end', () => response.end())
  source.on('error', () => response.destroy())
  response.on('close', () => source.destroy())
}

function send(response, status, filePath, extraHeaders = {}, request = null) {
  const size = statSync(filePath).size
  const headers = {
    ...SECURITY_HEADERS,
    ...extraHeaders,
    'Content-Type': CONTENT_TYPES[extname(filePath)] ?? 'application/octet-stream',
    'Accept-Ranges': 'bytes',
  }

  const range = status === 200 ? SINGLE_RANGE.exec(request?.headers.range ?? '') : null
  if (range) {
    const [, rawStart, rawEnd] = range
    // `bytes=-500` is the last 500 bytes; `bytes=500-` is everything from 500.
    const start = rawStart === '' ? Math.max(0, size - Number(rawEnd)) : Number(rawStart)
    const end =
      rawStart !== '' && rawEnd !== '' ? Math.min(Number(rawEnd), size - 1) : size - 1

    if (Number.isNaN(start) || start >= size || start > end) {
      response.writeHead(416, { ...headers, 'Content-Range': `bytes */${size}` })
      response.end()
      return
    }

    response.writeHead(206, {
      ...headers,
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': end - start + 1,
    })
    stream(response, filePath, request, { start, end })
    return
  }

  response.writeHead(status, { ...headers, 'Content-Length': size })
  stream(response, filePath, request)
}

const server = createServer((request, response) => {
  const [path] = (request.url ?? '/').split('?')

  /*
   * Canonical host, matching `.htaccess`. Only meaningful when something
   * actually requests a `www.` host — the suite runs against 127.0.0.1, so
   * this normally does not fire. It is here so the harness cannot drift from
   * the file it stands in for.
   */
  const host = String(request.headers.host ?? '')
  if (/^www\./i.test(host)) {
    response.writeHead(301, {
      ...SECURITY_HEADERS,
      Location: `https://${host.replace(/^www\./i, '')}${path}`,
    })
    response.end()
    return
  }

  // --- Locale root: `.htaccess` RewriteRule ^$ /tr [R=307,L] ---------------
  if (path === '/') {
    response.writeHead(307, { ...SECURITY_HEADERS, Location: '/tr' })
    response.end()
    return
  }

  // --- `.htaccess` RewriteRule ^index\.html?$ /tr [R=301,L] -----------------
  // The hosting provider's placeholder page that was still live on the domain.
  if (/^\/index\.html?$/.test(path)) {
    response.writeHead(301, { ...SECURITY_HEADERS, Location: '/tr' })
    response.end()
    return
  }

  /*
   * Locale case, matching `.htaccess`. Checked before the filesystem is
   * touched, and it has to be: macOS is case-insensitive, so `/TR` would
   * happily resolve `tr.html` here and the suite would pass on a rule that
   * 404s on the Linux host. Deciding it from the URL string keeps this
   * harness honest about what production does.
   */
  const caseMatch = /^\/([Tt][Rr]|[Ee][Nn])(\/.*)?$/.exec(path)
  if (caseMatch && caseMatch[1] !== caseMatch[1].toLowerCase()) {
    response.writeHead(308, {
      ...SECURITY_HEADERS,
      Location: `/${caseMatch[1].toLowerCase()}${caseMatch[2] ?? ''}`,
    })
    response.end()
    return
  }

  const target = safeJoin(ROOT, path)
  if (!target) {
    response.writeHead(400, SECURITY_HEADERS)
    response.end()
    return
  }

  /*
   * `<FilesMatch "^manifest\.json$">` in `.htaccess`. The harness had no deny
   * rule at all, which is how a broken one shipped: an earlier version of that
   * block also matched `__next.*\.txt` and 403'd the App Router's own prefetch
   * payloads on the live site, while every test here stayed green because
   * nothing local denied anything. Implemented now so the two cannot disagree
   * again — and `tests/e2e/routing.spec.ts` asserts both halves.
   */
  if (path.endsWith('/manifest.json')) {
    response.writeHead(403, SECURITY_HEADERS)
    response.end()
    return
  }

  // --- Image negotiation: serve .avif/.webp when Accept allows -------------
  const accept = String(request.headers.accept ?? '')
  if (path.startsWith('/_img/') && path.endsWith('.jpg')) {
    for (const [type, ext] of [
      ['image/avif', '.avif'],
      ['image/webp', '.webp'],
    ]) {
      if (accept.includes(type)) {
        const candidate = target.replace(/\.jpg$/, ext)
        if (isFile(candidate)) {
          send(response, 200, candidate, { Vary: 'Accept' }, request)
          return
        }
      }
    }
  }

  // --- Real files win ------------------------------------------------------
  if (isFile(target)) {
    send(response, 200, target, {}, request)
    return
  }

  /*
   * Extensionless page URLs: `/tr` -> `tr.html`.
   *
   * Checked BEFORE any directory handling, mirroring `DirectorySlash Off` plus
   * the absence of a `!-d` condition in `.htaccess`. The export ships both
   * `tr.html` and a `tr/` directory, and on Apache the default directory
   * handling claimed `/tr` first, 301'd to `/tr/` and answered 403 — the
   * homepage was dead on the deployed site while this harness happily served
   * it, because the harness had no directory step at all. Keeping the order
   * explicit here is what makes the two agree.
   */
  const asHtml = `${target.replace(/\/$/, '')}.html`
  if (isFile(asHtml)) {
    send(response, 200, asHtml)
    return
  }

  // --- ErrorDocument 404 /404.html ----------------------------------------
  const notFound = join(ROOT, '404.html')
  if (isFile(notFound)) {
    send(response, 404, notFound)
    return
  }
  response.writeHead(404, SECURITY_HEADERS)
  response.end('Not found')
})

if (!existsSync(ROOT)) {
  console.error(`[serve-static] ${ROOT} does not exist — run \`pnpm build\` first`)
  process.exit(1)
}

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[serve-static] ${ROOT} on http://127.0.0.1:${PORT}`)
})
