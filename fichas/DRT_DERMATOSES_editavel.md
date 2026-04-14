## Contexto
Este documento mapeia os campos AcroForm de um formulário PDF (SINAN — Ficha de Investigação Dermatoses Ocupacionais) para seus respectivos rótulos e valores aceitos. Com base nas respostas do usuário em um formulário HTML, preencha cada campo com o valor correspondente à escala indicada. Campos de texto livre devem receber a string exatamente como o usuário digitou.

---

# Número da Notificação
*(Campo de cabeçalho, fora de qualquer seção)*

| AcroForm | Rótulo |
|---|---|
| `notificacao_numero` | Número da Notificação |

---

# Seção: Dados Gerais

Campo 1 — Tipo de Notificação: valor fixo, não editável (2 - Individual)

Campo 2 — Agravo/doença: valor fixo, não editável (Dermatoses Ocupacionais / CID10: L98.9)

## Campo 3 — Data da Notificação

| AcroForm | Rótulo |
|---|---|
| `data_notificacao` | Data da Notificação |

## Campos 4 e 5 — UF e Município de Notificação

| AcroForm | Rótulo |
|---|---|
| `uf_notificacao` | UF de Notificação |
| `municipio_notificacao_nome` | Município de Notificação (nome) |
| `municipio_notificacao_codigo_ibge` | Município de Notificação — Código IBGE |

## Campo 6 — Unidade de Saúde Notificadora

| AcroForm | Rótulo |
|---|---|
| `unidade_notificadora_nome` | Unidade de Saúde (ou outra fonte notificadora) — Nome |
| `unidade_notificadora_cnes` | Unidade de Saúde — Código CNES |

## Campo 7 — Data do Diagnóstico

| AcroForm | Rótulo |
|---|---|
| `data_diagnostico` | Data do Diagnóstico |

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

## Campo 31 — Ocupação

| AcroForm | Rótulo |
|---|---|
| `pessoa_ocupacao` | Ocupação (texto livre) |

## Campo 32 — Situação no Mercado de Trabalho

| AcroForm | Rótulo |
|---|---|
| `situacao_mercado_trabalho` | 01=Empregado registrado com carteira assinada, 02=Empregado não registrado, 03=Autônomo/conta própria, 04=Servidor público estatutário, 05=Servidor público celetista, 06=Aposentado, 07=Desempregado, 08=Trabalho temporário, 09=Cooperativado, 10=Trabalhador avulso, 11=Empregador, 12=Outros, 99=Ignorado |

## Campo 33 — Tempo de Trabalho na Ocupação

| AcroForm | Rótulo |
|---|---|
| `tempo_trabalho_ocupacao_valor` | Valor numérico do tempo |
| `tempo_trabalho_ocupacao_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Dados da Empresa Contratante

## Campo 34 — Registro / CNPJ ou CPF

| AcroForm | Rótulo |
|---|---|
| `empresa_registro_cnpj_cpf` | Registro / CNPJ ou CPF |

## Campo 35 — Nome da Empresa ou Empregador

| AcroForm | Rótulo |
|---|---|
| `empresa_nome` | Nome da Empresa ou Empregador |

## Campo 36 — Atividade Econômica (CNAE)

| AcroForm | Rótulo |
|---|---|
| `empresa_cnae` | Atividade Econômica — CNAE |

## Campos 37 e 38 — UF e Município da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_uf` | UF da Empresa |
| `empresa_municipio` | Município da Empresa |
| `empresa_cnae_codigo_ibge` | Município da Empresa — Código IBGE |

## Campo 39 — Distrito da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_distrito` | Distrito |

## Campo 40 — Bairro da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_bairro` | Bairro |

## Campo 41 — Endereço da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_endereco` | Endereço |

## Campo 42 — Número da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_numero` | Número |

## Campo 43 — Ponto de Referência da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_ponto_referencia` | Ponto de Referência |

## Campo 44 — Telefone da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_telefone` | (DDD) Telefone |

## Campo 45 — O Empregador é Empresa Terceirizada

| AcroForm | Rótulo |
|---|---|
| `empresa_terceirizada` | 1=Sim, 2=Não, 3=Não se aplica, 9=Ignorado |

## Campo 46 — Agravos Associados
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `agravo_hipertensao` | Hipertensão Arterial |
| `agravo_diabetes` | Diabetes Mellitus |
| `agravo_hanseniase` | Hanseníase |
| `agravo_transtorno_mental` | Transtorno Mental |
| `agravo_tuberculose` | Tuberculose |
| `agravo_asma` | Asma |
| `agravo_outras` | Outras (mesma escala 1/2/9) |
| `agravo_outras_detalhe` | Texto livre — especificar quando "Outras" = Sim |

