const ru = {
  modal: {
    title: 'Сообщить об ошибке',
    description: 'Все данные, собранные за эту сессию, будут автоматически упакованы в ZIP-архив.',
    screenshot: {
      label: 'Снимок экрана',
      subtitle: 'Текущая страница — PNG',
    },
    consoleLogs: {
      label: 'Логи консоли',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} запись${n === 1 ? '' : n < 5 ? 'и' : 'ей'}`,
    },
    networkRequests: {
      label: 'Сетевые запросы',
      subtitle: 'fetch · XHR (запрос/ответ включены)',
      badge: (n) => `${n} запрос${n === 1 ? '' : n < 5 ? 'а' : 'ов'}`,
    },
    systemInfo: {
      label: 'Системная информация',
      subtitle: 'Браузер · экран · язык · часовой пояс',
    },
    note: {
      label: 'Описание (необязательно)',
      placeholder: 'Что вы делали? Что произошло?',
    },
    submit: {
      idle: 'Создать и скачать отчёт',
      idleUpload: 'Создать и отправить отчёт',
      preparing: 'Подготовка…',
    },
    progress: {
      hidingModal: 'Скрытие окна для снимка экрана…',
      screenshot: 'Захват страницы…',
      compilingLogs: 'Компиляция логов консоли…',
      networkRequests: 'Добавление сетевых запросов и ответов…',
      creatingZip: 'Создание ZIP-архива…',
      uploading: 'Отправка отчёта…',
      done: 'Готово ✓',
    },
    success: {
      title: 'Отчёт скачан',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> был скачан. Вы можете поделиться им с командой разработчиков.`,
      descriptionUpload: 'Ваш отчёт успешно отправлен.',
    },
    error: {
      upload: (msg) => `Ошибка загрузки: ${msg}`,
      generic: (msg) => `Ошибка: ${msg}`,
    },
    close: 'Закрыть',
    retry: 'Попробовать снова',
  },
}

export default ru
