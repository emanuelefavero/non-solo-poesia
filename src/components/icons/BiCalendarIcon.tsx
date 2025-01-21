interface Props {
  className?: string
}

export default function Component({ className }: Props) {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`fill-zinc-500 dark:fill-zinc-400 ${className}`}
    >
      <path
        d='M9.33334 14.6667H12V17.3333H9.33334V14.6667ZM9.33334 20H12V22.6667H9.33334V20ZM14.6667 14.6667H17.3333V17.3333H14.6667V14.6667ZM14.6667 20H17.3333V22.6667H14.6667V20ZM20 14.6667H22.6667V17.3333H20V14.6667ZM20 20H22.6667V22.6667H20V20Z'
        // fill='white'
      />
      <path
        d='M6.66667 29.3333H25.3333C26.804 29.3333 28 28.1373 28 26.6667V8C28 6.52934 26.804 5.33334 25.3333 5.33334H22.6667V2.66667H20V5.33334H12V2.66667H9.33333V5.33334H6.66667C5.196 5.33334 4 6.52934 4 8V26.6667C4 28.1373 5.196 29.3333 6.66667 29.3333ZM25.3333 10.6667L25.3347 26.6667H6.66667V10.6667H25.3333Z'
        // fill='white'
      />
    </svg>
  )
}
