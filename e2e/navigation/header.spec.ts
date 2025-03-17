import { categories } from '@/data/categories'
import { DEVELOPER_URL } from '@/data/url'
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

test('Clicking on a category link navigates to the category page', async ({
  page,
}) => {
  await page.goto('/')
  await page.click(`[aria-label="Vai a ${categories[0].name}"]`)
  await expect(page).toHaveURL(`/categoria/${categories[0].slug}`)
})

test('Clicking on privacy policy link navigates to the privacy policy page', async ({
  page,
}) => {
  await page.goto('/')
  await page.click('footer a[href="/informativa-sulla-privacy"]')
  await expect(page).toHaveURL('/informativa-sulla-privacy')
})

test('Clicking on the developer link navigates to the developer page', async ({
  page,
  context,
}) => {
  // NOTE: The link opens in a new tab so we need to listen for the new page event
  await page.goto('/')
  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // ? listen for the new page event
    page.click(`footer a[href="${DEVELOPER_URL}"]`),
  ])

  await newPage.waitForLoadState() // ? wait for the new page to load
  await expect(newPage).toHaveURL(`${DEVELOPER_URL}`)
})
