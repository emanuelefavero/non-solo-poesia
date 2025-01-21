type Props = {
  author: string
}

export default function Component({ author }: Props) {
  return (
    <span>
      Scritto da{' '}
      <span className='text-pink-600 dark:text-pink-400'>{author}</span>
    </span>
  )
}
