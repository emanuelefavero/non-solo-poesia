'use server'

import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// TODO before deleting post, find post by slug and delete the image from Cloudinary (by calling server action deleteImageFromCloudinary and passing the cover_image_cloudinary, which is the public_id of the image)

// Delete a post from the database
export async function deletePost(slug: string) {
  try {
    const accessMessage = await checkUserAccess()
    if (accessMessage) return { message: accessMessage }

    // * Delete the post from the database
    const sql = neon(process.env.DATABASE_URL as string)
    await sql`
      DELETE FROM posts
      WHERE slug = ${slug}
    `

    revalidatePath('/') // Revalidate the home page
    redirect('/') // Redirect home
  } catch (error) {
    console.error('Error deleting post:', error)
    return {
      message: 'Errore interno del server - Impossibile eliminare il post',
    }
  }
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
