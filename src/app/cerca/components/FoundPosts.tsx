'use client'

import { useSearchStore } from '@/app/cerca/store/searchStore'
import PostList from '@/components/PostList'

// TODO add skeleton

export default function Component() {
  const { foundPosts } = useSearchStore()

  if (!foundPosts) return null
  return <PostList posts={foundPosts} />
}
