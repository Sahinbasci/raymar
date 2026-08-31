import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/sections/legal-page'
import { getDictionary } from '@/content'
import { isLocale } from '@/lib/i18n'
import { legalAlternates } from '@/lib/legal'

/**
 * The folder name must equal `legalSlugs.kvkk` — `tests/e2e/legal.spec.ts`
 * asserts that every slug in that map resolves to a 200, so the two cannot
 * drift apart silently.
 */

interface PageParams {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { legal } = getDictionary(locale)

  return {
    title: legal.kvkk.metaTitle,
    description: legal.kvkk.metaDescription,
    alternates: legalAlternates(locale, 'kvkk'),
  }
}

export default async function KvkkPage({ params }: PageParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <LegalPage
      locale={locale}
      content={getDictionary(locale).legal.kvkk}
      slugKey="kvkk"
    />
  )
}
