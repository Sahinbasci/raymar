import { SiteFooter } from '@/components/layout/footer'
import { SiteHeader } from '@/components/layout/header'
import { JsonLd } from '@/components/seo/json-ld'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import { getDictionary } from '@/content'
import type { Locale } from '@/lib/i18n'
import type { LegalSlugKey } from '@/lib/legal'
import { breadcrumbGraph } from '@/lib/schema'
import type { LegalPageContent } from '@/types/content'

/**
 * Shared shell for the three legal documents.
 *
 * These pages are prose, not marketing: no reveal animations, no parallax, no
 * hero. A visitor reaching a KVKK notice wants to read it, and animating the
 * paragraph they are trying to read is hostile — so nothing here is a client
 * component beyond the header itself.
 *
 * The measure is capped at 68ch. Legal prose is the longest continuous reading
 * on the site and the only place where a full-width line would genuinely hurt
 * comprehension.
 *
 * `pt-*` clears the fixed header, which is 72–88px tall depending on breakpoint
 * and scroll state.
 */
export function LegalPage({
  locale,
  content,
  slugKey,
}: {
  locale: Locale
  content: LegalPageContent
  /** Which of the three documents this is — feeds the breadcrumb's own URL. */
  slugKey: LegalSlugKey
}) {
  const dictionary = getDictionary(locale)

  // `lastUpdated` is an ISO date in the dictionary so it stays sortable and
  // unambiguous there; readers get it in their locale's long form.
  const updated = new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(content.lastUpdated))

  return (
    <>
      <JsonLd
        graph={breadcrumbGraph({
          locale,
          dictionary,
          slugKey,
          pageName: content.heading,
        })}
      />

      {/* No hero behind the header here, so it must open in its ivory state —
          the transparent one paints white on ivory at 1.06:1. */}
      <SiteHeader
        locale={locale}
        nav={dictionary.nav}
        header={dictionary.header}
        alwaysSolid
      />

      <main className="relative overflow-x-hidden bg-raymar-ivory pt-30 pb-24 md:pt-38 md:pb-32">
        <article className="shell">
          <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>

          <h1 className="mt-5 max-w-[18ch] text-[clamp(32px,4.2vw,56px)] leading-[1.06] tracking-[-0.012em] text-raymar-green">
            {content.heading}
          </h1>

          <p className="mt-6 text-[13px] font-normal tracking-[0.14em] text-raymar-ink/70 uppercase">
            {content.lastUpdatedLabel}: {updated}
          </p>

          <div className="mt-11 max-w-[68ch]">
            {content.intro.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-5 text-[16.5px] leading-[1.75] font-light text-raymar-ink/88"
              >
                {paragraph}
              </p>
            ))}

            {content.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-[21px] leading-[1.3] font-normal tracking-[-0.005em] text-raymar-green md:text-[24px]">
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4.5 text-[16.5px] leading-[1.75] font-light text-raymar-ink/88"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-6 text-[16.5px] leading-[1.7] font-light text-raymar-ink/88 before:absolute before:top-[0.72em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-raymar-gold before:content-['']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </main>

      <SiteFooter content={dictionary.footer} locale={locale} />
    </>
  )
}
