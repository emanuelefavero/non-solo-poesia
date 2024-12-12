import { auth } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Devi essere autenticato per pubblicare un post',
        }),
        {
          status: 401,
        },
      )
    }

    // Check if user is an admin or author
    // TODO: Check if NEXT_PUBLIC variables work in production (on the server), if not, use ADMIN_ID and AUTHOR_ID environment variables
    const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
    const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

    if (userId !== adminId && userId !== authorId) {
      return new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Solo gli amministratori e gli autori possono pubblicare',
        }),
        {
          status: 403,
        },
      )
    }

    // Get data from the request body
    const { title, description, coverImage, content } = await req.json()

    // Validate title, description, cover image and content
    if (!title || !description || !coverImage || !content) {
      return new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Titolo, descrizione, immagine di copertina, contenuti e chiave segreta sono obbligatori',
        }),
        {
          status: 400,
        },
      )
    }

    // Sanitize title (remove special characters and spaces) for the slug
    const sanitizedTitle = title
      .trim()
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()

    // Sanitize description (remove special characters and spaces)
    const sanitizedDescription = description
      .trim()
      .replace(/[^a-z0-9\s-]/gi, '')

    // Sanitize cover image URL
    const sanitizedCoverImage = coverImage.trim()

    // Make sure the coverImage URL is valid
    if (!/^https?:\/\/\S+\.\S+/.test(sanitizedCoverImage)) {
      return new Response(
        JSON.stringify({
          message:
            'Accesso bloccato - Perfavore inserisci un URL di immagine valido',
        }),
        {
          status: 400,
        },
      )
    }

    // NOTE: Before saving the post to the database, create a `posts` table in the SQL Editor of the NeonDB dashboard:
    // CREATE TABLE IF NOT EXISTS posts(
    //   id UUID PRIMARY KEY,
    //   slug TEXT NOT NULL UNIQUE,
    //   title TEXT NOT NULL,
    //   description TEXT NOT NULL,
    //   cover_image TEXT NOT NULL,
    //   content TEXT NOT NULL,
    //   author TEXT NOT NULL,
    //   published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    //   updated_at TIMESTAMP WITH TIME ZONE
    // );

    // Create post for the database
    const post = {
      id: randomUUID(),
      slug: sanitizedTitle,
      title,
      description: sanitizedDescription,
      cover_image: sanitizedCoverImage,
      content,
      author: "Maria D'Ippolito",
      published_at: new Date().toISOString(),
      updated_at: null,

      // TODO: Add other metadata (let the author add these in /create-post)
      // tags: [],
      // readingTime: '',
    }

    // Save post to database
    const sql = neon(process.env.DATABASE_URL as string)
    await sql`
      INSERT INTO posts (id, slug, title, description, cover_image, content, author, published_at, updated_at)
      VALUES (${post.id}, ${post.slug}, ${post.title}, ${post.description}, ${post.cover_image}, ${post.content}, ${post.author}, ${post.published_at}, ${post.updated_at})
    `

    // Revalidate the home page
    revalidatePath('/')

    return new Response(
      JSON.stringify({ message: 'Post pubblicato con successo!' }),
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error saving post:', error)
    return new Response(
      JSON.stringify({
        message: 'Errore interno del server - Impossibile pubblicare il post',
      }),
      {
        status: 500,
      },
    )
  }
}
