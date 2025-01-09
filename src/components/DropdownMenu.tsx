import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Twirl as Hamburger } from 'hamburger-react'

export default function Component() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <MenuButton className='relative h-7 w-7 rounded'>
        {({ open }) => (
          <div className='absolute -left-3 -top-1.5 h-7 w-7'>
            <Hamburger
              toggled={open}
              color='#db2777'
              size={20}
              duration={0.3}
            />
          </div>
        )}
      </MenuButton>

      <MenuItems
        transition
        className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
      >
        <div className='py-1'>
          <MenuItem>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href='#'
              className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
            >
              License
            </a>
          </MenuItem>
          <form action='#' method='POST'>
            <MenuItem>
              <button
                type='submit'
                className='block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none'
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}
