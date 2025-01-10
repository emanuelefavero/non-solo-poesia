import { CATEGORY_SLUGS } from '@/config/categories'
import type { CategorySlug } from '@/types'
import { convertSlugToName } from '@/utils/slug'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// TIP: This is how you can get both the slug and searchParams from the URL
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string; order_by?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const { page, order_by } = await searchParams

  // Redirect to the homepage if the category slug is not valid
  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) redirect('/')

  const name = convertSlugToName(slug)

  return (
    <>
      <h1>{name}</h1>
    </>
  )
}
