import type { CategoryName } from '@/types'
import { convertNameToSlug } from '@/utils/slug'
import Link from 'next/link'

type Props = {
  name: CategoryName
  slug?: string
  className?: string
}

export default function Component({ name, slug, className }: Props) {
  return (
    <Link
      href={`/categoria/${slug ? slug : convertNameToSlug(name)}`}
      title={`Vai a ${name}`}
      aria-label={`Vai a ${name}`}
      className={`font-medium uppercase text-pink-600 transition-all duration-300 hover:text-pink-800 hover:no-underline active:scale-95 dark:text-pink-400 dark:hover:text-pink-300 ${className || ''}`}
    >
      {name}
    </Link>
  )
}
