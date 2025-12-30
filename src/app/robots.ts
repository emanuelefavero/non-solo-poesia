import { URL } from '@/data/url'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/', // Homepage,
        '/post/*', // All posts
        '/categoria/*', // All categories
        '/cerca', // Search page
        '/informativa-sulla-privacy', // Privacy Policy
      ],
      disallow: [
        '/crea-nuovo-post', // Create new post
        '/modifica-post/*', // Edit post
        '/newsletter-success', // Newsletter success page
        '/unsubscribe', // Newsletter unsubscribe page
        '/api/*', // API routes
      ],
    },
    sitemap: `${URL}/sitemap.xml`,
  }
}
