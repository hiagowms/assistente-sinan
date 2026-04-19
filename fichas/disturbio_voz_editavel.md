## Contexto
Este documento mapeia os campos AcroForm de um formulário PDF (SINAN — Ficha de Notificação Individual Genérica, utilizada para Distúrbios de Voz Relacionados ao Trabalho) para seus respectivos rótulos e valores aceitos. Como não existe ficha de investigação específica para distúrbios de voz no SINAN, utiliza-se a Ficha de Notificação Individual genérica com CID-10 R49.

Com base nas respostas do usuário em um formulário HTML, preencha cada campo com o valor correspondente à escala indicada. Campos de texto livre devem receber a string exatamente como o usuário digitou.

### Legenda de comportamento dos campos

- **[FIXO-PDF]**: campo sempre gravado com valor pré-definido no PDF. Nunca deve aparecer no HTML.
- **[FIXO-NÃO]**: campo sempre gravado com valor `2` (Não) no PDF. Nunca deve aparecer no HTML.
- **[FIXO-NAP]**: campo sempre gravado com valor `6` (Não se aplica) no PDF. Nunca deve aparecer no HTML.
- **[BRANCO]**: campo deixado em branco no PDF (não se aplica ao contexto). Nunca deve aparecer no HTML.
- **[NORMAL]**: campo preenchido pelo usuário no HTML normalmente.

---

# Número da Notificação
*(Campo de cabeçalho, fora de qualquer seção)*

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `notificacao_numero` | Número da Notificação | [NORMAL] |

---

# Seção: Dados Gerais

| AcroForm | Rótulo | Comportamento | Valor fixo |
|---|---|---|---|
| `tipo_notificacao` | Tipo de Notificação | [FIXO-PDF] | `2` (Individual) |
| `agravo` | Agravo / CID-10 | [FIXO-PDF] | `R49` |

## Campo 3 — Data da Notificação

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `data_notificacao` | Data da Notificação | [NORMAL] |

## Campos 4 e 5 — UF e Município de Notificação

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `uf_notificacao` | UF de Notificação | [NORMAL] |
| `municipio_notificacao_nome` | Município de Notificação (nome) | [NORMAL] |
| `municipio_notificacao_codigo_ibge` | Município de Notificação — Código IBGE | [NORMAL] |

## Campo 6 — Unidade de Saúde Notificadora

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `unidade_notificadora_nome` | Unidade de Saúde (ou outra fonte notificadora) — Nome | [NORMAL] |
| `unidade_notificadora_cnes` | Unidade de Saúde — Código CNES | [NORMAL] |

## Campo 7 — Data dos Primeiros Sintomas

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `data_primeiros_sintomas` | Data dos Primeiros Sintomas | [NORMAL] |

---

# Seção: Notificação Individual

## Campo 8 — Nome do Paciente

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_nome` | Nome do Paciente | [NORMAL] |

## Campo 9 — Data de Nascimento

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_data_nascimento` | Data de Nascimento | [NORMAL] |

## Campo 10 — Idade

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_idade_valor` | Valor numérico da idade | [NORMAL] |
| `paciente_idade_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano | [NORMAL] |

## Campo 11 — Sexo

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_sexo` | M=Masculino, F=Feminino, I=Ignorado | [NORMAL] |

## Campo 12 — Gestante

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_gestante` | 1=1º Trimestre, 2=2º Trimestre, 3=3º Trimestre, 4=Idade gestacional ignorada, 5=Não, 6=Não se aplica, 9=Ignorado | [NORMAL] |

## Campo 13 — Raça/Cor

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_raca_cor` | 1=Branca, 2=Preta, 3=Amarela, 4=Parda, 5=Indígena, 9=Ignorado | [NORMAL] |

## Campo 14 — Escolaridade

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_escolaridade` | 0=Analfabeto, 1=1ª a 4ª série incompleta do EF, 2=4ª série completa do EF, 3=5ª a 8ª série incompleta do EF, 4=Ensino fundamental completo, 5=Ensino médio incompleto, 6=Ensino médio completo, 7=Educação superior incompleta, 8=Educação superior completa, 9=Ignorado, 10=Não se aplica | [NORMAL] |

## Campo 15 — Número do Cartão SUS

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_cartao_sus` | Número do Cartão SUS | [NORMAL] |

## Campo 16 — Nome da Mãe

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `paciente_mae_nome` | Nome da mãe | [NORMAL] |

---

# Seção: Dados de Residência

## Campos 17 e 18 — UF e Município de Residência

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_uf` | UF de Residência | [NORMAL] |
| `residencia_municipio_nome` | Município de Residência (nome) | [NORMAL] |
| `residencia_municipio_codigo_ibge` | Município de Residência — Código IBGE | [NORMAL] |

## Campo 19 — Distrito

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_distrito` | Distrito | [NORMAL] |

## Campo 20 — Bairro

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_bairro` | Bairro | [NORMAL] |

## Campo 21 — Logradouro

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_logradouro` | Logradouro (rua, avenida, ...) | [NORMAL] |
| `residencia_logradouro_codigo` | Código do Logradouro | [BRANCO] — nunca aparece no HTML |

## Campo 22 — Número

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_numero` | Número | [NORMAL] |

## Campo 23 — Complemento

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_complemento` | Complemento (apto., casa, ...) | [NORMAL] |

## Campos 24 e 25 — Geo campos

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_geo_campo_1` | Geo campo 1 | [BRANCO] — nunca aparece no HTML |
| `residencia_geo_campo_2` | Geo campo 2 | [BRANCO] — nunca aparece no HTML |