## Campo 47 — Tempo de Exposição ao Agente de Risco

| AcroForm | Rótulo |
|---|---|
| `tempo_exposicao_valor` | Valor numérico do tempo |
| `tempo_exposicao_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 48 — Regime de Tratamento

| AcroForm | Rótulo |
|---|---|
| `regime_tratamento` | 1=Hospitalar, 2=Ambulatorial |

---

# Seção: Dermatoses Ocupacionais

## Campo 49 — Principal Agente Causador da Dermatose

| AcroForm | Rótulo |
|---|---|
| `agente_causador` | 01=Cimento, 02=Borracha, 03=Plástico, 04=Solventes Orgânicos, 05=Graxas, 06=Óleo de Corte, 07=Resinas, 08=Níquel, 09=Cosméticos, 10=Madeiras, 11=Cromo, 12=Outros, 99=Ignorado |
| `agente_outros` | Texto livre — especificar quando agente = 12 (Outros) |

## Campo 50 — Localização da Lesão (parte do corpo atingida)

| AcroForm | Rótulo |
|---|---|
| `localizacao_lesao` | 01=Mão, 02=Membro superior, 03=Cabeça, 04=Pescoço, 05=Tórax, 06=Abdome, 07=Membro inferior, 08=Pé, 09=Todo o corpo, 10=Outro, 99=Ignorado |
| `localizacao_outro_detalhe` | Texto livre — especificar quando localização = 10 (Outro) |

## Campo 51 — Teste Epicutâneo Positivo

| AcroForm | Rótulo |
|---|---|
| `teste_epicutaneo` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 52 — Diagnóstico Específico (CID-10)

| AcroForm | Rótulo |
|---|---|
| `diagnostico_especifico_cid10` | Código CID-10 (texto livre) |

---

# Seção: Conclusão

## Campo 53 — Houve Afastamento do Trabalho para Tratamento?

| AcroForm | Rótulo |
|---|---|
| `afastamento_tratamento` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 54 — Tempo de Afastamento do Trabalho para Tratamento

| AcroForm | Rótulo |
|---|---|
| `tempo_afastamento_valor` | Valor numérico do tempo |
| `tempo_afastamento_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 55 — Com Afastamento do Trabalho

| AcroForm | Rótulo |
|---|---|
| `afastamento_resultado` | 1=Melhora, 2=Piora, 9=Ignorado |

## Campo 56 — Há ou Houve Outros Trabalhadores com a mesma Doença no Local de Trabalho

| AcroForm | Rótulo |
|---|---|
| `outros_trabalhadores_doenca` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 57 — Conduta Geral
*(1=Sim, 2=Não para cada opção)*

| AcroForm | Rótulo |
|---|---|
| `conduta_afastamento_risco` | Afastamento do agente do risco com mudança de função e/ou posto de trabalho |
| `conduta_mudanca_organizacao` | Adoção de mudança na organização do trabalho |
| `conduta_protecao_coletiva` | Adoção de proteção coletiva |
| `conduta_afastamento_local` | Afastamento do local de trabalho |
| `conduta_protecao_individual` | Adoção de proteção individual |
| `conduta_nenhum` | Nenhum |
| `conduta_outros` | Outros |
| `conduta_outros_detalhe` | Texto livre — especificar quando "Outros" = Sim |

## Campo 58 — Evolução do Caso

| AcroForm | Rótulo |
|---|---|
| `evolucao_caso` | 1=Cura, 2=Cura não confirmada, 3=Incapacidade Temporária, 4=Incapacidade Permanente Parcial, 5=Incapacidade Permanente Total, 6=Óbito por doença relacionada ao trabalho, 7=Óbito por Outra Causa, 8=Outro, 9=Ignorado |

## Campo 59 — Se Óbito, Data

| AcroForm | Rótulo |
|---|---|
| `obito_data` | Data do óbito |

## Campo 60 — Foi Emitida a Comunicação de Acidente do Trabalho (CAT)

| AcroForm | Rótulo |
|---|---|
| `cat_emitida` | 1=Sim, 2=Não, 3=Não se aplica, 9=Ignorado |

---

# Seção: Informações Complementares e Observações

| AcroForm | Rótulo |
|---|---|
| `observacoes_complementares` | Texto livre — campo de área ampla para informações complementares e observações gerais |