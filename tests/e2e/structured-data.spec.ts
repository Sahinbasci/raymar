import { expect, test, type Page } from '@playwright/test'

/**
 * Spelled out rather than imported from `src/lib/legal.ts`. A test that reads
 * the slugs from the same constant the pages are generated from would still
 * pass if that constant changed, which is the opposite of what a URL
 * regression guard is for.
 */
const LEGAL_SLUGS = [
  'kvkk-aydinlatma-metni',
  'gizlilik-politikasi',
  'cerez-politikasi',
] as const

/**
 * Structured data had no coverage at all until a live audit found every
 * `Product.image` in the graph answering 404: the markup named the originals
 * under `/images/`, a directory the static export deliberately does not deploy
 * because no browser ever requests it. Ten nodes, each promising a crawler an
 * image that is not there — and a green suite the whole time, because nothing
 * ever fetched a URL the markup emitted.
 *
 * So the central test here is not "does the JSON-LD parse". It is: every
 * absolute URL this site asserts about itself has to resolve. That is the class
 * of bug, not the instance.
 */

/** Every `<script type="application/ld+json">` on the page, parsed. */
async function graphs(page: Page, path: string) {
  await page.goto(path)
  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()
  expect(blocks.length).toBeGreaterThan(0)
  return blocks.map((block) => JSON.parse(block) as unknown)
}

/** Every string anywhere in the graph that is an absolute URL on this origin. */
function selfUrls(value: unknown, origin: string, found = new Set<string>()) {
  if (typeof value === 'string') {
    if (value.startsWith(origin)) found.add(value)
  } else if (Array.isArray(value)) {
    for (const entry of value) selfUrls(entry, origin, found)
  } else if (value && typeof value === 'object') {
    for (const [key, entry] of Object.entries(value)) {
      // `@id` is a node identifier, not a fetchable document — `#organization`
      // is how other nodes point at this company, and it is correct that no
      // file answers on it.
      if (key === '@id') continue
      selfUrls(entry, origin, found)
    }
  }
  return found
}

