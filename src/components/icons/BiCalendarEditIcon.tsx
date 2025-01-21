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
        d='M25.3333 5.33334H21.3333V2.66667H18.6667V5.33334H13.3333V2.66667H10.6667V5.33334H6.66667C5.196 5.33334 4 6.52934 4 8V26.6667C4 28.1373 5.196 29.3333 6.66667 29.3333H25.3333C26.804 29.3333 28 28.1373 28 26.6667V8C28 6.52934 26.804 5.33334 25.3333 5.33334ZM6.66667 26.6667V9.33334H25.3333V8L25.336 26.6667H6.66667Z'
        // fill='white'
      />
      <path
        d='M20.8373 16.244L18.4373 13.8453L20.264 12.0173L22.664 14.416L20.8373 16.244ZM10.6733 21.6013V24H13.072L19.7067 17.3733L17.308 14.9747L10.6733 21.6013Z'
        // fill='white'
      />
    </svg>
  )
}
