import { dancing_script } from '@/app/fonts'
import { TITLE } from '@/config/index'
import Link from 'next/link'

type Props = {
  isHomepage: boolean
}

export default function Component({ isHomepage }: Props) {
  const handleRefreshPage = () => {
    window.scrollTo(0, 0)
    window.location.reload()
  }

  const commonStyles = `${dancing_script.className} text-base 5xs:text-xl 4xs:text-2xl 3xs:text-4xl 2xs:text-5xl xs:text-6xl sm:text-7xl text-center font-bold text-zinc-800 dark:text-zinc-100`

  if (isHomepage) {
    return (
      <button onClick={handleRefreshPage}>
        <h1 className={`${commonStyles}`}>{TITLE}</h1>
      </button>
    )
  }

  // TODO Add page and order_by search parameter to the link (page=1&order_by=published_at). Check if the Order By 'Data' or 'Titolo' gets updated properly when the page is reloaded, if not, you have to convert this component to a client component and use the order_by state or try to only update the page state to 1 and see if the behavior is fine.

  return (
    <Link href='/' className='hover:no-underline'>
      <span className={`${commonStyles}`}>{TITLE}</span>
    </Link>
  )
}
