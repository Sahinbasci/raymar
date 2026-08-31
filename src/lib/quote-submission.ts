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
 * TO GO LIVE, set `QUOTE_TO_EMAIL` at the top of `public/teklif-gonder.php`
 * (or `QUOTE_WEBHOOK_URL` for a CRM / Zapier / n8n endpoint).
 *
 * With neither configured the endpoint returns 503 and the form shows its error
 * state. That is the intended behaviour: a visitor who is told the message
 * failed can pick up the phone, whereas one who is told it succeeded cannot.
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
  website: string
}

export interface QuoteResult {
  ok: boolean
}

/** Name of the honeypot input, kept in one place for the form and the server. */
export const HONEYPOT_FIELD = 'website'

/**
 * Caps how long the visitor is left watching a spinner.
 *
 * Without this, a hung upstream leaves the button in its loading state
 * indefinitely and the form cannot be retried or corrected — the one state a
 * lead-capture form must never get stuck in.
 */
const TIMEOUT_MS = 15_000

export async function submitQuoteRequest(payload: QuotePayload): Promise<QuoteResult> {
  try {
    const response = await fetch(QUOTE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    if (!response.ok) return { ok: false }

    const result = (await response.json()) as Partial<QuoteResult>
    return { ok: result.ok === true }
  } catch {
    /*
     * Network failure, timeout, or malformed response. Deliberately swallowed
     * rather than logged: the payload is in scope here, and the form's own test
     * asserts that no submitted value ever reaches the console.
     */
    return { ok: false }
  }
}
