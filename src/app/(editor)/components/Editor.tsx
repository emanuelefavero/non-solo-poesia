'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'
import { deleteImageFromCloudinary } from '@/app/actions/deleteImageFromCloudinary'
import { uploadImageToCloudinary } from '@/app/actions/uploadImageToCloudinary'
import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
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
import CategorySelector from './CategorySelector'
import CoverImageSelector from './CoverImageSelector'
import DescriptionInput from './DescriptionInput'
import PublishButton from './PublishButton'
import TipTapToolbar from './TipTapToolbar'
import TitleInput from './TitleInput'
import ValidationMessage from './ValidationMessage'

type Props = {
  post?: Post
}

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
    category,
    setCategory,
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
    setMessage({
      type: 'success',
      text: '',
    })
    setTitle(post?.title || '')
    setDescription(post?.description || '')
    setAuthor(post?.author || authors[0].name || '')
    setCategory(post?.category || categories[0].name || '')
    setCoverImage(post?.cover_image || '')
    setCoverImageType(post?.cover_image_cloudinary ? 'file' : 'url')
    setCoverImageCloudinary(post?.cover_image_cloudinary || '')
    setPrevCloudinaryPublicId(post?.cover_image_cloudinary || '')
  }, [
    setProgress,
    setLoading,
    setMessage,
    post,
    setTitle,
    setDescription,
    setAuthor,
    setCategory,
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
        class:
          'min-h-40 rounded border border-zinc-800/40 bg-zinc-200/20 px-3 py-2 text-zinc-800 placeholder:text-zinc-600 focus:border-pink-600 focus:outline-none dark:border-zinc-200/30 dark:bg-zinc-950/40 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-pink-400/80',
      },
    },
    immediatelyRender: false,
  })

  const handleAddCoverImage = () => {
    setLoading(true)
    setProgress(0)
    const url = prompt("Inserisci l'URL dell'immagine:")
    if (url) {
      if (/^https?:\/\/\S+\.\S+/.test(url)) {
        setCoverImage(url)
        setCoverImageCloudinary('')
        setCoverImageType('url')
        setProgress(100)
      } else {
        setProgress(101) // ? 101 to show red progress bar
        alert('Per favore inserisci un URL di immagine valido')
      }
    }

    setLoading(false)
    hideMessageAndResetProgress()
  }

  const handleAddCoverImageCloudinary = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true)
    setProgress(0)
    const file = e.target.files?.[0]

    if (file && file.size > 3 * 1024 * 1024) {
      setLoading(false)
      setProgress(101) // ? 101 to show red progress bar
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
        setProgress(50)

        if (filePreview) {
          setCoverImageCloudinaryPreview(filePreview)
        }

        const uploadResponse = await uploadImageToCloudinary(file)

        if (uploadResponse.message) {
          setLoading(false)
          setProgress(101)
          alert(uploadResponse.message)
          return
        }

        if (uploadResponse) {
          setProgress(100)
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
        setProgress(101)
        console.error('An error occurred:', error)
      } finally {
        setLoading(false)
        hideMessageAndResetProgress()
      }
    }
  }

  const handlePublish = async () => {
    setProgress(0)
    const htmlContent = editor?.getHTML() || ''

    setProgress(25)
    const validationMessage = validatePost({
      title,
      description,
      coverImage,
      coverImageCloudinary,
      htmlContent,
      author,
      category,
      editor,
    })

    if (validationMessage.type === 'error') {
      setMessage(validationMessage)
      return
    }

    setLoading(true)
    setProgress(50)
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
          category,
          ...(post && { id: post.id }),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
      }

      setProgress(100)
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
        setProgress(101) // ? 101 to show red progress bar
        setMessage({
          type: 'error',
          text: `Error: ${error.message}`,
        })
      }
    } finally {
      setLoading(false)
      hideMessageAndResetProgress()
    }
  }

  // Utility function to hide message and reset progress after a few seconds
  function hideMessageAndResetProgress() {
    setTimeout(() => {
      setProgress(0)
      setMessage({
        type: 'success',
        text: '',
      })
    }, 2000)
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
      <CategorySelector />
      <PublishButton handlePublish={handlePublish} />
      <ValidationMessage />
    </div>
  )
}
