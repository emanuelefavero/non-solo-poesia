type Props = { date: string }

export default function Component({ date }: Props) {
  return (
    <p className='mt-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400'>
      Pubblicato il{' '}
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
