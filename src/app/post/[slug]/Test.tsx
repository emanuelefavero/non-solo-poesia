import BiCalendarIcon from '@/components/icons/BiCalendarIcon'
import BiPencilIcon from '@/components/icons/BiPencilIcon'
import BsEyeIcon from '@/components/icons/BsEyeIcon'
import Image from 'next/image'

export default function Component() {
  const description = (
    <div className='mt-2.5 line-clamp-6 rounded-md bg-zinc-600 text-[1.2rem] font-normal leading-7 tracking-wide dark:bg-zinc-300'>
      &nbsp;
    </div>
  )

  return (
    <div className='flex w-full max-w-3xl flex-col gap-3'>
      {/* Cover Image */}
      <div className='relative aspect-video w-full'>
        <Image
          src='/fallback.webp'
          alt='Fallback Image'
          fill={true}
          sizes='(min-width: 768px) 768px, 100vw'
          style={{ objectFit: 'cover' }}
          className='rounded-md'
          priority={true}
        />
      </div>
      <div className='mt-3'>
        {/* Category */}
        <div className='w-full rounded-md bg-pink-600 text-sm font-semibold uppercase text-pink-600 5xs:w-[12ch] dark:bg-pink-400 dark:text-pink-400'>
          &nbsp;
        </div>

        {/* Title */}
        <div className='mt-3 rounded-md bg-black text-xl 5xs:text-[2.5rem] 5xs:leading-[2.75rem] dark:bg-white'>
          &nbsp;
        </div>

        {/* Description */}
        {description}
        {description}
      </div>

      {/* Post Info */}
      <div className='mt-2.5 flex flex-col gap-0.5'>
        <span className='flex flex-wrap gap-2 text-sm'>
          {/* Author */}
          <p className='flex items-center gap-1 text-sm'>
            <BiPencilIcon className='relative inline-block h-5 w-5' />
            <div className='w-[6ch] rounded-md bg-pink-600 5xs:w-[12ch] dark:bg-pink-400'>
              &nbsp;
            </div>
          </p>
          {/* Views */}
          <p className='flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400'>
            <BsEyeIcon className='relative inline-block h-5 w-5' />
            <div className='w-[4ch] rounded-md bg-zinc-500 dark:bg-zinc-400'>
              &nbsp;
            </div>
          </p>
        </span>

        {/* Date */}
        <span className='mt-1 flex items-center gap-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400'>
          <BiCalendarIcon className='relative inline-block h-5 w-5' />
          <div className='w-[10ch] rounded-md bg-zinc-500 dark:bg-zinc-400'>
            &nbsp;
          </div>
        </span>
      </div>

      {/* Content */}
      <div className='mt-3 flex flex-col gap-2'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className='rounded-md bg-[var(--foreground)]'>
            &nbsp;
          </div>
        ))}
      </div>
    </div>
  )
}
