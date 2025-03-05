import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import type { Editor } from '@tiptap/react'
import { validatePost } from './validatePost'

describe('validatePost', () => {
  const validPost = {
    title: 'Valid Title',
    description: 'A valid description',
    coverImage: 'https://example.com/image.jpg',
    coverImageCloudinary: '',
    htmlContent: 'Valid post content',
    author: authors[0].name,
    category: categories[0].name,
    editor: {} as Editor,
  }

  it('should return an error if title is missing', () => {
    const post = { ...validPost, title: '' }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if title contains characters not allowed in url', () => {
    const post = { ...validPost, title: 'Title with special characters: {}' }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if title is longer than 100 characters', () => {
    const post = { ...validPost, title: 'a'.repeat(101) }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })
})
