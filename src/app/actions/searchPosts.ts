'use server'

import { POSTS_PER_PAGE } from '@/config/posts'
import { neon } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'

export async function searchPosts(query: string) {
  try {
    const sql = neon(process.env.DATABASE_URL as string)

    // * Search for posts with the query in the title
    const posts = await sql`
      SELECT *
      FROM posts
      WHERE title ILIKE ${`%${query}%`}
      ORDER BY published_at DESC
      LIMIT ${POSTS_PER_PAGE}
    `

    return posts
  } catch (error) {
    console.error('Error searching posts:', error)
    return {
      message: 'Errore interno del server - Impossibile cercare i post',
    }
  }

  revalidatePath('/cerca')
}
