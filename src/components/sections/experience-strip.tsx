import { Reveal } from '@/components/motion/reveal'
import { MarkExperience, MarkNetwork, MarkPartnership } from '@/components/ui/icons'
import type { ExperienceItem, ExperienceMark } from '@/types/content'

const marks: Record<
  ExperienceMark,
  (props: { className?: string }) => React.ReactElement
> = {
  experience: MarkExperience,
  network: MarkNetwork,
  partnership: MarkPartnership,
}

/**
 * Three-column band of trading credentials between the statement and the
 * corporate intro. Cells are separated by gold hairlines only — no card beds,
 * no boxes. Column geometry and rule placement live in `.strip` (globals.css)
 * because they depend on `nth-child` position.
 *
 * Each cell is headed by a gold credential mark. The approved design's band was
 * typographic only; the marks were added so the row does the job a B2B visitor
 * actually scans for — how long, how far, what focus, what model — at a glance
 * rather than as four more lines of prose. They are decorative: the label and
 * value carry every bit of the meaning, so the marks stay out of the
 * accessibility tree.
 *
 * Cell content is centre-aligned so the four credentials read as a balanced
 * row rather than a left-hung column.
 */
export function ExperienceStrip({ items }: { items: readonly ExperienceItem[] }) {
  return (
    <section className="border-b border-raymar-green/9 bg-raymar-ivory">
      <div className="shell">
        <div className="strip">
          {items.map((item, index) => {
            const Mark = marks[item.mark]
            return (
              <Reveal key={item.label} delay={index * 90} className="text-center">
                <span className="mx-auto flex h-13.5 w-13.5 items-center justify-center text-raymar-gold-dark">
                  <Mark />
                </span>
                <div className="mt-6 text-xs font-normal tracking-[0.28em] text-raymar-ink/78 uppercase">
                  {item.label}
                </div>
                {/* Clamped rather than fixed at 54px: one credential is a
                    three-word phrase and the others are two characters, so a
                    single size either broke the long one or starved the short
                    ones. `text-balance` keeps the wrap even.

                    The two-line minimum height is what keeps the three captions
                    on one baseline — without it the wrapping cell pushed its
                    own caption a line lower than its neighbours'. Single-line
                    values centre inside the reserved space. */}
                <div className="mt-4 flex min-h-[2.12em] items-center justify-center font-[family-name:var(--font-display)] text-[clamp(34px,3.5vw,52px)] leading-[1.06] font-light tracking-[-0.015em] text-balance text-raymar-green">
                  {item.value}
                </div>
                <div className="mx-auto mt-4.5 max-w-[220px] text-[13.5px] leading-[1.6] font-light text-raymar-ink/80">
                  {item.caption}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
