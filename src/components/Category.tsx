import type { CategoryNames } from '@/types'

interface Props {
  category: CategoryNames
}

export default function Component({ category }: Props) {
  return (
    <span className='text-sm font-semibold uppercase text-pink-500 dark:text-pink-400'>
      {category}
    </span>
  )
}
