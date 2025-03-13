import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
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

test('Category page has correct description', async ({ page }) => {
  const category = categories[0]
  const { name } = category

  await page.goto(`/categoria/${category.slug}`)

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute('content')

  expect(description).toBe(`Tutti i post di ${TITLE} nella categoria ${name}.`)
})
