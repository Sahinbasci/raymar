'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { CheckMark } from '@/components/ui/icons'
import { cn, formatTemplate } from '@/lib/cn'
import {
  HONEYPOT_FIELD,
  submitQuoteRequest,
  type QuotePayload,
} from '@/lib/quote-submission'
import type { QuoteContent } from '@/types/content'
import { useQuoteRequest } from './quote-request-context'

type FieldName = keyof Omit<QuotePayload, 'consent' | 'website'>

const emptyValues: Record<FieldName, string> = {
  name: '',
  company: '',
  country: '',
  email: '',
  phone: '',
  product: '',
  message: '',
}

const requiredFields: readonly FieldName[] = [
  'name',
  'company',
  'country',
  'email',
  'product',
  'message',
]

/** Same shape the design validated against. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/*
 * No `outline-none` here. It used to sit in this string, and because Tailwind
 * emits the utilities layer after the base layer it beat the global
 * `:focus-visible` rule in globals.css — every control in the form had its
 * focus ring silently removed, leaving a border-colour change as the only cue.
 */
const inputClass =
  'h-12 rounded-none border bg-raymar-ivory px-3.5 transition-[border-color,background-color] duration-300 focus:border-raymar-gold focus:bg-raymar-white'

/*
 * `/60`, not the original `/16`: at 16% the green border composited to 1.32:1
 * against the panel, well under the 3:1 WCAG 1.4.11 (Non-text Contrast) asks of
 * a form field's boundary. /60 clears it on both surfaces the border sits
 * against — the ivory field fill (3.32:1) and the white focus fill (3.39:1).
 */
function fieldBorder(invalid: boolean): string {
  return invalid ? 'border-raymar-alert-rule' : 'border-raymar-green/60'
}

interface QuoteFormProps {
  content: QuoteContent
}

/**
 * Quotation request form.
 *
 * Validation mirrors the approved design: required fields must be non-empty,
 * the email must match, and the KVKK consent box must be ticked. Errors are
 * announced through a live region and the first invalid control receives focus.
 *
 * Submission goes through `submitQuoteRequest`, which is a documented mock —
 * see `src/lib/quote-submission.ts`. Field values are never logged.
 */
