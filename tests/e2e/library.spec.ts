import { expect, test, type Page } from '@playwright/test'
import sharp from 'sharp'
import { expectSettledAtTop, settle, waitForHydration } from './support/scroll'

/**
 * The product pages and guides.
 *
 * Every URL is spelled out here rather than read from `src/content/library`,
 * for the reason `legal.spec.ts` gives: a test that derives its URLs from the
 * constant the pages are generated from keeps passing when that constant
 * changes, and a changed slug is exactly the regression that silently 404s
 * every link, bookmark and search result pointing at the old one.
 *
 * These are the site's search-facing pages, so what is asserted is what a
 * crawler relies on: they resolve, they declare themselves correctly
 * (canonical, the hreflang pair, a single `<h1>`), everything their markup
 * claims is true of the page, and every URL they assert about the site exists.
 */

interface Pair {
  readonly tr: string
  readonly en: string
  readonly trHeading: string
  readonly enHeading: string
}

const WALNUT: Pair = {
  tr: '/tr/urunler/ceviz-ici',
  en: '/en/products/walnut-kernels',
  trHeading: 'Toptan Ceviz İçi',
  enHeading: 'Walnut Kernels, Wholesale',
}

const PRODUCTS: readonly Pair[] = [
  {
    tr: '/tr/urunler/makadamya',
    en: '/en/products/macadamia-nuts',
    trHeading: 'Toptan Makadamya',
    enHeading: 'Macadamia Nuts, Wholesale',
  },
  {
    tr: '/tr/urunler/pikan-cevizi',
    en: '/en/products/pecan-nuts',
    trHeading: 'Toptan Pikan Cevizi',
    enHeading: 'Pecan Nuts, Wholesale',
  },
  {
    tr: '/tr/urunler/kabak-cekirdegi-ici',
    en: '/en/products/pumpkin-seed-kernels',
    trHeading: 'Toptan Kabak Çekirdeği İçi',
    enHeading: 'Pumpkin Seed Kernels, Wholesale',
  },
  {
    tr: '/tr/urunler/ay-cekirdegi-ici',
    en: '/en/products/sunflower-kernels',
    trHeading: 'Toptan Ay Çekirdeği İçi',
    enHeading: 'Sunflower Seed Kernels, Wholesale',
  },
  {
    tr: '/tr/urunler/cerezlik-ay-cekirdegi',
    en: '/en/products/in-shell-sunflower-seeds',
    trHeading: 'Toptan Çerezlik Ay Çekirdeği',
    enHeading: 'In-Shell Sunflower Seeds, Wholesale',
  },
  {
    tr: '/tr/urunler/antep-fistigi',
    en: '/en/products/pistachios',
    trHeading: 'Toptan Antep Fıstığı',
    enHeading: 'Pistachios, Wholesale',
  },
  WALNUT,
]

/** One page per walnut size, a level below the walnut page. */
const WALNUT_SIZES: readonly Pair[] = [
  {
    tr: '/tr/urunler/yarim-ceviz-ici',
    en: '/en/products/walnut-halves',
    trHeading: 'Toptan Yarım Ceviz İçi',
    enHeading: 'Walnut Halves, Wholesale',
  },
  {
    tr: '/tr/urunler/ceyrek-ceviz-ici',
    en: '/en/products/walnut-quarters',
    trHeading: 'Toptan Çeyrek Ceviz İçi',
    enHeading: 'Walnut Quarters, Wholesale',
  },
  {
    tr: '/tr/urunler/kirik-ceviz-ici',
    en: '/en/products/walnut-pieces',
    trHeading: 'Toptan Kırık Ceviz İçi',
    enHeading: 'Walnut Pieces, Wholesale',
  },
  {
    tr: '/tr/urunler/pirinc-ceviz-ici',
    en: '/en/products/walnut-small-pieces',
    trHeading: 'Toptan Pirinç Ceviz İçi',
    enHeading: 'Walnut Small Pieces, Wholesale',
  },
]

