import Link from 'next/link'

const sortByLinks = [
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

        {sortByLinks.map(({ label, value }) => (
          <Link
            key={`sort-by-${value}`}
            href={`/test?page=${currentPage}&sort_by=${value}`}
            className={`mx-0.5 rounded-sm px-4 py-1 text-black transition-transform duration-200 hover:bg-gray-500/20 hover:text-white hover:no-underline active:scale-95 dark:text-white ${value === sort_by ? 'border-b-2 border-b-blue-500 text-white' : ''}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
