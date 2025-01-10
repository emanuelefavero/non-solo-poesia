'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'
import { deletePost } from '@/app/actions/deletePost'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'

type Props = {
  slug: string
}

export default function Component({ slug }: Props) {
  const { loading, setLoading } = useEditorStore()

  return (
    <Popover className='relative'>
      <PopoverButton className='block rounded-sm font-semibold text-rose-500/80 transition-transform duration-200 focus:outline-none active:scale-95 data-[active]:text-rose-500 data-[hover]:text-rose-500 data-[focus]:outline-1 data-[focus]:outline-gray-300 dark:data-[focus]:outline-white'>
        Elimina
      </PopoverButton>

      <PopoverBackdrop className='fixed inset-0 bg-white/30 backdrop-blur-sm dark:bg-black/30' />

      <PopoverPanel
        transition
        anchor='bottom'
        className='relative ml-4 mr-4 mt-1 rounded-xl border border-zinc-800/20 bg-white/50 px-4 py-2 shadow-sm shadow-zinc-400 backdrop-blur-lg transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:border-zinc-200/20 dark:bg-black/20 dark:shadow-black'
      >
        <p className='select-none pb-1 text-zinc-600 dark:text-zinc-400'>
          Eliminare questo post?
        </p>

        <div className='flex gap-2'>
          <PopoverButton
            className={`block rounded-lg px-3 py-2 text-zinc-600 transition hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/5 ${loading ? 'invisible' : ''}`}
          >
            Annulla
          </PopoverButton>

          <button
            onClick={async () => {
              setLoading(true)
              await deletePost(slug)
              setLoading(false)
            }}
            disabled={loading}
            className='block rounded-lg px-3 py-2 text-rose-500 transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5'
          >
            Elimina
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
