type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return (
    <aside
      className={`relative hidden rounded-md border border-pink-400 p-3 lg:block ${className}`}
    >
      {children}
    </aside>
  )
}