## Campo 26 — Ponto de Referência

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_ponto_de_referencia` | Ponto de Referência | [NORMAL] |

## Campo 27 — CEP

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_cep` | CEP | [NORMAL] |

## Campo 28 — Telefone

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_telefone` | (DDD) Telefone | [NORMAL] |

## Campo 29 — Zona

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_zona` | 1=Urbana, 2=Rural, 3=Periurbana, 9=Ignorado | [NORMAL] |

## Campo 30 — País

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `residencia_pais` | País (se residente fora do Brasil) | [NORMAL] |

---

# Seção: Notificação de Surto
*(Seção inteira não se aplica — distúrbio de voz é notificação individual, não surto)*

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `data_sintomas_primeiro_caso` | Data dos Sintomas do Primeiro Caso | [BRANCO] — nunca aparece no HTML |
| `numero_casos_suspeitos` | Número de Casos Suspeitos | [BRANCO] — nunca aparece no HTML |
| `local_inicio_surto` | Local de Início do Surto | [BRANCO] — nunca aparece no HTML |
| `local_inicio_surto_outros_detalhe` | Outros — especificar local | [BRANCO] — nunca aparece no HTML |
| `diagnostico_especifico_cid10_1` | Hipótese Diagnóstica 1 — CID-10 | [BRANCO] — nunca aparece no HTML |
| `diagnostico_especifico_cid10_2` | Hipótese Diagnóstica 2 — CID-10 | [BRANCO] — nunca aparece no HTML |

---

# Seção: Dados Clínicos e Laboratoriais

## Óbito

| AcroForm | Rótulo | Comportamento | Valor fixo |
|---|---|---|---|
| `obito` | Óbito | [FIXO-NÃO] | `2` |

## Contato com Caso Semelhante
*(Não se aplica — distúrbio de voz não é doença transmissível)*

| AcroForm | Rótulo | Comportamento | Valor fixo |
|---|---|---|---|
| `contato_caso_semelhante` | Contato com Caso Semelhante | [FIXO-NÃO] | `2` |

## Exantema
*(Não se aplica ao contexto)*

| AcroForm | Rótulo | Comportamento | Valor fixo |
|---|---|---|---|
| `presenca_exantema` | Presença de Exantema | [FIXO-NÃO] | `2` |

## Petéquias
*(Não se aplica ao contexto)*

| AcroForm | Rótulo | Comportamento | Valor fixo |
|---|---|---|---|
| `presenca_petequias` | Presença de Petéquias | [FIXO-NÃO] | `2` |

## Líquor
*(Não se aplica ao contexto)*

| AcroForm | Rótulo | Comportamento | Valor fixo |
|---|---|---|---|
| `liquor` | Líquor | [FIXO-NÃO] | `2` |
| `resultado_bacterioscopia` | Resultado da Bacterioscopia | [BRANCO] — nunca aparece no HTML | — |

## Exames Laboratoriais
*(Não há exame laboratorial específico para distúrbio de voz)*

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `data_primeira_sorologia` | Data da Primeira Sorologia | [BRANCO] — nunca aparece no HTML |
| `data_primeira_amostra` | Data da Primeira Amostra | [BRANCO] — nunca aparece no HTML |
| `tipo_exame` | Tipo de Exame | [BRANCO] — nunca aparece no HTML |

## Vacina para o Agravo
*(Não existe vacina para distúrbio de voz)*

| AcroForm | Rótulo | Comportamento | Valor fixo |
|---|---|---|---|
| `vacina_agravo` | Vacinado contra o Agravo | [FIXO-NAP] | `6` |
| `data_ultima_dose` | Data da Última Dose | [BRANCO] — nunca aparece no HTML | — |

---

# Seção: Notificante
*(Preenchido pelo profissional de saúde responsável pela notificação. Aparece no HTML.)*

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `municipio_unidade_notificante` | Município da Unidade Notificante | [NORMAL] |
| `nome_notificante` | Nome do Notificante | [NORMAL] |
| `funcao_notificante` | Função do Notificante | [NORMAL] |

---

# Seção: Hospitalização

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `hospitalizacao` | Houve Hospitalização? 1=Sim, 2=Não, 9=Ignorado | [NORMAL] |
| `data_hospitalizacao` | Data da Hospitalização | [NORMAL] |
| `hospital_uf` | UF do Hospital | [NORMAL] |
| `hospital_municipio` | Município do Hospital (nome) | [NORMAL] |
| `hospital_municipio_codigo_ibge` | Município do Hospital — Código IBGE | [NORMAL] |
| `hospital_nome` | Nome do Hospital | [NORMAL] |
| `hospital_cnes` | Código CNES do Hospital | [NORMAL] |

---

# Seção: Provável Local de Infecção

| AcroForm | Rótulo | Comportamento |
|---|---|---|
| `provavel_infeccao_pais` | País do Provável Local de Infecção | [BRANCO] — nunca aparece no HTML |
| `provavel_infeccao_municipio` | Município do Provável Local de Infecção | [BRANCO] — nunca aparece no HTML |
| `provavel_infeccao_distrito` | Distrito do Provável Local de Infecção | [BRANCO] — nunca aparece no HTML |
| `provavel_infeccao_bairro` | Bairro do Provável Local de Infecção | [BRANCO] — nunca aparece no HTML |