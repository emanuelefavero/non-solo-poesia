import type { Post } from '@/types'
import { create } from 'zustand'

type SearchState = {
  query: string
  setQuery: (query: string) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  foundPosts: Post[] | null
  setFoundPosts: (posts: Post[] | null) => void
  message: string | null
  setMessage: (message: string | null) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  foundPosts: null,
  setFoundPosts: (foundPosts) => set({ foundPosts }),
  message: null,
  setMessage: (message) => set({ message }),
}))
