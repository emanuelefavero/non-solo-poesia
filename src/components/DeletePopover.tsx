'use client'

import { deletePost } from '@/app/actions'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'

interface Props {
  slug: string
}

export default function Component({ slug }: Props) {
  return (
    <Popover className='relative'>
      <PopoverButton className='block rounded-sm font-semibold text-rose-500/80 focus:outline-none data-[active]:text-rose-500 data-[hover]:text-rose-500 data-[focus]:outline-1 data-[focus]:outline-gray-300 dark:data-[focus]:outline-white'>
        Elimina
      </PopoverButton>

      <PopoverBackdrop className='fixed inset-0 bg-white/30 backdrop-blur-sm dark:bg-black/30' />

      <PopoverPanel
        transition
        anchor='bottom'
        className='relative ml-4 mr-4 mt-1 divide-y divide-gray-50 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 shadow-md shadow-black/10 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:divide-neutral-900 dark:border-gray-700 dark:bg-neutral-900 dark:shadow-black/30'
      >
        <p className='select-none text-gray-600 dark:text-gray-400'>
          Eliminare questo post?
        </p>

        <div className='flex gap-2'>
          <PopoverButton className='block rounded-lg px-3 py-2 text-gray-600 transition hover:bg-black/5 dark:text-gray-400 dark:hover:bg-white/5'>
            Annulla
          </PopoverButton>

          <button
            onClick={async () => {
              await deletePost(slug)
            }}
            className='block rounded-lg px-3 py-2 text-rose-500 transition hover:bg-black/5 dark:hover:bg-white/5'
          >
            Elimina
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
