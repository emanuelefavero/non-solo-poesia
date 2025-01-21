import CloudinaryImage from '@/components/CloudinaryImage'
import PostDate from '@/components/Post/PostDate'
import PostTitle from '@/components/Post/PostTitle'
import type { Post } from '@/types'
import Link from 'next/link'

type Props = {
  post: Post
  className?: string
}

// TODO Set the date text color to white (it's still too dark when the background image is white)
// TODO Make sure the hero image has rounded corners on all 4 corners

export default function Component({ post, className }: Props) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className={`group hidden max-w-3xl flex-col gap-3 rounded-lg border border-zinc-800/20 transition-transform duration-200 active:scale-[0.98] 5xs:flex dark:border-zinc-200/25 ${className}`}
      title={post.title.length > 52 ? post.title : ''}
    >
      {/* Cover Image */}
      {/* Hover gradient background */}
      <div className='relative aspect-video w-full from-pink-800/20 to-pink-200/30 content-none after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-t after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-30 dark:from-pink-200/20 dark:to-pink-800/30'>
        <CloudinaryImage
          title={post.title}
          cover_image={post.cover_image}
          cover_image_cloudinary={post.cover_image_cloudinary}
        />
        {/* Gradient background */}
        <div className='absolute inset-0 rounded-md bg-gradient-to-t from-white/80 from-0% via-white/50 via-35% to-transparent to-75% dark:from-[rgba(21,2,9,0.80)] dark:via-[rgba(13,12,12,0.5)]'></div>
        <div className='absolute bottom-0 left-0 p-4'>
          <div className='mt-3'>
            {/* Title */}
            <PostTitle
              as='h2'
              className='mt-3 line-clamp-2 text-xl text-shadow 5xs:text-2xl 2xs:text-3xl sm:text-[2.5rem] sm:leading-[2.75rem]'
            >
              {post.title}
            </PostTitle>
          </div>

          <div className='mt-1.5 hidden 3xs:block'>
            {/* Author */}
            <p className='text-sm text-white'>
              <span className='font-medium text-pink-600 text-shadow dark:text-pink-300'>
                {post.author}
              </span>
            </p>
            {/* Date */}
            <PostDate
              published_at={post.published_at}
              updated_at={post.updated_at}
              className='font-medium text-zinc-700 text-shadow dark:text-[#e4e4e7]'
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
