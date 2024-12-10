import { randomUUID } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    // Get title and content
    const { title, description, coverImage, content } = await req.json()

    // Validate title, description, cover image, and content
    if (!title || !description || !coverImage || !content) {
      return new Response(
        JSON.stringify({
          message: 'Title, description, cover image and content are required',
        }),
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

    // Sanitize description (remove special characters and spaces)
    const sanitizedDescription = description
      .trim()
      .replace(/[^a-z0-9\s-]/gi, '')

    // Sanitize cover image URL
    const sanitizedCoverImage = coverImage.trim()

    // Make sure the coverImage URL is valid
    if (!/^https?:\/\/\S+\.\S+/.test(sanitizedCoverImage)) {
      return new Response(
        JSON.stringify({ message: 'Please enter a valid image URL' }),
        {
          status: 400,
        },
      )
    }

    // Create post object
    const post = {
      id: randomUUID(),
      slug: sanitizedTitle,
      title,
      description: sanitizedDescription,
      coverImage: sanitizedCoverImage,
      content,
      author: "Maria D'Ippolito", // TODO: Add author field in /create-post
      publishedAt: new Date().toISOString(),
      updatedAt: null, // Placeholder for future updates

      // TODO: Add other metadata (let the author add these in /create-post)
      // tags: [],
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
