'use client'

import { useState } from 'react'

interface ContactMapProps {
  /** Small caption above the frame, styled like the address/phone labels beside it. */
  label: string
  /** Accessible name for the `<iframe>` — required, since an iframe has no text content of its own. */
  title: string
  /** Button that loads the map, e.g. "Haritayı yükle". */
  loadLabel: string
  /** One line under the button: what loading it means for the visitor. */
  notice: string
  /** A `maps.google.com/…&output=embed` URL — the keyless embed form, no API key required. */
  embedSrc: string
}

/**
 * Google Maps embed for the contact section, behind a click.
 *
 * The iframe used to render unconditionally, and the legal texts disclosed
 * Google as an active third party because of it. That was honest, but it meant
 * Google could set cookies in a visitor's browser before that visitor had done
 * anything at all — and under KVKK, and under GDPR for the EU buyers this site
 * is written for, a non-essential third party belongs behind consent or behind
 * an action. The alternative to this button is a site-wide cookie banner for
 * one map.
 *
 * So nothing is requested from Google until the visitor asks: until then the
 * frame is a styled placeholder with the address already visible beside it,
 * and one press swaps in the real embed. The button says what pressing it
 * does, because a consent that does not explain itself is not one.
 *
 * The desaturated resting state of the loaded map is a design choice, not a
 * technical necessity: Google's tile colours sit outside the brand palette,
 * and a grayscale filter that lifts on hover reads as restrained rather than
 * as a stock widget dropped into the page.
 */
export function ContactMap({
  label,
  title,
  loadLabel,
  notice,
  embedSrc,
}: ContactMapProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div>
      <div className="text-xs font-normal tracking-[0.24em] text-raymar-ink/78 uppercase">
        {label}
      </div>
      <div className="mt-2.25 aspect-[4/3] w-full overflow-hidden border border-raymar-green/16 bg-raymar-tan md:aspect-video">
        {loaded ? (
          <iframe
            src={embedSrc}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale-[38%] transition-[filter] duration-500 ease-out hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-5 text-center">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex min-h-11 items-center bg-raymar-green px-6 py-3 text-xs font-medium tracking-[0.2em] text-raymar-white uppercase transition-colors duration-300 hover:bg-raymar-green-deep"
            >
              {loadLabel}
            </button>
            <p className="max-w-[34ch] text-[12.5px] leading-[1.5] font-light text-raymar-ink/72">
              {notice}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
