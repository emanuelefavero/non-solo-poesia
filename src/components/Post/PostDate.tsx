type Props = {
  published_at: string
  updated_at?: string | null
}

export default function Component({ published_at, updated_at }: Props) {
  const date = updated_at || published_at // ? 2024-12-10 07:23:57.257+00

  return (
    <p className='mt-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400'>
      {updated_at ? 'Aggiornato' : 'Pubblicato'} il{' '}
      {new Date(date)
        .toLocaleDateString('it-IT', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        // Capitalize the first letter of the month
        .replace(/(\b\w)/g, (char) => char.toUpperCase())}
    </p>
  )
}
