import Category from '@/components/Category'
import CloudinaryImage from '@/components/CloudinaryImage'
import DeletePopover from '@/components/DeletePopover'
import PopularPostsAside from '@/components/PopularPostsAside'
import PostDescription from '@/components/Post/PostDescription'
import PostInfo from '@/components/Post/PostInfo'
import PostTitle from '@/components/Post/PostTitle'
import Section from '@/components/Section'
import { TITLE } from '@/data/title'
import { getPost, incrementPostViews } from '@/lib/posts'
import { PopularPostsFilter } from '@/types'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import './styles.css'

// NOTE: This props need to be a Promise, this fix was added with the following code mod: #see https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = {
  params: Promise<{ slug: string; popular_posts_filter: PopularPostsFilter }>
  searchParams: Promise<{ popular_posts_filter?: PopularPostsFilter }>
}

// * Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  await incrementPostViews(slug)
  const post = await getPost(slug)

  if (!post) return { title: 'Post non trovato' }

  return {
    title: `${post.title} - ${TITLE}`,
    description: post.description,
  }
}

// * Page
export default async function Page({ params, searchParams }: Props) {
  const slug = (await params).slug
  const post = await getPost(slug)
  const { popular_posts_filter } = await searchParams
  const { userId } = await auth()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  if (!post) return <p>Post non trovato.</p>

  return (
    <Section className='flex justify-center gap-4'>
      <div className='flex w-full max-w-3xl flex-col gap-3'>
        {/* Cover Image */}
        <div className='relative aspect-video w-full'>
          <CloudinaryImage
            title={post.title}
            cover_image={post.cover_image}
            cover_image_cloudinary={post.cover_image_cloudinary}
          />
        </div>
        <div className='mt-3'>
          {/* Category */}
          <Category category={post.category} className='text-sm' />

          {/* Title */}
          <PostTitle
            as='h1'
            className='mt-3 text-xl 5xs:text-[2.5rem] 5xs:leading-[2.75rem]'
          >
            {post.title}
          </PostTitle>

          {/* Description */}
          <PostDescription description={post.description} />
        </div>

        {/* Post Info */}
        <PostInfo post={post} />

        {/* Edit and Delete Buttons */}
        {(userId === adminId || userId === authorId) && (
          <div className='mt-2 flex gap-2'>
            {/* Delete popover */}
            <DeletePopover slug={post.slug} />

            {/* Edit Button */}
            <Link
              href={`/modifica-post/${post.slug}`}
              className='font-semibold text-yellow-700 transition-transform duration-200 hover:text-yellow-600 hover:no-underline active:scale-95 dark:text-yellow-500 dark:hover:text-yellow-400'
            >
              Modifica
            </Link>
          </div>
        )}

        {/* Content */}
        <div
          className='post-content'
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </div>
      <PopularPostsAside popular_posts_filter={popular_posts_filter} />
    </Section>
  )
}
