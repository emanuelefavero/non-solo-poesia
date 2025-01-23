import { playfair_display } from '@/app/fonts'
import BiCalendarEditIcon from '@/components/icons/BiCalendarEditIcon'
import BiPencilIcon from '@/components/icons/BiPencilIcon'
import BsEyeIcon from '@/components/icons/BsEyeIcon'
import { POSTS_PER_PAGE } from '@/config/posts'
import Image from 'next/image'

// TODO Style skeleton (remove text, add background color, lower opacity and add pulse animation effect. If animate-pulse is ugly, create new animation with css file or in tailwind.config). To test the skeleton, comment out Suspense PostListLoader in home page or category page and render PostLitSkeleton instead

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
            className='rounded-md'
            priority={index >= 0 && index < 4}
          />
        </div>

        <div className='flex flex-col gap-1 py-4'>
          {/* PostCategory */}
          <span className='text-sm font-semibold uppercase text-pink-600 dark:text-pink-400'>
            Categoria
          </span>

          {/* PostTitle */}
          <h2
            className={`${playfair_display.className} line-clamp-4 text-xl 5xs:text-3xl`}
          >
            Titolo
          </h2>

          {/* PostDescription */}
          <h2 className='post-description mt-2.5 line-clamp-6 text-[1.2rem] font-normal leading-[1.625rem] tracking-wide text-zinc-600 dark:text-zinc-300'>
            Descrizione
          </h2>

          {/* PostInfo */}
          <div className='mt-2.5 flex flex-col gap-0.5'>
            <span className='flex flex-wrap gap-2 text-sm'>
              {/* PostAuthor */}
              <p className='flex items-center gap-1 text-sm'>
                <BiPencilIcon className='relative inline-block h-5 w-5' />
                <span className='text-pink-600 dark:text-pink-400'>Autore</span>
              </p>
              {/* PostViews */}
              <p className='flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400'>
                <BsEyeIcon className='relative inline-block h-5 w-5' />0
              </p>
            </span>

            {/* PostDate */}
            <span className='mt-1 flex items-center gap-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400'>
              <BiCalendarEditIcon className='relative inline-block h-5 w-5' />
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </li>
  )
}
