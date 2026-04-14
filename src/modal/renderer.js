/**
 * Returns the badge CSS class based on count severity.
 * @param {number} n
 * @returns {string}
 */
function badgeClass(n) {
  return n > 5 ? 'red' : n > 0 ? 'warm' : ''
}

/**
 * Renders the initial modal HTML string.
 *
 * @param {object} t  Translation object (getTranslations result).
 * @param {{ consoleLogs: Array, networkRequests: Array }} store
 * @param {boolean} hasUploadEndpoint  Whether uploadEndpoint is configured.
 * @returns {string}
 */
export function renderModalHTML(t, store, hasUploadEndpoint) {
  const cl = store.consoleLogs.length
  const nr = store.networkRequests.length
  const m = t.modal
  const submitLabel = hasUploadEndpoint ? m.submit.idleUpload : m.submit.idle

  return `
    <div id="er_backdrop">
      <div id="er_panel">
        <div id="er_head">
          <h2>${m.title}</h2>
          <button id="er_x" aria-label="Close">✕</button>
        </div>
        <div id="er_body">
          <p class="er_desc">${m.description}</p>

          <div class="er_row">
            <span class="er_icon">🖥️</span>
            <span>
              <span class="er_lbl">${m.screenshot.label}</span>
              <span class="er_sub">${m.screenshot.subtitle}</span>
            </span>
          </div>

          <div class="er_row">
            <span class="er_icon">📋</span>
            <span>
              <span class="er_lbl">${m.consoleLogs.label}</span>
              <span class="er_sub">${m.consoleLogs.subtitle}</span>
            </span>
            <span class="er_badge ${badgeClass(cl)}">${m.consoleLogs.badge(cl)}</span>
          </div>

          <div class="er_row">
            <span class="er_icon">🌐</span>
            <span>
              <span class="er_lbl">${m.networkRequests.label}</span>
              <span class="er_sub">${m.networkRequests.subtitle}</span>
            </span>
            <span class="er_badge ${badgeClass(nr)}">${m.networkRequests.badge(nr)}</span>
          </div>

          <div class="er_row">
            <span class="er_icon">ℹ️</span>
            <span>
              <span class="er_lbl">${m.systemInfo.label}</span>
              <span class="er_sub">${m.systemInfo.subtitle}</span>
            </span>
          </div>

          <div class="er_sep"></div>
          <label class="er_note_lbl" for="er_note">${m.note.label}</label>
          <textarea id="er_note" placeholder="${m.note.placeholder}"></textarea>

          <div id="er_prog_wrap"><div id="er_pbar"></div></div>
          <div id="er_status"></div>

          <button id="er_submit">${submitLabel}</button>
        </div>
      </div>
    </div>
  `
}

/**
 * Renders the success state HTML string.
 *
 * @param {object} t  Translation object.
 * @param {string|null} filename  Downloaded filename, or null if uploaded.
 * @returns {string}
 */
export function renderSuccessHTML(t, filename) {
  const m = t.modal
  const isUpload = filename === null
  const desc = isUpload ? m.success.descriptionUpload : m.success.descriptionDownload(filename)

  return `
    <div class="er_ok">
      <span class="er_ok_icon">✅</span>
      <p class="er_ok_title">${m.success.title}</p>
      <p class="er_ok_desc">${desc}</p>
      <button id="er_done">${m.close}</button>
    </div>
  `
}
