<p align="center">
  <img src="assets/img/pet-logo-branca.png" height="90" alt="PET-Saúde" />
  &nbsp;&nbsp;&nbsp;
  <img src="assets/img/cerest-logo-branca.png" height="90" alt="CEREST Botucatu" />
</p>

# Assistente SINAN 🩺

![GitHub stars](https://img.shields.io/github/stars/hiagowms/assistente-sinan?style=social)
![GitHub forks](https://img.shields.io/github/forks/hiagowms/assistente-sinan?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/hiagowms/assistente-sinan?style=social)
![GitHub repo size](https://img.shields.io/github/repo-size/hiagowms/assistente-sinan)
![GitHub language count](https://img.shields.io/github/languages/count/hiagowms/assistente-sinan)
![GitHub top language](https://img.shields.io/github/languages/top/hiagowms/assistente-sinan)
![GitHub last commit](https://img.shields.io/github/last-commit/hiagowms/assistente-sinan?color=red)
[![License: MIT](https://img.shields.io/github/license/hiagowms/assistente-sinan?color=blue)](LICENSE)
![Zero build](https://img.shields.io/badge/build-zero-blue)
![Offline first](https://img.shields.io/badge/offline-first-success)
![LGPD](https://img.shields.io/badge/LGPD-compliant-brightgreen)

**Assistente SINAN é uma aplicação web 100% client-side, gratuita e auditável, criada para apoiar profissionais e estudantes de saúde no preenchimento das fichas de notificação do SINAN.** Você abre o site, preenche um formulário guiado com validação em tempo real e autocomplete de tabelas oficiais (município, UF, CBO, CNAE, CID-10) — e baixa o **PDF editável da ficha já preenchido**, pronto para impressão, assinatura e entrega ao serviço responsável pela digitação no SINAN NET.

Desenvolvido no **PET-Saúde / Informação e Saúde Digital (I&SD)** em parceria com o **CEREST Botucatu**.

🌐 **Acesse agora:** [https://hiagowms.github.io/assistente-sinan/](https://hiagowms.github.io/assistente-sinan/)

> [!WARNING]
> **O Assistente SINAN não envia, não transmite e não insere dados no SINAN NET.** Ele apenas gera o PDF da ficha preenchida. A inserção no sistema oficial continua sendo feita pelo profissional habilitado, no SINAN NET, conforme o fluxo institucional.

> [!TIP]
> Nada é enviado para servidor. Tudo roda no seu navegador — mesmo hospedado no GitHub Pages, **nenhum dado de paciente sai do seu dispositivo**.

## Principais Recursos ⭐

- 🚀 **Zero instalação**: Abra o link no navegador e use. Sem cadastro, sem login, sem download. Funciona em desktop e celular.

- 🔒 **100% client-side e LGPD-compliant**: A aplicação inteira roda no navegador. Sem backend, sem trackers, sem Google Analytics, sem cookies de rastreamento, sem CDNs externas. Dados sensíveis de saúde **nunca** saem do dispositivo do usuário.

- 📋 **11 fichas SINAN cobertas**: Violência Interpessoal/Autoprovocada e 10 fichas de Saúde do Trabalhador (DRT) — Acidente de Trabalho Grave, Acidente com Material Biológico, Intoxicação Exógena, LER/DORT, Transtornos Mentais, PAIR, Pneumoconioses, Dermatoses, Câncer Relacionado ao Trabalho e Distúrbios de Voz.

- 📄 **Geração de PDF AcroForm**: Cada ficha tem um PDF oficial editável em `fichas/*_editavel.pdf`. O formulário HTML preenche os campos AcroForm via [`pdf-lib`](https://pdf-lib.js.org/) e devolve um PDF **ainda editável** — ajustes finais podem ser feitos no Adobe Reader antes da assinatura.

- 🤖 **Importação Receita Federal (CNPJ)**: Cole o texto do "Comprovante de Inscrição e de Situação Cadastral" → CNAE, razão social, endereço e dados da empresa são preenchidos automaticamente. Motor próprio (`rf_parser.js`) trata máscaras, CNAEs secundários multi-linha, MATRIZ/FILIAL e formatação de CEP/telefone/UF.

- 🔍 **Autocomplete de tabelas oficiais offline**: Município (IBGE), UF, CBO (com sinônimos), CNAE, CID-10 — todas as tabelas vivem em `data/*.js` como arrays globais. Sem chamadas de rede.

- ✅ **Validação em tempo real e gamificação de progresso**: Campos essenciais marcados, barra de progresso, modais de validação amigáveis, toasts de feedback. Caps lock automático com remoção de acentos (exigência do SINAN NET).

- 🔄 **Transferência entre fichas**: Paciente atendido em múltiplos agravos? Dados comuns (identificação, residência, ocupação) são transferidos entre fichas via `sessionStorage`.

- 🎓 **Casos didáticos**: Menu de **pacientes fictícios** por ficha (em `data/casos/`) para ensino/treinamento sem dados reais.

- 🌙 **Dark mode**: Toggle no header com persistência via `localStorage`.

- 📱 **Mobile-first responsivo**: Layout adapta a celular/tablet, com `inputmode` apropriado por campo (numeric/tel).

- 🛠️ **Padrões SINAN respeitados**: Pills com valores numéricos (Gestante `1=1ºTrimestre`...`9=Ignorado`, Escolaridade `0=Analfabeto`...`10=Não se aplica`, unidades de tempo `1=Hora`/`2=Dia`/`3=Mês`/`4=Ano`), sem abreviações nos rótulos, mapeamento autoritativo de campos em `.md` por ficha.

- 📦 **Zero build, zero framework**: HTML + CSS + JS vanilla. Sem React, sem Vue, sem bundler, sem `node_modules`. Abra qualquer `.html` num servidor estático e funciona.

- 🌐 **Offline-first**: Todas as bibliotecas (`pdf-lib`, `pdf.js`) vivem em `lib/`. Nenhuma CDN remota.

## Fichas Suportadas 📋

| Ficha | Arquivo |
|---|---|
| Violência Interpessoal/Autoprovocada | `sinan_violencia.html` |
| Acidente de Trabalho Grave | `sinan_acidente.html` |
| Acidente de Trabalho com Material Biológico | `sinan_acidente_biologico.html` |
| Intoxicação Exógena | `sinan_intoxicacao.html` |
| LER/DORT | `sinan_lerdort.html` |
| Transtornos Mentais Relacionados ao Trabalho | `sinan_transtornos.html` |
| PAIR (Perda Auditiva Induzida por Ruído) | `sinan_pair.html` |
| Pneumoconioses | `sinan_pneumoconioses.html` |
| Dermatoses Ocupacionais | `sinan_dermatoses.html` |
| Câncer Relacionado ao Trabalho | `sinan_cancer.html` |
| Distúrbios de Voz Relacionados ao Trabalho | `sinan_disturbios_voz.html` |

Cada ficha tem um PDF AcroForm oficial em `fichas/*_editavel.pdf` e um mapeamento autoritativo de campos em `fichas/*_editavel.md`.

## Como Usar 🚀

### Acesso online (recomendado) 🌐

**👉 [https://hiagowms.github.io/assistente-sinan/](https://hiagowms.github.io/assistente-sinan/)**

Basta abrir no navegador. Sem instalação, cadastro ou login. Funciona em desktop e celular.

### Rodar localmente 💻

Para hospedar internamente (servidor do CEREST, intranet do serviço) ou estudar/modificar o código:

```bash
git clone https://github.com/hiagowms/assistente-sinan.git
cd assistente-sinan

# qualquer servidor HTTP estático serve:
python -m http.server 8000
# ou
npx serve .
```

Abra `http://localhost:8000` no navegador.

> [!NOTE]
> **Por que servidor HTTP e não abrir o `index.html` direto?** O navegador bloqueia leitura de PDFs locais via `file://`. Qualquer servidor estático resolve.

Você também pode publicar sua cópia em GitHub Pages, Netlify, Vercel, Apache ou Nginx — não precisa de backend.

### Fluxo de uso

1. Abra o hub (`index.html`) e escolha a ficha.
2. Preencha o formulário guiado — autocomplete e validação em tempo real.
3. **Importar dados da Receita Federal** (fichas DRT): cole o texto do comprovante CNPJ → CNAE, razão social e endereço são preenchidos automaticamente.
4. Clique **Gerar PDF** → baixa o PDF preenchido (mantém AcroForms editáveis).
5. Opcional: **Transferir dados** entre fichas (paciente atendido em múltiplos agravos) ou carregar **paciente fictício** para fins didáticos.

## Arquitetura Técnica ⚙️

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

## Estrutura do Projeto 📁

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
├── assets/img/                      Logos PET-Saúde / CEREST Botucatu
├── CLAUDE.md                        Guia técnico (convenções, padrões)
├── LICENSE                          MIT
└── README.md                        (este arquivo)
```

## Privacidade & LGPD 🔒

A aplicação lida com **dados pessoais sensíveis de saúde**. Por isso:

- ✅ **100% client-side** — nenhum dado sai do navegador.
- ✅ **Sem Google Analytics, sem GTM, sem trackers** de terceiros.
- ✅ **Sem cookies** de rastreamento (`localStorage` apenas para tema dark/light).
- ✅ **Sem CDNs externas** — todas as bibliotecas (`pdf-lib`, `pdf.js`) ficam em `lib/`.
- ✅ **Sem chamadas de rede** após o load inicial dos arquivos estáticos.

Em conformidade com a **Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)**.

## Adicionar uma Nova Ficha 🛠️

1. Copie um assistente existente (ex: `sinan_transtornos.html`) como base.
2. Adapte os campos do formulário para a ficha SINAN alvo.
3. Crie o PDF editável (`fichas/NOME_editavel.pdf`) com AcroForms nomeados.
4. Crie o `.md` de mapeamento (`fichas/NOME_editavel.md`) listando todos os campos.
5. Em `gerarPDF()`, mapeie IDs do HTML (`f_*`) → nomes AcroForm (`paciente_nome`, etc.).
6. Defina os globals `window.FICHA_*` antes de `<script src="shared.js">`.
7. Adicione um card em `index.html`.

Detalhes completos em [`CLAUDE.md`](./CLAUDE.md).

## Convenções 📜

- **Idioma**: HTML, labels, placeholders e comentários em **português brasileiro**.
- **Commits**: em português, prefixo convencional (`feat:`, `fix:`, `refactor:`, `ui:`, `revert:`).
- **IDs de campo**: prefixo `f_` (ex: `f_nome`, `f_dt_nasc`, `f_ibge_notif`).
- **AcroForm**: nomes descritivos (`paciente_nome`, `empresa_razao_social`).
- **Mapeamento autoritativo**: o `.md` da ficha — **não** ler o PDF binário para descobrir campos.

## Contexto Institucional 🤝

Projeto desenvolvido no âmbito do **PET-Saúde / Informação e Saúde Digital (I&SD)** em parceria com o **CEREST Botucatu** (Centro de Referência em Saúde do Trabalhador), para apoiar o ensino e a prática do preenchimento das fichas de notificação compulsória de agravos do SINAN. A digitação final no SINAN NET segue o fluxo institucional do serviço responsável.

## Licença 📄

[MIT](./LICENSE) — uso, modificação e distribuição livres, com atribuição.

## Suporte 💬

Dúvidas, sugestões ou problemas? Abra uma [issue no GitHub](https://github.com/hiagowms/assistente-sinan/issues).

## Star History

<a href="https://star-history.com/#hiagowms/assistente-sinan&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=hiagowms/assistente-sinan&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=hiagowms/assistente-sinan&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=hiagowms/assistente-sinan&type=Date" />
  </picture>
</a>

---

Feito com ☕ por [Hiago](https://github.com/hiagowms) — PET-Saúde / Informação e Saúde Digital (I&SD) · CEREST Botucatu 💪
