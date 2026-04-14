const es = {
  modal: {
    title: 'Reportar un error',
    description:
      'Todos los datos capturados durante esta sesión se empaquetarán automáticamente en un ZIP.',
    screenshot: {
      label: 'Captura de pantalla',
      subtitle: 'Página actual — PNG',
    },
    consoleLogs: {
      label: 'Registros de Consola',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} registro${n !== 1 ? 's' : ''}`,
    },
    networkRequests: {
      label: 'Solicitudes de Red',
      subtitle: 'fetch · XHR (solicitud/respuesta incluidas)',
      badge: (n) => `${n} solicitud${n !== 1 ? 'es' : ''}`,
    },
    systemInfo: {
      label: 'Información del Sistema',
      subtitle: 'Navegador · pantalla · idioma · zona horaria',
    },
    note: {
      label: 'Descripción (opcional)',
      placeholder: '¿Qué estabas haciendo? ¿Qué ocurrió?',
    },
    submit: {
      idle: 'Crear y descargar informe',
      idleUpload: 'Crear y subir informe',
      preparing: 'Preparando…',
    },
    progress: {
      hidingModal: 'Ocultando ventana para captura de pantalla…',
      screenshot: 'Capturando la página…',
      compilingLogs: 'Compilando registros de consola…',
      networkRequests: 'Añadiendo solicitudes y respuestas de red…',
      creatingZip: 'Creando archivo ZIP…',
      uploading: 'Subiendo informe…',
      done: 'Completado ✓',
    },
    success: {
      title: 'Informe descargado',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> ha sido descargado. Puedes compartirlo con tu equipo de desarrollo.`,
      descriptionUpload: 'Tu informe se ha subido correctamente.',
    },
    error: {
      upload: (msg) => `Error al subir: ${msg}`,
      generic: (msg) => `Error: ${msg}`,
    },
    close: 'Cerrar',
    retry: 'Reintentar',
  },
}

export default es
