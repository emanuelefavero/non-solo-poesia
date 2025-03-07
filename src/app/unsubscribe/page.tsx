import { contactEmail } from '@/data/email'
import { unsubscribe } from '@/lib/neon/unsubscribe'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{
    email: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { email } = await searchParams
  const unsubscribed = await unsubscribe(email)

  // TODO redirect home if email is not found

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
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </>
      )}
    </>
  )
}
