import { HONEYPOT_FIELD, type QuotePayload } from '@/lib/quote-submission'

/**
 * Quotation submission endpoint.
 *
 * The single rule this file exists to enforce: **a request is only reported as
 * accepted once it has actually been delivered somewhere.** The previous
 * client-side mock resolved `{ ok: true }` unconditionally, which meant an
 * unconfigured deployment told every buyer "Talebiniz alındı" while dropping
 * their enquiry — worse than an outage, because nobody finds out.
 *
 * Delivery is configured with environment variables, and there are two paths so
 * the site can go live with whichever the client already has:
 *
 *   Resend  — RESEND_API_KEY + QUOTE_TO_EMAIL + QUOTE_FROM_EMAIL
 *   Webhook — QUOTE_WEBHOOK_URL  (Zapier, Make, n8n, a CRM, anything that
 *             accepts a JSON POST)
 *
 * With neither set the route returns 503 and the form shows its error state.
 * That is deliberate: refusing loudly is the only honest behaviour when there
 * is nowhere to send the message.
 *
 * POST handlers are never cached (Next 16), so no cache directive is needed.
 */

/** Mirrors the client's rules; a client check is a convenience, not a control. */
const REQUIRED: readonly (keyof QuotePayload)[] = [
  'name',
  'company',
  'country',
  'email',
  'product',
  'message',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Generous enough for a real enquiry, tight enough to bound the payload. */
const MAX_LENGTH: Partial<Record<keyof QuotePayload, number>> = {
  name: 120,
  company: 160,
  country: 80,
  email: 200,
  phone: 40,
  product: 80,
  message: 4000,
}

/*
 * Per-IP rate limit.
 *
 * Deliberately in-process and deliberately modest. On a serverless platform
 * each instance keeps its own counter, so this is a speed bump against casual
 * form-spam rather than a real control — the honeypot and, later, a token check
 * are what actually stop bots. It is here because it costs nothing and turns a
 * trivially scriptable endpoint into one that is mildly annoying to abuse.
 */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 }
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)

  // Bound the map so a long-lived instance cannot grow it without limit.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((at) => now - at >= RATE_LIMIT.windowMs)) hits.delete(key)
    }
  }

  return recent.length > RATE_LIMIT.max
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

interface ParsedBody {
  readonly [key: string]: unknown
}

function validate(body: ParsedBody): { payload: QuotePayload } | { error: string } {
  const read = (key: keyof QuotePayload): string => {
    const value = body[key]
    return typeof value === 'string' ? value.trim() : ''
  }

  const payload: QuotePayload = {
    name: read('name'),
    company: read('company'),
    country: read('country'),
    email: read('email'),
    phone: read('phone'),
    product: read('product'),
    message: read('message'),
    consent: body.consent === true,
    website: read(HONEYPOT_FIELD as keyof QuotePayload),
  }

  for (const field of REQUIRED) {
    if (!payload[field]) return { error: `missing:${field}` }
  }
  if (!EMAIL_PATTERN.test(payload.email)) return { error: 'invalid:email' }
  if (!payload.consent) return { error: 'missing:consent' }

  for (const [field, limit] of Object.entries(MAX_LENGTH)) {
    const value = payload[field as keyof QuotePayload]
    if (typeof value === 'string' && value.length > limit) {
      return { error: `toolong:${field}` }
    }
  }

  return { payload }
}

function plainText(payload: QuotePayload): string {
  return [
    `Ad Soyad : ${payload.name}`,
    `Firma    : ${payload.company}`,
    `Ülke     : ${payload.country}`,
    `E-posta  : ${payload.email}`,
    `Telefon  : ${payload.phone || '—'}`,
    `Ürün     : ${payload.product}`,
    '',
    'Mesaj:',
    payload.message,
  ].join('\n')
}

/** Throws on failure, so a delivery problem can never be reported as success. */
async function deliver(payload: QuotePayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.QUOTE_TO_EMAIL
  const from = process.env.QUOTE_FROM_EMAIL
  const webhook = process.env.QUOTE_WEBHOOK_URL

  if (apiKey && to && from) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So a reply from the inbox goes to the buyer rather than to the site.
        reply_to: payload.email,
        subject: `Teklif talebi — ${payload.company} (${payload.product})`,
        text: plainText(payload),
      }),
    })

    if (!response.ok) {
      throw new Error(`resend responded ${response.status}`)
    }
    return
  }

  if (webhook) {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
    })

    if (!response.ok) {
      throw new Error(`webhook responded ${response.status}`)
    }
    return
  }

  throw new Error('unconfigured')
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return Response.json({ ok: false }, { status: 429 })
  }

  let body: ParsedBody
  try {
    body = (await request.json()) as ParsedBody
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }

  const result = validate(body)
  if ('error' in result) {
    // The reason is not echoed back: the client already knows which field it
    // failed to fill, and a validation oracle is free reconnaissance.
    return Response.json({ ok: false }, { status: 400 })
  }

  /*
   * Honeypot: accept-and-drop rather than reject.
   *
   * A bot that gets a 400 learns the field is checked and removes it on the
   * next attempt. A bot that gets a 200 learns nothing and moves on.
   */
  if (result.payload.website !== '') {
    return Response.json({ ok: true })
  }

  try {
    await deliver(result.payload)
  } catch (error) {
    /*
     * The message is logged, the payload never is — it is exactly the personal
     * data the KVKK notice promises is only seen by authorised staff, and
     * platform logs are not that.
     */
    console.error(
      '[quote] delivery failed:',
      error instanceof Error ? error.message : 'unknown error',
    )
    return Response.json({ ok: false }, { status: 503 })
  }

  return Response.json({ ok: true })
}
