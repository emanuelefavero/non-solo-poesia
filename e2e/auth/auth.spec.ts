import { TEST_EMAIL } from '@/data/email'
import { clerk } from '@clerk/testing/playwright'
import { expect, test } from '@playwright/test'

test('Sign in with Clerk', async ({ page }) => {
  // Navigate to an unprotected page that loads Clerk
  await page.goto('/')

  // Sign in with email
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'email_code',
      identifier: TEST_EMAIL,
    },
  })

  // Check if the header contains the email of the signed-in user
  // NOTE: The email will be displayed only for users that are signed in with email (like our test user), other sign-in methods will display the user's name
  const header = page.locator('header')
  await expect(header).toContainText(TEST_EMAIL)
})

test('Sign out with Clerk', async ({ page, browserName }) => {
  test.skip(
    browserName !== 'chromium',
    'This test runs only in Chrome to prevent NS_BINDING_ABORTED error',
  )

  await page.goto('/')

  // Sign in with email
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'email_code',
      identifier: TEST_EMAIL,
    },
  })

  // Wait for the sign-in to complete
  await clerk.loaded({ page })

  // Sign out
  await clerk.signOut({ page })

  // Go to a protected page and wait for the page to load
  await page.goto('/crea-nuovo-post')
  await page.waitForLoadState('domcontentloaded')

  // Should be redirected to the home page
  const h1 = page.locator('h1')
  await expect(h1).toContainText(/Ultimi Post/i)
})
