import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define routes that don't require authentication
const unauthenticatedRoutes = [
  '/',
  '/reset-password',
  '/verifyEmail'
]

export function middleware(request: NextRequest) {
  // Get the token cookie
  const token = request.cookies.get('token')
  console.log(token)
  
  // Check if the current route is in the unauthenticated routes list
  const isUnauthenticatedRoute = unauthenticatedRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(route + '/')
  )
  
  // If trying to access authenticated routes without a token, redirect to home
  if (!isUnauthenticatedRoute && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  // Allow the request to continue
  return NextResponse.next()
}

// Configure which paths this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
