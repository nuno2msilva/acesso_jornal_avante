# Jornal Avante - Edição Atual

## Descrição

Este script HTML permite aceder automaticamente à edição mais recente do Jornal Avante em formato PDF. O script calcula a edição atual com base na quinta-feira mais recente e redireciona automaticamente para o PDF correspondente.

## Como Funciona

O script:
1. Calcula a quinta-feira mais recente (dia de publicação do jornal)
2. Determina o número da edição atual com base na edição inicial de referência (nº 2534, de 23/06/2022)
3. Constrói o URL do PDF correspondente
4. Verifica se o PDF existe no servidor
5. Redireciona automaticamente para o PDF após 2 segundos (se existir)

## Utilização

1. Abre o ficheiro `avante_edicao_atual.html` num navegador web
2. Aguarda 2 segundos para o redirecionamento automático
3. Se não funcionar automaticamente, clica no link de fallback fornecido

## Configuração

As constantes principais estão definidas no início do script JavaScript:

- **EDICAO_INICIAL**: `2534` (número da edição de referência)
- **DATA_INICIAL**: `23/06/2022` (quinta-feira de publicação da edição inicial)
- **QUINTA_FEIRA**: `4` (dia da semana em que o jornal é publicado)

## Tratamento de Erros

O script trata diferentes cenários:

- **✅ PDF encontrado (200)**: Redireciona automaticamente
- **❌ PDF não encontrado (404)**: Apresenta mensagem de erro
- **⚠️ Outros erros (403, 500, etc.)**: Apresenta status HTTP e mensagem de aviso
- **⚠️ Erro de rede/CORS**: Tenta abrir o PDF na mesma

## Notas

- O script considera que o jornal é publicado às quintas-feiras
- A verificação da hora do dia é feita às 8:00 da manhã
- Os PDFs são obtidos de `https://www.avante.pt/public/pdf/`

## Contacto

Em caso de problemas ou erros no cálculo da edição, contacta o programador.
