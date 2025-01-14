import type { CategoryName } from '@/types'
import { convertNameToSlug } from '@/utils/slug'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  name: CategoryName
  slug?: string
  className?: string
}

export default function Component({ name, slug, className }: Props) {
  const pathname = usePathname()
  const href = `/categoria/${slug ? slug : convertNameToSlug(name)}`
  const isSamePath = pathname === href
  const commonStyles = 'font-medium uppercase transition-all duration-300'

  if (isSamePath) {
    return (
      <span
        className={`${commonStyles} text-black dark:text-white ${className || ''}`}
      >
        {name}
      </span>
    )
  }

  return (
    <Link
      href={href}
      title={`Vai a ${name}`}
      aria-label={`Vai a ${name}`}
      className={`${commonStyles} text-pink-600 hover:text-pink-800 hover:no-underline active:scale-95 dark:text-pink-400 dark:hover:text-pink-300 ${className || ''}`}
    >
      {name}
    </Link>
  )
}
