import { TITLE } from '@/data/title'
import { expect, test } from '@playwright/test'

test('Homepage has correct title', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(TITLE)
})
