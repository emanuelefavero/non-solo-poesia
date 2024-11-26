# Rich Text Blog

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

- Clone the repository
- `cd` into the project directory
- Install dependencies with `npm install`
- Create a `.env.local` file in the root of the project and add the following environment variables:

```bash
SECRET_KEY= # Choose a secret key to share with the Blog author
```

> NOTE: `SECRET_KEY` is used to access the admin dashboard. The author of the blog will need to provide this key as a query parameter to access the dashboard. (e.g. `http://localhost:3000/create-post?key=SECRET_KEY`)
> TIP: You can share the full link with the author and ask them to replace `SECRET_KEY` with the actual key.

- Run the development server:

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
- Go to `http://localhost:3000/create-post?key=SECRET_KEY` to create a new blog post.

## Features

- Create a new blog post
- Edit an existing blog post
- Delete a blog post
- View all blog posts
- View a single blog post

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TipTap (Rich Text Editor)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TipTap Documentation](https://www.tiptap.dev/)
