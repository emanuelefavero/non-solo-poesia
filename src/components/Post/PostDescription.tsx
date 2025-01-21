type Props = {
  description: string
  className?: string
}

export default function Component({ description, className }: Props) {
  return (
    <h2
      className={`mt-2.5 line-clamp-6 text-[1.2rem] font-normal leading-7 tracking-wide text-zinc-600 dark:text-zinc-300 ${className}`}
    >
      {description}
    </h2>
  )
}
