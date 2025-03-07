type Props = {
  searchParams: Promise<{
    email: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const { email } = await searchParams

  return (
    <>
      {email ? (
        <>
          <h1>Iscrizione alla newsletter annullata</h1>
          <p>
            <b className='text-pink-600 dark:text-pink-400'>{email}</b> è stato
            rimosso dalla nostra lista di iscrizione alla newsletter.
          </p>
          <p>
            Se hai cambiato idea, puoi riscriverti in qualsiasi momento in fondo
            a questa pagina <b>↓</b>
          </p>
        </>
      ) : (
        <>
          <h1>Iscrizione alla newsletter non trovata</h1>
          <p>
            Non è stato possibile trovare l{"'"}iscrizione alla newsletter con l
            {"'"}indirizzo email fornito.
          </p>
          <p>
            Per qualsiasi domanda contattaci all{"'"}indirizzo{' '}
            <a href='mailto:info@nonsolopoesia.it'>info@nonsolopoesia.it</a>
          </p>
        </>
      )}
    </>
  )
}
