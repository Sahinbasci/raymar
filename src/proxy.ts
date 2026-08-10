import { NextResponse, type NextRequest } from 'next/server'
import { completeLocales, defaultLocale } from '@/lib/i18n'

/**
 * Sends `/` to the default locale.
 *
 * Only locales with approved copy are matched, so an unpublished locale falls
 * through to the 404 rather than silently serving Turkish under an `/en` URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = completeLocales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|brand|images|video|icons|.*\\..*).*)'],
}