const GUIDES: readonly Pair[] = [
  {
    tr: '/tr/rehber/ceviz-ici-cesitleri',
    en: '/en/guides/walnut-kernel-grades',
    trHeading: 'Ceviz İçi Çeşitleri: Yarım, Çeyrek, Kırık ve Pirinç Ceviz',
    enHeading: 'Walnut Kernel Grades: Halves, Quarters, Pieces and Small Pieces',
  },
  {
    tr: '/tr/rehber/ceviz-ici-renk-siniflari',
    en: '/en/guides/walnut-kernel-colour-grades',
    trHeading: 'Ceviz İçi Renk Sınıfları: Extra Light, Light, Light Amber ve Amber',
    enHeading: 'Walnut Kernel Colour Grades: Extra Light, Light, Light Amber and Amber',
  },
  {
    tr: '/tr/rehber/ceviz-ici-nasil-saklanir',
    en: '/en/guides/how-to-store-walnut-kernels',
    trHeading: 'Ceviz İçi Nasıl Saklanır? Acılaşmayı Geciktiren Koşullar',
    enHeading: 'How to Store Walnut Kernels: Conditions That Slow Rancidity',
  },
  {
    tr: '/tr/rehber/ceviz-ici-neden-acilasir',
    en: '/en/guides/walnut-kernel-defects',
    trHeading: 'Ceviz İçi Neden Acılaşır, Kararır ve Büzüşür?',
    enHeading: 'Why Walnut Kernels Turn Rancid, Dark or Shrivelled',
  },
  {
    tr: '/tr/rehber/ceviz-hasadi-ne-zaman',
    en: '/en/guides/walnut-harvest-season',
    trHeading: 'Ceviz Hasadı Ne Zaman Yapılır?',
    enHeading: 'When Are Walnuts Harvested?',
  },
  {
    tr: '/tr/rehber/pikan-cevizi-ile-ceviz-farki',
    en: '/en/guides/pecan-vs-walnut',
    trHeading: 'Pikan Cevizi ile Ceviz Arasındaki Farklar',
    enHeading: 'Pecan vs Walnut: How the Two Nuts Differ',
  },
  {
    tr: '/tr/rehber/makademya-findigi-nedir',
    en: '/en/guides/what-are-macadamia-nuts',
    trHeading: 'Makademya Fındığı Nedir? Makadamya Hakkında Bilinmesi Gerekenler',
    enHeading: 'What Are Macadamia Nuts? Origin, Characteristics and Uses',
  },
  {
    tr: '/tr/rehber/makadamya-ic-siniflari',
    en: '/en/guides/macadamia-kernel-styles',
    trHeading: 'Makadamya İç Sınıfları: Style 0’dan Style 8’e',
    enHeading: 'Macadamia Kernel Styles: Style 0 to Style 8',
  },
  {
    tr: '/tr/rehber/kuruyemiste-aflatoksin',
    en: '/en/guides/aflatoxins-in-nuts',
    trHeading: 'Kuruyemişte Aflatoksin: Limitler, Kontroller ve Önlem',
    enHeading: 'Aflatoxins in Nuts: Limits, Controls and Prevention',
  },
  {
    tr: '/tr/rehber/toptan-kuruyemis-alirken-dikkat-edilecekler',
    en: '/en/guides/buying-nuts-wholesale',
    trHeading: 'Toptan Kuruyemiş Alırken Nelere Dikkat Edilmeli?',
    enHeading: 'Buying Nuts Wholesale: What to Check',
  },
  {
    tr: '/tr/rehber/kuruyemis-ihracati-icin-gerekli-belgeler',
    en: '/en/guides/nut-export-documents',
    trHeading: 'Kuruyemiş İhracatı İçin Gerekli Belgeler',
    enHeading: 'Nut Export Documents: What Travels with a Shipment from Türkiye',
  },
]

