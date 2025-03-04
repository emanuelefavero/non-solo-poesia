import sum from './sum'

describe('sum', () => {
  test('it returns the correct number', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
