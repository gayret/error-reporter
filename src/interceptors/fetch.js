import { getTimestampString } from '../utils.js'

/**
 * Parses a Fetch Response body into a structured object.
 * @param {Response} response
 * @param {Response} cloneResponse
 * @returns {Promise<{type: string, data: any, blobType?: string, size?: number}>}
 */
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
        data: text.length > 10000 ? text.substring(0, 10000) + '… (truncated)' : text,
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
    return { type: 'error', data: 'Could not read response body: ' + err.message }
  }
}

/**
 * Intercepts window.fetch and records request/response details into the store.
 * Returns a restore function that reverts the patch.
 *
 * @param {{ networkRequests: Array }} store
 * @returns {{ restore: () => void }}
 */
export function interceptFetch(store) {
  const _fetch = window.fetch

  window.fetch = async function (input, init = {}) {
    const url = typeof input === 'string' ? input : (input?.url ?? '')
    const method = (init.method ?? 'GET').toUpperCase()
    const start = Date.now()

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
      } catch {
        requestBody = '[Could not read body]'
      }
    }

    const entry = {
      type: 'fetch',
      time: getTimestampString(),
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

      const headers = {}
      res.headers.forEach((value, key) => {
        headers[key] = value
      })
      entry.responseHeaders = headers

      entry.responseBody = await parseResponseBody(res, clonedRes)

      return res
    } catch (err) {
      entry.error = err.message
      entry.duration = Date.now() - start
      throw err
    }
  }

  return {
    restore() {
      window.fetch = _fetch
    },
  }
}
