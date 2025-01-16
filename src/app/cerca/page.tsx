import FoundPosts from '@/app/cerca/components/FoundPosts'
import SearchForm from '@/app/cerca/components/SearchForm'
import SearchMessage from '@/app/cerca/components/SearchMessage'
import Title from '@/components/Title'
import { TITLE } from '@/data/title'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Cerca - ${TITLE}`,
  description: `Cerca un post nel blog ${TITLE} digitando una parola chiave del titolo`,
}

export default function Page() {
  return (
    <div className='min-h-[calc(100vh-90px)]'>
      <Title className='mt-[5.7rem]'>Cerca post</Title>

      <SearchForm />
      <SearchMessage />
      <FoundPosts />
    </div>
  )
}
