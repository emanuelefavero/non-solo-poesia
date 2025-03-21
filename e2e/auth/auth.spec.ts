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
