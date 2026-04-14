const it = {
  modal: {
    title: 'Segnala un bug',
    description:
      'Tutti i dati acquisiti durante questa sessione verranno automaticamente compressi in un file ZIP.',
    screenshot: {
      label: 'Screenshot',
      subtitle: 'Pagina corrente — PNG',
    },
    consoleLogs: {
      label: 'Log della Console',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} voce${n !== 1 ? 'i' : ''}`,
    },
    networkRequests: {
      label: 'Richieste di Rete',
      subtitle: 'fetch · XHR (richiesta/risposta incluse)',
      badge: (n) => `${n} richiesta${n !== 1 ? 'e' : ''}`,
    },
    systemInfo: {
      label: 'Informazioni di Sistema',
      subtitle: 'Browser · schermo · lingua · fuso orario',
    },
    note: {
      label: 'Descrizione (facoltativa)',
      placeholder: 'Cosa stavi facendo? Cosa è successo?',
    },
    submit: {
      idle: 'Crea e scarica il report',
      idleUpload: 'Crea e carica il report',
      preparing: 'Preparazione…',
    },
    progress: {
      hidingModal: 'Nascondo la finestra per lo screenshot…',
      screenshot: 'Acquisizione della pagina in corso…',
      compilingLogs: 'Compilazione dei log della console…',
      networkRequests: 'Aggiunta delle richieste e risposte di rete…',
      creatingZip: 'Creazione del file ZIP…',
      uploading: 'Caricamento del report…',
      done: 'Completato ✓',
    },
    success: {
      title: 'Report scaricato',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> è stato scaricato. Puoi condividerlo con il tuo team di sviluppo.`,
      descriptionUpload: 'Il tuo report è stato caricato con successo.',
    },
    error: {
      upload: (msg) => `Caricamento fallito: ${msg}`,
      generic: (msg) => `Errore: ${msg}`,
    },
    close: 'Chiudi',
    retry: 'Riprova',
  },
}

export default it
