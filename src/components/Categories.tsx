import { categories } from '@/data/categories'
import type { CategoryNames } from '@/types'
import Link from 'next/link'

export default function Component() {
  return categories.map((category) => (
    <CategoryLink key={category.id} name={category.name} slug={category.slug} />
  ))
}

type Props = {
  name: CategoryNames
  slug?: string
  className?: string
}

function CategoryLink({ name, slug, className }: Props) {
  return (
    <Link
      href={`/category/${slug ? slug : convertNameToSlug(name)}`}
      title={`Vai a ${name}`}
      aria-label={`Vai a ${name}`}
      className={`font-semibold uppercase text-pink-500 dark:text-pink-400 ${className || ''}`}
    >
      {name}
    </Link>
  )
}

function convertNameToSlug(name: string) {
  return name.toLowerCase().replace(/\s/g, '-')
}
