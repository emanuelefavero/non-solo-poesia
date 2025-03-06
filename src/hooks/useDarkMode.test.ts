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

  it('should return true if dark mode is enabled', () => {
    window.matchMedia = jest.fn().mockReturnValue(mockMatchMedia(true))
    const { result } = renderHook(() => useDarkMode())
    expect(result.current).toBe(true)
  })

  it('should update state when dark mode changes', () => {
    let listener: ((e: MediaQueryListEvent) => void) | undefined
    const mockMediaQuery = {
      matches: false,
      addEventListener: jest.fn((_, callback) => {
        listener = callback
      }),
      removeEventListener: jest.fn(),
    }

    window.matchMedia = jest.fn().mockReturnValue(mockMediaQuery)

    const { result } = renderHook(() => useDarkMode())

    expect(result.current).toBe(false)

    act(() => {
      listener?.({ matches: true } as MediaQueryListEvent)
    })

    expect(result.current).toBe(true)
  })
})
