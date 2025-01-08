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

  return (
    <Link href='/' className='hover:no-underline'>
      <span className={`${commonStyles}`}>{TITLE}</span>
    </Link>
  )
}
