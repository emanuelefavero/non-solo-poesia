import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { savePost } from '@/lib/neon/posts'
import { sendNewsletter } from '@/lib/resend'
import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'

const sql = neon(process.env.DATABASE_URL as string)

async function validateRequest(req: Request) {
  // Check if the user has access to publish a post
  const { userId } = await auth()
  if (!userId) {
    return {
      error: new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Devi essere autenticato per pubblicare un post',
        }),
        { status: 401 },
      ),
    }
  }

  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  if (userId !== adminId && userId !== authorId) {
    return {
      error: new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Solo gli amministratori e gli autori possono pubblicare',
        }),
        { status: 403 },
      ),
    }
  }

  // Validate the request body
  const {
    title,
    description,
    coverImage,
    coverImageCloudinary,
    content,
    author,
    category,
    id,
  } = await req.json()

  if (
    !title ||
    !description ||
    (!coverImage && !coverImageCloudinary) ||
    !content ||
    !author ||
    !category
  ) {
    return {
      error: new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Titolo, descrizione, immagine di copertina, autore, categoria e contenuti sono obbligatori',
        }),
        { status: 400 },
      ),
    }
  }

  // Sanitize the title (remove invalid characters for URLs)
  const sanitizedTitle = title.trim().replace(/[^a-zA-Z0-9\s$\-_.+!*'()]/gu, '')

  // Create a slug from title (lowercase and replace spaces with dashes)
  const slug = sanitizedTitle.toLowerCase().replace(/\s+/g, '-')

  // Sanitize the description (allow letters, numbers, spaces, punctuation and unicode characters)
  const sanitizedDescription = description
    .trim()
    .replace(/[^\p{L}0-9\s\-.,;:!?']/gu, '')
  const sanitizedCoverImage = coverImage.trim()

  if (coverImage && !/^https?:\/\/\S+\.\S+/.test(sanitizedCoverImage)) {
    return {
      error: new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Per favore inserisci un URL di immagine valido',
        }),
        { status: 400 },
      ),
    }
  }

  // Sanitize the author (trim and check if it's valid)
  const sanitizedAuthor = author.trim()
  if (!authors.find((a) => a.name === sanitizedAuthor)) {
    return {
      error: new Response(
        JSON.stringify({
          message: 'Accesso bloccato - Per favore seleziona un autore valido',
        }),
        { status: 400 },
      ),
    }
  }

  // Sanitize the category (trim and check if it's valid)
  const sanitizedCategory = category.trim()
  if (!categories.find((c) => c.name === sanitizedCategory)) {
    return {
      error: new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Per favore seleziona una categoria valida',
        }),
        { status: 400 },
      ),
    }
  }

  return {
    userId,
    sanitizedData: {
      title: sanitizedTitle,
      slug,
      description: sanitizedDescription,
      coverImage: sanitizedCoverImage,
      coverImageCloudinary,
      content,
      author: sanitizedAuthor,
      category: sanitizedCategory,
      id,
    },
  }
}

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
