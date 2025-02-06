import Aside from '@/components/Aside/Aside'
import AsidePostListSkeleton from '@/components/Aside/AsidePostListSkeleton'
import AsideTitle from '@/components/Aside/AsideTitle'
import Section from '@/components/Section'
import { popularPostsFilterOptions } from '@/data/popularPostsFilterOptions'
import PostSkeleton from './components/PostSkeleton'

export default function Loading() {
  return (
    <Section className='flex justify-center gap-4'>
      <PostSkeleton />

      <Aside>
        <AsideTitle>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            In Evidenza
            <span className='relative top-0.5 flex flex-wrap'>
              {popularPostsFilterOptions.map(({ label, value }, index) => (
                <span
                  key={`order-by-${value}`}
                  className={`rounded-sm px-1.5 py-1 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-pink-400/10 hover:no-underline active:scale-95 dark:text-zinc-400 ${index === 1 ? 'text-zinc-950 dark:text-zinc-50' : ''}`}
                >
                  {label}
                </span>
              ))}
            </span>
          </div>
        </AsideTitle>

        <AsidePostListSkeleton />
      </Aside>
    </Section>
  )
}
