import OrderBy from '@/components/OrderBy'
import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import { POSTS_PER_PAGE } from '@/config/posts'
import { getPosts, getTotalPostCount } from '@/lib/posts'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ page?: string; order_by?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { page, order_by } = await searchParams
  const currentOrderBy = order_by || 'published_at'
  const currentPage = parseInt(page || '1', 10)
  const totalPosts = await getTotalPostCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const posts = await getPosts(currentPage, POSTS_PER_PAGE, currentOrderBy)

  return (
    <>
      <h1 className='mb-4'>Blog</h1>
      <Link href='/test'>Test</Link>
      <OrderBy currentOrderBy={currentOrderBy} />
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentOrderBy={currentOrderBy}
      />
    </>
  )
}
