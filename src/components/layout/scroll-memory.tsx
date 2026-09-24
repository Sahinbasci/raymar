'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'
import { afterScrollUnlock, scrollLocked } from '@/hooks/use-body-scroll-lock'

/** Key of this component's own field in `history.state`. */
const ENTRY = '__raymarEntry'

/** Scroll position of each history entry of this visit, by entry id. */
const positions = new Map<string, number>()

/** A Back or Forward to another page, waiting for that page to be rendered. */
let pending: { readonly top: number | undefined; readonly hash: string } | null = null

/**
 * Recording is off from the moment the reader leaves a page until the next
 * one is in place: in between, the scroll position belongs to neither.
 * Measured, following a link from the homepage 3686px down to a product page:
 * Next.js puts the new page in the DOM a frame before it updates the address
 * bar and the history entry. The product page is shorter, so in that frame
 * the position is clamped to its height — 3251px — while the homepage's entry
 * is still the current one, and recording it there sent Back to 3251px
 * instead of 3686px.
 */
let suspended = false
let resume = 0

function suspend(): void {
  suspended = true
  window.clearTimeout(resume)
  // A navigation that never arrives must not leave recording off for good.
  resume = window.setTimeout(() => {
    suspended = false
  }, 8000)
}

function resumeRecording(): void {
  window.clearTimeout(resume)
  suspended = false
}

/** The pathname currently rendered, as opposed to the one in the address bar. */
let renderedPath: string | null = null

/** `/tr/` and `/tr` are one page: `.htaccess` serves both from `tr.html`. */
function normalise(path: string | null): string | null {
  return path && path.length > 1 ? path.replace(/\/+$/, '') : path
}

function entryId(): string | null {
  const state = window.history.state as Record<string, unknown> | null
  const id = state?.[ENTRY]
  return typeof id === 'string' ? id : null
}

/**
 * The current entry's id, assigning one on first use. Written into the state
 * Next.js keeps in the entry, which it carries over on every update of that
 * entry (`preserveCustomHistoryState` on traversals and restores).
 */
function ensureEntryId(): string {
  const existing = entryId()
  if (existing) return existing
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
  window.history.replaceState({ ...(window.history.state ?? {}), [ENTRY]: id }, '')
  return id
}

function place(top: number | undefined, hash: string): void {
  afterScrollUnlock(() => {
    if (top !== undefined) {
      window.scrollTo({ top, behavior: 'instant' })
      return
    }
    const target = hash
      ? document.getElementById(decodeURIComponent(hash.slice(1)))
      : null
    if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  })
}

/** Whether a click on `event`'s link leaves this page for another one. */
function leavesPage(event: MouseEvent): boolean {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false
  }
  const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null
  if (!(anchor instanceof HTMLAnchorElement)) return false
  if ((anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) {
    return false
  }
  const url = new URL(anchor.href)
  return (
    url.origin === window.location.origin &&
    (normalise(url.pathname) !== normalise(window.location.pathname) ||
      url.search !== window.location.search)
  )
}

let installed = false

/**
 * Listens for the life of the document, not of a component. The root layout
 * is keyed by locale, so switching language unmounts this component and
 * mounts a new one — and measured, Back across that switch was rendered by the
 * router synchronously inside its own `popstate` handler, which unmounted the
 * instance whose listener was still waiting for the same event. Registered in
 * the capture phase, the traversal is also seen before the router starts on
 * it. Nothing here is ever removed: the document owns it.
 */
function install(): void {
  if (installed) return
  installed = true

  const manual = () => {
    window.history.scrollRestoration = 'manual'
  }

  const record = () => {
    if (
      !suspended &&
      !scrollLocked() &&
      normalise(window.location.pathname) === normalise(renderedPath)
    ) {
      positions.set(ensureEntryId(), window.scrollY)
    }
  }

  let frame = 0
  const onScroll = () => {
    if (frame) return
    frame = requestAnimationFrame(() => {
      frame = 0
      record()
    })
  }

  const onPopState = () => {
    const id = entryId()
    const top = id === null ? undefined : positions.get(id)
    const { hash } = window.location
    if (normalise(window.location.pathname) === normalise(renderedPath)) {
      place(top, hash)
      return
    }
    suspend()
    pending = { top, hash }
  }

  manual()
  window.addEventListener('scroll', onScroll, { passive: true })
  // Capture, so the page being left is marked before any handler — the
  // router's included — can start replacing it.
  document.addEventListener(
    'click',
    (event) => {
      if (!leavesPage(event)) return
      // The position at the moment of leaving, not the last one a frame
      // callback got round to: a scroll in the same frame as the click would
      // otherwise be lost.
      record()
      suspend()
    },
    { capture: true },
  )
  window.addEventListener('popstate', onPopState, { capture: true })
  // Reloads and returns from another site are full loads, which the
  // browser's own restoration handles correctly.
  window.addEventListener('pagehide', () => {
    window.history.scrollRestoration = 'auto'
  })
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) manual()
  })
}

/**
 * Puts the reader back where they were on Back and Forward.
 *
 * The browser's own restoration could not, on this site. Next.js swaps the
 * page after the browser has restored the scroll position, onto the page
 * being left, and the position the browser saved for the homepage was already
 * the clamped one (see `suspended`). Back from a product page landed 435px
 * short of where the reader had been on the homepage. It only ever looked right
 * while `scroll-behavior: smooth` was on the page, because the restoration then
 * ran as a slow glide that happened to finish after the swap — the slide on
 * Back that `InPageNavigation` describes.
 *
 * So restoration is manual for the life of this document: each entry gets an
 * id, its position is recorded as the reader scrolls (never while a navigation
 * is under way, nor under the drawer's scroll lock, where the window reads 0),
 * and on Back or Forward the position is placed once the destination page has
 * rendered — in a layout effect, before paint, so there is no frame at the
 * wrong height. A fragment traversal on the same page is placed at once, as
 * nothing will re-render.
 *
 * A full page load keeps the browser's restoration, which works there because
 * the document is complete before it runs: the mode is handed back on
 * `pagehide`, so reloads and returns from another site restore natively.
 */
export function ScrollMemory(): null {
  const pathname = usePathname()

  useLayoutEffect(() => {
    renderedPath = pathname
    if (pending) {
      place(pending.top, pending.hash)
      pending = null
    }
    resumeRecording()
    ensureEntryId()
  }, [pathname])

  useEffect(install, [])

  return null
}
