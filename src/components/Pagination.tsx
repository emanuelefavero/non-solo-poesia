import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import { generatePagination } from '@/utils/pagination'
import Link from 'next/link'

type PaginationProps = {
  currentPage: number
  totalPages: number
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className='mt-4 flex h-[34px] items-center justify-center'>
      {currentPage > 1 && (
        <PaginationLink
          href={`/?page=1`}
          ariaLabel='Prima pagina'
          title='Prima pagina'
        >
          <div className='flex h-[24px] items-center'>
            <ChevronLeftIcon className='h-[16px]' />
          </div>
        </PaginationLink>
      )}

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <PaginationLink
            key={index}
            href={`/?page=${page}`}
            className={page === currentPage ? 'bg-blue-500/80 text-white' : ''}
            ariaLabel={`Pagina ${page}`}
            title={`Pagina ${page}`}
          >
            {page}
          </PaginationLink>
        ) : (
          <span
            key={index}
            className='mx-1 select-none px-2 py-1 text-black dark:text-white'
          >
            {page}
          </span>
        ),
      )}

      {currentPage < totalPages && (
        <PaginationLink
          href={`/?page=${totalPages}`}
          ariaLabel='Ultima pagina'
          title='Ultima pagina'
        >
          <div className='flex h-[24px] items-center'>
            <ChevronRightIcon className='h-[16px]' />
          </div>
        </PaginationLink>
      )}
    </div>
  )
}

interface PaginationLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  ariaLabel?: string
  title?: string
  page?: number
}

function PaginationLink({
  href,
  children,
  className,
  ariaLabel,
  title,
}: PaginationLinkProps) {
  return (
    <Link
      href={href}
      className={`mx-0.5 rounded px-4 py-1 text-black transition-transform duration-200 hover:bg-blue-500 hover:text-white hover:no-underline active:scale-95 dark:text-white ${
        className || ''
      }`}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </Link>
  )
}
