import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LegalPage } from '@/components/sections/legal-page'
import { getDictionary } from '@/content'
import { isLocale } from '@/lib/i18n'
import { legalSlugs } from '@/lib/legal'

/** Folder name must equal `legalSlugs.cerez`; asserted in tests/e2e/legal.spec.ts. */

interface PageParams {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { legal } = getDictionary(locale)

  return {
    title: legal.cerez.metaTitle,
    description: legal.cerez.metaDescription,
    alternates: { canonical: `/${locale}/${legalSlugs.cerez}` },
  }
}

export default async function CerezPage({ params }: PageParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return <LegalPage locale={locale} content={getDictionary(locale).legal.cerez} />
}
