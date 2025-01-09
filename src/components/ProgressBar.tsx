'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'
import { usePathname } from 'next/navigation'

export default function Component() {
  const pathname = usePathname()
  const { progress } = useEditorStore()

  if (
    !pathname.includes('/crea-nuovo-post') &&
    !pathname.includes('/modifica-post')
  ) {
    return null
  }

  return (
    <div
      className={`fixed z-[999] h-[3px] w-full overflow-x-hidden bg-gray-500/20`}
    >
      <div
        style={{
          width: `${progress}%`,
        }}
        className={`h-full rounded-r-lg transition-all duration-300 ${
          progress === 100
            ? 'bg-green-500'
            : progress === 101 // show error state on 101
              ? 'bg-rose-500'
              : 'bg-blue-500'
        }`}
      ></div>
    </div>
  )
}
