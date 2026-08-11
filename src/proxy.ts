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
    /*
     * Deliberately 307, not 308.
     *
     * `/` sends everyone to Turkish today only because Turkish is the one
     * published locale. The moment English ships this has to become an
     * Accept-Language negotiation, and a permanent redirect would already be
     * cached in every returning visitor's browser — an export buyer whose
     * browser learned `/` → `/tr` months earlier would never reach `/en`.
     * The destination is provisional, so the redirect says so.
     */
    url.pathname = `/${defaultLocale}`
    return NextResponse.redirect(url)
  }

  /*
   * Send a differently-cased locale to its canonical form before Next can route
   * it.
   *
   * Next matches route segments case-insensitively, so `/tR` reaches the
   * `[locale]` route, fails `dynamicParams: false`, and the resulting 404 is
   * written into the file-system prerender cache under a key that — on a
   * case-insensitive filesystem, which covers macOS, Windows and many container
   * bind mounts — IS the entry for `/tr`. The homepage then serves a blank
   * noindexed 404 to every visitor from the next restart onward. One anonymous
   * request is enough to do it, so this has to be caught here rather than
   * anywhere downstream.
   */
  const segments = pathname.split('/')
  const first = segments[1]
  if (first) {
    const canonical = first.toLocaleLowerCase('en-US')
    if (
      canonical !== first &&
      completeLocales.some((locale) => locale === canonical)
    ) {
      const url = request.nextUrl.clone()
      segments[1] = canonical
      url.pathname = segments.join('/')
      return NextResponse.redirect(url, 308)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|brand|images|video|icons|.*\\..*).*)'],
}
