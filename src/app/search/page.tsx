import FoundPosts from '@/app/search/components/FoundPosts'
import SearchForm from '@/app/search/components/SearchForm'
import SearchMessage from '@/app/search/components/SearchMessage'

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
