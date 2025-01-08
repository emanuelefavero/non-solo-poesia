'use client'

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

  // TODO Add icons to search and create post buttons

  return (
    <>
      <div className='flex w-full items-center justify-end border-b border-b-zinc-800 px-2 py-2 text-xl dark:border-b-zinc-200/10'>
        <nav className='mr-3 flex items-center gap-3'>
          {!isSearchPage && (
            <Link
              href='/search'
              title='Cerca post'
              aria-label='Cerca post'
              className='hover:no-underline'
            >
              🔍
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
                +
              </Link>
            )}
        </nav>
        <SignedOut>
          <SignInButton>
            <button>Accedi</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className='px-2 py-2'>
        <Logo isHomepage={isHomepage} />
      </div>
    </>
  )
}
