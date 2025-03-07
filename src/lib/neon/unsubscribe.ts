import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL as string)

// Unsubscribe from the newsletter (return true if the email was deleted)
export async function unsubscribe(email: string) {
  const data = await sql`
    DELETE FROM subscribers
    WHERE email = ${email}
    RETURNING email
  `

  return data.length > 0
}
