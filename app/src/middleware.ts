import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the user is on the login page
  if (request.nextUrl.pathname === '/auth/login') {
    return NextResponse.next()
  }

  // Get the wallet address from cookie or header
  const hasWallet = request.cookies.get('walletAddress')

  // Redirect to login if no wallet is connected
  if (!hasWallet) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

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
