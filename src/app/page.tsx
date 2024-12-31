import CloudinaryImage from '@/components/CloudinaryImage'
import { getPosts, getTotalPostCount } from '@/lib/posts'
import type { Post } from '@/types'
import Link from 'next/link'

// TODO: Add a search bar to filter posts by title or content
// TODO: Add a filter to sort posts by date, title, or author
// TODO Change posts per page to 6 👇
const POSTS_PER_PAGE = 1 // ! Change this to 6 !

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

function PostList({ posts }: { posts: Post[] }) {
  if (!posts.length) return <p>Nessun post trovato.</p>

  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(300px,375px))] justify-center gap-4 pl-0'>
      {posts.map((post, index) => (
        <li key={post.id} className='flex list-none flex-col rounded-md'>
          <Link
            href={`/post/${post.slug}`}
            className='text-black hover:no-underline dark:text-white'
          >
            <div className='relative aspect-video w-full'>
              <CloudinaryImage
                title={post.title}
                cover_image={post.cover_image}
                cover_image_cloudinary={post.cover_image_cloudinary}
                index={index}
              />
            </div>

            <div className='py-4'>
              <h2 className='mb-2 text-lg font-semibold'>{post.title}</h2>
              <p className='mb-4 line-clamp-3 text-sm'>{post.description}</p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Scritto da {post.author}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Pubblicato il{' '}
                {new Date(post.published_at)
                  .toLocaleDateString('it-IT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                  .replace(/(\b\w)/g, (char) => char.toUpperCase())}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

type PaginationProps = {
  currentPage: number
  totalPages: number
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = generatePagination(currentPage, totalPages)

  return (
    <div className='mt-4 flex items-center justify-center'>
      {currentPage > 1 && (
        <Link
          href='/?page=1'
          className='mx-0.5 rounded px-4 py-1 font-bold text-black hover:bg-blue-500 hover:text-white hover:no-underline dark:text-white'
          aria-label='Prima pagina'
          title='Prima pagina'
        >
          {'<'}
        </Link>
      )}

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <Link
            key={index}
            href={`/?page=${page}`}
            className={`mx-0.5 rounded px-4 py-1 text-black hover:bg-blue-500 hover:text-white hover:no-underline dark:text-white ${
              page === currentPage ? 'bg-blue-500/80 text-white' : ''
            }`}
          >
            {page}
          </Link>
        ) : (
          <span
            key={index}
            className='mx-1 select-none px-2 py-1 text-black dark:text-white'
          >
            {page}
          </span>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={`/?page=${totalPages}`}
          className='mx-0.5 rounded px-4 py-1 font-bold text-black hover:bg-blue-500 hover:text-white hover:no-underline dark:text-white'
          aria-label='Ultima pagina'
          title='Ultima pagina'
        >
          {'>'}
        </Link>
      )}
    </div>
  )
}

function generatePagination(currentPage: number, totalPages: number) {
  const pages = []

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1, 2)

    if (currentPage > 3) {
      pages.push('...')
    }

    if (currentPage > 2 && currentPage < totalPages - 1) {
      pages.push(currentPage)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    pages.push(totalPages)
  }

  return pages
}
