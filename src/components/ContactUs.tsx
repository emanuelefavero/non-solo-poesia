import Link from 'next/link'

export default function Component() {
  const email = 'info@nonsolopoesia.it'

  return (
    <div className='hidden flex-col flex-wrap items-center justify-center gap-2 5xs:flex md:flex-row md:gap-3'>
      <h2 className='text-center text-lg uppercase'>Contattaci</h2>

      <div className='flex flex-wrap items-center justify-center gap-2'>
        <Link
          href={`mailto:${email}`}
          className='text-base text-pink-700 hover:underline dark:text-pink-400'
        >
          {email}
        </Link>
      </div>
    </div>
  )
}
