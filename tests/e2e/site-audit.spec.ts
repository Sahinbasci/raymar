import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

/**
 * Whole-site audit: every page the export publishes, checked the same way.
 *
 * The other specs test behaviours on the pages most likely to regress. This
 * one exists because the site grew from a homepage and three legal documents
 * to forty-eight pages in one day, and the defects that cost search traffic
 * are the ones nobody opens a page to look for — a link to a slug that was
 * renamed, a translated page whose hreflang points at a 404, two pages with
 * the same title, an English page with an untranslated Turkish sentence, a
 * page missing from the sitemap.
 *
 * The page list is read from `out/`, the build output, rather than from the
 * content modules: the point is to audit what was actually built, and a page
 * that exists in the export but not in the sitemap is exactly what this has to
 * catch.
 *
 * Crawl-type checks are engine-independent and run once, in `desktop-1440`.
 * Load health runs in a second engine and a phone profile as well, because
 * failed requests and console errors are where engines differ.
 */

const OUT = join(process.cwd(), 'out')

function exportedPages(): string[] {
  const pages: string[] = []
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name)
      if (statSync(full).isDirectory()) {
        if (!name.startsWith('_')) walk(full)
        continue
      }
      if (!name.endsWith('.html') || name.startsWith('_') || name === '404.html') continue
      pages.push(
        `/${relative(OUT, full)
          .split(sep)
          .join('/')
          .replace(/\.html$/, '')}`,
      )
    }
  }
  walk(OUT)
  return pages.sort()
}

const PAGES = exportedPages()
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

const localeOf = (path: string) => path.slice(1, 3)

/** Scrolls the whole page so lazy images and prefetches actually happen. */
async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8))
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
}

