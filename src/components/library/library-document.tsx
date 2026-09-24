import Link from 'next/link'
import { MediaFrame } from '@/components/media/media-frame'
import { JsonLd } from '@/components/seo/json-ld'
import { ButtonLink } from '@/components/ui/button'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import { ArrowShort } from '@/components/ui/icons'
import { guidePages, productPages, subPages } from '@/content/library'
import { getDictionary } from '@/content'
import { formatTemplate } from '@/lib/cn'
import type { Locale } from '@/lib/i18n'
import {
  entryAlternates,
  formatLibraryDate,
  guidePath,
  productPath,
  readingMinutes,
  type LibraryEntry,
} from '@/lib/library'
import { libraryCrumbs, libraryPageGraph } from '@/lib/schema'
import { Breadcrumbs } from './breadcrumbs'
import { LibraryCard } from './library-card'
import { LibraryFrame } from './library-frame'
import { QuoteBand } from './quote-band'

const BODY = 'text-[17px] leading-[1.78] font-light text-raymar-ink/88'
const SECTION_HEADING =
  'scroll-mt-16 text-[27px] leading-[1.18] font-normal tracking-[-0.005em] text-raymar-green md:text-[32px]'

interface LinkGroup {
  readonly heading: string
  readonly links: readonly { readonly href: string; readonly label: string }[]
}

/**
 * The pages a reader of this one is most likely to want next: for a walnut
 * size, the other sizes; for a product, the guides about it; for a guide, the
 * products it discusses.
 */
function relatedGroups(locale: Locale, entry: LibraryEntry): LinkGroup[] {
  const { library } = getDictionary(locale)

  if (entry.kind === 'guides') {
    return [
      {
        heading: library.relatedProductsHeading,
        links: entry.page.relatedProducts.flatMap((id) => {
          const product = productPages(locale).find((candidate) => candidate.id === id)
          return product ? [{ href: productPath(locale, id), label: product.name }] : []
        }),
      },
    ]
  }

  const groups: LinkGroup[] = []
  const { parent: parentId } = entry.page
  const parent = parentId
    ? productPages(locale).find((candidate) => candidate.id === parentId)
    : undefined
  if (parent) {
    groups.push({
      heading: parent.childrenHeading ?? parent.name,
      links: subPages(locale, parent.id)
        .filter((sibling) => sibling.id !== entry.page.id)
        .map((sibling) => ({
          href: productPath(locale, sibling.id),
          label: sibling.name,
        })),
    })
  }
  groups.push({
    heading: library.relatedGuidesHeading,
    links: entry.page.relatedGuides.flatMap((id) => {
      const guide = guidePages(locale).find((candidate) => candidate.id === id)
      return guide ? [{ href: guidePath(locale, id), label: guide.heading }] : []
    }),
  })
  return groups
}

/**
 * A product page or a guide.
 *
 * One layout for both, because they are the same kind of document — a heading,
 * a lead, headed sections and the questions people ask — and differ only in
 * the line under the lead: a guide states when it was written and how long it
 * takes to read, a product page offers the quotation straight away. A product
 * with sub-pages (walnut, with its four sizes) lists them as cards before the
 * body, since they are what most readers of that page came to choose between.
 *
 * The body sits in a 68ch column, the measure the legal pages use for the same
 * reason. On wide screens the related pages sit beside it and stay in view; on
 * narrow ones they follow the questions, where a reader who has finished the
 * page is looking for somewhere to go next.
 *
 * Everything the markup asserts is rendered from the same objects: the
 * questions in `FAQPage` are these questions, and the trail in
 * `BreadcrumbList` is this trail.
 */
