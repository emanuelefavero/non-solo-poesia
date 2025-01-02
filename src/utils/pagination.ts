export function generatePagination(currentPage: number, totalPages: number) {
  const pages = []

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1, 2)

    if (currentPage > 3) {
      pages.push('...')
    }

    if (currentPage > 2 && currentPage < totalPages - 1) {
      pages.push(currentPage)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    pages.push(totalPages)
  }

  return pages
}
