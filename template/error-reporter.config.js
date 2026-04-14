/**
 * error-reporter.config.js
 *
 * Configuration file for @safagayret/error-reporter.
 * Place this file in the root of your project.
 *
 * Run `npx @safagayret/error-reporter init` to (re)generate this file.
 */

module.exports = {
  /**
   * UI language for the error reporter modal.
   *
   * Supported values:
   *   'en' — English (default)
   *   'tr' — Turkish
   *   'de' — German
   *   'fr' — French
   *   'es' — Spanish
   *   'it' — Italian
   *   'pt' — Portuguese
   *   'ru' — Russian
   *   'zh' — Chinese (Simplified)
   *   'ja' — Japanese
   *   'ar' — Arabic
   *
   * Falls back to 'en' if an unsupported value is provided.
   */
  language: 'en',

  /**
   * Keyboard shortcut that opens the error reporter modal.
   *
   * Defaults to CTRL+SHIFT+H (Windows/Linux) or CMD+SHIFT+H (macOS if meta is true).
   *
   * - ctrl  {boolean}  Require the Ctrl key.
   * - shift {boolean}  Require the Shift key.
   * - alt   {boolean}  Require the Alt / Option key.
   * - meta  {boolean}  Require the Meta (⌘ / ⊞ Win) key.
   * - key   {string}   The key value (case-sensitive, e.g. 'H', 'F2', 'e').
   *                    Matches the KeyboardEvent.key property.
   */
  shortcut: {
    ctrl: true,
    shift: true,
    alt: false,
    meta: false,
    key: 'H',
  },

  /**
   * Optional endpoint URL where the error report ZIP is uploaded.
   *
   * When set, the reporter sends a multipart/form-data POST request to this
   * URL with the ZIP file under the field name "file", instead of downloading
   * it to the user's computer.
   *
   * Set to null (or leave it out) to keep the default download behaviour.
   *
   * Example:
   *   uploadEndpoint: 'https://api.yourcompany.com/error-reports'
   */
  uploadEndpoint: null,
}
