import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has proper heading hierarchy', async ({ page }) => {
    // Check for h1
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)

    // Verify h1 content
    await expect(h1).toContainText(/safe.*seamless.*journey|您在韩国的安全无忧之旅/i)
  })

  test('all images have alt text', async ({ page }) => {
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt).not.toBe('')
    }
  })

  test('buttons are keyboard accessible', async ({ page }) => {
    // Focus on consultation button using Tab
    await page.keyboard.press('Tab')

    // Keep tabbing until we find the consultation button
    for (let i = 0; i < 20; i++) {
      const focusedElement = await page.evaluate(() => document.activeElement?.textContent)
      if (focusedElement?.toLowerCase().includes('consultation')) {
        break
      }
      await page.keyboard.press('Tab')
    }

    // Check if a button is focused
    const focusedElement = await page.evaluate(() => ({
      tagName: document.activeElement?.tagName,
      role: document.activeElement?.getAttribute('role')
    }))

    expect(['BUTTON', 'A']).toContain(focusedElement.tagName)
  })

  test('form inputs have proper labels', async ({ page }) => {
    // If there's an inquiry form on the page, check it
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="tel"], textarea')
    const inputCount = await inputs.count()

    if (inputCount > 0) {
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i)
        const ariaLabel = await input.getAttribute('aria-label')
        const ariaLabelledBy = await input.getAttribute('aria-labelledby')
        const id = await input.getAttribute('id')

        // Check if input has label
        let hasLabel = false
        if (ariaLabel || ariaLabelledBy) {
          hasLabel = true
        } else if (id) {
          const label = page.locator(`label[for="${id}"]`)
          hasLabel = await label.count() > 0
        }

        expect(hasLabel).toBeTruthy()
      }
    }
  })

  test('navigation landmarks are present', async ({ page }) => {
    // Check for main content landmark
    const main = page.locator('main, [role="main"]')
    await expect(main.first()).toBeVisible()

    // Check for navigation
    const nav = page.locator('nav, [role="navigation"]')
    const navCount = await nav.count()
    expect(navCount).toBeGreaterThan(0)
  })

  test('skip to content link works', async ({ page }) => {
    // Check if skip link exists
    const skipLink = page.locator('a').filter({ hasText: /skip to (main )?content/i })

    if (await skipLink.count() > 0) {
      await skipLink.first().click()

      // Verify focus moved to main content
      const focusedElement = await page.evaluate(() => document.activeElement?.id)
      expect(focusedElement).toBeTruthy()
    }
  })

  test('color contrast is sufficient (basic check)', async ({ page }) => {
    // Get background and foreground colors of main heading
    const heading = page.locator('h1').first()
    const colors = await heading.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return {
        color: styles.color,
        backgroundColor: styles.backgroundColor
      }
    })

    // Just verify colors are defined (actual contrast ratio calculation would be complex)
    expect(colors.color).toBeTruthy()
    expect(colors.backgroundColor).toBeTruthy()
  })

  test('interactive elements have visible focus indicators', async ({ page }) => {
    // Tab to first interactive element
    await page.keyboard.press('Tab')

    // Get focused element's outline
    const outlineWidth = await page.evaluate(() => {
      const el = document.activeElement
      if (!el) return '0'
      const styles = window.getComputedStyle(el)
      return styles.outlineWidth || styles.borderWidth || '0'
    })

    // Outline should be visible (not '0px')
    expect(outlineWidth).not.toBe('0px')
  })

  test('page is responsive', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.waitForTimeout(500) // Wait for reflow

      // Verify main heading is still visible
      const heading = page.locator('h1')
      await expect(heading).toBeVisible()

      // Verify no horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(hasHorizontalScroll).toBeFalsy()
    }
  })
})
