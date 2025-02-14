import { authors } from '@/data/authors'
import { categories } from '@/data/categories'
import type { CategoryName, Message } from '@/types'
import { Editor } from '@tiptap/react'

type ValidatePost = {
  title: string
  description: string
  coverImage: string
  coverImageCloudinary: string
  htmlContent: string
  author: string
  category: CategoryName
  editor: Editor | null
}

export function validatePost({
  title,
  description,
  coverImage,
  coverImageCloudinary,
  htmlContent,
  author,
  category,
  editor,
}: ValidatePost): Message {
  if (!title) {
    return {
      type: 'error',
      text: 'Per favore inserisci un titolo',
    }
  }

  // Check if the title contains special characters that are not allowed in URLs
  if (!/^[a-zA-Z0-9\s$\-_.+!*'()]+$/u.test(title)) {
    return {
      type: 'error',
      text: 'Il titolo non può contenere caratteri speciali non consentiti negli URL',
    }
  }

  if (title.length > 100) {
    return {
      type: 'error',
      text: 'Il titolo deve essere inferiore a 100 caratteri',
    }
  }

  if (!description) {
    return {
      type: 'error',
      text: 'Per favore inserisci una descrizione',
    }
  }

  if (description.length > 130) {
    return {
      type: 'error',
      text: 'La descrizione deve essere inferiore a 130 caratteri',
    }
  }

  if (!/^[\p{L}0-9\s\-.,;:!?'"]+$/u.test(description)) {
    return {
      type: 'error',
      text: 'La descrizione può contenere solo lettere, numeri, spazi e punteggiatura',
    }
  }

  if (!coverImage && !coverImageCloudinary) {
    return {
      type: 'error',
      text: "Per favore inserisci un'immagine di copertina",
    }
  }

  if (coverImage && !/^https?:\/\/\S+\.\S+/.test(coverImage)) {
    return {
      type: 'error',
      text: 'Per favore inserisci un URL di immagine valido',
    }
  }

  if (!htmlContent.length || htmlContent === '<p></p>') {
    return {
      type: 'error',
      text: 'Per favore inserisci del contenuto',
    }
  }

  if (!author) {
    return {
      type: 'error',
      text: 'Per favore seleziona un autore',
    }
  }

  if (!authors.find((a) => a.name === author)) {
    return {
      type: 'error',
      text: 'Per favore seleziona un autore valido',
    }
  }

  if (!category) {
    return {
      type: 'error',
      text: 'Per favore seleziona una categoria',
    }
  }

  if (!categories.find((c) => c.name === category)) {
    return {
      type: 'error',
      text: 'Per favore seleziona una categoria valida',
    }
  }

  if (!editor) {
    return {
      type: 'error',
      text: 'Editor non trovato',
    }
  }

  return {
    type: 'success',
    text: '',
  }
}
