import { categories } from '@/data/categories'
import { useDarkMode } from '@/hooks/useDarkMode'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Twirl as Hamburger } from 'hamburger-react'
import CategoryLink from './CategoryLink'

export default function Component() {
  const isDarkMode = useDarkMode()

  return (
    <Menu
      as='div'
      className='relative z-50 inline-block h-8 w-8 rounded text-left'
    >
      <MenuButton className='bg-transparent' title='Menu' aria-label='Menu'>
        {({ open }) => (
          <div className='absolute -left-2 -top-2'>
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
              size={24}
              duration={0.3}
            />
          </div>
        )}
      </MenuButton>

      <MenuItems
        transition
        className='absolute right-0 z-50 mt-1 origin-top-right rounded-md border border-zinc-800/20 bg-[#fff8fc] px-3 py-1.5 shadow-sm shadow-zinc-400/30 ring-1 ring-black/5 backdrop-blur-md transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in 5xs:w-40 dark:border-zinc-200/20 dark:bg-[#150209] dark:shadow-black'
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
