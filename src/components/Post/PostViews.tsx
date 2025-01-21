import BsEyeIcon from '@/components/icons/BsEyeIcon'
import { formatViews } from '@/utils/views'

type Props = {
  views: number
  className?: string
  iconClassName?: string
}

export default function Component({ views, className, iconClassName }: Props) {
  return (
    <p
      className={`flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 ${className}`}
      title={`${formatViews(views)} Visualizzazioni`}
      aria-label={`${formatViews(views)} Visualizzazioni`}
    >
      <BsEyeIcon className={`relative inline-block h-5 w-5 ${iconClassName}`} />
      {formatViews(views)}
      <span className='sr-only'>Visualizzazioni</span>
    </p>
  )
}
