'use client'

import { deleteImageFromCloudinary } from '@/app/actions/deleteImageFromCloudinary'
import { uploadImageToCloudinary } from '@/app/actions/uploadImageToCloudinary'
import { authors } from '@/data/authors'
import { useEditorStore } from '@/stores/editorStore'
import type { Post } from '@/types'
import { validatePost } from '@/utils/validatePost'
import Bold from '@tiptap/extension-bold'
import Heading from '@tiptap/extension-heading'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import CoverImageSelector from './CoverImageSelector'
import DescriptionInput from './DescriptionInput'
import TipTapToolbar from './TipTapToolbar'
import TitleInput from './TitleInput'

type Props = {
  post?: Post
}

export default function Component({ post }: Props) {
  const {
    loading,
    setLoading,
    message,
    setMessage,
    isFocused,
    setIsFocused,
    title,
    setTitle,
    description,
    setDescription,
    author,
    setAuthor,
    coverImage,
    setCoverImage,
    setCoverImageType,
    setCoverImageCloudinaryPreview,
    coverImageCloudinary,
    setCoverImageCloudinary,
    prevCloudinaryPublicId,
    setPrevCloudinaryPublicId,
    clearPost,
  } = useEditorStore()

  useEffect(() => {
    setTitle(post?.title || '')
    setDescription(post?.description || '')
    setAuthor(post?.author || authors[0].name || '')
    setCoverImage(post?.cover_image || '')
    setCoverImageType(post?.cover_image_cloudinary ? 'file' : 'url')
    setCoverImageCloudinary(post?.cover_image_cloudinary || '')
    setPrevCloudinaryPublicId(post?.cover_image_cloudinary || '')
  }, [
    post,
    setTitle,
    setDescription,
    setAuthor,
    setCoverImage,
    setCoverImageType,
    setCoverImageCloudinary,
    setPrevCloudinaryPublicId,
  ])

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
    content: post?.content || '',
    editorProps: {
      attributes: {
        class: 'min-h-40 border border-gray-300 p-2 rounded-md',
      },
    },
    immediatelyRender: false,
  })

  const handleAddCoverImage = () => {
    const url = prompt("Inserisci l'URL dell'immagine:")
    if (url) {
      if (/^https?:\/\/\S+\.\S+/.test(url)) {
        setCoverImage(url)
        setCoverImageCloudinary('')
        setCoverImageType('url')
      } else {
        alert('Per favore inserisci un URL di immagine valido')
      }
    }
  }

  const handleAddCoverImageCloudinary = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]

    if (file && file.size > 3 * 1024 * 1024) {
      alert('File size must be less than 3MB')
      return
    }

    if (file) {
      try {
        const reader = new FileReader()

        const filePreview = await new Promise<string | ArrayBuffer | null>(
          (resolve, reject) => {
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = () => reject(new Error('Error reading file'))
            reader.readAsDataURL(file)
          },
        )

        if (filePreview) {
          setCoverImageCloudinaryPreview(filePreview)
        }

        const uploadResponse = await uploadImageToCloudinary(file)

        if (uploadResponse.message) {
          alert(uploadResponse.message)
          return
        }

        if (uploadResponse) {
          setCoverImageCloudinary(uploadResponse.public_id)
          setCoverImage('')
          setCoverImageType('file')

          if (
            prevCloudinaryPublicId &&
            prevCloudinaryPublicId !== uploadResponse.public_id
          ) {
            const deleteResponse = await deleteImageFromCloudinary(
              prevCloudinaryPublicId,
            )

            if (deleteResponse && deleteResponse.message) {
              alert(deleteResponse.message)
            }

            setPrevCloudinaryPublicId(uploadResponse.public_id)
          }
        }
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
  }

  const handlePublish = async () => {
    const htmlContent = editor?.getHTML() || ''

    const validationMessage = validatePost({
      title,
      description,
      coverImage,
      coverImageCloudinary,
      htmlContent,
      author,
      editor,
    })

    if (validationMessage.type === 'error') {
      setMessage(validationMessage)
      return
    }

    setLoading(true)
    setMessage({
      type: 'success',
      text: '',
    })

    try {
      const method = post ? 'PUT' : 'POST'

      const response = await fetch('/api/post', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          coverImage,
          coverImageCloudinary,
          content: htmlContent,
          author,
          ...(post && { id: post.id }),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }

      setMessage({
        type: 'success',
        text: post
          ? 'Post aggiornato con successo!'
          : 'Post pubblicato con successo!',
      })

      if (!post) {
        editor?.commands.clearContent()
        clearPost()
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage({
          type: 'error',
          text: `Error: ${error.message}`,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative max-w-3xl'>
      <TitleInput />
      <DescriptionInput />
      <CoverImageSelector
        handleAddCoverImage={handleAddCoverImage}
        handleAddCoverImageCloudinary={handleAddCoverImageCloudinary}
      />
      <TipTapToolbar editor={editor} />
      <EditorContent
        editor={editor}
        className={`tiptap-editor mb-4 ${isFocused ? 'focused' : ''}`}
      />
      <AuthorSelector author={author} setAuthor={setAuthor} />
      <PublishButton loading={loading} handlePublish={handlePublish} />
      <ValidationMessage message={message} />
    </div>
  )
}

// AuthorSelector Component
const AuthorSelector = ({
  author,
  setAuthor,
}: {
  author: string
  setAuthor: (value: string) => void
}) => (
  <div className='mb-4 flex flex-col gap-2'>
    <label htmlFor='author' className='font-medium'>
      Autore
    </label>
    <select
      id='author'
      className='max-w-[151px]'
      value={author}
      onChange={(e) => setAuthor(e.target.value)}
    >
      {authors.map((author) => (
        <option key={author.id} value={author.name}>
          {author.name}
        </option>
      ))}
    </select>
  </div>
)

// PublishButton Component
const PublishButton = ({
  loading,
  handlePublish,
}: {
  loading: boolean
  handlePublish: () => void
}) => (
  <button
    onClick={handlePublish}
    className={`min-w-[138px] rounded bg-blue-600 px-4 py-2 text-white ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
    disabled={loading}
  >
    {loading ? 'Pubblicazione...' : 'Pubblica'}
  </button>
)

// ValidationMessage Component
const ValidationMessage = ({
  message,
}: {
  message: { type: string; text: string } | null
}) =>
  message ? (
    <p
      className={`mt-4 font-medium ${message.type === 'error' ? 'text-rose-600 dark:text-rose-500' : 'text-green-600 dark:text-green-500'}`}
    >
      {message.text}
    </p>
  ) : null
