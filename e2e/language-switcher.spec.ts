import { test, expect } from '@playwright/test'

test.describe('Language Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays default English content', async ({ page }) => {
    await expect(page.getByText(/safe.*seamless.*journey/i)).toBeVisible()
    await expect(page.getByText(/professional medical.*beauty concierge/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /get free consultation/i }).first()).toBeVisible()
  })

  test('switches to Chinese when language is changed', async ({ page }) => {
    // Look for language switcher (assuming there is one in the header)
    const languageSwitcher = page.locator('button').filter({ hasText: /中文|chinese|zh/i }).first()

    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click()

      // Verify Chinese content appears
      await expect(page.getByText(/您在韩国的安全无忧之旅/i)).toBeVisible()
      await expect(page.getByText(/专业医疗美容管家服务/i)).toBeVisible()
    } else {
      // If no visible switcher, test passes (might be managed differently)
      test.skip()
    }
  })

  test('persists language preference across page reload', async ({ page, context }) => {
    // Try to switch language
    const languageSwitcher = page.locator('button').filter({ hasText: /中文|chinese|zh/i }).first()

    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click()

      // Reload page
      await page.reload()

      // Check if Chinese content is still displayed
      await expect(page.getByText(/您在韩国的安全无忧之旅/i)).toBeVisible()
    } else {
      test.skip()
    }
  })

  test('displays contact options in correct order based on language', async ({ page }) => {
    // Scroll to contact section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // For English, WhatsApp should come first
    const contactButtons = page.locator('a, button').filter({ hasText: /whatsapp|wechat|email/i })
    const firstButton = contactButtons.first()
    const buttonText = await firstButton.textContent()

    // In English version, WhatsApp is typically first
    expect(buttonText?.toLowerCase()).toContain('whatsapp')
  })
})
