import base64

with open('C:/assistente_sinan/violencia_v5.pdf', 'rb') as f:
    B64 = base64.b64encode(f.read()).decode('ascii')

HTML = """\
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>SINAN - Violencia</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,sans-serif;font-size:12px;background:#e8f0f7;color:#222;display:flex;flex-direction:column;height:100vh;overflow:hidden}
#hdr{background:linear-gradient(135deg,#0d4f7a,#1a6ba0);color:#fff;padding:8px 16px;flex-shrink:0}
#hdr h1{font-size:13px}
#hdr p{font-size:10px;opacity:.8;margin-top:2px}
#main{display:flex;flex:1;overflow:hidden}
#fp{width:42%;background:#fff;overflow-y:auto;border-right:3px solid #1a6ba0}
.ac{margin:6px 8px;border:1px solid #b8d4e8;border-radius:5px;overflow:hidden}
.ah{background:linear-gradient(135deg,#1a6ba0,#2980b9);color:#fff;padding:6px 10px;cursor:pointer;font-weight:bold;font-size:11px;display:flex;justify-content:space-between;user-select:none}
.ah:hover{background:#0d4f7a}
.ab{padding:8px 10px;background:#f5faff;display:none}
.ab.op{display:block}
.r{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:6px;align-items:flex-end}
.g{display:flex;flex-direction:column}
.g label{font-size:10px;color:#555;margin-bottom:2px;font-weight:600}
.g input,.g select{padding:3px 5px;border:1px solid #9ec3de;border-radius:3px;font-size:11px;background:#fff;outline:none}
.g input:focus,.g select:focus{border-color:#1a6ba0;box-shadow:0 0 0 2px #d0e8f8}
.g.w2{width:55px}.g.w3{width:75px}.g.w4{width:95px}.g.w5{width:120px}.g.wf{flex:1;min-width:100px}
.rg,.cg{display:flex;flex-wrap:wrap;gap:3px}
.rg label,.cg label{display:flex;align-items:center;gap:3px;font-size:10px;cursor:pointer;background:#e3f1fc;padding:2px 5px;border-radius:3px;border:1px solid #a8cce0;font-weight:normal;user-select:none}
.rg label:hover,.cg label:hover{background:#c8e4f8}
.sl{font-size:10px;color:#1a6ba0;font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin:5px 0 3px;border-bottom:1px solid #c8dff0;padding-bottom:2px}
#pp{width:58%;background:#d0dce8;overflow-y:auto;display:flex;flex-direction:column;align-items:center;padding:10px;gap:10px}
.pw{position:relative;box-shadow:0 3px 12px rgba(0,0,0,.3);border-radius:3px;overflow:hidden;background:#fff}
.pw canvas{display:block}
.ov{position:absolute;top:0;left:0;pointer-events:none}
#bg{background:linear-gradient(135deg,#0d4f7a,#1a6ba0);color:#fff;padding:7px 14px;border-radius:5px;font-weight:bold;font-size:12px;text-align:center;width:100%}
#btn{background:linear-gradient(135deg,#1e8449,#27ae60);color:#fff;border:none;padding:10px 30px;font-size:13px;font-weight:bold;border-radius:6px;cursor:pointer;box-shadow:0 3px 8px rgba(0,0,0,.2);width:90%;max-width:420px}
#btn:hover{background:linear-gradient(135deg,#196f3d,#1e8449)}
#btn:disabled{background:#999;cursor:not-allowed}
#st{font-size:11px;color:#333;text-align:center;min-height:18px;padding:2px 0}
</style>
</head>
<body>
<div id="hdr">
  <h1>&#128203; SINAN &mdash; Ficha de Notificação de Violência Doméstica, Sexual e/ou Outras Violências</h1>
  <p>Preencha os campos à esquerda. O preview à direita atualiza em tempo real.</p>
</div>
<div id="main">

<!-- FORMULÁRIO -->
<div id="fp">

<div class="ac">
  <div class="ah" onclick="tog(this)">1. Dados da Notificação <span>&#9660;</span></div>
  <div class="ab op">
    <div class="r">
      <div class="g wf"><label>Número do Registro</label><input id="f_num_reg" oninput="upd()" placeholder="Ex: 20240001"></div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 3 – Data da Notificação</label><input type="date" id="f_data_notif" oninput="upd()"></div>
      <div class="g"><label>Campo 9 – Data da Ocorrência</label><input type="date" id="f_data_ocorr" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g w2"><label>Campo 4 – UF</label><input id="f_uf_notif" maxlength="2" oninput="upd()" placeholder="SP"></div>
      <div class="g wf"><label>Campo 5 – Município de Notificação</label><input id="f_mun_notif" oninput="upd()" placeholder="Município"></div>
      <div class="g w4"><label>Cód. IBGE</label><input id="f_ibge_notif" maxlength="7" oninput="upd()" placeholder="0000000"></div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 6 – Tipo de Unidade Notificadora</label>
        <select id="f_tipo_un" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="1">1 – Unidade de Saúde</option>
          <option value="2">2 – Unid. Assistência Social</option>
          <option value="3">3 – Estabelecimento de Ensino</option>
          <option value="4">4 – Conselho Tutelar</option>
          <option value="5">5 – Unidade de Saúde Indígena</option>
          <option value="6">6 – Centro Especializado Atend. Mulher</option>
          <option value="7">7 – Outros</option>
        </select>
      </div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 7 – Nome da Unidade Notificadora</label><input id="f_nome_un" oninput="upd()" placeholder="Nome completo"></div>
      <div class="g w4"><label>CNES</label><input id="f_cnes" maxlength="7" oninput="upd()" placeholder="0000000"></div>
    </div>
  </div>
</div>

<div class="ac">
  <div class="ah" onclick="tog(this)">2. Identificação do Paciente <span>&#9658;</span></div>
  <div class="ab">
    <div class="r">
      <div class="g wf"><label>Campo 10 – Nome do Paciente</label><input id="f_nome" oninput="upd()" placeholder="Nome completo"></div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 11 – Data de Nascimento</label><input type="date" id="f_nasc" oninput="upd()"></div>
      <div class="g w3"><label>Campo 12 – Idade</label><input type="number" id="f_idade" min="0" max="999" oninput="upd()"></div>
      <div class="g w3"><label>Unidade</label>
        <select id="f_idade_un" onchange="upd()">
          <option value="">--</option><option value="H">H-Hora</option>
          <option value="D">D-Dia</option><option value="M">M-Mês</option>
          <option value="A">A-Ano</option>
        </select>
      </div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 13 – Sexo</label>
        <div class="rg">
          <label><input type="radio" name="sexo" value="M" onchange="upd()"> M-Masc.</label>
          <label><input type="radio" name="sexo" value="F" onchange="upd()"> F-Fem.</label>
          <label><input type="radio" name="sexo" value="I" onchange="upd()"> I-Ign.</label>
        </div>
      </div>
      <div class="g"><label>Campo 14 – Gestante</label>
        <select id="f_gest" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="1">1-1º Trim.</option><option value="2">2-2º Trim.</option>
          <option value="3">3-3º Trim.</option><option value="4">4-Ig.gest.</option>
          <option value="5">5-Não</option><option value="6">6-N.aplica</option>
          <option value="9">9-Ignorado</option>
        </select>
      </div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 15 – Raça/Cor</label>
        <select id="f_raca" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="1">1-Branca</option><option value="2">2-Preta</option>
          <option value="3">3-Amarela</option><option value="4">4-Parda</option>
          <option value="5">5-Indígena</option><option value="9">9-Ignorado</option>
        </select>
      </div>
      <div class="g"><label>Campo 16 – Escolaridade</label>
        <select id="f_escol" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="0">0-Analfabeto</option>
          <option value="1">1-1ª-4ª EF incomp.</option>
          <option value="2">2-4ª EF comp.</option>
          <option value="3">3-5ª-8ª EF incomp.</option>
          <option value="4">4-EF completo</option>
          <option value="5">5-EM incompleto</option>
          <option value="6">6-EM completo</option>
          <option value="7">7-Sup. incompleto</option>
          <option value="8">8-Sup. completo</option>
          <option value="9">9-Ignorado</option>
          <option value="10">10-N.aplica</option>
        </select>
      </div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 17 – Nº Cartão SUS</label><input id="f_sus" maxlength="15" oninput="upd()" placeholder="000000000000000"></div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 18 – Nome da Mãe</label><input id="f_mae" oninput="upd()" placeholder="Nome completo da mãe"></div>
    </div>
  </div>
</div>

<div class="ac">
  <div class="ah" onclick="tog(this)">3. Dados de Residência <span>&#9658;</span></div>
  <div class="ab">
    <div class="r">
      <div class="g w2"><label>Campo 19 – UF</label><input id="f_uf_res" maxlength="2" oninput="upd()"></div>
      <div class="g wf"><label>Campo 20 – Município</label><input id="f_mun_res" oninput="upd()"></div>
      <div class="g w4"><label>Cód. IBGE</label><input id="f_ibge_res" maxlength="7" oninput="upd()"></div>
      <div class="g w4"><label>Campo 21 – Distrito</label><input id="f_dist_res" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g w4"><label>Campo 22 – Bairro</label><input id="f_bairro_res" oninput="upd()"></div>
      <div class="g wf"><label>Campo 23 – Logradouro</label><input id="f_logr_res" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g w3"><label>Campo 24 – Número</label><input id="f_num_res" oninput="upd()"></div>
      <div class="g wf"><label>Campo 25 – Complemento</label><input id="f_compl_res" oninput="upd()"></div>
      <div class="g w4"><label>Campo 29 – CEP</label><input id="f_cep" maxlength="9" oninput="upd()" placeholder="00000-000"></div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 28 – Ponto de Referência</label><input id="f_pref_res" oninput="upd()"></div>
      <div class="g w5"><label>Campo 30 – Telefone (DDD)</label><input id="f_tel_res" oninput="upd()" placeholder="(00)00000-0000"></div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 31 – Zona</label>
        <select id="f_zona_res" onchange="upd()">
          <option value="">--</option><option value="1">1-Urbana</option>
          <option value="2">2-Rural</option><option value="3">3-Periurbana</option>
          <option value="9">9-Ignorado</option>
        </select>
      </div>
      <div class="g wf"><label>Campo 32 – País (fora do Brasil)</label><input id="f_pais_res" oninput="upd()"></div>
    </div>
  </div>
</div>

<div class="ac">
  <div class="ah" onclick="tog(this)">4. Dados Complementares <span>&#9658;</span></div>
  <div class="ab">
    <div class="r">
      <div class="g wf"><label>Campo 33 – Nome Social</label><input id="f_nome_social" oninput="upd()"></div>
      <div class="g wf"><label>Campo 34 – Ocupação</label><input id="f_ocupacao" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 35 – Situação Conjugal</label>
        <select id="f_est_civil" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="1">1-Solteiro</option><option value="2">2-Casado/União</option>
          <option value="3">3-Viúvo</option><option value="4">4-Separado</option>
          <option value="8">8-N.aplica</option><option value="9">9-Ignorado</option>
        </select>
      </div>
      <div class="g"><label>Campo 36 – Orientação Sexual</label>
        <select id="f_or_sex" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="1">1-Heterossexual</option><option value="2">2-Homossexual</option>
          <option value="3">3-Bissexual</option><option value="8">8-N.aplica</option>
          <option value="9">9-Ignorado</option>
        </select>
      </div>
      <div class="g"><label>Campo 37 – Identidade de Gênero</label>
        <select id="f_id_gen" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="1">1-Travesti</option><option value="2">2-Mulher Trans.</option>
          <option value="3">3-Homem Trans.</option><option value="8">8-N.aplica</option>
          <option value="9">9-Ignorado</option>
        </select>
      </div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 38 – Possui Deficiência/Transtorno?</label>
        <div class="rg">
          <label><input type="radio" name="defic" value="1" onchange="upd()"> 1-Sim</label>
          <label><input type="radio" name="defic" value="2" onchange="upd()"> 2-Não</label>
          <label><input type="radio" name="defic" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 39 – Tipo(s) de Deficiência (se sim)</label>
        <div class="cg">
          <label><input type="checkbox" name="tdefic" value="Fisica" onchange="upd()"> Física</label>
          <label><input type="checkbox" name="tdefic" value="Visual" onchange="upd()"> Visual</label>
          <label><input type="checkbox" name="tdefic" value="Intelectual" onchange="upd()"> Intelectual</label>
          <label><input type="checkbox" name="tdefic" value="Auditiva" onchange="upd()"> Auditiva</label>
          <label><input type="checkbox" name="tdefic" value="T.Mental" onchange="upd()"> T.Mental</label>
          <label><input type="checkbox" name="tdefic" value="T.Comp." onchange="upd()"> T.Comportamento</label>
          <label><input type="checkbox" name="tdefic" value="Outras" onchange="upd()"> Outras</label>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ac">
  <div class="ah" onclick="tog(this)">5. Dados da Ocorrência <span>&#9658;</span></div>
  <div class="ab">
    <div class="r">
      <div class="g w2"><label>Campo 40 – UF</label><input id="f_uf_oc" maxlength="2" oninput="upd()"></div>
      <div class="g wf"><label>Campo 41 – Município</label><input id="f_mun_oc" oninput="upd()"></div>
      <div class="g w4"><label>Cód. IBGE</label><input id="f_ibge_oc" maxlength="7" oninput="upd()"></div>
      <div class="g w4"><label>Campo 42 – Distrito</label><input id="f_dist_oc" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g w4"><label>Campo 43 – Bairro</label><input id="f_bairro_oc" oninput="upd()"></div>
      <div class="g wf"><label>Campo 44 – Logradouro</label><input id="f_logr_oc" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g w3"><label>Campo 45 – Número</label><input id="f_num_oc" oninput="upd()"></div>
      <div class="g wf"><label>Campo 46 – Complemento</label><input id="f_compl_oc" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 49 – Ponto de Referência</label><input id="f_pref_oc" oninput="upd()"></div>
      <div class="g"><label>Campo 51 – Hora (HH:MM)</label><input type="time" id="f_hora_oc" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 50 – Zona</label>
        <select id="f_zona_oc" onchange="upd()">
          <option value="">--</option><option value="1">1-Urbana</option>
          <option value="2">2-Rural</option><option value="3">3-Periurbana</option>
          <option value="9">9-Ignorado</option>
        </select>
      </div>
      <div class="g wf"><label>Campo 52 – Local de Ocorrência</label>
        <select id="f_local_oc" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="01">01-Residência</option><option value="02">02-Habitação coletiva</option>
          <option value="03">03-Escola</option><option value="04">04-Local esportivo</option>
          <option value="05">05-Bar/similar</option><option value="06">06-Via pública</option>
          <option value="07">07-Comércio/serviços</option><option value="08">08-Indústrias</option>
          <option value="09">09-Outro</option><option value="99">99-Ignorado</option>
        </select>
      </div>
    </div>
    <div class="r">
      <div class="g"><label>Campo 53 – Ocorreu outras vezes?</label>
        <div class="rg">
          <label><input type="radio" name="outr_vez" value="1" onchange="upd()"> 1-Sim</label>
          <label><input type="radio" name="outr_vez" value="2" onchange="upd()"> 2-Não</label>
          <label><input type="radio" name="outr_vez" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
      <div class="g"><label>Campo 54 – Lesão autoprovocada?</label>
        <div class="rg">
          <label><input type="radio" name="auto_prov" value="1" onchange="upd()"> 1-Sim</label>
          <label><input type="radio" name="auto_prov" value="2" onchange="upd()"> 2-Não</label>
          <label><input type="radio" name="auto_prov" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ac">
  <div class="ah" onclick="tog(this)">6. Dados da Violência (Pág. 2) <span>&#9658;</span></div>
  <div class="ab">
    <div class="r">
      <div class="g wf"><label>Campo 55 – Motivação</label>
        <select id="f_motiv" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="01">01-Sexismo</option><option value="02">02-Homofobia/Lesbofobia/Bifobia/Transfobia</option>
          <option value="03">03-Racismo</option><option value="04">04-Intolerância religiosa</option>
          <option value="05">05-Xenofobia</option><option value="06">06-Conflito geracional</option>
          <option value="07">07-Situação de rua</option><option value="08">08-Deficiência</option>
          <option value="09">09-Outros</option><option value="88">88-N.aplica</option>
          <option value="99">99-Ignorado</option>
        </select>
      </div>
    </div>
    <div class="sl">Campo 56 – Tipo de Violência</div>
    <div class="r"><div class="g wf"><div class="cg">
      <label><input type="checkbox" name="tipo_viol" value="Fisica" onchange="upd()"> Física</label>
      <label><input type="checkbox" name="tipo_viol" value="Psicol/Moral" onchange="upd()"> Psicológica/Moral</label>
      <label><input type="checkbox" name="tipo_viol" value="Tortura" onchange="upd()"> Tortura</label>
      <label><input type="checkbox" name="tipo_viol" value="Sexual" onchange="upd()"> Sexual</label>
      <label><input type="checkbox" name="tipo_viol" value="Trafico" onchange="upd()"> Tráfico</label>
      <label><input type="checkbox" name="tipo_viol" value="Financ/Econ" onchange="upd()"> Financeira/Econ.</label>
      <label><input type="checkbox" name="tipo_viol" value="Neglig/Aband" onchange="upd()"> Negligência/Abandono</label>
      <label><input type="checkbox" name="tipo_viol" value="Trab.Inf." onchange="upd()"> Trabalho infantil</label>
      <label><input type="checkbox" name="tipo_viol" value="Interv.Legal" onchange="upd()"> Intervenção legal</label>
      <label><input type="checkbox" name="tipo_viol" value="Outros" onchange="upd()"> Outros</label>
    </div></div></div>
    <div class="sl">Campo 57 – Meio de Agressão</div>
    <div class="r"><div class="g wf"><div class="cg">
      <label><input type="checkbox" name="meio_agr" value="Forca corp." onchange="upd()"> Força corporal</label>
      <label><input type="checkbox" name="meio_agr" value="Enforcamento" onchange="upd()"> Enforcamento</label>
      <label><input type="checkbox" name="meio_agr" value="Obj.Contund." onchange="upd()"> Obj.contundente</label>
      <label><input type="checkbox" name="meio_agr" value="Obj.Perfuro" onchange="upd()"> Obj.pérfuro-cortante</label>
      <label><input type="checkbox" name="meio_agr" value="Subst/Enven." onchange="upd()"> Substância/Envenenamento</label>
      <label><input type="checkbox" name="meio_agr" value="Arma fogo" onchange="upd()"> Arma de fogo</label>
      <label><input type="checkbox" name="meio_agr" value="Obj.Quente" onchange="upd()"> Obj.quente</label>
      <label><input type="checkbox" name="meio_agr" value="Ameaca" onchange="upd()"> Ameaça</label>
      <label><input type="checkbox" name="meio_agr" value="Outro" onchange="upd()"> Outro</label>
    </div></div></div>
    <div class="sl">Campo 58 – Violência Sexual – Tipo</div>
    <div class="r"><div class="g wf"><div class="cg">
      <label><input type="checkbox" name="viol_sex" value="Assedio sex." onchange="upd()"> Assédio sexual</label>
      <label><input type="checkbox" name="viol_sex" value="Estupro" onchange="upd()"> Estupro</label>
      <label><input type="checkbox" name="viol_sex" value="Porn.infantil" onchange="upd()"> Pornografia infantil</label>
      <label><input type="checkbox" name="viol_sex" value="Explor.sex." onchange="upd()"> Exploração sexual</label>
      <label><input type="checkbox" name="viol_sex" value="Outros" onchange="upd()"> Outros</label>
    </div></div></div>
    <div class="sl">Campo 59 – Procedimentos Realizados</div>
    <div class="r"><div class="g wf"><div class="cg">
      <label><input type="checkbox" name="proc" value="Profil.DST" onchange="upd()"> Profilaxia DST</label>
      <label><input type="checkbox" name="proc" value="Profil.HIV" onchange="upd()"> Profilaxia HIV</label>
      <label><input type="checkbox" name="proc" value="Profil.HepB" onchange="upd()"> Profilaxia Hep.B</label>
      <label><input type="checkbox" name="proc" value="Col.Sangue" onchange="upd()"> Coleta sangue</label>
      <label><input type="checkbox" name="proc" value="Col.Secrecao" onchange="upd()"> Coleta secreção</label>
      <label><input type="checkbox" name="proc" value="Col.Semen" onchange="upd()"> Coleta sêmen</label>
      <label><input type="checkbox" name="proc" value="Contracep.Em." onchange="upd()"> Contracepção emerg.</label>
      <label><input type="checkbox" name="proc" value="Aborto lei" onchange="upd()"> Aborto previsto em lei</label>
    </div></div></div>
    <div class="r">
      <div class="g"><label>Campo 60 – Nº de Envolvidos</label>
        <div class="rg">
          <label><input type="radio" name="nenv" value="1" onchange="upd()"> 1-Um</label>
          <label><input type="radio" name="nenv" value="2" onchange="upd()"> 2-Dois ou mais</label>
          <label><input type="radio" name="nenv" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
    </div>
    <div class="sl">Campo 61 – Vínculo/Parentesco do Autor com a Vítima</div>
    <div class="r"><div class="g wf"><div class="cg">
      <label><input type="checkbox" name="vinc" value="Pai" onchange="upd()"> Pai</label>
      <label><input type="checkbox" name="vinc" value="Mae" onchange="upd()"> Mãe</label>
      <label><input type="checkbox" name="vinc" value="Padrasto" onchange="upd()"> Padrasto</label>
      <label><input type="checkbox" name="vinc" value="Madrasta" onchange="upd()"> Madrasta</label>
      <label><input type="checkbox" name="vinc" value="Conjuge" onchange="upd()"> Cônjuge</label>
      <label><input type="checkbox" name="vinc" value="Ex-conjuge" onchange="upd()"> Ex-cônjuge</label>
      <label><input type="checkbox" name="vinc" value="Namorado(a)" onchange="upd()"> Namorado(a)</label>
      <label><input type="checkbox" name="vinc" value="Ex-namorado(a)" onchange="upd()"> Ex-namorado(a)</label>
      <label><input type="checkbox" name="vinc" value="Filho(a)" onchange="upd()"> Filho(a)</label>
      <label><input type="checkbox" name="vinc" value="Irmao(a)" onchange="upd()"> Irmão(ã)</label>
      <label><input type="checkbox" name="vinc" value="Amigos/Conh." onchange="upd()"> Amigos/Conhecidos</label>
      <label><input type="checkbox" name="vinc" value="Desconhecido" onchange="upd()"> Desconhecido(a)</label>
      <label><input type="checkbox" name="vinc" value="Cuidador(a)" onchange="upd()"> Cuidador(a)</label>
      <label><input type="checkbox" name="vinc" value="Patrao/Chefe" onchange="upd()"> Patrão/Chefe</label>
      <label><input type="checkbox" name="vinc" value="Rel.Instit." onchange="upd()"> Relação institucional</label>
      <label><input type="checkbox" name="vinc" value="Policial" onchange="upd()"> Policial/Agente da lei</label>
      <label><input type="checkbox" name="vinc" value="Propria pessoa" onchange="upd()"> Própria pessoa</label>
      <label><input type="checkbox" name="vinc" value="Outros" onchange="upd()"> Outros</label>
    </div></div></div>
    <div class="r">
      <div class="g"><label>Campo 62 – Sexo do Provável Autor</label>
        <div class="rg">
          <label><input type="radio" name="sex_autor" value="1" onchange="upd()"> 1-Masc.</label>
          <label><input type="radio" name="sex_autor" value="2" onchange="upd()"> 2-Fem.</label>
          <label><input type="radio" name="sex_autor" value="3" onchange="upd()"> 3-Ambos</label>
          <label><input type="radio" name="sex_autor" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
      <div class="g"><label>Campo 63 – Suspeita Álcool</label>
        <div class="rg">
          <label><input type="radio" name="alcool" value="1" onchange="upd()"> 1-Sim</label>
          <label><input type="radio" name="alcool" value="2" onchange="upd()"> 2-Não</label>
          <label><input type="radio" name="alcool" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="g wf"><label>Campo 64 – Ciclo de Vida do Provável Autor</label>
        <select id="f_ciclo" onchange="upd()">
          <option value="">-- Selecione --</option>
          <option value="1">1-Criança (0-9 anos)</option>
          <option value="2">2-Adolescente (10-19 anos)</option>
          <option value="3">3-Jovem (20-24 anos)</option>
          <option value="4">4-Adulto (25-59 anos)</option>
          <option value="5">5-Idoso (60+ anos)</option>
          <option value="9">9-Ignorado</option>
        </select>
      </div>
    </div>
    <div class="sl">Campo 65 – Encaminhamento</div>
    <div class="r"><div class="g wf"><div class="cg">
      <label><input type="checkbox" name="encam" value="Rede Saude" onchange="upd()"> Rede da Saúde</label>
      <label><input type="checkbox" name="encam" value="Rede Assist.Soc." onchange="upd()"> Rede Assist.Social</label>
      <label><input type="checkbox" name="encam" value="Rede Educ." onchange="upd()"> Rede Educação</label>
      <label><input type="checkbox" name="encam" value="Rede At.Mulher" onchange="upd()"> Rede Atend.Mulher</label>
      <label><input type="checkbox" name="encam" value="Conselho Tutelar" onchange="upd()"> Conselho Tutelar</label>
      <label><input type="checkbox" name="encam" value="Conselho Idoso" onchange="upd()"> Conselho Idoso</label>
      <label><input type="checkbox" name="encam" value="Del.Mulher" onchange="upd()"> Del.Atend.Mulher</label>
      <label><input type="checkbox" name="encam" value="Del.Idoso" onchange="upd()"> Del.Atend.Idoso</label>
      <label><input type="checkbox" name="encam" value="Outras Del." onchange="upd()"> Outras Delegacias</label>
      <label><input type="checkbox" name="encam" value="CRDH" onchange="upd()"> Ctr.Ref.Dir.Humanos</label>
      <label><input type="checkbox" name="encam" value="Just.Inf.Juv." onchange="upd()"> Justiça Infância/Juv.</label>
      <label><input type="checkbox" name="encam" value="Min.Publico" onchange="upd()"> Ministério Público</label>
      <label><input type="checkbox" name="encam" value="Def.Publica" onchange="upd()"> Defensoria Pública</label>
      <label><input type="checkbox" name="encam" value="Del.Prot.Crianca" onchange="upd()"> Del.Prot.Criança/Adol.</label>
    </div></div></div>
    <div class="r">
      <div class="g"><label>Campo 66 – Violência rel.Trabalho?</label>
        <div class="rg">
          <label><input type="radio" name="viol_trab" value="1" onchange="upd()"> 1-Sim</label>
          <label><input type="radio" name="viol_trab" value="2" onchange="upd()"> 2-Não</label>
          <label><input type="radio" name="viol_trab" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
      <div class="g"><label>Campo 67 – CAT emitida?</label>
        <div class="rg">
          <label><input type="radio" name="cat" value="1" onchange="upd()"> 1-Sim</label>
          <label><input type="radio" name="cat" value="2" onchange="upd()"> 2-Não</label>
          <label><input type="radio" name="cat" value="9" onchange="upd()"> 9-Ign.</label>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="g w4"><label>Campo 68 – CID-10 Circunstância</label><input id="f_cid10" maxlength="4" oninput="upd()" placeholder="Y09"></div>
    </div>
  </div>
</div>

<div class="ac">
  <div class="ah" onclick="tog(this)">7. Encerramento e Notificador <span>&#9658;</span></div>
  <div class="ab">
    <div class="r">
      <div class="g"><label>Campo 69 – Data de Encerramento</label><input type="date" id="f_data_enc" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g wf"><label>Nome do Acompanhante</label><input id="f_acomp_nome" oninput="upd()"></div>
      <div class="g w4"><label>Vínculo</label><input id="f_acomp_vinc" oninput="upd()"></div>
      <div class="g w4"><label>Telefone (DDD)</label><input id="f_acomp_tel" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g wf"><label>Município/Unidade de Saúde Notificadora</label><input id="f_notif_mun" oninput="upd()"></div>
      <div class="g w4"><label>CNES Notificador</label><input id="f_notif_cnes" maxlength="7" oninput="upd()"></div>
    </div>
    <div class="r">
      <div class="g wf"><label>Nome do Notificador</label><input id="f_notif_nome" oninput="upd()"></div>
      <div class="g w4"><label>Função</label><input id="f_notif_func" oninput="upd()"></div>
    </div>
  </div>
</div>

<div style="height:20px"></div>
</div><!-- /fp -->

<!-- PREVIEW -->
<div id="pp">
  <div id="bg">&#128203; Preview da Ficha SINAN &mdash; Violência</div>
  <div id="st">Carregando PDF...</div>
  <div class="pw"><canvas id="pg1"></canvas><canvas id="ov1" class="ov"></canvas></div>
  <div class="pw"><canvas id="pg2"></canvas><canvas id="ov2" class="ov"></canvas></div>
  <button id="btn" onclick="gerarPDF()">&#128196; Gerar Ficha PDF</button>
  <div style="height:20px"></div>
</div>

</div><!-- /main -->

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
<script>
const SCALE=1.5, PH=842;
const B64='PDFB64PLACEHOLDER';

const C1={
  f_num_reg:{x:453,y:800},f_data_notif:{x:465,y:697},f_uf_notif:{x:67,y:672},
  f_mun_notif:{x:102,y:679},f_ibge_notif:{x:492,y:675},f_tipo_un:{x:160,y:656},
  f_nome_un:{x:95,y:633},f_cnes:{x:458,y:622},f_data_ocorr:{x:465,y:617},
  f_nome:{x:90,y:599},f_nasc:{x:465,y:600},f_idade:{x:75,y:574},
  f_idade_un:{x:116,y:574},sexo:{x:180,y:574},f_gest:{x:263,y:574},
  f_raca:{x:468,y:574},f_escol:{x:120,y:547},f_sus:{x:75,y:519},
  f_mae:{x:270,y:522},f_uf_res:{x:77,y:487},f_mun_res:{x:110,y:488},
  f_ibge_res:{x:493,y:485},f_dist_res:{x:430,y:485},f_bairro_res:{x:92,y:461},
  f_logr_res:{x:220,y:461},f_num_res:{x:78,y:436},f_compl_res:{x:180,y:436},
  f_cep:{x:478,y:409},f_pref_res:{x:234,y:412},f_tel_res:{x:78,y:386},
  f_zona_res:{x:220,y:384},f_pais_res:{x:380,y:384},f_nome_social:{x:78,y:340},
  f_ocupacao:{x:374,y:337},f_est_civil:{x:78,y:319},f_or_sex:{x:78,y:283},
  f_id_gen:{x:344,y:283},defic:{x:78,y:247},tdefic:{x:204,y:247},
  f_uf_oc:{x:78,y:209},f_mun_oc:{x:110,y:209},f_ibge_oc:{x:493,y:206},
  f_dist_oc:{x:430,y:209},f_bairro_oc:{x:92,y:183},f_logr_oc:{x:220,y:183},
  f_num_oc:{x:78,y:158},f_compl_oc:{x:184,y:158},f_pref_oc:{x:78,y:133},
  f_zona_oc:{x:240,y:131},f_hora_oc:{x:380,y:131},f_local_oc:{x:78,y:107},
  outr_vez:{x:424,y:108},auto_prov:{x:424,y:83}
};

const C2={
  f_motiv:{x:78,y:788},tipo_viol:{x:78,y:761},meio_agr:{x:78,y:746},
  viol_sex:{x:78,y:697},proc:{x:78,y:661},nenv:{x:68,y:618},
  vinc:{x:134,y:621},sex_autor:{x:434,y:621},alcool:{x:520,y:618},
  f_ciclo:{x:78,y:538},encam:{x:78,y:492},viol_trab:{x:78,y:394},
  cat:{x:204,y:391},f_cid10:{x:464,y:394},f_data_enc:{x:84,y:359},
  f_acomp_nome:{x:104,y:303},f_acomp_vinc:{x:264,y:303},f_acomp_tel:{x:454,y:303},
  f_notif_mun:{x:78,y:156},f_notif_cnes:{x:518,y:156},
  f_notif_nome:{x:78,y:125},f_notif_func:{x:234,y:125}
};

function fd(iso){if(!iso)return '';const[y,m,d]=iso.split('-');return d+'/'+m+'/'+y;}
function gV(id){const e=document.getElementById(id);return e?e.value.trim():'';}
function gR(n){const e=document.querySelector('input[name="'+n+'"]:checked');return e?e.value:'';}
function gC(n){return[...document.querySelectorAll('input[name="'+n+'"]:checked')].map(e=>e.value).join(', ');}

function collect(){
  return{
    f_num_reg:gV('f_num_reg'),f_data_notif:fd(gV('f_data_notif')),
    f_uf_notif:gV('f_uf_notif').toUpperCase(),f_mun_notif:gV('f_mun_notif'),
    f_ibge_notif:gV('f_ibge_notif'),f_tipo_un:gV('f_tipo_un'),
    f_nome_un:gV('f_nome_un'),f_cnes:gV('f_cnes'),f_data_ocorr:fd(gV('f_data_ocorr')),
    f_nome:gV('f_nome'),f_nasc:fd(gV('f_nasc')),f_idade:gV('f_idade'),
    f_idade_un:gV('f_idade_un'),sexo:gR('sexo'),f_gest:gV('f_gest'),
    f_raca:gV('f_raca'),f_escol:gV('f_escol'),f_sus:gV('f_sus'),f_mae:gV('f_mae'),
    f_uf_res:gV('f_uf_res').toUpperCase(),f_mun_res:gV('f_mun_res'),
    f_ibge_res:gV('f_ibge_res'),f_dist_res:gV('f_dist_res'),
    f_bairro_res:gV('f_bairro_res'),f_logr_res:gV('f_logr_res'),
    f_num_res:gV('f_num_res'),f_compl_res:gV('f_compl_res'),f_cep:gV('f_cep'),
    f_pref_res:gV('f_pref_res'),f_tel_res:gV('f_tel_res'),
    f_zona_res:gV('f_zona_res'),f_pais_res:gV('f_pais_res'),
    f_nome_social:gV('f_nome_social'),f_ocupacao:gV('f_ocupacao'),
    f_est_civil:gV('f_est_civil'),f_or_sex:gV('f_or_sex'),f_id_gen:gV('f_id_gen'),
    defic:gR('defic'),tdefic:gC('tdefic'),
    f_uf_oc:gV('f_uf_oc').toUpperCase(),f_mun_oc:gV('f_mun_oc'),
    f_ibge_oc:gV('f_ibge_oc'),f_dist_oc:gV('f_dist_oc'),
    f_bairro_oc:gV('f_bairro_oc'),f_logr_oc:gV('f_logr_oc'),
    f_num_oc:gV('f_num_oc'),f_compl_oc:gV('f_compl_oc'),f_pref_oc:gV('f_pref_oc'),
    f_zona_oc:gV('f_zona_oc'),f_hora_oc:gV('f_hora_oc'),f_local_oc:gV('f_local_oc'),
    outr_vez:gR('outr_vez'),auto_prov:gR('auto_prov'),
    f_motiv:gV('f_motiv'),tipo_viol:gC('tipo_viol'),meio_agr:gC('meio_agr'),
    viol_sex:gC('viol_sex'),proc:gC('proc'),nenv:gR('nenv'),vinc:gC('vinc'),
    sex_autor:gR('sex_autor'),alcool:gR('alcool'),f_ciclo:gV('f_ciclo'),
    encam:gC('encam'),viol_trab:gR('viol_trab'),cat:gR('cat'),
    f_cid10:gV('f_cid10').toUpperCase(),f_data_enc:fd(gV('f_data_enc')),
    f_acomp_nome:gV('f_acomp_nome'),f_acomp_vinc:gV('f_acomp_vinc'),
    f_acomp_tel:gV('f_acomp_tel'),f_notif_mun:gV('f_notif_mun'),
    f_notif_cnes:gV('f_notif_cnes'),f_notif_nome:gV('f_notif_nome'),
    f_notif_func:gV('f_notif_func')
  };
}

let pdfDoc=null;
async function initPDF(){
  pdfjsLib.GlobalWorkerOptions.workerSrc=
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const raw=atob(B64),buf=new Uint8Array(raw.length);
  for(let i=0;i<raw.length;i++)buf[i]=raw.charCodeAt(i);
  pdfDoc=await pdfjsLib.getDocument({data:buf}).promise;
  for(let pg=1;pg<=2;pg++){
    const page=await pdfDoc.getPage(pg);
    const vp=page.getViewport({scale:SCALE});
    const c=document.getElementById('pg'+pg);
    c.width=vp.width;c.height=vp.height;
    const o=document.getElementById('ov'+pg);
    o.width=vp.width;o.height=vp.height;
    await page.render({canvasContext:c.getContext('2d'),viewport:vp}).promise;
  }
  document.getElementById('st').textContent='PDF carregado. Preencha o formulario.';
  upd();
}

function drawOv(ovId,coords,vals){
  const cv=document.getElementById(ovId);
  if(!cv)return;
  const ctx=cv.getContext('2d');
  ctx.clearRect(0,0,cv.width,cv.height);
  ctx.fillStyle='#0a2a6e';
  ctx.textBaseline='alphabetic';
  const fs=Math.round(7*SCALE*0.72);
  ctx.font='bold '+fs+'px Arial';
  for(const[k,p]of Object.entries(coords)){
    const v=vals[k];
    if(!v)continue;
    ctx.fillText(v,p.x*SCALE,(PH-p.y)*SCALE);
  }
}

function upd(){
  if(!pdfDoc)return;
  const v=collect();
  drawOv('ov1',C1,v);
  drawOv('ov2',C2,v);
}

async function gerarPDF(){
  const btn=document.getElementById('btn');
  btn.disabled=true;btn.textContent='Gerando...';
  document.getElementById('st').textContent='Gerando PDF...';
  try{
    const raw=atob(B64),buf=new Uint8Array(raw.length);
    for(let i=0;i<raw.length;i++)buf[i]=raw.charCodeAt(i);
    const doc=await PDFLib.PDFDocument.load(buf);
    const font=await doc.embedFont(PDFLib.StandardFonts.Helvetica);
    const col=PDFLib.rgb(0.04,0.16,0.43);
    const[p1,p2]=doc.getPages();
    const v=collect();
    const safe=s=>s.replace(/[\u0080-\uFFFF]/g,c=>{
      const m={'á':'a','â':'a','ã':'a','à':'a','é':'e','ê':'e','í':'i','ó':'o','ô':'o','ú':'u','ç':'c',
               'Á':'A','Â':'A','Ã':'A','É':'E','Ê':'E','Í':'I','Ó':'O','Ô':'O','Ú':'U','Ç':'C'};
      return m[c]||'?';
    }).replace(/[^\x20-\x7E]/g,'?');
    const draw=(pg,pos,val)=>{
      if(!val)return;
      try{pg.drawText(safe(val),{x:pos.x,y:pos.y,size:7,font,color:col});}catch(e){}
    };
    for(const[k,p]of Object.entries(C1))draw(p1,p,v[k]||'');
    for(const[k,p]of Object.entries(C2))draw(p2,p,v[k]||'');
    const bytes=await doc.save();
    const blob=new Blob([bytes],{type:'application/pdf'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download='SINAN_Violencia_Preenchida.pdf';a.click();
    URL.revokeObjectURL(url);
    document.getElementById('st').textContent='PDF gerado com sucesso!';
  }catch(err){
    document.getElementById('st').textContent='Erro: '+err.message;
    console.error(err);
  }
  btn.disabled=false;btn.textContent='\\uD83D\\uDCC4 Gerar Ficha PDF';
}

function tog(hd){
  const bd=hd.nextElementSibling;
  const arr=hd.querySelector('span:last-child');
  const op=bd.classList.toggle('op');
  arr.innerHTML=op?'&#9660;':'&#9658;';
}

window.addEventListener('load',()=>{
  initPDF().catch(e=>{
    document.getElementById('st').textContent='Erro ao carregar PDF: '+e.message;
    console.error(e);
  });
});
</script>
</body>
</html>"""

# Replace the placeholder with actual base64
HTML = HTML.replace('PDFB64PLACEHOLDER', B64)

with open('C:/assistente_sinan/sinan_violencia.html', 'w', encoding='utf-8') as f:
    f.write(HTML)

print(f"Done! Written {len(HTML)} chars")
print(f"B64 in HTML: {'PDFB64PLACEHOLDER' not in HTML}")
print(f"B64 check: {B64[:20] in HTML}")
