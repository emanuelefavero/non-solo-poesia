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
