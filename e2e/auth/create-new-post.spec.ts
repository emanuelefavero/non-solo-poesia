import { TEST_POST } from '@/data/post'
import { expect, test } from '@playwright/test'

test('Authenticated user can create a new post', async ({ page }) => {
  // Mock the API route to prevent creating real posts
  await page.route('/api/post', async (route) => {
    // Uncomment the following lines to see the request payload
    // const requestBody = await route.request().postDataJSON()
    // console.log('Mocked Request Payload:', requestBody)

    route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true }),
    })
  })

  // Navigate to the create new post page
  await page.goto('/crea-nuovo-post')

  // Fill out the form
  await page.fill('input[name="titolo"]', TEST_POST.title)
  await page.fill('input[name="descrizione"]', TEST_POST.description)

  // Fill content in the TipTap contenteditable div
  const contentEditable = page.locator('.tiptap[contenteditable="true"]')
  await contentEditable.fill(TEST_POST.content)

  // Add cover image via URL (intercept the prompt dialog)
  page.once('dialog', async (dialog) => {
    expect(dialog.type()).toBe('prompt') // Ensure it's a prompt
    await dialog.accept(TEST_POST.coverImage) // Accept the prompt with the URL
  })
  await page.click('button:has-text("Aggiungi immagine di copertina")')

  // Click "Pubblica" button
  await page.click('button:has-text("Pubblica")')

  // Verify success message
  const successMessage = page.locator('text=Post pubblicato con successo!')
  await expect(successMessage).toBeVisible()
})
