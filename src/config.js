import { supportedLanguages } from './i18n/index.js'

/** @type {import('../template/error-reporter.config.js')} */
const DEFAULTS = {
  language: 'en',
  shortcut: {
    ctrl: true,
    shift: true,
    alt: false,
    meta: false,
    key: 'H',
  },
  uploadEndpoint: null,
}

/**
 * Merges the user-supplied config with defaults, validates key fields,
 * and returns a fully-resolved configuration object.
 *
 * @param {Partial<typeof DEFAULTS>} userConfig
 * @returns {typeof DEFAULTS}
 */
export function resolveConfig(userConfig = {}) {
  const config = {
    ...DEFAULTS,
    ...userConfig,
    shortcut: {
      ...DEFAULTS.shortcut,
      ...(userConfig.shortcut || {}),
    },
  }

  if (!supportedLanguages.includes(config.language)) {
    console.warn(
      `[error-reporter] Unsupported language "${config.language}". ` +
        `Supported: ${supportedLanguages.join(', ')}. Falling back to "en".`,
    )
    config.language = 'en'
  }

  if (typeof config.shortcut.key !== 'string' || config.shortcut.key.trim() === '') {
    console.warn('[error-reporter] shortcut.key must be a non-empty string. Using default "H".')
    config.shortcut.key = 'H'
  }

  if (config.uploadEndpoint !== null && typeof config.uploadEndpoint !== 'string') {
    console.warn('[error-reporter] uploadEndpoint must be a string URL or null. Ignoring.')
    config.uploadEndpoint = null
  }

  return config
}