test.describe('site audit — crawl', () => {
  // Chromium at 1440 is the `desktop-1440` project alone.
  test.skip(
    ({ browserName, viewport }) => browserName !== 'chromium' || viewport?.width !== 1440,
    'engine-independent, runs once',
  )

  test('the audit sees the whole site', () => {
    // Guards the enumerator: if the build output moved, every loop below would
    // pass vacuously over an empty list.
    expect(PAGES.length).toBeGreaterThanOrEqual(48)
    for (const expected of [
      '/tr',
      '/en',
      '/tr/urunler/ceviz-ici',
      '/en/guides/pecan-vs-walnut',
    ]) {
      expect(PAGES).toContain(expected)
    }
  })

  test('robots.txt keeps the router payloads out of the index', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text()

    /*
     * Next writes a `.txt` beside every page for client-side navigation —
     * `/tr.txt`, `/tr/urunler.txt`, `/tr/__next._tree.txt`. They carry the
     * same content as the HTML, so a crawler that indexes them sees a second
     * copy of all 56 pages. Blocking them costs nothing: the browser fetches
     * them regardless, because robots.txt binds crawlers, not pages.
     */
    expect(body).toContain('Disallow: /*.txt$')

    // The two `.txt` files that are content, not payloads, are allowed back.
    expect(body).toContain('Allow: /llms.txt')
    expect(body).toMatch(/Allow: \/[0-9a-f]{32}\.txt/)

    // And nothing here may block the site itself.
    expect(body).toContain('Allow: /\n')
  })

  test('the sitemap and the published pages are the same set', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1] ?? '').pathname,
    )
    expect(new Set(listed).size, 'the sitemap lists a URL twice').toBe(listed.length)
    expect([...listed].sort()).toEqual(PAGES)
    expect(xml.match(/<lastmod>/g)?.length).toBe(listed.length)
  })

  test('every page declares itself correctly, and the site has no duplicates', async ({
    page,
  }) => {
    test.setTimeout(PAGES.length * 10_000)

    interface Head {
      title: string
      description: string
      alternates: Record<string, string>
    }
    const heads = new Map<string, Head>()
    const problems: string[] = []

    for (const path of PAGES) {
      await page.goto(path)
      const found = await page.evaluate(() => {
        const attr = (selector: string, name: string) =>
          document.querySelector(selector)?.getAttribute(name) ?? ''
        const ids = [...document.querySelectorAll('[id]')].map((el) => el.id)
        const alternates: Record<string, string> = {}
        for (const link of document.querySelectorAll('link[rel="alternate"][hreflang]')) {
          alternates[link.getAttribute('hreflang') ?? ''] = new URL(
            link.getAttribute('href') ?? '',
          ).pathname
        }
        return {
          lang: document.documentElement.lang,
          h1: document.querySelectorAll('h1').length,
          duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
          title: document.title,
          description: attr('meta[name="description"]', 'content'),
          canonical: new URL(attr('link[rel="canonical"]', 'href') || 'x:/').pathname,
          robots: attr('meta[name="robots"]', 'content'),
          ogUrl: new URL(attr('meta[property="og:url"]', 'content') || 'x:/').pathname,
          ogTitle: attr('meta[property="og:title"]', 'content'),
          ogImage: attr('meta[property="og:image"]', 'content'),
          alternates,
        }
      })

      const fail = (message: string) => problems.push(`${path}: ${message}`)
      if (found.lang !== localeOf(path)) fail(`lang="${found.lang}"`)
      if (found.h1 !== 1) fail(`${found.h1} h1 elements`)
      if (found.duplicateIds.length)
        fail(`duplicate ids ${found.duplicateIds.join(', ')}`)
      if (found.canonical !== path) fail(`canonical ${found.canonical}`)
      if (found.ogUrl !== path) fail(`og:url ${found.ogUrl}`)
      if (!found.robots.startsWith('index, follow')) fail(`robots "${found.robots}"`)
      if (!found.ogTitle || !found.ogImage.startsWith('https://'))
        fail('incomplete Open Graph')
      if (!/Raymar Nuts/.test(found.title)) fail(`title without brand: "${found.title}"`)
      if (found.title.length < 25 || found.title.length > 66) {
        fail(`title length ${found.title.length}: "${found.title}"`)
      }
      if (found.description.length < 70 || found.description.length > 170) {
        fail(`description length ${found.description.length}`)
      }
      for (const lang of ['tr', 'en', 'x-default']) {
        if (!found.alternates[lang]) fail(`no hreflang=${lang}`)
      }
      heads.set(path, {
        title: found.title,
        description: found.description,
        alternates: found.alternates,
      })
    }

    /*
     * hreflang only counts when it is reciprocal: the English page has to name
     * the Turkish one back, with the same cluster, or search engines ignore the
     * pair. And every alternate has to be a page that exists.
     */
    for (const [path, head] of heads) {
      for (const [lang, target] of Object.entries(head.alternates)) {
        const other = heads.get(target)
        if (!other) {
          problems.push(
            `${path}: hreflang=${lang} points at ${target}, which is not a page`,
          )
          continue
        }
        if (JSON.stringify(other.alternates) !== JSON.stringify(head.alternates)) {
          problems.push(`${path}: hreflang cluster differs on ${target}`)
        }
      }
      if (head.alternates['x-default'] !== head.alternates['tr']) {
        problems.push(`${path}: x-default is not the Turkish page`)
      }
      if (head.alternates[localeOf(path)] !== path) {
        problems.push(`${path}: its own hreflang does not name itself`)
      }
    }

    const duplicates = (key: 'title' | 'description') => {
      const seen = new Map<string, string>()
      for (const [path, head] of heads) {
        const previous = seen.get(head[key])
        if (previous) problems.push(`${key} of ${path} duplicates ${previous}`)
        else seen.set(head[key], path)
      }
    }
    duplicates('title')
    duplicates('description')

    expect(problems, problems.join('\n')).toEqual([])
  })

  test('every internal link resolves, and every #fragment exists on its target', async ({
    page,
    request,
    baseURL,
  }) => {
    test.setTimeout(PAGES.length * 10_000)
    const origin = new URL(baseURL ?? 'http://127.0.0.1:3210').origin

    // target (path + hash) -> first page that links to it
    const links = new Map<string, string>()
    for (const path of PAGES) {
      await page.goto(path)
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((anchors) =>
          anchors.map((anchor) => (anchor as HTMLAnchorElement).href),
        )
      for (const href of hrefs) {
        if (!href.startsWith(origin)) continue
        const url = new URL(href)
        const key = `${url.pathname}${url.hash}`
        if (!links.has(key)) links.set(key, path)
      }
    }

    const problems: string[] = []
    const documents = new Map<string, string>()
    for (const [target, from] of links) {
      const [pathname = '', hash] = target.split('#')
      if (!documents.has(pathname)) {
        const response = await request.get(pathname)
        if (response.status() !== 200) {
          problems.push(
            `${from} links to ${pathname}, which answers ${response.status()}`,
          )
          documents.set(pathname, '')
          continue
        }
        documents.set(pathname, await response.text())
      }
      const html = documents.get(pathname) ?? ''
      if (hash && html && !html.includes(`id="${decodeURIComponent(hash)}"`)) {
        problems.push(`${from} links to ${target}, but that page has no #${hash}`)
      }
    }

    expect(problems, problems.join('\n')).toEqual([])
    // The crawl should reach well past the product pages and guides.
    expect(documents.size).toBeGreaterThanOrEqual(40)
  })

  test('English pages carry no untranslated Turkish', async ({ page }) => {
    test.setTimeout(PAGES.length * 10_000)

    /*
     * Every word with a Turkish letter that belongs on the English site, and no
     * more: the legal entity and its address (a tax office among them), the
     * country, the Turkish trade terms the pages quote and then explain, and
     * the place and variety names the pistachio pages cite from the
     * geographical-indication register.
     * "TÜRKIYE" is "Türkiye" after an English \`text-transform: uppercase\` —
     * a breadcrumb — and is what English casing rules produce.
     *
     * Measured from the built pages, so a new entry here should be a decision:
     * a word that is not on this list is either a missed translation or a term
     * that needs explaining in English first.
     */
    const ALLOWED = new Set([
      // The legal entity and its address.
      'Atışalanı',
      'Dış',
      'Oruçreis',
      'Sarayı',
      'Şti',
      'İstanbul',
      'Türkiye',
      'TÜRKIYE',
      // Place and variety names quoted from the pistachio register.
      'Aydın',
      'Kırmızı',
      'Şanlıurfa',
      // Turkish trade terms the pages quote and then explain, including the
      // six kernel types of TS 1276 and the tariff term GTİP.
      'Baklavalık',
      'baklavalık',
      'Büyük',
      'büyük',
      'Çeyrek',
      'çeyrek',
      'çenet',
      'Fıstığı',
      'fıstığı',
      'fındığı',
      'GTİP',
      'iç',
      'içi',
      'kadayıf',
      'Kırık',
      'kırık',
      'Küçük',
      'küçük',
      'Pirinç',
      'pirinç',
      'Yarım',
      'yarım',
      // Turkish institutions, journals and cultivars named in English prose.
      'Atatürk',
      'BAHÇE',
      'GAİB',
      'Gültekin',
      'OAİB',
      'Selçuk',
      'UİB',
      'Uludağ',
    ])

    const found = new Map<string, string>()
    for (const path of PAGES.filter((candidate) => localeOf(candidate) === 'en')) {
      await page.goto(path)
      /*
       * Text explicitly marked as another language is quoted, not untranslated:
       * the sources list names each publication by its own title, and a Turkish
       * standard or communiqué keeps its Turkish name with `lang="tr"` on the
       * link. Dropping those subtrees leaves exactly the English prose.
       */
      const text = await page.evaluate(() => {
        const pageLanguage = document.documentElement.lang
        for (const element of document.querySelectorAll('[lang]')) {
          if (element.getAttribute('lang') !== pageLanguage) element.remove()
        }
        return document.body.innerText
      })
      for (const word of text.match(/[\p{L}]*[çğıİöşüÇĞÖŞÜ][\p{L}]*/gu) ?? []) {
        if (!ALLOWED.has(word) && !found.has(word)) found.set(word, path)
      }
    }

    const report = [...found].map(([word, path]) => `"${word}" on ${path}`)
    expect(report, report.join('\n')).toEqual([])
  })

  test('no page scrolls sideways at any width', async ({ page }) => {
    test.setTimeout(PAGES.length * 15_000)
    const problems: string[] = []

    for (const path of PAGES) {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(path)
      for (const width of [320, 390, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 })
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        if (overflow > 0) problems.push(`${path} at ${width}px: ${overflow}px`)
      }
    }

    expect(problems, problems.join('\n')).toEqual([])
  })

  test('no WCAG 2.2 AA violations on any page', async ({ page }) => {
    test.setTimeout(PAGES.length * 20_000)
    const problems: string[] = []

    /*
     * The two homepages are left to accessibility.spec.ts, which waits for the
     * scroll reveals to settle before scanning — scanned mid-fade, headings
     * report contrast failures that are not there. No other page animates.
     */
    for (const path of PAGES.filter((candidate) => !['/tr', '/en'].includes(candidate))) {
      await page.goto(path)
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze()
      for (const violation of violations) {
        problems.push(
          `${path}: ${violation.id} (${violation.impact}) ${violation.nodes
            .slice(0, 2)
            .map((node) => node.target.join(' '))
            .join(' | ')}`,
        )
      }
    }

    expect(problems, problems.join('\n')).toEqual([])
  })

  test('structured data is well-formed on every page, and every URL in it resolves', async ({
    page,
    request,
    baseURL,
  }) => {
    test.setTimeout(PAGES.length * 10_000)
    const testOrigin = new URL(baseURL ?? 'http://127.0.0.1:3210').origin
    const problems: string[] = []
    const urls = new Set<string>()

    type Node = Record<string, unknown>
    const walk = (value: unknown, visit: (node: Node) => void) => {
      if (Array.isArray(value)) value.forEach((entry) => walk(entry, visit))
      else if (value && typeof value === 'object') {
        visit(value as Node)
        for (const [key, entry] of Object.entries(value)) {
          if (key !== '@id') walk(entry, visit)
        }
      }
    }

    for (const path of PAGES) {
      await page.goto(path)
      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents()
      if (blocks.length < 2 && path.split('/').length > 2) {
        problems.push(`${path}: expected the organization graph plus the page's own`)
      }

      for (const block of blocks) {
        let parsed: unknown
        try {
          parsed = JSON.parse(block)
        } catch {
          problems.push(`${path}: a JSON-LD block does not parse`)
          continue
        }

        walk(parsed, (node) => {
          const types = [node['@type']].flat().map(String)
          if (types.includes('BreadcrumbList')) {
            const items = node['itemListElement'] as Node[]
            items.forEach((item, index) => {
              if (item['position'] !== index + 1)
                problems.push(`${path}: breadcrumb position`)
              if (typeof item['item'] !== 'string')
                problems.push(`${path}: breadcrumb item URL`)
            })
          }
          if (types.includes('FAQPage')) {
            for (const question of node['mainEntity'] as Node[]) {
              const answer = question['acceptedAnswer'] as Node | undefined
              if (!question['name'] || !answer?.['text'])
                problems.push(`${path}: empty FAQ entry`)
            }
          }
          if (types.includes('Article')) {
            if (String(node['headline']).length > 110)
              problems.push(`${path}: headline > 110`)
            for (const key of ['datePublished', 'dateModified']) {
              if (
                !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/.test(
                  String(node[key]),
                )
              ) {
                problems.push(`${path}: ${key} "${String(node[key])}"`)
              }
            }
            if (!Array.isArray(node['image']) || !(node['image'] as unknown[]).length) {
              problems.push(`${path}: Article without image`)
            }
          }
          if (types.includes('Product')) {
            problems.push(
              `${path}: Product node (needs offers/review/rating to be valid)`,
            )
          }
        })

        walk(parsed, (node) => {
          for (const [key, entry] of Object.entries(node)) {
            if (key === '@id' || typeof entry !== 'string') continue
            if (entry.startsWith('https://raymarnuts.com')) urls.add(entry)
          }
        })
      }
    }

    for (const url of urls) {
      const status = (
        await request.get(url.replace('https://raymarnuts.com', testOrigin))
      ).status()
      if (status !== 200) problems.push(`${url} answers ${status}`)
    }

    expect(problems, problems.join('\n')).toEqual([])
    expect(urls.size).toBeGreaterThan(60)
  })
})

