import { expect, test } from '@playwright/test'

// * Authenticated tests
test('Create new post page can be accessed when authenticated', async ({
  page,
}) => {
  // Navigate to the protected page
  await page.goto('/crea-nuovo-post')

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded')

  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Crea nuovo post/i)
})

test('Modify post page can be accessed when authenticated', async ({
  page,
}) => {
  // Navigate to the protected page
  await page.goto('/modifica-post/sogni-nella-notte')

  // Wait for the page to load
  await page.waitForLoadState('domcontentloaded')

  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Sogni nella Notte/i)
})
