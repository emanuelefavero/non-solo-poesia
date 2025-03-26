import { clerk, clerkSetup } from '@clerk/testing/playwright'
import { test as setup } from '@playwright/test'
import path from 'path'

// Setup must be run serially, this is necessary if Playwright is configured to run fully parallel: https://playwright.dev/docs/test-parallel
setup.describe.configure({ mode: 'serial' })

setup('global setup', async ({}) => {
  await clerkSetup()
})

// Define the path to the storage file, which is `user.json`
const authFile = path.join(__dirname, './.clerk/user.json')

setup('Authenticate and save state to storage', async ({ page }) => {
  // Navigate to an unprotected page that loads Clerk
  await page.goto('/')

  // Sign in with email
  await clerk.signIn({
    page,
    signInParams: {
      strategy: 'email_code',
      identifier: process.env.TEST_EMAIL!,
    },
  })

  // Ensure the user has successfully accessed the protected page
  // by checking an element on the page that only the authenticated user can access
  await page.waitForSelector(`header:has-text("${process.env.TEST_EMAIL!}")`)

  // Save the storage state to a file
  await page.context().storageState({ path: authFile })
})
