
# Script para gerar sinan_pair.html baseado em sinan_transtornos.html
with open('sinan_transtornos.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Título e cabeçalho
html = html.replace(
    'SINAN — Transtornos Mentais Relacionados ao Trabalho | Assistente PET Saúde Digital',
    'SINAN — PAIR: Perda Auditiva Induzida por Ruído | Assistente PET Saúde Digital'
)
html = html.replace(
    'SINAN — Transtornos Mentais Relacionados ao Trabalho</h1>',
    'SINAN — PAIR: Perda Auditiva Induzida por Ruído</h1>'
)

# 2. Info box da seção 1 (datas)
html = html.replace(
    '<div class="info"><span class="ico">ℹ️</span><div>A <strong>Data do Diagnóstico (Campo 8)</strong> corresponde à data em que o profissional de saúde estabeleceu o diagnóstico do Transtorno Mental Relacionado ao Trabalho.</div></div>',
    '<div class="info"><span class="ico">ℹ️</span><div>A <strong>Data do Diagnóstico (Campo 8)</strong> corresponde à data em que o profissional de saúde estabeleceu o diagnóstico de PAIR (Perda Auditiva Induzida por Ruído).</div></div>'
)

# 3. Info box da seção 2 (paciente) - sem alteração necessária

# 4. Seção 6 - substituir diagnóstico clínico
old_sec6 = '''<!-- =========================================================
  SEÇÃO 6 — DIAGNÓSTICO CLÍNICO
========================================================= -->
<div class="sec" id="sec6">
  <div class="sec-hdr">
    <div class="sec-num">6</div>
    <div class="sec-info">
      <h3>Diagnóstico Clínico</h3>
      <p>CID-10 específico e regime de tratamento</p>
    </div>
    <span class="sec-badge badge-empty" id="badge6">—</span>
  </div>
  <div class="sec-body">

    <div class="row row-wide">
      <div class="fld col-2">
        <label>CID-10 Específico <span class="cn">[C.53]</span></label>
        <div class="ac-wrap">
          <input type="text" id="f_diag_cid" data-caps autocomplete="off" placeholder="Ex: F32.2 — CID-10 do diagnóstico">
          <div class="ac-drop" id="f_diag_cid-drop"></div>
        </div>
        <span id="f_diag_cid_hint" style="font-size:12px;color:#2563eb;margin-top:4px;display:none;line-height:1.4;font-weight:600"></span>
      </div>
      <div class="fld">
        <label>Regime de Tratamento <span class="cn">[C.54]</span></label>
        <div class="pills" id="grp_regime" data-hidden="f_regime">
          <label class="pill" data-val="1"><input type="radio" name="regime" value="1"> Ambulatorial</label>
          <label class="pill" data-val="2"><input type="radio" name="regime" value="2"> Internação</label>
          <label class="pill" data-val="3"><input type="radio" name="regime" value="3"> Day hosp.</label>
          <label class="pill" data-val="4"><input type="radio" name="regime" value="4"> CAPS</label>
          <label class="pill" data-val="9"><input type="radio" name="regime" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_regime">
      </div>
    </div>

  </div>
</div>'''

new_sec6 = '''<!-- =========================================================
  SEÇÃO 6 — DIAGNÓSTICO CLÍNICO
========================================================= -->
<div class="sec" id="sec6">
  <div class="sec-hdr">
    <div class="sec-num">6</div>
    <div class="sec-info">
      <h3>Diagnóstico Clínico</h3>
      <p>CID-10 específico e regime de tratamento</p>
    </div>
    <span class="sec-badge badge-empty" id="badge6">—</span>
  </div>
  <div class="sec-body">

    <div class="info"><span class="ico">ℹ️</span><div>Para PAIR o CID-10 mais comum é <strong>H83.3</strong> (Efeitos do ruído sobre o ouvido interno). Outros: H90.3, H90.4, H90.5 (perdas neuro-sensoriais). Digite o código ou busque por nome.</div></div>

    <div class="row row-wide">
      <div class="fld col-2">
        <label>CID-10 Específico <span class="req-star">⭐</span><span class="cn">[C.53]</span></label>
        <div class="ac-wrap">
          <input type="text" id="f_diag_cid" data-caps data-ess data-label="CID-10 do diagnóstico" autocomplete="off" placeholder="Ex: H83.3 — CID-10 do diagnóstico">
          <div class="ac-drop" id="f_diag_cid-drop"></div>
        </div>
        <span id="f_diag_cid_hint" style="font-size:12px;color:#2563eb;margin-top:4px;display:none;line-height:1.4;font-weight:600"></span>
      </div>
      <div class="fld">
        <label>Regime de Tratamento <span class="cn">[C.54]</span></label>
        <div class="pills" id="grp_regime" data-hidden="f_regime">
          <label class="pill" data-val="1"><input type="radio" name="regime" value="1"> Ambulatorial</label>
          <label class="pill" data-val="2"><input type="radio" name="regime" value="2"> Internação</label>
          <label class="pill" data-val="3"><input type="radio" name="regime" value="3"> Day hosp.</label>
          <label class="pill" data-val="9"><input type="radio" name="regime" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_regime">
      </div>
    </div>

  </div>
</div>'''

html = html.replace(old_sec6, new_sec6)

# 5. Seção 7 (Hábitos) → manter mas renumerar. Antes vamos inserir seção PAIR específica (7 e 8) substituindo a seção 7 original
old_sec7 = '''<!-- =========================================================
  SEÇÃO 7 — HÁBITOS E ESTILO DE VIDA
========================================================= -->
<div class="sec" id="sec7">
  <div class="sec-hdr">
    <div class="sec-num">7</div>
    <div class="sec-info">
      <h3>Hábitos e Estilo de Vida</h3>
      <p>Uso de álcool, tabaco, psicofármacos e drogas psicoativas</p>
    </div>
    <span class="sec-badge badge-empty" id="badge7">—</span>
  </div>'''

new_sec7_intro = '''<!-- =========================================================
  SEÇÃO 7 — EXAMES AUDIOMÉTRICOS (PAIR-específico)
========================================================= -->
<div class="sec" id="sec7">
  <div class="sec-hdr">
    <div class="sec-num">7</div>
    <div class="sec-info">
      <h3>Exames Audiométricos</h3>
      <p>Resultados da audiometria tonal e achados específicos de PAIR</p>
    </div>
    <span class="sec-badge badge-empty" id="badge7">—</span>
  </div>
  <div class="sec-body">

    <div class="info"><span class="ico">🎧</span><div>Registre os dados da <strong>audiometria tonal liminar</strong>. A PAIR caracteriza-se por perda neurossensorial, geralmente bilateral, irreversível, com entalhe audiométrico típico nas frequências de 3000–6000 Hz.</div></div>

    <div class="sublabel">Tipo e Resultado da Audiometria</div>
    <div class="row">
      <div class="fld">
        <label>Tipo de Audiometria <span class="cn">[C.55]</span></label>
        <div class="pills" id="grp_tipo_audiometria" data-hidden="f_tipo_audiometria">
          <label class="pill" data-val="1"><input type="radio" name="tipo_audiometria" value="1"> Tonal liminar</label>
          <label class="pill" data-val="2"><input type="radio" name="tipo_audiometria" value="2"> Vocal</label>
          <label class="pill" data-val="3"><input type="radio" name="tipo_audiometria" value="3"> Imitânciometria</label>
          <label class="pill" data-val="9"><input type="radio" name="tipo_audiometria" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_tipo_audiometria">
      </div>
      <div class="fld">
        <label>Resultado Audiometria <span class="cn">[C.56]</span></label>
        <div class="pills" id="grp_result_audiometria" data-hidden="f_result_audiometria">
          <label class="pill" data-val="1"><input type="radio" name="result_audiometria" value="1"> Normal</label>
          <label class="pill" data-val="2"><input type="radio" name="result_audiometria" value="2"> Alterado</label>
          <label class="pill" data-val="9"><input type="radio" name="result_audiometria" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_result_audiometria">
      </div>
    </div>

    <div class="sublabel">Grau da Perda Auditiva</div>
    <div class="row">
      <div class="fld">
        <label>Grau — Orelha Direita (OD) <span class="cn">[C.57]</span></label>
        <select id="f_grau_od">
          <option value="">— Selecione —</option>
          <option value="0">Audição normal</option>
          <option value="1">Perda leve (26–40 dB)</option>
          <option value="2">Perda moderada (41–55 dB)</option>
          <option value="3">Perda moderadamente severa (56–70 dB)</option>
          <option value="4">Perda severa (71–90 dB)</option>
          <option value="5">Perda profunda (>90 dB)</option>
          <option value="9">Ignorado</option>
        </select>
      </div>
      <div class="fld">
        <label>Grau — Orelha Esquerda (OE) <span class="cn">[C.58]</span></label>
        <select id="f_grau_oe">
          <option value="">— Selecione —</option>
          <option value="0">Audição normal</option>
          <option value="1">Perda leve (26–40 dB)</option>
          <option value="2">Perda moderada (41–55 dB)</option>
          <option value="3">Perda moderadamente severa (56–70 dB)</option>
          <option value="4">Perda severa (71–90 dB)</option>
          <option value="5">Perda profunda (>90 dB)</option>
          <option value="9">Ignorado</option>
        </select>
      </div>
    </div>

    <div class="sublabel">Características da PAIR</div>
    <div class="row">
      <div class="fld">
        <label>PAIR Bilateral? <span class="cn">[C.59]</span></label>
        <div class="pills" id="grp_pair_bilateral" data-hidden="f_pair_bilateral">
          <label class="pill" data-val="1"><input type="radio" name="pair_bilateral" value="1"> Sim</label>
          <label class="pill" data-val="2"><input type="radio" name="pair_bilateral" value="2"> Não (unilateral)</label>
          <label class="pill" data-val="9"><input type="radio" name="pair_bilateral" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_pair_bilateral">
      </div>
      <div class="fld">
        <label>Progressão após retirada do ruído? <span class="cn">[C.60]</span></label>
        <div class="pills" id="grp_pair_progressao" data-hidden="f_pair_progressao">
          <label class="pill" data-val="1"><input type="radio" name="pair_progressao" value="1"> Sim</label>
          <label class="pill" data-val="2"><input type="radio" name="pair_progressao" value="2"> Não</label>
          <label class="pill" data-val="9"><input type="radio" name="pair_progressao" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_pair_progressao">
      </div>
    </div>

    <div class="sublabel">Sintomas Associados <span style="font-size:10px;font-weight:400;color:#9ca3af;text-transform:none;margin-left:6px">Marque todos que se aplicam</span></div>
    <div class="pills" id="grp_sintomas_pair" style="margin-bottom:14px">
      <label class="pill" data-val="1" data-name="sintomas_pair"><input type="checkbox" name="sintomas_pair" value="1"> Zumbido (tinnitus)</label>
      <label class="pill" data-val="2" data-name="sintomas_pair"><input type="checkbox" name="sintomas_pair" value="2"> Tontura/Vertigem</label>
      <label class="pill" data-val="3" data-name="sintomas_pair"><input type="checkbox" name="sintomas_pair" value="3"> Dificuldade de compreensão da fala</label>
      <label class="pill" data-val="4" data-name="sintomas_pair"><input type="checkbox" name="sintomas_pair" value="4"> Cefaleia</label>
      <label class="pill" data-val="5" data-name="sintomas_pair"><input type="checkbox" name="sintomas_pair" value="5" onchange="onSintOutros()"> Outros</label>
    </div>
    <div id="box_sint_outros" style="display:none;margin-bottom:14px">
      <div class="fld">
        <label>Especificar outros sintomas</label>
        <input type="text" id="f_sint_outros_det" data-caps placeholder="Descreva outros sintomas">
      </div>
    </div>

    <div class="sublabel">Afastamento por Audiometria</div>
    <div class="row">
      <div class="fld">
        <label>Afastamento para Tratamento <span class="cn">[C.61]</span></label>
        <div class="pills" id="grp_afastamento_trat" data-hidden="f_afastamento_trat">
          <label class="pill" data-val="1"><input type="radio" name="afastamento_trat" value="1"> Sim</label>
          <label class="pill" data-val="2"><input type="radio" name="afastamento_trat" value="2"> Não</label>
          <label class="pill" data-val="9"><input type="radio" name="afastamento_trat" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_afastamento_trat">
      </div>
      <div class="fld">
        <label>Resultado do Afastamento <span class="cn">[C.62]</span></label>
        <div class="pills" id="grp_afastamento_result" data-hidden="f_afastamento_result">
          <label class="pill" data-val="1"><input type="radio" name="afastamento_result" value="1"> Retornou</label>
          <label class="pill" data-val="2"><input type="radio" name="afastamento_result" value="2"> Não retornou</label>
          <label class="pill" data-val="9"><input type="radio" name="afastamento_result" value="9"> Ign.</label>
        </div>
        <input type="hidden" id="f_afastamento_result">
      </div>
      <div class="fld">
        <label>Tempo de Afastamento</label>
        <div style="display:flex;gap:8px;align-items:flex-start">
          <input type="number" id="f_tempo_afast_val" min="0" placeholder="Ex: 30" style="flex:1">
          <div class="pills" id="grp_tempo_afast_tipo" data-hidden="f_tempo_afast_tipo" style="margin-top:2px">
            <label class="pill" data-val="A"><input type="radio" name="tempo_afast_tipo" value="A"> A</label>
            <label class="pill" data-val="M"><input type="radio" name="tempo_afast_tipo" value="M"> M</label>
            <label class="pill" data-val="D"><input type="radio" name="tempo_afast_tipo" value="D"> D</label>
          </div>
          <input type="hidden" id="f_tempo_afast_tipo">
        </div>
      </div>
    </div>

  </div>
</div>

<!-- =========================================================
  SEÇÃO 8 — AGENTES DE EXPOSIÇÃO (PAIR-específico)
========================================================= -->
<div class="sec" id="sec8">
  <div class="sec-hdr">
    <div class="sec-num">8</div>
    <div class="sec-info">
      <h3>Agentes de Exposição</h3>
      <p>Tipo de ruído e substâncias ototóxicas</p>
    </div>
    <span class="sec-badge badge-empty" id="badge8">—</span>
  </div>
  <div class="sec-body">

    <div class="info"><span class="ico">🔊</span><div>Registre o tipo de ruído ao qual o trabalhador esteve exposto e se havia substâncias químicas ototóxicas presentes no ambiente de trabalho, que potencializam o dano auditivo.</div></div>

    <div class="sublabel">Tipo de Ruído</div>
    <div class="row">
      <div class="fld col-2">
        <label>Tipo de Ruído Predominante <span class="cn">[C.63]</span></label>
        <div class="pills" id="grp_tipo_ruido" data-hidden="f_tipo_ruido">
          <label class="pill" data-val="1"><input type="radio" name="tipo_ruido" value="1"> Contínuo/Intermitente</label>
          <label class="pill" data-val="2"><input type="radio" name="tipo_ruido" value="2"> De impacto/Impulsivo</label>
          <label class="pill" data-val="3"><input type="radio" name="tipo_ruido" value="3"> Ambos</label>
          <label class="pill" data-val="9"><input type="radio" name="tipo_ruido" value="9"> Ignorado</label>
        </div>
        <input type="hidden" id="f_tipo_ruido">
      </div>
      <div class="fld">
        <label>Nível de Exposição (dB) <span class="cn">[C.64]</span></label>
        <input type="number" id="f_nivel_ruido_db" min="0" max="200" placeholder="Ex: 92 dB(A)">
      </div>
    </div>

    <div class="sublabel">Substâncias Químicas Ototóxicas <span style="font-size:10px;font-weight:400;color:#9ca3af;text-transform:none;margin-left:6px">Marque todas que se aplicam</span></div>
    <div class="pills" id="grp_ototoxicos" style="margin-bottom:14px">
      <label class="pill" data-val="1" data-name="ototoxicos"><input type="checkbox" name="ototoxicos" value="1"> Solventes/Tolueno</label>
      <label class="pill" data-val="2" data-name="ototoxicos"><input type="checkbox" name="ototoxicos" value="2"> Metais pesados (Pb, Hg)</label>
      <label class="pill" data-val="3" data-name="ototoxicos"><input type="checkbox" name="ototoxicos" value="3"> Medicamentos ototóxicos</label>
      <label class="pill" data-val="4" data-name="ototoxicos"><input type="checkbox" name="ototoxicos" value="4"> Gases tóxicos (CO, etc.)</label>
      <label class="pill" data-val="5" data-name="ototoxicos"><input type="checkbox" name="ototoxicos" value="5" onchange="onOtotoxOutros()"> Outros</label>
      <label class="pill" data-val="6" data-name="ototoxicos"><input type="checkbox" name="ototoxicos" value="6"> Nenhum</label>
    </div>
    <div id="box_ototox_outros" style="display:none;margin-bottom:14px">
      <div class="fld">
        <label>Especificar outros agentes</label>
        <input type="text" id="f_ototox_outros_det" data-caps placeholder="Descreva outros agentes ototóxicos">
      </div>
    </div>

    <div class="sublabel">Agravos Concomitantes <span style="font-size:10px;font-weight:400;color:#9ca3af;text-transform:none;margin-left:6px">Marque todos que se aplicam</span></div>
    <div class="pills" id="grp_agravos_pair" style="margin-bottom:14px">
      <label class="pill" data-val="1" data-name="agravos_pair"><input type="checkbox" name="agravos_pair" value="1"> Hipertensão arterial</label>
      <label class="pill" data-val="2" data-name="agravos_pair"><input type="checkbox" name="agravos_pair" value="2"> Diabetes</label>
      <label class="pill" data-val="3" data-name="agravos_pair"><input type="checkbox" name="agravos_pair" value="3"> Transtorno mental</label>
      <label class="pill" data-val="4" data-name="agravos_pair"><input type="checkbox" name="agravos_pair" value="4"> Tuberculose</label>
      <label class="pill" data-val="5" data-name="agravos_pair"><input type="checkbox" name="agravos_pair" value="5"> Hanseníase</label>
      <label class="pill" data-val="6" data-name="agravos_pair"><input type="checkbox" name="agravos_pair" value="6" onchange="onAgravosOutros()"> Asma</label>
      <label class="pill" data-val="7" data-name="agravos_pair"><input type="checkbox" name="agravos_pair" value="7" onchange="onAgravosOutros()"> Outros</label>
    </div>
    <div id="box_agravos_outros" style="display:none;margin-bottom:14px">
      <div class="fld">
        <label>Especificar outros agravos</label>
        <input type="text" id="f_agravos_outros_det" data-caps placeholder="Descreva outros agravos concomitantes">
      </div>
    </div>

  </div>
</div>

<!-- =========================================================
  SEÇÃO 9 — HÁBITOS E ESTILO DE VIDA (renumerada)
========================================================= -->
<div class="sec" id="sec9">
  <div class="sec-hdr">
    <div class="sec-num">9</div>
    <div class="sec-info">
      <h3>Hábitos e Estilo de Vida</h3>
      <p>Uso de álcool, tabaco, psicofármacos e drogas psicoativas</p>
    </div>
    <span class="sec-badge badge-empty" id="badge9">—</span>
  </div>'''

html = html.replace(old_sec7, new_sec7_intro)

# Agora substituir as seções 8 e 9 originais pelas seções 10 e 11
# Seção 8 original (Conduta) → Seção 10
html = html.replace(
    '<!-- =========================================================\r\n  SEÇÃO 8 — CONDUTA\r\n========================================================= -->\r\n<div class="sec" id="sec8">',
    '<!-- =========================================================\r\n  SEÇÃO 10 — CONDUTA (renumerada)\r\n========================================================= -->\r\n<div class="sec" id="sec10">'
)
html = html.replace(
    '<div class="sec-num">8</div>\r\n    <div class="sec-info">\r\n      <h3>Conduta</h3>',
    '<div class="sec-num">10</div>\r\n    <div class="sec-info">\r\n      <h3>Conduta</h3>'
)
html = html.replace(
    '<span class="sec-badge badge-empty" id="badge8">—</span>',
    '<span class="sec-badge badge-empty" id="badge10">—</span>'
)

# Seção 9 original (Encerramento) → Seção 11
html = html.replace(
    '<!-- =========================================================\r\n  SEÇÃO 9 — ENCERRAMENTO\r\n========================================================= -->\r\n<div class="sec" id="sec9">',
    '<!-- =========================================================\r\n  SEÇÃO 11 — ENCERRAMENTO (renumerada)\r\n========================================================= -->\r\n<div class="sec" id="sec11">'
)
html = html.replace(
    '<div class="sec-num">9</div>\r\n    <div class="sec-info">\r\n      <h3>Encerramento</h3>',
    '<div class="sec-num">11</div>\r\n    <div class="sec-info">\r\n      <h3>Encerramento</h3>'
)
html = html.replace(
    '<span class="sec-badge badge-empty" id="badge9">—</span>',
    '<span class="sec-badge badge-empty" id="badge11">—</span>'
)

# 6. Conduta específica PAIR
html = html.replace(
    '<label class="pill" data-val="1" data-name="conduta"><input type="checkbox" name="conduta" value="1"> Afastamento por desgaste físico/mental</label>',
    '<label class="pill" data-val="1" data-name="conduta"><input type="checkbox" name="conduta" value="1"> Afastamento do risco (ruído)</label>'
)

# 7. Outros trabalhadores com mesma doença text
html = html.replace(
    'Outros trabalhadores com a mesma doença?',
    'Outros trabalhadores com PAIR no setor?'
)

# 8. Encaminhamento CAPS → adequado para PAIR
html = html.replace(
    'Encaminhamento ao CAPS?',
    'Encaminhado para reabilitação auditiva?'
)

# 9. Conduta — substituir texto "encam_caps" → mantém mas muda label
# já feito acima

# 10. Section 8 Conduta - conduta_afastamento_local label
# Keep as is, already says "Afastamento do local de trabalho"

# 11. Pacientes fictícios PAIR
old_fake = '''var FAKE_PATIENTS = [
  {
    label: "Ana Beatriz Santos, 35 anos",
    sub: "Burnout · telemarketing · São Paulo/SP",'''

new_fake = '''var FAKE_PATIENTS = [
  {
    label: "José Carlos Ferreira, 42 anos",
    sub: "PAIR bilateral · metalúrgico · São Paulo/SP",'''

html = html.replace(old_fake, new_fake)

# Replace first patient fields
old_p1_fields = '''      f_data_notif:"2025-09-10", f_data_diag:"2025-09-05",
      f_nome_un:"CEREST PAULISTANO", f_cnes:"6789012",
      f_mun_notif:"SAO PAULO", f_uf_notif:"SP", f_ibge_notif:"355030",
      f_nome:"ANA BEATRIZ SANTOS RODRIGUES", f_nasc:"1990-04-15", f_raca:"4", f_escol:"6",
      f_sus:"706012300000031", f_mae:"MARIA DE FATIMA SANTOS",
      f_mun_res:"SAO PAULO", f_uf_res:"SP", f_ibge_res:"355030",
      f_bairro_res:"VILA PRUDENTE", f_logr_res:"RUA PROFESSOR ALFREDO PUJOL", f_num_res:"320",
      f_cep:"03124-000", f_tel_res:"(11) 97123-4567", f_zona_res:"1",
      f_ocupacao:"OPERADOR DE TELEMARKETING",
      f_sit_mercado:"1", f_tempo_exp_val:"5", f_tempo_exp_tipo:"A",
      f_tempo_trab_val:"5", f_tempo_trab_tipo:"A",
      f_emp_nome:"CENTRAL DE ATENDIMENTO BRASIL LTDA", f_emp_cnae:"8220200",
      f_emp_uf:"SP", f_emp_mun:"SAO PAULO",
      f_diag_cid:"F43.1", f_regime:"1"
    },
    radios: {sexo:"F", alcool:"2", fumar:"2", psicofarmacos:"1", drogas:"2",
             outros_trab:"1", encam_caps:"1", cat:"2"},
    checks: {conduta:["1","3"]}'''

new_p1_fields = '''      f_data_notif:"2025-10-14", f_data_diag:"2025-10-08",
      f_nome_un:"CEREST PIRITUBA", f_cnes:"6123456",
      f_mun_notif:"SAO PAULO", f_uf_notif:"SP", f_ibge_notif:"355030",
      f_nome:"JOSE CARLOS FERREIRA SILVA", f_nasc:"1983-03-12", f_raca:"1", f_escol:"3",
      f_sus:"706012300000041", f_mae:"APARECIDA FERREIRA",
      f_mun_res:"SAO PAULO", f_uf_res:"SP", f_ibge_res:"355030",
      f_bairro_res:"PIRITUBA", f_logr_res:"RUA JOAO RAMALHO", f_num_res:"1540",
      f_cep:"05009-000", f_tel_res:"(11) 96789-1234", f_zona_res:"1",
      f_ocupacao:"TORNEIRO MECANICO",
      f_sit_mercado:"1", f_tempo_exp_val:"15", f_tempo_exp_tipo:"A",
      f_tempo_trab_val:"15", f_tempo_trab_tipo:"A",
      f_emp_nome:"METALURGICA SAO PAULO INDUSTRIA LTDA", f_emp_cnae:"2539000",
      f_emp_uf:"SP", f_emp_mun:"SAO PAULO",
      f_nivel_ruido_db:"96",
      f_diag_cid:"H83.3", f_regime:"1",
      f_grau_od:"2", f_grau_oe:"2"
    },
    radios: {sexo:"M", tipo_ruido:"1", pair_bilateral:"1", pair_progressao:"2",
             result_audiometria:"2", tipo_audiometria:"1",
             afastamento_trat:"1", afastamento_result:"1",
             alcool:"2", fumar:"1", psicofarmacos:"2", drogas:"2",
             outros_trab:"1", encam_caps:"1", cat:"1"},
    checks: {conduta:["1","2"], sintomas_pair:["1","3"], ototoxicos:["6"]}'''

html = html.replace(old_p1_fields, new_p1_fields)

# Replace second patient
old_p2_label = '''    label: "Roberto Lima, 48 anos",
    sub: "Depressão grave · TI · Curitiba/PR",'''
new_p2_label = '''    label: "Maria Aparecida Gonçalves, 55 anos",
    sub: "PAIR + zumbido · operadora de máquinas · Betim/MG",'''
html = html.replace(old_p2_label, new_p2_label)

old_p2_fields = '''      f_data_notif:"2025-07-22", f_data_diag:"2025-07-18",
      f_nome_un:"CEREST REGIONAL CURITIBA", f_cnes:"4100450",
      f_mun_notif:"CURITIBA", f_uf_notif:"PR", f_ibge_notif:"410690",
      f_nome:"ROBERTO CARLOS LIMA PEREIRA", f_nasc:"1977-11-03", f_raca:"1", f_escol:"7",
      f_sus:"706012300000032", f_mae:"TEREZINHA LIMA",
      f_mun_res:"CURITIBA", f_uf_res:"PR", f_ibge_res:"410690",
      f_bairro_res:"AGUA VERDE", f_logr_res:"RUA DEPUTADO MARIO DE BARROS", f_num_res:"850",
      f_cep:"80440-090", f_tel_res:"(41) 98234-5678", f_zona_res:"1",
      f_ocupacao:"ANALISTA DE SISTEMAS",
      f_sit_mercado:"1", f_tempo_exp_val:"18", f_tempo_exp_tipo:"A",
      f_tempo_trab_val:"18", f_tempo_trab_tipo:"A",
      f_emp_nome:"SOFTTECH SOLUCOES EM TI LTDA", f_emp_cnae:"6202300",
      f_emp_uf:"PR", f_emp_mun:"CURITIBA",
      f_diag_cid:"F32.2", f_regime:"1"
    },
    radios: {sexo:"M", alcool:"1", fumar:"1", psicofarmacos:"1", drogas:"2",
             outros_trab:"2", encam_caps:"2", cat:"1"},
    checks: {conduta:["1","3","5"]}'''

new_p2_fields = '''      f_data_notif:"2025-11-05", f_data_diag:"2025-10-30",
      f_nome_un:"CEREST METROPOLITANO BETIM", f_cnes:"3140070",
      f_mun_notif:"BETIM", f_uf_notif:"MG", f_ibge_notif:"310670",
      f_nome:"MARIA APARECIDA GONCALVES SOUZA", f_nasc:"1970-06-28", f_raca:"4", f_escol:"2",
      f_sus:"706012300000042", f_mae:"CONCEICAO GONCALVES",
      f_mun_res:"BETIM", f_uf_res:"MG", f_ibge_res:"310670",
      f_bairro_res:"JARDIM DAS ALTEROSAS", f_logr_res:"RUA CORONEL JOSE HONORIO", f_num_res:"210",
      f_cep:"32600-000", f_tel_res:"(31) 99456-7890", f_zona_res:"1",
      f_ocupacao:"OPERADOR DE MAQUINAS FIXAS EM GERAL",
      f_sit_mercado:"1", f_tempo_exp_val:"22", f_tempo_exp_tipo:"A",
      f_tempo_trab_val:"22", f_tempo_trab_tipo:"A",
      f_emp_nome:"INDUSTRIA TEXTIL BETIM SA", f_emp_cnae:"1340502",
      f_emp_uf:"MG", f_emp_mun:"BETIM",
      f_nivel_ruido_db:"89",
      f_diag_cid:"H83.3", f_regime:"1",
      f_grau_od:"3", f_grau_oe:"2"
    },
    radios: {sexo:"F", tipo_ruido:"1", pair_bilateral:"1", pair_progressao:"2",
             result_audiometria:"2", tipo_audiometria:"1",
             afastamento_trat:"2",
             alcool:"2", fumar:"2", psicofarmacos:"2", drogas:"2",
             outros_trab:"1", encam_caps:"1", cat:"2"},
    checks: {conduta:["1","2","4"], sintomas_pair:["1","2","3"], ototoxicos:["1","6"], agravos_pair:["1"]}'''

html = html.replace(old_p2_fields, new_p2_fields)

# 12. Arquivo de exportação de rascunho
html = html.replace(
    "a.download = 'rascunho-sinan-transtornos-'+new Date().toISOString().slice(0,10)+'.json';",
    "a.download = 'rascunho-sinan-pair-'+new Date().toISOString().slice(0,10)+'.json';"
)

# 13. Nome do arquivo PDF
html = html.replace(
    "var resp = await fetch('fichas/DRT_TranstornosMentais_editavel.pdf');",
    "var resp = await fetch('fichas/DRT_PAIR_editavel.pdf');"
)
html = html.replace(
    "if(!resp.ok) throw new Error('Arquivo DRT_TranstornosMentais_editavel.pdf não encontrado em fichas/');",
    "if(!resp.ok) throw new Error('Arquivo DRT_PAIR_editavel.pdf não encontrado em fichas/');"
)
html = html.replace(
    "a.download = 'SINAN_TranstornosMentais_'+nm+'_'+ds+'.pdf';",
    "a.download = 'SINAN_PAIR_'+nm+'_'+ds+'.pdf';"
)

# 14. Source de transferência
html = html.replace(
    "var payload = {source:'transtornos',",
    "var payload = {source:'pair',"
)

# 15. Lista de fichas para transferência (remover pair, adicionar transtornos)
old_transfer = """var TRANSFER_FICHAS_TM = [
  {id:'violencia', label:'Violência',            sub:'Violência doméstica, sexual e/ou interpessoal', url:'sinan_violencia.html', color:'#1e40af'},
  {id:'acidente',  label:'Acidente de Trabalho', sub:'Acidentes típicos, de trajeto ou fatais',        url:'sinan_acidente.html',  color:'#c2410c'},
  {id:'lerdort',   label:'LER/DORT',             sub:'Lesão por esforço repetitivo / DORT',            url:'sinan_lerdort.html',   color:'#0f766e'}
];"""
new_transfer = """var TRANSFER_FICHAS_TM = [
  {id:'violencia',   label:'Violência',              sub:'Violência doméstica, sexual e/ou interpessoal',    url:'sinan_violencia.html',   color:'#1e40af'},
  {id:'acidente',    label:'Acidente de Trabalho',   sub:'Acidentes típicos, de trajeto ou fatais',          url:'sinan_acidente.html',    color:'#c2410c'},
  {id:'lerdort',     label:'LER/DORT',               sub:'Lesão por esforço repetitivo / DORT',              url:'sinan_lerdort.html',     color:'#0f766e'},
  {id:'transtornos', label:'Transtornos Mentais',    sub:'Transtornos mentais relacionados ao trabalho',     url:'sinan_transtornos.html', color:'#4338ca'}
];"""
html = html.replace(old_transfer, new_transfer)

# 16. _applyVisibility — adicionar funções PAIR
old_apply = """function _applyVisibility(){
  onSexoChange();
  onEmpTerc();
  onFumar();
  onEvolucao();
  onCondutaOutros();
}"""
new_apply = """function _applyVisibility(){
  onSexoChange();
  onEmpTerc();
  onFumar();
  onEvolucao();
  onCondutaOutros();
  onSintOutros();
  onOtotoxOutros();
  onAgravosOutros();
}"""
html = html.replace(old_apply, new_apply)

# 17. Adicionar funções condicionais PAIR antes de _applyVisibility
old_cond = "function _applyVisibility(){"
new_cond = """function onSintOutros(){
  var has = Array.from(document.querySelectorAll('[name="sintomas_pair"]:checked')).some(function(c){return c.value==='5';});
  document.getElementById('box_sint_outros').style.display = has ? 'block' : 'none';
}
function onOtotoxOutros(){
  var has = Array.from(document.querySelectorAll('[name="ototoxicos"]:checked')).some(function(c){return c.value==='5';});
  document.getElementById('box_ototox_outros').style.display = has ? 'block' : 'none';
}
function onAgravosOutros(){
  var has = Array.from(document.querySelectorAll('[name="agravos_pair"]:checked')).some(function(c){return c.value==='7';});
  document.getElementById('box_agravos_outros').style.display = has ? 'block' : 'none';
}

function _applyVisibility(){"""
html = html.replace(old_cond, new_cond)

# 18. _clearForm — adicionar boxes PAIR
old_clear_boxes = "['row_gest','box_emp_terc','box_tempo_tabaco','box_obito','box_conduta_outros']"
new_clear_boxes = "['row_gest','box_emp_terc','box_tempo_tabaco','box_obito','box_conduta_outros','box_sint_outros','box_ototox_outros','box_agravos_outros']"
html = html.replace(old_clear_boxes, new_clear_boxes)

# 19. updateSectionBadges — mudar loop para 11 seções
html = html.replace(
    "for(var s=1;s<=9;s++){",
    "for(var s=1;s<=11;s++){"
)

# 20. ESS_IDS — adicionar CID como essencial (já está; verificar)
html = html.replace(
    "var ESS_IDS = {'f_data_notif':1,'f_data_diag':1,'f_nome':1,'f_raca':1,'f_mun_res':1,'f_ocupacao':1,'f_emp_nome':1};",
    "var ESS_IDS = {'f_data_notif':1,'f_data_diag':1,'f_nome':1,'f_raca':1,'f_mun_res':1,'f_ocupacao':1,'f_emp_nome':1,'f_diag_cid':1};"
)

# 21. PROG_EXCLUDE_IDS — manter igual

# 22. STD_GROUPS — adicionar novos grupos PAIR
html = html.replace(
    "var STD_GROUPS = ['cat','outros_trab','encam_caps','alcool','fumar','psicofarmacos','drogas'];",
    "var STD_GROUPS = ['cat','outros_trab','encam_caps','alcool','fumar','psicofarmacos','drogas','tipo_ruido','pair_bilateral','result_audiometria','tipo_audiometria'];"
)

# 23. Adicionar campos PDF para PAIR na função gerarPDF
old_sec6_pdf = """    // Seção 6 — Diagnóstico
    setTxt('diagnostico_especifico_cid10', tv('f_diag_cid'));
    setTxt('regime_tratamento',            tv('f_regime'));

    // Seção 7 — Hábitos
    setTxt('habito_alcool',                    getRadio('alcool'));"""

new_sec6_pdf = """    // Seção 6 — Diagnóstico
    setTxt('diagnostico_especifico_cid10', tv('f_diag_cid'));
    setTxt('regime_tratamento',            tv('f_regime'));

    // Seção 7 — Exames Audiométricos (PAIR)
    setTxt('tipo_ruido',                   tv('f_tipo_ruido'));
    var sinChecks = getChecks('sintomas_pair');
    setTxt('sintoma_zumbido',             sinChecks.indexOf('1')!==-1?'S':'');
    setTxt('sintoma_tontura',             sinChecks.indexOf('2')!==-1?'S':'');
    setTxt('sintoma_dificuldade_fala',    sinChecks.indexOf('3')!==-1?'S':'');
    setTxt('sintoma_cefaleia',            sinChecks.indexOf('4')!==-1?'S':'');
    setTxt('sintoma_outros',              sinChecks.indexOf('5')!==-1?tv('f_sint_outros_det'):'');
    setTxt('afastamento_tratamento',      tv('f_afastamento_trat'));
    setTxt('afastamento_resultado',       tv('f_afastamento_result'));
    setTxt('tempo_afastamento_valor',     tv('f_tempo_afast_val'));
    setTxt('tempo_afastamento_tipo',      tv('f_tempo_afast_tipo'));

    // Seção 8 — Agentes de Exposição (PAIR)
    var otoxChecks = getChecks('ototoxicos');
    setTxt('exposicao_solvente_tolueno',      otoxChecks.indexOf('1')!==-1?'S':'');
    setTxt('exposicao_metais_pesados',        otoxChecks.indexOf('2')!==-1?'S':'');
    setTxt('exposicao_medicamentos_ototoxicos',otoxChecks.indexOf('3')!==-1?'S':'');
    setTxt('exposicao_gases_toxicos',         otoxChecks.indexOf('4')!==-1?'S':'');
    setTxt('exposicao_outros',                otoxChecks.indexOf('5')!==-1?'S':'');
    setTxt('exposicao_outros_detalhe',        tv('f_ototox_outros_det'));
    var agravosChecks = getChecks('agravos_pair');
    setTxt('agravo_hipertensao',   agravosChecks.indexOf('1')!==-1?'S':'');
    setTxt('agravo_diabetes',      agravosChecks.indexOf('2')!==-1?'S':'');
    setTxt('agravo_transtorno_mental', agravosChecks.indexOf('3')!==-1?'S':'');
    setTxt('agravo_tuberculose',   agravosChecks.indexOf('4')!==-1?'S':'');
    setTxt('agravo_hanseniase',    agravosChecks.indexOf('5')!==-1?'S':'');
    setTxt('agravo_asma',          agravosChecks.indexOf('6')!==-1?'S':'');
    setTxt('agravo_outras',        agravosChecks.indexOf('7')!==-1?'S':'');
    setTxt('agravo_outras_detalhe',tv('f_agravos_outros_det'));

    // Seção 9 — Hábitos
    setTxt('habito_alcool',                    getRadio('alcool'));"""

html = html.replace(old_sec6_pdf, new_sec6_pdf)

# 24. Conduta PAIR - afastamento_risco (campo PDF)
old_conduta_pdf = """    setTxt('conduta_afastamento_desgaste', condChecks.indexOf('1')!==-1?'1':'2');
    setTxt('conduta_protecao_individual',  condChecks.indexOf('2')!==-1?'1':'2');
    setTxt('conduta_mudanca_organizacao',  condChecks.indexOf('3')!==-1?'1':'2');
    setTxt('conduta_protecao_coletiva',    condChecks.indexOf('4')!==-1?'1':'2');
    setTxt('conduta_afastamento_local',    condChecks.indexOf('5')!==-1?'1':'2');
    setTxt('conduta_outros',               condChecks.indexOf('6')!==-1?'1':'2');
    setTxt('conduta_nenhum',               condChecks.indexOf('7')!==-1?'1':'2');"""

new_conduta_pdf = """    setTxt('conduta_afastamento_risco',    condChecks.indexOf('1')!==-1?'S':'');
    setTxt('conduta_protecao_individual',  condChecks.indexOf('2')!==-1?'S':'');
    setTxt('conduta_mudanca_organizacao',  condChecks.indexOf('3')!==-1?'S':'');
    setTxt('conduta_protecao_coletiva',    condChecks.indexOf('4')!==-1?'S':'');
    setTxt('conduta_afastamento_local',    condChecks.indexOf('5')!==-1?'S':'');
    setTxt('conduta_outros',               condChecks.indexOf('6')!==-1?'S':'');
    setTxt('conduta_nenhum',               condChecks.indexOf('7')!==-1?'S':'');"""

html = html.replace(old_conduta_pdf, new_conduta_pdf)

# 25. Remove CAPS-specific fields from PDF that don't exist in PAIR
html = html.replace(
    "    setTxt('encaminhamento_caps',              getRadio('encam_caps'));",
    "    // encam_caps nao tem campo especifico no pdf PAIR"
)

# 26. Habitos no PDF — campos PAIR
html = html.replace(
    "    setTxt('habito_alcool',                    getRadio('alcool'));\r\n    setTxt('habito_fumar',                     getRadio('fumar'));\r\n    setTxt('tempo_exposicao_tabaco_valor',     tv('f_tempo_tabaco_val'));\r\n    setTxt('tempo_exposicao_tabaco_tipo',      tv('f_tempo_tabaco_tipo'));\r\n    setTxt('habito_psicofarmacos',             getRadio('psicofarmacos'));\r\n    setTxt('habito_drogas_psicoativas',        getRadio('drogas'));",
    "    // Habitos - sem campos especificos no PDF PAIR (info vai em observacoes)\r\n    var habitosObs = [];\r\n    if(getRadio('alcool')==='1') habitosObs.push('Uso de álcool: Sim');\r\n    if(getRadio('fumar')==='1') habitosObs.push('Tabagismo: Sim'+(tv('f_tempo_tabaco_val')?' ('+tv('f_tempo_tabaco_val')+' '+tv('f_tempo_tabaco_tipo')+')':''));\r\n    if(getRadio('psicofarmacos')==='1') habitosObs.push('Psicofármacos: Sim');\r\n    if(getRadio('drogas')==='1') habitosObs.push('Drogas psicoativas: Sim');\r\n    var obsBase = tv('f_obs');\r\n    if(habitosObs.length>0){\r\n      var obsHab = 'Hábitos: ' + habitosObs.join('; ');\r\n      setTxt('observacoes_complementares', obsBase ? obsBase + '\\n' + obsHab : obsHab);\r\n    } else {\r\n      setTxt('observacoes_complementares', obsBase);\r\n    }"
)
# Remove the original observacoes line at encerramento (sec 9)
html = html.replace(
    "    setTxt('observacoes_complementares',   tv('f_obs'));",
    "    // observacoes ja tratadas junto com habitos acima"
)

# 27. Title in transfer (source já mudado para pair)

# 28 - renomear referência a ov-quase-dl e btn-gerar

# 29. Fechar arquivo e salvar
with open('sinan_pair.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("sinan_pair.html gerado com sucesso!")
print(f"Tamanho: {len(html):,} bytes")
