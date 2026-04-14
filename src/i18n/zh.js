const zh = {
  modal: {
    title: '报告错误',
    description: '本次会话期间捕获的所有数据将自动打包成 ZIP 文件。',
    screenshot: {
      label: '屏幕截图',
      subtitle: '当前页面 — PNG',
    },
    consoleLogs: {
      label: '控制台日志',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} 条记录`,
    },
    networkRequests: {
      label: '网络请求',
      subtitle: 'fetch · XHR（包含请求/响应）',
      badge: (n) => `${n} 个请求`,
    },
    systemInfo: {
      label: '系统信息',
      subtitle: '浏览器 · 屏幕 · 语言 · 时区',
    },
    note: {
      label: '描述（可选）',
      placeholder: '您在做什么？发生了什么？',
    },
    submit: {
      idle: '创建并下载报告',
      idleUpload: '创建并上传报告',
      preparing: '准备中…',
    },
    progress: {
      hidingModal: '正在隐藏窗口以截图…',
      screenshot: '正在捕获页面…',
      compilingLogs: '正在整理控制台日志…',
      networkRequests: '正在添加网络请求和响应…',
      creatingZip: '正在创建 ZIP 文件…',
      uploading: '正在上传报告…',
      done: '完成 ✓',
    },
    success: {
      title: '报告已下载',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> 已下载。您可以将其分享给您的开发团队。`,
      descriptionUpload: '您的报告已成功上传。',
    },
    error: {
      upload: (msg) => `上传失败：${msg}`,
      generic: (msg) => `错误：${msg}`,
    },
    close: '关闭',
    retry: '重试',
  },
}

export default zh
