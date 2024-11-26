import type { useEditor } from '@tiptap/react'

type ToolbarProps = {
  editor: ReturnType<typeof useEditor>
}

export default function Component({ editor }: ToolbarProps) {
  if (!editor) {
    return null
  }

  // TODO: Move the toolbar buttons to separate component to prevent duplication

  return (
    <div className='tiptap-toolbar mb-4 flex gap-2'>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('bold') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-bold'>B</span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('italic') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-serif italic'>I</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-blue-500 text-white'
            : ''
        }`}
      >
        <span className='font-bold'>H1</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('heading', { level: 2 })
            ? 'bg-blue-500 text-white'
            : ''
        }`}
      >
        <span className='font-semibold'>H2</span>
      </button>
      <button
        onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('heading', { level: 3 })
            ? 'bg-blue-500 text-white'
            : ''
        }`}
      >
        <span className='font-medium'>H3</span>
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
        Image
      </button>
      <button
        onClick={() => {
          const url = prompt('Enter the link URL:')
          if (url) {
            editor.chain().focus().toggleLink({ href: url }).run()
          }
        }}
        className='rounded border px-2 py-1'
      >
        Link
      </button>
    </div>
  )
}
