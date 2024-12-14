import TipTap from '@/components/TipTap'
import type { Post } from '@/types'
import { neon } from '@neondatabase/serverless'

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

  if (!post) return <p>Post non trovato.</p>

  // TODO protect this route with Clerk

  return (
    <>
      <h1 className='mb-4'>
        {post.title}{' '}
        <sup className='text-2xl text-yellow-600 dark:text-yellow-500'>
          (Modifica)
        </sup>
      </h1>

      <TipTap post={post} />
    </>
  )
}
