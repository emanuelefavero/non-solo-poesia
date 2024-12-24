import type { Message } from '@/types'
import { create } from 'zustand'

interface EditorState {
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
}

export const useEditorStore = create<EditorState>((set) => ({
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
  author: '',
  setAuthor: (author) => set({ author }),
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
}))
