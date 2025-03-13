import { categories } from '@/data/categories'
import { TEST_EMAIL } from '@/data/email'
import { POST_NOT_FOUND_MESSAGE } from '@/data/post'
import { TITLE } from '@/data/title'
import { expect, Page, test } from '@playwright/test'

async function checkTitle(page: Page, url: string, expectedTitle: string) {
  await page.goto(url)
  await expect(page).toHaveTitle(expectedTitle)
}

test('Homepage has correct title', async ({ page }) => {
  await checkTitle(page, '/', TITLE)
})

test('Category page has correct title', async ({ page }) => {
  const category = categories[0]
  await checkTitle(
    page,
    `/categoria/${category.slug}`,
    `${category.name} - ${TITLE}`,
  )
})

test('Search page has correct title', async ({ page }) => {
  await checkTitle(page, '/cerca', `Cerca - ${TITLE}`)
})

test('Newsletter success page has correct title', async ({ page }) => {
  await checkTitle(
    page,
    `/newsletter-success?email=${TEST_EMAIL}`,
    `Iscrizione completata - ${TITLE}`,
  )
})

test('Post detail page has correct title', async ({ page }) => {
  await checkTitle(
    page,
    '/post/sogni-nella-notte',
    `Sogni nella Notte - ${TITLE}`,
  )
})

test('Post detail page has correct title when post is not found', async ({
  page,
}) => {
  await checkTitle(page, '/post/non-existent-post', POST_NOT_FOUND_MESSAGE)
})

test('Unsubscribe page has correct title', async ({ page }) => {
  await checkTitle(
    page,
    `/unsubscribe?email=${TEST_EMAIL}`,
    `Annulla iscrizione - ${TITLE}`,
  )
})
