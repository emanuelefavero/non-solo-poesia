import { CONTACT_EMAIL } from '@/data/email'
import Link from 'next/link'

export default function Component() {
  return (
    <div className='hidden flex-col flex-wrap items-center justify-center gap-2 5xs:flex md:flex-row md:gap-3'>
      <h2 className='text-center text-lg uppercase'>Contattaci</h2>

      <div className='flex flex-wrap items-center justify-center gap-2'>
        <Link
          href={`mailto:${CONTACT_EMAIL}`}
          className='text-base text-pink-700 hover:underline dark:text-pink-400'
        >
          {CONTACT_EMAIL}
        </Link>
      </div>
    </div>
  )
}