/*
 * Load health in three engines. Chromium at desktop width, WebKit as an
 * iPhone, Firefox at desktop width: a failed request, a console error or an
 * image that never decodes shows up in one engine and not another often
 * enough to justify the time.
 */
test.describe('site audit — load health', () => {
  test.skip(
    ({ browserName, viewport }) =>
      !(
        (browserName === 'chromium' && viewport?.width === 1440) ||
        (browserName === 'webkit' && (viewport?.width ?? 0) < 500) ||
        browserName === 'firefox'
      ),
    'three representative projects',
  )

  test('every page loads without errors, failed requests or broken images', async ({
    page,
    baseURL,
  }) => {
    test.setTimeout(PAGES.length * 30_000)
    const origin = new URL(baseURL ?? 'http://127.0.0.1:3210').origin
    const problems: string[] = []
    let current = ''

    // Third-party frames (the map on the homepage) are not this site's to fix.
    const ours = (url: string) => url.startsWith(origin)
    const aborted = /ERR_ABORTED|NS_BINDING_ABORTED|cancelled|Load request cancelled/i

    page.on('pageerror', (error) =>
      problems.push(`${current}: page error ${error.message}`),
    )
    page.on('console', (message) => {
      if (message.type() !== 'error') return
      const source = message.location().url ?? ''
      if (source && !ours(source)) return
      problems.push(`${current}: console ${message.text()}`)
    })
    page.on('response', (response) => {
      if (ours(response.url()) && response.status() >= 400) {
        problems.push(
          `${current}: ${response.status()} ${response.url().replace(origin, '')}`,
        )
      }
    })
    page.on('requestfailed', (failed) => {
      const reason = failed.failure()?.errorText ?? ''
      if (ours(failed.url()) && !aborted.test(reason)) {
        problems.push(`${current}: failed ${reason} ${failed.url().replace(origin, '')}`)
      }
    })

    for (const path of PAGES) {
      current = path
      await page.goto(path, { waitUntil: 'load' })
      await scrollThrough(page)
      await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {})

      const broken = await page.evaluate(async () => {
        const images = [...document.images]
        await Promise.all(
          images.map((image) =>
            image.complete ? null : new Promise((resolve) => setTimeout(resolve, 3000)),
          ),
        )
        // Only images the page actually shows: the logo inside the closed mobile
        // drawer is `display: none`, so a lazy image there is never requested —
        // correctly, and not a broken image.
        return images
          .filter((image) => image.checkVisibility())
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src)
      })
      for (const src of broken) problems.push(`${path}: image did not render ${src}`)
    }

    expect(problems, problems.join('\n')).toEqual([])
  })
})

