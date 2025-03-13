import { authors } from '@/data/authors'
import { expect, test } from '@playwright/test'

test('Homepage has correct description', async ({ page }) => {
  await page.goto('/')
  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')
  expect(description).toBe(
    `Un blog di poesie e racconti scritti da ${authors[0].name}`,
  )
})
