'use client'

import { useSearchParams } from 'next/navigation'

export default function Component() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  if (!email) return null

  return <b className='font-bold'>{email}</b>
}
