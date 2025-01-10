import { CATEGORY_SLUGS } from '@/config/categories'
import type { CategorySlug } from '@/types'

type Props = { params: Promise<{ slug: string }> }

export default async function Page({ params }: Props) {
  const slug = (await params).slug

  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) {
    return <h1>Categoria non trovata</h1>
  }

  return <h1>{slug}</h1>
}
