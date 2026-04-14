const fr = {
  modal: {
    title: 'Signaler un bug',
    description:
      'Toutes les données capturées pendant cette session seront automatiquement empaquetées dans un ZIP.',
    screenshot: {
      label: "Capture d'écran",
      subtitle: 'Page actuelle — PNG',
    },
    consoleLogs: {
      label: 'Journaux Console',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} entrée${n !== 1 ? 's' : ''}`,
    },
    networkRequests: {
      label: 'Requêtes Réseau',
      subtitle: 'fetch · XHR (requête/réponse incluses)',
      badge: (n) => `${n} requête${n !== 1 ? 's' : ''}`,
    },
    systemInfo: {
      label: 'Informations Système',
      subtitle: 'Navigateur · écran · langue · fuseau horaire',
    },
    note: {
      label: 'Description (optionnelle)',
      placeholder: "Que faisiez-vous ? Que s'est-il passé ?",
    },
    submit: {
      idle: 'Créer et télécharger le rapport',
      idleUpload: 'Créer et envoyer le rapport',
      preparing: 'Préparation…',
    },
    progress: {
      hidingModal: 'Masquage de la fenêtre pour la capture…',
      screenshot: 'Capture de la page en cours…',
      compilingLogs: 'Compilation des journaux console…',
      networkRequests: 'Ajout des requêtes et réponses réseau…',
      creatingZip: 'Création du fichier ZIP…',
      uploading: 'Envoi du rapport…',
      done: 'Terminé ✓',
    },
    success: {
      title: 'Rapport téléchargé',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> a été téléchargé. Vous pouvez le partager avec votre équipe de développement.`,
      descriptionUpload: 'Votre rapport a été envoyé avec succès.',
    },
    error: {
      upload: (msg) => `Échec de l'envoi : ${msg}`,
      generic: (msg) => `Erreur : ${msg}`,
    },
    close: 'Fermer',
    retry: 'Réessayer',
  },
}

export default fr
