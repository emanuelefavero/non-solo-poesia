import { DEVELOPER_URL } from '@/data/url'
import { expect, test } from '@playwright/test'

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
