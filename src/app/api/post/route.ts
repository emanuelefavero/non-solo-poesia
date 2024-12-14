import { authors } from '@/data/authors'
import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'

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
  const { title, description, coverImage, content, author, id } =
    await req.json()

  if (!title || !description || !coverImage || !content || !author) {
    return {
      error: new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Titolo, descrizione, immagine di copertina, autore e contenuti sono obbligatori',
        }),
        { status: 400 },
      ),
    }
  }

  // Create a slug from the title
  const slug = title
    .trim()
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()

  // Sanitize the title, description, and cover image
  const sanitizedTitle = title.trim()
  const sanitizedDescription = description.trim().replace(/[^a-z0-9\s-]/gi, '')
  const sanitizedCoverImage = coverImage.trim()

  if (!/^https?:\/\/\S+\.\S+/.test(sanitizedCoverImage)) {
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

  return {
    userId,
    sanitizedData: {
      title: sanitizedTitle,
      slug,
      description: sanitizedDescription,
      coverImage: sanitizedCoverImage,
      content,
      author: sanitizedAuthor,
      id,
    },
  }
}

export async function POST(req: Request) {
  try {
    // Validate the request
    const validation = await validateRequest(req)
    if (validation.error) return validation.error

    const { sanitizedData } = validation

    // Save the post to the database
    const sql = neon(process.env.DATABASE_URL as string)

    const post = {
      id: randomUUID(),
      slug: sanitizedData.slug,
      title: sanitizedData.title,
      description: sanitizedData.description,
      cover_image: sanitizedData.coverImage,
      content: sanitizedData.content,
      author: sanitizedData.author,
      published_at: new Date().toISOString(),
      updated_at: null,
    }

    await sql`
      INSERT INTO posts (id, slug, title, description, cover_image, content, author, published_at, updated_at)
      VALUES (${post.id}, ${post.slug}, ${post.title}, ${post.description}, ${post.cover_image}, ${post.content}, ${post.author}, ${post.published_at}, ${post.updated_at})
    `

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

    // Update the post in the database
    const sql = neon(process.env.DATABASE_URL as string)

    await sql`
      UPDATE posts
      SET 
          slug = ${sanitizedData.slug},
          title = ${sanitizedData.title},
          description = ${sanitizedData.description},
          cover_image = ${sanitizedData.coverImage},
          content = ${sanitizedData.content},
          author = ${sanitizedData.author},
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
