/**
 * Quotation submission boundary.
 *
 * This used to be a documented mock that resolved `{ ok: true }` without doing
 * anything, which meant the site thanked every buyer for an enquiry it had just
 * thrown away. It now posts to `src/app/api/quote/route.ts`, which delivers the
 * message and refuses — loudly — when it has nowhere to send it.
 *
 * TO GO LIVE, set one of these in the deployment environment:
 *
 *   RESEND_API_KEY + QUOTE_TO_EMAIL + QUOTE_FROM_EMAIL   (e-mail)
 *   QUOTE_WEBHOOK_URL                                     (CRM / Zapier / n8n)
 *
 * With neither configured the endpoint returns 503 and the form shows its error
 * state. That is the intended behaviour: a visitor who is told the message
 * failed can pick up the phone, whereas one who is told it succeeded cannot.
 */

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
    const response = await fetch('/api/quote', {
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
