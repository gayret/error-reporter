import { resolveConfig } from './config.js'
import { createStore } from './store.js'
import { interceptConsole } from './interceptors/console.js'
import { interceptFetch } from './interceptors/fetch.js'
import { interceptXHR } from './interceptors/xhr.js'
import { openModal } from './modal/index.js'

/**
 * Initialises the error reporter.
 *
 * Call this once, as early as possible in your application's entry point
 * (before any network requests or console output you want to capture).
 *
 * ```js
 * import { init } from '@safagayret/error-reporter'
 *
 * init({
 *   language: 'tr',
 *   uploadEndpoint: 'https://your-api.example.com/error-reports',
 *   shortcut: { ctrl: true, shift: true, key: 'H' },
 * })
 * ```
 *
 * @param {import('./config.js').ReporterConfig} [userConfig]
 * @returns {{ destroy: () => void }}  Call destroy() to remove all listeners and patches.
 */
export function init(userConfig = {}) {
  const config = resolveConfig(userConfig)
  const store = createStore()

  // Preserve the native fetch before interceptors modify it.
  // The uploader uses this reference so the upload request itself
  // is not recorded in the network log.
  if (typeof window !== 'undefined' && window.fetch) {
    window.__er_original_fetch__ = window.fetch
  }

  const consoleHandle = interceptConsole(store)
  const fetchHandle = interceptFetch(store)
  const xhrHandle = interceptXHR(store)

  function handleKeydown(e) {
    const sc = config.shortcut
    if (
      e.ctrlKey === sc.ctrl &&
      e.shiftKey === sc.shift &&
      e.altKey === (sc.alt ?? false) &&
      e.metaKey === (sc.meta ?? false) &&
      e.key === sc.key
    ) {
      e.preventDefault()
      openModal(store, config)
    }
  }

  document.addEventListener('keydown', handleKeydown)

  return {
    destroy() {
      document.removeEventListener('keydown', handleKeydown)
      consoleHandle.restore()
      fetchHandle.restore()
      xhrHandle.restore()
      if (window.__er_original_fetch__) {
        delete window.__er_original_fetch__
      }
    },
  }
}
