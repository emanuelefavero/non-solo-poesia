import { act, renderHook } from '@testing-library/react'
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

  it('should return "down" when scrolling down', () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      window.scrollY = 100
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('down')
  })

  it('should return "up" when scrolling up', () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      window.scrollY = 100
      window.dispatchEvent(new Event('scroll'))
    })

    act(() => {
      window.scrollY = 0
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('up')
  })

  it('should not update direction if scrolling in same direction', () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      window.scrollY = 100 // scroll down
      window.dispatchEvent(new Event('scroll'))
    })

    act(() => {
      window.scrollY = 200 // scroll down
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('down')
  })
})
