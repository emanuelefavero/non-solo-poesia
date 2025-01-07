import type { CategoryNames } from '@/types'

interface Props {
  category: CategoryNames
  className?: string
}

export default function Component({ category, className = '' }: Props) {
  return (
    <span
      className={`text-sm font-semibold uppercase text-pink-500 dark:text-pink-400 ${className}`}
    >
      {category}
    </span>
  )
}
