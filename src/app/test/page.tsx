'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  return (
    <>
      <h1>Test</h1>
      <Component />
    </>
  )
}

type Post = {
  id: number
  title: string
  body: string
}

function Component() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const postsPerPage = 10

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
        )
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const totalPages = Math.ceil(posts.length / postsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const renderPagination = () => {
    const pages = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push(2)

      if (currentPage > 3) {
        pages.push('...')
      }

      if (currentPage > 2 && currentPage < totalPages - 1) {
        pages.push(currentPage)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      pages.push(totalPages)
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        disabled={typeof page !== 'number'}
        className={`${
          currentPage === page ? 'bg-blue-500 text-white' : ''
        } rounded px-3 py-1`}
      >
        {page}
      </button>
    ))
  }

  return (
    <div>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className='list-none'>
            {currentPosts.map((post: Post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
          <div className='flex gap-3'>
            <button
              onClick={() => handlePageChange(1)}
              aria-label='First Page'
              title='First Page'
            >
              {'<'}
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(totalPages)}
              aria-label='Last Page'
              title='Last Page'
            >
              {'>'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