const INDEXES: readonly Pair[] = [
  {
    tr: '/tr/urunler',
    en: '/en/products',
    trHeading: 'Toptan Kuruyemiş Ürünleri',
    enHeading: 'Wholesale Nuts and Seeds',
  },
  {
    tr: '/tr/rehber',
    en: '/en/guides',
    trHeading: 'Kuruyemiş Rehberi',
    enHeading: 'Nut Trade Guides',
  },
]

const ALL = [...INDEXES, ...PRODUCTS, ...WALNUT_SIZES, ...GUIDES]

/** Both sides of each pair, with the heading each should carry. */
const PAGES = ALL.flatMap((pair) => [
  { path: pair.tr, heading: pair.trHeading, pair },
  { path: pair.en, heading: pair.enHeading, pair },
])

type Node = Record<string, unknown>

/** Every node in every JSON-LD block on the page, `@graph`s flattened. */
async function nodesOn(page: Page): Promise<Node[]> {
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()
  return blocks.flatMap((block) => {
    const parsed = JSON.parse(block) as Node
    return Array.isArray(parsed['@graph']) ? (parsed['@graph'] as Node[]) : [parsed]
  })
}

function typesOf(node: Node): string[] {
  const type = node['@type']
  return Array.isArray(type) ? (type as string[]) : [String(type)]
}

/** Every string anywhere in the value that starts with `origin`, `@id`s excepted. */
function selfUrls(value: unknown, origin: string, found = new Set<string>()) {
  if (typeof value === 'string') {
    if (value.startsWith(origin)) found.add(value)
  } else if (Array.isArray(value)) {
    for (const entry of value) selfUrls(entry, origin, found)
  } else if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      if (key === '@id') continue
      selfUrls(entry, origin, found)
    }
  }
  return found
}

/*
 * Document-level checks read the HTML, not the rendering, so one engine is
 * enough — running them in all seven projects would multiply the suite's
 * longest loop by seven for no additional coverage. Behaviour that does
 * depend on the engine or the viewport (the language switch, layout) runs
 * everywhere below.
 */
