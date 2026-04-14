/**
 * Uploads the report ZIP to the developer-configured endpoint via
 * a multipart/form-data POST request. The ZIP is sent under the field
 * name "file".
 *
 * Throws an Error if the server responds with a non-2xx status code.
 *
 * @param {Blob} blob
 * @param {string} filename
 * @param {string} endpoint  Full URL of the upload endpoint.
 * @returns {Promise<void>}
 */
export async function uploadReport(blob, filename, endpoint) {
  const formData = new FormData()
  formData.append('file', blob, filename)

  // Use the native fetch that may have been patched; we need the original to
  // avoid recording this internal upload in the network log.
  const nativeFetch = window.__er_original_fetch__ || window.fetch

  const response = await nativeFetch(endpoint, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }
}
