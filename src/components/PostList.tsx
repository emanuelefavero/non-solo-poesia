import CloudinaryImage from '@/components/CloudinaryImage'
import type { Post } from '@/types'
import Link from 'next/link'

export default function Component({ posts }: { posts: Post[] }) {
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
