type Props = {
  author: string
  className?: string
  authorClassName?: string
}

export default function Component({
  author,
  className,
  authorClassName,
}: Props) {
  return (
    <p className={`${className} text-sm`}>
      Scritto da{' '}
      <span className={`text-pink-600 dark:text-pink-400 ${authorClassName}`}>
        {author}
      </span>
    </p>
  )
}
