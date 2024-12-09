'use client'

import Bold from '@tiptap/extension-bold'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import NextImage from 'next/image'
import { useState } from 'react'
import TipTapToolbar from './TipTapToolbar'

type Message = {
  type: 'success' | 'error'
  text: string
}

export default function Component() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<Message>({
    type: 'success',
    text: '',
  })
  const [isFocused, setIsFocused] = useState(false)
  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Image,
      Link,
      Heading.configure({
        levels: [2, 3],
      }),
      Placeholder.configure({
        placeholder: 'Scrivi qualcosa...',
      }),
      Youtube.configure({
        controls: false,
        nocookie: true,
        modestBranding: true,
        width: 320,
        height: 180,
      }),
    ],
    onFocus: () => setIsFocused(true),
    onBlur: ({ editor }) => {
      if (editor.isEmpty) setIsFocused(false)
    },
    content: '',
    editorProps: {
      attributes: {
        class: 'min-h-40 border border-gray-300 p-2 rounded-md',
      },
    },
    immediatelyRender: false,
  })

  const handlePublish = async () => {
    // Validate title: check if the title is empty
    if (!title) {
      setMessage({
        type: 'error',
        text: 'Please enter a title',
      })
      return
    }

    // Validate title: remove leading and trailing spaces
    setTitle(title.trim())

    // Validate title: accept only alphanumeric characters, spaces, and dashes
    // TODO: Let the title have question marks, exclamation marks, and periods but remember to remove those when creating the file name from the title
    if (!/^[a-zA-Z0-9\s-]+$/.test(title)) {
      setMessage({
        type: 'error',
        text: 'Title can only contain alphanumeric characters, spaces, and dashes',
      })
      return
    }

    // Validate title: limit the title to 100 characters
    if (title.length > 100) {
      setMessage({
        type: 'error',
        text: 'Title must not exceed 100 characters',
      })
      return
    }

    if (!editor) return
    const htmlContent = editor.getHTML()

    // Validate image: check if the image is empty
    if (!coverImage) {
      setMessage({
        type: 'error',
        text: 'Please add a cover image',
      })
      return
    }

    // Validate image: check if the image is a valid URL
    if (!/^https?:\/\/\S+\.\S+/.test(coverImage)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid image URL',
      })
      return
    }

    // Validate content: check if the editor is empty
    if (!htmlContent.length || htmlContent === '<p></p>') {
      setMessage({
        type: 'error',
        text: 'Please enter some content',
      })
      return
    }

    setLoading(true)
    setMessage({
      type: 'success',
      text: '',
    })

    try {
      const response = await fetch('/api/publish-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          coverImage,
          content: htmlContent,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to publish post')
      }

      setMessage({
        type: 'success',
        text: 'Post published successfully!',
      })
      editor.commands.clearContent()
    } catch (error) {
      if (error instanceof Error) {
        setMessage({
          type: 'error',
          text: `Error: ${error.message}`,
        })
      }
    } finally {
      setLoading(false)
      setTitle('')
    }
  }

  return (
    <div className='max-w-3xl'>
      {/* Title */}
      <input
        type='text'
        placeholder='Titolo...'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='mb-4 w-full'
      />

      {/* Add cover image button */}
      <button
        onClick={() => {
          const url = prompt("Inserisci l'URL dell'immagine:")
          if (url) {
            setCoverImage(url)
          }
        }}
        className='mb-4 rounded border border-gray-300 px-4 py-2 active:bg-blue-500 active:text-white'
      >
        {coverImage ? 'Cambia' : 'Aggiungi'} immagine di copertina
      </button>

      {/* Show cover image preview */}
      {coverImage ? (
        <div className='relative mb-4 flex h-[180px] w-[320px]'>
          <NextImage
            src={coverImage}
            fill={true}
            alt='Immagine di copertina'
            className='mb-4 rounded-md'
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        // Image placeholder
        <div className='mb-4 flex h-[180px] w-[320px] select-none flex-wrap items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-sm dark:bg-neutral-900'>
          Anteprima immagine di copertina
        </div>
      )}

      <TipTapToolbar editor={editor} />
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
      {message && (
        // TODO: Hide the message after a few seconds
        <p
          className={`mt-4 font-medium ${
            message.type === 'error'
              ? 'text-rose-600 dark:text-rose-500'
              : 'text-green-600 dark:text-green-500'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
