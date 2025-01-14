import OrderBy from '@/components/OrderBy'
import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import { CATEGORY_SLUGS } from '@/config/categories'
import { POSTS_PER_PAGE } from '@/config/posts'
import { getPosts, getTotalPostCountByCategory } from '@/lib/posts'
import type { CategorySlug } from '@/types'
import { convertSlugToName } from '@/utils/slug'
import { redirect } from 'next/navigation'

// TIP: This is how you can get both the slug and searchParams from the URL
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string; order_by?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const { page, order_by } = await searchParams

  // Redirect to the homepage if the category slug is not valid
  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) redirect('/')

  const category = convertSlugToName(slug)
  const currentOrderBy = order_by || 'published_at'
  const currentPage = parseInt(page || '1', 10)
  const totalPosts = await getTotalPostCountByCategory(category)
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const posts = await getPosts(
    currentPage,
    POSTS_PER_PAGE,
    currentOrderBy,
    category,
  )

  return (
    <>
      <OrderBy currentOrderBy={currentOrderBy} />
      <h1>{category}</h1>
      <PostList posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        currentOrderBy={currentOrderBy}
      />
    </>
  )
}
