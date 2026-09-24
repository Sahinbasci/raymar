import { locales, type Locale } from '@/lib/i18n'

/**
 * The same page in another locale.
 *
 * `/tr/kvkk-aydinlatma-metni` becomes `/en/kvkk-aydinlatma-metni`, not `/en`.
 * The language switch used to link every locale to its root, so a reader
 * switching language on a legal document was dropped on the homepage instead
 * of the translated document — measured on the live site, where the EN link on
 * `/tr/kvkk-aydinlatma-metni` rendered as `href="/en"`.
 *
 * Only the leading segment is replaced, and only when it is a known locale, so
 * a path that merely contains "tr" somewhere cannot be rewritten by accident. A
 * trailing slash is dropped: `.htaccess` serves `/tr/` from `tr.html`, and the
 * switch must still produce the canonical, slash-less URL from it.
 */
export function swapLocale(pathname: string, target: Locale): string {
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const [, first, ...rest] = normalised.split('/')

  if (!(locales as readonly string[]).includes(first ?? '')) {
    return `/${target}`
  }
  return rest.length > 0 ? `/${target}/${rest.join('/')}` : `/${target}`
}
