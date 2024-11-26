import type { useEditor } from '@tiptap/react'

type ToolbarProps = {
  editor: ReturnType<typeof useEditor>
}

export function TipTapToolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className='tiptap-toolbar mb-4 flex gap-2'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('bold') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('italic') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-blue-500 text-white'
            : ''
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('heading', { level: 2 })
            ? 'bg-blue-500 text-white'
            : ''
        }`}
      >
        H2
      </button>
      <button
        onClick={() => {
          const url = prompt('Enter the image URL:')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
        className='rounded border px-2 py-1'
      >
        Add Image
      </button>
    </div>
  )
}
