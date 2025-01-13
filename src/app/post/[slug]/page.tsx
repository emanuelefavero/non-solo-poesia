import Category from '@/components/Category'
import CloudinaryImage from '@/components/CloudinaryImage'
import DeletePopover from '@/components/DeletePopover'
import PostDate from '@/components/Post/PostDate'
import PostTitle from '@/components/Post/PostTitle'
import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import Link from 'next/link'
import './styles.css'

// Get post data from neon db by slug (the slug comes from the URL)
async function getPost(slug: string) {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT * FROM posts
    WHERE slug = ${slug}
  `
  if (!data) return null
  return data[0]
}

// NOTE: This props need to be a Promise, this fix was added with the following code mod: #see https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = { params: Promise<{ slug: string }> }

export default async function Page({ params }: Props) {
  const slug = (await params).slug
  const post = await getPost(slug)
  const { userId } = await auth()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  if (!post) return <p>Post non trovato.</p>

  return (
    <div className='flex max-w-3xl flex-col gap-3'>
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
        <PostTitle as='h1' title={post.title} className='mt-3' />

        {/* Description */}
        <h2 className='mt-2.5 line-clamp-6 text-[1.2rem] font-normal leading-7 tracking-wide text-zinc-600 dark:text-zinc-300'>
          {post.description}
        </h2>
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
  )
}
