## Contexto
Este documento mapeia os campos AcroForm de um formulário PDF (SINAN — Ficha de Investigação Acidente de Trabalho) para seus respectivos rótulos e valores aceitos. Com base nas respostas do usuário em um formulário HTML, preencha cada campo com o valor correspondente à escala indicada. Campos de texto livre devem receber a string exatamente como o usuário digitou.

---

# Número da Notificação
*(Campo de cabeçalho, fora de qualquer seção)*

| AcroForm | Rótulo |
|---|---|
| `notificacao_numero` | Número da Notificação |

---

# Seção: Dados Gerais

Campo 1 — Tipo de Notificação: valor fixo, não editável (2 - Individual)

Campo 2 — Agravo/doença: valor fixo, não editável (Acidente de Trabalho / CID10: Y96)

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

## Campo 7 — Data do Acidente

| AcroForm | Rótulo |
|---|---|
| `data_acidente` | Data do Acidente |

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
| `tempo_trabalho_ocupacao` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 34 — Local Onde Ocorreu o Acidente

| AcroForm | Rótulo |
|---|---|
| `local_acidente` | 1=Instalações do contratante, 2=Via pública, 3=Instalações de terceiros, 4=Domicílio próprio, 9=Ignorado |

## Dados da Empresa Contratante

## Campo 35 — Registro / CNPJ ou CPF

| AcroForm | Rótulo |
|---|---|
| `empresa_registro_cnpj_cpf` | Registro / CNPJ ou CPF |

## Campo 36 — Nome da Empresa ou Empregador

| AcroForm | Rótulo |
|---|---|
| `empresa_nome` | Nome da Empresa ou Empregador |

## Campo 37 — Atividade Econômica (CNAE)

| AcroForm | Rótulo |
|---|---|
| `empresa_cnae` | Atividade Econômica — CNAE |

## Campos 38 e 39 — UF e Município da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_uf` | UF da Empresa |
| `empresa_municipio` | Município da Empresa |
| `empresa_cnae_codigo_ibge` | Município da Empresa — Código IBGE |

## Campo 40 — Distrito da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_distrito` | Distrito |

## Campo 41 — Bairro da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_bairro` | Bairro |

## Campo 42 — Endereço da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_endereco` | Endereço |

## Campo 43 — Número da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_num` | Número |

## Campo 44 — Ponto de Referência da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_ponto_referencia` | Ponto de Referência |

## Campo 45 — Telefone da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_telefone` | (DDD) Telefone |

## Campo 46 — O Empregador é Empresa Terceirizada

| AcroForm | Rótulo |
|---|---|
| `empresa_terceirizada` | 1=Sim, 2=Não, 3=Não se aplica, 9=Ignorado |

## Campo 47 — Se Empresa Terceirizada, Qual o CNAE da Empresa Principal

| AcroForm | Rótulo |
|---|---|
| `empresa_terceirizada_cnae` | CNAE da Empresa Principal (texto livre) |

## Campo 48 — CNPJ da Empresa Principal

| AcroForm | Rótulo |
|---|---|
| `empresa_principal_cnpj` | CNPJ da Empresa Principal |

## Campo 49 — Razão Social (Nome da Empresa)

| AcroForm | Rótulo |
|---|---|
| `empresa_principal_razao_social` | Razão Social da Empresa Principal (texto livre) |

---

# Seção: Dados do Acidente

## Campo 50 — Hora do Acidente

| AcroForm | Rótulo |
|---|---|
| `hora_acidente_hora` | Hora (hh) |
| `hora_acidente_minuto` | Minuto (mm) |

## Campo 51 — Horas Após o Início da Jornada

| AcroForm | Rótulo |
|---|---|
| `horas_apos_jornada_hora` | Hora (hh) |
| `horas_apos_jornada_minuto` | Minuto (mm) |

## Campos 52 e 53 — UF e Município de Ocorrência do Acidente

| AcroForm | Rótulo |
|---|---|
| `acidente_uf` | UF de Ocorrência do Acidente |
| `acidente_municipio_nome` | Município de Ocorrência do Acidente (nome) |
| `acidente_municipio_codigo_ibge` | Município de Ocorrência do Acidente — Código IBGE |

