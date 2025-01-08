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
        <nav className='mr-3 flex items-center gap-3'>
          {!isSearchPage && (
            <Link
              href='/search'
              title='Cerca post'
              aria-label='Cerca post'
              className='hover:no-underline'
            >
              <BsSearchIcon className='h-[16px]' />
            </Link>
          )}

          {(userId === adminId || userId === authorId) &&
            pathname !== '/create-post' && (
              <Link
                href='/create-post'
                title='Crea nuovo post'
                aria-label='Crea nuovo post'
                className='hover:no-underline'
              >
                <BsPlusLgIcon className='h-[18px]' />
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
