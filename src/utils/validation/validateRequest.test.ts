import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { auth } from '@clerk/nextjs/server'
import { validateRequest } from './validateRequest'

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}))

describe('validateRequest', () => {
  const adminId = process.env.NEXT_PUBLIC_ADMIN_IDS?.split(',')[0]

  // Define a valid request body
  const validBody = {
    title: 'Valid Title',
    description: 'A valid description',
    coverImage: 'https://example.com/image.jpg',
    coverImageCloudinary: '',
    content: 'Valid post content',
    author: authors[0].name,
    category: categories[0].name,
    id: '123',
  }

  // Mock a Request object
  const mockRequest = (body: object) =>
    ({
      json: jest.fn().mockResolvedValue(body),
    }) as unknown as Request

  it('should return 401 if user is not authenticated', async () => {
    ;(auth as unknown as jest.Mock).mockResolvedValue({ userId: null })

    const result = await validateRequest(mockRequest(validBody))
    expect(result.error?.status).toBe(401)
  })

  it('should return 403 if user is not an admin or author', async () => {
    ;(auth as unknown as jest.Mock).mockResolvedValue({ userId: 'user-id' })

    const result = await validateRequest(mockRequest(validBody))
    expect(result.error?.status).toBe(403)
  })

  it('should return 400 if request body is missing required fields', async () => {
    ;(auth as unknown as jest.Mock).mockResolvedValue({ userId: adminId })

    const invalidBody = { ...validBody, title: '' }
    const result = await validateRequest(mockRequest(invalidBody))
    expect(result.error?.status).toBe(400)
  })

  it('should return 400 if author is not valid', async () => {
    ;(auth as unknown as jest.Mock).mockResolvedValue({ userId: adminId })

    const invalidBody = { ...validBody, author: 'Invalid Author' }
    const result = await validateRequest(mockRequest(invalidBody))
    expect(result.error?.status).toBe(400)
  })

  it('should return 400 if category is not valid', async () => {
    ;(auth as unknown as jest.Mock).mockResolvedValue({ userId: adminId })

    const invalidBody = { ...validBody, category: 'Invalid Category' }
    const result = await validateRequest(mockRequest(invalidBody))
    expect(result.error?.status).toBe(400)
  })

  it('should return sanitized data when request is valid', async () => {
    ;(auth as unknown as jest.Mock).mockResolvedValue({ userId: adminId })

    // Define a sanitized request body
    const sanitizedData = {
      title: validBody.title,
      slug: validBody.title.toLowerCase().replace(/ /g, '-'),
      description: validBody.description,
      coverImage: validBody.coverImage,
      coverImageCloudinary: validBody.coverImageCloudinary,
      content: validBody.content,
      author: authors[0].name,
      category: categories[0].name,
      id: validBody.id,
    }

    // Make sure the data is sanitized
    const result = await validateRequest(mockRequest(validBody))
    expect(result.sanitizedData).toEqual(sanitizedData)
  })
})
