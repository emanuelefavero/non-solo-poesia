import { convertNameToSlug } from './slug'

describe('convertNameToSlug', () => {
  it('should convert name to slug', () => {
    expect(convertNameToSlug('Ab Dc')).toBe('ab-dc')
  })
})
