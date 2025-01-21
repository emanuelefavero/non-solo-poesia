import Aside from '@/components/Aside'
import AsidePostList from '@/components/AsidePostList'
import AsideTitle from '@/components/AsideTitle'
import { getPopularPosts } from '@/lib/posts'

export default async function PopularPostsAside() {
  const posts = await getPopularPosts()

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
