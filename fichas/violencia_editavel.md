## Contexto
Este documento mapeia os campos AcroForm de um formulário PDF (SINAN — Ficha de Investigação Violência Interpessoal/Autoprovocada) para seus respectivos rótulos e valores aceitos. Com base nas respostas do usuário em um formulário HTML, preencha cada campo com o valor correspondente à escala indicada. Campos de texto livre devem receber a string exatamente como o usuário digitou.

---

# Número da Notificação
*(Campo de cabeçalho, fora de qualquer seção)*

| AcroForm | Rótulo |
|---|---|
| `notificacao_numero` | Número da Notificação |

---

# Seção: Dados Gerais

Campo 1 — Tipo de Notificação: valor fixo, não editável (2 - Individual)

Campo 2 — Agravo/doença: valor fixo, não editável (Violência Interpessoal/Autoprovocada / CID10: Y09)

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

## Campo 6 — Unidade Notificadora (tipo)

| AcroForm | Rótulo |
|---|---|
| `unidade_notificadora_codigo` | Tipo de Unidade Notificadora: 1=Unidade de Saúde, 2=Unidade de Assistência Social, 3=Estabelecimento de Ensino, 4=Conselho Tutelar, 5=Unidade de Saúde Indígena, 6=Centro Especializado de Atendimento à Mulher, 7=Outros |

## Campo 7 — Nome da Unidade Notificadora

| AcroForm | Rótulo |
|---|---|
| `unidade_notificadora_nome` | Nome da Unidade Notificadora |
| `unidade_notificadora_cnes` | Código Unidade (CNES) |

## Campo 8 — Unidade de Saúde

| AcroForm | Rótulo |
|---|---|
| `unidade_saude_nome` | Unidade de Saúde (nome) |
| `unidade_saude_cnes` | Código CNES da Unidade de Saúde |

## Campo 9 — Data da Ocorrência da Violência

| AcroForm | Rótulo |
|---|---|
| `data_ocorrencia` | Data da Ocorrência da Violência |

---

# Seção: Notificação Individual

## Campo 10 — Nome do Paciente

| AcroForm | Rótulo |
|---|---|
| `paciente_nome` | Nome do Paciente |

## Campo 11 — Data de Nascimento

| AcroForm | Rótulo |
|---|---|
| `paciente_data_nascimento` | Data de Nascimento |

## Campo 12 — Idade

| AcroForm | Rótulo |
|---|---|
| `paciente_idade_valor` | Valor numérico da idade |
| `paciente_idade_tipo` | Unidade: 1=Hora, 2=Dia, 3=Mês, 4=Ano |

## Campo 13 — Sexo

| AcroForm | Rótulo |
|---|---|
| `paciente_sexo` | M=Masculino, F=Feminino, I=Ignorado |

## Campo 14 — Gestante

| AcroForm | Rótulo |
|---|---|
| `paciente_gestante` | 1=1ºTrimestre, 2=2ºTrimestre, 3=3ºTrimestre, 4=Idade gestacional ignorada, 5=Não, 6=Não se aplica, 9=Ignorado |

## Campo 15 — Raça/Cor

| AcroForm | Rótulo |
|---|---|
| `paciente_raca_cor` | 1=Branca, 2=Preta, 3=Amarela, 4=Parda, 5=Indígena, 9=Ignorado |

## Campo 16 — Escolaridade

| AcroForm | Rótulo |
|---|---|
| `paciente_escolaridade` | 0=Analfabeto, 1=1ª a 4ª série incompleta do EF, 2=4ª série completa do EF, 3=5ª a 8ª série incompleta do EF, 4=Ensino fundamental completo, 5=Ensino médio incompleto, 6=Ensino médio completo, 7=Educação superior incompleta, 8=Educação superior completa, 9=Ignorado, 10=Não se aplica |

## Campo 17 — Número do Cartão SUS

| AcroForm | Rótulo |
|---|---|
| `paciente_cartao_sus` | Número do Cartão SUS |

## Campo 18 — Nome da Mãe

| AcroForm | Rótulo |
|---|---|
| `paciente_mae_nome` | Nome da mãe |

---

# Seção: Dados de Residência

## Campos 19 e 20 — UF e Município de Residência

| AcroForm | Rótulo |
|---|---|
| `residencia_uf` | UF de Residência |
| `residencia_municipio_nome` | Município de Residência (nome) |
| `residencia_municipio_codigo_ibge` | Município de Residência — Código IBGE |

## Campo 21 — Distrito

| AcroForm | Rótulo |
|---|---|
| `residencia_distrito` | Distrito |

## Campo 22 — Bairro

| AcroForm | Rótulo |
|---|---|
| `residencia_bairro` | Bairro |

## Campo 23 — Logradouro

