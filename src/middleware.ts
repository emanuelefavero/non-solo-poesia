import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const SECRET_KEY = 'secret'

export function middleware(request: NextRequest) {
  // Protect the /create-post route with a secret key in the URL parameter
  // TIP: To access the /create-post route you need to visit:
  // /create-post?key=SECRET_KEY
  if (request.nextUrl.pathname === '/create-post') {
    if (request.nextUrl.searchParams.get('key') !== SECRET_KEY) {
      return NextResponse.redirect(new URL('/', request.url))

      // TIP: You could also redirect to a /403 Forbidden page instead of home
    }
  }
}

export const config = {
  matcher: [
    // Match the /create-post route
    '/create-post',

    // Match all routes except the ones listed (negative regex lookahead)
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
