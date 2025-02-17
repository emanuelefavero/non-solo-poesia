/* eslint-disable @next/next/no-img-element */
import { URL } from '@/data/url'
import type { Post } from '@/types'

type Props = {
  post: Post
}

export default function Component({ post }: Props) {
  return (
    <div>
      <h1>{post.title}</h1>
      {post.cover_image && <img src={post.cover_image} alt={post.title} />}
      <p>{post.description}</p>
      <a href={`${URL}/post/${post.slug}`}>Leggi il post</a>
    </div>
  )
}
