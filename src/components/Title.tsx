type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return (
    <h1
      className={`relative mb-6 mt-14 w-fit from-pink-600 to-pink-400 text-2xl font-normal uppercase tracking-wider after:mt-2 after:block after:h-[3px] after:w-16 after:rounded-full after:bg-gradient-to-r after:content-[''] ${className}`}
    >
      {children}
    </h1>
  )
}
