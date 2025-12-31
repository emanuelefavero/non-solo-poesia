export const DEVELOPMENT_URL = 'http://localhost:3000'
export const PRODUCTION_URL = 'https://nonsolopoesia.it'
export const URL =
  process.env.NODE_ENV === 'production'
    ? PRODUCTION_URL
    : process.env.NEXT_PUBLIC_BASE_URL || DEVELOPMENT_URL

export const DEVELOPER_URL = 'https://emanuelefavero.com'
