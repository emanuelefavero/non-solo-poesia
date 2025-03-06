import { renderHook } from '@testing-library/react'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    })
  })

  it('should return null initially', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current).toBeNull()
  })
})
