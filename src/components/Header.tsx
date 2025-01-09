'use client'

import BsPlusLgIcon from '@/components/icons/BsPlusLgIcon'
import BsSearchIcon from '@/components/icons/BsSearchIcon'
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
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isSearchPage = pathname === '/cerca'
  const { userId } = useAuth()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  return (
    <>
      <div className='flex w-full items-center justify-end border-b border-b-zinc-800/10 bg-[#fff8fc] px-1.5 py-1 text-lg dark:border-b-zinc-200/10 dark:bg-[#1c060f]'>
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

          {(userId === adminId || userId === authorId) &&
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

        {/* TODO: add this class here 2xs:hidden */}
        <div className='ml-3 mr-1 block'>
          <DropdownMenu />
        </div>
      </div>
      <div className='px-2 py-2'>
        <Logo isHomepage={isHomepage} />
      </div>

      <nav className='hidden items-center justify-center gap-2 pb-1 text-sm 2xs:flex xs:gap-4 xs:text-base'>
        <Categories />
      </nav>
    </>
  )
}
