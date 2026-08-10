import type { Dictionary } from '@/types/content'
import { tr } from './tr'

/**
 * English locale — NOT YET APPROVED.
 *
 * No English corporate copy has been supplied by Raymar. Translating the
 * approved Turkish copy automatically would fabricate commercial wording for a
 * B2B trading company, so this module deliberately re-exports the Turkish
 * dictionary unchanged rather than inventing text.
 *
 * Because `'en'` is absent from `completeLocales` in `src/lib/i18n.ts`, this
 * dictionary is never rendered: `/en` is not generated and the header's EN
 * control is shown in its inactive state. It exists so the route, metadata and
 * component layers are already locale-driven.
 *
 * TO PUBLISH ENGLISH:
 *   1. Replace the spread below with approved English strings (the `Dictionary`
 *      type enumerates every field that needs one).
 *   2. Add `'en'` to `completeLocales` in `src/lib/i18n.ts`.
 * No component changes are required.
 */
export const englishCopyApproved = false

export const en: Dictionary = {
  ...tr,
}
