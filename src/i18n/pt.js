const pt = {
  modal: {
    title: 'Reportar um erro',
    description:
      'Todos os dados capturados durante esta sessão serão automaticamente empacotados num ZIP.',
    screenshot: {
      label: 'Captura de ecrã',
      subtitle: 'Página atual — PNG',
    },
    consoleLogs: {
      label: 'Registos de Consola',
      subtitle: 'log · info · warn · error · debug',
      badge: (n) => `${n} registo${n !== 1 ? 's' : ''}`,
    },
    networkRequests: {
      label: 'Pedidos de Rede',
      subtitle: 'fetch · XHR (pedido/resposta incluídos)',
      badge: (n) => `${n} pedido${n !== 1 ? 's' : ''}`,
    },
    systemInfo: {
      label: 'Informação do Sistema',
      subtitle: 'Navegador · ecrã · idioma · fuso horário',
    },
    note: {
      label: 'Descrição (opcional)',
      placeholder: 'O que estava a fazer? O que aconteceu?',
    },
    submit: {
      idle: 'Criar e descarregar relatório',
      idleUpload: 'Criar e enviar relatório',
      preparing: 'A preparar…',
    },
    progress: {
      hidingModal: 'A ocultar janela para captura de ecrã…',
      screenshot: 'A capturar a página…',
      compilingLogs: 'A compilar registos de consola…',
      networkRequests: 'A adicionar pedidos e respostas de rede…',
      creatingZip: 'A criar ficheiro ZIP…',
      uploading: 'A enviar relatório…',
      done: 'Concluído ✓',
    },
    success: {
      title: 'Relatório descarregado',
      descriptionDownload: (filename) =>
        `<strong>${filename}</strong> foi descarregado. Pode partilhá-lo com a sua equipa de desenvolvimento.`,
      descriptionUpload: 'O seu relatório foi enviado com sucesso.',
    },
    error: {
      upload: (msg) => `Falha no envio: ${msg}`,
      generic: (msg) => `Erro: ${msg}`,
    },
    close: 'Fechar',
    retry: 'Tentar novamente',
  },
}

export default pt
