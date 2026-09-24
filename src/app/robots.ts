import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

/**
 * Every crawler is allowed, AI agents included and named explicitly.
 *
 * There is no trade-off to manage here. Raymar has no paywall, no ad revenue
 * and no proprietary text to protect — the entire commercial goal is to be
 * found and quoted, so a rule that keeps an answer engine out works directly
 * against the business. The named blocks are redundant against the wildcard by
 * the letter of the standard, but several of these agents are documented as
 * matching the most specific group that names them, and an explicit entry is
 * also a legible statement of intent to anyone auditing the file.
 *
 * `Google-Extended` is worth stating plainly: allowing it buys grounding in the
 * Gemini app. It does NOT control AI Overviews or AI Mode, which run on
 * Googlebot — blocking it would forfeit one surface and change nothing about
 * the other. The only Google-side levers that suppress AI answers are
 * `nosnippet` and `max-snippet`, and those degrade classic search too, so
 * neither is used anywhere on this site.
 */
const AI_AGENTS = [
  // OpenAI — search, training and user-initiated fetches are separate agents.
  'OAI-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Google's AI grounding agent, distinct from Googlebot
  'Google-Extended',
  // Apple's AI grounding agent, distinct from Applebot
  'Applebot-Extended',
  // Others
  'Amazonbot',
  'meta-externalagent',
  'Bytespider',
  'cohere-ai',
]

/**
 * The App Router's own payloads, and the two `.txt` files that are content.
 *
 * Next writes a `.txt` next to every page — `/tr.txt`, `/tr/urunler.txt`,
 * `/tr/__next._tree.txt` — for client-side navigation. They are byte-for-byte
 * the same content as the HTML, so a crawler that indexes them sees a second
 * copy of all 56 pages. Blocking them costs nothing: the browser fetches them
 * regardless, since robots.txt binds crawlers, not pages.
 *
 * `llms.txt` and the IndexNow key are the exceptions, and are allowed back by
 * the longer, more specific rule.
 */
const CONTENT_TXT = ['/llms.txt', '/62e9be2df8f1e009ba0be63c77a0cb03.txt']

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: ['/', ...CONTENT_TXT], disallow: ['/*.txt$'] }
  return {
    rules: [
      { userAgent: '*', ...rule },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, ...rule })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

/*
 * Required by `output: 'export'`: without it the build fails outright with
 * "export const dynamic = force-static not configured on route". These files
 * already compute their output from build-time constants only, so declaring it
 * changes nothing about the result — it just tells Next that explicitly.
 */
export const dynamic = 'force-static'
