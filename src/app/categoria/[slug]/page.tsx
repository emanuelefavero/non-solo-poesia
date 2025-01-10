import { CATEGORY_SLUGS } from '@/config/categories'
import type { CategorySlug } from '@/types'
import { redirect } from 'next/navigation'

type Props = { params: Promise<{ slug: string; order_by?: string }> }

export default async function Page({ params }: Props) {
  const { slug } = await params

  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) {
    redirect('/')
  }

  return (
    <>
      <h1>{slug}</h1>
    </>
  )
}
