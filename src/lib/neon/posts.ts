import type { OrderBy, PopularPostsFilter, Post, PostSitemap } from '@/types'
import { neon } from '@neondatabase/serverless'
import { cache } from 'react'

const sql = neon(process.env.DATABASE_URL as string)

// Get posts from the database
export async function getPosts(
  page: number,
  postsPerPage: number,
  currentOrderBy: OrderBy,
  category?: string,
) {
  // Calculate the offset for the current page
  const offset = (page - 1) * postsPerPage

  if (currentOrderBy === 'title') {
    // Order by title in ascending order
    if (category) {
      const data = await sql`
        SELECT * FROM posts
        WHERE category = ${category}
        ORDER BY title ASC
        LIMIT ${postsPerPage} OFFSET ${offset}
      `
      return data as Post[]
    } else {
      // NOTE: Exclude the latest post from the list if category is not passed (for the homepage)
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
        ORDER BY published_at DESC
        LIMIT ${postsPerPage} OFFSET ${offset}
      `
      return data as Post[]
    } else {
      // NOTE: Exclude the latest post from the list if category is not passed (for the homepage)
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
  const data = await sql`
    SELECT COUNT(*) as count FROM posts
  `
  return data[0]?.count ? data[0]?.count - 1 : 0
}

// Get the total count of posts of a specific category
export async function getTotalPostCountByCategory(category: string) {
  const data = await sql`
    SELECT COUNT(*) as count FROM posts
    WHERE category = ${category}
  `
  return data[0]?.count || 0
}

// Get a single post by slug (cached)
export const getPost = cache(async (slug: string) => {
  const data = await sql`
    SELECT * FROM posts
    WHERE slug = ${slug}
  `
  if (!data) return null
  return data[0] as Post | null
})

// Get latest post (cached)
export const getLatestPost = cache(async () => {
  const data = await sql`
    SELECT * FROM posts
    ORDER BY published_at DESC
    LIMIT 1
  `
  return data[0] as Post
})

// Get popular posts (filter all time or this month)
export async function getPopularPosts(
  popular_posts_filter?: PopularPostsFilter,
) {
  const query =
    popular_posts_filter === 'this_month'
      ? sql`
        SELECT * FROM posts
        WHERE date_trunc('month', published_at) = date_trunc('month', current_date)
        ORDER BY views DESC
        LIMIT 5
      `
      : sql`
        SELECT * FROM posts
        ORDER BY views DESC
        LIMIT 5
      `

  const data = await query
  return data as Post[]
}

// Increment single post views
export async function incrementPostViews(slug: string) {
  await sql`
    UPDATE posts
    SET views = views + 1
    WHERE slug = ${slug}
  `
}

// Save a new post to the database
export async function savePost(post: Post) {
  await sql`
  INSERT INTO posts (
    id,
    slug,
    title,
    description,
    cover_image,
    cover_image_cloudinary,
    content,
    author,
    category,
    published_at,
    updated_at
  ) VALUES (
    ${post.id},
    ${post.slug},
    ${post.title},
    ${post.description},
    ${post.cover_image},
    ${post.cover_image_cloudinary},
    ${post.content},
    ${post.author},
    ${post.category},
    ${post.published_at},
    ${post.updated_at}
  )
  `
}

// Sitemap generation - Get all post slugs, published_at and updated_at
export async function getAllPostSitemapData() {
  const data = await sql`
    SELECT slug, published_at, updated_at
    FROM posts
    WHERE published_at <= NOW()
    ORDER BY published_at DESC
    `

  return data as PostSitemap[]
}
