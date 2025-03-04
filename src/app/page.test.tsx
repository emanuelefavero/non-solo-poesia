import { render } from '@testing-library/react'
import Home from './page'

import AdBanner from '@/components/AdBanner'

// Mocks
jest.mock('@/components/AdBanner')
jest.mock('@/components/HeroLoader')
jest.mock('@/components/HeroSkeleton')
jest.mock('@/components/OrderBy')
jest.mock('@/components/PopularPostsAside')
jest.mock('@/components/PostListLoader')
jest.mock('@/components/PostListSkeleton')
jest.mock('@/components/Section')
jest.mock('@/components/Title')
jest.mock('@/lib/neon/posts')

async function generateSearchParams(params: { [key: string]: string }) {
  return params
}

const params = {
  page: '1',
  order_by: 'published_at',
  popular_posts_filter: 'all_time',
}

describe('Home', () => {
  test('it renders', async () => {
    const component = await Home({ searchParams: generateSearchParams(params) })
    render(component)
    expect(AdBanner).toHaveBeenCalled()
  })
})
