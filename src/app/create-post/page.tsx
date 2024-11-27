import TipTap from '@/components/TipTap'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <Link href='/'>Vai alla Home</Link>
      <h1 className='mb-4'>Aggiungi nuovo post</h1>
      <TipTap />
    </>
  )
}
