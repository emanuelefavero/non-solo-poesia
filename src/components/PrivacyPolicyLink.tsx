'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Component() {
  const pathname = usePathname()
  const href = '/informativa-sulla-privacy'

  if (pathname === href) return null

  return (
    <Link
      href={href}
      className='mt-2 block text-center sm:ml-1 sm:inline-block'
    >
      Informativa sulla Privacy
    </Link>
  )
}
