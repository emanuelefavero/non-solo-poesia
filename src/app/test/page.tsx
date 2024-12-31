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
        style={{
          margin: '0 5px',
          padding: '5px 10px',
          backgroundColor: page === currentPage ? '#007BFF' : '#f8f9fa',
          color: page === currentPage ? 'white' : 'black',
          border: '1px solid #ddd',
          cursor: 'pointer',
          pointerEvents: typeof page === 'number' ? 'auto' : 'none',
        }}
        disabled={typeof page !== 'number'}
      >
        {page}
      </button>
    ))
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {currentPosts.map((post: Post) => (
              <li
                key={post.id}
                style={{
                  marginBottom: '10px',
                  border: '1px solid #ddd',
                  padding: '10px',
                }}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => handlePageChange(1)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                backgroundColor: '#f8f9fa',
                color: 'black',
                border: '1px solid #ddd',
                cursor: 'pointer',
              }}
            >
              First
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(totalPages)}
              style={{
                margin: '0 5px',
                padding: '5px 10px',
                backgroundColor: '#f8f9fa',
                color: 'black',
                border: '1px solid #ddd',
                cursor: 'pointer',
              }}
            >
              Last
            </button>
          </div>
        </>
      )}
    </div>
  )
}
