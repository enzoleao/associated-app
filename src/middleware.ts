import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = [
  '/auth/login',
  '/auth/forget-password',
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/settings', '/payments', '/reports', '/associates'],
}
