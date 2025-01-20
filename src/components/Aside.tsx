type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return (
    <aside
      className={`hidden rounded-md border border-pink-400 p-4 lg:block ${className}`}
    >
      {children}
    </aside>
  )
}
