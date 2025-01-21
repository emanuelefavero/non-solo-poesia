import type { Post } from '@/types'
import { isAtLeastOneDayLater, isMonthDay1or8or11 } from '@/utils/date'

type Props = {
  published_at: Post['published_at'] // e.g. 2024-12-10 07:23:57.257+00
  updated_at: Post['updated_at']
  className?: string
}

export default function Component({
  published_at,
  updated_at,
  className,
}: Props) {
  const date = new Date(
    updated_at && isAtLeastOneDayLater(published_at, updated_at)
      ? updated_at
      : published_at,
  )

  return (
    <div className={`mt-1 text-sm font-medium italic ${className}`}>
      {updated_at && isAtLeastOneDayLater(published_at, updated_at)
        ? 'Aggiornato '
        : 'Pubblicato '}
      {isMonthDay1or8or11(date) ? "l'" : 'il '}
      {date
        .toLocaleDateString('it-IT', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        // Capitalize the month name
        .replace(/(\b\w)/g, (char) => char.toUpperCase())}
    </div>
  )
}
