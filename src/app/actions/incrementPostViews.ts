'use server'

import { neon } from '@neondatabase/serverless'

export async function incrementPostViews(slug: string) {
  try {
    const sql = neon(process.env.DATABASE_URL as string)

    await sql`
      UPDATE posts
      SET views = views + 1
      WHERE slug = ${slug}
    `
  } catch (error) {
    console.error('Error incrementing post views:', error)
    return {
      message:
        'Errore interno del server - Impossibile incrementare le visualizzazioni',
    }
  }
}
