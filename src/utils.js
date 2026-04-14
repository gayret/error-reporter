/**
 * Returns a timestamp string using the browser's local timezone.
 * Format: DD-MM-YYYYTHH:MM:SS.mmm±HH:MM
 * @returns {string}
 */
export function getTimestampString() {
  const date = new Date()

  const pad2 = (n) => String(n).padStart(2, '0')
  const pad3 = (n) => String(n).padStart(3, '0')

  const year = date.getFullYear()
  const month = pad2(date.getMonth() + 1)
  const day = pad2(date.getDate())
  const hours = pad2(date.getHours())
  const minutes = pad2(date.getMinutes())
  const seconds = pad2(date.getSeconds())
  const ms = pad3(date.getMilliseconds())

  const offsetMin = -date.getTimezoneOffset()
  const sign = offsetMin >= 0 ? '+' : '-'
  const absOffset = Math.abs(offsetMin)
  const offsetHours = pad2(Math.floor(absOffset / 60))
  const offsetMins = pad2(absOffset % 60)

  return `${day}-${month}-${year}T${hours}:${minutes}:${seconds}.${ms}${sign}${offsetHours}:${offsetMins}`
}

/**
 * Returns a filesystem-safe timestamp string for use in filenames.
 * Colons and dots are replaced with dashes, limited to 19 chars.
 * @returns {string}
 */
export function getTimestampForFilename() {
  return getTimestampString().replace(/[:.]/g, '-').slice(0, 19)
}
