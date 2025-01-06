import type { Post } from '@/types'
import { neon } from '@neondatabase/serverless'

// Get posts from the database
export async function getPosts(
  page: number,
  postsPerPage: number,
  currentOrderBy: string,
) {
  const sql = neon(process.env.DATABASE_URL as string)

  // Calculate the offset for the current page
  const offset = (page - 1) * postsPerPage

  if (currentOrderBy === 'title') {
    // Order by title in ascending order
    const data = await sql`
      SELECT * FROM posts
      ORDER BY title ASC
      LIMIT ${postsPerPage} OFFSET ${offset}
    `
    return data as Post[]
  } else {
    // Order by published_at in descending order
    const data = await sql`
      SELECT * FROM posts
      ORDER BY published_at DESC
      LIMIT ${postsPerPage} OFFSET ${offset}
    `
    return data as Post[]
  }

  // NOTE: Two queries are needed because the ORDER BY clause cannot be parameterized @see https://github.com/vercel/storage/issues/495
}

// Get the total count of posts
export async function getTotalPostCount() {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT COUNT(*) as count FROM posts
  `
  return data[0]?.count || 0
}
