type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return (
    <aside className={`relative hidden rounded-md p-3 lg:block ${className}`}>
      {children}
    </aside>
  )
}
