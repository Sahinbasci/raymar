interface ContactMapProps {
  /** Small caption above the frame, styled like the address/phone labels beside it. */
  label: string
  /** Accessible name for the `<iframe>` — required, since an iframe has no text content of its own. */
  title: string
  /** A `maps.google.com/…&output=embed` URL — the keyless embed form, no API key required. */
  embedSrc: string
}

/**
 * Google Maps embed for the contact section.
 *
 * Loads on first paint, not gated behind a click — a deliberate choice, and
 * the reason `docs/legal` (Çerez Politikası, Gizlilik Politikası) discloses
 * Google as an active third party rather than a merely hypothetical one:
 * this iframe requests Google's servers unconditionally, and Google may set
 * its own cookies as a result. `loading="lazy"` still applies, so the browser
 * defers the actual request until the frame nears the viewport — a real
 * network saving on a visitor who never scrolls this far, without changing
 * *whether* it eventually loads unprompted.
 *
 * The desaturated resting state is a design choice, not a technical
 * necessity: Google's tile colours sit outside the brand palette, and a
 * grayscale filter that lifts on hover reads as restrained rather than as a
 * stock widget dropped into the page. `no-referrer-when-downgrade` is the
 * browser default for a plain `<iframe>` in this position — set explicitly so
 * the choice is visible rather than implicit.
 */
export function ContactMap({ label, title, embedSrc }: ContactMapProps) {
  return (
    <div>
      <div className="text-xs font-normal tracking-[0.24em] text-raymar-ink/78 uppercase">
        {label}
      </div>
      <div className="mt-2.25 aspect-[4/3] w-full overflow-hidden border border-raymar-green/16 bg-raymar-tan md:aspect-video">
        <iframe
          src={embedSrc}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale-[38%] transition-[filter] duration-500 ease-out hover:grayscale-0"
        />
      </div>
    </div>
  )
}
