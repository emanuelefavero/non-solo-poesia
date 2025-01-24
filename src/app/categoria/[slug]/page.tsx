import OrderBy from '@/components/OrderBy'
import PostListLoader from '@/components/PostListLoader'
import PostListSkeleton from '@/components/PostListSkeleton'
import Section from '@/components/Section'
import Title from '@/components/Title'
import { CATEGORY_SLUGS } from '@/config/categories'
import { TITLE } from '@/data/title'
import type { CategorySlug, OrderBy as OrderByType } from '@/types'
import { convertSlugToName } from '@/utils/slug'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

// TIP: This is how you can get both the slug and searchParams from the URL
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string; order_by?: OrderByType }>
}

// * Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = convertSlugToName(slug)

  // TIP: No need to check if the category is valid, because the page will redirect home if it's not. @see redirect('/') method below

  return {
    title: `${category} - ${TITLE}`,
    description: `Tutti i post di ${TITLE} nella categoria ${category}.`,
  }
}

// * Page
export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params
  const { page, order_by } = await searchParams

  // Redirect to the homepage if the category slug is not valid
  if (!CATEGORY_SLUGS.includes(slug as CategorySlug)) redirect('/')

  const category = convertSlugToName(slug)
  const currentOrderBy = order_by || 'published_at'
  const currentPage = parseInt(page || '1', 10)

  return (
    <>
      <Section>
        <OrderBy currentOrderBy={currentOrderBy} />
        <Title>
          {category}{' '}
          {currentOrderBy === 'title' ? (
            <sup className='text-pink-600 dark:text-pink-400'>A-Z</sup>
          ) : null}
        </Title>

        <Suspense fallback={<PostListSkeleton />}>
          <PostListLoader
            currentPage={currentPage}
            currentOrderBy={currentOrderBy}
            category={category}
          />
        </Suspense>
      </Section>
    </>
  )
}
