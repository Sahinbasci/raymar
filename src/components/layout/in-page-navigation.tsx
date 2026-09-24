'use client'

import { useEffect } from 'react'
import { afterScrollUnlock } from '@/hooks/use-body-scroll-lock'

/** `/tr/` and `/tr` are the same page: `.htaccess` serves both from `tr.html`. */
function samePath(a: string, b: string): boolean {
  const trim = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path)
  return trim(a) === trim(b)
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Glides to `target`, then gives it focus the way a native fragment jump moves
 * the keyboard's starting point: the next Tab continues from the section the
 * reader asked for, not from the link they clicked in the header.
 */
function goTo(target: HTMLElement): void {
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'instant' : 'smooth',
    block: 'start',
  })
  if (!target.matches('a[href], button, input, select, textarea, [tabindex]')) {
    target.setAttribute('tabindex', '-1')
  }
  target.focus({ preventScroll: true })
}

/**
 * Owns every link to a fragment of the page the reader is already on.
 *
 * Measured on all seven device profiles before this existed:
 *
 *   - Clicking a menu item a second time did nothing. "Ürünler" once, a scroll
 *     down to the walnut grades, "Ürünler" again: the page stayed put, 1360px
 *     past the section, because the URL already ended in `#urunlerimiz` and the
 *     router treats a link to the current URL as nothing to do.
 *   - The glide itself came from `scroll-behavior: smooth` on `<html>`, which
 *     animates every scroll on the page and not only the ones a reader asks
 *     for. On Chromium and Firefox the Back button then opened the previous
 *     page at the top and slid a whole page length to where the reader had
 *     been, and Forward opened a document scrolled 2900px down before sliding
 *     it back to its top. Next.js suspends the CSS rule for its own route
 *     changes only, so no attribute fixes history traversal.
 *
 * The CSS rule is gone, so every scroll the browser or the router makes lands
 * instantly, and the glide is applied here, to the one case that is a request
 * to travel: a click on a same-page fragment link. A link to a fragment on
 * another page still goes through the router, which lands on the section
 * once the new page is in place.
 *
 * Listening in the capture phase on `document` runs before React's own handler,
 * and `next/link` skips its navigation when it finds the event already
 * prevented, so the two never both act on one click. A link's own `onClick` —
 * the drawer closing itself — still runs, and the scroll waits for the drawer's
 * scroll lock to let go (see `afterScrollUnlock`). A modified click (new tab,
 * new window, download) is left to the browser.
 */
export function InPageNavigation(): null {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const anchor =
        event.target instanceof Element ? event.target.closest('a[href]') : null
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (
        (anchor.target && anchor.target !== '_self') ||
        anchor.hasAttribute('download')
      ) {
        return
      }

      const url = new URL(anchor.href)
      if (
        !url.hash ||
        url.origin !== window.location.origin ||
        url.search !== window.location.search ||
        !samePath(url.pathname, window.location.pathname)
      ) {
        return
      }

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return

      event.preventDefault()
      // Recorded in history like a native fragment jump, so Back returns to
      // where the reader was. Next.js adopts a native `pushState` into its
      // router state.
      if (url.hash !== window.location.hash) {
        window.history.pushState(null, '', url.hash)
      }
      afterScrollUnlock(() => goTo(target))
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
