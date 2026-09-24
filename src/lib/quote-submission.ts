/**
 * Quotation submission boundary.
 *
 * Posts to `public/teklif-gonder.php`, which delivers the message and refuses —
 * loudly — when it has nowhere to send it.
 *
 * The endpoint is PHP rather than a Next route handler because this site is
 * deployed as a static export to shared LiteSpeed/Apache hosting: `output:
 * 'export'` drops API routes entirely, so `/api/quote` would 404 and every
 * enquiry would fail. PHP is what the host actually runs. The contract is
 * unchanged from that route — same validation, same honeypot accept-and-drop,
 * same per-IP rate limit, same `{ ok: boolean }` reply.
 *
 * TO GO LIVE, create `~/raymar-gizli.php` — one directory ABOVE the document
 * root — containing the delivery credential:
 *
 *   <?php return ['brevo_api_key' => 'xkeysib-…'];
 *
 * (A `webhook_url` entry works instead, for a CRM / Zapier / n8n endpoint.)
 * Nothing in this repository or in the deployed site holds that key.
 *
 * With neither configured the endpoint returns 503, stashes the enquiry to
 * `~/teklif-yedek.jsonl` and the form shows its error state. That is the
 * intended behaviour: a visitor who is told the message failed can pick up the
 * phone, whereas one who is told it succeeded cannot.
 */

/**
 * Same-origin path, so it works identically on the deployed host and in local
 * verification. Kept in one place because the E2E suite intercepts it by name.
 */
export const QUOTE_ENDPOINT = '/teklif-gonder.php'

export interface QuotePayload {
  name: string
  company: string
  country: string
  email: string
  phone: string
  product: string
  message: string
  consent: boolean
  /** Honeypot. Real users never fill this; a non-empty value means a bot. */
  'sube-kodu': string
}

export interface QuoteResult {
  ok: boolean
  /**
   * The endpoint's status, so the form can say something useful about *why*.
   * "Please try again" is wrong advice for a 429 — the limit is ten minutes
   * wide, and retrying inside it fails identically.
   */
  status?: number
}

/**
 * Name of the honeypot input, kept in one place for the form and the server.
 *
 * Deliberately NOT `website`, `url` or `company-website`: password managers
 * and browser autofill match hidden inputs by name heuristics, and a filled
 * honeypot is treated as a bot. A real visitor whose manager helpfully typed
 * their site into `website` would have been silently dropped. This name means
 * nothing to autofill, and the server now keeps whatever it catches either
 * way.
 */
export const HONEYPOT_FIELD = 'sube-kodu'

/**
 * Field caps, mirroring `$max_length` in `public/teklif-gonder.php`.
 *
 * The server rejects anything longer. Without the same numbers on the inputs a
 * buyer pasting a full specification into the message box got a generic "try
 * again" and no way to discover what was wrong — the browser now stops the
 * text at the limit instead.
 */
export const FIELD_MAX_LENGTH = {
  name: 120,
  company: 160,
  country: 80,
  email: 200,
  phone: 40,
  product: 80,
  message: 4000,
} as const

/**
 * Caps how long the visitor is left watching a spinner.
 *
 * Without this, a hung upstream leaves the button in its loading state
 * indefinitely and the form cannot be retried or corrected — the one state a
 * lead-capture form must never get stuck in.
 */
const TIMEOUT_MS = 15_000

/**
 * `AbortSignal.timeout` with a fallback.
 *
 * On a browser without it the bare call throws inside the `try` below, is
 * swallowed by the `catch`, and the visitor is told delivery failed although
 * no request was ever made — the one failure mode this boundary must not
 * have.
 */
function abortAfter(ms: number): AbortSignal {
  if (typeof AbortSignal.timeout === 'function') return AbortSignal.timeout(ms)
  const controller = new AbortController()
  setTimeout(() => controller.abort(), ms)
  return controller.signal
}

export async function submitQuoteRequest(payload: QuotePayload): Promise<QuoteResult> {
  try {
    const response = await fetch(QUOTE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: abortAfter(TIMEOUT_MS),
    })

    if (!response.ok) return { ok: false, status: response.status }

    const result = (await response.json()) as Partial<QuoteResult>
    return { ok: result.ok === true, status: response.status }
  } catch {
    /*
     * Network failure, timeout, or malformed response. Deliberately swallowed
     * rather than logged: the payload is in scope here, and the form's own test
     * asserts that no submitted value ever reaches the console.
     */
    return { ok: false }
  }
}
