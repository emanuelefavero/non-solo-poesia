'use client'

import { deletePost } from '@/app/actions'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useRouter } from 'next/navigation'

interface Props {
  slug: string
}

export default function Component({ slug }: Props) {
  const router = useRouter()

  return (
    <Popover>
      <PopoverButton className='block rounded-sm font-semibold text-rose-500/80 focus:outline-none data-[active]:text-rose-500 data-[hover]:text-rose-500 data-[focus]:outline-1 data-[focus]:outline-gray-300 dark:data-[focus]:outline-white'>
        Elimina
      </PopoverButton>
      <PopoverPanel
        transition
        anchor='bottom'
        className='ml-4 divide-y divide-gray-50 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:divide-neutral-900 dark:border-gray-700 dark:bg-neutral-900'
      >
        <p className='select-none text-gray-600 dark:text-gray-400'>
          Eliminare questo post?
        </p>

        <div className='flex gap-2'>
          <button
            onClick={async () => {
              await deletePost(slug)
              router.push('/') // Redirect home
            }}
            className='block rounded-lg px-3 py-2 text-rose-500 transition hover:bg-black/5 dark:hover:bg-white/5'
          >
            Elimina
          </button>

          <PopoverButton className='block rounded-lg px-3 py-2 text-gray-600 transition hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5'>
            Annulla
          </PopoverButton>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
