## Contexto
Este documento mapeia os campos AcroForm de um formulário PDF (SINAN — Ficha de Investigação Intoxicação Exógena) para seus respectivos rótulos e valores aceitos. Com base nas respostas do usuário em um formulário HTML, preencha cada campo com o valor correspondente à escala indicada. Campos de texto livre devem receber a string exatamente como o usuário digitou.

---

# Número da Notificação
*(Campo de cabeçalho, fora de qualquer seção)*

| AcroForm | Rótulo |
|---|---|
| `notificacao_numero` | Número da Notificação |

---

# Seção: Dados Gerais

Campo 1 — Tipo de Notificação: valor fixo, não editável (2 - Individual)

Campo 2 — Agravo/doença: valor fixo, não editável (Intoxicação Exógena / CID10: T65.9)

## Campo 3 — Data da Notificação

| AcroForm | Rótulo |
|---|---|
| `data_notificacao` | Data da Notificação |

## Campos 4 e 5 — UF e Município de Notificação

| AcroForm | Rótulo |
|---|---|
| `uf_notifi` | UF de Notificação |
| `municipio_notificacao_nome` | Município de Notificação (nome) |
| `municipio_notificacao_codic` | Município de Notificação — Código IBGE |

## Campo 6 — Unidade de Saúde Notificadora

| AcroForm | Rótulo |
|---|---|
| `unidade_notificadora_nome` | Unidade de Saúde (ou outra fonte notificadora) — Nome |
| `unidade_notificadora_cnes` | Unidade de Saúde — Código CNES |

## Campo 7 — Data dos Primeiros Sintomas

| AcroForm | Rótulo |
|---|---|
| `data_primeiros_sintomas` | Data dos Primeiros Sintomas |

---

# Seção: Notificação Individual

## Campo 8 — Nome do Paciente

| AcroForm | Rótulo |
|---|---|
| `paciente_nome` | Nome do Paciente |

## Campo 9 — Data de Nascimento

| AcroForm | Rótulo |
|---|---|
| `paciente_data_nascimento` | Data de Nascimento |

## Campo 10 — Idade

