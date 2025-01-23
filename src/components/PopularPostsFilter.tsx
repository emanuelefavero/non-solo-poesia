'use client'

import type { PopularPostsFilter } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  currentPopularPostsFilter: PopularPostsFilter
}

const popularPostsFilterOptions = [
  { label: 'Questo Mese', value: 'this_month' },
  { label: 'Di Sempre', value: 'all_time' },
]

export default function Component({ currentPopularPostsFilter }: Props) {
  const pathname = usePathname()

  return (
    <span className='relative top-0.5 flex flex-wrap'>
      {popularPostsFilterOptions.map(({ label, value }) => (
        <Link
          key={`order-by-${value}`}
          href={`${pathname}?popular_posts_filter=${value}`}
          className={`rounded-sm px-1.5 py-1 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-pink-400/10 hover:no-underline active:scale-95 dark:text-zinc-400 ${value === currentPopularPostsFilter ? 'text-zinc-950 dark:text-zinc-50' : ''}`}
        >
          {label}
        </Link>
      ))}
    </span>
  )
}
