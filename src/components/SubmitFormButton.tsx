'use client'

import Spinner from '@/components/icons/Spinner'
import { ReactNode, Ref } from 'react'
import { useFormStatus } from 'react-dom'

interface Props {
  children: ReactNode
  onClick?: () => void
  ariaLabel?: string
  className?: string
  ref?: Ref<HTMLButtonElement>
}

export default function Component({
  children,
  onClick,
  ariaLabel,
  className,
  ref,
}: Props) {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={pending}
      className={`flex items-center justify-center rounded bg-pink-600 px-3 py-2 text-center text-white hover:bg-pink-700 active:scale-95 ${className} ${
        pending ? 'cursor-not-allowed opacity-50' : ''
      }`}
      ref={ref}
    >
      {pending ? <Spinner /> : children || ''}
    </button>
  )
}
