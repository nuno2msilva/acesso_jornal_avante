// REGEX do padrão da informação sobre a edição e data atual, disponível em https://www.avante.pt/
const padraoInfoRemota = /n\.º\s*([0-9]+)\s*\(([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})\)/i;

const numeroEdicaoRemota = document.getElementById('numeroEdicao'); // Número da edição atual (remoto)
const dataEdicaoRemota = document.getElementById('dataEdicao'); // Data da edição atual (remoto)
const conteudoPrincipal = document.getElementById('conteudoPrincipal'); // DIV onde apresenta a informação nesta página
const redirecionamentoManual = document.getElementById('redirecionamentoManual'); // Link de redirecionamento manual

const urlAvante = 'https://www.avante.pt/'; // Página oficial do Avante
const urlProxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(urlAvante); // Proxy para evitar problemas de CORS
const TEMPO_REDIRECIONAMENTO_SUCESSO = 2000; // Tempo de graça antes do redirecionamento automático para o jornal
const TEMPO_REDIRECIONAMENTO_MANUAL = 10000; // Tempo de graça antes de mostrar o link de redirecionamento manual
const TEMPO_LIMITE_VERIFICACAO = 10000; // Tempo de limite para a verificação (timeout)

// Função para obter a informação remota com timeout
function obterInformacao(url) {
  const limiteVerificador = new AbortController();
  const timeoutId = setTimeout(() => limiteVerificador.abort(), TEMPO_LIMITE_VERIFICACAO);

  // Realiza o fetch com o sinal de abortamento
  return fetch(url, { signal: limiteVerificador.signal })
    .then(resposta => {
      clearTimeout(timeoutId);
      if (resposta.ok) return resposta.text();
      throw new Error('HTTP ' + resposta.status);
    })
    .catch(erro => {
      clearTimeout(timeoutId);
      if (erro.name === 'AbortError') {
        throw new Error('Timeout ao tentar obter a informação sobre a edição atual.');
      }
      throw erro;
    });
}

// Função para apresentar mensagem de erro
function apresentarErro() {
  conteudoPrincipal.innerHTML = '<p>Ocorreu um erro ao obter a informação sobre a edição mais recente.<br> Atualiza a página ou tenta mais tarde!</p>';
}

// Função para redirecionar para a edição atual, com informação obtida remotamente do site oficial
function redirecionarParaEdicao(numeroEdicao) {
  const urlPdf = `https://www.avante.pt/public/pdf/${numeroEdicao}_avante.pdf`;
  
  // Após 2 segundos, redireciona automaticamente para o PDF da edição atual
  setTimeout(() => {
    window.location.href = urlPdf;
  }, TEMPO_REDIRECIONAMENTO_SUCESSO);
  
  // Após 10 segundos, mostra o link de redirecionamento manual
  setTimeout(() => {
    redirecionamentoManual.innerHTML = '<a href="' + urlPdf + '" class="linkRedirecionamento">Clica aqui se não redirecionar automaticamente!</a>';
  }, TEMPO_REDIRECIONAMENTO_MANUAL);
}

// Inicia o processo de obtenção da informação remota
obterInformacao(urlAvante)
  .catch(() => obterInformacao(urlProxy))
  .then(conteudoHtml => {
    const correspondencia = padraoInfoRemota.exec(conteudoHtml);
    if (!correspondencia) throw new Error('Informação sobre a edição atual não encontrada na página (padrão REGEX).');
    
    // Extrai o número da edição e a data
    const numeroEdicao = correspondencia[1];
    const dataEdicao = correspondencia[2];
    
    // Atualiza o conteúdo na página com a informação obtida remotamente
    numeroEdicaoRemota.textContent = numeroEdicao;
    dataEdicaoRemota.textContent = dataEdicao;
    
    // Inicia o redirecionamento para a edição atual
    redirecionarParaEdicao(numeroEdicao);
  })
  .catch(() => apresentarErro()); // Apresenta mensagem de erro em caso de falha