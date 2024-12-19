import CloudinaryImage from '@/components/CloudinaryImage'
import { neon } from '@neondatabase/serverless'
import Link from 'next/link'

// TODO: Limit the number of posts to display on the home page (add pagination)
// TODO: Add a search bar to filter posts by title or content
// TODO: Add a filter to sort posts by date, title, or author
// TODO: Move the getAllPosts function to a separate file (e.g., src/lib/posts.ts)

// Get all posts from the neon database
async function getAllPosts() {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT * FROM posts
    ORDER BY published_at DESC
  `
  if (!data) return []
  return data
}

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <>
      <h1 className='mb-4'>Blog</h1>
      <Link href='/test'>Test</Link>

      {!posts.length ? (
        <p>Nessun post trovato.</p>
      ) : (
        <ul className='grid grid-cols-[repeat(auto-fit,minmax(300px,375px))] justify-center gap-4 pl-0'>
          {posts.map((post, index) => (
            <li key={post.id} className='flex list-none flex-col rounded-md'>
              <Link
                href={`/post/${post.slug}`}
                className='text-black hover:no-underline dark:text-white'
              >
                {/* Cover Image */}
                <div className='relative aspect-video w-full'>
                  <CloudinaryImage
                    title={post.title}
                    cover_image={post.cover_image}
                    index={index}
                  />
                </div>

                {/* Content Wrapper */}
                <div className='py-4'>
                  {/* Title */}
                  <h2 className='mb-2 text-lg font-semibold'>{post.title}</h2>

                  {/* Description */}
                  <p className='mb-4 line-clamp-3 text-sm'>
                    {post.description}
                  </p>

                  {/* Author */}
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    Scritto da {post.author}
                  </p>

                  {/* Date */}
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
      )}
    </>
  )
}
