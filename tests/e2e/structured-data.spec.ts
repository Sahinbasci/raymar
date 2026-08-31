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
    // graph names the logo, the OG image and nine product photographs.
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
    const organization = nodes.find((node) => node['@type'] === 'Corporation')
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
  })

  test('the catalogue graph names every product the page sells', async ({ page }) => {
    const parsed = await graphs(page, '/tr')
    const list = parsed.find(
      (graph) => (graph as { '@type'?: string })['@type'] === 'ItemList',
    ) as { itemListElement: { position: number; item: Record<string, unknown> }[] }

    expect(list).toBeDefined()
    expect(list.itemListElement.length).toBeGreaterThanOrEqual(10)

    // Positions must be 1..n in order, or the list asserts an ordering it does
    // not have.
    expect(list.itemListElement.map((entry) => entry.position)).toEqual(
      list.itemListElement.map((_, index) => index + 1),
    )

    for (const { item } of list.itemListElement) {
      expect(item['@type']).toBe('Product')
      expect(String(item['name']).length).toBeGreaterThan(0)
    }

    // Every product card visible on the page should be in the graph. Pikan has
    // no photograph yet, so image presence is deliberately not asserted per
    // item — the resolve test above covers the ones that are there.
    const names = list.itemListElement.map((entry) => String(entry.item['name']))
    for (const expected of ['Kırık Ceviz İçi', 'Çeyrek Ceviz İçi', 'Pikan Cevizi']) {
      expect(names).toContain(expected)
    }
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
