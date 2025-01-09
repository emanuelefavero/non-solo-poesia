'use client'

import { useSearchStore } from '@/app/cerca/store/searchStore'

// TODO add loading spinner

export default function Component() {
  const { message } = useSearchStore()

  return (
    <p
      className={`mb-4 mt-1 min-h-[36px] font-semibold italic text-yellow-700 transition-opacity duration-300 dark:text-yellow-500 ${
        message ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message}
    </p>
  )
}
