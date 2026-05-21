// SINAN -- Pacientes fictícios -- Câncer Relacionado ao Trabalho
// Casos didáticos para a ficha sinan_cancer.html
window.FAKE_PATIENTS = [
  {
    label: "José Aparecido, 58 anos",
    sub: "Mesotelioma · exposição a asbesto · operador de máquinas fixas · Osasco/SP",
    fields: {
      f_data_notif:"2025-11-20", f_data_diag:"2025-11-15",
      f_nome_un:"HOSPITAL DO CANCER", f_cnes:"6123456",
      f_mun_notif:"OSASCO", f_uf_notif:"SP", f_ibge_notif:"353440",
      f_nome:"JOSE APARECIDO DOS SANTOS", f_nasc:"1967-05-10", f_raca:"4", f_escol:"3",
      f_sus:"706012300000053", f_mae:"MARIA DOS SANTOS",
      f_mun_res:"OSASCO", f_uf_res:"SP", f_ibge_res:"353440",
      f_bairro_res:"CENTRO", f_logr_res:"RUA DA FABRICA", f_num_res:"500",
      f_cep:"06000-000", f_tel_res:"(11) 99876-1234", f_zona_res:"1",
      f_ocupacao:"OPERADOR DE MAQUINAS FIXAS, EM GERAL",
      f_sit_mercado:"06", f_tempo_trab_val:"30", f_tempo_trab_tipo:"4",
      f_emp_nome:"INDUSTRIA DE FIBROCIMENTO SA", f_emp_cnae:"2341900",
      f_emp_uf:"SP", f_emp_mun:"OSASCO",
      f_diag_cid:"C45.0",
      f_tempo_exp_val:"25", f_tempo_exp_tipo:"4",
      f_regime:"2"
    },
    radios: {sexo:"M", gest:"6", raca:"4", escol:"3", regime:"2",
             emp_terc:"2",
             exp_asbesto:"1", exp_silica:"2", exp_aminas:"2", exp_benzeno:"2", exp_alcatrao:"2", exp_hidrocarbonetos:"2", exp_oleos:"2", exp_berilio:"2", exp_cadmio:"2", exp_cromo:"2", exp_niquel:"2", exp_rad_ionizantes:"2", exp_rad_nao_ionizantes:"2", exp_hormonios:"2", exp_antineoplasicos:"2", exp_outros:"2",
             hab_fumar:"1", tempo_tabaco_tipo:"4",
             outros_trab:"2",
             cat:"1"}
  },
  {
    label: "Maria do Carmo, 62 anos",
    sub: "Câncer de pulmão · exposição a sílica · ceramista · Criciúma/SC",
    fields: {
      f_data_notif:"2025-11-22", f_data_diag:"2025-11-18",
      f_nome_un:"CEREST CRICIUMA", f_cnes:"4234567",
      f_mun_notif:"CRICIUMA", f_uf_notif:"SC", f_ibge_notif:"420460",
      f_nome:"MARIA DO CARMO OLIVEIRA", f_nasc:"1963-08-22", f_raca:"2", f_escol:"2",
      f_sus:"706012300000054", f_mae:"JOSEFA OLIVEIRA",
      f_mun_res:"CRICIUMA", f_uf_res:"SC", f_ibge_res:"420460",
      f_bairro_res:"RIO MAINA", f_logr_res:"RUA DAS CERAMICAS", f_num_res:"350",
      f_cep:"88800-000", f_tel_res:"(48) 99665-3322", f_zona_res:"1",
      f_ocupacao:"CERAMISTA",
      f_sit_mercado:"06", f_tempo_trab_val:"28", f_tempo_trab_tipo:"4",
      f_emp_nome:"CERAMICA ELIZABETH SUL LTDA", f_emp_cnae:"2341900",
      f_emp_uf:"SC", f_emp_mun:"CRICIUMA",
      f_diag_cid:"C34.9",
      f_tempo_exp_val:"20", f_tempo_exp_tipo:"4",
      f_regime:"1"
    },
    radios: {sexo:"F", gest:"6", raca:"2", escol:"2", regime:"1",
             emp_terc:"2",
             exp_asbesto:"2", exp_silica:"1", exp_aminas:"2", exp_benzeno:"2", exp_alcatrao:"2", exp_hidrocarbonetos:"2", exp_oleos:"2", exp_berilio:"2", exp_cadmio:"2", exp_cromo:"2", exp_niquel:"2", exp_rad_ionizantes:"2", exp_rad_nao_ionizantes:"2", exp_hormonios:"2", exp_antineoplasicos:"2", exp_outros:"2",
             hab_fumar:"2",
             outros_trab:"1",
             cat:"1"}
  },
  {
    label: "Joaquim Pereira, 64 anos",
    sub: "Linfoma não-Hodgkin · exposição a agrotóxicos · trabalhador da soja · Sinop/MT",
    fields: {
      f_data_notif:"2026-04-02", f_data_diag:"2026-03-26",
      f_nome_un:"CEREST SINOP", f_cnes:"5108402",
      f_mun_notif:"SINOP", f_uf_notif:"MT", f_ibge_notif:"510790",
      f_nome:"JOAQUIM PEREIRA NOGUEIRA", f_nasc:"1961-10-19", f_raca:"4", f_escol:"1",
      f_sus:"706012300000801", f_mae:"AURORA NOGUEIRA",
      f_mun_res:"SINOP", f_uf_res:"MT", f_ibge_res:"510790",
      f_bairro_res:"JARDIM SAO MIGUEL", f_logr_res:"RUA DAS PALMEIRAS", f_num_res:"230",
      f_cep:"78550-336", f_tel_res:"(66) 98123-9988", f_zona_res:"2",
      f_ocupacao:"TRABALHADOR NA CULTURA DE SOJA",
      f_sit_mercado:"01", f_tempo_trab_val:"32", f_tempo_trab_tipo:"4",
      f_emp_nome:"FAZENDA NORTE GROSSO LTDA", f_emp_cnae:"0115600",
      f_emp_uf:"MT", f_emp_mun:"SINOP",
      f_diag_cid:"C85.9",
      f_tempo_exp_val:"30", f_tempo_exp_tipo:"4",
      f_regime:"2"
    },
    radios: {sexo:"M", gest:"6", raca:"4", escol:"1", regime:"2",
             emp_terc:"2",
             exp_asbesto:"2", exp_silica:"2", exp_aminas:"2", exp_benzeno:"1", exp_alcatrao:"2", exp_hidrocarbonetos:"1", exp_oleos:"2", exp_berilio:"2", exp_cadmio:"2", exp_cromo:"2", exp_niquel:"2", exp_rad_ionizantes:"2", exp_rad_nao_ionizantes:"1", exp_hormonios:"2", exp_antineoplasicos:"2", exp_outros:"1",
             hab_fumar:"2",
             outros_trab:"2",
             cat:"1"}
  }
];
