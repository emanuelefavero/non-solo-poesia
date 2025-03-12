import { categories } from '@/data/categories'
import { TEST_EMAIL } from '@/data/email'
import { POST_NOT_FOUND_MESSAGE } from '@/data/post'
import { TITLE } from '@/data/title'
import { expect, test } from '@playwright/test'

test('Homepage has correct title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(TITLE)
})

test('Category page has correct title', async ({ page }) => {
  const category = categories[0]
  const { name } = category

  await page.goto(`/categoria/${category.slug}`)
  await expect(page).toHaveTitle(`${name} - ${TITLE}`)
})

test('Search page has correct title', async ({ page }) => {
  await page.goto('/cerca')
  await expect(page).toHaveTitle(`Cerca - ${TITLE}`)
})

test('Newsletter success page has correct title', async ({ page }) => {
  // ? pass email query param to prevent redirect
  await page.goto(`/newsletter-success?email=${TEST_EMAIL}`)
  await expect(page).toHaveTitle(`Iscrizione completata - ${TITLE}`)
})

test('Post detail page has correct title', async ({ page }) => {
  const postSlug = 'sogni-nella-notte'
  const postTitle = 'Sogni nella Notte'

  await page.goto(`/post/${postSlug}`)
  await expect(page).toHaveTitle(`${postTitle} - ${TITLE}`)
})

test('Post detail page has correct title when post is not found', async ({
  page,
}) => {
  const postSlug = 'non-existent-post'

  await page.goto(`/post/${postSlug}`)
  await expect(page).toHaveTitle(POST_NOT_FOUND_MESSAGE)
})

test('Unsubscribe page has correct title', async ({ page }) => {
  // ? pass email query param to prevent redirect
  await page.goto(`/unsubscribe?email=${TEST_EMAIL}`)
  await expect(page).toHaveTitle(`Annulla iscrizione - ${TITLE}`)
})
