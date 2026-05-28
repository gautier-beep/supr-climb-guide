import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected"',
      'Cache-Control': 'no-store',
    },
  })
}

export function middleware(request: NextRequest) {
  const enabled = process.env.PROTECT_APP === 'true'
  if (!enabled) return NextResponse.next()

  const user = process.env.BASIC_AUTH_USER
  const pass = process.env.BASIC_AUTH_PASS
  if (!user || !pass) return unauthorizedResponse()

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Basic ')) return unauthorizedResponse()

  const encoded = authHeader.slice('Basic '.length)
  const decoded = Buffer.from(encoded, 'base64').toString('utf-8')
  const [providedUser, ...rest] = decoded.split(':')
  const providedPass = rest.join(':')

  if (providedUser !== user || providedPass !== pass) {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images/|favicon.ico|robots.txt|sitemap.xml).*)'],
}
