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
export function SiteHeader({ locale, nav, header }: SiteHeaderProps) {
  const solid = useScrollThreshold(48)
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
        <div className="shell flex h-18 items-center gap-4 transition-[height] duration-[350ms] ease-out group-data-[solid=true]/header:h-16 md:h-22 md:gap-7 md:group-data-[solid=true]/header:h-19">
          <Link
            href={`/${locale}#ust`}
            aria-label={header.homeAriaLabel}
            className="relative block h-10 w-[108px] flex-none"
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
                priority
                className="absolute top-0 left-0 opacity-0 transition-opacity duration-[400ms] group-data-[solid=true]/header:opacity-100"
              />
            </span>
          </Link>

          <nav
            aria-label={header.navAriaLabel}
            className="ml-auto hidden items-center gap-[34px] lg:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.id}
                href={`#${item.id}`}
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
            href="#teklif"
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
        nav={nav}
        header={header}
      />
    </>
  )
}
