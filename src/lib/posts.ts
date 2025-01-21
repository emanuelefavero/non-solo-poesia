import type { OrderBy, Post } from '@/types'
import { neon } from '@neondatabase/serverless'

// Get posts from the database
export async function getPosts(
  page: number,
  postsPerPage: number,
  currentOrderBy: OrderBy,
  category?: string,
) {
  const sql = neon(process.env.DATABASE_URL as string)

  // Calculate the offset for the current page
  const offset = (page - 1) * postsPerPage

  if (currentOrderBy === 'title') {
    // Order by title in ascending order
    if (category) {
      const data = await sql`
        SELECT * FROM posts
        WHERE category = ${category}
          AND id != (SELECT id FROM posts ORDER BY published_at DESC LIMIT 1)
        ORDER BY title ASC
        LIMIT ${postsPerPage} OFFSET ${offset}
      `
      return data as Post[]
    } else {
      const data = await sql`
        SELECT * FROM posts
        WHERE id != (SELECT id FROM posts ORDER BY published_at DESC LIMIT 1)
        ORDER BY title ASC
        LIMIT ${postsPerPage} OFFSET ${offset}
      `
      return data as Post[]
    }
  } else {
    // Order by published_at in descending order
    if (category) {
      const data = await sql`
        SELECT * FROM posts
        WHERE category = ${category}
          AND id != (SELECT id FROM posts ORDER BY published_at DESC LIMIT 1)
        ORDER BY published_at DESC
        LIMIT ${postsPerPage} OFFSET ${offset}
      `
      return data as Post[]
    } else {
      const data = await sql`
        SELECT * FROM posts
        WHERE id != (SELECT id FROM posts ORDER BY published_at DESC LIMIT 1)
        ORDER BY published_at DESC
        LIMIT ${postsPerPage} OFFSET ${offset}
      `
      return data as Post[]
    }
  }

  // NOTE: Two queries are needed because the ORDER BY clause cannot be parameterized @see https://github.com/vercel/storage/issues/495
}

// TODO Implement an optimization cap limit on how many posts there can be as more posts are added the following queries will become slower

// Get the total count of posts
export async function getTotalPostCount() {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT COUNT(*) as count FROM posts
  `
  return data[0]?.count ? data[0]?.count - 1 : 0
}

// Get the total count of posts of a specific category
export async function getTotalPostCountByCategory(category: string) {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT COUNT(*) as count FROM posts
    WHERE category = ${category}
  `
  return data[0]?.count || 0
}

// Get a single post by slug
export async function getPost(slug: string) {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT * FROM posts
    WHERE slug = ${slug}
  `
  if (!data) return null
  return data[0] as Post | null
}

// Get latest post
export async function getLatestPost() {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT * FROM posts
    ORDER BY published_at DESC
    LIMIT 1
  `
  return data[0] as Post
}

// TODO Modify the following function to get the 5 posts with more views instead of the latest 5 posts
// Get latest 5 posts for the aside
export async function getLatestPosts() {
  const sql = neon(process.env.DATABASE_URL as string)
  const data = await sql`
    SELECT * FROM posts
    ORDER BY published_at DESC
    LIMIT 5
  `
  return data as Post[]
}

// Increment post views
export async function incrementPostViews(slug: string) {
  const sql = neon(process.env.DATABASE_URL as string)

  await sql`
    UPDATE posts
    SET views = views + 1
    WHERE slug = ${slug}
  `
}
