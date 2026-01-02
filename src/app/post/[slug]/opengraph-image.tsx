import { TITLE } from '@/data/title'
import { getPost } from '@/lib/neon/posts'
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: '#150209',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Post Not Found
        </div>
      ),
      { ...size },
    )
  }

  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  let backgroundImage = null

  if (post.cover_image_cloudinary) {
    backgroundImage = `https://res.cloudinary.com/${cloudinaryName}/image/upload/q_auto,f_auto,w_1200,ar_16:9,c_fill/${post.cover_image_cloudinary}.jpg`
  } else if (post.cover_image) {
    backgroundImage = post.cover_image
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: backgroundImage ? `url(${backgroundImage})` : '#150209',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Overlay for text readability if background image */}
        {backgroundImage && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          />
        )}

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            marginBottom: '20px',
            zIndex: 1,
            maxWidth: '80%',
            wordWrap: 'break-word',
          }}
        >
          {post.title}
        </div>

        {/* Logo and Blog Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 1,
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          <img
            src='/logo.png'
            alt={TITLE}
            width='40'
            height='40'
            style={{ borderRadius: '50%' }}
          />
          <span>{TITLE}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
