/**
 * Where the reader is on a page, in terms that survive a translation.
 *
 * A pixel offset does not: the English copy wraps differently from the Turkish,
 * so 5490px down one is a different paragraph of the other. What does survive
 * is the structure. Both locales render the same components from content that
 * is translated item for item — the same sections, in the same order, with the
 * same paragraphs, list items and cards inside them — so "the fourth paragraph
 * of the sixth section, a third of the way down it" names the same place in
 * either language. Where a section is not built the same in both (the FAQs are
 * written for each language's own questions), the place falls back to the same
 * fraction of that section.
 *
 * Measured before this existed: switching language from inside a section threw
 * the reader back to that section's start — up to 2700px on a phone — and on
 * the product pages, guides and legal notices, whose anchors are translated,
 * all the way back to the top.
 *
 * Positions are layout positions (`offsetTop`), not screen positions. Much of
 * this page moves under transforms — scroll-linked parallax on photographs,
 * entrance reveals — so where an element is painted depends on the moment it
 * is measured; where it is laid out does not. And the scroll offset is read
 * from `document.body`, because the switch in the mobile menu is clicked while
 * the drawer's scroll lock holds the body at `position: fixed`: the window
 * then reports 0 and a page no taller than the screen, while the body still
 * sits exactly where the reader left it.
 */

/** Containers, outermost to innermost as they appear in the document. */
const REGIONS = 'main section, footer'
/** Units of text and imagery inside a region. */
const BLOCKS =
  'h1, h2, h3, h4, p, li, dt, dd, blockquote, figure, picture, img, form, table'
/** The reader's line: a third of the way down the screen, below the fixed header. */
const READING_LINE = 0.3
/** Pixels of slack at either end of the page. */
const EDGE = 2

interface Box {
  readonly top: number
  readonly height: number
}

export type ReadingPosition =
  | { readonly at: 'top' }
  | { readonly at: 'bottom' }
  | {
      readonly at: 'inside'
      /** Offset of the reading line from the top of the viewport, in px. */
      readonly line: number
      /** Fraction of the page scrolled — the fallback when the structure differs. */
      readonly page: number
      readonly region: number
      readonly regions: number
      /** Fraction of the region above the reading line. */
      readonly regionRatio: number
      /** `-1` when the line is above the region's first block. */
      readonly block: number
      readonly blocks: number
      /** Fraction of the block above the reading line. */
      readonly blockRatio: number
      /** Pixels between the block's end and the line, when the line is past it. */
      readonly beyond: number
    }

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function scrollState() {
  const body = document.body.getBoundingClientRect()
  return {
    scrollY: -body.top,
    maxScroll: Math.max(0, body.height - window.innerHeight),
  }
}

/** Where `element` is laid out in the document, ignoring any transform. */
function box(element: HTMLElement): Box {
  let top = 0
  let node: HTMLElement | null = element
  while (node) {
    top += node.offsetTop
    node = node.offsetParent instanceof HTMLElement ? node.offsetParent : null
  }
  return { top, height: element.offsetHeight }
}

/** The innermost region spanning `line` (document px), or `-1`. */
function regionAt(regions: readonly HTMLElement[], line: number): number {
  let index = -1
  regions.forEach((region, i) => {
    const { top, height } = box(region)
    if (top <= line && top + height > line) index = i
  })
  return index
}

/**
 * Decoration is not a place to return to, and some of it is only drawn on some
 * screens once the page has hydrated — the motif in #ticaret appears on
 * desktop after the first render — so counting it would make the two
 * languages' structures disagree at exactly the moment the position is put
 * back.
 */
function decorative(element: HTMLElement): boolean {
  return (
    element.closest('[aria-hidden="true"]') !== null ||
    (element instanceof HTMLImageElement && element.alt === '')
  )
}

function blocksOf(region: HTMLElement): HTMLElement[] {
  return [...region.querySelectorAll<HTMLElement>(BLOCKS)].filter(
    (block) => !decorative(block),
  )
}

/** The block the line runs through: the nearest one starting above it. */
function blockAt(blocks: readonly HTMLElement[], line: number): number {
  let index = -1
  let nearest = -Infinity
  blocks.forEach((block, i) => {
    const { top, height } = box(block)
    if (height > 0 && top <= line && top >= nearest) {
      nearest = top
      index = i
    }
  })
  return index
}

export function captureReadingPosition(): ReadingPosition {
  const { scrollY, maxScroll } = scrollState()
  if (scrollY <= EDGE) return { at: 'top' }
  if (maxScroll > 0 && scrollY >= maxScroll - EDGE) return { at: 'bottom' }

  const line = Math.round(window.innerHeight * READING_LINE)
  const at = scrollY + line
  const regions = [...document.querySelectorAll<HTMLElement>(REGIONS)]
  const region = regionAt(regions, at)
  const page = maxScroll > 0 ? scrollY / maxScroll : 0
  const container = regions[region]

  if (!container) {
    return {
      at: 'inside',
      line,
      page,
      region: -1,
      regions: regions.length,
      regionRatio: 0,
      block: -1,
      blocks: 0,
      blockRatio: 0,
      beyond: 0,
    }
  }

  const area = box(container)
  const blocks = blocksOf(container)
  const block = blockAt(blocks, at)
  const unit = block === -1 ? undefined : box(blocks[block] as HTMLElement)

  return {
    at: 'inside',
    line,
    page,
    region,
    regions: regions.length,
    regionRatio: area.height > 0 ? clamp((at - area.top) / area.height, 0, 1) : 0,
    block,
    blocks: blocks.length,
    blockRatio: unit && unit.height > 0 ? clamp((at - unit.top) / unit.height, 0, 1) : 0,
    beyond: unit ? Math.max(0, at - unit.top - unit.height) : 0,
  }
}

/** Where `position` falls on the current page, as a `scrollY`. */
function targetFor(position: ReadingPosition): number {
  const { maxScroll } = scrollState()
  if (position.at === 'top') return 0
  if (position.at === 'bottom') return maxScroll

  const regions = [...document.querySelectorAll<HTMLElement>(REGIONS)]
  const region = position.region === -1 ? undefined : regions[position.region]
  if (!region || regions.length !== position.regions) {
    return position.page * maxScroll
  }

  const blocks = blocksOf(region)
  const block = position.block === -1 ? undefined : blocks[position.block]
  if (block && blocks.length === position.blocks) {
    const unit = box(block)
    return unit.top + position.blockRatio * unit.height + position.beyond - position.line
  }
  const area = box(region)
  return area.top + position.regionRatio * area.height - position.line
}

export function restoreReadingPosition(position: ReadingPosition): void {
  const { maxScroll } = scrollState()
  window.scrollTo({
    top: Math.round(clamp(targetFor(position), 0, maxScroll)),
    behavior: 'instant',
  })
}

/*
 * Carried across one client-side navigation. A module variable is enough: the
 * switch is a same-document navigation, so this module outlives the page that
 * set it, and a full load starts clean.
 *
 * Addressed to the page it was taken for, so a switch that never arrives — a
 * second click on something else before the translation loaded — cannot leave
 * a stale position behind for whichever page mounts next.
 */
let carried: { readonly position: ReadingPosition; readonly for: string } | null = null

function normalise(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function carryReadingPosition(position: ReadingPosition, to: string): void {
  carried = { position, for: normalise(to) }
}

/** The position carried to `pathname`, once. */
export function takeReadingPosition(pathname: string): ReadingPosition | null {
  const parcel = carried
  if (!parcel || parcel.for !== normalise(pathname)) return null
  carried = null
  return parcel.position
}
