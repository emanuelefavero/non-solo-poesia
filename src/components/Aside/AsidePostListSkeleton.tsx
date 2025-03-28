import PostTitle from '@/components/Post/PostTitle'
import { POPULAR_POSTS_LENGTH } from '@/config/posts'
import { skeletonAnimations } from '@/data/animations'
import Image from 'next/image'

export default async function Component() {
  return (
    <ul className='mt-4 flex flex-col gap-3.5'>
      {Array.from({ length: POPULAR_POSTS_LENGTH }).map((_, index) => (
        <AsidePostListItem key={index} index={index} />
      ))}
    </ul>
  )
}

function AsidePostListItem({ index }: { index: number }) {
  return (
    <li className='group list-none rounded-md transition-transform duration-200 active:scale-95'>
      <div
        className={`${
          index < 4 ? 'flex' : 'hidden'
        } ${skeletonAnimations[index]} w-full justify-between gap-3 text-black opacity-40 hover:no-underline 2lg:flex dark:text-white`}
      >
        <PostTitle className='line-clamp-2 w-full rounded-[0.225rem] bg-zinc-900 text-lg transition-colors duration-200 group-hover:text-pink-800/80 dark:bg-zinc-100 dark:group-hover:text-pink-200'>
          &nbsp;
        </PostTitle>

        <div className='relative aspect-video min-w-[100px]'>
          <Image
            src='/fallback.webp'
            alt='Fallback Image'
            fill={true}
            sizes='(min-width: 768px) 768px, 100vw'
            style={{ objectFit: 'cover' }}
            className='rounded-[0.225rem]'
            priority={index >= 0 && index < 4}
          />
        </div>
      </div>
    </li>
  )
}
