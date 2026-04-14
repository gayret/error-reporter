const ar = {
  modal: {
    title: 'الإبلاغ عن خطأ',
    description: 'سيتم تعبئة جميع البيانات المُجمَّعة خلال هذه الجلسة تلقائياً في ملف ZIP.',
    screenshot: {
      label: 'لقطة الشاشة',
      subtitle: 'الصفحة الحالية — PNG',
    },
    consoleLogs: {
      label: 'سجلات وحدة التحكم',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} سجل`,
    },
    networkRequests: {
      label: 'طلبات الشبكة',
      subtitle: 'fetch · XHR (يشمل الطلب/الاستجابة)',
      badge: (n) => `${n} طلب`,
    },
    systemInfo: {
      label: 'معلومات النظام',
      subtitle: 'المتصفح · الشاشة · اللغة · المنطقة الزمنية',
    },
    note: {
      label: 'الوصف (اختياري)',
      placeholder: 'ماذا كنت تفعل؟ ماذا произошло؟',
    },
    submit: {
      idle: 'إنشاء التقرير وتنزيله',
      idleUpload: 'إنشاء التقرير ورفعه',
      preparing: '…جارٍ التحضير',
    },
    progress: {
      hidingModal: '…إخفاء النافذة لأخذ لقطة الشاشة',
      screenshot: '…جارٍ التقاط الصفحة',
      compilingLogs: '…جارٍ تجميع سجلات وحدة التحكم',
      networkRequests: '…جارٍ إضافة طلبات واستجابات الشبكة',
      creatingZip: '…جارٍ إنشاء ملف ZIP',
      uploading: '…جارٍ رفع التقرير',
      done: '✓ اكتمل',
    },
    success: {
      title: 'تم تنزيل التقرير',
      descriptionDownload: (filename) =>
        `تم تنزيل <strong>${filename}</strong>. يمكنك مشاركته مع فريق التطوير.`,
      descriptionUpload: 'تم رفع تقريرك بنجاح.',
    },
    error: {
      upload: (msg) => `فشل الرفع: ${msg}`,
      generic: (msg) => `خطأ: ${msg}`,
    },
    close: 'إغلاق',
    retry: 'إعادة المحاولة',
  },
}

export default ar
