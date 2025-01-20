import CloudinaryImage from '@/components/CloudinaryImage'
import PostTitle from '@/components/Post/PostTitle'
import { getLatestPosts } from '@/lib/posts'
import type { Post } from '@/types'
import Link from 'next/link'

export default async function Component() {
  const posts = await getLatestPosts()

  if (!posts.length) return <p>Nessun post trovato.</p>

  return (
    <ul className='mt-2 flex flex-col gap-4'>
      {posts.map((post, index) => (
        <PostListItem key={post.id} post={post} index={index} />
      ))}
    </ul>
  )
}

function PostListItem({ post, index }: { post: Post; index: number }) {
  return (
    <li className='flex w-full list-none flex-row justify-between rounded-md bg-red-500 transition-transform duration-200 active:scale-95'>
      <Link
        href={`/post/${post.slug}`}
        className='text-black hover:no-underline dark:text-white'
      >
        <PostTitle className='bg-blue-500 text-lg'>{post.title}</PostTitle>

        <div className='relative aspect-video w-[100px] bg-green-500'>
          <CloudinaryImage
            title={post.title}
            cover_image={post.cover_image}
            cover_image_cloudinary={post.cover_image_cloudinary}
            index={index}
          />
        </div>
      </Link>
    </li>
  )
}
