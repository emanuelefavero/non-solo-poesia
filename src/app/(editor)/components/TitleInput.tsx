'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'

export default function Component() {
  const { title, setTitle } = useEditorStore()

  return (
    <input
      type='text'
      placeholder='Titolo...'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='mb-4 w-full'
      maxLength={100}
    />
  )
}
