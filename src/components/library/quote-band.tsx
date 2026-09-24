import { ButtonLink } from '@/components/ui/button'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import type { Locale } from '@/lib/i18n'
import type { LibraryContent } from '@/types/content'

/**
 * Closing call to action on every library page.
 *
 * Cream rather than green: the footer that follows is green, and two green
 * blocks in a row read as one oversized footer with the button lost inside it.
 * It links to the form on the homepage rather than repeating the form here —
 * one form means one place where consent, validation and delivery are handled.
 */
export function QuoteBand({
  locale,
  content,
}: {
  locale: Locale
  content: LibraryContent['quoteBand']
}) {
  return (
    <section className="bg-raymar-cream">
      <div className="shell flex flex-col gap-9 py-16 md:flex-row md:items-end md:justify-between md:gap-14 md:py-22">
        <div className="max-w-[640px]">
          <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>
          <h2 className="mt-6 text-[clamp(30px,3.4vw,48px)] leading-[1.08] tracking-[-0.01em] text-raymar-green">
            {content.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.7] font-light text-raymar-ink/84">
            {content.body}
          </p>
        </div>
        <ButtonLink
          href={`/${locale}#teklif`}
          variant="green"
          withIcon
          className="flex-none self-start md:self-auto"
        >
          {content.cta}
        </ButtonLink>
      </div>
    </section>
  )
}
