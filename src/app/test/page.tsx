'use client'

import { fetchUsers } from '@/app/actions'
import { useState } from 'react'

interface User {
  id: string
  name: string
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const handleClick = async () => {
    const users = await fetchUsers()

    if (users.message) {
      setMessage(users.message)
      return
    }

    setUsers(users)
  }
  return (
    <>
      <h1>Test</h1>
      <button onClick={handleClick}>Log</button>

      {message && <p>{message}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}
