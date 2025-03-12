import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Ignore the following directories
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/.swc/',
    '<rootDir>/.vscode/',
    '<rootDir>/e2e/', // Ignore E2E tests
    '<rootDir>/node_modules/',
    '<rootDir>/playwright-report/',
  ],

  // Add path aliases for imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Map @/ to ./src/
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
