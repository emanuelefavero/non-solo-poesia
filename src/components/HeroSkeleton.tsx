import Image from 'next/image'
import './Hero.css'

export default function Component({ className }: { className?: string }) {
  return (
    <div
      className={`group hidden max-w-3xl flex-col gap-3 rounded-lg transition-transform duration-200 active:scale-[0.98] 5xs:flex ${className}`}
    >
      {/* Cover Image */}
      {/* Hover gradient background */}
      <div className='relative aspect-video w-full animate-skeleton from-pink-800/20 to-pink-200/30 opacity-40 content-none after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-t after:opacity-0 after:transition-opacity after:duration-200 group-hover:after:opacity-30 dark:from-pink-200/20 dark:to-pink-800/30'>
        <Image
          src='/fallback.webp'
          alt='Fallback Image'
          fill={true}
          sizes='(min-width: 768px) 768px, 100vw'
          style={{ objectFit: 'cover' }}
          className='rounded-md'
          priority={true}
        />
        {/* Gradient background */}
        <div className='absolute inset-0 rounded-md bg-gradient-to-t from-[rgba(21,2,9,0.80)] from-0% via-[rgba(13,12,12,0.5)] via-35% to-transparent to-75%'></div>
      </div>
    </div>
  )
}
