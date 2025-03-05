import { isAtLeastOneDayLater, isMonthDay1or8or11 } from './date'

describe('isAtLeastOneDayLater', () => {
  it('should return false if updated_at is undefined', () => {
    expect(isAtLeastOneDayLater('2025-01-01', undefined)).toBe(false)
  })

  it('should return false if updated_at is the same as published_at', () => {
    expect(isAtLeastOneDayLater('2025-01-01', '2025-01-01')).toBe(false)
  })

  it('should return false if updated_at is earlier than published_at', () => {
    expect(isAtLeastOneDayLater('2025-01-01', '2024-01-01')).toBe(false)
  })

  it('should return true if updated_at is later than published_at', () => {
    expect(isAtLeastOneDayLater('2025-01-01', '2025-01-02')).toBe(true)
  })

  it('should return true if updated_at is later than published_at by one year', () => {
    expect(isAtLeastOneDayLater('2025-01-01', '2026-01-01')).toBe(true)
  })
})

describe('isMonthDay1or8or11', () => {
  it('should return true if the day of the month is 1', () => {
    expect(isMonthDay1or8or11(new Date('2025-01-01'))).toBe(true)
  })

  it('should return true if the day of the month is 8', () => {
    expect(isMonthDay1or8or11(new Date('2025-01-08'))).toBe(true)
  })

  it('should return true if the day of the month is 11', () => {
    expect(isMonthDay1or8or11(new Date('2025-01-11'))).toBe(true)
  })

  it('should return false if the day of the month is not 1, 8 or 11', () => {
    expect(isMonthDay1or8or11(new Date('2025-01-02'))).toBe(false)
  })
})
