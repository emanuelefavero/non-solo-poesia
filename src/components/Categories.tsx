import { categories } from '@/data/categories'
import Link from 'next/link'

export default function Component() {
  return categories.map((category) => (
    <Link
      key={category.id}
      href={`/category/${category.slug}`}
      title={`Vai a ${category.name}`}
      aria-label={`Vai a ${category.name}`}
      className='font-semibold uppercase text-pink-500 dark:text-pink-400'
    >
      {category.name}
    </Link>
  ))
}
