import { playfair_display } from '@/app/fonts'

type Props = {
  children: React.ReactNode
  as?: 'h1' | 'h2'
  className?: string
}

export default function Component({
  children,
  as: Tag = 'h2',
  className,
}: Props) {
  return (
    <Tag className={`${playfair_display.className} ${className}`}>
      {children}
    </Tag>
  )
}
