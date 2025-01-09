import Link from 'next/link'

const orderByOptions = [
  { label: 'Data', value: 'published_at' },
  { label: 'Titolo', value: 'title' },
]

type Props = {
  currentOrderBy: string
}

export default function Component({ currentOrderBy }: Props) {
  return (
    <div className='relative -top-4 mb-16 flex w-full items-center justify-end'>
      <span className='mr-2'>Ordina per:</span>

      {orderByOptions.map(({ label, value }) => (
        <Link
          key={`order-by-${value}`}
          href={`/?page=1&order_by=${value}`}
          className={`rounded-sm px-4 py-1 text-gray-600 transition-all duration-200 hover:bg-gray-500/20 hover:no-underline active:scale-95 dark:text-gray-400 ${value === currentOrderBy ? 'border-b-2 border-b-blue-500 text-gray-950 dark:text-gray-50' : ''}`}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}
