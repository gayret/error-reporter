const ja = {
  modal: {
    title: 'バグを報告',
    description: 'このセッション中に収集されたすべてのデータが自動的にZIPに圧縮されます。',
    screenshot: {
      label: 'スクリーンショット',
      subtitle: '現在のページ — PNG',
    },
    consoleLogs: {
      label: 'コンソールログ',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} 件`,
    },
    networkRequests: {
      label: 'ネットワークリクエスト',
      subtitle: 'fetch · XHR（リクエスト/レスポンス含む）',
      badge: (n) => `${n} 件`,
    },
    systemInfo: {
      label: 'システム情報',
      subtitle: 'ブラウザ · 画面 · 言語 · タイムゾーン',
    },
    note: {
      label: '説明（任意）',
      placeholder: '何をしていましたか？何が起きましたか？',
    },
    submit: {
      idle: 'レポートを作成してダウンロード',
      idleUpload: 'レポートを作成してアップロード',
      preparing: '準備中…',
    },
    progress: {
      hidingModal: 'スクリーンショットのためにモーダルを非表示中…',
      screenshot: 'ページをキャプチャ中…',
      compilingLogs: 'コンソールログをまとめています…',
      networkRequests: 'ネットワークリクエストと応答を追加中…',
      creatingZip: 'ZIPファイルを作成中…',
      uploading: 'レポートをアップロード中…',
      done: '完了 ✓',
    },
    success: {
      title: 'レポートがダウンロードされました',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> がダウンロードされました。開発チームと共有できます。`,
      descriptionUpload: 'レポートが正常にアップロードされました。',
    },
    error: {
      upload: (msg) => `アップロード失敗: ${msg}`,
      generic: (msg) => `エラー: ${msg}`,
    },
    close: '閉じる',
    retry: '再試行',
  },
}

export default ja
