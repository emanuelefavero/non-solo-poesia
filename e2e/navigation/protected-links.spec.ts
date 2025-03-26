import { expect, test } from '@playwright/test'

test('Create new post link is not visible when authenticated', async ({
  page,
}) => {
  await page.goto('/')
  const link = page.locator('a[title="Crea nuovo post"]')
  await expect(link).not.toBeVisible()
})

test('Modify post link is not visible when authenticated', async ({ page }) => {
  await page.goto('/post/sogni-nella-notte')
  const link = page.locator('a:has-text("Modifica")')
  await expect(link).not.toBeVisible()
})
