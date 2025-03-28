'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'

export default function Component() {
  const { description, setDescription } = useEditorStore()

  return (
    <input
      type='text'
      name='descrizione'
      placeholder='Descrizione...'
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className='mb-4 w-full'
      maxLength={130}
    />
  )
}
