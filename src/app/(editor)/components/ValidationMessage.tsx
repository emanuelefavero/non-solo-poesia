'use client'

import { useEditorStore } from '@/stores/editorStore'

// TODO hide message after a few seconds

export default function Component() {
  const { message } = useEditorStore()

  if (!message) return null

  return (
    <p
      className={`mt-4 font-medium ${message.type === 'error' ? 'text-rose-600 dark:text-rose-500' : 'text-green-600 dark:text-green-500'}`}
    >
      {message.text}
    </p>
  )
}
