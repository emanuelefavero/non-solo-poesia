import ContactUs from '@/components/ContactUs'
import NewsletterForm from '@/components/NewsletterForm'
import PrivacyPolicyLink from '@/components/PrivacyPolicyLink'
import { TITLE } from '@/data/title'
import { DEVELOPER_URL } from '@/data/url'

export default function Component() {
  const year = new Date().getFullYear()

  return (
    <footer className='flex w-full flex-col flex-wrap items-center justify-center gap-2 border-t border-t-pink-500/10 bg-pink-400/10 p-4 text-sm dark:bg-pink-600/10'>
      <div className='flex w-full max-w-[1157px] flex-col flex-wrap items-center justify-center gap-5'>
        <NewsletterForm />
        <ContactUs />

        <div className='flex flex-col items-center justify-center gap-2 text-center'>
          <span>
            &copy; {year} {TITLE}{' '}
            <span className='hidden 2xs:inline-block'>
              - Tutti i diritti riservati.
            </span>{' '}
            <PrivacyPolicyLink />
          </span>

          <a
            className='text-center font-medium text-pink-700 hover:underline dark:text-pink-400'
            href={DEVELOPER_URL}
            target='_blank'
            rel='noopener noreferrer'
          >
            Sito web realizzato da Emanuele Favero
          </a>
        </div>
      </div>
    </footer>
  )
}
