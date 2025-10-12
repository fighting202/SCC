import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays hero section with correct content', async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole('heading', { name: /safe.*seamless.*journey/i })).toBeVisible()

    // Check for CTA button
    const consultationButton = page.getByRole('button', { name: /consultation/i }).first()
    await expect(consultationButton).toBeVisible()
  })

  test('has accessible navigation', async ({ page }) => {
    // Check for navigation buttons
    await expect(page.getByRole('button', { name: /view services/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /how it works/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /view packages/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /faq/i })).toBeVisible()
  })

  test('scrolls to sections when navigation buttons are clicked', async ({ page }) => {
    // Click on "View Services"
    await page.getByRole('button', { name: /view services/i }).click()

    // Wait for scroll animation
    await page.waitForTimeout(1000)

    // Check if services section is visible
    const servicesSection = page.locator('#services')
    await expect(servicesSection).toBeInViewport()
  })

  test('displays contact section', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Check for contact section
    await expect(page.getByText(/get started today/i)).toBeVisible()
    await expect(page.getByText(/whatsapp/i).first()).toBeVisible()
    await expect(page.getByText(/wechat/i).first()).toBeVisible()
    await expect(page.getByText(/email/i).first()).toBeVisible()
  })

  test('opens contact links correctly', async ({ page, context }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Test WhatsApp link (opens in new tab)
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByText(/whatsapp/i).first().click()
    ])

    expect(newPage.url()).toContain('wa.me')
    await newPage.close()
  })
})
