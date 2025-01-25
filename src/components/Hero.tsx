import CloudinaryImage from '@/components/CloudinaryImage'
import PostAuthor from '@/components/Post/PostAuthor'
import PostDate from '@/components/Post/PostDate'
import PostTitle from '@/components/Post/PostTitle'
import PostViews from '@/components/Post/PostViews'
import type { Post } from '@/types'
import Link from 'next/link'
import './Hero.css'

type Props = {
  post: Post
  className?: string
}

// TODO Change margins between title and info (author, views, date)

export default function Component({ post, className }: Props) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className={`group hidden max-w-3xl flex-col gap-3 rounded-lg transition-transform duration-200 active:scale-[0.98] 5xs:flex ${className}`}
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
        <div className='absolute inset-0 rounded-md bg-gradient-to-t from-[rgba(21,2,9,0.80)] from-0% via-[rgba(13,12,12,0.5)] via-35% to-transparent to-75%'></div>
        <div className='absolute bottom-0 left-0 p-4'>
          <div className='mt-3'>
            {/* Title */}
            <PostTitle
              as='h2'
              className='mt-3 line-clamp-2 text-xl text-white text-shadow 5xs:text-2xl 2xs:text-3xl sm:text-[2.5rem] sm:leading-[2.75rem]'
            >
              {post.title}
            </PostTitle>
          </div>

          <div className='mt-1.5 hidden 3xs:block'>
            <span className='flex flex-wrap gap-2 text-sm'>
              {/* Author */}
              <PostAuthor
                author={post.author}
                className='text-sm text-white'
                authorClassName='hero-author font-medium text-shadow'
                iconClassName='hero-icon'
              />
              {/* Views */}
              <PostViews
                views={post.views}
                className='hero-views font-medium text-shadow'
                iconClassName='hero-icon'
              />
            </span>
            {/* Date */}
            <PostDate
              published_at={post.published_at}
              updated_at={post.updated_at}
              className='font-medium text-[#e4e4e7] text-shadow'
              iconClassName='hero-icon'
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
