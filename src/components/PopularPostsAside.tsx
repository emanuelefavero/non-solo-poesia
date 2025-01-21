import Aside from '@/components/Aside'
import AsidePostList from '@/components/AsidePostList'
import AsideTitle from '@/components/AsideTitle'
import { getLatestPosts } from '@/lib/posts'

export default async function PopularPostsAside() {
  const posts = await getLatestPosts()

  if (!posts.length) return null

  return (
    <>
      <Aside className='w-[375px]'>
        <AsideTitle>In Evidenza</AsideTitle>
        <AsidePostList posts={posts} />
      </Aside>
    </>
  )
}
