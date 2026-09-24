import Link from 'next/link'

export interface BreadcrumbItem {
  readonly name: string
  readonly path: string
}

/**
 * Visible trail for the library pages, built from the same `libraryCrumbs`
 * list the `BreadcrumbList` markup is, so the two cannot disagree.
 *
 * The last item is the page itself, marked `aria-current` and not linked. The
 * links carry vertical padding on top of the 12px type: WCAG 2.2's 24px target
 * minimum applies to a breadcrumb, which is a row of standalone controls rather
 * than links inside a sentence.
 */
export function Breadcrumbs({
  label,
  items,
}: {
  label: string
  items: readonly BreadcrumbItem[]
}) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-x-2.5 text-xs font-normal tracking-[0.14em] uppercase">
        {items.map((item, index) => {
          const current = index === items.length - 1
          return (
            <li key={item.path} className="flex min-w-0 items-center gap-2.5">
              {index > 0 ? (
                <span aria-hidden="true" className="text-raymar-gold-dark">
                  /
                </span>
              ) : null}
              {current ? (
                <span aria-current="page" className="py-1.5 text-raymar-ink/72">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="inline-block py-1.5 text-raymar-green transition-colors duration-300 hover:text-raymar-gold-dark"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
