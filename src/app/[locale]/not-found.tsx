import Link from 'next/link'
import { BrandLogo } from '@/components/media/brand-logo'
import { defaultLocale } from '@/lib/i18n'
import { getDictionary } from '@/content'

export default function NotFound() {
  const dictionary = getDictionary(defaultLocale)

  return (
    <div className="flex min-h-screen flex-col items-start justify-center bg-raymar-green">
      <div className="shell">
        <BrandLogo variant="white-gold" height={52} alt={dictionary.header.logoAlt} />
        <p className="mt-12 text-xs font-normal tracking-[0.3em] text-raymar-gold uppercase">
          404
        </p>
        <h1 className="mt-6 max-w-[720px] text-[clamp(34px,4.2vw,64px)] leading-[1.04] tracking-[-0.012em] text-raymar-white">
          Aradığınız sayfa bulunamadı.
        </h1>
        <Link
          href={`/${defaultLocale}`}
          className="mt-12 inline-flex items-center gap-3 bg-raymar-gold px-[42px] py-[21px] text-xs font-medium tracking-[0.2em] text-raymar-green-deep uppercase transition-colors duration-300 hover:bg-raymar-gold-hover"
        >
          {dictionary.nav[0]?.label ?? 'Ana Sayfa'}
        </Link>
      </div>
    </div>
  )
}
