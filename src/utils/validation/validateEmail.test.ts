import { TEST_EMAIL } from '@/data/email'
import { validateEmail } from './validateEmail'

describe('validateEmail', () => {
  it('should return an error if email is missing', () => {
    const result = validateEmail('')
    expect(result.type).toBe('error')
  })

  it('should return an error if email is invalid', () => {
    const result = validateEmail('invalid-email')
    expect(result.type).toBe('error')
  })

  it('should return success if email is valid', () => {
    const result = validateEmail(TEST_EMAIL)
    expect(result.type).toBe('success')
  })
})
