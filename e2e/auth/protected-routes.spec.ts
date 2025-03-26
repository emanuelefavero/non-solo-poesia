import { expect, test } from '@playwright/test'

test('Create new post page can be accessed when authenticated', async ({
  page,
}) => {
  // Navigate to the protected page
  await page.goto('/crea-nuovo-post')

  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Crea nuovo post/i)
})

test('Modify post page can be accessed when authenticated', async ({
  page,
}) => {
  // Navigate to the protected page
  await page.goto('/modifica-post/sogni-nella-notte')

  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Sogni nella Notte/i)
})
