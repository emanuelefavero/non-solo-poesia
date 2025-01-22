import Aside from '@/components/Aside/Aside'
import AsidePostList from '@/components/Aside/AsidePostList'
import AsideTitle from '@/components/Aside/AsideTitle'
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
