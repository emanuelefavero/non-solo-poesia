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
        <h1>{TITLE}</h1>
      </button>
    )
  }

  return (
    <Link href='/'>
      <span>{TITLE}</span>
    </Link>
  )
}
