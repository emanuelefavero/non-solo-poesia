import OrderBy from '@/components/OrderBy'
import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import { POSTS_PER_PAGE } from '@/config/posts'
import { getPosts, getTotalPostCount } from '@/lib/posts'

type Props = {
  searchParams: Promise<{ page?: string; order_by?: string }>
}

// TODO Add a category/[slug] page that queries the database with the category slug. The query should be something like: `SELECT * FROM posts WHERE category = ${category} ORDER BY published_at DESC LIMIT ${postsPerPage} OFFSET ${offset}`.

export default async function Home({ searchParams }: Props) {
  const { page, order_by } = await searchParams
  const currentOrderBy = order_by || 'published_at'
  const currentPage = parseInt(page || '1', 10)
  const totalPosts = await getTotalPostCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const posts = await getPosts(currentPage, POSTS_PER_PAGE, currentOrderBy)

  return (
    <>
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
