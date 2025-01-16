import { dancing_script } from '@/app/fonts'
import { TITLE } from '@/data/title'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  isHomepage: boolean
}

export default function Component({ isHomepage }: Props) {
  const router = useRouter()
  const handleRefreshPage = () => {
    router.push('/')
  }

  const commonStyles = `${dancing_script.className} text-base 5xs:text-xl 4xs:text-2xl 3xs:text-4xl 2xs:text-5xl xs:text-6xl sm:text-7xl text-center font-bold text-zinc-800 dark:text-zinc-100`

  if (isHomepage) {
    return (
      <button onClick={handleRefreshPage}>
        <span className={`${commonStyles}`}>{TITLE}</span>
      </button>
    )
  }

  return (
    <Link href='/' className='hover:no-underline'>
      <span className={`${commonStyles}`}>{TITLE}</span>
    </Link>
  )
}
