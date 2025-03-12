import { TITLE } from '@/data/title'
import { expect, test } from '@playwright/test'

test('Homepage has correct title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(TITLE)
})

test('Search page has correct title', async ({ page }) => {
  await page.goto('/cerca')
  await expect(page).toHaveTitle(`Cerca - ${TITLE}`)
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
  await expect(page).toHaveTitle('Post non trovato')
})
