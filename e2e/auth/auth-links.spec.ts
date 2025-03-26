import { expect, test } from '@playwright/test'

test('Create new post link is visible when authenticated', async ({ page }) => {
  await page.goto('/')
  const link = page.locator('a[title="Crea nuovo post"]')
  await expect(link).toBeVisible()
})