| AcroForm | Rótulo |
|---|---|
| `paciente_idade_valor` | Valor numérico da idade |
| `paciente_idade_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 11 — Sexo

| AcroForm | Rótulo |
|---|---|
| `paciente_sexo` | M=Masculino, F=Feminino, I=Ignorado |

## Campo 12 — Gestante

| AcroForm | Rótulo |
|---|---|
| `paciente_gestante` | 1=1º Trimestre, 2=2º Trimestre, 3=3º Trimestre, 4=Idade gestacional ignorada, 5=Não, 6=Não se aplica, 9=Ignorado |

## Campo 13 — Raça/Cor

| AcroForm | Rótulo |
|---|---|
| `paciente_raca_cor` | 1=Branca, 2=Preta, 3=Amarela, 4=Parda, 5=Indígena, 9=Ignorado |

## Campo 14 — Escolaridade

| AcroForm | Rótulo |
|---|---|
| `paciente_escolaridade` | 0=Analfabeto, 1=1ª a 4ª série incompleta do EF, 2=4ª série completa do EF, 3=5ª a 8ª série incompleta do EF, 4=Ensino fundamental completo, 5=Ensino médio incompleto, 6=Ensino médio completo, 7=Educação superior incompleta, 8=Educação superior completa, 9=Ignorado, 10=Não se aplica |

## Campo 15 — Número do Cartão SUS

| AcroForm | Rótulo |
|---|---|
| `paciente_cartao_sus` | Número do Cartão SUS |

## Campo 16 — Nome da Mãe

| AcroForm | Rótulo |
|---|---|
| `paciente_mae_nome` | Nome da mãe |

---

# Seção: Dados de Residência

## Campos 17 e 18 — UF e Município de Residência

| AcroForm | Rótulo |
|---|---|
| `residencia_uf` | UF de Residência |
| `residencia_municipio_nome` | Município de Residência (nome) |
| `residencia_municipio_codigo_ibge` | Município de Residência — Código IBGE |

## Campo 19 — Distrito

| AcroForm | Rótulo |
|---|---|
| `residencia_distrito` | Distrito |

## Campo 20 — Bairro

| AcroForm | Rótulo |
|---|---|
| `residencia_bairro` | Bairro |

## Campo 21 — Logradouro

| AcroForm | Rótulo |
|---|---|
| `residencia_logradouro` | Logradouro (rua, avenida, ...) |
| `residencia_logradouro_codigo` | Código do Logradouro |

## Campo 22 — Número

| AcroForm | Rótulo |
|---|---|
| `residencia_numero` | Número |

## Campo 23 — Complemento

| AcroForm | Rótulo |
|---|---|
| `residencia_complemento` | Complemento (apto., casa, ...) |

## Campo 24 — Geo campo 1

| AcroForm | Rótulo |
|---|---|
| `residencia_geo_campo_1` | Geo campo 1 |

## Campo 25 — Geo campo 2

| AcroForm | Rótulo |
|---|---|
| `residencia_geo_campo_2` | Geo campo 2 |

## Campo 26 — Ponto de Referência

| AcroForm | Rótulo |
|---|---|
| `residencia_ponto_de_referencia` | Ponto de Referência |

## Campo 27 — CEP

| AcroForm | Rótulo |
|---|---|
| `residencia_cep` | CEP |

## Campo 28 — Telefone

| AcroForm | Rótulo |
|---|---|
| `residencia_telefone` | (DDD) Telefone |

## Campo 29 — Zona

| AcroForm | Rótulo |
|---|---|
| `residencia_zona` | 1=Urbana, 2=Rural, 3=Periurbana, 9=Ignorado |

## Campo 30 — País

| AcroForm | Rótulo |
|---|---|
| `residencia_pais` | País (se residente fora do Brasil) |

---

# Seção: Antecedentes Epidemiológicos

## Campo 31 — Data da Investigação

| AcroForm | Rótulo |
|---|---|
| `data_investigacao` | Data da Investigação |

## Campo 32 — Ocupação

| AcroForm | Rótulo |
|---|---|
| `pessoa_ocupacao` | Ocupação (texto livre) |

## Campo 33 — Situação no Mercado de Trabalho

| AcroForm | Rótulo |
|---|---|
| `situacao_mercado_trabalho` | 01=Empregado registrado com carteira assinada, 02=Empregado não registrado, 03=Autônomo/conta própria, 04=Servidor público estatutário, 05=Servidor público celetista, 06=Aposentado, 07=Desempregado, 08=Trabalho temporário, 09=Cooperativado, 10=Trabalhador avulso, 11=Empregador, 12=Outros, 99=Ignorado |
| `situacao_mercado_trabalho_ou` | Texto livre — especificar quando "Outros" selecionado |

## Campo 34 — Local de Ocorrência da Exposição

| AcroForm | Rótulo |
|---|---|
| `local_exposicao` | 1=Residência, 2=Ambiente de trabalho, 3=Trajeto do trabalho, 4=Serviços de saúde, 5=Escola/creche, 6=Ambiente externo, 7=Outro, 9=Ignorado |
| `local_exposicao_outro_detalhe` | Texto livre — especificar quando "Outro" selecionado |

---

# Seção: Dados da Exposição

## Campo 35 — Nome do Local/Estabelecimento de Ocorrência

| AcroForm | Rótulo |
|---|---|
| `exposical_nome_local` | Nome do local/estabelecimento de ocorrência (texto livre) |

## Campo 36 — Atividade Econômica (CNAE)

| AcroForm | Rótulo |
|---|---|
| `exposicao_cnae` | Atividade Econômica — CNAE |

## Campos 37 e 38 — UF e Município do Estabelecimento

| AcroForm | Rótulo |
|---|---|
| `exposicao_uf` | UF do Estabelecimento |
| `exposicao_municipio` | Município do Estabelecimento (nome) |
| `exposicao_municipio_ibge` | Município do Estabelecimento — Código IBGE |

## Campo 39 — Distrito

| AcroForm | Rótulo |
|---|---|
| `exposicao_distrito` | Distrito |

## Campo 40 — Bairro

| AcroForm | Rótulo |
|---|---|
| `exposicao_bairro` | Bairro |

## Campo 41 — Logradouro

| AcroForm | Rótulo |
|---|---|
| `exposicao_logradouro` | Logradouro (rua, avenida, etc. — endereço do estabelecimento) |

## Campo 42 — Número

| AcroForm | Rótulo |
|---|---|
| `exposicao_numero` | Número |

## Campo 43 — Complemento

| AcroForm | Rótulo |
|---|---|
| `exposicao_complemento` | Complemento (apto., casa, ...) |

## Campo 44 — Ponto de Referência do Estabelecimento

| AcroForm | Rótulo |
|---|---|
| `exposicao_ponto_de_referencia` | Ponto de Referência do Estabelecimento |

## Campo 45 — CEP

| AcroForm | Rótulo |
|---|---|
| `exposicao_cep` | CEP |

## Campo 46 — Telefone

| AcroForm | Rótulo |
|---|---|
| `exposicao_telefone` | (DDD) Telefone |

## Campo 47 — Zona de Exposição

| AcroForm | Rótulo |
|---|---|
| `exposicao_zona` | 1=Urbana, 2=Rural, 3=Periurbana, 9=Ignorado |

## Campo 48 — País (se estabelecimento fora do Brasil)

| AcroForm | Rótulo |
|---|---|
| `exposicao_pais` | País |

## Campo 49 — Grupo do Agente Tóxico / Classificação Geral

| AcroForm | Rótulo |
|---|---|
| `grupo_agente_toxico` | 01=Medicamento, 02=Agrotóxico uso agrícola, 03=Agrotóxico uso doméstico, 04=Agrotóxico uso saúde pública, 05=Raticida, 06=Produto veterinário, 07=Produto de uso domiciliar, 08=Cosmético/higiene pessoal, 09=Produto químico de uso industrial, 10=Metal, 11=Drogas de abuso, 12=Planta tóxica, 13=Alimento e bebida, 14=Outro |
| `grupo_agente_toxico_outro_detalhe` | Texto livre — especificar quando "Outro" selecionado |

## Campo 50 — Agente Tóxico (informar até três agentes)

| AcroForm | Rótulo |
|---|---|
| `agente_toxico_nome1` | Nome Comercial/popular — Agente 1 |
| `agente_toxico_nome2` | Nome Comercial/popular — Agente 2 |
| `agente_toxico_nome3` | Nome Comercial/popular — Agente 3 |
| `agente_toxico_principioativo1` | Princípio Ativo — Agente 1 |
| `agente_toxico_principioativo2` | Princípio Ativo — Agente 2 |
| `agente_toxico_principioativo3` | Princípio Ativo — Agente 3 |

## Campo 51 — Se Agrotóxico, Qual a Finalidade da Utilização

| AcroForm | Rótulo |
|---|---|
| `agrotoxico_finalidade` | 1=Inseticida, 2=Herbicida, 3=Carrapaticida, 4=Raticida, 5=Fungicida, 6=Preservante para madeira, 7=Outro, 9=Ignorado |
| `agrotoxico_finalidade_outro_detalhe` | Texto livre — especificar quando "Outro" selecionado |

## Campo 52 — Se Agrotóxico, Quais as Atividades Exercidas na Exposição Atual

| AcroForm | Rótulo |
|---|---|
| `agrotoxico_atividade1` | Atividade 1: 01=Diluição, 02=Pulverização, 03=Tratamento de sementes, 04=Armazenagem, 05=Colheita, 06=Transporte, 07=Desinsetização, 08=Produção/formulação, 09=Outros, 10=Não se aplica, 99=Ignorado |
| `agrotoxico_atividade2` | Atividade 2 (mesma escala) |
| `agrotoxico_atividade3` | Atividade 3 (mesma escala) |

## Campo 53 — Se Agrotóxico de Uso Agrícola, Qual a Cultura/Lavoura

| AcroForm | Rótulo |
|---|---|
| `agrotoxico_cultura` | Cultura/lavoura (texto livre) |

## Campo 54 — Via de Exposição/Contaminação

| AcroForm | Rótulo |
|---|---|
| `via_exposicao1` | 1ª Opção: 1=Digestiva, 2=Cutânea, 3=Respiratória, 4=Ocular, 5=Parenteral, 6=Vaginal, 7=Transplacentária, 8=Outra, 9=Ignorada |
| `via_exposicao2` | 2ª Opção (mesma escala) |
| `via_exposicao3` | 3ª Opção (mesma escala) |

## Campo 55 — Circunstância da Exposição/Contaminação

| AcroForm | Rótulo |
|---|---|
| `circunstancia_exposicao` | 01=Uso habitual, 02=Acidental, 03=Ambiental, 04=Uso terapêutico, 05=Prescrição médica inadequada, 06=Erro de administração, 07=Automedicação, 08=Abuso, 09=Ingestão de alimento ou bebida, 10=Tentativa de suicídio, 11=Tentativa de aborto, 12=Violência/homicídio, 13=Outra, 99=Ignorado |
| `circunstancia_exposicao_outra_detalhe` | Texto livre — especificar quando "Outra" selecionado |

## Campo 56 — A Exposição/Contaminação foi Decorrente do Trabalho/Ocupação?

| AcroForm | Rótulo |
|---|---|
| `exposicao_trabalho` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 57 — Tipo de Exposição

| AcroForm | Rótulo |
|---|---|
| `tipo_exposicao` | 1=Aguda única, 2=Aguda repetida, 3=Crônica, 4=Aguda sobre Crônica, 9=Ignorado |

---

# Seção: Dados do Atendimento

## Campo 58 — Tempo Decorrido entre a Exposição e o Atendimento

| AcroForm | Rótulo |
|---|---|
| `tempo_decorrido_valor` | Valor numérico do tempo |
| `tempo_decorrido_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano, 9=Ignorado |

