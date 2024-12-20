'use server'

// Upload an image to Cloudinary
export async function uploadImageToCloudinary(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'blog_preset')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  if (!response.ok) {
    return {
      message: `Errore - Impossibile caricare l'immagine: ${response.statusText}`,
    }
  }

  const data = await response.json()
  return data
}
