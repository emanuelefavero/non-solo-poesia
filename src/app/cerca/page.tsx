import FoundPosts from '@/app/cerca/components/FoundPosts'
import SearchForm from '@/app/cerca/components/SearchForm'
import SearchMessage from '@/app/cerca/components/SearchMessage'

export default function Page() {
  return (
    <div className='min-h-[calc(100vh-90px)]'>
      <h1 className='mb-8'>Cerca post</h1>

      <SearchForm />
      <SearchMessage />
      <FoundPosts />
    </div>
  )
}
