import BsEyeIcon from '@/components/icons/BsEyeIcon'
import { formatViews } from '@/utils/views'

type Props = {
  views: number
}

export default function Component({ views }: Props) {
  return (
    <span
      className='flex select-none items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400'
      title={`${formatViews(views)} Visualizzazioni`}
    >
      <BsEyeIcon className='relative inline-block h-5 w-5' />
      {formatViews(views)}
    </span>
  )
}
