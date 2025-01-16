'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const orderByOptions = [
  { label: 'Titolo', value: 'title' },
  { label: 'Data', value: 'published_at' },
]

type Props = {
  currentOrderBy: string
}

export default function Component({ currentOrderBy }: Props) {
  const pathname = usePathname()

  return (
    <div className='relative -top-4 mb-10 flex w-full select-none flex-wrap items-center justify-end'>
      <span className='mr-2 hidden 4xs:inline'>Ordina per:</span>

      {orderByOptions.map(({ label, value }) => (
        <Link
          key={`order-by-${value}`}
          href={`${pathname}?page=1&order_by=${value}`}
          className={`rounded-sm px-4 py-1 text-zinc-600 transition-all duration-200 hover:bg-zinc-500/20 hover:no-underline active:scale-95 dark:text-zinc-400 ${value === currentOrderBy ? 'border-b-2 border-b-pink-600 text-zinc-950 dark:border-b-pink-400 dark:text-zinc-50' : ''}`}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
