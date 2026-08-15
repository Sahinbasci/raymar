/**
 * Icon set transcribed verbatim from the approved design.
 *
 * Every glyph is a bare stroked path with `stroke-linecap: square`, which is
 * what gives the design its drafted, non-rounded line quality. `currentColor`
 * replaces the design's hardcoded fills so a single icon works on both the
 * gold and the green surfaces.
 */

interface IconProps {
  className?: string
}

/** Triple chevron used inside filled gold/green buttons. */
export function ChevronTrail({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="8"
      viewBox="0 0 20 8"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M1 1l3 3-3 3M7.5 1l3 3-3 3M14 1l3 3-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  )
}

/** Long arrow used on text links and card hover affordances. */
export function ArrowLong({ className }: IconProps) {
  return (
    <svg
      width="32"
      height="8"
      viewBox="0 0 32 8"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M0 4h30M26 1l4 3-4 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  )
}

/** Compact arrow used on small cards and secondary links. */
export function ArrowShort({ className }: IconProps) {
  return (
    <svg
      width="26"
      height="8"
      viewBox="0 0 26 8"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M0 4h24M20 1l4 3-4 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
    </svg>
  )
}

/** Hero scroll cue. */
export function ChevronDown({ className }: IconProps) {
  return (
    <svg
      width="26"
      height="11"
      viewBox="0 0 26 11"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M1 1l12 8.4L25 1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   Credential marks.

   Drawn for the experience band, not transcribed from the design — the
   approved design's band was typographic only.

   Unlike the navigational glyphs above, these are deliberately heavy: a 44x44
   box, a stroke near double the hairline weight, round joins, a hairline
   containing ring and small solid accents. The first pass used the drafting
   language of the arrows and read as spindly at credential size.
   ------------------------------------------------------------------------- */

const CREDENTIAL_STROKE = 1.85

interface CredentialIconProps extends IconProps {
  /** Rendered size in px; the artwork is drawn on a 44x44 grid. */
  size?: number
}

/** Default rendered size. Large enough to carry the 1.85 stroke without the
 *  ring closing up on the glyph. */
const CREDENTIAL_SIZE = 54

/**
 * Shared chassis for the credential marks.
 *
 * Every mark sits inside a hairline ring and is drawn at nearly double the
 * stroke weight of the navigational icons above. The ring is what lets the
 * marks carry a 44px box without looking spindly, and it is drawn thinner than
 * the mark itself so the eye still reads the glyph first, not the frame.
 * Small solid accents pick up the gold as a fill rather than only as a line.
 */
function CredentialFrame({
  children,
  className,
  size = CREDENTIAL_SIZE,
}: CredentialIconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={CREDENTIAL_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="22" cy="22" r="20.6" strokeWidth="0.9" opacity="0.42" />
      {children}
    </svg>
  )
}

/** Hourglass with falling grain — years of trading experience. */
export function MarkExperience(props: CredentialIconProps) {
  return (
    <CredentialFrame {...props}>
      <path d="M14 11h16M14 33h16" />
      <path d="M16.5 11v3.4L22 22l-5.5 7.6V33M27.5 11v3.4L22 22l5.5 7.6V33" />
      <circle cx="22" cy="18.4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M18.4 31.2h7.2" strokeWidth="2.4" />
    </CredentialFrame>
  )
}

/** Meridian globe with an orbit accent — the international trade network. */
export function MarkNetwork(props: CredentialIconProps) {
  return (
    <CredentialFrame {...props}>
      <circle cx="22" cy="22" r="11.4" />
      <path d="M10.6 22h22.8M13.2 15.4h17.6M13.2 28.6h17.6" strokeWidth="1.25" />
      <ellipse cx="22" cy="22" rx="5.6" ry="11.4" strokeWidth="1.25" />
      <circle cx="30.4" cy="15.1" r="2" fill="currentColor" stroke="none" />
    </CredentialFrame>
  )
}

/** Interlocking rings with a solid overlap — corporate B2B partnership. */
export function MarkPartnership(props: CredentialIconProps) {
  return (
    <CredentialFrame {...props}>
      <circle cx="17.2" cy="22" r="8.4" />
      <circle cx="26.8" cy="22" r="8.4" />
      <path
        d="M22 15.4c1.6 1.8 2.5 4.1 2.5 6.6s-.9 4.8-2.5 6.6c-1.6-1.8-2.5-4.1-2.5-6.6s.9-4.8 2.5-6.6Z"
        fill="currentColor"
        stroke="none"
        opacity="0.9"
      />
    </CredentialFrame>
  )
}

/** Confirmation tick shown in the quote-form success state. */
export function CheckMark({ className }: IconProps) {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 22 16"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M1 8.5l6.5 6L21 1" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
