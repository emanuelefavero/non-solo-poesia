'use client'

import { useEditorStore } from '@/app/(editor)/stores/editorStore'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

type Props = {
  handleAddCoverImage: () => void
  handleAddCoverImageCloudinary: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void
}

export default function Component({
  handleAddCoverImage,
  handleAddCoverImageCloudinary,
}: Props) {
  const {
    setProgress,
    coverImageType,
    setCoverImageType,
    coverImage,
    coverImageCloudinaryPreview,
    coverImageCloudinary,
    title,
  } = useEditorStore()

  return (
    <div className='mb-4 flex flex-col gap-2'>
      <label htmlFor='cover-image-type' className='font-medium'>
        Tipo di immagine di copertina
      </label>
      <select
        id='cover-image-type'
        value={coverImageType}
        onChange={(e) => {
          setCoverImageType(e.target.value as 'url' | 'file')
          setProgress(0)
        }}
        className='max-w-[151px]'
      >
        <option value='url'>URL</option>
        <option value='file'>File</option>
      </select>

      {coverImageType === 'url' ? (
        <button
          onClick={handleAddCoverImage}
          className='relative mb-4 flex aspect-video w-full'
        >
          {coverImage ? (
            <>
              <Image
                src={coverImage}
                fill={true}
                alt='Immagine di copertina'
                className='rounded-md'
                style={{ objectFit: 'cover' }}
              />
              <div className='absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50 font-semibold text-white opacity-0 hover:opacity-100'>
                Cambia immagine di copertina
              </div>
            </>
          ) : (
            <div className='flex h-full w-full select-none flex-wrap items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-sm font-semibold dark:bg-neutral-900'>
              Aggiungi immagine di copertina
            </div>
          )}
        </button>
      ) : (
        <div className='relative mb-4 flex aspect-video w-full'>
          {coverImageCloudinaryPreview ? (
            <>
              <Image
                src={coverImageCloudinaryPreview as string}
                fill={true}
                alt='Immagine di copertina'
                className='rounded-md'
                style={{ objectFit: 'cover' }}
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md bg-black bg-opacity-50 font-semibold text-white opacity-0 hover:opacity-100'>
                <label htmlFor='change-cover-image-file'>
                  Cambia immagine di copertina
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleAddCoverImageCloudinary}
                  className='mb-4'
                  id='change-cover-image-file'
                />
              </div>
            </>
          ) : coverImageCloudinary ? (
            <>
              <CldImage
                src={coverImageCloudinary}
                alt={title}
                fill={true}
                sizes='(min-width: 768px) 768px, 100vw'
                quality='auto'
                format='auto'
                crop='auto'
                className='rounded-md'
                aspectRatio={16 / 9}
                priority={true}
              />
              <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-md bg-black bg-opacity-50 font-semibold text-white opacity-0 hover:opacity-100'>
                <label htmlFor='change-cover-image-file'>
                  Cambia immagine di copertina
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleAddCoverImageCloudinary}
                  className='mb-4'
                  id='change-cover-image-file'
                />
              </div>
            </>
          ) : (
            <div className='flex h-full w-full select-none flex-col flex-wrap items-center justify-center gap-4 rounded-md border border-gray-300 bg-gray-100 text-sm font-semibold dark:bg-neutral-900'>
              <label htmlFor='add-cover-image-file'>
                Aggiungi immagine di copertina
              </label>
              <input
                type='file'
                accept='image/*'
                onChange={handleAddCoverImageCloudinary}
                className='mb-4'
                id='add-cover-image-file'
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
