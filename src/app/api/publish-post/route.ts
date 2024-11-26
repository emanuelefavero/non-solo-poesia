export async function POST(req: Request) {
  const { title, content } = await req.json()

  // TODO: Save the post content to a database or a file in the Next.js server
  // TIP: You could use the title as the filename and the content as the file content
  console.log(title)
  console.log(content)

  return Response.json({ message: 'Post published successfully!' })
}
