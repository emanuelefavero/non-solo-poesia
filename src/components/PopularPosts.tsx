import CloudinaryImage from '@/components/CloudinaryImage'
import PostTitle from '@/components/Post/PostTitle'
import { getLatestPosts } from '@/lib/posts'
import type { Post } from '@/types'
import Link from 'next/link'

export default async function Component() {
  const posts = await getLatestPosts()

  if (!posts.length) return <p>Nessun post trovato.</p>

  return (
    <ul className='mt-4 flex h-[calc(100%-54px)] flex-col justify-evenly gap-3.5'>
      {posts.map((post, index) => (
        <PopularPost key={post.id} post={post} index={index} />
      ))}
    </ul>
  )
}

function PopularPost({ post, index }: { post: Post; index: number }) {
  return (
    <li className='list-none rounded-md transition-transform duration-200 active:scale-95'>
      <Link
        href={`/post/${post.slug}`}
        className={`${
          index < 4 ? 'flex' : 'hidden'
        } 2lg:flex w-full justify-between gap-3 text-black hover:no-underline dark:text-white`}
        title={post.title.length > 52 ? post.title : ''}
      >
        <PostTitle className='line-clamp-2 w-full text-lg'>
          {post.title}
        </PostTitle>

        <div className='relative aspect-video min-w-[100px]'>
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
