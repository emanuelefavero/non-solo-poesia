'use client'

import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

type Props = {
  title: string
  cover_image?: string
  cover_image_cloudinary?: string

  // ? Get the index of the post to handle the image priority prop
  index?: number
}

// TODO Try to avoid using CldImage and check if it is possible to use the Image component from Next.js instead
// TODO Conditionally adjust the Cloudinary image width and height based if this component is rendered on the home page or not

export default function Component({
  title,
  cover_image,
  cover_image_cloudinary,
  index = 0,
}: Props) {
  return (
    <>
      {cover_image_cloudinary && (
        <CldImage
          src={cover_image_cloudinary}
          alt={title}
          fill={true}
          sizes='(min-width: 768px) 768px, 100vw'
          quality='auto'
          format='auto'
          crop='auto'
          className='rounded-md'
          aspectRatio={16 / 9}
          // tint='70:violet:pink'

          // ? Handle the image priority prop based on the index of the post
          priority={index >= 0 && index < 4}
        />
      )}

      {cover_image && (
        <Image
          src={cover_image}
          alt={title}
          fill={true}
          sizes='(min-width: 768px) 768px, 100vw'
          style={{ objectFit: 'cover' }}
          className='rounded-md'
          // ? Handle the image priority prop based on the index of the post
          priority={index >= 0 && index < 4}
        />
      )}

      {/* Add a fallback image */}
      {!cover_image_cloudinary && !cover_image && (
        <Image
          src='/fallback.webp'
          alt='Fallback Image'
          fill={true}
          sizes='(min-width: 768px) 768px, 100vw'
          style={{ objectFit: 'cover' }}
          className='rounded-md'
          // ? Handle the image priority prop based on the index of the post
          priority={index >= 0 && index < 4}
        />
      )}
    </>
  )
}
