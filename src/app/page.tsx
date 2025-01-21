import Hero from '@/components/Hero'
import OrderBy from '@/components/OrderBy'
import Pagination from '@/components/Pagination'
import PopularPostsAside from '@/components/PopularPostsAside'
import PostList from '@/components/PostList'
import Section from '@/components/Section'
import Title from '@/components/Title'
import { POSTS_PER_PAGE } from '@/config/posts'
import { getLatestPost, getPosts, getTotalPostCount } from '@/lib/posts'
import type { OrderBy as OrderByType } from '@/types'

type Props = {
  searchParams: Promise<{ page?: string; order_by?: OrderByType }>
}

// TODO Style 404 page

export default async function Home({ searchParams }: Props) {
  const { page, order_by } = await searchParams
  const currentOrderBy = order_by || 'published_at'
  const currentPage = parseInt(page || '1', 10)
  const totalPosts = await getTotalPostCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const posts = await getPosts(currentPage, POSTS_PER_PAGE, currentOrderBy)
  const latestPost = await getLatestPost()

  // TODO Add a "Questo Mese" and "Di Sempre" selector to the aside to select the top posts of the month or of all time

  return (
    <>
      {latestPost && currentPage === 1 && (
        <Section className='flex justify-center gap-4'>
          <Hero post={latestPost} className='flex-1' />
          <PopularPostsAside />
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
        <PostList posts={posts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          currentOrderBy={currentOrderBy}
        />
      </Section>
    </>
  )
}
