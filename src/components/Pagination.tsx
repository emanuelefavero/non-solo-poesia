'use client'

import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon'
import type { OrderBy } from '@/types'
import { generatePagination } from '@/utils/pagination'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  currentOrderBy: OrderBy
}

// TODO Fix pagination buttons on mobile

export default function Component({
  currentPage,
  totalPages,
  currentOrderBy,
}: PaginationProps) {
  const pathname = usePathname()

  // Generate pagination navigation links (memoized)
  const pages = useMemo(
    () => generatePagination(currentPage, totalPages),
    [currentPage, totalPages],
  )

  if (totalPages <= 1) return null

  return (
    <div className='mt-8 flex h-[34px] select-none items-center justify-center rounded-sm'>
      <div className='flex h-fit w-fit flex-wrap overflow-hidden rounded border border-pink-500/10 bg-pink-500/10 dark:bg-pink-600/10'>
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
              className={
                page === currentPage
                  ? 'rounded border border-pink-500/20 bg-white hover:bg-white dark:border-pink-500/20 dark:bg-pink-500/20 dark:hover:bg-pink-500/20'
                  : ''
              }
              ariaLabel={`Pagina ${page}`}
              title={`Pagina ${page}`}
            >
              {page}
            </PaginationLink>
          ) : (
            <span
              key={index}
              className='select-none px-2 py-1 text-black dark:text-white'
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
      className={`px-4 py-1 text-black transition-transform duration-200 hover:bg-pink-500/10 hover:no-underline active:scale-95 dark:text-white dark:hover:bg-pink-500/10 ${
        className || ''
      }`}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </Link>
  )
}
