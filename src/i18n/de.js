const de = {
  modal: {
    title: 'Fehler melden',
    description:
      'Alle in dieser Sitzung erfassten Daten werden automatisch in eine ZIP-Datei verpackt.',
    screenshot: {
      label: 'Screenshot',
      subtitle: 'Aktuelle Seite — PNG',
    },
    consoleLogs: {
      label: 'Konsolenprotokolle',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} Eintrag${n !== 1 ? 'e' : ''}`,
    },
    networkRequests: {
      label: 'Netzwerkanfragen',
      subtitle: 'fetch · XHR (Anfrage/Antwort enthalten)',
      badge: (n) => `${n} Anfrage${n !== 1 ? 'n' : ''}`,
    },
    systemInfo: {
      label: 'Systeminformationen',
      subtitle: 'Browser · Bildschirm · Sprache · Zeitzone',
    },
    note: {
      label: 'Beschreibung (optional)',
      placeholder: 'Was haben Sie gemacht? Was ist passiert?',
    },
    submit: {
      idle: 'Bericht erstellen und herunterladen',
      idleUpload: 'Bericht erstellen und hochladen',
      preparing: 'Wird vorbereitet…',
    },
    progress: {
      hidingModal: 'Modal wird für Screenshot ausgeblendet…',
      screenshot: 'Seite wird erfasst…',
      compilingLogs: 'Konsolenprotokolle werden zusammengestellt…',
      networkRequests: 'Netzwerkanfragen und Antworten werden hinzugefügt…',
      creatingZip: 'ZIP-Datei wird erstellt…',
      uploading: 'Bericht wird hochgeladen…',
      done: 'Fertig ✓',
    },
    success: {
      title: 'Bericht heruntergeladen',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> wurde heruntergeladen. Sie können ihn mit Ihrem Entwicklungsteam teilen.`,
      descriptionUpload: 'Ihr Bericht wurde erfolgreich hochgeladen.',
    },
    error: {
      upload: (msg) => `Hochladen fehlgeschlagen: ${msg}`,
      generic: (msg) => `Fehler: ${msg}`,
    },
    close: 'Schließen',
    retry: 'Erneut versuchen',
  },
}

export default de
