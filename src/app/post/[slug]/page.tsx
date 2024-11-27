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

// NOTE: This props need to be a Promise, this fix was added with the following code mod: #see https://nextjs.org/docs/messages/sync-dynamic-apis
type Props = { params: Promise<{ slug: string }> }

export default async function Page(props: Props) {
  const params = await props.params
  const post = await getPost(params.slug)

  return (
    <>
      <h1>{post.title}</h1>

      {/* Author */}
      <p>Scritto da {post.author}</p>

      {/* Date */}
      <p>
        Pubblicato il{' '}
        {new Date(post.publishedAt)
          .toLocaleDateString('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
          // Capitalize the first letter of the month
          .replace(/(\b\w)/g, (char) => char.toUpperCase())}
      </p>

      {/* Content */}
      <div
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </>
  )
}
