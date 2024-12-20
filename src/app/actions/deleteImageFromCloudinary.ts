// Import necessary modules
import crypto from 'crypto'

// ! FIX 400 Bad request error
// TODO If it does not work, try to use the Node.js SDK to delete (and upload) images
// TODO try the delete action in the /test route
// TODO read documentation

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

// Server action to delete an image from Cloudinary
export async function deleteImageFromCloudinary(publicId: string) {
  try {
    if (!publicId) throw new Error('Missing public_id')

    // Generate the signature
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = crypto
      .createHash('sha1')
      .update(
        `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`,
      )
      .digest('hex')

    // Prepare the form data
    const formData = new URLSearchParams()
    formData.append('public_id', publicId)
    formData.append('timestamp', timestamp.toString())
    formData.append('api_key', CLOUDINARY_API_KEY)
    formData.append('signature', signature)

    // Make the POST request to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      },
    )

    if (!response.ok) {
      return {
        message: `Errore - Impossibile eliminare l'immagine: ${response.statusText}`,
      }
    }

    const data = await response.json()
    return data

    // Return success message
    // return {
    //   message: 'Immagine eliminata con successo',
    //   data,
    // }
  } catch (error) {
    console.error('Error deleting image:', error)
    return {
      message: "Errore interno del server - Impossibile eliminare l'immagine",
    }
  }
}
