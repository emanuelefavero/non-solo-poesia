import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL as string)

// Unsubscribe from the newsletter (return true if the email was deleted)
export async function unsubscribe(email: string) {
  if (!email) return false

  const data = await sql`
    DELETE FROM subscribers
    WHERE email = ${email}
  `

  return data.length > 0
}
