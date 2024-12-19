'use client'
import { deleteImageFromCloudinary } from '@/app/actions/deleteImageFromCloudinary'

export default function Page() {
  const handleDelete = async () => {
    const data = await deleteImageFromCloudinary('public_id') // <-- Replace 'public_id' with the public_id of the image you want to delete
    console.log(data)
  }

  return (
    <>
      <h1>Test</h1>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}
