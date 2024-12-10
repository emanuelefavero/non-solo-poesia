import { neon } from '@neondatabase/serverless'
import Link from 'next/link'

// TODO: Limit the number of posts to display on the home page (add pagination)
// TODO: Add a search bar to filter posts by title or content
// TODO: Add a filter to sort posts by date, title, or author
// TODO: Move the getAllPosts function to a separate file (e.g., src/lib/posts.ts)

// Get all posts from the neon database
export async function getAllPosts() {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT * FROM posts
    ORDER BY publishedAt DESC
  `
  if (!data) return []
  return data
}

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <>
      <h1>Blog</h1>

      {!posts.length ? (
        <p>Nessun post trovato.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/post/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
