<p align="center">
  <img src="assets/img/pet-logo-branca.png" height="90" alt="PET-Saúde" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/img/cerest-logo-branca.png" height="90" alt="CEREST" />
</p>

<h1 align="center">Assistente SINAN</h1>

<p align="center">
  <strong>Preencha fichas do SINAN sem dor de cabeça — direto no navegador, sem instalar nada.</strong>
</p>

<p align="center">
  <a href="https://github.com/hiagowms/assistente-sinan/stargazers"><img src="https://img.shields.io/github/stars/hiagowms/assistente-sinan?style=flat&color=yellow" alt="Stars"></a>
  <a href="https://github.com/hiagowms/assistente-sinan/commits/main"><img src="https://img.shields.io/github/last-commit/hiagowms/assistente-sinan?style=flat" alt="Last Commit"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/hiagowms/assistente-sinan?style=flat" alt="License"></a>
  <img src="https://img.shields.io/badge/build-zero-blue?style=flat" alt="Zero build">
  <img src="https://img.shields.io/badge/offline-first-success?style=flat" alt="Offline first">
  <img src="https://img.shields.io/badge/LGPD-compliant-brightgreen?style=flat" alt="LGPD">
</p>

<p align="center">
  <a href="#-para-quem-é">Para quem é</a> •
  <a href="#-fichas-suportadas">Fichas</a> •
  <a href="#-como-usar">Como usar</a> •
  <a href="#-arquitetura-técnica">Arquitetura</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-privacidade--lgpd">LGPD</a>
</p>

---

**Assistente SINAN** é uma aplicação web **100% client-side** que ajuda profissionais de saúde do **PET-Saúde / I&SD** a preencher as fichas de notificação do **SINAN NET** (Sistema de Informação de Agravos de Notificação). Você abre o site, preenche um formulário guiado com validação em tempo real, autocomplete de tabelas oficiais (município, UF, CBO, CNAE, CID-10) — e baixa o PDF editável da ficha já preenchido, pronto para entregar.

Nada é enviado para servidor. Tudo roda no seu navegador.

---

## 🩺 Para quem é

- **Profissionais de saúde** (médicos, enfermeiros, técnicos) que preenchem fichas SINAN no dia a dia.
- **Equipes do CEREST** e da Vigilância em Saúde do Trabalhador.
- **Estudantes do PET-Saúde / Interprofissionalidade & Saúde Digital (I&SD)** usando casos didáticos.
- Qualquer um que precise gerar um PDF SINAN preenchido **sem digitar campo a campo no Adobe Reader**.

## 📋 Fichas suportadas

11 assistentes, cobrindo as principais notificações de **Saúde do Trabalhador (DRT)** e o agravo de **Violência Interpessoal/Autoprovocada**:

| Categoria | Ficha | Arquivo |
|---|---|---|
| 🟣 Violência | Violência Interpessoal/Autoprovocada | `sinan_violencia.html` |
| 🟠 Acidente | Acidente de Trabalho Grave | `sinan_acidente.html` |
| 🟣 Biológico | Acidente de Trabalho com Material Biológico | `sinan_acidente_biologico.html` |
| 🟤 Intoxicação | Intoxicação Exógena | `sinan_intoxicacao.html` |
| 🔵 DRT | LER/DORT | `sinan_lerdort.html` |
| 🔵 DRT | Transtornos Mentais Relacionados ao Trabalho | `sinan_transtornos.html` |
| 🔵 DRT | PAIR (Perda Auditiva Induzida por Ruído) | `sinan_pair.html` |
| 🔵 DRT | Pneumoconioses | `sinan_pneumoconioses.html` |
| 🔵 DRT | Dermatoses Ocupacionais | `sinan_dermatoses.html` |
| 🔵 DRT | Câncer Relacionado ao Trabalho | `sinan_cancer.html` |
| 🔵 DRT | Distúrbios de Voz Relacionados ao Trabalho | `sinan_disturbios_voz.html` |

Cada ficha tem um PDF AcroForm oficial em `fichas/*_editavel.pdf` e um mapeamento autoritativo de campos em `fichas/*_editavel.md`.

## 🚀 Como usar

### Pela web (recomendado)

Hospede em qualquer servidor estático (GitHub Pages, Netlify, Vercel, Apache, Nginx). Não precisa de backend.

### Localmente

```bash
git clone https://github.com/hiagowms/assistente-sinan.git
cd assistente-sinan

# qualquer servidor HTTP estático serve:
python -m http.server 8000
# ou
npx serve .
```

