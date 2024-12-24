type TitleInputProps = {
  title: string
  setTitle: (value: string) => void
}

export default function TitleInput({ title, setTitle }: TitleInputProps) {
  return (
    <input
      type='text'
      placeholder='Titolo...'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='mb-4 w-full'
      maxLength={100}
    />
  )
}
