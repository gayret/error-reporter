/**
 * Intercepts the global console methods and appends each log entry to the store.
 * Returns a restore function that reverts all patched methods.
 *
 * @param {{ consoleLogs: Array }} store
 * @returns {{ restore: () => void }}
 */
export function interceptConsole(store) {
  const levels = ['log', 'info', 'warn', 'error', 'debug']
  const originals = {}

  levels.forEach((level) => {
    originals[level] = console[level]
    console[level] = function (...args) {
      const message = args
        .map((a) => {
          try {
            return typeof a === 'object' ? JSON.stringify(a) : String(a)
          } catch {
            return String(a)
          }
        })
        .join(' ')
      store.consoleLogs.push({ level, time: new Date().toISOString(), message })
      originals[level].apply(console, args)
    }
  })

  return {
    restore() {
      levels.forEach((level) => {
        console[level] = originals[level]
      })
    },
  }
}
