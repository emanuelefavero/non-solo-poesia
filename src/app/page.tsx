import Hero from '@/components/Hero'
import OrderBy from '@/components/OrderBy'
import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import Section from '@/components/Section'
import Title from '@/components/Title'
import { POSTS_PER_PAGE } from '@/config/posts'
import { getLatestPost, getPosts, getTotalPostCount } from '@/lib/posts'
import type { OrderBy as OrderByType } from '@/types'

type Props = {
  searchParams: Promise<{ page?: string; order_by?: OrderByType }>
}

// TODO Add an hero section in the homepage with the latest post shown bigger with an h1 (if you add an h1, remember to remove the h1 in the homepage header). Remove the latest post from the post list of course.
// TODO Style 404 page

export default async function Home({ searchParams }: Props) {
  const { page, order_by } = await searchParams
  const currentOrderBy = order_by || 'published_at'
  const currentPage = parseInt(page || '1', 10)
  const totalPosts = await getTotalPostCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const posts = await getPosts(currentPage, POSTS_PER_PAGE, currentOrderBy)
  const latestPost = await getLatestPost()

  return (
    <>
      <Section>
        <Hero post={latestPost} />
      </Section>
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
