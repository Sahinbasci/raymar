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
  /*
   * What the browser does when this form's JavaScript has not run.
   *
   * With no `method` and no `action` the default is a GET to the current page,
   * which put the enquirer's name, e-mail, phone and message into the URL —
   * the access log, the history and every later Referer — and delivered
   * nothing. These attributes are the whole no-JavaScript path, so they are
   * asserted rather than assumed.
   */
  test('posts to the endpoint even with no JavaScript', async ({ page }) => {
    await page.goto('/tr')
    const form = page.locator('#teklif form')

    await expect(form).toHaveAttribute('method', /post/i)
    await expect(form).toHaveAttribute('action', '/teklif-gonder.php')

    // The endpoint answers a form post with an HTML page, and needs to know
    // which language to answer in.
    await expect(form.locator('input[name="locale"]')).toHaveValue('tr')
    await expect(page.locator('#teklif noscript')).toHaveCount(1)

    const enForm = page.locator('#teklif form')
    await page.goto('/en')
    await expect(enForm.locator('input[name="locale"]')).toHaveValue('en')
  })

  /*
   * The caps the endpoint enforces, mirrored on the controls.
   *
   * Without them a buyer pasting a full specification into the message box got
   * a bare "try again" from a 400 they could not see the reason for, and
   * retrying identically failed forever.
   */
  test('caps every field at the length the endpoint accepts', async ({ page }) => {
    await page.goto('/tr')
    const caps: Record<string, string> = {
      name: '120',
      company: '160',
      email: '200',
      phone: '40',
      message: '4000',
    }
    for (const [field, cap] of Object.entries(caps)) {
      await expect(
        page.locator(`#teklif [name="${field}"]`),
        `${field} is capped`,
      ).toHaveAttribute('maxlength', cap)
    }
  })

  /*
   * The honeypot must stay invisible to people and uninteresting to autofill.
   * It was called `website`, which is exactly the name a password manager
   * fills by heuristic — and a filled honeypot is treated as a bot, so a real
   * enquiry was dropped while its sender saw the success panel.
   */
  test('the honeypot is not a field autofill recognises', async ({ page }) => {
    await page.goto('/tr')
    await expect(page.locator('#teklif [name="website"]')).toHaveCount(0)
    const honeypot = page.locator('#teklif [name="sube-kodu"]')
    await expect(honeypot).toHaveCount(1)
    await expect(honeypot).not.toBeInViewport()
    await expect(honeypot).toHaveAttribute('tabindex', '-1')
    await expect(honeypot).toHaveAttribute('autocomplete', 'new-password')
  })

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
    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await page.getByLabel('E-posta *').fill('not-an-email')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Antep Fıstığı')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(page.locator('#teklif').getByRole('alert')).toBeVisible()
    await expect(page.getByLabel('E-posta *')).toHaveAttribute('aria-invalid', 'true')
  })

  test('country selection sets the phone field dial-code prefix', async ({ page }) => {
    await gotoForm(page)

    // The chip is a decorative `aria-hidden` sibling of the phone `<input>`,
    // not part of its value — Raymar is a global company, so no dial code may
    // be assumed before a country is actually chosen.
    const dialCodeChip = page
      .locator('#teklif')
      .locator('span[aria-hidden="true"]')
      .filter({ hasText: /^\+\d+$/ })
    await expect(dialCodeChip).toHaveCount(0)

    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await expect(dialCodeChip).toHaveText('+90')

    // Changing the country swaps the code rather than stacking a second chip.
    await page.getByLabel('Ülke *').selectOption({ label: 'Almanya' })
    await expect(dialCodeChip).toHaveCount(1)
    await expect(dialCodeChip).toHaveText('+49')
  })

  test('requires the KVKK consent box and says so specifically', async ({ page }) => {
    await gotoForm(page)

    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Antep Fıstığı')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(page.locator('#teklif').getByRole('alert')).toContainText('KVKK')
  })

  test('accepts a complete submission and summarises it', async ({ page }) => {
    // The endpoint is stubbed rather than exercised, because a green run must
    // not depend on delivery credentials being present in the environment.
    // What the real endpoint does with the request is asserted separately, in
    // tests/e2e/quote-api.spec.ts, against the running route.
    await page.route('**/teklif-gonder.php', (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    )

    await gotoForm(page)

    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('Telefon').fill('532 111 22 33')
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
    // The summary must show a callable number, not the bare local digits the
    // visitor actually typed.
    await expect(
      page.locator('#teklif dd').filter({ hasText: /^\+90 532 111 22 33$/ }),
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
      .filter({ hasText: 'Makadamya' })
      .getByRole('link', { name: 'Teklif Talep Et' })
      .click()

    await expect(page.getByLabel('İlgilenilen Ürün *')).toHaveValue('Makadamya')
    await expect(page.getByLabel('Talep Mesajı *')).toContainText('Makadamya')
  })

  test('does not log submitted values to the console', async ({ page }) => {
    const logs: string[] = []
    page.on('console', (message) => logs.push(message.text()))

    await page.route('**/teklif-gonder.php', (route) =>
      route.fulfill({ status: 200, json: { ok: true } }),
    )

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Gizli Kullanıcı')
    await page.getByLabel('Firma *').fill('Gizli A.Ş.')
    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await page.getByLabel('E-posta *').fill('gizli@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Antep Fıstığı')
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
    await page.route('**/teklif-gonder.php', (route) =>
      route.fulfill({ status: 503, json: { ok: false } }),
    )

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Antep Fıstığı')
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

  /*
   * A 429 is the per-IP limit, which is ten minutes wide. "Please try again"
   * is advice that cannot work inside it, so the form says something else —
   * and both messages name the phone and the e-mail, which do work.
   */
  test('says what a rate-limited submission actually means', async ({ page }) => {
    await page.route('**/teklif-gonder.php', (route) =>
      route.fulfill({ status: 429, json: { ok: false } }),
    )

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Antep Fıstığı')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    const alert = page.locator('#teklif').getByRole('alert')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText('çok fazla talep')
    await expect(alert).toContainText('info@raymarnuts.com')
  })

  test('survives a network failure without a false success', async ({ page }) => {
    await page.route('**/teklif-gonder.php', (route) => route.abort())

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Test Kullanıcı')
    await page.getByLabel('Firma *').fill('Test A.Ş.')
    await page.getByLabel('Ülke *').selectOption({ label: 'Türkiye' })
    await page.getByLabel('E-posta *').fill('test@firma.com')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Antep Fıstığı')
    await page.getByLabel('Talep Mesajı *').fill('Numune talebi.')
    await page.locator('#teklif').getByRole('checkbox').check()

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    await expect(page.locator('#teklif').getByRole('alert')).toBeVisible()
    // Not stuck on the spinner: the control must be usable again.
    await expect(page.getByRole('button', { name: 'Talebi Gönder' })).toBeEnabled()
  })

  test('sends the typed values to the endpoint', async ({ page }) => {
    let body: Record<string, unknown> | undefined

    await page.route('**/teklif-gonder.php', async (route) => {
      body = route.request().postDataJSON()
      await route.fulfill({ status: 200, json: { ok: true } })
    })

    await gotoForm(page)
    await page.getByLabel('Ad Soyad *').fill('Ayşe Yılmaz')
    await page.getByLabel('Firma *').fill('Örnek Gıda')
    await page.getByLabel('Ülke *').selectOption({ label: 'Almanya' })
    await page.getByLabel('E-posta *').fill('ayse@ornek.de')
    await page.getByLabel('Telefon').fill('151 234 56 78')
    await page.getByLabel('İlgilenilen Ürün *').selectOption('Antep Fıstığı')
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
      // The country's dial code travels with the number on the wire, not just
      // as a visual chip — Raymar's staff must receive a callable number.
      phone: '+49 151 234 56 78',
      product: 'Antep Fıstığı',
      message: '20 ton fındık talebi.',
      consent: true,
      // The honeypot must go over the wire empty, or the server drops the lead.
      'sube-kodu': '',
    })
  })
})
