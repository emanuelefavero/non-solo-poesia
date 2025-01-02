import Pagination from '@/components/Pagination'
import PostList from '@/components/PostList'
import { POSTS_PER_PAGE } from '@/config/posts'
import { getPosts, getTotalPostCount } from '@/lib/posts'
import Link from 'next/link'

// TODO: Add a filter to sort posts by date, title, or author

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const totalPosts = await getTotalPostCount()
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const posts = await getPosts(currentPage, POSTS_PER_PAGE)

  return (
    <>
      <h1 className='mb-4'>Blog</h1>
      <Link href='/test'>Test</Link>
      <PostList posts={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
