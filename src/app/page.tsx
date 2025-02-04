// import Hero from '@/components/Hero'
import HeroLoader from '@/components/HeroLoader'
import HeroSkeleton from '@/components/HeroSkeleton'
import OrderBy from '@/components/OrderBy'
import PopularPostsAside from '@/components/PopularPostsAside'
import PostListLoader from '@/components/PostListLoader'
import PostListSkeleton from '@/components/PostListSkeleton'
import Section from '@/components/Section'
import Title from '@/components/Title'
import { getLatestPost } from '@/lib/posts'
import type { OrderBy as OrderByType, PopularPostsFilter } from '@/types'
import { Suspense } from 'react'

type Props = {
  searchParams: Promise<{
    page?: string
    order_by?: OrderByType
    popular_posts_filter?: PopularPostsFilter
  }>
}

// TODO Style 404 page
// TODO Add mailing list subscription form (below post list)

export default async function Home({ searchParams }: Props) {
  const { page, order_by, popular_posts_filter } = await searchParams
  const currentOrderBy = order_by || 'published_at'
  const currentPage = parseInt(page || '1', 10)
  const latestPost = await getLatestPost()

  return (
    <>
      {latestPost && currentPage === 1 && (
        <Section className='flex justify-center gap-4'>
          <Suspense fallback={<HeroSkeleton className='flex-1' />}>
            <HeroLoader />
          </Suspense>
          {/* <HeroSkeleton className='flex-1' /> */}
          <PopularPostsAside popular_posts_filter={popular_posts_filter} />
        </Section>
      )}
      <Section>
        <Title>
          {currentOrderBy === 'title' ? (
            <span>
              Tutti i Post{' '}
              <sup className='text-pink-600 dark:text-pink-400'>A-Z</sup>
            </span>
          ) : (
            'Ultimi Post'
          )}
        </Title>
        <OrderBy currentOrderBy={currentOrderBy} />

        <Suspense fallback={<PostListSkeleton />}>
          <PostListLoader
            currentPage={currentPage}
            currentOrderBy={currentOrderBy}
          />
        </Suspense>
      </Section>
    </>
  )
}
