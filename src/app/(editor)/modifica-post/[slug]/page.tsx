import Editor from '@/app/(editor)/components/Editor'
import { getPost } from '@/lib/posts'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

// NOTE: This props need to be a Promise, this fix was added with the following code mod: #see https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = { params: Promise<{ slug: string }> }

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
      <h1 className='mb-4'>
        {post.title}{' '}
        <sup className='text-2xl text-yellow-700 dark:text-yellow-500'>
          (Modifica)
        </sup>
      </h1>

      <Editor post={post} />
    </>
  )
}
