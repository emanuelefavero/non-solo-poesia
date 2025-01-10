export type CategoryName =
  | 'Poesie'
  | 'Racconti'
  | 'Pensieri'
  | 'Ricette'
  | 'Eventi'

export type CategorySlug =
  | 'poesie'
  | 'racconti'
  | 'pensieri'
  | 'ricette'
  | 'eventi'

export type Category = {
  id: string
  name: CategoryName
  slug: CategorySlug
}

export type Post = {
  id: string
  slug: string
  title: string
  description: string
  cover_image: string
  cover_image_cloudinary?: string
  content: string
  author: string
  category: CategoryName
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
