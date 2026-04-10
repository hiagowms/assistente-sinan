# Assistente SINAN — PET-Saúde/I&SD

## O que é

Aplicação web **100% client-side** (HTML + CSS + JS vanilla) que auxilia profissionais de saúde no preenchimento de fichas de notificação do **SINAN NET** (Sistema de Informação de Agravos de Notificação). 

## Estrutura do projeto

```
index.html                  — Hub central (catálogo de fichas com cards)
sinan_violencia.html        — Assistente: Violência Interpessoal/Autoprovocada
sinan_acidente.html         — Assistente: Acidente de Trabalho Grave
sinan_lerdort.html          — Assistente: LER/DORT
sinan_transtornos.html      — Assistente: Transtornos Mentais Relacionados ao Trabalho
fichas/                     — PDFs editáveis (AcroForms) das fichas DRT/SINAN
data/                       — Tabelas de referência SINAN (JS): municípios, UFs, CBO, CNAE, agravos
lib/                        — Bibliotecas locais: pdf-lib (gerar PDF), pdf.js (ler PDF)
assets/img/                 — Logos PET-Saúde
```

## Arquitetura

- **Zero build, zero framework** — cada página `sinan_*.html` é um arquivo self-contained (HTML + CSS + JS inline).
- **Tabelas SINAN offline** — os arquivos em `data/` exportam arrays globais (`SINAN_UFS`, `SINAN_MUNICIPIOS`, `SINAN_CBOS`, `SINAN_CNAES`, etc.) usados para autocomplete e validação.
- **Geração de PDF** — usa `pdf-lib` para carregar o PDF editável da ficha (`fichas/*_editavel.pdf`), preencher AcroForms com os dados do formulário e baixar o resultado.
- **Importação Receita Federal** — fichas DRT permitem colar texto da consulta CNPJ da Receita Federal para preencher dados da empresa automaticamente (CNAE, razão social, endereço).
- **Dark mode** — toggle no header com persistência via `localStorage('sinan-theme')`.
- **Responsivo** — layout mobile-first com breakpoint `768px`.

## Convenções

- **Idioma**: todo HTML, labels, placeholders e comentários em **português brasileiro**.
- **Commits**: em português, prefixo convencional (`feat:`, `fix:`, `refactor:`, `ui:`, `revert:`).
- **CSS**: inline em `<style>` dentro de cada HTML (não há arquivos `.css` separados).
- **JS**: inline em `<script>` ao final do `<body>` (não há arquivos `.js` separados, exceto tabelas de dados).
- **Inputs SINAN**: campos com `data-caps` forçam uppercase e removem acentos (padrão SINAN NET).
- **IDs de campo**: prefixo `f_` (ex: `f_nome`, `f_dt_nasc`, `f_ibge_notif`).
- **Nomes AcroForm**: os nomes dos campos no PDF editável devem ser descritivos (ex: `paciente_nome`, `empresa_razao_social`).

## Dependências externas (offline-first)

**Todas as bibliotecas devem ser baixadas localmente em `lib/`** — nunca usar CDN remoto.

- `lib/pdf-lib.min.js` — manipulação de PDF (AcroForms)
- `lib/pdf.min.js` + `lib/pdf.worker.min.js` — leitura de PDF (Mozilla pdf.js)

## Google Analytics

Todo arquivo HTML novo deve incluir o snippet GA4 (`G-XBCCJ6GTG6`) logo após `<meta name="viewport">`.

## Padrão de nova ficha assistente

Para criar um novo `sinan_*.html`:

1. Copiar um assistente existente como base (ex: `sinan_transtornos.html`).
2. Adaptar os campos do formulário para os campos da ficha SINAN correspondente.
3. Criar o PDF editável (`fichas/*_editavel.pdf`) com AcroForms nomeados.
4. Mapear os IDs do formulário HTML → nomes AcroForm na função `gerarPDF()`.
5. Incluir as tabelas de dados necessárias (todas as fichas usam municípios, UFs, CBO; fichas DRT também usam CNAE).
6. Adicionar card na `index.html`.
