import { subscribe } from '@/app/actions/subscribe'
import SubmitFormButton from '@/components/SubmitFormButton'

export default function Component() {
  async function handleAction(formData: FormData) {
    'use server'

    await subscribe(formData)
  }

  return (
    <div className='hidden select-none flex-col flex-wrap items-center justify-center gap-2 5xs:flex md:flex-row md:gap-3'>
      <h2 className='text-center text-lg uppercase'>
        Iscriviti alla Newsletter
      </h2>

      <form
        action={handleAction}
        className='flex flex-wrap items-center justify-center gap-2'
      >
        <label htmlFor='email' className='sr-only text-base'>
          Email{' '}
          <sup className='select-none align-top text-lg font-bold text-pink-600 dark:text-pink-400'>
            *
          </sup>
        </label>
        <input type='email' name='email' placeholder='La tua email' required />
        <SubmitFormButton
          ariaLabel='Iscriviti alla Newsletter'
          className='5xs:min-w-[70px]' // adjust the min width to fit the text
        >
          Iscriviti
        </SubmitFormButton>
      </form>
    </div>
  )
}
