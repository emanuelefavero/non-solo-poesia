import { neon } from '@neondatabase/serverless'
import { redirect } from 'next/navigation'

// Subscribe a user to the newsletter
export async function subscribe(formData: FormData) {
  const email = formData.get('email') as string

  // Validate email
  if (!email) return { message: "Un email e' richiesta" }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return { message: 'Email non valida' }

  try {
    const sql = neon(process.env.DATABASE_URL as string)

    // Check if the email already exists
    const existing = await sql`
      SELECT COUNT(*) as count FROM subscribers WHERE email = ${email}
    `

    if (existing[0]?.count > 0) {
      return { message: 'You are already subscribed.' }
    }

    // Insert the subscriber in the database
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

  redirect('/newsletter-success?email=' + encodeURIComponent(email))
}
