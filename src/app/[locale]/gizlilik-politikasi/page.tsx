import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/sections/legal-page'
import { getDictionary } from '@/content'
import { isLocale } from '@/lib/i18n'
import { legalAlternates } from '@/lib/legal'

/** Folder name must equal `legalSlugs.gizlilik`; asserted in tests/e2e/legal.spec.ts. */

interface PageParams {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { legal } = getDictionary(locale)

  return {
    title: legal.gizlilik.metaTitle,
    description: legal.gizlilik.metaDescription,
    alternates: legalAlternates(locale, 'gizlilik'),
  }
}

export default async function GizlilikPage({ params }: PageParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <LegalPage
      locale={locale}
      content={getDictionary(locale).legal.gizlilik}
      slugKey="gizlilik"
    />
  )
}