test.describe('structured data', () => {
  test('every URL the graph asserts about this site resolves', async ({
    page,
    request,
    baseURL,
  }) => {
    /*
     * The graph carries production URLs — `NEXT_PUBLIC_SITE_URL` is baked in at
     * build time, so it says `https://raymarnuts.com/…` even in this run. The
     * page's own canonical tag is what names that origin, and taking it from
     * there rather than hardcoding it keeps the test working on any deployment.
     * Each URL is then re-pointed at the server under test, so what is actually
     * asserted is that the *path* exists in the export — which is the thing
     * that broke.
     */
    await page.goto('/tr')
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    const publishedOrigin = new URL(canonical ?? '').origin
    const testOrigin = new URL(baseURL ?? 'http://127.0.0.1:3210').origin

    const urls = new Set<string>()
    for (const graph of await graphs(page, '/tr')) {
      selfUrls(graph, publishedOrigin, urls)
    }

    // If this drops to nothing the test has stopped testing anything — the
    // graph names the logo, the OG image, and each product's page and photograph.
    expect(urls.size).toBeGreaterThanOrEqual(10)

    const broken: string[] = []
    for (const url of urls) {
      const response = await request.get(url.replace(publishedOrigin, testOrigin))
      if (!response.ok()) broken.push(`${url} -> ${response.status()}`)
    }
    expect(broken).toEqual([])
  })

  test('the organization is one entity, described machine-readably', async ({ page }) => {
    const [graph] = await graphs(page, '/tr')
    const nodes = (graph as { '@graph': Record<string, unknown>[] })['@graph']
    // `Organization`, not `Corporation`: the entity is a Turkish Ltd. Şti. and
    // the narrower type would claim more than is true.
    const organization = nodes.find((node) => node['@type'] === 'Organization')
    expect(organization).toBeDefined()

    // Brand and legal entity both stated, so a crawler resolves them to one
    // company rather than two competing ones.
    expect(organization?.['name']).toBe('Raymar Nuts')
    expect(String(organization?.['legalName'])).toContain('Marex')

    const address = organization?.['address'] as Record<string, string>
    expect(address['addressCountry']).toBe('TR')
    expect(address['postalCode']).toBe('34235')

    // E.164, not the human-readable form. A consumer that cannot parse the
    // number drops the property silently, so this is worth asserting exactly.
    const contact = organization?.['contactPoint'] as Record<string, string>
    expect(contact['telephone']).toMatch(/^\+\d{7,15}$/)

    // The contact address has to be on the company's own domain. A free
    // mailbox on someone else's domain is what makes an answer engine treat
    // the site and the business as two loosely related things.
    expect(contact['email']).toMatch(/@raymarnuts\.com$/)

    // Placeholders must never reach the markup: "[E-posta bilgisi eklenecek]"
    // as a machine-readable value is worse than an absent property, because a
    // consumer cannot tell it is a placeholder. Matched on the bracketed
    // wording rather than a bare `[`, which every array in the graph contains.
    expect(JSON.stringify(graph)).not.toMatch(/\[[^"\]]*eklenecek[^"\]]*\]/)

    // The registry identifiers the legal pages already publish. They are what
    // ties this site to a registered company rather than to a brand name.
    expect(organization?.['taxID']).toBe('6121008134')
    const identifier = organization?.['identifier'] as Record<string, string>
    expect(identifier['value']).toBe('0612100813400001')

    // `hasMap` is defined on Place, not on Organization: it belongs to the
    // location node, and a consumer reading the company node must not find it.
    expect(organization?.['hasMap']).toBeUndefined()
    const location = organization?.['location'] as Record<string, string>
    expect(location['@type']).toBe('Place')
    expect(location['hasMap']).toContain('google.com/maps')
  })

  test('each locale has its own WebSite node', async ({ page }) => {
    // One `@id` with two bodies is the failure this guards: a consumer that
    // merges by `@id` used to get a single node asserting two urls and two
    // languages, because `/tr` and `/en` published different WebSite bodies
    // under the same id.
    const websites: Record<string, Record<string, unknown>> = {}
    for (const locale of ['tr', 'en'] as const) {
      const [graph] = await graphs(page, `/${locale}`)
      const nodes = (graph as { '@graph': Record<string, unknown>[] })['@graph']
      const website = nodes.find((node) => node['@type'] === 'WebSite')
      expect(website, `${locale} has a WebSite node`).toBeDefined()
      websites[locale] = website as Record<string, unknown>
    }

    expect(websites['tr']?.['@id']).not.toBe(websites['en']?.['@id'])
    expect(String(websites['tr']?.['@id'])).toContain('/tr#website')
    expect(String(websites['en']?.['@id'])).toContain('/en#website')
    expect(websites['tr']?.['inLanguage']).not.toBe(websites['en']?.['inLanguage'])
  })

  test('the catalogue graph points at every product page', async ({ page }) => {
    const parsed = await graphs(page, '/tr')
    const list = parsed.find(
      (graph) => (graph as { '@type'?: string })['@type'] === 'ItemList',
    ) as { itemListElement: Record<string, unknown>[] }

    expect(list).toBeDefined()

    // Positions must be 1..n in order, or the list asserts an ordering it does
    // not have.
    expect(list.itemListElement.map((entry) => entry['position'])).toEqual(
      list.itemListElement.map((_, index) => index + 1),
    )

    /*
     * One entry per product card, in the order the cards appear, each naming
     * the page its card opens: the range, then the four walnut sizes. These
     * used to be ten `Product` nodes with no `offers`, `review` or
     * `aggregateRating` — the properties Google requires of every Product it
     * parses — so each was an invalid item waiting in Search Console. The
     * resolve test above fetches every `url` here.
     */
    expect(list.itemListElement.map((entry) => [entry['name'], entry['url']])).toEqual([
      ['Makadamya', expect.stringMatching(/\/tr\/urunler\/makadamya$/)],
      ['Pikan Cevizi', expect.stringMatching(/\/tr\/urunler\/pikan-cevizi$/)],
      [
        'Kabak Çekirdeği İçi',
        expect.stringMatching(/\/tr\/urunler\/kabak-cekirdegi-ici$/),
      ],
      ['Ay Çekirdeği İçi', expect.stringMatching(/\/tr\/urunler\/ay-cekirdegi-ici$/)],
      [
        'Çerezlik Ay Çekirdeği',
        expect.stringMatching(/\/tr\/urunler\/cerezlik-ay-cekirdegi$/),
      ],
      ['Antep Fıstığı', expect.stringMatching(/\/tr\/urunler\/antep-fistigi$/)],
      ['Yarım Ceviz İçi', expect.stringMatching(/\/tr\/urunler\/yarim-ceviz-ici$/)],
      ['Çeyrek Ceviz İçi', expect.stringMatching(/\/tr\/urunler\/ceyrek-ceviz-ici$/)],
      ['Kırık Ceviz İçi', expect.stringMatching(/\/tr\/urunler\/kirik-ceviz-ici$/)],
      ['Pirinç Ceviz İçi', expect.stringMatching(/\/tr\/urunler\/pirinc-ceviz-ici$/)],
    ])

    expect(JSON.stringify(list)).not.toContain('"Product"')
  })

  test('each legal page carries a breadcrumb back to the homepage', async ({ page }) => {
    for (const slug of LEGAL_SLUGS) {
      const parsed = await graphs(page, `/tr/${slug}`)
      const crumbs = parsed.find(
        (graph) => (graph as { '@type'?: string })['@type'] === 'BreadcrumbList',
      ) as { itemListElement: { position: number; name: string; item: string }[] }

      expect(crumbs, `no BreadcrumbList on /tr/${slug}`).toBeDefined()
      expect(crumbs.itemListElement).toHaveLength(2)
      expect(crumbs.itemListElement[0].item).toMatch(/\/tr$/)
      expect(crumbs.itemListElement[1].item).toMatch(new RegExp(`${slug}$`))

      // The second crumb names the document the reader is actually on.
      const heading = await page.locator('h1').first().textContent()
      expect(crumbs.itemListElement[1].name).toBe(heading?.trim())
    }
  })
})
