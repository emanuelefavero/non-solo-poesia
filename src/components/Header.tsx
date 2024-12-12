'use client'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Component() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  return (
    <>
      {!isHomepage ? <Link href='/'>Vai alla Home</Link> : <div>Home</div>}
      <div className='flex items-center'>
        <Link href='/create-post' className='mr-2'>
          + Nuovo Post
        </Link>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  )
}
