import { formatViews } from './views'

describe('formatViews', () => {
  it('should return 0 when views is undefined', () => {
    expect(formatViews()).toBe('0')
  })

  it('should return 0 when views is 0', () => {
    expect(formatViews(0)).toBe('0')
  })

  it('should have a k when views is 1000', () => {
    expect(formatViews(1000)).toContain('k')
  })

  it('should have a M when views is 1000000', () => {
    expect(formatViews(1000000)).toContain('M')
  })

  it('should have a B when views is 1000000000', () => {
    expect(formatViews(1000000000)).toContain('B')
  })
})
