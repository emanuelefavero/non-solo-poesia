'use client'

import { useEffect, useState } from 'react'

const letters = 'GRAZIE!'.split('')

export default function Component() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  return letters.map((letter, index) => (
    <span
      key={index}
      className={`inline-block transform transition-opacity duration-500 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {letter}
    </span>
  ))
}
