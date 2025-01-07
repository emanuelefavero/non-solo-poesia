'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'
import { categories } from '@/data/categories'
import type { CategoryNames } from '@/types'

export default function Component() {
  const { category, setCategory } = useEditorStore()

  return (
    <div className='mb-4 flex flex-col gap-2'>
      <label htmlFor='category' className='font-medium'>
        Categoria
      </label>
      <select
        id='category'
        className='max-w-[151px]'
        value={category}
        onChange={(e) => setCategory(e.target.value as CategoryNames)}
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
