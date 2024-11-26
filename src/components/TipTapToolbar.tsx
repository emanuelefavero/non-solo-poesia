import type { useEditor } from '@tiptap/react'

type ToolbarProps = {
  editor: ReturnType<typeof useEditor>
}

export default function Component({ editor }: ToolbarProps) {
  if (!editor) {
    return null
  }

  // TODO: Group the buttons into sections
  // TODO: Add icons

  return (
    <div className='tiptap-toolbar mb-4 flex flex-wrap gap-2'>
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('bold') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-bold'>B</span>
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('italic') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-serif italic'>I</span>
      </button>

      {/* H1 */}
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

      {/* H2 */}
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

      {/* H3 */}
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

      {/* Image */}
      <button
        onClick={() => {
          const url = prompt('Enter the image URL:')
          if (url) {
            editor.chain().focus().setImage({ src: url }).run()
          }
        }}
        className={`rounded border px-2 py-1 ${
          editor.isActive('image')
            ? 'bg-blue-500 text-white'
            : 'active:bg-blue-500 active:text-white'
        }`}
        // className='rounded border px-2 py-1 active:bg-blue-500 active:text-white'
      >
        Img
      </button>

      {/* Link */}
      <button
        onClick={() => {
          const url = prompt('Enter the link URL:')
          if (url) {
            editor.chain().focus().toggleLink({ href: url }).run()
          }
        }}
        className={`rounded border px-2 py-1 ${
          editor.isActive('link')
            ? 'bg-blue-500 text-white'
            : 'active:bg-blue-500 active:text-white'
        }`}
      >
        Link
      </button>

      {/* List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('bulletList') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-bold'>•</span>
      </button>

      {/* Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('orderedList') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-bold'>1.</span>
      </button>

      {/* Blockquote */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('blockquote') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-bold'>{'”'}</span>
      </button>

      {/* Strike through */}
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`rounded border px-2 py-1 ${
          editor.isActive('strike') ? 'bg-blue-500 text-white' : ''
        }`}
      >
        <span className='font-bold'>~</span>
      </button>

      {/* You Tube */}
      <button
        onClick={() => {
          const url = prompt('Enter the YouTube URL:')
          if (url) {
            editor.commands.setYoutubeVideo({ src: url })
          }
        }}
        className={`rounded border px-2 py-1 ${
          editor.isActive('youtube')
            ? 'bg-blue-500 text-white'
            : 'active:bg-blue-500 active:text-white'
        }`}
      >
        YT
      </button>
    </div>
  )
}
