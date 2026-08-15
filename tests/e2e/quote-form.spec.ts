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
})
