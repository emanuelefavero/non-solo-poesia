import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { TEST_EMAIL } from '@/data/email'
import { TITLE } from '@/data/title'
import { expect, Page, test } from '@playwright/test'

const defaultDescription = `Un blog di poesie e racconti scritti da ${authors[0].name}`

async function checkMetaDescription(
  page: Page,
  url: string,
  expectedDescription: string,
) {
  await page.goto(url)
  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')
  expect(description).toBe(expectedDescription)
}

// * TESTS
test('Homepage has correct description', async ({ page }) => {
  await checkMetaDescription(page, '/', defaultDescription)
})

test('Category page has correct description', async ({ page }) => {
  const category = categories[0]
  await checkMetaDescription(
    page,
    `/categoria/${category.slug}`,
    `Tutti i post di ${TITLE} nella categoria ${category.name}.`,
  )
})

test('Search page has correct description', async ({ page }) => {
  await checkMetaDescription(
    page,
    '/cerca',
    `Cerca un post nel blog ${TITLE} digitando una parola chiave del titolo`,
  )
})

test('Newsletter success page has correct description', async ({ page }) => {
  await checkMetaDescription(
    page,
    `/newsletter-success?email=${TEST_EMAIL}`,
    `Grazie per esserti iscritto alla newsletter! Presto riceverai i nostri ultimi post direttamente nella tua casella di posta`,
  )
})

test('Post detail page has correct description', async ({ page }) => {
  await checkMetaDescription(
    page,
    '/post/sogni-nella-notte',
    'Una poesia che cattura la magia della notte, dove i sogni si intrecciano con i desideri',
  )
})

test('Post detail page has correct description when post is not found', async ({
  page,
}) => {
  await checkMetaDescription(
    page,
    '/post/non-existent-post',
    defaultDescription,
  )
})

test('Unsubscribe page has correct description', async ({ page }) => {
  await checkMetaDescription(
    page,
    `/unsubscribe?email=${TEST_EMAIL}`,
    `Annulla l'iscrizione alla newsletter per non ricevere più i nostri aggiornamenti`,
  )
})
