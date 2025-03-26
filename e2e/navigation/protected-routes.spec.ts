import { expect, test } from '@playwright/test'

test('Create new post page cannot be accessed when not authenticated', async ({
  page,
}) => {
  // Navigate to the protected page
  await page.goto('/crea-nuovo-post')

  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Ultimi Post/i)
})
