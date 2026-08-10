import Link from 'next/link'
import { BrandLogo } from '@/components/media/brand-logo'
import { MediaFrame } from '@/components/media/media-frame'
import { brandAssets, footerBand } from '@/data/products'
import { localeLabels } from '@/lib/i18n'
import type { FooterColumn, FooterContent } from '@/types/content'

function LinkColumn({ column }: { column: FooterColumn }) {
  return (
    <div>
      <div className="text-xs font-normal tracking-[0.24em] text-raymar-white/74 uppercase">
        {column.heading}
      </div>
      <div className="mt-5.5 flex flex-col gap-3.5">
        {column.links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="text-[14.5px] font-light text-raymar-white/90 transition-colors duration-300 hover:text-raymar-gold"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * Deep-green footer with the emblem set as a 7%-opacity watermark bleeding off
 * the top-right corner. The emblem is applied as a background image because it
 * is purely decorative and must stay out of the accessibility tree.
 *
 * The page closes on two deliberate gestures rather than trailing off into
 * empty green:
 *   - the brand slogan, centred between two gold hairlines. It sits in the
 *     quotation marks the identity manual requires ("her zaman tırnak içinde,
 *     italik, altın"), which the earlier left-column placement had dropped.
 *   - a full-bleed product band along the bottom edge, faded up into the green
 *     so it reads as the page resolving rather than as a pasted-on photograph.
 *     Purely decorative, so it is `aria-hidden` and carries an empty alt.
 */
export function SiteFooter({ content }: { content: FooterContent }) {
  return (
    <footer className="relative overflow-hidden bg-raymar-green">
      <div
        aria-hidden="true"
        className="absolute -top-7.5 -right-10 h-60 w-55 bg-contain bg-center bg-no-repeat opacity-7"
        style={{ backgroundImage: `url('${brandAssets.emblemGold}')` }}
      />

      <div className="relative shell">
        <div className="grid grid-cols-1 gap-10 pt-16 pb-12 md:grid-cols-2 md:gap-14 md:pt-25 md:pb-17 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo variant="white-gold" height={44} alt={content.logoAlt} />
            <p className="mt-7.5 max-w-[330px] text-[14.5px] leading-[1.75] font-light text-raymar-white/84">
              {content.blurb}
            </p>
          </div>

          <LinkColumn column={content.corporate} />
          <LinkColumn column={content.products} />

          <div>
            <div className="text-xs font-normal tracking-[0.24em] text-raymar-white/74 uppercase">
              {content.contactHeading}
            </div>
            <address className="mt-5.5 text-sm leading-[1.7] font-light text-raymar-white/78 not-italic">
              {content.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-4.5 flex flex-col gap-2 text-sm font-light text-raymar-white/76">
              <span>{content.phoneValue}</span>
              <span>{content.emailValue}</span>
            </div>
            {/* Static locale indicator, as in the design — the interactive
                switch lives in the header. Marked decorative so the language
                control is announced once, not twice. */}
            <div aria-hidden="true" className="mt-5.5 flex items-center gap-2.25">
              <span className="text-xs font-medium tracking-[0.1em] text-raymar-gold">
                {localeLabels.tr}
              </span>
              <span className="text-xs text-raymar-white/66">/</span>
              <span className="text-xs font-medium tracking-[0.1em] text-raymar-white/80">
                {localeLabels.en}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <span aria-hidden="true" className="h-px flex-1 bg-raymar-gold/28" />
          <p className="m-0 text-center font-[family-name:var(--font-display)] text-[26px] leading-[1.25] font-light tracking-[0.005em] text-raymar-gold italic md:text-[34px]">
            {content.tagline}
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-raymar-gold/28" />
        </div>

        <div className="mt-13 flex flex-wrap items-center justify-between gap-5 border-t border-raymar-gold/24 pt-6.5 pb-13 md:pb-16">
          <span className="text-[12.5px] font-light text-raymar-white/76">
            {content.copyright}
          </span>
          <div className="flex flex-wrap items-center gap-6.5">
            {content.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12.5px] font-light text-raymar-white/82 transition-colors duration-300 hover:text-raymar-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/*
        Closing band. The image is washed up into the green by a four-stop
        gradient, so the product emerges from the surface instead of sitting on
        it as a pasted strip. Sized in `vw` at the small end so a 360px phone
        does not get a band as tall as its own content block.

        Both the height and the gradient are deliberately generous: at the
        earlier 196px cap with a 0.34 floor the walnuts only surfaced in the
        last few dozen pixels and the band read as a smudge along the very
        bottom edge rather than as the page resolving into product.
      */}
      <div
        aria-hidden="true"
        className="relative h-[clamp(132px,19vw,320px)] w-full overflow-hidden"
      >
        <MediaFrame image={footerBand} alt="" sizes="100vw" />
        <span className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-raymar-green)_0%,rgb(0_76_56/0.8)_26%,rgb(0_76_56/0.44)_58%,rgb(0_76_56/0.18)_100%)]" />
      </div>
    </footer>
  )
}
