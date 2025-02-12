import { neon } from '@neondatabase/serverless'
import { redirect } from 'next/navigation'

// Subscribe a user to the newsletter
export async function subscribe(formData: FormData) {
  const email = formData.get('email') as string

  try {
    const sql = neon(process.env.DATABASE_URL as string)

    // * Insert the subscriber in the database
    await sql`
      INSERT INTO subscribers (email)
      VALUES (${email})
    `
  } catch (error) {
    console.error('Error subscribing:', error)
    return {
      message:
        "Errore interno del server - Impossibile iscrivere l'utente alla newsletter",
    }
  }

  redirect('/newsletter-success?email=' + email)
}
