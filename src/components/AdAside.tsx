import Aside from '@/components/Aside/Aside'

// TODO Make the ad 250x250px inside the 375x375px aside (the 250px container should have the dotted border and background color, while the 375px should be invisible)

export default async function Component() {
  return (
    <Aside className='min-h-[375px] border-2 border-dotted border-zinc-800/20 bg-[var(--header-background)] text-center text-zinc-600/35 dark:border-zinc-200/20 dark:text-zinc-400/35'>
      <div className='grid h-full w-full select-none place-items-center text-sm font-semibold uppercase'>
        ADV
      </div>
    </Aside>
  )
}
