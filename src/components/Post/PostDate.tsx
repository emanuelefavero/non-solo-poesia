import BiCalendarEditIcon from '@/components/icons/BiCalendarEditIcon'
import BiCalendarIcon from '@/components/icons/BiCalendarIcon'
import type { Post } from '@/types'
import {
  formatDate,
  isAtLeastOneDayLater,
  isMonthDay1or8or11,
} from '@/utils/date'

type Props = {
  published_at: Post['published_at'] // e.g. 2024-12-10 07:23:57.257+00
  updated_at: Post['updated_at']
  className?: string
  iconClassName?: string
}

export default function Component({
  published_at,
  updated_at,
  className,
  iconClassName,
}: Props) {
  const date = new Date(
    updated_at && isAtLeastOneDayLater(published_at, updated_at)
      ? updated_at
      : published_at,
  )
  const formattedDate = formatDate(date)
  const atLeastOneDayLater = isAtLeastOneDayLater(published_at, updated_at)
  const monthDay1or8or11 = isMonthDay1or8or11(date)

  return (
    <time
      className={`mt-1 flex items-center gap-1 text-sm font-medium italic ${className || ''}`}
      dateTime={date.toISOString()}
      title={`${updated_at && atLeastOneDayLater ? 'Aggiornato' : 'Pubblicato'} ${monthDay1or8or11 ? "l'" : 'il '}${formattedDate}`}
      aria-label={`${updated_at && atLeastOneDayLater ? 'Aggiornato' : 'Pubblicato'} ${monthDay1or8or11 ? "l'" : 'il '}${formattedDate}`}
    >
      {updated_at && atLeastOneDayLater ? (
        <BiCalendarEditIcon
          className={`relative inline-block h-5 w-5 ${iconClassName}`}
        />
      ) : (
        <BiCalendarIcon
          className={`relative inline-block h-5 w-5 ${iconClassName}`}
        />
      )}
      {formattedDate}
    </time>
  )
}
