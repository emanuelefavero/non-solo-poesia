import { playfair_display } from '@/app/fonts'
import BiCalendarEditIcon from '@/components/icons/BiCalendarEditIcon'
import BiPencilIcon from '@/components/icons/BiPencilIcon'
import BsEyeIcon from '@/components/icons/BsEyeIcon'
import { POSTS_PER_PAGE } from '@/config/posts'
import Image from 'next/image'

// NOTE: The skeleton has an animate-skeleton animation with staggered delays (e.g. animate-skeleton-150), the opacity is set to 40% to match the animation highest opacity at 0%

// * Skeleton
export default function Component() {
  return (
    <ul className='mt-2 grid grid-cols-[repeat(auto-fit,minmax(30px,375px))] justify-center gap-4 pl-0 pt-28 5xs:pt-0 3xs:grid-cols-[repeat(auto-fit,minmax(300px,375px))]'>
      {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
        <PostListItem key={index} index={index} />
      ))}
    </ul>
  )
}

function PostListItem({ index }: { index: number }) {
  return (
    <li className='group flex list-none flex-col rounded-md transition-transform duration-200 active:scale-95'>
      <div className='text-black hover:no-underline dark:text-white'>
        <div className='relative aspect-video w-full from-pink-800/20 to-pink-200/30 content-none after:absolute after:inset-0 after:z-10 after:rounded-md after:bg-gradient-to-t after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-100 dark:from-pink-200/20 dark:to-pink-800/30'>
          {/* CloudinaryImage */}
          <Image
            src='/fallback.webp'
            alt='Fallback Image'
            fill={true}
            sizes='(min-width: 768px) 768px, 100vw'
            style={{ objectFit: 'cover' }}
            className='animate-skeleton rounded-md opacity-40'
            priority={index >= 0 && index < 4}
          />
        </div>

        <div className='flex flex-col gap-1 py-4'>
          {/* PostCategory */}
          <span className='animate-skeleton-150 w-fit rounded bg-pink-600 text-sm font-semibold uppercase text-pink-600 opacity-40 dark:bg-pink-400 dark:text-pink-400'>
            Categoria
          </span>

          {/* PostTitle */}
          <h2
            className={`${playfair_display.className} animate-skeleton-300 line-clamp-4 w-full rounded bg-zinc-900 text-xl opacity-40 5xs:text-3xl dark:bg-zinc-100`}
          >
            &nbsp;
          </h2>

          {/* PostDescription */}
          <h2 className='post-description animate-skeleton-450 mt-2.5 line-clamp-6 rounded bg-zinc-600 text-[1.2rem] font-normal leading-[1.625rem] tracking-wide text-zinc-600 opacity-40 dark:bg-zinc-300 dark:text-zinc-300'>
            Descrizione
          </h2>
          <h2 className='post-description animate-skeleton-450 mt-2.5 line-clamp-6 rounded bg-zinc-600 text-[1.2rem] font-normal leading-[1.625rem] tracking-wide text-zinc-600 opacity-40 dark:bg-zinc-300 dark:text-zinc-300'>
            Descrizione
          </h2>

          {/* PostInfo */}
          <div className='mt-2.5 flex flex-col gap-0.5'>
            <span className='animate-skeleton-600 flex flex-wrap gap-2 text-sm opacity-40'>
              {/* PostAuthor */}
              <p className='flex items-center gap-1 text-sm'>
                <BiPencilIcon className='relative inline-block h-5 w-5 rounded bg-zinc-500 dark:bg-zinc-400' />
                <span className='rounded bg-pink-600 text-pink-600 dark:bg-pink-400 dark:text-pink-400'>
                  Autore
                </span>
              </p>
              {/* PostViews */}
              <p className='flex items-center gap-1 rounded bg-zinc-500 text-sm text-zinc-500 dark:bg-zinc-400 dark:text-zinc-400'>
                <BsEyeIcon className='relative inline-block h-5 w-5' />0
              </p>
            </span>

            {/* PostDate */}
            <span className='animate-skeleton-1000 mt-1 flex items-center gap-1 rounded bg-zinc-500 text-sm font-medium italic text-zinc-500 opacity-40 dark:bg-zinc-400 dark:text-zinc-400'>
              <BiCalendarEditIcon className='relative inline-block h-5 w-5' />
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}
