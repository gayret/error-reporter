const tr = {
  modal: {
    title: 'Hata Bildir',
    description: "Bu oturum boyunca yakalanan veriler otomatik olarak ZIP'e paketlenecek.",
    screenshot: {
      label: 'Ekran Görüntüsü',
      subtitle: 'Şu anki sayfa — PNG',
    },
    consoleLogs: {
      label: 'Console Logları',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} kayıt`,
    },
    networkRequests: {
      label: 'Network İstekleri',
      subtitle: 'fetch · XHR (request/response dahil)',
      badge: (n) => `${n} istek`,
    },
    systemInfo: {
      label: 'Sistem Bilgisi',
      subtitle: 'Tarayıcı · ekran · dil · timezone',
    },
    note: {
      label: 'Açıklama (isteğe bağlı)',
      placeholder: 'Ne yapıyordunuz? Ne oldu?',
    },
    submit: {
      idle: 'Rapor Oluştur ve İndir',
      idleUpload: 'Rapor Oluştur ve Yükle',
      preparing: 'Hazırlanıyor…',
    },
    progress: {
      hidingModal: 'Ekran görüntüsü için modal gizleniyor…',
      screenshot: 'Sayfa yakalanıyor…',
      compilingLogs: 'Console logları derleniyor…',
      networkRequests: 'Network istekleri ve yanıtlar ekleniyor…',
      creatingZip: 'ZIP dosyası oluşturuluyor…',
      uploading: 'Rapor yükleniyor…',
      done: 'Tamamlandı ✓',
    },
    success: {
      title: 'Rapor İndirildi',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> indirildi. Geliştirici ekibinizle paylaşabilirsiniz.`,
      descriptionUpload: 'Raporunuz başarıyla yüklendi.',
    },
    error: {
      upload: (msg) => `Yükleme başarısız: ${msg}`,
      generic: (msg) => `Hata: ${msg}`,
    },
    close: 'Kapat',
    retry: 'Tekrar Dene',
  },
}

export default tr
