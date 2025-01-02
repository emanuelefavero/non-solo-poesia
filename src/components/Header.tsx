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

export default function Component() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isSearchPage = pathname === '/search'
  const { userId } = useAuth()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  return (
    <>
      {!isHomepage ? <Link href='/'>Vai alla Home</Link> : <div>Home</div>}
      <div className='flex items-center'>
        <nav className='mr-3 flex gap-3'>
          {!isSearchPage ? <Link href='/search'>Cerca</Link> : <div>Cerca</div>}
          {(userId === adminId || userId === authorId) &&
            pathname !== '/create-post' && (
              <Link href='/create-post'>+ Nuovo Post</Link>
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
    </>
  )
}
