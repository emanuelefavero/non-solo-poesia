'use client'

import { searchPosts } from '@/app/actions/searchPosts'
import { useSearchStore } from '@/app/cerca/store/searchStore'
import type { Post } from '@/types'

export default function Component() {
  const { query, setQuery, loading, setLoading, setFoundPosts, setMessage } =
    useSearchStore()

  const handleSearch = async () => {
    if (!query) {
      setMessage('👆 Inserisci un termine di ricerca')
      return
    }

    setLoading(true)
    setMessage('Cerco i post...')
    const response = await searchPosts(query)
    setLoading(false)
    setMessage(null)

    // if server action returns {message}, show an error message
    if ('message' in response) {
      setMessage(response.message)
      return
    }

    setFoundPosts(response as Post[])
  }

  return (
    <div className='flex w-full max-w-prose flex-col gap-3 xs:flex-row xs:gap-2'>
      <input
        type='search'
        placeholder='Cerca un post...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        required
        className='w-full'
      />
      <button
        onClick={handleSearch}
        className={`rounded bg-blue-600 px-4 py-2 text-white xs:min-w-[88px] ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? 'Cerco...' : 'Cerca'}
      </button>
    </div>
  )
}