| AcroForm | Rótulo |
|---|---|
| `residencia_logradouro` | Logradouro (rua, avenida, ...) |
| `residencia_logradouro_codigo` | Código do Logradouro *(nunca aparece no HTML — deixar em branco no PDF)* |

## Campo 24 — Número

| AcroForm | Rótulo |
|---|---|
| `residencia_numero` | Número |

## Campo 25 — Complemento

| AcroForm | Rótulo |
|---|---|
| `residencia_complemento` | Complemento (apto., casa, ...) |

## Campo 26 — Geo campo 1

| AcroForm | Rótulo |
|---|---|
| `residencia_geo_campo_1` | Geo campo 1 *(nunca aparece no HTML — deixar em branco no PDF)* |

## Campo 27 — Geo campo 2

| AcroForm | Rótulo |
|---|---|
| `residencia_geo_campo_2` | Geo campo 2 *(nunca aparece no HTML — deixar em branco no PDF)* |

## Campo 28 — Ponto de Referência

| AcroForm | Rótulo |
|---|---|
| `residencia_ponto_de_referencia` | Ponto de Referência |

## Campo 29 — CEP

| AcroForm | Rótulo |
|---|---|
| `residencia_cep` | CEP |

## Campo 30 — Telefone

| AcroForm | Rótulo |
|---|---|
| `residencia_telefone` | (DDD) Telefone |

## Campo 31 — Zona

| AcroForm | Rótulo |
|---|---|
| `residencia_zona` | 1=Urbana, 2=Rural, 3=Periurbana, 9=Ignorado |

## Campo 32 — País

| AcroForm | Rótulo |
|---|---|
| `residencia_pais` | País (se residente fora do Brasil) |

---

# Seção: Dados da Pessoa Atendida

## Campo 33 — Nome Social

| AcroForm | Rótulo |
|---|---|
| `pessoa_nome_social` | Nome Social |

## Campo 34 — Ocupação

| AcroForm | Rótulo |
|---|---|
| `pessoa_ocupacao` | Ocupação (texto livre) |

## Campo 35 — Situação Conjugal / Estado Civil

| AcroForm | Rótulo |
|---|---|
| `pessoa_situacao_conjugal` | 1=Solteiro, 2=Casado/união consensual, 3=Viúvo, 4=Separado, 8=Não se aplica, 9=Ignorado |

## Campo 36 — Orientação Sexual

| AcroForm | Rótulo |
|---|---|
| `pessoa_orientacao_sexual` | 1=Heterossexual, 2=Homossexual (gay/lésbica), 3=Bissexual, 8=Não se aplica, 9=Ignorado |

## Campo 37 — Identidade de Gênero

| AcroForm | Rótulo |
|---|---|
| `pessoa_identidade_genero` | 1=Travesti, 2=Mulher Transexual, 3=Homem Transexual, 8=Não se aplica, 9=Ignorado |

## Campo 38 — Possui Alguma Deficiência/Transtorno?

