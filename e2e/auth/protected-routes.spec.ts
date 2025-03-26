import { expect, test } from '@playwright/test'

test('Create new post page can be accessed when authenticated with admin user', async ({
  page,
}) => {
  // Navigate to the protected page
  await page.goto('/crea-nuovo-post')

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded')

  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Crea nuovo post/i)
})
