import { categories } from '@/data/categories'
import { useDarkMode } from '@/hooks/useDarkMode'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Twirl as Hamburger } from 'hamburger-react'
import CategoryLink from './CategoryLink'

// TODO Add browser detection to fix the menu position on FireFox, Safari and Mobile, OR simply remove absolute positioning and let the icon be larger as the problem is only with the icon size being smaller

export default function Component() {
  const isDarkMode = useDarkMode()

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <MenuButton
        className='relative mr-0.5 mt-1.5 h-6 w-6 overflow-hidden rounded bg-transparent'
        title='Menu'
        aria-label='Menu'
      >
        {({ open }) => (
          <div className='absolute -left-3 -top-[0.72rem]'>
            <Hamburger
              toggled={open}
              color={
                isDarkMode
                  ? open
                    ? '#f43f5e'
                    : '#f472b6'
                  : open
                    ? '#e11d48'
                    : '#db2777'
              }
              size={20}
              duration={0.3}
            />
          </div>
        )}
      </MenuButton>

      <MenuItems
        transition
        className='absolute right-0 z-10 mt-2 origin-top-right rounded-md border border-zinc-800/20 bg-white/50 px-3 py-1.5 shadow-sm shadow-zinc-400 ring-1 ring-black/5 backdrop-blur-lg transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in 5xs:w-40 dark:border-zinc-200/20 dark:bg-black/20 dark:shadow-black'
      >
        {categories.map((category) => (
          <MenuItem key={category.id}>
            <CategoryLink
              name={category.name}
              slug={category.slug}
              className='block py-0.5 capitalize text-zinc-700 hover:text-black focus-visible:text-black data-[focus]:text-black data-[focus]:outline-none dark:text-zinc-300 dark:hover:text-white dark:focus-visible:text-white dark:data-[focus]:text-white'
            />
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
