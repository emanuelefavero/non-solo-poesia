import { promises as fs } from 'fs'
import Link from 'next/link'
import path from 'path'

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
      <Link href='/create-post?key=secret'>Create Post</Link>
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
