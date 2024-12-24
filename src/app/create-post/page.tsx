import Editor from '@/components/Editor'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const { userId } = await auth()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const authorId = process.env.NEXT_PUBLIC_AUTHOR_ID

  // Redirect if the user is not an admin or author
  if (!userId || (userId !== adminId && userId !== authorId)) {
    redirect('/')
  }

  return (
    <>
      <h1 className='mb-4'>Aggiungi nuovo post</h1>
      <Editor />
    </>
  )
}
