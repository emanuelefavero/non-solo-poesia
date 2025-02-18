/* eslint-disable @next/next/no-img-element */
import { TITLE } from '@/data/title'
import { URL } from '@/data/url'
import type { Post } from '@/types'

type Props = {
  post: Post
}

// TODO Add custom font for the logo? Only if it is efficient

export default function Component({ post }: Props) {
  const imgStyle = {
    borderRadius: '6px',
    maxWidth: '100%',
    height: 'auto',
  }
  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const logoUrl = `${URL}/logo.png`

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

      {/* Line */}
      <hr
        style={{
          marginTop: '48px',
          marginBottom: '12px',
          border: 'none',
          borderBottom: '1px solid rgba(127, 127, 127, 0.3)',
        }}
      />

      {/* Logo */}
      <a
        href={URL}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
        }}
      >
        <img
          src={logoUrl}
          alt={TITLE}
          width='24'
          height='24'
          style={{ display: 'block' }}
        />
        <span
          style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'inherit' }}
        >
          {TITLE}
        </span>
      </a>

      {/* Blank Space */}
      <div style={{ height: '24px' }} />
    </>
  )
}
