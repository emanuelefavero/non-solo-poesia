import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { TEST_EMAIL } from '@/data/email'
import { TITLE } from '@/data/title'
import { expect, test } from '@playwright/test'

test('Homepage has correct description', async ({ page }) => {
  await page.goto('/')

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')

  expect(description).toBe(
    `Un blog di poesie e racconti scritti da ${authors[0].name}`,
  )
})

// `Un blog di poesie e racconti scritti da ${authors[0].name}`

test('Category page has correct description', async ({ page }) => {
  const category = categories[0]
  const { name } = category

  await page.goto(`/categoria/${category.slug}`)

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')

  expect(description).toBe(`Tutti i post di ${TITLE} nella categoria ${name}.`)
})

test('Search page has correct description', async ({ page }) => {
  await page.goto('/cerca')

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')

  expect(description).toBe(
    `Cerca un post nel blog ${TITLE} digitando una parola chiave del titolo`,
  )
})

test('Newsletter success page has correct description', async ({ page }) => {
  // ? pass email query param to prevent redirect
  await page.goto(`/newsletter-success?email=${TEST_EMAIL}`)

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')

  expect(description).toBe(
    `Grazie per esserti iscritto alla newsletter! Presto riceverai i nostri ultimi post direttamente nella tua casella di posta`,
  )
})

test('Post detail page has correct description', async ({ page }) => {
  const postSlug = 'sogni-nella-notte'

  await page.goto(`/post/${postSlug}`)

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')

  expect(description).toBe(
    'Una poesia che cattura la magia della notte, dove i sogni si intrecciano con i desideri',
  )
})
