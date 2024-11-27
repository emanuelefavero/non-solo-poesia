export default function Component() {
  const year = new Date().getFullYear()

  return (
    <>
      <p>&copy; {year} Blog</p>

      <span className='xs:inline-block mx-1 hidden text-white'>|</span>

      <a
        className='text-center font-medium hover:underline'
        href='https://emanuelefavero.com/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Sito web realizzato da Emanuele Favero
      </a>
    </>
  )
}
