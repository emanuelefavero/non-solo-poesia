'use client'

import { authors } from '@/data/authors'
import { useEditorStore } from '@/stores/editorStore'

export default function Component() {
  const { author, setAuthor } = useEditorStore()

  return (
    <div className='mb-4 flex flex-col gap-2'>
      <label htmlFor='author' className='font-medium'>
        Autore
      </label>
      <select
        id='author'
        className='max-w-[151px]'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        {authors.map((author) => (
          <option key={author.id} value={author.name}>
            {author.name}
          </option>
        ))}
      </select>
    </div>
  )
}
