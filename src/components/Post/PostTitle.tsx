type Props = {
  title: string
  as?: 'h1' | 'h2'
  className?: string
}

export default function Component({ title, as: Tag = 'h2', className }: Props) {
  return <Tag className={`${className}`}>{title}</Tag>
}
