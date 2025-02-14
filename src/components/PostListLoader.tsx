import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import { POSTS_PER_PAGE } from '@/config/posts'
import {
  getPosts,
  getTotalPostCount,
  getTotalPostCountByCategory,
} from '@/lib/neon/posts'
import type { OrderBy as OrderByType } from '@/types'

type Props = {
  currentPage: number
  currentOrderBy: OrderByType
  category?: string
}

export default async function Component({
  currentPage,
  currentOrderBy,
  category,
}: Props) {
  const totalPosts = category
    ? await getTotalPostCountByCategory(category)
    : await getTotalPostCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const posts = category
    ? await getPosts(currentPage, POSTS_PER_PAGE, currentOrderBy, category)
    : await getPosts(currentPage, POSTS_PER_PAGE, currentOrderBy)

  return (
    <>
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentOrderBy={currentOrderBy}
      />
    </>
  )
}
