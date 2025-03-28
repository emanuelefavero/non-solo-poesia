type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return (
    <aside
      className={`relative hidden w-[375px] rounded-md lg:block ${className}`}
    >
      {children}
    </aside>
  )
}