export function LibraryDocument({
  locale,
  entry,
}: {
  locale: Locale
  entry: LibraryEntry
}) {
  const dictionary = getDictionary(locale)
  const { library } = dictionary
  const { page } = entry

  const children = entry.kind === 'products' ? subPages(locale, entry.page.id) : []
  const groups = relatedGroups(locale, entry).filter((group) => group.links.length > 0)

  return (
    <LibraryFrame locale={locale} alternates={entryAlternates(entry)}>
      <JsonLd graph={libraryPageGraph({ locale, dictionary, entry })} />

      <div className="shell">
        <Breadcrumbs
          label={library.breadcrumbAriaLabel}
          items={libraryCrumbs(locale, dictionary, entry.kind, entry)}
        />
      </div>

      <article>
        <div className="shell mt-8 grid items-center gap-10 md:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <SectionEyebrow tone="dark">{page.eyebrow}</SectionEyebrow>
            <h1 className="mt-5 text-[clamp(34px,4.3vw,58px)] leading-[1.06] tracking-[-0.012em] text-raymar-green">
              {page.heading}
            </h1>
            <p className={`mt-6 max-w-[62ch] ${BODY} md:text-[18px]`}>{page.lead}</p>

            {entry.kind === 'guides' ? (
              <p className="mt-7 flex flex-wrap gap-x-5 gap-y-1 text-xs font-normal tracking-[0.14em] text-raymar-ink/72 uppercase">
                <span>
                  {library.publishedLabel}:{' '}
                  <time dateTime={entry.page.published}>
                    {formatLibraryDate(locale, entry.page.published)}
                  </time>
                </span>
                {entry.page.updated !== entry.page.published ? (
                  <span>
                    {library.updatedLabel}:{' '}
                    <time dateTime={entry.page.updated}>
                      {formatLibraryDate(locale, entry.page.updated)}
                    </time>
                  </span>
                ) : null}
                <span>
                  {formatTemplate(library.readingTimeTemplate, {
                    minutes: String(readingMinutes(locale, entry.page)),
                  })}
                </span>
              </p>
            ) : (
              <ButtonLink
                href={`/${locale}#teklif`}
                variant="green"
                withIcon
                className="mt-8"
              >
                {library.quoteBand.cta}
              </ButtonLink>
            )}
          </div>

          {/* Loaded eagerly: at the top of the document this photograph is
              the largest element in the first viewport at every width, so it
              is the LCP candidate. */}
          <div className="relative aspect-[4/3] overflow-hidden bg-raymar-tan">
            <MediaFrame
              image={page.image}
              alt={page.imageAlt}
              sizes="(min-width: 1080px) 46vw, 100vw"
              priority
            />
          </div>
        </div>

        {entry.kind === 'products' && children.length > 0 ? (
          <section className="shell mt-16 md:mt-20">
            <h2 id="sub-pages" className={SECTION_HEADING}>
              {entry.page.childrenHeading ?? entry.page.name}
            </h2>
            <ul className="mt-8 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
              {children.map((child) => (
                <li key={child.id}>
                  <LibraryCard
                    href={productPath(locale, child.id)}
                    title={child.name}
                    image={child.image}
                    imageAlt={child.imageAlt}
                    cta={library.productCardCta}
                    headingLevel="h3"
                    sizes="(min-width: 1080px) 23vw, (min-width: 720px) 46vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="shell mt-16 grid gap-14 pb-22 md:mt-20 md:pb-28 lg:grid-cols-[minmax(0,68ch)_minmax(0,1fr)] lg:gap-20">
          <div>
            {page.sections.map((section) => (
              <section key={section.heading} className="mt-14 first:mt-0">
                <h2 id={section.id} className={SECTION_HEADING}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={`mt-5 ${BODY}`}>
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-5 flex flex-col gap-3">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className={`relative pl-6 ${BODY} before:absolute before:top-[0.74em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full before:bg-raymar-gold before:content-['']`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {page.faq.length > 0 ? (
              <section className="mt-18 border-t border-raymar-green/12 pt-12">
                <h2 id="faq" className={SECTION_HEADING}>
                  {library.faqHeading}
                </h2>
                {/* Open rather than collapsed behind `<details>`: each answer
                    is short, and it is what a searcher came for. Questions
                    are headings so a screen-reader user can move between
                    them the way a sighted reader scans. */}
                <div className="mt-8">
                  {page.faq.map((item) => (
                    <div
                      key={item.question}
                      className="border-b border-raymar-green/12 py-7 first:pt-0 last:border-b-0"
                    >
                      <h3 className="text-[23px] leading-[1.3] font-normal text-raymar-green md:text-[25px]">
                        {item.question}
                      </h3>
                      <p className={`mt-3 ${BODY}`}>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/*
              References, last in the reading order where a reader who wants
              to check a statement looks for them. Plain links in the same tab:
              the list is for verifying, and Back returns to this place.
            */}
            {page.sources.length > 0 ? (
              <section className="mt-18 border-t border-raymar-green/12 pt-12">
                <h2 id="sources" className={SECTION_HEADING}>
                  {library.sourcesHeading}
                </h2>
                <p className="mt-5 text-[15px] leading-[1.7] font-light text-raymar-ink/80">
                  {library.sourcesNote}
                </p>
                <ol className="mt-6 flex list-decimal flex-col gap-3 pl-6 text-[15px] leading-[1.65] font-light text-raymar-ink/85 marker:text-raymar-gold-dark">
                  {page.sources.map((source) => (
                    <li key={source.url} className="pl-1">
                      <a
                        href={source.url}
                        hrefLang={source.lang}
                        {...(source.lang === locale ? {} : { lang: source.lang })}
                        className="break-words text-raymar-green underline decoration-raymar-gold/55 underline-offset-4 transition-colors duration-300 hover:text-raymar-gold-dark"
                      >
                        {source.title}
                      </a>
                      <span>
                        {' '}
                        — {source.publisher}
                        {source.lang === locale
                          ? ''
                          : ` (${library.sourceLanguages[source.lang]})`}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>

          <div className="flex flex-col gap-10 self-start lg:sticky lg:top-32">
            {groups.map((group, index) => (
              <nav
                key={group.heading}
                aria-labelledby={`related-${index}`}
                className="border-t border-raymar-gold/45 pt-7"
              >
                <h2
                  id={`related-${index}`}
                  className="font-sans text-xs font-normal tracking-[0.24em] text-raymar-gold-dark uppercase"
                >
                  {group.heading}
                </h2>
                <ul className="mt-4 flex flex-col">
                  {group.links.map((link) => (
                    <li
                      key={link.href}
                      className="border-b border-raymar-green/12 last:border-b-0"
                    >
                      <Link
                        href={link.href}
                        className="group flex items-start justify-between gap-5 py-4 font-[family-name:var(--font-display)] text-[22px] leading-[1.3] font-normal text-raymar-green transition-colors duration-300 hover:text-raymar-gold-dark"
                      >
                        {link.label}
                        <span className="mt-2 inline-flex flex-none text-raymar-gold transition-transform duration-500 ease-[var(--ease-raymar)] group-hover:translate-x-[7px]">
                          <ArrowShort />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </article>

      <QuoteBand locale={locale} content={library.quoteBand} />
    </LibraryFrame>
  )
}
