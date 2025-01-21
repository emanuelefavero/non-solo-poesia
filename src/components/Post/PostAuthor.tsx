import BiPencilIcon from '@/components/icons/BiPencilIcon'

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
    <p
      className={`flex items-center gap-1 text-sm ${className}`}
      title={`Scritto da ${author}`}
      aria-label={`Scritto da ${author}`}
    >
      <BiPencilIcon className='relative inline-block h-5 w-5' />
      <span className='sr-only'>Scritto da </span>
      <span className={`text-pink-600 dark:text-pink-400 ${authorClassName}`}>
        {author}
      </span>
    </p>
  )
}
