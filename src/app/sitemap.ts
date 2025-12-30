import { categories } from '@/data/categories'
import { URL } from '@/data/url'
import { getAllPostSitemapData } from '@/lib/neon/posts'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSitemapData()

  // Generate sitemap entries for posts with URL-encoded slugs
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${URL}/post/${encodeURIComponent(post.slug)}`,
    lastModified: post.updated_at
      ? new Date(post.updated_at)
      : new Date(post.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Generate sitemap entries for categories
  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${URL}/categoria/${encodeURIComponent(category.slug)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Static pages
  const staticUrls: MetadataRoute.Sitemap = [
    // Home
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // Privacy Policy
    {
      url: `${URL}/informativa-sulla-privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    // Cerca
    {
      url: `${URL}/cerca`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.1,
    },
  ]

  return [...staticUrls, ...categoryUrls, ...postUrls]
}
