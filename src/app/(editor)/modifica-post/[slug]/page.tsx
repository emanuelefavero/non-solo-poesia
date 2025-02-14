import Editor from '@/app/(editor)/components/Editor'
import PostTitle from '@/components/Post/PostTitle'
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

  if (!post) return { title: 'Post non trovato' }

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
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  // Redirect if the user is not an admin or author, or if the post is not found
  if (!userId || (userId !== adminId && userId !== authorId) || !post) {
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
