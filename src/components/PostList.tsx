import Category from '@/components/Category'
import CloudinaryImage from '@/components/CloudinaryImage'
import PostDate from '@/components/Post/PostDate'
import PostTitle from '@/components/Post/PostTitle'
import type { Post } from '@/types'
import Link from 'next/link'

export default function Component({ posts }: { posts: Post[] }) {
  if (!posts.length) return <p>Nessun post trovato.</p>

  return (
    <ul className='grid grid-cols-[repeat(auto-fit,minmax(30px,375px))] justify-center gap-4 pl-0 pt-28 5xs:pt-0 3xs:grid-cols-[repeat(auto-fit,minmax(300px,375px))]'>
      {posts.map((post, index) => (
        <PostListItem key={post.id} post={post} index={index} />
      ))}
    </ul>
  )
}

function PostListItem({ post, index }: { post: Post; index: number }) {
  return (
    <li className='flex list-none flex-col rounded-md'>
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
          <Category category={post.category} className='text-sm' />
          <PostTitle className='text-xl 5xs:text-3xl'>{post.title}</PostTitle>
          <p className='mt-2.5 line-clamp-3 text-[1.0625rem] font-normal leading-[1.625rem] tracking-wide text-zinc-600 dark:text-zinc-200'>
            {post.description}
          </p>
          {/* TODO Create PostAuthor component to prevent duplicate in PostList */}
          <p className='mt-4 text-sm text-zinc-600 dark:text-zinc-300'>
            Scritto da{' '}
            <span className='text-pink-600 dark:text-pink-400'>
              {post.author}
            </span>
          </p>
          <PostDate
            published_at={post.published_at}
            updated_at={post.updated_at}
          />
        </div>
      </Link>
    </li>
  )
}
