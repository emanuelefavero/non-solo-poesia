type Props = { params: Promise<{ slug: string }> }

export default async function Page({ params }: Props) {
  const slug = (await params).slug
  return <h1>My Category: {slug}</h1>
}
