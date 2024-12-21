'use client'

export default function Page() {
  const handleClick = async () => {
    alert('Hello')
  }

  return (
    <>
      <h1>Test</h1>
      <button onClick={handleClick} className='w-fit rounded bg-green-500 px-4'>
        Click
      </button>
    </>
  )
}
