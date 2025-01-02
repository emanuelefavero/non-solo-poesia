'use client'

import { searchPosts } from '@/app/actions/searchPosts'
import type { Post } from '@/types'
import { useState } from 'react'

export default function Page() {
  const [results, setResults] = useState<Post[] | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <>
      <h1>Cerca post</h1>

      <button
        onClick={async () => {
          const posts = await searchPosts('Pasta')

          // if server action returns {message}, show an error message
          if ('message' in posts) {
            setMessage(posts.message)
            return
          }

          setResults(posts as Post[])
        }}
      >
        Cerca
      </button>

      <code>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </code>

      {message && <p>{message}</p>}
    </>
  )
}
