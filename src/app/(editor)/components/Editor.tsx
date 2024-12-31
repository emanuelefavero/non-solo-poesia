'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'
import { deleteImageFromCloudinary } from '@/app/actions/deleteImageFromCloudinary'
import { uploadImageToCloudinary } from '@/app/actions/uploadImageToCloudinary'
import { authors } from '@/data/authors'
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
import AuthorSelector from './AuthorSelector'
import CoverImageSelector from './CoverImageSelector'
import DescriptionInput from './DescriptionInput'
import PublishButton from './PublishButton'
import TipTapToolbar from './TipTapToolbar'
import TitleInput from './TitleInput'
import ValidationMessage from './ValidationMessage'

type Props = {
  post?: Post
}

// TODO add progress bar for handleAddCoverImageCloudinary function

export default function Component({ post }: Props) {
  const {
    setProgress,
    setLoading,
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
    setProgress(0)
    setLoading(false)
    setTitle(post?.title || '')
    setDescription(post?.description || '')
    setAuthor(post?.author || authors[0].name || '')
    setCoverImage(post?.cover_image || '')
    setCoverImageType(post?.cover_image_cloudinary ? 'file' : 'url')
    setCoverImageCloudinary(post?.cover_image_cloudinary || '')
    setPrevCloudinaryPublicId(post?.cover_image_cloudinary || '')
  }, [
    setProgress,
    setLoading,
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
    setProgress(0)
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
      setProgress(100)
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
      <AuthorSelector />
      <PublishButton handlePublish={handlePublish} />
      <ValidationMessage />
    </div>
  )
}
