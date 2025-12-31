/* eslint-disable @next/next/no-img-element */
import { TITLE } from '@/data/title'
import type { Post } from '@/types'

// We use PRODUCTION_URL to ensure links in emails always point to the live site
import { PRODUCTION_URL } from '@/data/url'

type Props = {
  post: Post
  email: string
}

export default function Component({ post, email }: Props) {
  const imgStyle = {
    borderRadius: '6px',
    maxWidth: '100%',
    height: 'auto',
  }
  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const logoUrl = `${PRODUCTION_URL}/logo.png`
  const unsubscribeUrl = `${PRODUCTION_URL}/unsubscribe?email=${encodeURIComponent(email)}`

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
      <a href={`${PRODUCTION_URL}/post/${post.slug}`}>Continua a leggere...</a>

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
        href={PRODUCTION_URL}
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

      {/* Unsubscribe link */}
      <p style={{ fontSize: '14px' }}>
        Se non desideri più ricevere queste email,{' '}
        <a
          href={unsubscribeUrl}
          style={{ color: 'inherit', fontWeight: 'bold' }}
        >
          clicca qui
        </a>
        .
      </p>

      {/* Blank Space */}
      <div style={{ height: '24px' }} />
    </>
  )
}
