import type { CategoryName } from '@/types'

interface Props {
  category: CategoryName
  className?: string
}

export default function Component({ category, className }: Props) {
  return (
    <span
      className={`font-semibold uppercase text-pink-600 dark:text-pink-400 ${className || ''}`}
    >
      {category}
    </span>
  )
}
