import type { CategoryNames } from '@/types'
import { convertNameToSlug } from '@/utils/slug'
import Link from 'next/link'

type Props = {
  name: CategoryNames
  slug?: string
  className?: string
}

export default function Component({ name, slug, className }: Props) {
  return (
    <Link
      href={`/category/${slug ? slug : convertNameToSlug(name)}`}
      title={`Vai a ${name}`}
      aria-label={`Vai a ${name}`}
      className={`font-medium uppercase text-pink-600 dark:text-pink-400 ${className || ''}`}
    >
      {name}
    </Link>
  )
}