test.describe('library documents', () => {
  // Chromium at 1440 is the `desktop-1440` project alone.
  test.skip(
    ({ browserName, viewport }) => browserName !== 'chromium' || viewport?.width !== 1440,
    'engine-independent',
  )

  test('every page resolves and declares itself correctly', async ({ page }) => {
    for (const { path, heading, pair } of PAGES) {
      const response = await page.goto(path)
      expect(response?.status(), `${path} status`).toBe(200)

      await expect(page.locator('h1'), `${path} must have exactly one h1`).toHaveCount(1)
      await expect(page.locator('h1')).toHaveText(heading)
      await expect(page.locator('html')).toHaveAttribute('lang', path.slice(1, 3))

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new RegExp(`${path}$`),
      )

      /*
       * The hreflang pair with DIFFERENT slugs on each side. Every other page
       * on the site swaps a prefix; these cannot, and a cluster built by
       * swapping would name `/en/urunler/ceviz-ici`, a URL that does not exist.
       */
      for (const [lang, expected] of [
        ['tr', pair.tr],
        ['en', pair.en],
        ['x-default', pair.tr],
      ] as const) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
          `${path} hreflang=${lang}`,
        ).toHaveAttribute('href', new RegExp(`${expected}$`))
      }

      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        /^index, follow/,
      )

      // What a results page shows. Past ~60 characters a title is truncated;
      // outside 70–170 a description is either thin or cut off.
      const title = await page.title()
      expect(title, `${path} title`).toMatch(/ \| Raymar Nuts$/)
      expect(title.length, `${path} title "${title}"`).toBeLessThanOrEqual(66)
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content')
      expect(description?.length ?? 0, `${path} description`).toBeGreaterThanOrEqual(70)
      expect(description?.length ?? 0, `${path} description`).toBeLessThanOrEqual(170)

      // A shared link previews as this page, not as the homepage.
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        new RegExp(`${path}$`),
      )
    }
  })

  test('the markup describes exactly what the page shows', async ({ page }) => {
    for (const { path, pair } of PAGES) {
      if (INDEXES.includes(pair)) continue
      await page.goto(path)
      const nodes = await nodesOn(page)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')

      /*
       * FAQ markup describing questions the page does not show is the
       * textbook case of structured data Google treats as spam. So the check
       * runs from the page to the markup and back: same questions, same
       * order, nothing extra on either side.
       */
      const faq = nodes.find((node) => typesOf(node).includes('FAQPage'))
      expect(faq, `${path} has no FAQPage`).toBeDefined()
      const marked = (faq?.['mainEntity'] as Node[]).map((entry) => entry['name'])
      const visible = await page
        .locator('h2#faq')
        .locator('xpath=..')
        .locator('h3')
        .allTextContents()
      expect(marked, `${path} FAQ markup vs page`).toEqual(visible)
      expect(visible.length, `${path} FAQ`).toBeGreaterThan(0)

      // Home, the index, the walnut page for a walnut size, then this page —
      // the last crumb named as the visible trail names it.
      const crumbs = nodes.find((node) => typesOf(node).includes('BreadcrumbList'))
      const items = crumbs?.['itemListElement'] as { name: string; item: string }[]
      const size = WALNUT_SIZES.includes(pair)
      expect(items, `${path} breadcrumb`).toHaveLength(size ? 4 : 3)
      if (size) {
        expect(items[2]?.item).toMatch(
          new RegExp(`${path.startsWith('/tr') ? WALNUT.tr : WALNUT.en}$`),
        )
      }
      expect(items.at(-1)?.item).toBe(canonical)
      await expect(
        page
          .getByRole('navigation', { name: /Sayfa konumu|Breadcrumb/ })
          .locator('[aria-current="page"]'),
      ).toHaveText(items.at(-1)?.name ?? '')

      if (GUIDES.includes(pair)) {
        const article = nodes.find((node) => typesOf(node).includes('Article'))
        expect(article, `${path} has no Article`).toBeDefined()
        expect(article?.['headline']).toBe(await page.locator('h1').textContent())
        expect(String(article?.['datePublished'])).toMatch(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
        )
        expect((article?.['author'] as Node)['name']).toBe('Raymar Nuts')
      }

      /*
       * No `Product` node on a product page. Google requires `offers`,
       * `review` or `aggregateRating` on every Product it parses, none exists
       * for this range, and each node would be an invalid item in Search
       * Console. Asserted so a well-meaning addition fails here first.
       */
      expect(
        nodes.filter((node) => typesOf(node).includes('Product')),
        `${path} carries a Product node`,
      ).toEqual([])
    }
  })

  /*
   * The client's rule for this content is that nothing on it may be made up.
   * A page's references are its evidence: they have to be on the page, where
   * a reader can check them, and the `citation` markup has to name exactly
   * those — a citation the page does not show would be markup describing
   * content that is not there.
   */
  test('every page lists its sources, and its markup cites exactly those', async ({
    page,
  }) => {
    for (const { path, pair } of PAGES) {
      if (INDEXES.includes(pair)) continue
      await page.goto(path)
      const links = page.locator('h2#sources').locator('xpath=..').locator('ol > li a')
      const hrefs = await links.evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute('href') ?? ''),
      )
      expect(
        hrefs.length,
        `${path} lists fewer than three sources`,
      ).toBeGreaterThanOrEqual(3)
      for (const href of hrefs) {
        expect(href, `${path}: ${href}`).toMatch(/^https:\/\//)
        expect(new URL(href).hostname, `${path} cites itself`).not.toContain('raymarnuts')
      }

      const nodes = await nodesOn(page)
      const carrier = nodes.find((node) =>
        typesOf(node).includes(GUIDES.includes(pair) ? 'Article' : 'WebPage'),
      )
      const cited = ((carrier?.['citation'] ?? []) as Node[]).map((entry) => entry['url'])
      expect(cited, `${path} citation markup vs the visible list`).toEqual(hrefs)
    }
  })

  test('every URL the pages assert about the site resolves, at the size declared', async ({
    page,
    request,
    baseURL,
  }) => {
    const testOrigin = new URL(baseURL ?? 'http://127.0.0.1:3210').origin
    const checked = new Map<string, number>()

    for (const { path } of PAGES) {
      await page.goto(path)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      const publishedOrigin = new URL(canonical ?? '').origin

      const urls = new Set<string>()
      for (const node of await nodesOn(page)) selfUrls(node, publishedOrigin, urls)
      for (const selector of ['link[rel="alternate"]', 'link[rel="canonical"]']) {
        for (const href of await page
          .locator(selector)
          .evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''))) {
          urls.add(href)
        }
      }

      for (const url of urls) {
        if (checked.has(url)) continue
        const response = await request.get(url.replace(publishedOrigin, testOrigin))
        checked.set(url, response.status())
      }

      /*
       * The Open Graph image, fetched and measured. The optimizer never
       * upscales, so a 648px photograph published at the 1280 rung is 648px
       * wide — and a card that declares 1280 for it states a size the file
       * does not have.
       */
      const ogImage = await page
        .locator('meta[property="og:image"]')
        .getAttribute('content')
      const declaredWidth = await page
        .locator('meta[property="og:image:width"]')
        .getAttribute('content')
      const declaredHeight = await page
        .locator('meta[property="og:image:height"]')
        .getAttribute('content')
      const image = await request.get(
        (ogImage ?? '').replace(publishedOrigin, testOrigin),
        {
          headers: { accept: 'image/jpeg' },
        },
      )
      expect(image.ok(), `${path} og:image ${ogImage}`).toBe(true)
      const { width, height } = await sharp(await image.body()).metadata()
      expect(`${width}x${height}`, `${path} og:image dimensions`).toBe(
        `${declaredWidth}x${declaredHeight}`,
      )
    }

    const broken = [...checked].filter(([, status]) => status !== 200)
    expect(broken).toEqual([])
    // If this collapses the test has stopped testing. Today it is 54 distinct
    // URLs: the 40 pages, both homepages (the first breadcrumb), the eleven
    // photographs and the logo.
    expect(checked.size).toBeGreaterThanOrEqual(54)
  })

  test('each index lists every product line and every guide', async ({ page }) => {
    for (const [index, members] of [
      [INDEXES[0], PRODUCTS],
      [INDEXES[1], GUIDES],
    ] as const) {
      for (const locale of ['tr', 'en'] as const) {
        await page.goto(index?.[locale] ?? '')
        const hrefs = await page
          .locator('main ul article h2 a')
          .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
        expect([...hrefs].sort()).toEqual(members.map((member) => member[locale]).sort())
      }
    }
  })

  test('the homepage and the footer link to every product page', async ({
    page,
    request,
  }) => {
    for (const locale of ['tr', 'en'] as const) {
      await page.goto(`/${locale}`)

      // Each range card opens its product, each walnut card its own size.
      const cardLinks = await page
        .locator('#urunlerimiz article h3 a, #ceviz article h3 a, #ceviz article h4 a')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
      const cards = [
        ...PRODUCTS.filter((product) => product !== WALNUT),
        ...WALNUT_SIZES,
      ].map((product) => product[locale])
      expect(cardLinks).toEqual(cards)

      // The footer lists the product lines, walnut included.
      const footerLinks = await page
        .locator('footer a')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
      const lines = PRODUCTS.map((product) => product[locale])
      for (const path of lines) {
        expect(footerLinks, `footer is missing ${path}`).toContain(path)
      }
      expect(footerLinks).toContain(locale === 'tr' ? '/tr/rehber' : '/en/guides')

      for (const path of [...cards, ...lines]) {
        expect((await request.get(path)).status(), path).toBe(200)
      }

      // And the walnut page lists its four sizes.
      await page.goto(WALNUT[locale])
      const sizeLinks = await page
        .locator('main ul article h3 a')
        .evaluateAll((links) => links.map((link) => link.getAttribute('href')))
      expect(sizeLinks).toEqual(WALNUT_SIZES.map((size) => size[locale]))
    }
  })

  test('the sitemap lists every page with its translated alternate', async ({
    request,
  }) => {
    const xml = await (await request.get('/sitemap.xml')).text()

    for (const pair of ALL) {
      for (const path of [pair.tr, pair.en]) {
        expect(xml, `sitemap is missing ${path}`).toMatch(
          new RegExp(`<loc>https?://[^<]+${path}</loc>`),
        )
      }
      expect(xml).toMatch(new RegExp(`hreflang="en" href="https?://[^"]+${pair.en}"`))
    }
  })

  test('llms.txt maps every page, in both languages', async ({ request }) => {
    const response = await request.get('/llms.txt')
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('text/plain')

    const text = await response.text()
    expect(text.startsWith('# Raymar Nuts\n')).toBe(true)
    for (const pair of ALL) {
      for (const path of [pair.tr, pair.en]) {
        expect(text, `llms.txt is missing ${path}`).toMatch(
          new RegExp(`\\]\\(https?://[^)]+${path}\\)`),
        )
      }
    }
  })
})