Abra `http://localhost:8000` no navegador. Pronto.

> **Por que servidor HTTP e não abrir o `index.html` direto?**
> O navegador bloqueia leitura de PDFs locais via `file://`. Qualquer servidor estático resolve.

### Fluxo de uso

1. Abra o hub (`index.html`) e escolha a ficha.
2. Preencha o formulário guiado — autocomplete e validação em tempo real.
3. **Importar dados da Receita Federal** (fichas DRT): cole o texto do comprovante CNPJ → CNAE, razão social e endereço são preenchidos automaticamente.
4. Clique **Gerar PDF** → baixa o PDF preenchido (mantém AcroForms editáveis).
5. Opcional: **Transferir dados** entre fichas (paciente atendido em múltiplos agravos) ou carregar **paciente fictício** para fins didáticos.

## ⚙️ Arquitetura técnica

```
┌──────────────────────────────────────────────────────────┐
│  ZERO BUILD       ████████████  HTML + CSS + JS vanilla  │
│  ZERO FRAMEWORK   ████████████  Sem React/Vue/Angular    │
│  ZERO BACKEND     ████████████  100% client-side         │
│  ZERO TRACKING    ████████████  Sem GA, GTM, telemetria  │
│  OFFLINE-FIRST    ████████████  Todas libs em lib/       │
└──────────────────────────────────────────────────────────┘
```

