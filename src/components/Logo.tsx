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
        <h1 className={`${dancing_script.className}`}>{TITLE}</h1>
      </button>
    )
  }

  return (
    <Link href='/'>
      <span className={`${dancing_script.className}`}>{TITLE}</span>
    </Link>
  )
}
