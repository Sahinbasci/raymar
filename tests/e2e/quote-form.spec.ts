import { expect, test, type Page } from '@playwright/test'

async function gotoForm(page: Page) {
  await page.goto('/tr')
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    document.getElementById('teklif')?.scrollIntoView()
  })
}

/**
 * Budget for the success panel to replace the form after a submit.
 *
 * `submitQuoteRequest` sleeps 600ms on purpose so the loading state is
 * exercised, and the panel swap is animated on top of that. Against the default
 * 5s that left little headroom, and with seven projects running in parallel on
 * one machine the two submitting tests were observed failing roughly once every
 * eighteen full runs — never in isolation, which is the signature of contention
 * rather than a product defect. Both assertions that wait on the panel use this.
 */
const SUBMIT_TIMEOUT = 15_000

test.describe('quotation form', () => {
  test('blocks submission and reports missing required fields', async ({ page }) => {
    await gotoForm(page)

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    const alert = page.locator('#teklif').getByRole('alert')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText('zorunlu alanları')

    // Still on the form; the success panel must not appear.
    await expect(
      page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' }),
    ).toHaveCount(0)
  })

  test('rejects a malformed email address', async ({ page }) => {
    await gotoForm(page)

    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').fill('Türkiye')
    await page.getByLabel('E-posta *').fill('not-an-email')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Fındık')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(page.locator('#teklif').getByRole('alert')).toBeVisible()
    await expect(page.getByLabel('E-posta *')).toHaveAttribute('aria-invalid', 'true')
  })

  test('requires the KVKK consent box and says so specifically', async ({ page }) => {
    await gotoForm(page)

    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').fill('Türkiye')
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Fındık')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(page.locator('#teklif').getByRole('alert')).toContainText('KVKK')
  })

  test('accepts a complete submission and summarises it', async ({ page }) => {
    // The endpoint is stubbed rather than exercised, because a green run must
    // not depend on delivery credentials being present in the environment.
    // What the real endpoint does with the request is asserted separately, in
    // tests/e2e/quote-api.spec.ts, against the running route.
    await page.route('**/api/quote', (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    )

    await gotoForm(page)

    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').fill('Türkiye')
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Ceviz İçi')
    await page.getByLabel('Talep Mesajı *').fill('20 ton ceviz içi talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(
      page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' }),
    ).toBeVisible({ timeout: SUBMIT_TIMEOUT })
    await expect(
      page.locator('#teklif').getByText('20 ton ceviz içi talebi.'),
    ).toBeVisible()
    await expect(
      page.locator('#teklif dd').filter({ hasText: /^Ceviz İçi$/ }),
    ).toBeVisible()

    await page.getByRole('button', { name: 'Yeni talep oluştur' }).click()
    await expect(page.getByLabel('Ad Soyad *')).toHaveValue('')
  })

  test('a product card prefills the form with that product', async ({ page }) => {
    await page.goto('/tr')
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto'
      document.getElementById('urunlerimiz')?.scrollIntoView()
    })

    await page
      .locator('#urunlerimiz article')
      .filter({ hasText: 'Makademya' })
      .getByRole('link', { name: 'Teklif Talep Et' })
      .click()

    await expect(page.getByLabel('İlgilenilen Ürün *')).toHaveValue('Makademya')
    await expect(page.getByLabel('Talep Mesajı *')).toContainText('Makademya')
  })

  test('does not log submitted values to the console', async ({ page }) => {
    const logs: string[] = []
    page.on('console', (message) => logs.push(message.text()))

    await page.route('**/api/quote', (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    )

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Gizli Kullanıcı')
    await page.getByLabel('Firma *').fill('Gizli A.Ş.')
    await page.getByLabel('Ülke *').fill('Türkiye')
    await page.getByLabel('E-posta *').fill('gizli@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Fındık')
    await page.getByLabel('Talep Mesajı *').fill('Gizli mesaj.')
    await page.locator('#teklif').getByRole('checkbox').check()
    await page.getByRole('button', { name: 'Talebi Gönder' }).click()
    await expect(
      page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' }),
    ).toBeVisible({ timeout: SUBMIT_TIMEOUT })

    const leaked = logs.filter((line) => /gizli/i.test(line))
    expect(leaked, `leaked: ${leaked.join(' | ')}`).toEqual([])
  })

  /*
   * The failure path matters more than the happy one here.
   *
   * The form previously reported success unconditionally, so a deployment with
   * no delivery configured thanked every buyer for an enquiry it had discarded.
   * These two assert the opposite contract: when the message does not get
   * through, the visitor is told so and their typing survives, so they can
   * retry or pick up the phone.
   */
  test('reports failure instead of a false success when delivery fails', async ({
    page,
  }) => {
    await page.route('**/api/quote', (route) =>
      route.fulfill({ status: 503, json: { ok: false } }),
    )

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').fill('Türkiye')
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Fındık')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(page.locator('#teklif').getByRole('alert')).toBeVisible()
    await expect(
      page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' }),
    ).toBeHidden()

    // The visitor must not have to retype anything to try again.
    await expect(page.getByLabel('Ad Soyad *')).toHaveValue('Test Kullanıcı')
    await expect(page.getByLabel('Talep Mesajı *')).toHaveValue('Numune talebi.')
  })

  test('survives a network failure without a false success', async ({ page }) => {
    await page.route('**/api/quote', (route) => route.abort())

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').fill('Türkiye')
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Fındık')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(page.locator('#teklif').getByRole('alert')).toBeVisible()
    // Not stuck on the spinner: the control must be usable again.
    await expect(page.getByRole('button', { name: 'Talebi Gönder' })).toBeEnabled()
  })

  test('sends the typed values to the endpoint', async ({ page }) => {
    let body: Record<string, unknown> | undefined

    await page.route('**/api/quote', async (route) => {
      body = route.request().postDataJSON()
      await route.fulfill({ status: 200, json: { ok: true } })
    })

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Ayşe Yılmaz')
    await page.getByLabel('Firma *').fill('Örnek Gıda')
    await page.getByLabel('Ülke *').fill('Almanya')
    await page.getByLabel('E-posta *').fill('ayse@ornek.de')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Fındık')
    await page.getByLabel('Talep Mesajı *').fill('20 ton fındık talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()
    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(
      page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' }),
    ).toBeVisible({ timeout: SUBMIT_TIMEOUT })

    expect(body).toMatchObject({
      name: 'Ayşe Yılmaz',
      company: 'Örnek Gıda',
      country: 'Almanya',
      email: 'ayse@ornek.de',
      product: 'Fındık',
      message: '20 ton fındık talebi.',
      consent: true,
      // The honeypot must go over the wire empty, or the server drops the lead.
      website: '',
    })
  })
})
