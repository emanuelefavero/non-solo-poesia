import Link from 'next/link'
import GrazieAnimation from './components/GrazieAnimation'
import UserEmail from './components/UserEmail'

export default function Page() {
  return (
    <div className='mt-20 flex flex-col items-center justify-center gap-4'>
      <h1>
        <GrazieAnimation />
      </h1>
      <h2>Iscrizione alla Newsletter completata</h2>
      <p className='max-w-prose'>
        Grazie per esserti iscritto alla newsletter! Presto riceverai i nostri
        ultimi post direttamente nella tua casella di posta <UserEmail />
      </p>
      <Link href='/'>Torna alla Home</Link>
    </div>
  )
}
