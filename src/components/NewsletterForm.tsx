export default function Component() {
  return (
    <div className='flex select-none flex-col items-center justify-center gap-2 md:flex-row md:gap-3'>
      <h2 className='text-lg uppercase'>Iscriviti alla Newsletter</h2>

      <form className='flex items-center justify-center gap-2'>
        <label htmlFor='email' className='sr-only text-base'>
          Email{' '}
          <sup className='select-none align-top text-lg font-bold text-pink-600 dark:text-pink-400'>
            *
          </sup>
        </label>
        <input type='email' name='email' placeholder='La tua email' />
        <button
          type='submit'
          className='rounded bg-pink-600 px-3 py-2 text-white hover:bg-pink-700 active:scale-95'
        >
          Iscriviti
        </button>
      </form>
    </div>
  )
}
