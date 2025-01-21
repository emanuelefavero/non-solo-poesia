# Rich Text Blog

A blog application built with Next.js, TipTap, Clerk and Neon DB that allows users to create blog posts with rich text formatting.

## Website

- [https://rich-text-blog.vercel.app/](https://rich-text-blog.vercel.app/)

## Getting Started

- Clone the repository
- `cd` into the project directory
- Install dependencies with `npm install --legacy-peer-deps`
- Go to the [Clerk](https://clerk.dev) console and create a new project
- Go to the [Neon](https://console.neon.tech/app/projects) console and create a new project
- Go to the Neon SQL editor and run the following SQL query to create a `posts` table:

```sql
CREATE TABLE IF NOT EXISTS posts(
  id UUID PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT DEFAULT '',
  cover_image_cloudinary TEXT DEFAULT '',
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT DEFAULT '',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0
)
```

- Also create an index on the `slug` and `category` columns to speed up queries (run this in the Neon SQL editor):

```sql
CREATE INDEX idx_slug ON posts(slug);
CREATE INDEX idx_category ON posts(category);
```

- Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
# Clerk configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= # Go to your Clerk console
CLERK_SECRET_KEY= # Go to your Clerk console

# Clerk user IDs to assign roles (you will get these after each user signs up)
NEXT_PUBLIC_ADMIN_ID= # This is the admin of the blog
NEXT_PUBLIC_AUTHOR_ID= # This is the author of the blog

# Cloudinary configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= # Go to your Cloudinary console
NEXT_PUBLIC_CLOUDINARY_API_KEY= # Go to your Cloudinary console
CLOUDINARY_API_SECRET= # Go to your Cloudinary console

# Neon database URL
DATABASE_URL= # Go to your neon project console and copy the DATABASE_URL
```

- Run the development server:

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TipTap (Rich Text Editor)
- Clerk (Authentication)
- Neon (Database)
- Headless UI (Popover)
- Vercel (Deployment)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TipTap Documentation](https://www.tiptap.dev/)
- [Clerk Documentation](https://clerk.com/docs)
- [Neon Documentation](https://neon.tech/docs/introduction)
- [Headless UI Documentation](https://headlessui.dev/)

## License

- [MIT](LICENSE.md)
