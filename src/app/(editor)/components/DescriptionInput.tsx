'use client'

import { useEditorStore } from '@/stores/editorStore'

export default function Component() {
  const { description, setDescription } = useEditorStore()

  return (
    <input
      type='text'
      placeholder='Descrizione...'
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className='mb-4 w-full'
      maxLength={130}
    />
  )
}
