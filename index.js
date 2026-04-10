// Error Report Generator - Works with CTRL+SHIFT+H
// Also records response bodies

;(function () {
  'use strict'

  // Store - veri toplama
  const store = {
    consoleLogs: [],
    networkRequests: [],
    uncaughtErrors: [],
  }

// Auxiliary function for Istanbul time
  function getIstanbulISOString() {
    const date = new Date()
    const istanbulTime = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }))
    const year = istanbulTime.getFullYear()
    const month = String(istanbulTime.getMonth() + 1).padStart(2, '0')
    const day = String(istanbulTime.getDate()).padStart(2, '0')
    const hours = String(istanbulTime.getHours()).padStart(2, '0')
    const minutes = String(istanbulTime.getMinutes()).padStart(2, '0')
    const seconds = String(istanbulTime.getSeconds()).padStart(2, '0')
    const milliseconds = String(istanbulTime.getMilliseconds()).padStart(3, '0')

    // Timezone offset for Istanbul: +03.00
    return `${day}-${month}-${year}T${hours}:${minutes}:${seconds}.${milliseconds}+03:00`
  }

  // Style injection
  const style = document.createElement('style')
  style.textContent = `
    #er_root * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    #er_backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,.5);
      z-index: 999999; display: flex; align-items: center; justify-content: center;
      animation: erfi .15s ease;
    }
    @keyframes erfi { from{opacity:0} to{opacity:1} }
    #er_panel {
      background: #fff; border-radius: 16px; width: 430px; max-width: calc(100vw - 20px);
      max-height: calc(100vh - 40px); overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,.22);
      animation: ersi .2s cubic-bezier(.34,1.56,.64,1);
    }
    @keyframes ersi { from{transform:translateY(12px) scale(.96);opacity:0} to{transform:none;opacity:1} }
    #er_head { padding: 18px 18px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
    #er_head h2 { font-size: 16px; font-weight: 700; color: #111; }
    #er_x {
      background: #f0f0f0; border: none; border-radius: 50%;
      width: 26px; height: 26px; cursor: pointer; font-size: 14px;
      display: flex; align-items: center; justify-content: center; color: #555; flex-shrink: 0;
    }
    #er_x:hover { background: #e4e4e4; }
    #er_body { padding: 14px 18px 20px; }
    .er_desc { font-size: 12.5px; color: #666; line-height: 1.6; margin-bottom: 12px; }
    .er_row {
      display: flex; align-items: center; gap: 9px;
      background: #f6f6f6; border-radius: 9px;
      padding: 9px 11px; margin-bottom: 7px;
    }
    .er_icon { font-size: 17px; flex-shrink: 0; }
    .er_lbl { font-size: 12.5px; font-weight: 600; color: #111; display: block; }
    .er_sub { font-size: 11px; color: #888; }
    .er_badge {
      margin-left: auto; font-size: 11px; font-weight: 700;
      padding: 2px 8px; border-radius: 20px;
      background: #ececec; color: #666; flex-shrink: 0;
    }
    .er_badge.warm { background: #fff0e0; color: #b84000; }
    .er_badge.red  { background: #fee; color: #c00; }
    .er_sep { height: 1px; background: #f0f0f0; margin: 12px 0; }
    .er_note_lbl { font-size: 11.5px; color: #777; display: block; margin-bottom: 5px; }
    #er_note {
      width: 100%; border: 1.5px solid #e4e4e4; border-radius: 8px;
      padding: 9px 11px; font-size: 12.5px; resize: vertical; min-height: 65px;
      outline: none; color: #111; background: #fff;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      transition: border-color .15s;
    }
    #er_note:focus { border-color: #aaa; }
    #er_prog_wrap { background: #f0f0f0; border-radius: 3px; height: 4px; overflow: hidden; margin: 12px 0 5px; display: none; }
    #er_pbar { height: 100%; width: 0%; background: #111; border-radius: 3px; transition: width .3s; }
    #er_status { font-size: 11px; color: #999; min-height: 14px; margin-bottom: 10px; display: none; }
    #er_submit {
      width: 100%; margin-top: 12px; padding: 11px;
      border: none; border-radius: 9px; background: #111; color: #fff;
      font-size: 13.5px; font-weight: 600; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      transition: opacity .15s;
    }
    #er_submit:hover:not(:disabled) { opacity: .86; }
    #er_submit:disabled { opacity: .4; cursor: not-allowed; }
    .er_ok { text-align: center; padding: 6px 0 4px; }
    .er_ok_icon { font-size: 42px; display: block; margin-bottom: 10px; }
    .er_ok_title { font-size: 16px; font-weight: 700; color: #111; margin-bottom: 7px; }
    .er_ok_desc { font-size: 12.5px; color: #666; line-height: 1.65; margin-bottom: 18px; }
    #er_done {
      width: 100%; padding: 10px; border: 1.5px solid #ddd; border-radius: 9px;
      background: transparent; font-size: 13.5px; font-weight: 600; cursor: pointer; color: #111;
    }
    #er_done:hover { background: #f6f6f6; }
  `
  document.head.appendChild(style)

  // Root element
  let root = document.getElementById('er_root')
  if (!root) {
    root = document.createElement('div')
    root.id = 'er_root'
    root.style.display = 'none'
    document.body.appendChild(root)
  }

  // Console intercept
  ;['log', 'info', 'warn', 'error', 'debug'].forEach((level) => {
    const orig = console[level]
    console[level] = function (...args) {
      const msg = args
        .map((a) => {
          try {
            return typeof a === 'object' ? JSON.stringify(a) : String(a)
          } catch {
            return String(a)
          }
        })
        .join(' ')
      store.consoleLogs.push({ level, time: new Date().toISOString(), message: msg })
      orig.apply(console, args)
    }
  })

  // Helper: Parse response body
  async function parseResponseBody(response, cloneResponse) {
    try {
      const contentType = response.headers.get('content-type') || ''

      if (contentType.includes('application/json')) {
        const json = await cloneResponse.json()
        return { type: 'json', data: json }
      } else if (contentType.includes('text/')) {
        const text = await cloneResponse.text()
        return {
          type: 'text',
          data: text.length > 10000 ? text.substring(0, 10000) + '... (kısaltıldı)' : text,
        }
      } else {
        const blob = await cloneResponse.blob()
        return {
          type: 'binary',
          data: `[Binary Data: ${blob.type}, ${blob.size} bytes]`,
          blobType: blob.type,
          size: blob.size,
        }
      }
    } catch (err) {
      return { type: 'error', data: 'Response body okunamadı: ' + err.message }
    }
  }

  // Fetch intercept - Along with the response body
  const _fetch = window.fetch
  window.fetch = async function (input, init = {}) {
    const url = typeof input === 'string' ? input : (input?.url ?? '')
    const method = (init.method ?? 'GET').toUpperCase()
    const start = Date.now()

    // Request body yakalama
    let requestBody = null
    if (init.body) {
      try {
        if (typeof init.body === 'string') {
          requestBody = init.body
        } else if (init.body instanceof FormData) {
          const formDataObj = {}
          init.body.forEach((value, key) => {
            formDataObj[key] = value
          })
          requestBody = JSON.stringify(formDataObj)
        } else {
          requestBody = '[Stream/Binary Data]'
        }
      } catch (e) {
        requestBody = '[Body okunamadı]'
      }
    }

    const entry = {
      type: 'fetch',
      time: getIstanbulISOString(),
      method,
      url,
      requestBody,
      status: null,
      duration: null,
      error: null,
      responseHeaders: null,
      responseBody: null,
    }

    store.networkRequests.push(entry)

    try {
      const res = await _fetch.call(window, input, init)
      const clonedRes = res.clone()

      entry.status = res.status
      entry.duration = Date.now() - start

      // Headers yakalama
      const headers = {}
      res.headers.forEach((value, key) => {
        headers[key] = value
      })
      entry.responseHeaders = headers

      // Response body yakalama
      entry.responseBody = await parseResponseBody(res, clonedRes)

      return res
    } catch (err) {
      entry.error = err.message
      entry.duration = Date.now() - start
      throw err
    }
  }

  // XHR intercept - Along with the response body
  const XHR = XMLHttpRequest.prototype
  const _open = XHR.open
  const _send = XHR.send
  const _setRequestHeader = XHR.setRequestHeader

  XHR.open = function (method, url, ...rest) {
    this._er = {
      type: 'xhr',
      time: getIstanbulISOString(),
      method: method.toUpperCase(),
      url: String(url),
      requestHeaders: {},
      requestBody: null,
      status: null,
      duration: null,
      responseHeaders: null,
      responseBody: null,
    }
    store.networkRequests.push(this._er)
    return _open.call(this, method, url, ...rest)
  }

  XHR.setRequestHeader = function (header, value) {
    if (this._er) {
      this._er.requestHeaders[header] = value
    }
    return _setRequestHeader.call(this, header, value)
  }

  XHR.send = function (body) {
    if (this._er) {
      // Request body yakalama
      if (body) {
        try {
          if (typeof body === 'string') {
            this._er.requestBody = body
          } else if (body instanceof FormData) {
            const formDataObj = {}
            body.forEach((value, key) => {
              formDataObj[key] = value
            })
            this._er.requestBody = JSON.stringify(formDataObj)
          } else if (body instanceof Document) {
            this._er.requestBody = '[XML Document]'
          } else if (body instanceof Blob) {
            this._er.requestBody = `[Blob: ${body.type}, ${body.size} bytes]`
          } else {
            this._er.requestBody = '[Binary/Stream Data]'
          }
        } catch (e) {
          this._er.requestBody = '[Body okunamadı]'
        }
      }

      const start = Date.now()

      // Response handle
      this.addEventListener('loadend', () => {
        if (!this._er) return

        this._er.status = this.status
        this._er.duration = Date.now() - start

        // Response headers handle
        const headers = {}
        const headerStr = this.getAllResponseHeaders()
        headerStr.split('\r\n').forEach((line) => {
          const parts = line.split(': ')
          if (parts.length === 2) {
            headers[parts[0]] = parts[1]
          }
        })
        this._er.responseHeaders = headers

        // Response body handle
        try {
          const contentType = this.getResponseHeader('content-type') || ''

          if (this.responseType === '' || this.responseType === 'text') {
            if (contentType.includes('application/json')) {
              try {
                this._er.responseBody = { type: 'json', data: JSON.parse(this.responseText) }
              } catch {
                this._er.responseBody = { type: 'text', data: this.responseText }
              }
            } else {
              const text = this.responseText
              this._er.responseBody = {
                type: 'text',
                data:
                  text && text.length > 10000
                    ? text.substring(0, 10000) + '... (kısaltıldı)'
                    : text,
              }
            }
          } else if (this.responseType === 'json') {
            this._er.responseBody = { type: 'json', data: this.response }
          } else if (this.responseType === 'blob') {
            this._er.responseBody = {
              type: 'binary',
              data: `[Blob: ${this.response?.type}, ${this.response?.size} bytes]`,
              blobType: this.response?.type,
              size: this.response?.size,
            }
          } else {
            this._er.responseBody = {
              type: 'unknown',
              data: `[Response Type: ${this.responseType}]`,
            }
          }
        } catch (err) {
          this._er.responseBody = { type: 'error', data: 'Response body okunamadı: ' + err.message }
        }
      })
    }
    return _send.call(this, body)
  }

  // Badge class helper
  function badgeClass(n) {
    return n > 5 ? 'red' : n > 0 ? 'warm' : ''
  }

  function openModal() {
    root.style.display = ''
    const cl = store.consoleLogs.length
    const nr = store.networkRequests.length

    root.innerHTML = `
      <div id="er_backdrop">
        <div id="er_panel">
          <div id="er_head">
            <h2>Hata Bildir</h2>
            <button id="er_x">✕</button>
          </div>
          <div id="er_body">
            <p class="er_desc">Bu oturum boyunca yakalanan veriler otomatik olarak ZIP'e paketlenecek.</p>

            <div class="er_row">
              <span class="er_icon">🖥️</span>
              <span><span class="er_lbl">Ekran görüntüsü</span><span class="er_sub">Şu anki sayfa — PNG</span></span>
            </div>
            <div class="er_row">
              <span class="er_icon">📋</span>
              <span><span class="er_lbl">Console logları</span><span class="er_sub">log · info · warn · error · debug</span></span>
              <span class="er_badge ${badgeClass(cl)}">${cl} kayıt</span>
            </div>
            <div class="er_row">
              <span class="er_icon">🌐</span>
              <span><span class="er_lbl">Network istekleri</span><span class="er_sub">fetch · XHR (request/response dahil)</span></span>
              <span class="er_badge ${badgeClass(nr)}">${nr} istek</span>
            </div>
            <div class="er_row">
              <span class="er_icon">ℹ️</span>
              <span><span class="er_lbl">Sistem bilgisi</span><span class="er_sub">Tarayıcı · ekran · dil · timezone</span></span>
            </div>

            <div class="er_sep"></div>
            <label class="er_note_lbl" for="er_note">Açıklama (isteğe bağlı)</label>
            <textarea id="er_note" placeholder="Ne yapıyordunuz? Ne oldu?"></textarea>

            <div id="er_prog_wrap"><div id="er_pbar"></div></div>
            <div id="er_status"></div>

            <button id="er_submit">Rapor Oluştur ve İndir</button>
          </div>
        </div>
      </div>
    `

    const backdrop = root.querySelector('#er_backdrop')
    const xBtn = root.querySelector('#er_x')
    const submit = root.querySelector('#er_submit')
    const noteEl = root.querySelector('#er_note')
    const progWrap = root.querySelector('#er_prog_wrap')
    const pbar = root.querySelector('#er_pbar')
    const statusEl = root.querySelector('#er_status')
    const body = root.querySelector('#er_body')

    function close() {
      root.style.display = 'none'
      root.innerHTML = ''
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close()
    })
    xBtn.addEventListener('click', close)

    function setProgress(pct, txt) {
      progWrap.style.display = 'block'
      statusEl.style.display = 'block'
      pbar.style.width = pct + '%'
      statusEl.textContent = txt
    }

    submit.addEventListener('click', async () => {
      submit.disabled = true
      noteEl.disabled = true
      submit.textContent = 'Hazırlanıyor…'

      try {
        setProgress(10, 'The modal is hidden for screenshot purposes…')
        root.style.visibility = 'hidden'
        await new Promise((r) => setTimeout(r, 80))

        setProgress(30, 'Page is being captured…')

        // html2canvas control
        let hasHtml2Canvas = typeof window.html2canvas !== 'undefined'
        if (!hasHtml2Canvas) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src =
              'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
            script.onload = resolve
            script.onerror = () => reject(new Error('html2canvas yüklenemedi'))
            document.head.appendChild(script)
          })
        }

        const canvas = await html2canvas(document.body, {
          scale: 1,
          useCORS: true,
          logging: false,
          ignoreElements: (el) => el.id === 'er_root',
        })

        root.style.visibility = ''

        setProgress(55, 'Compiling console logs…')
        await new Promise((r) => setTimeout(r, 20))

        setProgress(70, "Network requests and responses are being added…")
        await new Promise((r) => setTimeout(r, 20))

        setProgress(85, 'Creating a ZIP file…')

        // JSZip control
        let hasJSZip = typeof window.JSZip !== 'undefined'
        if (!hasJSZip) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
            script.onload = resolve
            script.onerror = () => reject(new Error('JSZip yüklenemedi'))
            document.head.appendChild(script)
          })
        }

        const zip = new JSZip()
        const ts = getIstanbulISOString().replace(/[:.]/g, '-').slice(0, 19)

        // Screenshot
        zip.file('screenshot.png', canvas.toDataURL('image/png').split(',')[1], { base64: true })

        // Console logs
        const fmtConsole =
          store.consoleLogs
            .map((l) => `[${l.time}] [${l.level.toUpperCase().padEnd(5)}] ${l.message}`)
            .join('\n') || '(kayıt yok)'
        zip.file('console-logs.txt', fmtConsole)
        zip.file('console-logs.json', JSON.stringify(store.consoleLogs, null, 2))

        // Network requests - detail format
        const networkFolder = zip.folder('network-requests')

        // Summary
        const fmtNetwork =
          store.networkRequests
            .map((r, index) => {
              const status = String(r.status ?? 'ERR')
              const duration = r.duration != null ? r.duration + 'ms' : '-'
              return `[${index}] ${r.time} | ${r.method} ${r.url} | ${status} | ${duration}`
            })
            .join('\n') || '(kayıt yok)'
        networkFolder.file('_summary.txt', fmtNetwork)

        // Tam JSON
        networkFolder.file('_full.json', JSON.stringify(store.networkRequests, null, 2))

        // A separate file for each request
        store.networkRequests.forEach((req, index) => {
          const safeUrl = req.url.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50)
          const folderName = `${index}_${req.method}_${safeUrl}`
          const reqFolder = networkFolder.folder(folderName)

          // Request details
          let requestDetails = `${req.method} ${req.url}\n`
          requestDetails += `Time: ${req.time}\n`
          requestDetails += `Type: ${req.type}\n`
          requestDetails += `Duration: ${req.duration}ms\n`
          requestDetails += `Status: ${req.status}\n\n`

          if (req.requestHeaders && Object.keys(req.requestHeaders).length > 0) {
            requestDetails += 'REQUEST HEADERS:\n'
            requestDetails += JSON.stringify(req.requestHeaders, null, 2) + '\n\n'
          }

          if (req.requestBody) {
            requestDetails += 'REQUEST BODY:\n'
            requestDetails +=
              (typeof req.requestBody === 'string'
                ? req.requestBody
                : JSON.stringify(req.requestBody, null, 2)) + '\n\n'
          }

          if (req.responseHeaders && Object.keys(req.responseHeaders).length > 0) {
            requestDetails += 'RESPONSE HEADERS:\n'
            requestDetails += JSON.stringify(req.responseHeaders, null, 2) + '\n\n'
          }

          if (req.responseBody) {
            requestDetails += 'RESPONSE BODY:\n'
            if (req.responseBody.type === 'json') {
              requestDetails += JSON.stringify(req.responseBody.data, null, 2)
            } else {
              requestDetails += String(req.responseBody.data)
            }
          }

          reqFolder.file('details.txt', requestDetails)

          // JSON response varsa ayrı dosya olarak da ekle
          if (req.responseBody && req.responseBody.type === 'json') {
            reqFolder.file('response.json', JSON.stringify(req.responseBody.data, null, 2))
          }

          // Text response
          if (req.responseBody && req.responseBody.type === 'text' && req.responseBody.data) {
            reqFolder.file('response.txt', req.responseBody.data)
          }
        })

        // System info
        const sysInfo = {
          reportTime: getIstanbulISOString(),
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
        const note = noteEl.value.trim()
        if (note) zip.file('user-note.txt', note)

        // create ZIP and download
        const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })
        const filename = `hata-raporu-${ts}.zip`
        const url = URL.createObjectURL(blob)
        const a = Object.assign(document.createElement('a'), { href: url, download: filename })
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setTimeout(() => URL.revokeObjectURL(url), 5000)

        setProgress(100, 'Tamamlandı ✓')
        await new Promise((r) => setTimeout(r, 350))

        body.innerHTML = `
          <div class="er_ok">
            <span class="er_ok_icon">✅</span>
            <p class="er_ok_title">Rapor İndirildi</p>
            <p class="er_ok_desc"><strong>${filename}</strong> indirildi.<br>Geliştirici ekibinizle paylaşabilirsiniz.</p>
            <button id="er_done">Kapat</button>
          </div>
        `
        body.querySelector('#er_done').addEventListener('click', close)
      } catch (err) {
        root.style.visibility = ''
        statusEl.style.color = '#c00'
        setProgress(0, '❌ ' + err.message)
        progWrap.style.display = 'none'
        submit.disabled = false
        submit.textContent = 'Tekrar Dene'
        noteEl.disabled = false
      }
    })

    setTimeout(() => noteEl.focus(), 100)
  }

  // Shortcut
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
      e.preventDefault()
      openModal()
    }
  })
})()
