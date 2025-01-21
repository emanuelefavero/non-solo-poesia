import PostAuthor from '@/components/Post/PostAuthor'
import PostDate from '@/components/Post/PostDate'
import PostViews from '@/components/Post/PostViews'
import type { Post } from '@/types'

export default function Component({ post }: { post: Post }) {
  return (
    <div className='mt-2.5 flex flex-col gap-0.5'>
      <span className='flex flex-wrap gap-2 text-sm'>
        {/* Author */}
        <PostAuthor author={post.author} />
        {/* Views */}
        <PostViews views={post.views} />
      </span>

      {/* Date */}
      <PostDate
        published_at={post.published_at}
        updated_at={post.updated_at}
        className='text-zinc-500 dark:text-zinc-400'
      />
    </div>
  )
}