test.describe('site audit — layout stability', () => {
  test.skip(
    ({ isMobile, browserName }) => !isMobile || browserName !== 'chromium',
    'Pixel 7 only',
  )

  /*
   * Cumulative layout shift on a phone, load plus a full scroll, for one page
   * of each library template. Google's "good" threshold is 0.1; photographs sit
   * in fixed-ratio boxes and the header is fixed, so these should be at zero,
   * and anything measurable is a regression worth knowing about.
   */
  for (const path of [
    '/tr/urunler',
    '/tr/urunler/ceviz-ici',
    '/tr/rehber/ceviz-ici-cesitleri',
    '/en/products/walnut-pieces',
  ]) {
    test(`${path} does not shift while loading or scrolling`, async ({ page }) => {
      await page.addInitScript(() => {
        ;(window as unknown as { __cls: number }).__cls = 0
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as (PerformanceEntry & {
            value: number
            hadRecentInput: boolean
          })[]) {
            if (!entry.hadRecentInput)
              (window as unknown as { __cls: number }).__cls += entry.value
          }
        }).observe({ type: 'layout-shift', buffered: true })
      })
      await page.goto(path)
      await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => {})
      await scrollThrough(page)
      await page.waitForTimeout(500)
      const cls = await page.evaluate(
        () => (window as unknown as { __cls: number }).__cls,
      )
      expect(cls).toBeLessThan(0.05)
    })
  }
})
