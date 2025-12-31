export const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://nonsolopoesia.it'
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export const DEVELOPER_URL = 'https://emanuelefavero.com'
