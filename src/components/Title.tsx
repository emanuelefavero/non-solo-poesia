type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return (
    <h1
      className={`relative mb-2 w-fit text-2xl font-normal uppercase tracking-wider after:mt-2 after:block after:h-[3px] after:w-14 after:rounded-full after:bg-pink-600 after:content-[''] dark:after:bg-pink-400 ${className}`}
    >
      {children}
    </h1>
  )
}
