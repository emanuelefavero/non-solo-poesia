import { neon } from '@neondatabase/serverless'

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

export default async function Page(props: Props) {
  const params = await props.params
  const post = await getPost(params.slug)

  if (!post) return <p>Post non trovato.</p>

  return (
    <>
      <h1>{post.title}</h1>

      {/* Author */}
      <span>Scritto da {post.author}</span>

      {/* Date */}
      {/* Date data example: 2024-12-10 07:23:57.257+00 */}
      <span>
        Pubblicato il{' '}
        {new Date(post.publishedat)
          .toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
          // Capitalize the first letter of the month
          .replace(/(\b\w)/g, (char) => char.toUpperCase())}
      </span>

      {/* Content */}
      <div
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </>
  )
}
