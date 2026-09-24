import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/sections/legal-page'
import { getDictionary } from '@/content'
import { isLocale } from '@/lib/i18n'
import { legalMetadata } from '@/lib/metadata'

/** Folder name must equal `legalSlugs.cerez`; asserted in tests/e2e/legal.spec.ts. */

interface PageParams {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  return legalMetadata(locale, 'cerez')
}

export default async function CerezPage({ params }: PageParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <LegalPage
      locale={locale}
      content={getDictionary(locale).legal.cerez}
      slugKey="cerez"
    />
  )
}
