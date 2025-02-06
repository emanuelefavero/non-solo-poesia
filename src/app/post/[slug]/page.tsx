import PopularPostsAside from '@/components/PopularPostsAside'
import Section from '@/components/Section'
import { TITLE } from '@/data/title'
import { getPost, incrementPostViews } from '@/lib/posts'
import { PopularPostsFilter } from '@/types'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import Post from './components/Post'
import PostSkeleton from './components/PostSkeleton'
import './styles.css'

// NOTE: This props need to be a Promise, this fix was added with the following code mod: #see https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = {
  params: Promise<{ slug: string; popular_posts_filter: PopularPostsFilter }>
  searchParams: Promise<{ popular_posts_filter?: PopularPostsFilter }>
}

// * Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  await incrementPostViews(slug)
  const post = await getPost(slug)

  if (!post) return { title: 'Post non trovato' }

  return {
    title: `${post.title} - ${TITLE}`,
    description: post.description,
  }
}

// TODO Add Ad aside below the popular posts aside
// TODO Add Social Media buttons to share the post

// * Page
export default async function Page({ params, searchParams }: Props) {
  const slug = (await params).slug
  const { popular_posts_filter } = await searchParams

  return (
    <Section className='flex justify-center gap-4'>
      <Suspense fallback={<PostSkeleton />}>
        <Post slug={slug} />
      </Suspense>
      <PopularPostsAside popular_posts_filter={popular_posts_filter} />
    </Section>
  )
}
