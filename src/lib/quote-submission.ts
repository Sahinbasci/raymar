/**
 * Quotation submission boundary.
 *
 * ============================ NOT A REAL ENDPOINT ============================
 * No submission backend exists for this site yet. `submitQuoteRequest` is a
 * clearly isolated mock: it resolves after a short delay and DOES NOTHING with
 * the payload. Nothing is emailed, stored or transmitted, and the UI must not
 * claim otherwise beyond the approved success copy.
 *
 * TO CONNECT PRODUCTION:
 *   1. Add a route handler at `src/app/api/quote/route.ts` (or point at the
 *      client's CRM / mail relay).
 *   2. Replace the body of `submitQuoteRequest` with the `fetch` to it.
 *   3. Add spam mitigation server-side — the honeypot field below is submitted
 *      as `website` and must be rejected when non-empty; a token check
 *      (Turnstile / reCAPTCHA) should be added at the same time.
 * The form component needs no changes: it already renders loading, error and
 * success states off this function's promise.
 * ============================================================================
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

export async function submitQuoteRequest(payload: QuotePayload): Promise<QuoteResult> {
  // Silently accept-and-drop honeypot hits so bots get no signal.
  if (payload.website.trim() !== '') {
    return { ok: true }
  }

  // Mock latency so the loading state is exercised in development and tests.
  await new Promise((resolve) => setTimeout(resolve, 600))

  return { ok: true }
}
