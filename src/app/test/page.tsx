'use client'

import { useState } from 'react'

export default function Page() {
  return (
    <>
      <h1>Test</h1>
      <Component />
    </>
  )
}

function Component() {
  const [progress, setProgress] = useState(0)
  const [data, setData] = useState<string | null>(null)

  const fetchData = async () => {
    setProgress(0) // Reset progress

    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    const contentLength = response.headers.get('Content-Length')
    if (!response.body) {
      throw new Error('Response body is null')
    }
    const reader = response.body.getReader()
    let receivedLength = 0
    const chunks = []

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      chunks.push(value)
      receivedLength += value.length

      if (contentLength) {
        setProgress((receivedLength / Number(contentLength)) * 100)
      }
    }

    const decoder = new TextDecoder()
    const arrayBuffer = await new Response(new Blob(chunks)).arrayBuffer()
    const result = decoder.decode(arrayBuffer)
    setData(result)
    setProgress(100)
  }

  return (
    <>
      <button onClick={fetchData}>Fetch Data</button>
      <div className='h-[4px] w-full rounded-lg bg-gray-500/20'>
        <div
          style={{
            width: `${progress}%`,
          }}
          className='h-full rounded-lg bg-green-500 transition-all duration-300'
        ></div>
      </div>
      {data && <pre>{data}</pre>}
    </>
  )
}
