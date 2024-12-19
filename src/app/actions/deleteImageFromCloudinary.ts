// ! FIX 400 Bad request error
// TODO Try ChatGPT solution with crypto signature
// TODO If it does not work, try to use the Node.js SDK to delete (and upload) images
// TODO try the delete action in the /test route
// TODO read documentation
export async function deleteImageFromCloudinary(publicId: string) {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_id: publicId,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      }),
    },
  )

  if (!response.ok) {
    return {
      message: `Errore - Impossibile eliminare l'immagine: ${response.statusText}`,
    }
  }

  const data = await response.json()
  return data
}
