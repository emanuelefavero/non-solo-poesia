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
    <div className='flex max-w-3xl flex-col gap-3'>
      {/* Cover Image */}
      <div className='relative aspect-video w-full'>
        <CloudinaryImage
          title={post.title}
          cover_image={post.cover_image}
          cover_image_cloudinary={post.cover_image_cloudinary}
        />
        <div className='absolute bottom-0 left-0 p-4'>
          <div className='mt-3'>
            {/* Title */}
            <PostTitle
              as='h1'
              className='mt-3 text-xl 5xs:text-[2.5rem] 5xs:leading-[2.75rem]'
            >
              {post.title}
            </PostTitle>
          </div>

          <div className='mt-2.5'>
            {/* Author */}
            <p className='text-sm'>
              Scritto da{' '}
              <span className='text-pink-600 dark:text-pink-400'>
                {post.author}
              </span>
            </p>
            {/* Date */}
            <PostDate
              published_at={post.published_at}
              updated_at={post.updated_at}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
