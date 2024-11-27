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
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()

    // Create post object
    const post = {
      sanitizedTitle,
      title,
      content,
      publishedAt: new Date().toISOString(),
    }

    // Save post to json file
    const fileName = `${post.sanitizedTitle}.json`
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
