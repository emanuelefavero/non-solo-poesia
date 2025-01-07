'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'
import { categories } from '@/data/categories'

export default function Component() {
  const { category, setCategory } = useEditorStore()

  return (
    <div className='mb-4 flex flex-col gap-2'>
      <label htmlFor='author' className='font-medium'>
        Autore
      </label>
      <select
        id='author'
        className='max-w-[151px]'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}
