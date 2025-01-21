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
        <AsidePostListItem key={post.id} post={post} index={index} />
      ))}
    </ul>
  )
}

function AsidePostListItem({ post, index }: { post: Post; index: number }) {
  return (
    <li className='group list-none rounded-md transition-transform duration-200 active:scale-95'>
      <Link
        href={`/post/${post.slug}`}
        className={`${
          index < 4 ? 'flex' : 'hidden'
        } 2lg:flex w-full justify-between gap-3 text-black hover:no-underline dark:text-white`}
        title={post.title.length > 52 ? post.title : ''}
      >
        <PostTitle className='line-clamp-2 w-full text-lg transition-colors duration-200 group-hover:text-pink-800/80 dark:group-hover:text-pink-200'>
          {post.title}
        </PostTitle>

        <div className='relative aspect-video min-w-[100px]'>
          <CloudinaryImage
            title={post.title}
            cover_image={post.cover_image}
            cover_image_cloudinary={post.cover_image_cloudinary}
            index={index}
            className='rounded-[0.225rem]'
          />
        </div>
      </Link>
    </li>
  )
}
