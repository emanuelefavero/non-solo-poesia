'use server'

import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Server action to delete an image from Cloudinary using the Node.js SDK
export async function deleteImageFromCloudinary(publicId: string) {
  console.log(publicId)

  try {
    if (!publicId) {
      throw new Error('Missing public_id')
    }

    // Use the Cloudinary SDK to destroy the image
    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result !== 'ok') {
      return { message: "Errore - Impossibile eliminare l'immagine" }
    }

    return
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error)
    return {
      message: "Errore interno del server - Impossibile eliminare l'immagine",
    }
  }
}
