'use client'

import Image from 'next/image'
import { useState } from 'react'

// Use input type file to upload images and display a preview in the Next.js image component

export default function Page() {
  const [coverImageCloudinaryPreview, setCoverImageCloudinaryPreview] =
    useState<string | ArrayBuffer | null>(null)
  const [coverImageCloudinary, setCoverImageCloudinary] = useState<string>('')

  const handleUploadImageToCloudinary = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0]

    // Check if file is greater than 3MB
    if (file && file.size > 3 * 1024 * 1024) {
      alert('File size must be less than 3MB')
      return
    }

    if (file) {
      try {
        const reader = new FileReader()

        // Create a Promise to wait for FileReader to complete
        const filePreview = await new Promise<string | ArrayBuffer | null>(
          (resolve, reject) => {
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = () => reject(new Error('Error reading file'))
            reader.readAsDataURL(file)
          },
        )

        // Update state with image preview and file name
        if (filePreview) {
          setCoverImageCloudinaryPreview(filePreview)
        }

        // Prepare form data
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'blog_preset')

        // Upload image to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
          }/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        )

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`)
        }

        const data = await response.json()

        if (data) {
          setCoverImageCloudinary(data.public_id)
        }
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
  }

  return (
    <>
      <h1 className='mb-4'>Upload Image</h1>
      <input
        type='file'
        accept='image/*'
        onChange={handleUploadImageToCloudinary}
        className='mb-4'
      />
      {coverImageCloudinaryPreview && (
        <div className='relative h-96 w-96'>
          <Image
            src={coverImageCloudinaryPreview as string}
            alt='Uploaded Image'
            layout='fill'
            objectFit='cover'
          />

          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <p className='text-white'>{coverImageCloudinary}</p>
          </div>
        </div>
      )}
    </>
  )
}
