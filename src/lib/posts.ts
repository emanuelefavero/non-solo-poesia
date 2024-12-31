import type { Post } from '@/types'
import { neon } from '@neondatabase/serverless'

// Get posts for the current page from the database
export async function getPosts(page: number, postsPerPage: number) {
  const sql = neon(process.env.DATABASE_URL as string)
  const offset = (page - 1) * postsPerPage
  const data = await sql`
    SELECT * FROM posts
    ORDER BY published_at DESC
    LIMIT ${postsPerPage} OFFSET ${offset}
  `
  return data as Post[]
}

// Get the total count of posts
export async function getTotalPostCount() {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT COUNT(*) as count FROM posts
  `
  return data[0]?.count || 0
}
