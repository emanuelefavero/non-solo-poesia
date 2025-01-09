export default function Component() {
  const year = new Date().getFullYear()

  return (
    <>
      <span>&copy; {year} Blog</span>

      <span className='mx-1 hidden text-black xs:inline-block dark:text-white'>
        |
      </span>

      <a
        className='text-center font-medium text-pink-700 hover:underline dark:text-pink-400'
        href='https://emanuelefavero.com/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Sito web realizzato da Emanuele Favero
      </a>
    </>
  )
}
