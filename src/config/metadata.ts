import type { Metadata } from 'next'

export const ROBOTS_INDEX: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const ROBOTS_NOINDEX: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}
