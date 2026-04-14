import JSZip from 'jszip'
import { getTimestampString, getTimestampForFilename } from '../utils.js'

/**
 * Captures a screenshot of the current page using html2canvas.
 * The element with id="er_root" is excluded.
 * @returns {Promise<HTMLCanvasElement>}
 */
async function captureScreenshot() {
  // Dynamically import to keep the initial bundle lighter when html2canvas
  // is bundled by the consumer's own toolchain.
  const html2canvas = (await import('html2canvas')).default
  return html2canvas(document.body, {
    scale: 1,
    useCORS: true,
    logging: false,
    ignoreElements: (el) => el.id === 'er_root',
  })
}

/**
 * Builds a ZIP blob containing the full error report.
 *
 * @param {{ consoleLogs: Array, networkRequests: Array }} store
 * @param {string} note   Optional user-supplied note text.
 * @param {(pct: number, text: string) => void} onProgress  Progress callback.
 * @returns {Promise<{ blob: Blob, filename: string }>}
 */
export async function buildReport(store, note, onProgress = () => {}) {
  onProgress(10, 'hidingModal')

  // Caller is responsible for hiding the modal before calling this function.
  await new Promise((r) => setTimeout(r, 80))

  onProgress(30, 'screenshot')
  const canvas = await captureScreenshot()

  onProgress(55, 'compilingLogs')
  await new Promise((r) => setTimeout(r, 20))

  onProgress(70, 'networkRequests')
  await new Promise((r) => setTimeout(r, 20))

  onProgress(85, 'creatingZip')

  const zip = new JSZip()
  const ts = getTimestampForFilename()

  // Screenshot
  zip.file('screenshot.png', canvas.toDataURL('image/png').split(',')[1], { base64: true })

  // Console logs
  const fmtConsole =
    store.consoleLogs
      .map((l) => `[${l.time}] [${l.level.toUpperCase().padEnd(5)}] ${l.message}`)
      .join('\n') || '(no records)'
  zip.file('console-logs.txt', fmtConsole)
  zip.file('console-logs.json', JSON.stringify(store.consoleLogs, null, 2))

  // Network requests
  const networkFolder = zip.folder('network-requests')

  const fmtNetwork =
    store.networkRequests
      .map((r, i) => {
        const status = String(r.status ?? 'ERR')
        const duration = r.duration != null ? r.duration + 'ms' : '-'
        return `[${i}] ${r.time} | ${r.method} ${r.url} | ${status} | ${duration}`
      })
      .join('\n') || '(no records)'
  networkFolder.file('_summary.txt', fmtNetwork)
  networkFolder.file('_full.json', JSON.stringify(store.networkRequests, null, 2))

  store.networkRequests.forEach((req, index) => {
    const safeUrl = req.url.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50)
    const folderName = `${index}_${req.method}_${safeUrl}`
    const reqFolder = networkFolder.folder(folderName)

    let details = `${req.method} ${req.url}\n`
    details += `Time: ${req.time}\n`
    details += `Type: ${req.type}\n`
    details += `Duration: ${req.duration != null ? req.duration + 'ms' : '-'}\n`
    details += `Status: ${req.status != null ? req.status : 'ERR'}\n\n`

    if (req.requestHeaders && Object.keys(req.requestHeaders).length > 0) {
      details += 'REQUEST HEADERS:\n' + JSON.stringify(req.requestHeaders, null, 2) + '\n\n'
    }

    if (req.requestBody) {
      details +=
        'REQUEST BODY:\n' +
        (typeof req.requestBody === 'string'
          ? req.requestBody
          : JSON.stringify(req.requestBody, null, 2)) +
        '\n\n'
    }

    if (req.responseHeaders && Object.keys(req.responseHeaders).length > 0) {
      details += 'RESPONSE HEADERS:\n' + JSON.stringify(req.responseHeaders, null, 2) + '\n\n'
    }

    if (req.responseBody) {
      details += 'RESPONSE BODY:\n'
      details +=
        req.responseBody.type === 'json'
          ? JSON.stringify(req.responseBody.data, null, 2)
          : String(req.responseBody.data)
    }

    reqFolder.file('details.txt', details)

    if (req.responseBody?.type === 'json') {
      reqFolder.file('response.json', JSON.stringify(req.responseBody.data, null, 2))
    }
    if (req.responseBody?.type === 'text' && req.responseBody.data) {
      reqFolder.file('response.txt', req.responseBody.data)
    }
  })

  // System info
  const sysInfo = {
    reportTime: getTimestampString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    consoleLogCount: store.consoleLogs.length,
    networkRequestCount: store.networkRequests.length,
  }
  zip.file('system-info.json', JSON.stringify(sysInfo, null, 2))

  // User note
  if (note && note.trim()) {
    zip.file('user-note.txt', note.trim())
  }

  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
  const filename = `error-report-${ts}.zip`

  return { blob, filename }
}
