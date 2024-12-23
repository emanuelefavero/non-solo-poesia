'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const color = searchParams.get('color') || 'red'

  return (
    <>
      <h1>Test</h1>

      <select
        id='color'
        value={color}
        onChange={(e) => {
          router.replace(`${pathname}?color=${e.target.value}`)
        }}
      >
        <option value='red'>Red</option>
        <option value='blue'>Blue</option>
      </select>

      <p className={color === 'red' ? 'text-red-500' : 'text-blue-500'}>
        Hello
      </p>
    </>
  )
}
