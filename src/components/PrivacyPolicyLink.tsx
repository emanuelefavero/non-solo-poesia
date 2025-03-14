'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Component() {
  const pathname = usePathname()
  const href = '/privacy-policy'

  if (pathname === href) return null

  return (
    <Link
      href={href}
      className='mt-2 block text-center xs:ml-1 xs:inline-block'
    >
      Privacy Policy
    </Link>
  )
}
