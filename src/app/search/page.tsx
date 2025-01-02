'use client'

import { searchPosts } from '@/app/actions/searchPosts'
import type { Post } from '@/types'
import { useState } from 'react'

// TODO add loading spinner

export default function Page() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [foundPosts, setFoundPosts] = useState<Post[] | null>(null)
  const [message, setMessage] = useState<string | null>(null)

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
    <div className='min-h-[calc(100vh-90px)]'>
      <h1 className='mb-8'>Cerca post</h1>

      <div className='flex w-full max-w-prose flex-col gap-3 xs:flex-row xs:gap-2'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Cerca un post...'
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

      <p
        className={`mt-1 min-h-[36px] font-semibold italic text-yellow-700 transition-opacity duration-300 dark:text-yellow-500 ${
          message ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {message}
      </p>

      {foundPosts && (
        <ul>
          {foundPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
