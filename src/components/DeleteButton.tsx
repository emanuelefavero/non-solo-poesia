'use client'

import { deletePost } from '@/app/actions'
import { useRouter } from 'next/navigation'

interface Props {
  slug: string
}

export default function Component({ slug }: Props) {
  const router = useRouter()

  return (
    <button
      onClick={async () => {
        await deletePost(slug)
        router.push('/') // Redirect home
      }}
      className='text-rose-600 dark:text-rose-500'
    >
      Elimina
    </button>
  )
}
