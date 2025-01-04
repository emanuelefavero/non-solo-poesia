import Link from 'next/link'

const sortingOptions = [
  { label: 'Data', value: 'published_at' },
  { label: 'Titolo', value: 'title' },
]

type Props = {
  searchParams: Promise<{ page?: string; sort_by?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { page, sort_by } = await searchParams
  const currentPage = parseInt(page || '1', 10)

  return (
    <>
      <h1>Test</h1>

      <div className='flex w-full items-center justify-end'>
        <span className='mr-2'>Ordina per:</span>

        {sortingOptions.map(({ label, value }) => (
          <Link
            key={`sort-by-${value}`}
            href={`/test?page=${currentPage}&sort_by=${value}`}
            className={`rounded-sm px-4 py-1 text-gray-600 transition-all duration-200 hover:bg-gray-500/20 hover:no-underline active:scale-95 dark:text-gray-400 ${value === sort_by ? 'border-b-2 border-b-blue-500 text-gray-950 dark:text-gray-50' : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
