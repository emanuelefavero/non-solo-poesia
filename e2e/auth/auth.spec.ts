import { clerk } from '@clerk/testing/playwright'
import { expect, test } from '@playwright/test'

test('Sign out with Clerk', async ({ page }) => {
  await page.goto('/')

  // Sign out
  await clerk.signOut({ page })

  // Go to a protected page and wait for the page to load
  await page.goto('/crea-nuovo-post')
  await page.waitForLoadState('domcontentloaded')

  // Should be redirected to the home page
  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Ultimi Post/i)
})
