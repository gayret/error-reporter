import { getTimestampString } from '../utils.js'

/**
 * Intercepts XMLHttpRequest and records request/response details into the store.
 * Returns a restore function that reverts all patched prototype methods.
 *
 * @param {{ networkRequests: Array }} store
 * @returns {{ restore: () => void }}
 */
export function interceptXHR(store) {
  const XHR = XMLHttpRequest.prototype
  const _open = XHR.open
  const _send = XHR.send
  const _setRequestHeader = XHR.setRequestHeader

  XHR.open = function (method, url, ...rest) {
    this._er = {
      type: 'xhr',
      time: getTimestampString(),
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
        } catch {
          this._er.requestBody = '[Could not read body]'
        }
      }

      const start = Date.now()

      this.addEventListener('loadend', () => {
        if (!this._er) return

        this._er.status = this.status
        this._er.duration = Date.now() - start

        const headers = {}
        const headerStr = this.getAllResponseHeaders()
        headerStr.split('\r\n').forEach((line) => {
          const idx = line.indexOf(': ')
          if (idx !== -1) {
            headers[line.slice(0, idx)] = line.slice(idx + 2)
          }
        })
        this._er.responseHeaders = headers

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
                  text && text.length > 10000 ? text.substring(0, 10000) + '… (truncated)' : text,
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
          this._er.responseBody = {
            type: 'error',
            data: 'Could not read response body: ' + err.message,
          }
        }
      })
    }
    return _send.call(this, body)
  }

  return {
    restore() {
      XHR.open = _open
      XHR.send = _send
      XHR.setRequestHeader = _setRequestHeader
    },
  }
}
