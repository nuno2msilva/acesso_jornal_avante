# Acesso Rápido - Jornal Avante

Portal web minimalista intermediário para acesso rápido à edição atual do Jornal Avante em formato PDF.

## 📋 Descrição

Este projeto é uma aplicação web simples que:
- Extrai os dados diretamente do site oficial ([https://www.avante.pt/](https://www.avante.pt/))
- Obtém automaticamente a informação sobre a edição mais recente do Jornal Avante (nº edição + data) 
- Redireciona automaticamente para o PDF da edição mais atual após curto intervalo (após sucesso)
- Oferece um link manual de redirecionamento após intervalo moderado (caso o redirecionamento automático falhe)
- Totalmente responsivo e otimizado para dispositivos móveis

## 🚀 Funcionalidades

### Principais
- ✅ **Extração automática** de número e data da edição atual
- ✅ **Redirecionamento automático** para o PDF após intervalo curto (após sucesso na obtenção da informação)
- ✅ **Link manual** disponível após intervalo moderado
- ✅ **Fallback CORS** via proxy público (api.allorigins.win)
- ✅ **Timeout de requisição** após intervalo moderadp para evitar esperas infinitas
- ✅ **Tratamento de erros** com mensagens amigáveis ao utilizador
- ✅ **Design responsivo** para mobile e desktop

### Detalhes Técnicos
- Utiliza o seguinte padrão **RegEx** para extrair nº edição e data: `/n\.º\s*([0-9]+)\s*\(([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})\)/i`
- **AbortController** para cancelar verificação após intervalo moderado
- **Fetch API** com fallback automático para proxy CORS
- CSS com **tipografia responsiva** (clamp) e media queries para mobile

## 📁 Estrutura do Projeto

```
avante_v2/
├── index.html       # Estrutura HTML da página
├── script.js        # Lógica de fetch, extração e redirecionamento
├── style.css        # Estilos responsivos e layout
└── README.md        # Este ficheiro
```

## 🛠️ Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Design responsivo com clamp() e flexbox
- **JavaScript (ES6+)** - Fetch API, Promises, AbortController
- **Sem dependências externas** - Projeto standalone, sem frameworks

## 📦 Como Usar

### Opção 1: Clonar e Abrir Localmente

```bash
# Clona o repositório
git clone https://github.com/nuno2msilva/acesso_jornal_avante.git

# Entra na pasta do projeto
cd acesso_jornal_avante

# Abre o index.html diretamente no browser (duplo clique ou comando)
# Linux/macOS:
xdg-open index.html   # ou: open index.html

# Windows:
start index.html
```

**Nota:** O fallback CORS via proxy funcionará automaticamente se necessário.

### Opção 2: Aceder Online (GitHub Pages)

Simplesmente abre o seguinte link:

🔗 **[https://nuno2msilva.github.io/acesso_jornal_avante/](https://nuno2msilva.github.io/acesso_jornal_avante/)**

Esta é a forma mais rápida e não requer instalação ou downloads!

## ⚙️ Configuração

### Tempos de Redirecionamento

Podes ajustar os intervalos de tempo em `script.js`:

```javascript
const TEMPO_REDIRECIONAMENTO_SUCESSO = 2000;  // 2 segundos (redirecionamento automático)
const TEMPO_REDIRECIONAMENTO_MANUAL = 10000;  // 10 segundos (mostra link manual)
const TEMPO_LIMITE_VERIFICACAO = 10000;       // 10 segundos (timeout de verificação)
```

## 📄 Licença

Este projeto é de código aberto e pode ser usado, modificado e distribuído livremente.

---

**Nota:** Este projeto não é afiliado oficialmente com o Jornal Avante. É uma ferramenta independente criada para facilitar o acesso à edição atual.

Desenvolvido com ❤️ para facilitar o acesso ao Jornal Avante.
