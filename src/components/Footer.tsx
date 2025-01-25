import { TITLE } from '@/data/title'

// TODO Add more content (contact us, privacy policy, etc.) and style Footer (see other websites)

export default function Component() {
  const year = new Date().getFullYear()

  return (
    <footer className='flex w-full flex-col flex-wrap items-center justify-center gap-2 border-t border-t-pink-500/10 bg-pink-400/10 p-4 text-sm dark:bg-pink-600/10'>
      <div className='flex w-full max-w-[1157px] flex-col flex-wrap items-center justify-center gap-2'>
        <span>
          &copy; {year} {TITLE}{' '}
          <span className='hidden 2xs:inline-block'>
            - Tutti i diritti riservati.
          </span>
        </span>

        <a
          className='text-center font-medium text-pink-700 hover:underline dark:text-pink-400'
          href='https://emanuelefavero.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Sito web realizzato da Emanuele Favero
        </a>
      </div>
    </footer>
  )
}
