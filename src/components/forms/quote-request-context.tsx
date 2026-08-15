'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export interface QuoteRequest {
  /** Product group used to preselect the form's product field. */
  group: string
  /** Specific product name written into the message prefill. */
  name: string
  /** Distinguishes repeat requests for the same product. */
  token: number
}

interface QuoteRequestValue {
  request: QuoteRequest | null
  requestQuote: (group: string, name: string) => void
  /** Clears the last request so the form's own reset is not immediately reapplied. */
  clearRequest: () => void
}

const QuoteRequestContext = createContext<QuoteRequestValue | null>(null)

/**
 * Connects the product cards to the quotation form.
 *
 * `children` is a prop, so every section below stays a Server Component — this
 * provider adds one small client island rather than converting the page.
 */
export function QuoteRequestProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<QuoteRequest | null>(null)

  const requestQuote = useCallback((group: string, name: string) => {
    setRequest({ group, name, token: Date.now() })
  }, [])

  const clearRequest = useCallback(() => setRequest(null), [])

  const value = useMemo(
    () => ({ request, requestQuote, clearRequest }),
    [request, requestQuote, clearRequest],
  )

  return (
    <QuoteRequestContext.Provider value={value}>{children}</QuoteRequestContext.Provider>
  )
}

export function useQuoteRequest(): QuoteRequestValue {
  const context = useContext(QuoteRequestContext)
  if (!context) {
    throw new Error('useQuoteRequest must be used inside a QuoteRequestProvider')
  }
  return context
}
