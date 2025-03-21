import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import type { CategoryName } from '@/types'
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
    category: categories[0].name as CategoryName,
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

  it('should return an error if description is missing', () => {
    const post = { ...validPost, description: '' }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if description is longer than 130 characters', () => {
    const post = { ...validPost, description: 'a'.repeat(131) }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if description has special characters', () => {
    const post = {
      ...validPost,
      description: 'Description with special characters: {}',
    }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if coverImage and coverImageCloudinary are missing', () => {
    const post = { ...validPost, coverImage: '', coverImageCloudinary: '' }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if coverImage url is invalid', () => {
    const post = { ...validPost, coverImage: 'invalid-url' }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if htmlContent is missing', () => {
    let post = { ...validPost, htmlContent: '' }
    let result = validatePost(post)
    expect(result.type).toBe('error')

    post = { ...validPost, htmlContent: '<p></p>' }
    result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if author is missing', () => {
    const post = { ...validPost, author: '' }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if author is not valid', () => {
    const post = { ...validPost, author: 'Invalid Author' }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if category is missing', () => {
    const post = { ...validPost, category: '' as CategoryName }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if category is not valid', () => {
    const post = { ...validPost, category: 'Invalid Category' as CategoryName }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return an error if editor is missing', () => {
    const post = { ...validPost, editor: null }
    const result = validatePost(post)
    expect(result.type).toBe('error')
  })

  it('should return success if all fields are valid', () => {
    const result = validatePost(validPost)
    expect(result.type).toBe('success')
  })
})
