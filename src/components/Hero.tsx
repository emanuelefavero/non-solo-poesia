import Category from '@/components/Category'
import CloudinaryImage from '@/components/CloudinaryImage'
import DeletePopover from '@/components/DeletePopover'
import PostDate from '@/components/Post/PostDate'
import PostTitle from '@/components/Post/PostTitle'
import type { Post } from '@/types'
import Link from 'next/link'

type Props = {
  post: Post
}

export default function Component({ post }: Props) {
  return (
    <div className='hidden max-w-3xl flex-col gap-3 5xs:flex'>
      {/* Cover Image */}
      <div className='relative aspect-video w-full'>
        <CloudinaryImage
          title={post.title}
          cover_image={post.cover_image}
          cover_image_cloudinary={post.cover_image_cloudinary}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#2c171f] to-transparent opacity-60'></div>
        <div className='absolute bottom-0 left-0 p-4'>
          <div className='mt-3'>
            {/* Title */}
            <PostTitle
              as='h2'
              className='text-shadow mt-3 text-xl text-white 5xs:text-2xl 2xs:text-3xl sm:text-[2.5rem] sm:leading-[2.75rem]'
            >
              {post.title}
            </PostTitle>
          </div>

          <div className='mt-1.5 hidden 3xs:block'>
            {/* Author */}
            <p className='text-sm text-white'>
              <span className='text-shadow-sm font-medium text-pink-400'>
                {post.author}
              </span>
            </p>
            {/* Date */}
            <PostDate
              published_at={post.published_at}
              updated_at={post.updated_at}
              className='text-shadow-sm font-medium text-[#e4e4e7] dark:text-[#e4e4e7]'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
