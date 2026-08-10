type ClassValue = string | false | null | undefined

/** Joins conditional class names. Kept dependency-free — no variant engine is needed. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}

/**
 * Substitutes `{key}` placeholders in a content string.
 *
 * Content templates are plain strings rather than functions so that dictionaries
 * remain serialisable across the Server/Client Component boundary.
 */
export function formatTemplate(
  template: string,
  values: Readonly<Record<string, string>>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match)
}
