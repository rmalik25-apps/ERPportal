const blockedLinePatterns = [
  /Google autocomplete/i,
  /Google Trends/i,
  /Search Console/i,
  /For ERP Search/i,
  /topic gap/i,
  /demand signal/i,
  /source-validation/i,
  /documentation supports/i,
  /supports a practical view/i,
  /current buyer topic/i,
  /search-interest/i,
  /search intent/i,
  /search behaviour/i,
  /search signal/i,
  /search signals/i,
]

const metaReplacements: Array<[RegExp, string]> = [
  [/\s+and AU search-interest signals/gi, ''],
  [/\s+using current ([^,.]+) documentation and AU search-interest signals/gi, ' using current $1 documentation'],
  [/\s+using ([^,.]+) release notes, ([^,.]+), and AU search-interest signals/gi, ' using $1 release notes and $2'],
]

export function isInternalResearchLine(text: string) {
  return blockedLinePatterns.some((pattern) => pattern.test(text))
}

export function sanitizePublicMeta(text: string) {
  return metaReplacements.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text).trim()
}
