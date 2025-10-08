import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateNotionApiKey } from '@/app/actions/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // setup 페이지는 인증 체크 제외
  if (pathname.startsWith('/setup') || pathname.startsWith('/api/setup')) {
    return NextResponse.next()
  }
  
  // 정적 파일들은 인증 체크 제외
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }
  
  // API 라우트 중 인증이 필요한 것들만 체크
  if (pathname.startsWith('/api/notion') && !pathname.startsWith('/api/notion/client')) {
    try {
      const isValid = await validateNotionApiKey()
      if (!isValid) {
        return NextResponse.json(
          { error: 'Notion API key not found or invalid' },
          { status: 401 }
        )
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }
  }
  
  // 워크스페이스 페이지들에 대한 인증 체크
  if (pathname.startsWith('/databases') || pathname.startsWith('/pages') || pathname.startsWith('/settings')) {
    try {
      const isValid = await validateNotionApiKey()
      if (!isValid) {
        return NextResponse.redirect(new URL('/setup', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/setup', request.url))
    }
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
