import { expect, test } from '@playwright/test'

test('Create new post link is visible when authenticated', async ({ page }) => {
  await page.goto('/')
  const link = page.locator('a[title="Crea nuovo post"]')
  await expect(link).toBeVisible()
})

test('Modify post link is visible when authenticated', async ({ page }) => {
  await page.goto('/post/sogni-nella-notte')
  const link = page.locator('a:has-text("Modifica")')
  await expect(link).toBeVisible()
})

test('Delete post button is visible when authenticated', async ({ page }) => {
  await page.goto('/post/sogni-nella-notte')
  const link = page.locator('button:has-text("Elimina")')
  await expect(link).toBeVisible()
})
