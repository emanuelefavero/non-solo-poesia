'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'

// TODO hide message after a few seconds

export default function Component() {
  const { message } = useEditorStore()

  if (!message) return null

  return (
    <p
      className={`mt-4 min-h-[36px] font-medium transition-opacity duration-300 ${message.type === 'error' ? 'text-rose-600 dark:text-rose-500' : 'text-green-600 dark:text-green-500'} ${
        message.text ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {message.text}
    </p>
  )
}
