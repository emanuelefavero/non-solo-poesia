import { playfair_display } from '@/app/fonts'

type Props = {
  title: string
  as?: 'h1' | 'h2'
  className?: string
}

export default function Component({ title, as: Tag = 'h2', className }: Props) {
  return (
    <Tag className={`${playfair_display.className} ${className}`}>{title}</Tag>
  )
}
