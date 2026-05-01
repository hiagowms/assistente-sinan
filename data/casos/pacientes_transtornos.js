// SINAN -- Pacientes fictícios -- Transtornos Mentais Relacionados ao Trabalho
// Casos didáticos para a ficha sinan_transtornos.html
window.FAKE_PATIENTS = [
  {
    label: "André Luiz Souza, 38 anos",
    sub: "Transtorno de ansiedade · gerente de agência bancária · São Paulo/SP",
    fields: {
      f_data_notif:"2025-10-14", f_data_diag:"2025-10-08",
      f_nome_un:"CEREST CENTRO", f_cnes:"6123456",
      f_mun_notif:"SAO PAULO", f_uf_notif:"SP", f_ibge_notif:"355030",
      f_nome:"ANDRE LUIZ SOUZA", f_nasc:"1987-05-20", f_raca:"1", f_escol:"6",
      f_sus:"706012300000043", f_mae:"MARIA APARECIDA SOUZA",
      f_mun_res:"SAO PAULO", f_uf_res:"SP", f_ibge_res:"355030",
      f_bairro_res:"VILA MARIANA", f_logr_res:"RUA DOMINGOS DE MORAIS", f_num_res:"2100",
      f_cep:"04010-000", f_tel_res:"(11) 99876-5432", f_zona_res:"1",
      f_ocupacao:"GERENTE DE AGENCIA",
      f_sit_mercado:"01", f_tempo_trab_val:"12", f_tempo_trab_tipo:"4",
      f_emp_nome:"BANCO DO BRASIL SA", f_emp_cnae:"6422100",
      f_emp_uf:"SP", f_emp_mun:"SAO PAULO",
      f_diag_cid:"F41.2",
      f_tempo_exp_val:"12", f_tempo_exp_tipo:"4"
    },
    radios: {sexo:"M", regime:"2",
             hab_alcool:"2", hab_drogas:"2", hab_psicofarmacos:"1", hab_fumar:"2",
             conduta_afastamento_desgaste:"1", conduta_mudanca_organizacao:"1", conduta_protecao_coletiva:"2", conduta_afastamento_local:"2", conduta_protecao_individual:"2", conduta_nenhum:"2", conduta_outros:"2",
             outros_trab:"2", encaminhamento_caps:"1",
             evolucao:"3", cat:"1"}
  },
  {
    label: "Mariana Costa, 29 anos",
    sub: "Depressão grave · operadora de telemarketing · Recife/PE",
    fields: {
      f_data_notif:"2025-11-05", f_data_diag:"2025-10-30",
      f_nome_un:"CEREST METROPOLITANO RECIFE", f_cnes:"3140070",
      f_mun_notif:"RECIFE", f_uf_notif:"PE", f_ibge_notif:"261160",
      f_nome:"MARIANA COSTA FERREIRA", f_nasc:"1996-02-14", f_raca:"4", f_escol:"5",
      f_sus:"706012300000044", f_mae:"LUCIANA COSTA",
      f_mun_res:"RECIFE", f_uf_res:"PE", f_ibge_res:"261160",
      f_bairro_res:"BOA VIAGEM", f_logr_res:"AVENIDA DOMINGOS FERREIRA", f_num_res:"1000",
      f_cep:"51011-000", f_tel_res:"(81) 98765-4321", f_zona_res:"1",
      f_ocupacao:"OPERADOR DE TELEMARKETING ATIVO",
      f_sit_mercado:"01", f_tempo_trab_val:"4", f_tempo_trab_tipo:"4",
      f_emp_nome:"ATENTO BRASIL SA", f_emp_cnae:"8220200",
      f_emp_uf:"PE", f_emp_mun:"RECIFE",
      f_diag_cid:"F32.2",
      f_tempo_exp_val:"4", f_tempo_exp_tipo:"4"
    },
    radios: {sexo:"F", regime:"2", gest:"5",
             hab_alcool:"1", hab_drogas:"2", hab_psicofarmacos:"1", hab_fumar:"1",
             tempo_tabaco_tipo:"4",
             conduta_afastamento_desgaste:"1", conduta_mudanca_organizacao:"2", conduta_protecao_coletiva:"2", conduta_afastamento_local:"1", conduta_protecao_individual:"2", conduta_nenhum:"2", conduta_outros:"2",
             outros_trab:"1", encaminhamento_caps:"1",
             evolucao:"3", cat:"2"}
  },
  {
    label: "Tatiana Souza, 35 anos",
    sub: "Síndrome de burnout · motorista de aplicativo · Rio de Janeiro/RJ",
    fields: {
      f_data_notif:"2026-03-04", f_data_diag:"2026-02-28",
      f_nome_un:"CAPS RIO COMPRIDO", f_cnes:"3304557",
      f_mun_notif:"RIO DE JANEIRO", f_uf_notif:"RJ", f_ibge_notif:"330455",
      f_nome:"TATIANA SOUZA DOS SANTOS", f_nasc:"1991-04-18", f_raca:"2", f_escol:"7",
      f_sus:"706012300000501", f_mae:"GLORIA SOUZA",
      f_mun_res:"RIO DE JANEIRO", f_uf_res:"RJ", f_ibge_res:"330455",
      f_bairro_res:"MEIER", f_logr_res:"RUA DIAS DA CRUZ", f_num_res:"1200",
      f_cep:"20720-011", f_tel_res:"(21) 98987-6543", f_zona_res:"1",
      f_ocupacao:"MOTORISTA DE CARRO DE PASSEIO",
      f_sit_mercado:"03", f_tempo_trab_val:"5", f_tempo_trab_tipo:"4",
      f_emp_nome:"AUTONOMA PLATAFORMA DE TRANSPORTE",
      f_emp_uf:"RJ", f_emp_mun:"RIO DE JANEIRO",
      f_diag_cid:"Z73.0",
      f_tempo_exp_val:"5", f_tempo_exp_tipo:"4"
    },
    radios: {sexo:"F", regime:"2", gest:"5",
             hab_alcool:"2", hab_drogas:"2", hab_psicofarmacos:"1", hab_fumar:"2",
             conduta_afastamento_desgaste:"2", conduta_mudanca_organizacao:"1", conduta_protecao_coletiva:"2", conduta_afastamento_local:"2", conduta_protecao_individual:"2", conduta_nenhum:"1", conduta_outros:"2",
             outros_trab:"1", encaminhamento_caps:"1",
             evolucao:"1", cat:"2"}
  }
];
