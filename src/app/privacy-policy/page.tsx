import { TITLE } from '@/data/title'
import type { Metadata } from 'next'

// * Metadata
export const metadata: Metadata = {
  title: `Informativa sulla Privacy - ${TITLE}`,
  description: `La nostra informativa sulla privacy ti spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali`,
}

// TODO Add unit and e2e tests for this page and privacy policy link

export default function Page() {
  return (
    <>
      <h1>Informativa sulla Privacy</h1>
    </>
  )
}
