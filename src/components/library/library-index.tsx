import { JsonLd } from '@/components/seo/json-ld'
import { SectionEyebrow } from '@/components/ui/eyebrow'
import { guidePages, topLevelProductPages } from '@/content/library'
import type { LibraryKind } from '@/content/library/types'
import { getDictionary } from '@/content'
import { formatTemplate } from '@/lib/cn'
import type { Locale } from '@/lib/i18n'
import {
  formatLibraryDate,
  guidePath,
  indexAlternates,
  productPath,
  readingMinutes,
} from '@/lib/library'
import { libraryCrumbs, libraryIndexGraph } from '@/lib/schema'
import { Breadcrumbs } from './breadcrumbs'
import { LibraryCard } from './library-card'
import { LibraryFrame } from './library-frame'
import { QuoteBand } from './quote-band'

/**
 * The products index or the guides index: a heading, a short introduction and
 * one card per page. The cards are the internal links that make every page in
 * the section two clicks from anywhere on the site.
 */
export function LibraryIndex({ locale, kind }: { locale: Locale; kind: LibraryKind }) {
  const dictionary = getDictionary(locale)
  const { library } = dictionary
  const content = library[kind]

  const cards =
    kind === 'products'
      ? topLevelProductPages(locale).map((page) => ({
          key: page.id,
          href: productPath(locale, page.id),
          title: page.name,
          excerpt: page.metaDescription,
          image: page.image,
          imageAlt: page.imageAlt,
          cta: library.productCardCta,
          meta: undefined,
        }))
      : guidePages(locale).map((page) => ({
          key: page.id,
          href: guidePath(locale, page.id),
          // The heading, not the meta title: the card is the link a reader
          // clicks, and landing on a page whose `<h1>` says something else
          // reads as having arrived somewhere unintended.
          title: page.heading,
          excerpt: page.metaDescription,
          image: page.image,
          imageAlt: page.imageAlt,
          cta: library.guideCardCta,
          meta: `${formatLibraryDate(locale, page.updated)} · ${formatTemplate(
            library.readingTimeTemplate,
            { minutes: String(readingMinutes(locale, page)) },
          )}`,
        }))

  return (
    <LibraryFrame locale={locale} alternates={indexAlternates(kind)}>
      <JsonLd graph={libraryIndexGraph({ locale, dictionary, kind })} />

      <div className="shell">
        <Breadcrumbs
          label={library.breadcrumbAriaLabel}
          items={libraryCrumbs(locale, dictionary, kind)}
        />

        <div className="mt-8 md:mt-10">
          <SectionEyebrow tone="dark">{content.eyebrow}</SectionEyebrow>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(36px,4.6vw,64px)] leading-[1.04] tracking-[-0.012em] text-raymar-green">
            {content.heading}
          </h1>
          <p className="mt-6 max-w-[64ch] text-[17px] leading-[1.78] font-light text-raymar-ink/88 md:text-[18px]">
            {content.intro}
          </p>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 pb-22 md:mt-18 md:grid-cols-2 md:pb-28 lg:grid-cols-3 lg:gap-x-10">
          {cards.map(({ key, ...card }) => (
            <li key={key}>
              <LibraryCard {...card} />
            </li>
          ))}
        </ul>
      </div>

      <QuoteBand locale={locale} content={library.quoteBand} />
    </LibraryFrame>
  )
}
