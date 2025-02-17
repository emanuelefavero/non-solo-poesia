import NewsletterEmail from '@/components/Emails/NewsletterEmail'
import { TITLE } from '@/data/title'
import type { Post } from '@/types'
import { neon } from '@neondatabase/serverless'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const customDomainEmail = process.env.CUSTOM_DOMAIN_EMAIL as string

const sql = neon(process.env.DATABASE_URL as string)

// TODO buy domain and set up custom email (change custom email env variable)
// TODO Change the URL to the bought domain

export async function sendNewsletter(post: Post) {
  const subscribers = await sql`SELECT email FROM subscribers`
  if (!subscribers.length) return

  const emailData = {
    subject: `${post.title} - ${TITLE}`,
    react: NewsletterEmail({ post }),
    from: customDomainEmail,
    to: subscribers.map((s) => s.email),
  }

  await resend.emails.send(emailData)
}
