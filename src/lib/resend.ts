import NewsletterEmail from '@/components/Emails/NewsletterEmail'
import { TITLE } from '@/data/title'
import type { Post } from '@/types'
import { neon } from '@neondatabase/serverless'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const customDomainEmail = process.env.CUSTOM_DOMAIN_EMAIL as string

const sql = neon(process.env.DATABASE_URL as string)

export async function sendNewsletter(post: Post) {
  const subscribers = await sql`SELECT email FROM subscribers`
  if (!subscribers.length) return

  for (const subscriber of subscribers) {
    const emailData = {
      subject: `${post.title} - ${TITLE}`,
      react: NewsletterEmail({ post, email: subscriber.email }),
      from: customDomainEmail,
      to: subscriber.email,
    }
    await resend.emails.send(emailData)
  }
}
