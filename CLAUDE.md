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
sinan_pair.html             — Assistente: PAIR (Perda Auditiva Induzida por Ruído)
shared.css                  — CSS compartilhado (sinan_pair.html + sinan_violencia.html)
shared.js                   — JS compartilhado (sinan_pair.html + sinan_violencia.html)
fichas/                     — PDFs editáveis (AcroForms) das fichas DRT/SINAN
data/                       — Tabelas de referência SINAN (JS): municípios, UFs, CBO, CNAE, agravos
lib/                        — Bibliotecas locais: pdf-lib (gerar PDF), pdf.js (ler PDF)
assets/img/                 — Logos PET-Saúde
```

## Arquitetura

- **Zero build, zero framework** — sem bundler, sem framework.
- **Tabelas SINAN offline** — os arquivos em `data/` exportam arrays globais (`SINAN_UFS`, `SINAN_MUNICIPIOS`, `SINAN_CBOS`, `SINAN_CNAES`, etc.) usados para autocomplete e validação.
- **Geração de PDF** — usa `pdf-lib` para carregar o PDF editável da ficha (`fichas/*_editavel.pdf`), preencher AcroForms com os dados do formulário e baixar o resultado.
- **Importação Receita Federal** — fichas DRT permitem colar texto da consulta CNPJ da Receita Federal para preencher dados da empresa automaticamente (CNAE, razão social, endereço).
- **Dark mode** — toggle no header com persistência via `localStorage('sinan-theme')`.
- **Responsivo** — layout mobile-first com breakpoint `768px`.

### Arquivos shared (shared.css + shared.js)

`sinan_pair.html` e `sinan_violencia.html` foram refatorados para extrair o boilerplate (~70-80% do código) em dois arquivos externos:

- **`shared.css`** — CSS comum: reset, header, progress bar, tools bar, botões, layout de seções, formulários, pills, info boxes, toast, modais de validação, autocomplete, tooltips, barra mobile, dark mode, botão de transferência, lock-grp, `.lock-tipo-warn`.
- **`shared.js`** — JS comum: caps lock, pill toggle, sync pill↔hidden, UF selects, autocomplete (municípios, CID-10, CNAE, CBO+sinônimos), auto-idade, modais, toast, progress+gamification, validação, helpers, menu de pacientes fictícios, _setField/_clearForm/carregarPaciente, exportar/importar, tipToggle, transferência de dados entre fichas, mobile sync, sessionStorage import, cadeado unidade notificadora.

#### Interface de configuração (window globals)

Cada ficha que usa shared.js deve definir os seguintes globals **antes** de `<script src="shared.js">`:

| Global | Descrição |
|---|---|
| `window.FICHA_NOME` | Identificador da ficha (ex: `'pair'`) |
| `window.FICHA_TRANSFER_SOURCE` | Fonte para sessionStorage de transferência |
| `window.FICHA_PROG_CONFIG` | Objeto com `ESS_IDS`, `ESS_GROUPS`, `STD_GROUPS`, `COND_GROUPS`, `PROG_EXCLUDE_IDS`, `ESS_GROUP_LABELS` |
| `window.FICHA_UF_SELECTS` | Array de IDs dos `<select>` de UF |
| `window.FICHA_MUN_CONFIGS` | Array de `{suf, ibge}` para autocomplete de município |
| `window.FICHA_CID_INPUT_ID` | ID do input CID-10 (opcional) |
| `window.FICHA_CID_HINT_ID` | ID do hint CID-10 (opcional) |
| `window.FICHA_CNAE_INPUT_ID` | ID do input CNAE (apenas fichas DRT) |
| `window.FICHA_CNAE_HINT_ID` | ID do hint CNAE (apenas fichas DRT) |
| `window.FICHA_MOBILE_NUMERIC_IDS` | Array de IDs com `inputmode=numeric` |
| `window.FICHA_MOBILE_TEL_IDS` | Array de IDs com `inputmode=tel` |
| `window.FICHA_TRANSFER_MUN_SUFS` | Sufixos de município a re-aplicar após transferência |
| `window.FICHA_UNIT_IDS` | IDs dos campos do cadeado de unidade notificadora |
| `window.FICHA_HIDDEN_BOXES` | IDs de caixas condicionais a ocultar no clear |
| `window.FICHA_TRANSFER_FICHAS` | Array de fichas disponíveis para transferência |
| `window.FAKE_PATIENTS` | Array de pacientes fictícios didáticos |
| `window._applyVisibility()` | Hook: aplica visibilidade dos campos condicionais |
| `window._onPostClearForm()` | Hook opcional: limpeza extra após clear do formulário |
| `window._onPostCarregarPaciente(p)` | Hook opcional: ações extras após carregar paciente |

#### Ordem de carregamento (fichas com shared.js)

```html
<!-- 1. Tabelas de dados SINAN -->
<script src="data/tb_uf.js"></script>
...
<!-- 2. pdf-lib -->
<script src="lib/pdf-lib.min.js"></script>
<!-- 3. Configuração da ficha (globals + conditionals + gerarPDF) -->
<script>
  window.FICHA_NOME = '...';
  ...
  window.FAKE_PATIENTS = [...];
  function onSexoChange(){ ... }
  window._applyVisibility = function(){ ... };
  async function gerarPDF(){ ... }
</script>
<!-- 4. shared.js (após os globals estarem definidos) -->
<script src="shared.js"></script>
```

#### Dark mode IIFE

O bloco `<script>` de dark mode (que aplica o tema antes do primeiro paint) deve ficar **inline** logo após `<body>` — nunca em shared.js.

#### CSS inline em fichas com shared.js

Apenas CSS **exclusivo da ficha** (ex: painel RF em sinan_pair.html) deve ficar em `<style>` inline. O restante vem de `shared.css`.

## Convenções

- **Idioma**: todo HTML, labels, placeholders e comentários em **português brasileiro**.
- **Commits**: em português, prefixo convencional (`feat:`, `fix:`, `refactor:`, `ui:`, `revert:`).
- **CSS**: inline em `<style>` dentro de cada HTML, **exceto** `sinan_pair.html` e `sinan_violencia.html` que usam `shared.css` (+ CSS inline somente para estilos exclusivos da ficha).
- **JS**: inline em `<script>` ao final do `<body>`, **exceto** `sinan_pair.html` e `sinan_violencia.html` que usam `shared.js` (+ script inline apenas para configuração da ficha).
- **Inputs SINAN**: campos com `data-caps` forçam uppercase e removem acentos (padrão SINAN NET).
- **IDs de campo**: prefixo `f_` (ex: `f_nome`, `f_dt_nasc`, `f_ibge_notif`).
- **Nomes AcroForm**: os nomes dos campos no PDF editável devem ser descritivos (ex: `paciente_nome`, `empresa_razao_social`).

## Dependências externas (offline-first)

**Todas as bibliotecas devem ser baixadas localmente em `lib/`** — nunca usar CDN remoto.

- `lib/pdf-lib.min.js` — manipulação de PDF (AcroForms)
- `lib/pdf.min.js` + `lib/pdf.worker.min.js` — leitura de PDF (Mozilla pdf.js)

## Google Analytics

Todo arquivo HTML novo deve incluir o snippet GA4 (`G-XBCCJ6GTG6`) logo após `<meta name="viewport">`.

## Mapeamento AcroForm

- **Fonte dos nomes AcroForm**: para cada ficha `sinan_X.html`, o arquivo `fichas/DRT_X_editavel.md` contém o mapeamento autoritativo de todos os campos AcroForm. **NUNCA tente ler o PDF binário** para descobrir campos — use o `.md` correspondente. Leitura de PDF só se o usuário solicitar explicitamente.
- **Correspondência máxima**: o HTML deve ter exatamente os campos listados no `.md`. Campos sem AcroForm correspondente no `.md` não devem aparecer no HTML (o usuário pode preencher direto no PDF depois).
- **Geo campos e códigos de logradouro**: os campos `residencia_geo_campo_1`, `residencia_geo_campo_2` e `residencia_logradouro_codigo` (e equivalentes em outros contextos) **nunca** devem aparecer no HTML — ficam em branco no PDF.

## Comportamento de pills com valores numéricos

Quando o PDF usa códigos numéricos mas o usuário deve ver rótulos descritivos:
- **Labels no HTML**: sempre sem o número (ex: "1ºTrimestre", não "1 — 1ºTrimestre").
- **Valor gravado no PDF**: apenas o número (ex: `1`).
- **Padrão**: `<label class="pill" data-val="1"><input type="radio" name="..." value="1"> Rótulo descritivo</label>`.
- Exemplos de campos com esse comportamento: Gestante, Escolaridade, Situação no Mercado de Trabalho, Evolução do Caso, Regime de Tratamento, todos os agravos, exposições, sintomas e condutas.

## Gestante — opções padrão SINAN

| Valor | Label no HTML |
|---|---|
| 1 | 1ºTrimestre |
| 2 | 2ºTrimestre |
| 3 | 3ºTrimestre |
| 4 | Idade gestacional Ignorada |
| 5 | Não |
| 6 | Não se aplica |
| 9 | Ignorado |

## Escolaridade — opções padrão SINAN

| Valor | Label no HTML |
|---|---|
| 0 | Analfabeto |
| 1 | 1ª a 4ª série incompleta do EF |
| 2 | 4ª série completa do EF |
| 3 | 5ª à 8ª série incompleta do EF |
| 4 | Ensino fundamental completo |
| 5 | Ensino médio incompleto |
| 6 | Ensino médio completo |
| 7 | Educação superior incompleta |
| 8 | Educação superior completa |
| 9 | Ignorado |
| 10 | Não se aplica |

Escolaridade deve sempre ser implementada como **pills** (não select/dropdown).

## Sem abreviações

**Nunca abreviar** rótulos de campos, labels de pills ou textos de interface, a menos que o usuário forneça o termo já abreviado. Exemplos do que não fazer:
- "Ign." → usar "Ignorado"
- "N/A" → usar "Não se aplica"
- "1º Trim" → usar "1ºTrimestre"
- "H/D/M/A" para unidades de tempo → usar "Hora/Dia/Mês/Ano"
- "EF" sozinho → usar nome completo "Ensino Fundamental"
- "EM" sozinho → usar nome completo "Ensino Médio"

## Unidades de tempo — padrão numérico SINAN

Pills de unidade de tempo (idade, tempo de trabalho, tempo de exposição, tempo de afastamento) usam valores numéricos:

| Valor | Label |
|---|---|
| 1 | Hora |
| 2 | Dia |
| 3 | Mês |
| 4 | Ano |

Ao preencher a data de nascimento, a unidade de idade é calculada automaticamente. Ao digitar manualmente no campo de idade sem unidade selecionada, "Ano" é marcado automaticamente.

## Padrão de nova ficha assistente

Para criar um novo `sinan_*.html` **self-contained** (sem shared.js):

1. Copiar um assistente existente como base (ex: `sinan_transtornos.html`).
2. Adaptar os campos do formulário para os campos da ficha SINAN correspondente.
3. Criar o PDF editável (`fichas/*_editavel.pdf`) com AcroForms nomeados.
4. Mapear os IDs do formulário HTML → nomes AcroForm na função `gerarPDF()`.
5. Incluir as tabelas de dados necessárias (todas as fichas usam municípios, UFs, CBO; fichas DRT também usam CNAE).
6. Adicionar card na `index.html`.
