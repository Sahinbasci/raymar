import type { Dictionary } from '@/types/content'
import type { Locale } from '@/lib/i18n'
import { tr } from './tr'
import { en } from './en'

const dictionaries: Record<Locale, Dictionary> = { tr, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}

export type { Dictionary }