| AcroForm | Rótulo |
|---|---|
| `pessoa_possui_deficiencia` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 39 — Se Sim, Qual o Tipo de Deficiência/Transtorno?
*(1=Sim, 2=Não, 8=Não se aplica, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `deficiencia_fisica` | Física |
| `deficiencia_visual` | Visual |
| `deficiencia_intelectual` | Intelectual |
| `deficiencia_auditiva` | Auditiva |
| `deficiencia_transtorno_mental` | Transtorno mental |
| `deficiencia_transtorno_comportamento` | Transtorno de comportamento |
| `deficiencia_outras` | Outras (mesma escala) |
| `deficiencia_outras_detalhe` | Texto livre — especificar quando "Outras" = Sim |

---

# Seção: Dados da Ocorrência

## Campos 40 e 41 — UF e Município de Ocorrência

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_uf` | UF de Ocorrência |
| `ocorrencia_municipio_nome` | Município de Ocorrência (nome) |
| `ocorrencia_municipio_codigo_ibge` | Município de Ocorrência — Código IBGE |

## Campo 42 — Distrito

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_distrito` | Distrito |

## Campo 43 — Bairro

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_bairro` | Bairro |

## Campo 44 — Logradouro

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_logradouro` | Logradouro (rua, avenida, ...) |
| `ocorrencia_logradouro_codigo` | Código do Logradouro *(nunca aparece no HTML — deixar em branco no PDF)* |

## Campo 45 — Número

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_numero` | Número |

## Campo 46 — Complemento

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_bairro` | Complemento (apto., casa, ...) |

## Campo 47 — Geo campo 3

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_geo_campo3` | Geo campo 3 *(nunca aparece no HTML — deixar em branco no PDF)* |

## Campo 48 — Geo campo 4

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_complemento` | Geo campo 4 *(nunca aparece no HTML — deixar em branco no PDF)* |

## Campo 49 — Ponto de Referência

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_ponto_referencia` | Ponto de Referência |

## Campo 50 — Zona

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_zona` | 1=Urbana, 2=Rural, 3=Periurbana, 9=Ignorado |

## Campo 51 — Hora da Ocorrência

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_hora` | Hora da Ocorrência (00:00 – 23:59) |

## Campo 52 — Local de Ocorrência

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_local_tipo` | 01=Residência, 02=Habitação coletiva, 03=Escola, 04=Local de prática esportiva, 05=Bar ou similar, 06=Via pública, 07=Comércio/serviços, 08=Indústrias/construção, 09=Outro, 99=Ignorado |
| `ocorrencia_local_detalhe` | Texto livre — especificar quando "Outro" selecionado |

## Campo 53 — Ocorreu Outras Vezes?

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_repetida` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 54 — A Lesão Foi Autoprovocada?

| AcroForm | Rótulo |
|---|---|
| `ocorrencia_lesao_autoprovocada` | 1=Sim, 2=Não, 9=Ignorado |

---

# Seção: Violência

## Campo 55 — Essa Violência Foi Motivada Por:

| AcroForm | Rótulo |
|---|---|
| `motivacao_codigo` | 01=Sexismo, 02=Homofobia/Lesbofobia/Bifobia/Transfobia, 03=Racismo, 04=Intolerância religiosa, 05=Xenofobia, 06=Conflito geracional, 07=Situação de rua, 08=Deficiência, 09=Outros, 99=Ignorado |
| `motivacao_outros_detalhe` | Texto livre — especificar quando "Outros" selecionado |

## Campo 56 — Tipo de Violência
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `violencia_fisica` | Física |
| `violencia_psicologica_moral` | Psicológica/moral |
| `violencia_tortura` | Tortura |
| `violencia_sexual` | Sexual |
| `violencia_trafico_seres_humanos` | Tráfico de seres humanos |
| `violencia_financeira_economica` | Financeira/econômica |
| `violencia_negligencia_abandono` | Negligência/abandono |
| `violencia_trabalho_infantil` | Trabalho infantil |
| `violencia_intervencao_legal` | Intervenção legal |
| `violencia_outras` | Outras (mesma escala) |
| `violencia_outras_detalhe` | Texto livre — especificar quando "Outras" = Sim |

## Campo 57 — Meio de Agressão
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `agressao_forca_corporal` | Força corporal/espancamento |
| `agressao_enforcamento` | Enforcamento |
| `agressao_objeto_perfurocortante` | Objeto perfurocortante |
| `agressao_objeto_contundente` | Objeto contundente |
| `agressao_substancia_quente` | Substância quente |
| `agressao_envenenamento` | Envenenamento/intoxicação |
| `agressao_arma_de_fogo` | Arma de fogo |
| `agressao_ameaca` | Ameaça |
| `agressao_outro` | Outro (mesma escala) |
| `agressao_outro_detalhe` | Texto livre — especificar quando "Outro" = Sim |

---

# Seção: Violência Sexual

## Campo 58 — Se Ocorreu Violência Sexual, Qual o Tipo?
*(1=Sim, 2=Não, 8=Não se aplica, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `sexual_assedio` | Assédio sexual |
| `sexual_estupro` | Estupro |
| `sexual_pornografia_infantil` | Pornografia infantil |
| `sexual_exploracao` | Exploração sexual |
| `sexual_outros` | Outros (mesma escala) |
| `sexual_outros_detalhe` | Texto livre — especificar quando "Outros" = Sim |

## Campo 59 — Procedimento Realizado
*(1=Sim, 2=Não, 8=Não se aplica, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `procedimento_profilaxia_dst` | Profilaxia DST |
| `procedimento_profilaxia_hiv` | Profilaxia HIV |
| `procedimento_profilaxia_hepatite_b` | Profilaxia Hepatite B |
| `procedimento_coleta_sangue` | Coleta de sangue |
| `procedimento_coleta_semen` | Coleta de sêmen |
| `procedimento_coleta_secrecao_vaginal` | Coleta de secreção vaginal |
| `procedimento_contracepcao_emergencial` | Contracepção emergencial |
| `procedimento_aborto_previsto_lei` | Aborto previsto em lei |

---

# Seção: Dados do Provável Autor da Violência

## Campo 60 — Número de Envolvidos

| AcroForm | Rótulo |
|---|---|
| `autor_numero_envolvidos` | 1=Um, 2=Dois ou mais, 9=Ignorado |

## Campo 61 — Vínculo/Grau de Parentesco com a Pessoa Atendida
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `autor_vinculo_pai` | Pai |
| `autor_vinculo_mae` | Mãe |
| `autor_vinculo_padrasto` | Padrasto |
| `autor_vinculo_madrasta` | Madrasta |
| `autor_vinculo_conjuge` | Cônjuge |
| `autor_vinculo_ex_conjuge` | Ex-cônjuge |
| `autor_vinculo_namorado` | Namorado(a) |
| `autor_vinculo_ex_namorado` | Ex-namorado(a) |
| `autor_vinculo_filho` | Filho(a) |
| `autor_vinculo_irmao` | Irmão/irmã |
| `autor_vinculo_amigo_conhecido` | Amigo/conhecido |
| `autor_vinculo_desconhecido` | Desconhecido |
| `autor_vinculo_cuidador` | Cuidador(a) |
| `autor_vinculo_relacao_institucional` | Relação institucional |
| `autor_vinculo_patrao_chefe` | Patrão/chefe |
| `autor_vinculo_policial` | Policial/agente da lei |
| `autor_vinculo_propria_pessoa` | Própria pessoa |
| `autor_vinculo_outros` | Outros (mesma escala) |
| `autor_vinculo_outros_detalhe` | Texto livre — especificar quando "Outros" = Sim |

## Campo 62 — Sexo do Provável Autor da Violência

| AcroForm | Rótulo |
|---|---|
| `autor_sexo` | 1=Masculino, 2=Feminino, 3=Ambos os sexos, 9=Ignorado |

## Campo 63 — Suspeita de Uso de Álcool

| AcroForm | Rótulo |
|---|---|
| `autor_suspeita_uso_alcool` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 64 — Ciclo de Vida do Provável Autor da Violência

| AcroForm | Rótulo |
|---|---|
| `autor_ciclo_vida` | 1=Criança (0 a 9 anos), 2=Adolescente (10 a 19 anos), 3=Jovem (20 a 24 anos), 4=Pessoa adulta (25 a 59 anos), 5=Pessoa idosa (60 anos ou mais), 9=Ignorado |

---

# Seção: Encaminhamento

## Campo 65 — Encaminhamento
*(1=Sim, 2=Não, 9=Ignorado)*

| AcroForm | Rótulo |
|---|---|
| `encaminhamento_rede_saude` | Rede de Saúde (Unidade Básica de Saúde, hospital, outras) |
| `encaminhamento_rede_assistencia_social` | Rede de Assistência Social (CRAS, CREAS, outras) |
| `encaminhamento_rede_educacao` | Rede de Educação (creche, escola, outras) |
| `encaminhamento_atendimento_mulher` | Rede de Atendimento à Mulher (Centro Especializado de Atendimento à Mulher, Casa da Mulher Brasileira, outras) |
| `encaminhamento_delegacia_mulher` | Delegacia de Atendimento à Mulher |
| `encaminhamento_conselho_tutelar` | Conselho Tutelar |
| `encaminhamento_conselho_idoso` | Conselho do Idoso |
| `encaminhamento_centro_direitos_humanos` | Centro de Referência de Direitos Humanos |
| `encaminhamento_ministerio_publico` | Ministério Público |
| `encaminhamento_defensoria_publica` | Defensoria Pública / Proteção à Criança e Adolescente |
| `encaminhamento_delegacia_crianca_adolescente` | Delegacia de Atendimento à Criança e Adolescente |
| `encaminhamento_delegacia_idoso` | Delegacia do Idoso |
| `encaminhamento_outras_delegacias` | Outras delegacias |
| `encaminhamento_justica_infancia_juventude` | Justiça da Infância e da Juventude |

---

# Seção: Dados Finais

## Campo 66 — Violência Relacionada ao Trabalho

| AcroForm | Rótulo |
|---|---|
| `trabalho_violencia_relacionada` | 1=Sim, 2=Não, 9=Ignorado |

## Campo 67 — Foi Emitida a Comunicação de Acidente do Trabalho (CAT)

| AcroForm | Rótulo |
|---|---|
| `trabalho_cat_emitida` | 1=Sim, 2=Não, 8=Não se aplica, 9=Ignorado |

## Campo 68 — Circunstância da Lesão — CID-10 Capítulo XX

| AcroForm | Rótulo |
|---|---|
| `circunstancia_lesao_cid10` | Código CID-10 Capítulo XX (texto livre) |

## Campo 69 — Data de Encerramento

| AcroForm | Rótulo |
|---|---|
| `data_encerramento` | Data de Encerramento |

---

# Seção: Informações Complementares e Observações

| AcroForm | Rótulo |
|---|---|
| `acompanhante_nome` | Nome do Acompanhante |
| `acompanhante_vinculo` | Vínculo/grau de parentesco |
| `acompanhante_telefone` | (DDD) Telefone do Acompanhante |
| `observacoes_adicionais` | Observações Adicionais (texto livre — campo de área ampla) |