import type { Dictionary } from '@/types/content'
import { completeLocales, type Locale } from '@/lib/i18n'
import { tr } from './tr'
import { en, englishCopyApproved } from './en'

/*
 * Publishing English is a one-character change with a site-wide blast radius,
 * so it is guarded rather than trusted.
 *
 * `en.ts` currently re-exports the Turkish dictionary verbatim — deliberately,
 * because no approved English copy exists and machine-translating a trading
 * company's commercial terms is not an option. Adding `'en'` to
 * `completeLocales` before that file is filled in would therefore publish the
 * entire Turkish site a second time under `/en`, with `<html lang="en">` and an
 * hreflang pair telling Google the two are translations of each other. That is
 * duplicate content announced as deliberate.
 *
 * This throws at module load. Every page is statically prerendered, so it fires
 * during `next build` and fails the deploy rather than shipping.
 */
if (completeLocales.includes('en') && !englishCopyApproved) {
  throw new Error(
    "'en' is listed in `completeLocales` (src/lib/i18n.ts) but " +
      '`englishCopyApproved` is still false in src/content/en.ts, which means ' +
      'that file still re-exports the Turkish dictionary. Publishing now would ' +
      'serve the Turkish site again under /en as a declared English ' +
      'translation. Fill in src/content/en.ts with approved English copy and ' +
      'set `englishCopyApproved = true`, or remove "en" from `completeLocales`.',
  )
}

const dictionaries: Record<Locale, Dictionary> = { tr, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
