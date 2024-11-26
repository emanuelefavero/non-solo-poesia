'use client'

import Bold from '@tiptap/extension-bold'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

export default function TipTap() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Image,
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    onFocus: () => setIsFocused(true),
    onBlur: ({ editor }) => {
      if (editor.isEmpty) setIsFocused(false)
    },
    content: '',
    editorProps: {
      attributes: {
        class: 'border border-gray-300 p-4 rounded-md',
      },
    },
    immediatelyRender: false,
  })

  const handlePublish = async () => {
    if (!editor) return
    const htmlContent = editor.getHTML()

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/publish-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: htmlContent }),
      })

      if (!response.ok) {
        throw new Error('Failed to publish post')
      }

      setMessage('Post published successfully!')
      editor.commands.clearContent()
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-3xl'>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={`tiptap-editor ${isFocused ? 'focused' : ''}`}
      />
      <button
        onClick={handlePublish}
        className={`mt-4 rounded bg-blue-600 px-4 py-2 text-white ${
          loading ? 'cursor-not-allowed opacity-50' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Publishing...' : 'Publish'}
      </button>
      {message && <p className='mt-4 text-green-600'>{message}</p>}
    </div>
  )
}

type ToolbarProps = {
  editor: ReturnType<typeof useEditor>
}

function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className='toolbar mb-4 flex gap-2'>
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
