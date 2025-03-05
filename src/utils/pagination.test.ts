import { generatePagination } from './pagination'

describe('generatePagination', () => {
  it('should return all pages when totalPages is 5 or less', () => {
    expect(generatePagination(1, 1)).toEqual([1])
    expect(generatePagination(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('should return pagination dots when totalPages > 5 and currentPage is 1', () => {
    expect(generatePagination(1, 6)).toEqual([1, 2, '...', 6])
  })

  it('should return double pagination dots when totalPages > 5 and currentPage is in the middle', () => {
    expect(generatePagination(5, 10)).toEqual([1, 2, '...', 5, '...', 10])
  })

  it('should return pagination dots when totalPages > 5 and currentPage is the last', () => {
    expect(generatePagination(10, 10)).toEqual([1, 2, '...', 10])
  })
})
