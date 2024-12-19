export type Post = {
  id: string
  slug: string
  title: string
  description: string
  cover_image: string
  cover_image_cloudinary?: string
  content: string
  author: string
  published_at: string
  updated_at?: string | null
}

export type Message = {
  type: 'success' | 'error'
  text: string
}

export type Author = {
  id: string
  name: "Maria D'Ippolito" | 'Teresa'
}
