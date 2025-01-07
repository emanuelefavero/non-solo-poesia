import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import type { CategoryNames, Message } from '@/types'
import { create } from 'zustand'

type EditorState = {
  progress: number
  setProgress: (progress: number) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  message: Message
  setMessage: (message: Message) => void
  isFocused: boolean
  setIsFocused: (isFocused: boolean) => void
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  author: string
  setAuthor: (author: string) => void
  category: CategoryNames
  setCategory: (category: CategoryNames) => void
  coverImage: string
  setCoverImage: (coverImage: string) => void
  coverImageType: 'url' | 'file'
  setCoverImageType: (coverImageType: 'url' | 'file') => void
  coverImageCloudinaryPreview: string | ArrayBuffer | null
  setCoverImageCloudinaryPreview: (preview: string | ArrayBuffer | null) => void
  coverImageCloudinary: string
  setCoverImageCloudinary: (id: string) => void
  prevCloudinaryPublicId: string
  setPrevCloudinaryPublicId: (id: string) => void
  clearPost: () => void
}

export const useEditorStore = create<EditorState>((set) => ({
  progress: 0,
  setProgress: (progress) => set({ progress }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  message: { type: 'success', text: '' },
  setMessage: (message) => set({ message }),
  isFocused: false,
  setIsFocused: (isFocused) => set({ isFocused }),
  title: '',
  setTitle: (title) => set({ title }),
  description: '',
  setDescription: (description) => set({ description }),
  author: authors[0].name,
  setAuthor: (author) => set({ author }),
  category: categories[0].name,
  setCategory: (category) => set({ category }),
  coverImage: '',
  setCoverImage: (coverImage) => set({ coverImage }),
  coverImageType: 'url',
  setCoverImageType: (coverImageType) => set({ coverImageType }),
  coverImageCloudinaryPreview: null,
  setCoverImageCloudinaryPreview: (preview) =>
    set({ coverImageCloudinaryPreview: preview }),
  coverImageCloudinary: '',
  setCoverImageCloudinary: (id) => set({ coverImageCloudinary: id }),
  prevCloudinaryPublicId: '',
  setPrevCloudinaryPublicId: (id) => set({ prevCloudinaryPublicId: id }),
  clearPost: () => {
    set({
      progress: 0,
      loading: false,
      title: '',
      description: '',
      coverImage: '',
      coverImageCloudinary: '',
      coverImageCloudinaryPreview: null,
      author: authors[0].name,
      category: categories[0].name,
    })
  },
}))
