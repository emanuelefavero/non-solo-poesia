'use server'

import { neon } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'

// TODO move POSTS_PER_PAGE (from homepage) to a config file and import it here

export async function searchPosts(query: string) {
  try {
    const sql = neon(process.env.DATABASE_URL as string)

    // * Search for posts with the query in the title
    const posts = await sql`
      SELECT *
      FROM posts
      WHERE title ILIKE ${`%${query}%`}
      ORDER BY published_at DESC
      LIMIT 6
    `

    return posts
  } catch (error) {
    console.error('Error searching posts:', error)
    return {
      message: 'Errore interno del server - Impossibile cercare i post',
    }
  }

  revalidatePath('/search')
}
