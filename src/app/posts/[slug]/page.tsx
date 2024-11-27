import { promises as fs } from 'fs'
import path from 'path'

// Get post data by slug (the slug comes from the URL)
async function getPost(slug: string) {
  const postsDirectory = path.resolve(process.cwd(), 'src', 'posts')
  const fileName = `${slug}.json`
  const filePath = path.join(postsDirectory, fileName)
  const fileContents = await fs.readFile(filePath, 'utf8')
  const post = JSON.parse(fileContents)
  return post
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <>
      <h1>{post.title}</h1>

      {/* Author */}
      <p>By {post.author}</p>

      {/* Date */}
      <p>Published on {new Date(post.publishedAt).toDateString()}</p>

      {/* Content */}
      <div
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </>
  )
}
