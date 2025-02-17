/* eslint-disable @next/next/no-img-element */
import { URL } from '@/data/url'
import type { Post } from '@/types'

type Props = {
  post: Post
}

// TODO: Add logo and website name to the end of the email

export default function Component({ post }: Props) {
  const imgStyle = {
    borderRadius: '6px',
    maxWidth: '100%',
    height: 'auto',
  }
  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  return (
    <>
      <h1>{post.title}</h1>
      {post.cover_image_cloudinary ? (
        <img
          src={`https://res.cloudinary.com/${cloudinaryName}/image/upload/q_auto,f_auto,w_768,ar_16:9,c_fill/${post.cover_image_cloudinary}.jpg`}
          width='768'
          height='432'
          alt={post.title}
          style={imgStyle}
        />
      ) : (
        <img src={post.cover_image} alt={post.title} style={imgStyle} />
      )}
      <p>{post.description}</p>
      <a href={`${URL}/post/${post.slug}`}>Continua a leggere...</a>
    </>
  )
}
