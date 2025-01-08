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
import Logo from './Logo'

export default function Component() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isSearchPage = pathname === '/search'
  const { userId } = useAuth()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  return (
    <>
      <div className='flex w-full items-center justify-end border-b border-b-zinc-800/10 bg-[#fff8fc] px-1.5 py-0.5 text-lg dark:border-b-zinc-200/10 dark:bg-[#1c060f]'>
        <nav className='flex items-center gap-2'>
          {!isSearchPage && (
            <Link
              href='/search'
              title='Cerca post'
              aria-label='Cerca post'
              className='flex h-6 w-6 items-center transition-transform duration-200 hover:no-underline active:scale-95'
            >
              <BsSearchIcon className='h-[18px]' />
            </Link>
          )}

          {(userId === adminId || userId === authorId) &&
            pathname !== '/create-post' && (
              <Link
                href='/create-post'
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
            <button>Accedi</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>
      </div>
      <div className='px-2 py-2'>
        <Logo isHomepage={isHomepage} />
      </div>
    </>
  )
}
