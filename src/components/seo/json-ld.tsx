/**
 * Emits a schema.org graph as a server-rendered `<script>`.
 *
 * A plain tag rather than `next/script`: structured data has to be in the HTML
 * the crawler receives, and `next/script` exists to control *when* a script
 * executes, which is meaningless for a block that is never executed at all.
 *
 * `JSON.stringify` escapes nothing that matters here — the payload is built
 * from the site's own dictionary, never from user input — but `<` is escaped
 * anyway so a stray `</script>` in future copy cannot break out of the block.
 */
export function JsonLd({ graph }: { graph: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
      }}
    />
  )
}
