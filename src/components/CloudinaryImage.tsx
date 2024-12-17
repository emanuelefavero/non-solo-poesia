'use client'

// import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

type Props = {
  title: string
  cover_image: string

  // ? Get the index of the post to handle the image priority prop
  index?: number
}

export default function Component({ title, cover_image, index = 0 }: Props) {
  // TODO Conditionally render CldImage or Image based on if cover_image_cloudinary prop is present or not
  // TODO Conditionally adjust the Cloudinary image width and height based if this component is rendered on the home page or not

  return (
    <>
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

      {/* <CldImage
        src='cld-sample-5'
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
      /> */}
    </>
  )
}
