import type { Post } from '@/types'

// Return true if the updated_at date is at least one day later than the published_at date
export function isAtLeastOneDayLater(
  published_at: Post['published_at'],
  updated_at: Post['updated_at'],
) {
  if (!updated_at) return false
  const publishedDate = new Date(published_at)
  const updatedDate = new Date(updated_at)

  return (
    updatedDate.getFullYear() > publishedDate.getFullYear() ||
    (updatedDate.getFullYear() === publishedDate.getFullYear() &&
      updatedDate.getMonth() > publishedDate.getMonth()) ||
    (updatedDate.getFullYear() === publishedDate.getFullYear() &&
      updatedDate.getMonth() === publishedDate.getMonth() &&
      updatedDate.getDate() > publishedDate.getDate())
  )
}

// Return true if the day of the month is 1, 8 or 11
// TIP: In Italy they say l'1, l'8, l'11 instead of il 1, il 8, il 11
export function is1or8or11(date: Date) {
  return date.getDate() === 1 || date.getDate() === 8 || date.getDate() === 11
}
