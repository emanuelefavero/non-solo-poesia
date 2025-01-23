import Aside from '@/components/Aside/Aside'
import AsidePostList from '@/components/Aside/AsidePostList'
import AsideTitle from '@/components/Aside/AsideTitle'
import PopularPostsFilter from '@/components/PopularPostsFilter'
import { getPopularPosts } from '@/lib/posts'

type Props = {
  popular_posts_filter?: 'all_time' | 'this_month'
}

export default async function PopularPostsAside({
  popular_posts_filter = 'all_time',
}: Props) {
  const posts = await getPopularPosts(popular_posts_filter)

  if (!posts.length) return null

  return (
    <>
      <Aside className='w-[375px]'>
        <AsideTitle>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            In Evidenza
            <PopularPostsFilter
              currentPopularPostsFilter={popular_posts_filter}
            />
          </div>
        </AsideTitle>
        <AsidePostList posts={posts} />
      </Aside>
    </>
  )
}
