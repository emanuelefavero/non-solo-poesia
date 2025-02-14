import { savePost } from '@/lib/neon/posts'
import { sendNewsletter } from '@/lib/resend'
import { validateRequest } from '@/utils/validation/validateRequest'
import { neon } from '@neondatabase/serverless'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'

const sql = neon(process.env.DATABASE_URL as string)

export async function POST(req: Request) {
  try {
    // Validate the request
    const validation = await validateRequest(req)
    if (validation.error) return validation.error

    // Create post object with sanitized data
    const { sanitizedData } = validation
    const post = {
      id: randomUUID(),
      slug: sanitizedData.slug,
      title: sanitizedData.title,
      description: sanitizedData.description,
      cover_image: sanitizedData.coverImage,
      cover_image_cloudinary: sanitizedData.coverImageCloudinary,
      content: sanitizedData.content,
      author: sanitizedData.author,
      category: sanitizedData.category,
      published_at: new Date().toISOString(),
      updated_at: null,
    }

    // * Save the post to the database and send the newsletter
    await Promise.all([savePost(post), sendNewsletter(post)])

    revalidatePath('/')

    return new Response(
      JSON.stringify({ message: 'Post pubblicato con successo!' }),
      { status: 200 },
    )
  } catch (error) {
    console.error('Error saving post:', error)
    return new Response(
      JSON.stringify({
        message: 'Errore interno del server - Impossibile pubblicare il post',
      }),
      { status: 500 },
    )
  }
}

export async function PUT(req: Request) {
  try {
    // Validate the request
    const validation = await validateRequest(req)
    if (validation.error) return validation.error

    const { sanitizedData } = validation

    await sql`
      UPDATE posts
      SET 
          slug = ${sanitizedData.slug},
          title = ${sanitizedData.title},
          description = ${sanitizedData.description},
          cover_image = ${sanitizedData.coverImage},
          cover_image_cloudinary = ${sanitizedData.coverImageCloudinary},
          content = ${sanitizedData.content},
          author = ${sanitizedData.author},
          category = ${sanitizedData.category},
          updated_at = ${new Date().toISOString()}
      WHERE id = ${sanitizedData.id}
    `

    revalidatePath('/')

    return new Response(
      JSON.stringify({ message: 'Post aggiornato con successo!' }),
      { status: 200 },
    )
  } catch (error) {
    console.error('Error updating post:', error)
    return new Response(
      JSON.stringify({
        message: 'Errore interno del server - Impossibile aggiornare il post',
      }),
      { status: 500 },
    )
  }
}
