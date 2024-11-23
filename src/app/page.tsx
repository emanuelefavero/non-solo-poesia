import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className='text-pink-500'>Hello</h1>

      <Link href='/create-post?key=secret'>Create Post</Link>
    </>
  )
}
