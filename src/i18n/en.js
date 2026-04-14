const en = {
  modal: {
    title: 'Report a Bug',
    description: 'All data captured during this session will be packaged into a ZIP automatically.',
    screenshot: {
      label: 'Screenshot',
      subtitle: 'Current page — PNG',
    },
    consoleLogs: {
      label: 'Console Logs',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} record${n !== 1 ? 's' : ''}`,
    },
    networkRequests: {
      label: 'Network Requests',
      subtitle: 'fetch · XHR (request/response included)',
      badge: (n) => `${n} request${n !== 1 ? 's' : ''}`,
    },
    systemInfo: {
      label: 'System Info',
      subtitle: 'Browser · screen · language · timezone',
    },
    note: {
      label: 'Description (optional)',
      placeholder: 'What were you doing? What happened?',
    },
    submit: {
      idle: 'Create & Download Report',
      idleUpload: 'Create & Upload Report',
      preparing: 'Preparing…',
    },
    progress: {
      hidingModal: 'Hiding modal for screenshot…',
      screenshot: 'Capturing the page…',
      compilingLogs: 'Compiling console logs…',
      networkRequests: 'Adding network requests and responses…',
      creatingZip: 'Creating ZIP file…',
      uploading: 'Uploading report…',
      done: 'Done ✓',
    },
    success: {
      title: 'Report Downloaded',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> has been downloaded. You can share it with your development team.`,
      descriptionUpload: 'Your report has been successfully uploaded.',
    },
    error: {
      upload: (msg) => `Upload failed: ${msg}`,
      generic: (msg) => `Error: ${msg}`,
    },
    close: 'Close',
    retry: 'Try Again',
  },
}

export default en
