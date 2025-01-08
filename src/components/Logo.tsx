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

  if (isHomepage) {
    return (
      <button onClick={handleRefreshPage}>
        <h1
          className={`${dancing_script.className} text-zinc-800 dark:text-zinc-100`}
        >
          {TITLE}
        </h1>
      </button>
    )
  }

  return (
    <Link href='/'>
      <span
        className={`${dancing_script.className} text-zinc-800 dark:text-zinc-100`}
      >
        {TITLE}
      </span>
    </Link>
  )
}
