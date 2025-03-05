import { convertNameToSlug, convertSlugToName } from './slug'

describe('convertNameToSlug', () => {
  it('should convert name to slug', () => {
    expect(convertNameToSlug('Ab Dc')).toBe('ab-dc')
  })
})

describe('convertSlugToName', () => {
  it('should convert slug to name', () => {
    expect(convertSlugToName('ab-cd')).toBe('Ab Cd')
  })
})
