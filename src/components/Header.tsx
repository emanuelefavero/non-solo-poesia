'use client'

import BsPlusLgIcon from '@/components/icons/BsPlusLgIcon'
import BsSearchIcon from '@/components/icons/BsSearchIcon'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Categories from './Categories'
import DropdownMenu from './DropdownMenu'
import Logo from './Logo'

export default function Component() {
  const scrollDirection = useScrollDirection()
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isSearchPage = pathname === '/cerca'
  const { userId } = useAuth()
  const adminIds = process.env.NEXT_PUBLIC_ADMIN_IDS?.split(',') || []

  return (
    <header
      className={`fixed z-40 flex w-full select-none flex-col items-center justify-center border-b border-b-zinc-800/20 bg-[var(--header-background)] backdrop-blur-md transition-transform duration-150 dark:border-b-zinc-200/20 ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className='flex w-full max-w-[1157px] items-center justify-end border-b border-b-zinc-800/10 px-1.5 py-1 text-lg dark:border-b-zinc-200/10'>
        <nav className='mr-3 flex items-center gap-2 3xs:mr-0'>
          {!isSearchPage && (
            <Link
              href='/cerca'
              title='Cerca post'
              aria-label='Cerca post'
              className='flex h-6 w-6 items-center transition-transform duration-200 hover:no-underline active:scale-95'
            >
              <BsSearchIcon className='h-[18px]' />
            </Link>
          )}

          {userId &&
            adminIds.includes(userId) &&
            pathname !== '/crea-nuovo-post' && (
              <Link
                href='/crea-nuovo-post'
                title='Crea nuovo post'
                aria-label='Crea nuovo post'
                className='flex h-6 w-6 items-center transition-transform duration-200 hover:no-underline active:scale-95'
              >
                <BsPlusLgIcon className='h-6' />
              </Link>
            )}
        </nav>

        <SignedOut>
          <SignInButton>
            <button className='ml-3 mr-1 text-sm transition-transform duration-200 hover:no-underline active:scale-95'>
              Accedi
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>

        <div className='ml-3 mr-1 block 2xs:hidden'>
          <DropdownMenu />
        </div>
      </div>
      <div className='px-2 py-2'>
        <Logo isHomepage={isHomepage} />
      </div>

      <nav className='hidden w-full max-w-[420px] items-center justify-between gap-2.5 px-4 pb-1 text-sm 2xs:flex xs:gap-4 xs:text-base'>
        <Categories />
      </nav>
    </header>
  )
}
