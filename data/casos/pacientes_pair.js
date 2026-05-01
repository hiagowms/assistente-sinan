// SINAN -- Pacientes fictícios -- PAIR (Perda Auditiva Induzida por Ruído)
// Casos didáticos para a ficha sinan_pair.html
window.FAKE_PATIENTS = [
  {
    label: "José Carlos Ferreira, 42 anos",
    sub: "PAIR bilateral · operador de máquinas-ferramenta · São Paulo/SP",
    fields: {
      f_data_notif:"2025-10-14", f_data_diag:"2025-10-08",
      f_nome_un:"CEREST PIRITUBA", f_cnes:"6123456",
      f_mun_notif:"SAO PAULO", f_uf_notif:"SP", f_ibge_notif:"355030",
      f_nome:"JOSE CARLOS FERREIRA SILVA", f_nasc:"1983-03-12", f_raca:"1", f_escol:"3",
      f_sus:"706012300000041", f_mae:"APARECIDA FERREIRA",
      f_mun_res:"SAO PAULO", f_uf_res:"SP", f_ibge_res:"355030",
      f_bairro_res:"PIRITUBA", f_logr_res:"RUA JOAO RAMALHO", f_num_res:"1540",
      f_cep:"05009-000", f_tel_res:"(11) 96789-1234", f_zona_res:"1",
      f_ocupacao:"OPERADOR DE MAQUINAS-FERRAMENTA CONVENCIONAIS",
      f_sit_mercado:"1", f_tempo_exp_val:"15", f_tempo_exp_tipo:"4",
      f_tempo_trab_val:"15", f_tempo_trab_tipo:"4",
      f_emp_nome:"METALURGICA SAO PAULO INDUSTRIA LTDA", f_emp_cnae:"2539000",
      f_emp_uf:"SP", f_emp_mun:"SAO PAULO",
      f_diag_cid:"H83.3"
    },
    radios: {sexo:"M", regime:"1", tipo_ruido:"1",
             afastamento_trat:"1", afastamento_result:"1",
             outros_trab:"1", cat:"1",
             sintoma_zumbido:"1", sintoma_tontura:"2", sintoma_dificuldade_fala:"1", sintoma_cefaleia:"2", sintoma_outros:"2",
             exposicao_solvente_tolueno:"2", exposicao_metais_pesados:"2", exposicao_medicamentos_ototoxicos:"2", exposicao_gases_toxicos:"2", exposicao_outros:"2",
             agravo_hipertensao:"2", agravo_diabetes:"2", agravo_hanseniase:"2", agravo_transtorno_mental:"2", agravo_tuberculose:"2", agravo_asma:"2", agravo_outras:"2",
             conduta_afastamento_risco:"1", conduta_mudanca_organizacao:"2", conduta_protecao_coletiva:"2", conduta_afastamento_local:"2", conduta_protecao_individual:"1", conduta_nenhum:"2", conduta_outros:"2"}
  },
  {
    label: "Maria Aparecida Gonçalves, 55 anos",
    sub: "PAIR + zumbido · operadora de máquinas têxteis · Betim/MG",
    fields: {
      f_data_notif:"2025-11-05", f_data_diag:"2025-10-30",
      f_nome_un:"CEREST METROPOLITANO BETIM", f_cnes:"3140070",
      f_mun_notif:"BETIM", f_uf_notif:"MG", f_ibge_notif:"310670",
      f_nome:"MARIA APARECIDA GONCALVES SOUZA", f_nasc:"1970-06-28", f_raca:"4", f_escol:"2",
      f_sus:"706012300000042", f_mae:"CONCEICAO GONCALVES",
      f_mun_res:"BETIM", f_uf_res:"MG", f_ibge_res:"310670",
      f_bairro_res:"JARDIM DAS ALTEROSAS", f_logr_res:"RUA CORONEL JOSE HONORIO", f_num_res:"210",
      f_cep:"32600-000", f_tel_res:"(31) 99456-7890", f_zona_res:"1",
      f_ocupacao:"OPERADOR DE MAQUINAS FIXAS, EM GERAL",
      f_sit_mercado:"1", f_tempo_exp_val:"22", f_tempo_exp_tipo:"4",
      f_tempo_trab_val:"22", f_tempo_trab_tipo:"4",
      f_emp_nome:"INDUSTRIA TEXTIL BETIM SA", f_emp_cnae:"1340502",
      f_emp_uf:"MG", f_emp_mun:"BETIM",
      f_diag_cid:"H83.3"
    },
    radios: {sexo:"F", regime:"1", tipo_ruido:"1",
             afastamento_trat:"2",
             outros_trab:"1", cat:"2",
             sintoma_zumbido:"1", sintoma_tontura:"1", sintoma_dificuldade_fala:"1", sintoma_cefaleia:"2", sintoma_outros:"2",
             exposicao_solvente_tolueno:"1", exposicao_metais_pesados:"2", exposicao_medicamentos_ototoxicos:"2", exposicao_gases_toxicos:"2", exposicao_outros:"2",
             agravo_hipertensao:"1", agravo_diabetes:"2", agravo_hanseniase:"2", agravo_transtorno_mental:"2", agravo_tuberculose:"2", agravo_asma:"2", agravo_outras:"2",
             conduta_afastamento_risco:"1", conduta_mudanca_organizacao:"2", conduta_protecao_coletiva:"1", conduta_afastamento_local:"2", conduta_protecao_individual:"1", conduta_nenhum:"2", conduta_outros:"2"}
  },
  {
    label: "Rodrigo Almeida, 41 anos",
    sub: "PAIR · técnico de áudio em emissora de rádio · Salvador/BA",
    fields: {
      f_data_notif:"2026-02-20", f_data_diag:"2026-02-15",
      f_nome_un:"CEREST SALVADOR", f_cnes:"2923456",
      f_mun_notif:"SALVADOR", f_uf_notif:"BA", f_ibge_notif:"292740",
      f_nome:"RODRIGO ALMEIDA DE JESUS", f_nasc:"1984-09-17", f_raca:"4", f_escol:"7",
      f_sus:"706012300000401", f_mae:"NEUSA ALMEIDA",
      f_mun_res:"SALVADOR", f_uf_res:"BA", f_ibge_res:"292740",
      f_bairro_res:"BARRA", f_logr_res:"RUA AFONSO CELSO", f_num_res:"244",
      f_cep:"40140-080", f_tel_res:"(71) 98456-1122", f_zona_res:"1",
      f_ocupacao:"OPERADOR DE GRAVACAO DE RADIO",
      f_sit_mercado:"01", f_tempo_exp_val:"18", f_tempo_exp_tipo:"4",
      f_tempo_trab_val:"18", f_tempo_trab_tipo:"4",
      f_emp_nome:"RADIO METROPOLE FM LTDA", f_emp_cnae:"6010100",
      f_emp_uf:"BA", f_emp_mun:"SALVADOR",
      f_diag_cid:"H83.3"
    },
    radios: {sexo:"M", regime:"2", tipo_ruido:"1",
             afastamento_trat:"2",
             outros_trab:"2", cat:"1",
             sintoma_zumbido:"1", sintoma_tontura:"2", sintoma_dificuldade_fala:"1", sintoma_cefaleia:"1", sintoma_outros:"2",
             exposicao_solvente_tolueno:"2", exposicao_metais_pesados:"2", exposicao_medicamentos_ototoxicos:"2", exposicao_gases_toxicos:"2", exposicao_outros:"2",
             agravo_hipertensao:"2", agravo_diabetes:"2", agravo_hanseniase:"2", agravo_transtorno_mental:"1", agravo_tuberculose:"2", agravo_asma:"2", agravo_outras:"2",
             conduta_afastamento_risco:"2", conduta_mudanca_organizacao:"1", conduta_protecao_coletiva:"2", conduta_afastamento_local:"2", conduta_protecao_individual:"1", conduta_nenhum:"2", conduta_outros:"2"}
  }
];
