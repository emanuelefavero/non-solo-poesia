import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href='/create-post?key=secret'>Create Post</Link>
      <h1>Hello</h1>
    </>
  )
}
