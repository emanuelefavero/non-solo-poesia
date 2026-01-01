import { ROBOTS_NOINDEX } from '@/config/metadata'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  ...ROBOTS_NOINDEX,
}

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
