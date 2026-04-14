/**
 * Creates a fresh mutable data store for a reporter instance.
 * @returns {{ consoleLogs: Array, networkRequests: Array }}
 */
export function createStore() {
  return {
    consoleLogs: [],
    networkRequests: [],
  }
}
