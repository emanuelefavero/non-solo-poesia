import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import GrazieAnimation from './components/GrazieAnimation'
import UserEmail from './components/UserEmail'

type Props = {
  searchParams: Promise<{
    email?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { email } = await searchParams

  if (!email) return redirect('/')

  return (
    <div className='mt-20 flex flex-col items-center justify-center gap-4'>
      <h1>
        <GrazieAnimation />
      </h1>
      <h2>Iscrizione alla Newsletter completata</h2>
      <p className='max-w-prose'>
        Grazie per esserti iscritto alla newsletter! Presto riceverai i nostri
        ultimi post direttamente nella tua casella di posta{' '}
        <Suspense>
          <UserEmail />
        </Suspense>
      </p>
      <Link href='/'>Torna alla Home</Link>
    </div>
  )
}
