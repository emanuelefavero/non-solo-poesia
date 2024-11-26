import TipTap from '@/components/TipTap'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Link href='/'>Go Home</Link>
      <h1 className='mb-4'>Create Post</h1>
      <TipTap />
    </>
  )
}
