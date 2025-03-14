import Editor from '@/app/(editor)/components/Editor'
import PostTitle from '@/components/Post/PostTitle'
import { POST_NOT_FOUND_MESSAGE } from '@/data/post'
import { TITLE } from '@/data/title'
import { getPost } from '@/lib/neon/posts'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

// NOTE: This props need to be a Promise, this fix was added with the following code mod: #see https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = { params: Promise<{ slug: string }> }

// * Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const post = await getPost(slug)

  if (!post) return { title: POST_NOT_FOUND_MESSAGE }

  return {
    title: `Modifica "${post.title}" - ${TITLE}`,
    description: post.description,
  }
}

// * Page
export default async function Page(props: Props) {
  const params = await props.params
  const post = await getPost(params.slug)
  const { userId } = await auth()
  const allowedIds = process.env.NEXT_PUBLIC_ALLOWED_IDS?.split(',') || []

  // Redirect if the user is not an admin or author, or if the post is not found
  if (!userId || !allowedIds.includes(userId) || !post) {
    redirect('/')
  }

  return (
    <>
      <PostTitle as='h1' className='mt-[5.7rem]'>
        {post.title}{' '}
        <sup className='text-2xl text-yellow-700 dark:text-yellow-500'>
          (Modifica)
        </sup>
      </PostTitle>

      <Editor post={post} />
    </>
  )
}
