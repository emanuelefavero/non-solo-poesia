import { expect, test } from '@playwright/test'

test('Clicking on the search icon navigates to the search page', async ({
  page,
}) => {
  await page.goto('/')
  await page.click('[aria-label="Cerca post"]')
  await expect(page).toHaveURL('/cerca')
})
