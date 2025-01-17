type Props = {
  children: React.ReactNode
  className?: string
}

export default function Component({ children, className }: Props) {
  return <section className={`${className}`}>{children}</section>
}
