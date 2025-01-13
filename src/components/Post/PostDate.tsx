type Props = {
  published_at: string // e.g. 2024-12-10 07:23:57.257+00
  updated_at?: string | null
}

export default function Component({ published_at, updated_at }: Props) {
  // Check if the updated date is at least one day later than the published date
  const isAtLeastOneDayLater = (published: string, updated: string) => {
    const publishedDate = new Date(published)
    const updatedDate = new Date(updated)

    return (
      updatedDate.getFullYear() > publishedDate.getFullYear() ||
      (updatedDate.getFullYear() === publishedDate.getFullYear() &&
        updatedDate.getMonth() > publishedDate.getMonth()) ||
      (updatedDate.getFullYear() === publishedDate.getFullYear() &&
        updatedDate.getMonth() === publishedDate.getMonth() &&
        updatedDate.getDate() > publishedDate.getDate())
    )
  }

  const date =
    updated_at && isAtLeastOneDayLater(published_at, updated_at)
      ? updated_at
      : published_at

  return (
    <p className='mt-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400'>
      {updated_at && isAtLeastOneDayLater(published_at, updated_at)
        ? 'Aggiornato'
        : 'Pubblicato'}{' '}
      il{' '}
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
