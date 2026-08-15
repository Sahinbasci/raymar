import { BrandEmblem } from '@/components/media/brand-logo'

/**
 * Stands in for a product photograph that does not exist yet.
 *
 * Used where shipping a substitute would misrepresent the goods — a walnut
 * grade whose defining feature is its colour, say, illustrated by a kernel of
 * the wrong colour. On a trading site that is a worse failure than an empty
 * frame, so the card holds its own tan bed and says plainly that the picture is
 * coming.
 *
 * Fills its positioned parent, exactly as `MediaFrame` does, so the two are
 * interchangeable inside a card's media well.
 */
export function PendingMedia({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3.5 bg-raymar-tan px-4">
      <BrandEmblem width={26} className="opacity-45" />
      {/* `/60` measured 2.99:1 on this tan bed, under the 4.5:1 WCAG 1.4.3
          needs for text. `/85` clears it at 5.13:1 while staying visually
          recessive next to the emblem above. */}
      <span className="text-center text-[11.5px] font-normal tracking-[0.2em] text-raymar-green/85 uppercase">
        {label}
      </span>
    </div>
  )
}