test.describe('library pages in use', () => {
  test('the language switch opens the translated page, where the reader was', async ({
    page,
    viewport,
  }) => {
    const narrow = (viewport?.width ?? 0) < 1024
    const walnut = WALNUT

    await page.goto(walnut.tr)
    await waitForHydration(page)
    await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }))
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000)

    if (narrow) {
      await page.getByRole('button', { name: 'Menüyü aç' }).click()
      await page
        .getByRole('dialog')
        .getByRole('link', { name: 'EN', exact: true })
        .click()
    } else {
      await page.locator('header').getByRole('link', { name: 'EN', exact: true }).click()
    }

    // A prefix swap would have produced /en/urunler/ceviz-ici — a 404.
    await expect(page).toHaveURL(new RegExp(`${walnut.en}$`))
    await expect(page.locator('h1')).toHaveText(walnut.enHeading)
    // Not the top any more: the client reported being thrown back to the
    // start. The paragraph-level check is in landing.spec.ts; this one only
    // guards the translated-slug path against falling back to either end.
    const landing = await settle(page)
    expect(landing.changes, 'the switch slid to its landing').toBeLessThanOrEqual(1)
    expect(landing.y).toBeGreaterThan(1000)
    expect(landing.y).toBeLessThan(1900)
  })

  test('a homepage card opens its product page at the top', async ({ page }) => {
    await page.goto('/tr')
    const card = page.locator('#urunlerimiz article').filter({ hasText: 'Pikan Cevizi' })
    await card.getByRole('link', { name: 'Pikan Cevizi', exact: true }).click()

    await expect(page).toHaveURL(/\/tr\/urunler\/pikan-cevizi$/)
    await expect(page.locator('h1')).toHaveText('Toptan Pikan Cevizi')
    await expectSettledAtTop(page)
  })

  test('the quotation call to action reaches the form', async ({ page }) => {
    await page.goto('/tr/urunler/antep-fistigi')
    await page
      .locator('main')
      .getByRole('link', { name: 'Teklif Talep Et' })
      .first()
      .click()

    await expect(page).toHaveURL(/\/tr#teklif$/)
    await expect(page.locator('#teklif')).toBeInViewport({ ratio: 0.1 })
  })

  test('no horizontal overflow at any width', async ({ page, browserName, viewport }) => {
    test.skip(
      browserName !== 'chromium' || viewport?.width !== 1440,
      'drives its own widths',
    )

    const offenders: string[] = []
    for (const path of ['/tr/urunler', '/tr/urunler/ceviz-ici', GUIDES[1]?.tr ?? '']) {
      await page.goto(path)
      for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 })
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        if (overflow > 0) offenders.push(`${path} at ${width}px: ${overflow}px`)
      }
    }
    expect(offenders).toEqual([])
  })
})