| Camada | Tecnologia | Função |
|---|---|---|
| Interface | HTML5 + CSS3 (Grid/Flex, dark mode) | Layout responsivo mobile-first, breakpoint 768px |
| Lógica | JavaScript ES2017+ vanilla | Validação, autocomplete, conditionals, transferência |
| Geração de PDF | [`pdf-lib`](https://pdf-lib.js.org/) (local em `lib/`) | Carrega PDF AcroForm, preenche campos, devolve blob |
| Leitura de PDF | [`pdf.js`](https://mozilla.github.io/pdf.js/) (local em `lib/`) | Usado por `rf_parser.js` para Receita Federal |
| Tabelas SINAN | JS arrays globais em `data/*.js` | UFs, municípios IBGE, CBO + sinônimos, CNAE, agravos, CID-10 |
| Persistência | `localStorage` + `sessionStorage` | Tema dark/light, transferência entre fichas |

### Módulos compartilhados

Para evitar duplicação (~70-80% do código era boilerplate), três arquivos são reaproveitados por todas as fichas:

- **`shared.css`** — reset, header, progress bar, formulário, pills, autocomplete, toasts, modais, dark mode, painel da Receita Federal.
- **`shared.js`** — caps lock (uppercase + sem acento, padrão SINAN NET), pill toggle, autocomplete (municípios, CID-10, CNAE, CBO+sinônimos), cálculo automático de idade, modais de validação, gamificação de progresso, transferência entre fichas, menu de pacientes fictícios.
- **`rf_parser.js`** — parser do **Comprovante de Inscrição e de Situação Cadastral** da Receita Federal. Duas camadas:
  - Parser genérico (`window.RFParser.parse(text)`) → objeto com `cnpj`, `nomeEmpresarial`, `cnaePrincipal`, `cnaesSecundarios`, `endereco`, `situacaoCadastral`, etc.
  - Integração SINAN (apenas em fichas DRT com `#rf-panel`).

Cada ficha define seus **globals de configuração** (`window.FICHA_NOME`, `window.FICHA_PROG_CONFIG`, `window.FAKE_PATIENTS`, hooks `_applyVisibility`/`_onPostClearForm`, etc.) antes de carregar `shared.js`. Detalhes em [`CLAUDE.md`](./CLAUDE.md).

### Padrões SINAN respeitados

- **Pills com valores numéricos**: campos como Gestante (`1=1ºTrimestre`...`9=Ignorado`), Escolaridade (`0=Analfabeto`...`10=Não se aplica`), unidades de tempo (`1=Hora`, `2=Dia`, `3=Mês`, `4=Ano`).
- **Caps lock automático**: campos com `data-caps` forçam uppercase e removem acentos (exigência do SINAN NET).
- **Sem abreviações**: rótulos sempre por extenso ("Ensino Fundamental completo", nunca "EF completo").
- **Campos geo e código de logradouro nunca no HTML**: ficam em branco no PDF (preenchimento manual posterior, se necessário).

## 📁 Estrutura do projeto

```
assistente-sinan/
├── index.html                       Hub central (catálogo de fichas em cards)
├── sinan_violencia.html             Violência Interpessoal/Autoprovocada
├── sinan_acidente.html              Acidente de Trabalho Grave
├── sinan_acidente_biologico.html    Acidente com Material Biológico
├── sinan_intoxicacao.html           Intoxicação Exógena
├── sinan_lerdort.html               LER/DORT
├── sinan_transtornos.html           Transtornos Mentais
├── sinan_pair.html                  PAIR (Perda Auditiva)
├── sinan_pneumoconioses.html        Pneumoconioses
├── sinan_dermatoses.html            Dermatoses Ocupacionais
├── sinan_cancer.html                Câncer Relacionado ao Trabalho
├── sinan_disturbios_voz.html        Distúrbios de Voz
│
├── shared.css                       CSS compartilhado por todas as fichas
├── shared.js                        JS compartilhado por todas as fichas
├── rf_parser.js                     Parser CNPJ/Receita Federal
│
├── fichas/                          PDFs editáveis (AcroForms) + .md de mapeamento
│   ├── DRT_*_editavel.pdf
│   └── DRT_*_editavel.md            ← fonte autoritativa de campos AcroForm
│
├── data/                            Tabelas SINAN offline
│   ├── tb_uf.js                     Unidades Federativas
│   ├── tb_municipios.js             Municípios IBGE
│   ├── tb_ocupacao.js               CBO
│   ├── cbo_sinonimos_map.js         Sinônimos para autocomplete de CBO
│   ├── tb_cnae.js                   CNAE
│   ├── tb_agravo.js                 Agravos
│   ├── tb_regiao.js                 Regiões
│   └── casos/                       Casos didáticos (pacientes fictícios)
│
├── lib/                             Bibliotecas locais (offline-first)
│   ├── pdf-lib.min.js
│   ├── pdf.min.js
│   └── pdf.worker.min.js
│
├── assets/img/                      Logos PET-Saúde / CEREST
├── CLAUDE.md                        Guia técnico (convenções, padrões)
├── LICENSE                          MIT
└── README.md                        (este arquivo)
```

## 🔒 Privacidade & LGPD

A aplicação lida com **dados pessoais sensíveis de saúde**. Por isso:

- ✅ **100% client-side** — nenhum dado sai do navegador.
- ✅ **Sem Google Analytics, sem GTM, sem trackers** de terceiros.
- ✅ **Sem cookies** de rastreamento (`localStorage` apenas para tema dark/light).
- ✅ **Sem CDNs externas** — todas as bibliotecas (`pdf-lib`, `pdf.js`) ficam em `lib/`.
- ✅ **Sem chamadas de rede** após o load inicial dos arquivos estáticos.

Em conformidade com a **Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)**.

## 🛠️ Adicionar uma nova ficha

1. Copie um assistente existente (ex: `sinan_transtornos.html`) como base.
2. Adapte os campos do formulário para a ficha SINAN alvo.
3. Crie o PDF editável (`fichas/NOME_editavel.pdf`) com AcroForms nomeados.
4. Crie o `.md` de mapeamento (`fichas/NOME_editavel.md`) listando todos os campos.
5. Em `gerarPDF()`, mapeie IDs do HTML (`f_*`) → nomes AcroForm (`paciente_nome`, etc.).
6. Defina os globals `window.FICHA_*` antes de `<script src="shared.js">`.
7. Adicione um card em `index.html`.

Detalhes completos em [`CLAUDE.md`](./CLAUDE.md).

## 📜 Convenções

- **Idioma**: HTML, labels, placeholders e comentários em **português brasileiro**.
- **Commits**: em português, prefixo convencional (`feat:`, `fix:`, `refactor:`, `ui:`, `revert:`).
- **IDs de campo**: prefixo `f_` (ex: `f_nome`, `f_dt_nasc`, `f_ibge_notif`).
- **AcroForm**: nomes descritivos (`paciente_nome`, `empresa_razao_social`).
- **Mapeamento autoritativo**: o `.md` da ficha — **não** ler o PDF binário para descobrir campos.

## 🤝 Contexto institucional

Projeto desenvolvido no âmbito do **PET-Saúde / Interprofissionalidade & Saúde Digital (I&SD)** em parceria com o **CEREST** (Centro de Referência em Saúde do Trabalhador), para apoiar o ensino e a prática da notificação compulsória de agravos via SINAN NET.

## 📄 Licença

[MIT](./LICENSE) — uso, modificação e distribuição livres, com atribuição.

---

<p align="center">
  Feito com ☕ por <a href="https://github.com/hiagowms">Hiago</a> — PET-Saúde/I&SD
</p>