## Campo 59 — Tipo de Atendimento

| AcroForm | Rótulo |
|---|---|
| `tipo_atendimento` | 1=Hospitalar, 2=Ambulatorial, 3=Domiciliar, 9=Nenhum, 9=Ignorado |

## Campo 60 — Houve Hospitalização?

| AcroForm | Rótulo |
|---|---|
| `hospitalizacao` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 61 — Data da Internação

| AcroForm | Rótulo |
|---|---|
| `data_internacao` | Data da Internação |

## Campo 62 — UF do Atendimento

| AcroForm | Rótulo |
|---|---|
| `atendimento_uf` | UF do Atendimento |

## Campo 63 — Município de Hospitalização

| AcroForm | Rótulo |
|---|---|
| `municipio_hospitalizacao` | Município de Hospitalização (nome) |
| `hospitalizacao_municipio_ibge` | Município de Hospitalização — Código IBGE |

## Campo 64 — Unidade de Saúde

| AcroForm | Rótulo |
|---|---|
| `unidade_saude` | Nome da Unidade de Saúde |
| `cnes_unidade_saude` | Código CNES da Unidade de Saúde |

---

# Seção: Conclusão do Caso

## Campo 65 — Classificação Final

| AcroForm | Rótulo |
|---|---|
| `classificacao_final` | 1=Intoxicação confirmada, 2=Só exposição, 3=Reação adversa, 4=Outro diagnóstico, 5=Síndrome de abstinência, 9=Ignorado |

