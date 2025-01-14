import Editor from '@/app/(editor)/components/Editor'
import { TITLE } from '@/data/title'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: `Nuovo post - ${TITLE}`,
  description: `Crea un nuovo post per il blog ${TITLE}. Questa pagina è riservata agli amministratori e agli autori.`,
}

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
      <h1 className='mb-4'>Crea nuovo post</h1>
      <Editor />
    </>
  )
}
