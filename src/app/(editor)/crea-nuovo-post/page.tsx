import Editor from '@/app/(editor)/components/Editor'
import Title from '@/components/Title'
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
  const adminIds = process.env.NEXT_PUBLIC_ADMIN_IDS?.split(',') || []

  // Redirect if the user is not an admin or author
  if (!userId || !adminIds.includes(userId)) {
    redirect('/')
  }

  return (
    <>
      <Title className='mt-[5.7rem]'>Crea nuovo post</Title>
      <Editor />
    </>
  )
}
