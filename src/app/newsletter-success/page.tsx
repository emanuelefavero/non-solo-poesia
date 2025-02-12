import Link from 'next/link'
import UserEmail from './components/UserEmail'

// Newsletter success page
export default async function Page() {
  return (
    <div className='mt-20 flex flex-col items-center justify-center gap-4'>
      <h1>G R A Z I E!</h1>
      <h2>Iscrizione alla Newsletter completata</h2>
      <p className='max-w-prose'>
        Grazie per esserti iscritto alla newsletter! Presto riceverai i nostri
        ultimi post direttamente nella tua casella di posta <UserEmail />
      </p>
      <Link href='/'>Torna alla Home</Link>
    </div>
  )
}
