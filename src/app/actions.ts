'use server'

import { neon } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'

export async function deletePost(slug: string) {
  try {
    const sql = neon(process.env.DATABASE_URL as string)
    await sql`
      DELETE FROM posts
      WHERE slug = ${slug}
    `

    revalidatePath('/') // Revalidate the home page
  } catch (error) {
    console.error('Error deleting post:', error)
    return {
      message: 'Errore interno del server - Impossibile eliminare il post',
    }
  }
}
