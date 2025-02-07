import Aside from '@/components/Aside/Aside'

export default async function Component() {
  return (
    <Aside className='grid place-items-center text-center text-zinc-600/35 dark:text-zinc-400/35'>
      <div className='grid h-[250px] w-[250px] select-none place-items-center rounded-md border-2 border-dotted border-zinc-800/20 bg-[var(--header-background)] text-sm font-semibold uppercase dark:border-zinc-200/20'>
        ADV
      </div>
    </Aside>
  )
}
