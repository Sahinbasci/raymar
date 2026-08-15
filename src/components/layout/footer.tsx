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
            className="text-[14.5px] font-light text-raymar-white/90 transition-colors duration-300 hover:text-raymar-gold max-[719px]:py-1"
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

      {/*
        Closing band, as a backdrop rather than a strip.

        It used to sit below the content as its own block along the very bottom
        edge, which read as a strip pasted on the end. Now it rises out of the
        bottom of the footer and reaches up to roughly the slogan, with the
        copyright row sitting over it.

        The top edge is a curve, not a rule.

        A radial mask hides an ellipse through the middle, so the product climbs
        at the left and right edges and dips deeply in the centre. The radii
        matter: in CSS these are radii, not diameters, so a horizontal radius
        above ~96% would reach past both edges and flatten the whole thing back
        into a straight line — which is exactly what a first attempt at 115% did.
        The edges fall outside the ellipse and lift immediately, while the
        centre stays clear until past halfway.

        That clear centre is also what keeps the slogan and the copyright
        readable, so the curve is doing two jobs at once.

        `-webkit-mask-image` is repeated for Safari, which still needs the prefix.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(280px,56%,680px)] overflow-hidden"
      >
        {/* Two masks intersected. The radial one carves the parabola; the
            linear one fades the very top so the curve does not collide with the
            container edge and leave a hard diagonal corner at each side, which
            is what a single radial mask produced. */}
        <div className="absolute inset-0 [mask-image:radial-gradient(78%_108%_at_50%_-6%,transparent_40%,#000_96%),linear-gradient(to_bottom,transparent_0%,#000_20%)] [mask-composite:intersect] [-webkit-mask-composite:source-in] [-webkit-mask-image:radial-gradient(78%_108%_at_50%_-6%,transparent_40%,#000_96%),linear-gradient(to_bottom,transparent_0%,#000_20%)]">
          <MediaFrame image={footerBand} alt="" sizes="100vw" />
          {/* The veil is shaped around the copyright row rather than laid evenly
              over the band: light everywhere so the crop shows through, with a
              narrow peak at 58-70% — exactly the strip that row occupies.

              Measured against rendered pixels rather than guessed. On the
              brightest pistachio highlights the small print sat at 3.48:1,
              under the 4.5:1 that 12.5px text needs; the peak plus full-opacity
              white takes it to 5.34:1 without dimming the rest of the band. */}
          <span className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_76_56/0.42)_0%,rgb(0_76_56/0.5)_38%,rgb(0_76_56/0.68)_58%,rgb(0_76_56/0.7)_70%,rgb(0_76_56/0.3)_82%,rgb(0_76_56/0.08)_92%,rgb(0_76_56/0.02)_100%)]" />
        </div>
      </div>

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
          <p className="m-0 text-center font-[family-name:var(--font-display-italic)] text-[26px] leading-[1.25] font-light tracking-[0.005em] text-raymar-gold italic md:text-[34px]">
            {content.tagline}
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-raymar-gold/28" />
        </div>

        {/* The deep bottom padding is the clear strip the walnuts occupy: the
            copyright row is the last thing set over the band, and everything
            below it is left to the photograph. */}
        <div className="mt-13 flex flex-wrap items-center justify-between gap-5 border-t border-raymar-gold/24 pt-6.5 pb-28 md:pb-36">
          <span className="text-[12.5px] font-light text-raymar-white">
            {content.copyright}
          </span>
          <div className="flex flex-wrap items-center gap-6.5">
            {content.legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12.5px] font-light text-raymar-white transition-colors duration-300 hover:text-raymar-gold max-[719px]:py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
