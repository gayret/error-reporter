import en from './en.js'
import tr from './tr.js'
import de from './de.js'
import fr from './fr.js'
import es from './es.js'
import it from './it.js'
import pt from './pt.js'
import ru from './ru.js'
import zh from './zh.js'
import ja from './ja.js'
import ar from './ar.js'

const locales = { en, tr, de, fr, es, it, pt, ru, zh, ja, ar }

/**
 * Returns the translation object for the given language code.
 * Falls back to English if the language is not supported.
 * @param {string} lang
 * @returns {typeof en}
 */
export function getTranslations(lang) {
  return locales[lang] || locales['en']
}

export const supportedLanguages = Object.keys(locales)
