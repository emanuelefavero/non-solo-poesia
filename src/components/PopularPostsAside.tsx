import Aside from '@/components/Aside/Aside'
// import AsidePostList from '@/components/Aside/AsidePostList'
import AsideTitle from '@/components/Aside/AsideTitle'
import PopularPostsFilter from '@/components/PopularPostsFilter'
import type { PopularPostsFilter as PopularPostsFilterType } from '@/types'
// import { Suspense } from 'react'
import AsidePostListSkeleton from './Aside/AsidePostListSkeleton'

type Props = {
  popular_posts_filter?: PopularPostsFilterType
}

// TODO Create a AsidePostListSkeleton component

export default async function Component({
  popular_posts_filter = 'all_time',
}: Props) {
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

        {/* <Suspense fallback={<AsidePostListSkeleton />}>
          <AsidePostList popular_posts_filter={popular_posts_filter} />
        </Suspense> */}

        <AsidePostListSkeleton />
      </Aside>
    </>
  )
}