## Campo 66 — Se Intoxicação Confirmada, Qual o Diagnóstico

| AcroForm | Rótulo |
|---|---|
| `intoxicacao_confirmada_diagnostico` | Diagnóstico (texto livre) |
| `intoxicacao_confirmada_cid` | Código CID-10 |

## Campo 67 — Critério de Confirmação

| AcroForm | Rótulo |
|---|---|
| `criterio_confirmacao` | 1=Laboratorial, 2=Clínico-epidemiológico, 3=Clínico |

## Campo 68 — Evolução do Caso

| AcroForm | Rótulo |
|---|---|
| `evolucao_caso` | 1=Cura sem sequela, 2=Cura com sequela, 3=Óbito por intoxicação exógena, 4=Óbito por outra causa, 5=Perda de seguimento, 9=Ignorado |

## Campo 69 — Data do Óbito

| AcroForm | Rótulo |
|---|---|
| `obito_data` | Data do óbito |

## Campo 70 — Comunicação de Acidente de Trabalho (CAT)

| AcroForm | Rótulo |
|---|---|
| `cat_emitida` | 1=Sim, 2=Não, 3=Não se aplica, 9=Ignorado |

## Campo 71 — Data do Encerramento

| AcroForm | Rótulo |
|---|---|
| `data_encerramento` | Data do Encerramento |

---

# Seção: Informações Complementares e Observações

| AcroForm | Rótulo |
|---|---|
| `observacoes_complementares` | Texto livre — campo de área ampla para informações complementares e observações gerais |