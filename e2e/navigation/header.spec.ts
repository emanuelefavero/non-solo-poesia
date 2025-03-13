import { expect, test } from '@playwright/test'

test('Clicking on the search icon navigates to the search page', async ({
  page,
}) => {
  await page.goto('/')
  await page.click('[aria-label="Cerca post"]')
  await expect(page).toHaveURL('/cerca')
})

test('Clicking on the logo navigates to the homepage', async ({ page }) => {
  await page.goto('/cerca')
  await page.click('header a[href="/"]')
  await expect(page).toHaveURL('/')
})
