'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Component() {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  return (
    <>
      {!isHomepage ? <Link href='/'>Vai alla Home</Link> : <div>Home</div>}
      <Link href='/create-post?key=secret'>Aggiungi nuovo post</Link>
    </>
  )
}
