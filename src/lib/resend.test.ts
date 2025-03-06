import type { Post } from '@/types'
import { Resend } from 'resend'
import { sendNewsletter } from './resend'

// Mock Resend API
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn(),
    },
  })),
}))

// Mock Neon database
const mockSql = jest.fn()

// NOTE: We have to use `doMock` instead of `mock` to avoid errors
jest.doMock('@neondatabase/serverless', () => ({
  neon: jest.fn().mockImplementation(() => ({
    sql: mockSql,
  })),
}))

describe('sendNewsletter', () => {
  // Mock post data
  const mockPost: Post = {
    id: '1',
    slug: 'slug',
    title: 'Title',
    description: 'Description',
    cover_image: 'https://example.com/image.jpg',
    content: 'Content',
    author: 'Author',
    category: 'Poesie',
    published_at: '2025-01-01T00:00:00.000Z',
  }

  it('should not send an email if there are no subscribers', async () => {
    mockSql.mockResolvedValue([]) // simulate no subscribers

    await sendNewsletter(mockPost)

    const resendInstance = new Resend(process.env.RESEND_API_KEY)
    expect(resendInstance.emails.send).not.toHaveBeenCalled()
  })
})
