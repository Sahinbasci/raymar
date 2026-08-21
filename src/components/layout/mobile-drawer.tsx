'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import { BrandLogo } from '@/components/media/brand-logo'
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock'
import type { Locale } from '@/lib/i18n'
import type { HeaderContent, NavItem } from '@/types/content'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
  /** Prefixes the section links, so they also work from the legal pages. */
  locale: Locale
  nav: readonly NavItem[]
  header: HeaderContent
}

/**
 * Full-screen navigation drawer.
 *
 * Built on the native `<dialog>` element opened with `showModal()`, which gives
 * a real modal: focus is trapped by the browser, the page behind it is inert,
 * and Escape closes it — no hand-rolled focus management to drift out of sync.
 * Body scroll is additionally pinned because iOS Safari still scrolls the page
 * behind a modal dialog.
 *
 * Enter/exit transitions are pure CSS (`@starting-style` + `allow-discrete`).
 * Where a browser does not support them the drawer simply appears and
 * disappears instantly, which is a graceful degradation, not a broken state.
 */
export function MobileDrawer({ open, onClose, locale, nav, header }: MobileDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useBodyScrollLock(open)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Escape and backdrop dismissal both fire `close`; mirror it back into state.
  const handleClose = useCallback(() => {
    if (open) onClose()
  }, [open, onClose])

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onCancel={handleClose}
      aria-label={header.mobileNavAriaLabel}
      className="m-0 h-full max-h-full w-full max-w-full -translate-y-3 flex-col border-0 bg-raymar-ivory p-0 text-raymar-ink opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-[400ms] ease-out backdrop:bg-transparent open:flex [&[open]]:translate-y-0 [&[open]]:opacity-100 starting:[&[open]]:-translate-y-3 starting:[&[open]]:opacity-0"
    >
      <div className="flex h-full flex-col overflow-y-auto overscroll-contain px-7 pt-7 pb-10">
        <div className="flex items-center justify-between">
          <BrandLogo variant="green-gold" height={36} alt={header.logoAlt} />
          <button
            type="button"
            onClick={onClose}
            aria-label={header.closeMenu}
            className="flex h-12 w-12 items-center justify-center rounded-none border border-raymar-green/22 bg-transparent text-[22px] leading-none font-light text-raymar-green transition-colors duration-300 hover:border-raymar-gold"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <nav aria-label={header.mobileNavAriaLabel} className="mt-11 flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}#${item.id}`}
              onClick={onClose}
              className="border-b border-raymar-green/12 py-5 font-[family-name:var(--font-display)] text-3xl font-light text-raymar-green transition-colors duration-300 hover:text-raymar-gold-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`/${locale}#teklif`}
          onClick={onClose}
          className="mt-auto flex min-h-[62px] items-center justify-center gap-3 rounded-none bg-raymar-green text-xs font-normal tracking-[0.2em] text-raymar-white uppercase transition-colors duration-300 hover:bg-raymar-green-hover"
        >
          {header.cta}
        </Link>
      </div>
    </dialog>
  )
}
