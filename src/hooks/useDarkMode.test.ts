import { act, renderHook } from '@testing-library/react'
import { useDarkMode } from './useDarkMode'

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => ({
  matches,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
})

describe('useDarkMode', () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeAll(() => {
    // Store original matchMedia
    originalMatchMedia = window.matchMedia

    // Mock matchMedia
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))
  })

  afterAll(() => {
    // Restore original matchMedia
    window.matchMedia = originalMatchMedia
  })

  it('should return false initially', () => {
    window.matchMedia = jest.fn().mockReturnValue(mockMatchMedia(false))
    const { result } = renderHook(() => useDarkMode())
    expect(result.current).toBe(false)
  })
})
