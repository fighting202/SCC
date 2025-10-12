import { test, expect } from '@playwright/test'

test.describe('Inquiry Form Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens Tally form when consultation button is clicked', async ({ page, context }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Get the consultation button
    const consultationButton = page.getByRole('button', { name: /consultation/i }).first()
    await expect(consultationButton).toBeVisible()

    // Click the button
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      consultationButton.click()
    ])

    // Verify Tally URL
    expect(newPage.url()).toContain('tally.so')

    await newPage.close()
  })

  test('displays inquiry form correctly on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/')

    // Check if elements are visible and properly sized on mobile
    const consultationButton = page.getByRole('button', { name: /consultation/i }).first()
    await expect(consultationButton).toBeVisible()

    const buttonBox = await consultationButton.boundingBox()
    expect(buttonBox?.width).toBeGreaterThan(200) // Should be wide enough on mobile
  })

  test('scrolls to contact section smoothly', async ({ page }) => {
    // Click on a navigation link that should scroll
    const button = page.getByRole('button', { name: /view services/i })
    await button.click()

    // Wait for scroll animation
    await page.waitForTimeout(1000)

    // Verify scroll occurred
    const scrollY = await page.evaluate(() => window.scrollY)
    expect(scrollY).toBeGreaterThan(0)
  })
})
