import { TITLE } from '@/data/title'
import { URL } from '@/data/url'
import { getPost } from '@/lib/neon/posts'
import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Shared logo and blog name element
const logoElement = (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 1,
      fontSize: 32,
      fontWeight: 'bold',
      textShadow: '2px 2px 7px rgba(0, 0, 0, 0.2)',
    }}
  >
    <img
      src={`${URL}/logo.png`}
      alt={TITLE}
      width='40'
      height='40'
      style={{ borderRadius: '50%' }}
    />
    <span>{TITLE}</span>
  </div>
)

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
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          {logoElement}
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
          background: backgroundImage
            ? `linear-gradient(rgba(21, 2, 9, 0.5), rgba(21, 2, 9, 0.5)), url(${backgroundImage})`
            : '#150209',
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
        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bolder',
            marginBottom: '20px',
            zIndex: 1,
            maxWidth: '80%',
            wordWrap: 'break-word',
            textShadow: '2px 2px 7px rgba(0, 0, 0, 0.2)',
          }}
        >
          {post.title}
        </div>

        {/* Logo and Blog Name */}
        {logoElement}
      </div>
    ),
    { ...size },
  )
}
