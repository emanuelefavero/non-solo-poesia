'use client'

import { useEditorStore } from '@/stores/editorStore'

type Props = {
  handlePublish: () => void
}

export default function Component({ handlePublish }: Props) {
  const { loading } = useEditorStore()

  return (
    <button
      onClick={handlePublish}
      className={`min-w-[138px] rounded bg-blue-600 px-4 py-2 text-white ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={loading}
    >
      {loading ? 'Pubblicazione...' : 'Pubblica'}
    </button>
  )
}
