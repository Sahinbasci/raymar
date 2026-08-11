import { expect, test, type Page } from '@playwright/test'

async function gotoForm(page: Page) {
  await page.goto('/tr')
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    document.getElementById('teklif')?.scrollIntoView()
  })
}

test.describe('quotation form', () => {
  test('blocks submission and reports missing required fields', async ({ page }) => {
    await gotoForm(page)

    await page.getByRole('button', { name: 'Talebi Gönder' }).click()

    const alert = page.locator('#teklif').getByRole('alert')
    await expect(alert).toBeVisible()
    await expect(alert).toContainText('zorunlu alanları')

    // Still on the form; the success panel must not appear.
    await expect(page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' })).toHaveCount(0)
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

    await expect(page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' })).toBeVisible()
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
      .getByRole('button', { name: 'Teklif Talep Et' })
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
    await expect(page.locator('#teklif').getByRole('heading', { name: 'Talebiniz alındı.' })).toBeVisible()

    const leaked = logs.filter((line) => /gizli/i.test(line))
    expect(leaked, `leaked: ${leaked.join(' | ')}`).toEqual([])
  })
})
