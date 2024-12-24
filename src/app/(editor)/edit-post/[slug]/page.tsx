import Editor from '@/app/(editor)/components/Editor'
import type { Post } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import { redirect } from 'next/navigation'

// Get post data from neon db by slug (the slug comes from the URL)
async function getPost(slug: string) {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT * FROM posts
    WHERE slug = ${slug}
  `
  if (!data) return null
  return data[0] as Post | null
}

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
        <sup className='text-2xl text-yellow-600 dark:text-yellow-500'>
          (Modifica)
        </sup>
      </h1>

      <Editor post={post} />
    </>
  )
}
