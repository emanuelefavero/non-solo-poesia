import { CONTACT_EMAIL } from '@/data/email'
import { TITLE } from '@/data/title'
import { unsubscribe } from '@/lib/neon/unsubscribe'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{
    email: string
  }>
}

// * Metadata
export const metadata: Metadata = {
  title: `Annulla iscrizione - ${TITLE}`,
  description: `Annulla l'iscrizione alla newsletter per non ricevere più i nostri aggiornamenti`,
}

export default async function Page({ searchParams }: Props) {
  const { email } = await searchParams
  const unsubscribed = await unsubscribe(email)

  // Redirect to the homepage if the email is not provided
  if (!email) redirect('/')

  return (
    <>
      {unsubscribed ? (
        <>
          <h1>Iscrizione alla newsletter annullata</h1>
          <p>
            <b className='text-pink-600 dark:text-pink-400'>{email}</b> è stato
            rimosso dalla nostra lista di iscrizione alla newsletter.
          </p>
          <p>
            Se hai cambiato idea, puoi riscriverti in qualsiasi momento in fondo
            al sito <b>↓</b>
          </p>

          {/* Homepage link */}
          <div className='mt-8'>
            <Link href='/'>Torna alla home</Link>
          </div>
        </>
      ) : (
        <>
          <h1>Iscrizione alla newsletter non trovata</h1>
          <p>
            Non è stato possibile annullare l{"'"}iscrizione alla newsletter.
          </p>
          <p>
            Per qualsiasi domanda contattaci all{"'"}indirizzo{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </>
      )}
    </>
  )
}