## Campo 54 — Código da Causa do Acidente CID-10 (de V01 a Y98)

| AcroForm | Rótulo |
|---|---|
| `acidente_causa_cid10` | Código CID-10 da causa do acidente (texto livre) |

## Campo 55 — Tipo de Acidente

| AcroForm | Rótulo |
|---|---|
| `tipo_acidente` | 1=Típico, 2=Trajeto, 9=Ignorado |

## Campo 56 — Houve Outros Trabalhadores Atingidos

| AcroForm | Rótulo |
|---|---|
| `outros_trabalhadores_atingidos` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 57 — Se Sim, Quantos

| AcroForm | Rótulo |
|---|---|
| `outros_trabalhadores_quantos` | Quantidade (numérico) |

---

# Seção: Dados do Atendimento Médico

## Campo 58 — Ocorreu Atendimento Médico?

| AcroForm | Rótulo |
|---|---|
| `atendimento_medico_ocorreu` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 59 — Data do Atendimento

| AcroForm | Rótulo |
|---|---|
| `data_atendimento` | Data do Atendimento |

## Campo 60 — UF do Atendimento

| AcroForm | Rótulo |
|---|---|
| `atendimento_uf` | UF do Atendimento |

## Campo 61 — Município do Atendimento

| AcroForm | Rótulo |
|---|---|
| `atendimento_municipio_nome` | Município do Atendimento (nome) |
| `atendimento_municipio_codigo_ibge` | Município do Atendimento — Código IBGE |

## Campo 62 — Nome da Unidade de Saúde de Atendimento

| AcroForm | Rótulo |
|---|---|
| `atendimento_unidade_saude_nome` | Nome da Unidade de Saúde de Atendimento |
| `atendimento_unidade_saude_codigo` | Código da Unidade de Saúde de Atendimento |

## Campo 63 — Partes do Corpo Atingidas

| AcroForm | Rótulo |
|---|---|
| `corpo_atingido_1` | Parte do corpo atingida 1: 01=Olho, 02=Cabeça, 03=Pescoço, 04=Tórax, 05=Abdome, 06=Mão, 07=Membro superior, 08=Membro inferior, 09=Pé, 10=Todo o corpo, 11=Outro, 99=Ignorado |
| `corpo_atingido_2` | Parte do corpo atingida 2 (mesma escala) |
| `corpo_atingido_3` | Parte do corpo atingida 3 (mesma escala) |

## Campo 64 — Diagnóstico da Lesão (CID-10)

| AcroForm | Rótulo |
|---|---|
| `diagnostico_lesao_cid10` | Código CID-10 do diagnóstico da lesão (texto livre) |

## Campo 65 — Regime de Tratamento

| AcroForm | Rótulo |
|---|---|
| `regime_tratamento` | 1=Hospitalar, 2=Ambulatorial, 3=Ambos, 9=Ignorado |

---

# Seção: Conclusão

## Campo 66 — Evolução do Caso

| AcroForm | Rótulo |
|---|---|
| `evolucao_caso` | 1=Cura, 2=Incapacidade temporária, 3=Incapacidade parcial permanente, 4=Incapacidade total permanente, 5=Óbito por acidente de trabalho grave, 6=Óbito por outras causas, 7=Outro, 9=Ignorado |

## Campo 67 — Se Óbito, Data do Óbito

| AcroForm | Rótulo |
|---|---|
| `obito_data` | Data do óbito |

## Campo 68 — Foi Emitida a Comunicação de Acidente no Trabalho (CAT)

| AcroForm | Rótulo |
|---|---|
| `cat_emitida` | 1=Sim, 2=Não, 3=Não se aplica, 9=Ignorado |

---

# Seção: Informações Complementares e Observações

| AcroForm | Rótulo |
|---|---|
| `descricao_acidente` | Texto livre — Descrição sumária de como ocorreu o acidente / atividade / causas / condições / objeto / agentes que concorreram direta ou indiretamente para a ocorrência do acidente |
| `observacoes_complementares` | Texto livre — Outras informações |