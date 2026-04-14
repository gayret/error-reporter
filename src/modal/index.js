import { getTranslations } from '../i18n/index.js'
import { styles } from './styles.js'
import { renderModalHTML, renderSuccessHTML } from './renderer.js'
import { buildReport } from '../report/builder.js'
import { downloadBlob } from '../report/downloader.js'
import { uploadReport } from '../report/uploader.js'

let rootEl = null
let styleEl = null

/**
 * Injects the modal stylesheet once per page.
 */
function ensureStyles() {
  if (styleEl) return
  styleEl = document.createElement('style')
  styleEl.textContent = styles
  document.head.appendChild(styleEl)
}

/**
 * Ensures the root mount element exists in the DOM.
 */
function ensureRoot() {
  if (rootEl) return
  rootEl = document.getElementById('er_root')
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.id = 'er_root'
    rootEl.style.display = 'none'
    document.body.appendChild(rootEl)
  }
}

/**
 * Opens the error reporter modal.
 *
 * @param {{ consoleLogs: Array, networkRequests: Array }} store
 * @param {{ language: string, uploadEndpoint: string|null }} config
 */
export function openModal(store, config) {
  ensureStyles()
  ensureRoot()

  const t = getTranslations(config.language)
  const hasUpload = Boolean(config.uploadEndpoint)

  rootEl.style.display = ''
  rootEl.innerHTML = renderModalHTML(t, store, hasUpload)

  const backdrop = rootEl.querySelector('#er_backdrop')
  const xBtn = rootEl.querySelector('#er_x')
  const submitBtn = rootEl.querySelector('#er_submit')
  const noteEl = rootEl.querySelector('#er_note')
  const progWrap = rootEl.querySelector('#er_prog_wrap')
  const pbar = rootEl.querySelector('#er_pbar')
  const statusEl = rootEl.querySelector('#er_status')
  const bodyEl = rootEl.querySelector('#er_body')

  function close() {
    rootEl.style.display = 'none'
    rootEl.innerHTML = ''
  }

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close()
  })
  xBtn.addEventListener('click', close)

  function setProgress(pct, key) {
    const text = t.modal.progress[key] ?? key
    progWrap.style.display = 'block'
    statusEl.style.display = 'block'
    pbar.style.width = pct + '%'
    statusEl.textContent = text
  }

  submitBtn.addEventListener('click', async () => {
    submitBtn.disabled = true
    noteEl.disabled = true
    submitBtn.textContent = t.modal.submit.preparing

    try {
      // Hide modal before screenshot
      rootEl.style.visibility = 'hidden'
      setProgress(10, 'hidingModal')

      const { blob, filename } = await buildReport(store, noteEl.value, (pct, key) => {
        if (key === 'hidingModal') return // already set above
        // Restore visibility after screenshot step
        if (key === 'compilingLogs') {
          rootEl.style.visibility = ''
        }
        setProgress(pct, key)
      })

      // Ensure modal is visible again (in case of early error)
      rootEl.style.visibility = ''

      if (hasUpload) {
        setProgress(90, 'uploading')
        await uploadReport(blob, filename, config.uploadEndpoint)
        setProgress(100, 'done')
        await new Promise((r) => setTimeout(r, 350))
        bodyEl.innerHTML = renderSuccessHTML(t, null)
      } else {
        downloadBlob(blob, filename)
        setProgress(100, 'done')
        await new Promise((r) => setTimeout(r, 350))
        bodyEl.innerHTML = renderSuccessHTML(t, filename)
      }

      bodyEl.querySelector('#er_done').addEventListener('click', close)
    } catch (err) {
      rootEl.style.visibility = ''
      statusEl.style.color = '#c00'
      const errMsg = err.message?.includes('HTTP')
        ? t.modal.error.upload(err.message)
        : t.modal.error.generic(err.message)
      progWrap.style.display = 'none'
      statusEl.style.display = 'block'
      statusEl.textContent = '❌ ' + errMsg
      submitBtn.disabled = false
      submitBtn.textContent = t.modal.retry
      noteEl.disabled = false
    }
  })

  setTimeout(() => noteEl.focus(), 100)
}
