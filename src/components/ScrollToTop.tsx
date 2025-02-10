'use client'

import { useEffect } from 'react'

// TIP: This component ensures that the page scrolls to the top when the route changes (add this component to pages that need this behavior). It is a workaround since the Next.js Link component is not scrolling to the top even if `scroll={true}` is set

export default function Component() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}
