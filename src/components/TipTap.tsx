'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'

export default function CreatePost() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
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
