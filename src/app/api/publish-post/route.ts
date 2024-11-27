import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    // Get title and content
    const { title, content } = await req.json()

    // Validate title and content
    if (!title || !content) {
      return new Response(
        JSON.stringify({ message: 'Title and content are required' }),
        {
          status: 400,
        },
      )
    }

    // Sanitize title (remove special characters and spaces) for the file name
    const sanitizedTitle = title
      .trim()
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()

    // Create post object
    const post = {
      id: randomUUID(),
      slug: sanitizedTitle,
      title,
      content,
      author: "Maria D'Ippolito", // TODO: Add author field in /create-post
      publishedAt: new Date().toISOString(),
      updatedAt: null, // Placeholder for future updates

      // TODO: Add other metadata (let the author add these in /create-post)
      // tags: [],
      // coverImageURL: '',
      // description: '',
      // readingTime: '',
    }

    // Save post to json file
    const fileName = `${post.slug}.json`
    const postsDirectory = path.resolve(process.cwd(), 'src', 'posts')
    const filePath = path.join(postsDirectory, fileName)
    await fs.writeFile(filePath, JSON.stringify(post, null, 2))

    return new Response(
      JSON.stringify({ message: 'Post published successfully!', filePath }),
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error saving post:', error)
    return new Response(JSON.stringify({ message: 'Failed to publish post' }), {
      status: 500,
    })
  }
}
