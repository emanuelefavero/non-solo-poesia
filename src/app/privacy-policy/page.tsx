import { CONTACT_EMAIL } from '@/data/email'
import { TITLE } from '@/data/title'
import { formatDate } from '@/utils/date'
import type { Metadata } from 'next'
import Link from 'next/link'

// * Metadata
export const metadata: Metadata = {
  title: `Informativa sulla Privacy - ${TITLE}`,
  description: `La nostra informativa sulla privacy ti spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali`,
}

// TODO Add unit and e2e tests for this page and privacy policy link

export default function Page() {
  const latestUpdate = new Date('2025-03-14')

  return (
    <div className='mt-20 flex w-full max-w-3xl animate-fadeInFromSkeleton flex-col gap-3'>
      <Link href='/'>← Torna alla Home</Link>
      <h1>Informativa sulla Privacy</h1>

      {/* Ultimo aggiornamento */}
      <p className='text-sm text-zinc-500 dark:text-zinc-400'>
        Ultimo aggiornamento: {formatDate(latestUpdate)}
      </p>

      {/* Introduzione */}
      <p>
        Benvenuto su <strong>{TITLE}</strong>. La tua privacy è importante per
        noi. Questa Informativa sulla Privacy spiega come raccogliamo,
        utilizziamo e proteggiamo i tuoi dati personali in conformità al
        <strong> Regolamento UE 2016/679 (GDPR)</strong>.
      </p>

      <hr />

      {/* Raccolta dei dati */}
      <h2>Raccolta dei dati</h2>

      <p>Raccogliamo i seguenti dati personali:</p>

      <ul className='list-inside list-disc'>
        <li>
          <strong>Dati di autenticazione:</strong> Email e account social {'('}
          Apple o Google {')'} se decidi di registrarti o accedere tramite uno
          di questi metodi.
        </li>
        <li>
          <strong>Newsletter:</strong> Email se decidi di iscriverti alla nostra
          newsletter.
        </li>
      </ul>

      <p>
        L'utente può annullare l'iscrizione alla newsletter in qualsiasi momento
        tramite il link presente in fondo ad ogni email ricevuta.
      </p>

      <hr />

      {/* Utilizzo dei dati */}
      <h2>Utilizzo dei dati</h2>

      <p>Utilizziamo i dati raccolti per:</p>

      <ul className='list-inside list-disc'>
        <li>
          <strong>Autenticazione e accesso all'account →</strong> art. 6.1.b
          GDPR
        </li>
        <li>
          <strong>Invio della newsletter. →</strong> art. 6.1.b GDPR
        </li>
      </ul>

      <hr />

      {/* Protezione dei dati */}
      <h2>Protezione dei dati</h2>

      <p>
        I dati personali dell'utente sono conservati in modo sicuro e protetti
        da accessi non autorizzati.
      </p>

      <hr />

      {/* Diritti dell'utente */}
      <h2>Diritti dell'utente</h2>

      <p>L'utente ha il diritto di:</p>
      <ul className='list-inside list-none'>
        <li>
          <strong>✅ Accedere ai propri dati personali.</strong>
        </li>
        <li>
          <strong>✅ Chiedere la rettifica dei propri dati.</strong>
        </li>
        <li>
          <strong>✅ Chiedere la cancellazione dei propri dati.</strong>
        </li>
        <li>
          <strong>✅ Opporsi al trattamento dei propri dati.</strong>
        </li>
      </ul>

      <p>
        Puoi esercitare i tuoi diritti inviando una richiesta tramite il nostro
        indirizzo email{' '}
        <Link
          href={`mailto:${CONTACT_EMAIL}`}
          className='text-base text-pink-700 hover:underline dark:text-pink-400'
        >
          {CONTACT_EMAIL}
        </Link>
      </p>

      <hr />

      {/* Modifiche all'informativa */}
      <h2>Modifiche all'informativa</h2>

      <p>
        Questa informativa può subire modifiche nel tempo. Le modifiche
        sostanziali saranno comunicate tramite email.
      </p>

      <hr />

      {/* Contatti */}
      <h2>Contatti</h2>

      <p>
        Per qualsiasi domanda o richiesta riguardante la nostra Informativa
        sulla Privacy, contattaci all'indirizzo{' '}
        <Link
          href={`mailto:${CONTACT_EMAIL}`}
          className='text-base text-pink-700 hover:underline dark:text-pink-400'
        >
          {CONTACT_EMAIL}
        </Link>
      </p>

      <hr />

      {/* Fine */}
      <p>
        Grazie per aver letto la nostra Informativa sulla Privacy. Se hai
        domande o dubbi, non esitare a contattarci.
      </p>

      <p>
        <Link href='/'>← Torna alla Home</Link>
      </p>
    </div>
  )
}
