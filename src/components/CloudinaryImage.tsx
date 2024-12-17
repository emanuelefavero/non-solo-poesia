'use client'

// import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

type Props = {
  title: string
  cover_image: string
}

export default function Component({ title, cover_image }: Props) {
  // TODO Conditionally adjust the Cloudinary image width and height based if this component is rendered on the home page or not
  // TODO Conditionally render CldImage or Image based on if cover_image_cloudinary prop is present or not

  return (
    <>
      <Image
        src={cover_image}
        alt={title}
        fill={true}
        sizes='(min-width: 768px) 768px, 100vw'
        style={{ objectFit: 'cover' }}
        className='rounded-md'
      />

      {/* <CldImage
        src='cld-sample-5'
        alt={title}
        fill={true}
        sizes='(min-width: 768px) 768px, 100vw'
        quality='auto'
        priority={true}
        format='auto'
        crop='auto'
        className='rounded-md'
        aspectRatio={16 / 9}
        // tint='70:violet:pink'
      /> */}
    </>
  )
}
