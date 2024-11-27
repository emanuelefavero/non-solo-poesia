import { promises as fs } from 'fs'
import Link from 'next/link'
import path from 'path'

// TODO: Limit the number of posts to display on the home page (add pagination)
// TODO: Add a search bar to filter posts by title or content
// TODO: Add a filter to sort posts by date, title, or author
// TODO: Move the getAllPosts function to a separate file (e.g., src/lib/posts.ts)

// Get all json files in the src/posts directory
export async function getAllPosts() {
  const postsDirectory = path.resolve(process.cwd(), 'src', 'posts')
  const fileNames = await fs.readdir(postsDirectory)
  const posts = fileNames.map(async (fileName) => {
    const filePath = path.join(postsDirectory, fileName)
    const fileContents = await fs.readFile(filePath, 'utf8')
    const post = JSON.parse(fileContents)
    return post
  })
  return Promise.all(posts)
}

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <>
      <h1>Blog</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
