'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'

export default function Component() {
  const { progress } = useEditorStore()

  return (
    <div className={`fixed z-[999] h-[3px] w-full bg-gray-500/20`}>
      <div
        style={{
          width: `${progress}%`,
        }}
        className={`h-full rounded-r-lg transition-all duration-300 ${
          progress === 100 ? 'bg-green-500' : 'bg-blue-500'
        }`}
      ></div>
    </div>
  )
}
