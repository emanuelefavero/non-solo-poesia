type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return (
    <h2
      className={`text-xl after:mt-2 after:block after:h-[1px] after:w-full after:rounded-full after:bg-pink-600 after:content-[''] dark:after:bg-pink-400 ${className}`}
    >
      {children}
    </h2>
  )
}