export function QuoteForm({ content }: QuoteFormProps) {
  const formId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const { request, clearRequest } = useQuoteRequest()

  const [values, setValues] = useState<Record<FieldName, string>>(emptyValues)
  const [consent, setConsent] = useState(false)
  const [invalid, setInvalid] = useState<ReadonlySet<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [submitted, setSubmitted] = useState<Record<FieldName, string>>(emptyValues)
  const [appliedRequest, setAppliedRequest] = useState<number | null>(null)
  /** The last message this component generated, so a later CTA can replace it. */
  const [lastPrefill, setLastPrefill] = useState('')
  /**
   * Text for the persistent live region. A region only announces changes it is
   * present for, so it is mounted across every state and written into after the
   * fact — the success panel used to arrive with its own region already
   * populated, which announces nothing.
   */
  const [announcement, setAnnouncement] = useState('')
  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const fieldId = (name: string) => `${formId}-${name}`

  // Submitting replaces the whole form with the success panel, so focus would
  // otherwise fall back to <body> and the visitor would be left at the top of
  // the document with no idea what happened.
  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus()
  }, [status])

  // A product card asked for a quote: preselect the group, prefill the message
  // if the visitor has not written one, and return from the success state.
  //
  // Adjusted during render rather than in an effect — React's documented
  // pattern for deriving state from a changed input. The token guard makes it
  // idempotent, so re-rendering for any other reason does not overwrite what
  // the visitor has typed.
  if (request && request.token !== appliedRequest) {
    const prefill = formatTemplate(content.prefillTemplate, { product: request.name })
    setAppliedRequest(request.token)
    setLastPrefill(prefill)
    setStatus((current) => (current === 'success' ? 'idle' : current))
    setValues((current) => ({
      ...current,
      product: content.productOptions.includes(request.group)
        ? request.group
        : content.otherProductOption,
      // Replace the message when it is empty OR when it is still the sentence
      // this component wrote last time. Comparing against `lastPrefill` is what
      // lets a second product CTA correct the message: previously only the
      // select changed, so the enquiry named one product and described another.
      // Anything the visitor typed themselves is never overwritten.
      message:
        !current.message.trim() || current.message === lastPrefill
          ? prefill
          : current.message,
    }))
  }

  /*
   * The reason a given control is invalid.
   *
   * The banner alone said only "fill the required fields in correctly", which
   * tells a screen-reader user nothing once focus lands on a control — and a
   * malformed e-mail and an empty one are not the same problem.
   */
  const fieldError = (name: FieldName | 'consent'): string | undefined => {
    if (!invalid.has(name)) return undefined
    if (name === 'consent') return content.errorConsent
    if (name === 'email' && values.email.trim() !== '') return content.errorFieldEmail
    return content.errorFieldRequired
  }

  const setField = (name: FieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }))
    setInvalid((current) => {
      if (!current.has(name)) return current
      const next = new Set(current)
      next.delete(name)
      return next
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextInvalid = new Set<string>()
    for (const name of requiredFields) {
      if (values[name].trim() === '') nextInvalid.add(name)
    }
    if (!nextInvalid.has('email') && !EMAIL_PATTERN.test(values.email.trim())) {
      nextInvalid.add('email')
    }
    if (!consent) nextInvalid.add('consent')

    setInvalid(nextInvalid)

    if (nextInvalid.size > 0) {
      const consentOnly = nextInvalid.size === 1 && nextInvalid.has('consent')
      setError(consentOnly ? content.errorConsent : content.errorGeneric)

      /*
       * Announce, then move focus — not both in the same tick.
       *
       * Writing the banner and focusing a control together means the focus
       * change interrupts the assertive announcement in most screen readers, so
       * the user hears the field label instead of the reason. Deferring by a
       * frame lets the alert land first. The per-field message reached through
       * `aria-describedby` then repeats the reason on the control itself.
       */
      const first = [...requiredFields, 'consent'].find((name) => nextInvalid.has(name))
      if (first) {
        requestAnimationFrame(() => {
          document.getElementById(fieldId(first))?.focus()
        })
      }
      return
    }

    setError(null)
    setStatus('submitting')

    const honeypot =
      (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)
        ?.value ?? ''

    const result = await submitQuoteRequest({
      ...values,
      consent,
      website: honeypot,
    })

    if (!result.ok) {
      setStatus('idle')
      setError(content.errorSubmit)
      return
    }

    // Keep a snapshot for the summary, then clear the live form. Leaving the
    // values in state meant a later product CTA re-opened the form holding the
    // previous enquirer's name, e-mail and phone with the KVKK box still
    // ticked — on a shared or kiosk browser that exposes one visitor's details
    // to the next, and invites a resubmission under someone else's name.
    setSubmitted(values)
    setValues(emptyValues)
    setConsent(false)
    setLastPrefill('')
    setStatus('success')
    setAnnouncement(`${content.successHeading} ${content.successBody}`)
  }

  const handleReset = () => {
    setValues(emptyValues)
    setConsent(false)
    setInvalid(new Set())
    setError(null)
    setStatus('idle')
    setAnnouncement('')
    /*
     * Clears the *shared* request, not just this component's local token.
     * Clearing only `appliedRequest` left `request` itself populated, so the
     * derived-state block above (`request.token !== appliedRequest`) saw a
     * "new" request on the very next render and reapplied the product and
     * message prefill — "Yeni talep oluştur" did not actually produce a blank
     * form. Clearing the shared value also covers an in-flight submit: with
     * `request` null the guard short-circuits regardless of what
     * `appliedRequest` still holds, and the next product CTA mints a fresh
     * token that compares unequal to `null`.
     */
    clearRequest()
    setLastPrefill('')
  }

  const summaryRows: readonly (readonly [string, string])[] = [
    [content.fields.name.label, submitted.name],
    [content.fields.company.label, submitted.company],
    [content.fields.country.label, submitted.country],
    [content.fields.email.label, submitted.email],
    [content.fields.phone.label, submitted.phone || content.emptyValue],
    [content.fields.product.label, submitted.product],
    [content.fields.message.label, submitted.message],
  ]

  /*
   * Mounted in both states and always the first child, so React reconciles it
   * as the same DOM node across the swap. That persistence is the whole point:
   * a live region announces changes made while it is on the page, and the old
   * markup inserted a fresh region with the confirmation already inside it,
   * which assistive technology has nothing to compare against and so says
   * nothing at all.
   */
  const liveRegion = (
    <p role="status" aria-live="polite" className="sr-only">
      {announcement}
    </p>
  )

  if (status === 'success') {
    return (
      <>
        {liveRegion}
        <div className="relative border border-raymar-green/12 bg-raymar-white px-5.5 pt-13 pb-11.5 md:px-11.5 md:pt-13 md:pb-11.5">
          <span
            aria-hidden="true"
            className="flex h-13 w-13 items-center justify-center rounded-full bg-raymar-gold/16 text-raymar-green"
          >
            <CheckMark />
          </span>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="mt-6.5 text-4xl leading-[1.08] text-raymar-green focus-visible:outline-offset-4"
          >
            {content.successHeading}
          </h3>
          <p className="mt-4 max-w-[420px] text-[15.5px] leading-[1.75] font-light text-raymar-ink/82">
            {content.successBody}
          </p>

          <div className="mt-8.5 border-t border-raymar-green/12 pt-6.5">
            <div className="text-xs font-normal tracking-[0.24em] text-raymar-ink/78 uppercase">
              {content.summaryLabel}
            </div>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-7 gap-y-3 text-[14.5px]">
              {summaryRows.map(([label, value]) => (
                <div key={label} className="contents">
                  <dt className="m-0 font-normal whitespace-nowrap text-raymar-ink/78">
                    {label}
                  </dt>
                  <dd className="m-0 leading-[1.6] font-light break-words text-raymar-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="mt-9 inline-flex cursor-pointer items-center gap-2.5 border-0 border-b border-raymar-green/24 bg-transparent p-0 pb-2.5 text-xs font-normal tracking-[0.2em] text-raymar-green uppercase transition-colors duration-300 hover:border-raymar-gold"
          >
            {content.resetCta}
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      {liveRegion}
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        className="relative border border-raymar-green/12 bg-raymar-white px-5.5 pt-7.5 pb-7 md:px-11.5 md:pt-11.5 md:pb-10.5"
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-6.5 md:grid-cols-2">
          <TextField
            id={fieldId('name')}
            name="name"
            label={content.fields.name.label}
            placeholder={content.fields.name.placeholder}
            autoComplete="name"
            required
            value={values.name}
            invalid={invalid.has('name')}
            error={fieldError('name')}
            onChange={(value) => setField('name', value)}
          />
          <TextField
            id={fieldId('company')}
            name="company"
            label={content.fields.company.label}
            placeholder={content.fields.company.placeholder}
            autoComplete="organization"
            required
            value={values.company}
            invalid={invalid.has('company')}
            error={fieldError('company')}
            onChange={(value) => setField('company', value)}
          />
          <TextField
            id={fieldId('country')}
            name="country"
            label={content.fields.country.label}
            placeholder={content.fields.country.placeholder}
            autoComplete="country-name"
            required
            value={values.country}
            invalid={invalid.has('country')}
            error={fieldError('country')}
            onChange={(value) => setField('country', value)}
          />
          <TextField
            id={fieldId('email')}
            name="email"
            type="email"
            label={content.fields.email.label}
            placeholder={content.fields.email.placeholder}
            autoComplete="email"
            required
            value={values.email}
            invalid={invalid.has('email')}
            error={fieldError('email')}
            onChange={(value) => setField('email', value)}
          />
          <TextField
            id={fieldId('phone')}
            name="phone"
            type="tel"
            label={content.fields.phone.label}
            placeholder={content.fields.phone.placeholder}
            autoComplete="tel"
            value={values.phone}
            invalid={false}
            error={fieldError('phone')}
            onChange={(value) => setField('phone', value)}
          />

          <label className="flex flex-col gap-2.5">
            <FieldLabel id={`${fieldId('product')}-label`} required>
              {content.fields.product.label}
            </FieldLabel>
            <select
              id={fieldId('product')}
              name="product"
              required
              value={values.product}
              aria-invalid={invalid.has('product') || undefined}
              aria-labelledby={`${fieldId('product')}-label`}
              aria-describedby={
                fieldError('product') ? `${fieldId('product')}-error` : undefined
              }
              onChange={(event) => setField('product', event.target.value)}
              className={cn(
                inputClass,
                fieldBorder(invalid.has('product')),
                /*
                 * `appearance-none` drops the native caret with nothing to
                 * replace it, so the control read as plain text with no
                 * indication it opens a menu. The gold chevron is painted as a
                 * background image rather than an absolutely-positioned icon:
                 * this `<select>` sits inside a flex-column `<label>` alongside
                 * a *conditional* error `<span>`, so a child centred with
                 * `top-1/2` would centre against the whole stack and jump the
                 * moment `fieldError('product')` renders the error text.
                 */
                "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2012%208%27%3E%3Cpath%20d%3D%27M1%201l5%205%205-5%27%20fill%3D%27none%27%20stroke%3D%27%23004c38%27%20stroke-width%3D%271.5%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%2F%3E%3C%2Fsvg%3E')] bg-[right_0.9rem_center] bg-no-repeat px-3 pr-9",
              )}
            >
              <option value="">{content.productPlaceholder}</option>
              {content.productOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value={content.otherProductOption}>
                {content.otherProductOption}
              </option>
            </select>
            {fieldError('product') ? (
              <span id={`${fieldId('product')}-error`} className={fieldErrorClass}>
                {fieldError('product')}
              </span>
            ) : null}
          </label>

          <label className="flex flex-col gap-2.5 md:col-span-2">
            <FieldLabel id={`${fieldId('message')}-label`} required>
              {content.fields.message.label}
            </FieldLabel>
            <textarea
              id={fieldId('message')}
              name="message"
              required
              rows={4}
              placeholder={content.fields.message.placeholder}
              value={values.message}
              aria-invalid={invalid.has('message') || undefined}
              aria-labelledby={`${fieldId('message')}-label`}
              aria-describedby={
                fieldError('message') ? `${fieldId('message')}-error` : undefined
              }
              onChange={(event) => setField('message', event.target.value)}
              className={cn(
                'resize-y rounded-none border bg-raymar-ivory p-3.5 leading-[1.6] transition-[border-color,background-color] duration-300 focus:border-raymar-gold focus:bg-raymar-white',
                fieldBorder(invalid.has('message')),
              )}
            />
            {fieldError('message') ? (
              <span id={`${fieldId('message')}-error`} className={fieldErrorClass}>
                {fieldError('message')}
              </span>
            ) : null}
          </label>
        </div>

        {/* Honeypot: hidden from people and assistive technology, visible to bots. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor={fieldId(HONEYPOT_FIELD)}>Website</label>
          <input
            id={fieldId(HONEYPOT_FIELD)}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <label className="mt-7 flex cursor-pointer items-start gap-3">
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            required
            checked={consent}
            aria-invalid={invalid.has('consent') || undefined}
            /* Same reason as the TextField inputs: the error `<span>` below sits
             inside this wrapping `<label>`, so without pinning the name to the
             consent text alone it would be folded into the *name* as well as
             the description, and announced twice. */
            aria-labelledby={`${fieldId('consent')}-label`}
            aria-describedby={
              fieldError('consent') ? `${fieldId('consent')}-error` : undefined
            }
            onChange={(event) => {
              setConsent(event.target.checked)
              setInvalid((current) => {
                if (!current.has('consent')) return current
                const next = new Set(current)
                next.delete('consent')
                return next
              })
            }}
            className="mt-0.5 h-4.5 w-4.5 flex-none accent-raymar-green"
          />
          <span className="text-[13px] leading-[1.6] font-light text-raymar-ink/82">
            <span id={`${fieldId('consent')}-label`}>
              {content.consentText}{' '}
              <span className="text-raymar-ink/70">{content.consentPolicyNote}</span>
            </span>
            {fieldError('consent') ? (
              <span
                id={`${fieldId('consent')}-error`}
                className={cn('mt-1.5 block', fieldErrorClass)}
              >
                {fieldError('consent')}
              </span>
            ) : null}
          </span>
        </label>

        <p
          role="alert"
          aria-live="assertive"
          className={cn(
            'mt-5.5 border-l-2 border-raymar-alert-rule bg-raymar-alert-bed px-3.75 py-3.25 text-[13.5px] leading-[1.5] font-normal text-raymar-alert-ink',
            error ? 'block' : 'hidden',
          )}
        >
          {error}
        </p>

        <div className="mt-7.5 flex flex-wrap items-center gap-5.5">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex cursor-pointer items-center gap-3 rounded-none border-0 bg-raymar-green px-11 py-[21px] text-xs font-medium tracking-[0.2em] text-raymar-white uppercase transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-raymar-green-hover disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {status === 'submitting' ? content.submitting : content.submit}
            <span className="inline-flex text-raymar-gold">
              <svg
                width="32"
                height="8"
                viewBox="0 0 32 8"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M0 4h30M26 1l4 3-4 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </button>
          <span className="text-[12.5px] font-normal text-raymar-ink/74">
            {content.requiredNote}
          </span>
        </div>
      </form>
    </>
  )
}

function FieldLabel({
  children,
  required = false,
  id,
}: {
  children: string
  required?: boolean
  /** Forwarded so a control can name itself via `aria-labelledby`. */
  id?: string
}) {
  return (
    <span
      id={id}
      className="text-xs font-normal tracking-[0.24em] text-raymar-ink/84 uppercase"
    >
      {children}
      {required ? ' *' : ''}
    </span>
  )
}

/** Shared styling for the message a control points at with `aria-describedby`. */
const fieldErrorClass = 'text-[12.5px] leading-[1.45] font-normal text-raymar-alert-ink'

interface TextFieldProps {
  id: string
  name: string
  label: string
  value: string
  invalid: boolean
  /** Rendered under the control and wired up with `aria-describedby`. */
  error?: string | undefined
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel'
  /** Explicitly nullable: the content model marks placeholders optional. */
  placeholder?: string | undefined
  autoComplete?: string | undefined
  required?: boolean
}

function TextField({
  id,
  name,
  label,
  value,
  invalid,
  error,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
}: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <FieldLabel id={`${id}-label`} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        value={value}
        aria-invalid={invalid || undefined}
        /*
         * `aria-labelledby`, not the implicit `<label>` wrapping: the accname
         * algorithm consults it before falling back to the native association,
         * so the control's name is pinned to the label text alone. Without it
         * the error `<span>` below — also inside this `<label>`, wired for the
         * *description* via `aria-describedby` — was additionally folded into
         * the *name*, so a screen reader announced the reason twice.
         */
        aria-labelledby={`${id}-label`}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={cn(inputClass, fieldBorder(invalid))}
      />
      {error ? (
        <span id={`${id}-error`} className={fieldErrorClass}>
          {error}
        </span>
      ) : null}
    </label>
  )
}
