import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import { descriptionRegex } from '@/utils/validation/regex'
import { auth } from '@clerk/nextjs/server'

const allowedIds = process.env.NEXT_PUBLIC_ALLOWED_IDS?.split(',') || []

export async function validateRequest(req: Request) {
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

  if (!allowedIds.includes(userId)) {
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
  const sanitizedDescription = description.trim().replace(descriptionRegex, '')

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
