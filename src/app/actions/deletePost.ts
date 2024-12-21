'use server'

import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { deleteImageFromCloudinary } from './deleteImageFromCloudinary'

// Delete a post from the database
export async function deletePost(slug: string) {
  try {
    const accessMessage = await checkUserAccess()
    if (accessMessage) return { message: accessMessage }

    const sql = neon(process.env.DATABASE_URL as string)

    // * Get the cover image public_id
    const post = await sql`
      SELECT cover_image_cloudinary
      FROM posts
      WHERE slug = ${slug}
    `

    if (!post || !post.length) {
      throw new Error('Errore - Post non trovato')
    }

    // * Delete the cover image from Cloudinary if it exists
    const coverImagePublicId = post[0]?.cover_image_cloudinary
    if (coverImagePublicId) {
      await deleteImageFromCloudinary(coverImagePublicId)
    }

    // * Delete the post from the database
    await sql`
      DELETE FROM posts
      WHERE slug = ${slug}
    `
  } catch (error) {
    console.error('Error deleting post:', error)
    return {
      message: 'Errore interno del server - Impossibile eliminare il post',
    }
  }

  revalidatePath('/') // Revalidate the home page
  redirect('/') // Redirect home
}

// Check if the user has access to publish a post
async function checkUserAccess() {
  const { userId } = await auth()

  if (!userId) {
    return 'Accesso bloccato - Devi fare il login per cancellare un post'
  }

  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  if (userId !== adminId && userId !== authorId) {
    return 'Accesso bloccato - Solo gli autori possono cancellare post'
  }
}
