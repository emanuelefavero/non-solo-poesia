'use client'

import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import type { OrderBy } from '@/types'
import { generatePagination } from '@/utils/pagination'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type PaginationProps = {
  currentPage: number
  totalPages: number
  currentOrderBy: OrderBy
}

export default function Component({
  currentPage,
  totalPages,
  currentOrderBy,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pathname = usePathname()
  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className='mt-4 flex h-[34px] select-none items-center justify-center'>
      {currentPage > 1 && (
        <PaginationLink
          href={`${pathname}?page=1&order_by=${currentOrderBy}`}
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
            href={`${pathname}?page=${page}&order_by=${currentOrderBy}`}
            className={page === currentPage ? 'bg-pink-500/80 text-white' : ''}
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
          href={`${pathname}?page=${totalPages}&order_by=${currentOrderBy}`}
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
      className={`mx-0.5 rounded px-4 py-1 text-black transition-transform duration-200 hover:bg-pink-500 hover:text-white hover:no-underline active:scale-95 dark:text-white ${
        className || ''
      }`}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </Link>
  )
}
