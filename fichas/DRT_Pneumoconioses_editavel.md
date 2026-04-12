## Contexto
Este documento mapeia os campos AcroForm de um formulário PDF (SINAN — Ficha de Investigação Pneumoconioses) para seus respectivos rótulos e valores aceitos. Com base nas respostas do usuário em um formulário HTML, preencha cada campo com o valor correspondente à escala indicada. Campos de texto livre devem receber a string exatamente como o usuário digitou.

---

# Número da Notificação
*(Campo de cabeçalho, fora de qualquer seção)*

| AcroForm | Rótulo |
|---|---|
| `notificacao_numero` | Número da Notificação |

---

# Seção: Dados Gerais

Campo 1 — Tipo de Notificação: valor fixo, não editável (2 - Individual)

Campo 2 — Agravo/doença: valor fixo, não editável (Pneumoconioses)

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
| `paciente_sexo` | Sexo: M=Masculino, F=Feminino, I=Ignorado |

## Campo 12 — Gestante

| AcroForm | Rótulo |
|---|---|
| `paciente_gestante` | 1=1º Trimestre, 2=2º Trimestre, 3=3º Trimestre, 4=Idade gestacional ignorada, 5=Não, 6=Não se aplica, 9=Ignorado |

## Campo 13 — Raça/Cor

| AcroForm | Rótulo |
|---|---|
| `paciente_raca` | 1=Branca, 2=Preta, 3=Amarela, 4=Parda, 5=Indígena, 9=Ignorado |

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
| `tempo_trabalho_ocupacao_va` | Valor numérico do tempo |
| `tempo_trabalho_ocupacao_t` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 34 — Registro / CNPJ ou CPF da Empresa

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

## Campo 37 — UF da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_uf` | UF da Empresa |

## Campo 38 — Município da Empresa

| AcroForm | Rótulo |
|---|---|
| `empresa_municipio` | Município da Empresa |
| `empresa_municipio_codigo_ibge` | Município da Empresa — Código IBGE |

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

## Campo 46 — Agravos Associadas
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `agravo_limitacao_fluxo` | Limitação crônica ao fluxo aéreo |
| `agravo_tuberculose` | Tuberculose |
| `agravo_cancer` | Câncer |
| `agravo_artrite_reumatoide` | Artrite reumatóide |
| `agravo_tireoidite` | Tireoidite |
| `agravo_outras` | Outras (mesma escala 1/2/9) |
| `agravo_outras_detalhe` | Texto livre — especificar quando "Outras" = Sim |

## Campo 47 — Tempo de Trabalho na Empresa Atual

| AcroForm | Rótulo |
|---|---|
| `tempo_trabalho_empresa_atual_valor` | Valor numérico do tempo |
| `tempo_trabalho_empresa_atual_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 48 — Tempo Total de Exposição ao Agente de Risco

| AcroForm | Rótulo |
|---|---|
| `tempo_exposicao_total_valor` | Valor numérico do tempo |
| `tempo_exposicao_total_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 49 — Regime de Tratamento

| AcroForm | Rótulo |
|---|---|
| `regime_tratamento` | 1=Hospitalar, 2=Ambulatorial |

## Campo 50 — Uso de Equipamento de Proteção Individual (EPI)

| AcroForm | Rótulo |
|---|---|
| `uso_epi` | 1=Sim, 2=Não, 9=Ignorado |

---

# Seção: Pneumoconioses

## Campo 51 — Agentes de Exposição
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `exposicao_silica` | Sílica |
| `exposicao_asbesto` | Asbesto |
| `exposicao_poeiras_carvao` | Poeiras de carvão mineral |
| `exposicao_poeiras_mistas` | Poeiras mistas (silicatos, talco) |
| `exposicao_metais_duros` | Metais duros (cobalto, titânio, tungstênio) |
| `exposicao_poeiras_abrasivos` | Poeiras de abrasivos |
| `exposicao_berilio` | Berílio |
| `exposicao_poeiras_organicas` | Poeiras orgânicas |

## Campo 52 — Diagnóstico Específico (CID-10)

| AcroForm | Rótulo |
|---|---|
| `diagnostico_especifico_cid` | Código CID-10 (texto livre) |

## Campo 53 — Tabagismo

| AcroForm | Rótulo |
|---|---|
| `tabagismo` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 54 — Confirmação Diagnóstica
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `confirmacao_radiografia` | Radiografia de tórax |
| `confirmacao_biopsia` | Biópsia pulmonar |
| `confirmacao_tomografia` | Tomografia de tórax de alta resolução |
| `confirmacao_outro` | Outro |

## Campo 55 — Classificação OIT da Radiografia de Tórax

| AcroForm | Rótulo |
|---|---|
| `oit_profusao` | Profusão: 0/-, 0/0, 0/1, 1/0, 1/1, 1/2, 2/1, 2/2, 2/3, 3/2, 3/3, 3/+ |
| `oit_tipo` | Tipo: p, q, r (opacidades irregulares) / s, t, u (opacidades regulares) |
| `oit_extensao` | Extensão: RD=Direito, RE=Esquerdo |

## Campo 56 — Avaliação Funcional Respiratória

| AcroForm | Rótulo |
|---|---|
| `avaliacao_funcional` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 57 — Tipo de Disfunção Ventilatória

| AcroForm | Rótulo |
|---|---|
| `disfuncao_ventilatoria` | 1=Obstrutiva, 2=Restritiva, 3=Mista, 9=Ignorado |

## Campo 58 — Resultado da Avaliação Funcional

| AcroForm | Rótulo |
|---|---|
| `avaliacao_funcional_resultado` | 1=Normal, 2=Alterada |

---

# Seção: Conclusão

## Campo 59 — Conduta Geral
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

## Campo 60 — Evolução do Caso

| AcroForm | Rótulo |
|---|---|
| `evolucao_caso` | 1=Cura, 2=Cura não confirmada, 3=Incapacidade Temporária, 4=Incapacidade Permanente Parcial, 5=Incapacidade Permanente Total, 6=Óbito por doença relacionada ao trabalho, 7=Óbito por Outra Causa, 8=Outro, 9=Ignorado |

## Campo 61 — Data do Óbito

| AcroForm | Rótulo |
|---|---|
| `obito_data` | Data do óbito |

## Campo 62 — Foi emitida a Comunicação de Acidente do Trabalho (CAT)

| AcroForm | Rótulo |
|---|---|
| `cat_emitida` | 1=Sim, 2=Não, 3=Não se aplica, 9=Ignorado |

## Campo 63 — Há ou Houve Outros Trabalhadores com a mesma Doença no Local de Trabalho

| AcroForm | Rótulo |
|---|---|
| `outros_trabalhadores_doenca` | 1=Sim, 2=Não, 9=Ignorado |

---

# Seção: Informações Complementares e Observações

| AcroForm | Rótulo |
|---|---|
| `observacoes_complementares` | Texto livre — campo de área ampla para informações complementares e observações gerais |