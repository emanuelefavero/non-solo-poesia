'use server'

import cloudinary from '@/lib/cloudinary'

// Server action to delete an image from Cloudinary using the Node.js SDK
export async function deleteImageFromCloudinary(publicId: string) {
  console.log(publicId)

  try {
    if (!publicId) {
      throw new Error('Missing public_id')
    }

    // * Use the Cloudinary SDK to destroy the image
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
