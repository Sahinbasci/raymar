'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/media/brand-logo'
import { ChevronTrail } from '@/components/ui/icons'
import { useScrollThreshold } from '@/hooks/use-scroll-threshold'
import type { Locale } from '@/lib/i18n'
import type { HeaderContent, NavItem } from '@/types/content'
import { LanguageSwitch } from './language-switch'
import { MobileDrawer } from './mobile-drawer'

interface SiteHeaderProps {
  locale: Locale
  nav: readonly NavItem[]
  header: HeaderContent
  /**
   * Forces the ivory state from the first paint, for pages that open on a light
   * surface instead of the hero.
   *
   * The transparent state exists to let the header sit over the hero video, and
   * it only works because something dark is behind it. On a page that opens on
   * ivory the same styling paints white on `#f8f5ee` — a 1.06:1 contrast ratio,
   * i.e. an invisible navigation until the visitor happens to scroll. Pages
   * without a hero pass `alwaysSolid`.
   */
  alwaysSolid?: boolean
}

/**
 * Fixed header that is transparent over the hero and resolves to ivory once the
 * page scrolls past 48px, exactly as approved.
 *
 * The whole light/dark inversion — logo variant, nav colour, rules, burger,
 * CTA — is driven by one `data-solid` attribute and resolved in CSS. That means
 * a single boolean of React state for the entire header, and no scroll listener:
 * `useScrollThreshold` observes a sentinel instead.
 *
 * Both logo variants are rendered and cross-faded, so switching states costs no
 * network request and cannot flash an empty box. They are stacked in a fixed
 * 172x40 box, so the header never reflows when the state changes.
 */
export function SiteHeader({
  locale,
  nav,
  header,
  alwaysSolid = false,
}: SiteHeaderProps) {
  const scrolled = useScrollThreshold(48)
  const solid = alwaysSolid || scrolled
  const [menuOpen, setMenuOpen] = useState(false)

  /*
   * Close the drawer once the desktop navigation takes over.
   *
   * The burger that opens it is hidden from `lg` up, so a drawer left open
   * across that boundary is a modal `<dialog>` covering — and inerting — the
   * whole desktop layout with no visible control to dismiss it. The real
   * trigger is not a resized window but a tablet rotated from portrait (1024px,
   * burger visible) to landscape (1366px, burger gone).
   */
  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 1080px)')
    const close = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    close()
    desktop.addEventListener('change', close)
    return () => desktop.removeEventListener('change', close)
  }, [menuOpen])

  return (
    <>
      <header
        data-solid={solid}
        className="group/header fixed inset-x-0 top-0 z-[90] border-b border-raymar-white/14 bg-transparent transition-[background-color,border-color] duration-[450ms] ease-out data-[solid=true]:border-raymar-green/12 data-[solid=true]:bg-raymar-ivory"
      >
        <div className="shell flex h-18 items-center gap-4 group-data-[solid=true]/header:h-16 md:h-22 md:gap-7 md:group-data-[solid=true]/header:h-19">
          {/*
            The 0.9 scale applies to one state only: the scrolled header on
            phones. The brand manual requires 3X of clear space on all four
            sides of the lockup, where X is 1/22 of its width. At the full 40px
            height that is 14.7px, and the scrolled mobile bar is 64px tall,
            leaving (64 − 40) / 2 = 12px — the one combination on the site that
            falls short. Scaling to 36px brings the requirement down to 13.2px
            and the available space up to 14px. Every other state already
            complies (desktop 24/25px, desktop scrolled 18/19px, mobile at rest
            16/17px), so none of them is touched. `origin-left` keeps the
            lockup's left edge fixed, so the horizontal clear space and the
            optical alignment with the nav below are unchanged.
          */}
          <Link
            href={`/${locale}#ust`}
            aria-label={header.homeAriaLabel}
            className="relative block h-10 w-[108px] flex-none origin-left transition-transform duration-[450ms] ease-out group-data-[solid=true]/header:scale-90 md:group-data-[solid=true]/header:scale-100"
          >
            <BrandLogo
              variant="white-gold"
              height={40}
              alt={header.logoAlt}
              priority
              className="absolute top-0 left-0 opacity-100 transition-opacity duration-[400ms] group-data-[solid=true]/header:opacity-0"
            />
            <span aria-hidden="true">
              <BrandLogo
                variant="green-gold"
                height={40}
                alt=""
                className="absolute top-0 left-0 opacity-0 transition-opacity duration-[400ms] group-data-[solid=true]/header:opacity-100"
              />
            </span>
          </Link>

          <nav
            aria-label={header.navAriaLabel}
            className="ml-auto hidden items-center gap-[34px] lg:flex"
          >
            {/*
              Locale-absolute, not a bare `#section` fragment. The header also
              renders on the legal pages, where none of these section ids
              exist — a bare fragment there resolves against the current
              document and simply does nothing, stranding the visitor. With
              the locale prefix the link navigates home and then scrolls,
              which is identical behaviour on the homepage itself.
            */}
            {nav.map((item) => (
              <Link
                key={item.id}
                href={`/${locale}#${item.id}`}
                className="text-[12.5px] font-normal tracking-[0.14em] text-raymar-white uppercase transition-colors duration-[450ms] group-data-[solid=true]/header:text-raymar-green hover:!text-raymar-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LanguageSwitch
            current={locale}
            pendingLabel={header.localePending}
            className="hidden lg:flex"
          />

          <Link
            href={`/${locale}#teklif`}
            className="hidden flex-none items-center gap-2.5 rounded-none bg-raymar-gold px-7 py-[15px] text-xs font-normal tracking-[0.18em] text-raymar-green-deep uppercase transition-colors duration-300 group-data-[solid=true]/header:bg-raymar-green group-data-[solid=true]/header:text-raymar-white lg:inline-flex"
          >
            {header.cta}
            <ChevronTrail />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={header.openMenu}
            aria-expanded={menuOpen}
            className="ml-auto flex h-12 w-12 flex-none items-center justify-center rounded-none border border-raymar-white/28 bg-transparent group-data-[solid=true]/header:border-raymar-green/24 lg:hidden"
          >
            <span
              aria-hidden="true"
              className="relative block h-px w-5 bg-current text-raymar-white transition-colors duration-[450ms] group-data-[solid=true]/header:text-raymar-green before:absolute before:-top-1.5 before:left-0 before:h-px before:w-5 before:bg-current before:content-[''] after:absolute after:top-1.5 after:left-0 after:h-px after:w-5 after:bg-current after:content-['']"
            />
          </button>
        </div>
      </header>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        nav={nav}
        header={header}
      />
    </>
  )
}
