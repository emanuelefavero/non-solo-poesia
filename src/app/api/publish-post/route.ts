export async function POST(req: Request) {
  const { content } = await req.json()

  // TODO: Save the content to a database or a file in the Next.js server
  console.log(content)

  return Response.json({ message: 'Post published successfully!' })
}
