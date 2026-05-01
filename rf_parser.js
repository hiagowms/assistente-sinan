/*==============================================================
  rf_parser.js — Receita Federal (extrator de Comprovante CNPJ)

  Parser genérico do "Comprovante de Inscrição e de Situação
  Cadastral" (REDESIM/RFB), reutilizável fora do SINAN.

  API pública (sempre disponível):
    window.RFParser.parse(text)        -> Object com todos os campos
    window.RFParser.LABELS             -> definições dos rótulos
    window.RFParser.helpers            -> { normalize, isEmptyMask,
                                            parseCnaeLine, parseCodDescLine }

  Integração SINAN (somente se #rf-panel existir na página):
    window.rfTogglePanel()             — abre/fecha painel
    window.rfExtrair()                 — extrai e preenche f_emp_*
    window.rfSelectCnaeSug(codigo,rf)  — handler do onclick das sugestões
    window.sinanCnaeVal()              — valor SINAN do CNAE (sem sufixo RF)

  Dependências esperadas no escopo global (somente para integração SINAN):
    - window.SINAN_CNAES, window.SINAN_MUNICIPIOS  (tabelas)
    - normCnae, _setField, showToast, updateProgress  (shared.js)

  IDs esperados no HTML da ficha (padrão DRT):
    rf-toggle-btn, rf-panel, rf-textarea,
    rf-cnae-warn, rf-cnae-warn-code, rf-cnae-warn-ramo, rf-cnae-sugs,
    f_emp_reg, f_emp_nome, f_emp_end, f_emp_num, f_emp_bairro,
    f_emp_dist, f_emp_uf, f_emp_mun, f_emp_ibge, f_emp_tel,
    f_emp_cnae, f_emp_cnae_hint
==============================================================*/
(function(global){
  'use strict';

  /* ============================================================
     1) PARSER GENÉRICO  (sem dependência de DOM)
     ============================================================ */

  // Cada label tem regex (linha exata, case-insensitive). `multi:true` indica
  // valores em múltiplas linhas (ex.: lista de CNAEs secundários).
  // `parser` define como interpretar a(s) linha(s) de valor.
  var LABELS = [
    { key:'numeroInscricao',         re:/^N[ÚU]MERO DE INSCRI[ÇC][ÃA]O$/i },
    { key:'dataAbertura',            re:/^DATA DE ABERTURA$/i },
    { key:'nomeEmpresarial',         re:/^NOME EMPRESARIAL$/i },
    { key:'nomeFantasia',            re:/^T[ÍI]TULO DO ESTABELECIMENTO\s*\(?\s*NOME DE FANTASIA\s*\)?\s*$/i },
    { key:'porte',                   re:/^PORTE$/i },
    { key:'cnaePrincipal',           re:/^C[ÓO]DIGO E DESCRI[ÇC][ÃA]O DA ATIVIDADE ECON[ÔO]MICA PRINCIPAL$/i, parser:'cnae' },
    { key:'cnaesSecundarios',        re:/^C[ÓO]DIGO E DESCRI[ÇC][ÃA]O DAS ATIVIDADES ECON[ÔO]MICAS SECUND[ÁA]RIAS$/i, multi:true, parser:'cnae' },
    { key:'naturezaJuridica',        re:/^C[ÓO]DIGO E DESCRI[ÇC][ÃA]O DA NATUREZA JUR[ÍI]DICA$/i, parser:'codDesc' },
    { key:'logradouro',              re:/^LOGRADOURO$/i },
    { key:'numero',                  re:/^N[ÚU]MERO$/i },
    { key:'complemento',             re:/^COMPLEMENTO$/i },
    { key:'cep',                     re:/^CEP$/i },
    { key:'bairro',                  re:/^BAIRRO[\/\\]DISTRITO$/i },
    { key:'municipio',               re:/^MUNIC[ÍI]PIO$/i },
    { key:'uf',                      re:/^UF$/i },
    { key:'email',                   re:/^ENDERE[ÇC]O ELETR[ÔO]NICO$/i },
    { key:'telefone',                re:/^TELEFONE$/i },
    { key:'efr',                     re:/^ENTE FEDERATIVO RESPONS[ÁA]VEL\s*\(?\s*EFR\s*\)?\s*$/i },
    { key:'situacaoCadastral',       re:/^SITUA[ÇC][ÃA]O CADASTRAL$/i },
    { key:'dataSituacaoCadastral',   re:/^DATA DA SITUA[ÇC][ÃA]O CADASTRAL$/i },
    { key:'motivoSituacaoCadastral', re:/^MOTIVO DE SITUA[ÇC][ÃA]O CADASTRAL$/i },
    { key:'situacaoEspecial',        re:/^SITUA[ÇC][ÃA]O ESPECIAL$/i },
    { key:'dataSituacaoEspecial',    re:/^DATA DA SITUA[ÇC][ÃA]O ESPECIAL$/i }
  ];

  function normalize(text){
    return String(text || '')
      .replace(/\r\n?/g,'\n')
      .replace(/ /g,' ')
      .split('\n')
      .map(function(l){ return l.replace(/[\t ]+/g,' ').trim(); });
  }

  function isEmptyMask(s){
    if(!s) return true;
    if(/^\*+$/.test(s)) return true;
    if(/^N[ãa]o informad[oa]$/i.test(s)) return true;
    return false;
  }

  function isLabelLine(s){
    for(var i = 0; i < LABELS.length; i++){
      if(LABELS[i].re.test(s)) return true;
    }
    // Linhas-âncora que não são labels mas marcam fronteira de bloco
    return /^MATRIZ$|^FILIAL$|^COMPROVANTE DE INSCRI[ÇC][ÃA]O/i.test(s);
  }

  function parseCnaeLine(s){
    var m = s.match(/^([\d]{2}\.[\d]{2}-[\d](?:-[\d]{2})?)\s*[-–]\s*(.+)$/);
    if(m) return { codigo: m[1].trim(), descricao: m[2].trim() };
    return { codigo: '', descricao: s };
  }

  function parseCodDescLine(s){
    var m = s.match(/^(\d{3}-\d)\s*[-–]\s*(.+)$/);
    if(m) return { codigo: m[1].trim(), descricao: m[2].trim() };
    return { codigo: '', descricao: s };
  }

  function findLabelIndex(line){
    for(var i = 0; i < LABELS.length; i++){
      if(LABELS[i].re.test(line)) return i;
    }
    return -1;
  }

  // Coleta valores de um label até a próxima linha-rótulo ou âncora
  function collectValues(lines, fromIdx){
    var vals = [];
    for(var k = fromIdx; k < lines.length; k++){
      var l = lines[k];
      if(!l) continue;
      if(isLabelLine(l)) break;
      vals.push(l);
    }
    return vals;
  }

  function applyParser(parserName, lineOrLines){
    if(parserName === 'cnae'){
      if(Array.isArray(lineOrLines)){
        return lineOrLines.map(parseCnaeLine);
      }
      return parseCnaeLine(lineOrLines);
    }
    if(parserName === 'codDesc'){
      if(Array.isArray(lineOrLines)){
        return lineOrLines.map(parseCodDescLine);
      }
      return parseCodDescLine(lineOrLines);
    }
    return Array.isArray(lineOrLines) ? lineOrLines : lineOrLines;
  }

  function parse(text){
    var raw = String(text || '');
    var lines = normalize(raw);
    var out = {};

    // 1) Caminhada linha-a-linha por rótulos
    for(var i = 0; i < lines.length; i++){
      var line = lines[i];
      if(!line) continue;

      var li = findLabelIndex(line);
      if(li < 0) continue;
      var def = LABELS[li];

      var vals = collectValues(lines, i + 1);
      // Filtra máscaras (********, "Não informada", vazios)
      var clean = vals.filter(function(v){ return !isEmptyMask(v); });

      if(def.multi){
        out[def.key] = clean.length
          ? (def.parser ? clean.map(function(v){ return applyParser(def.parser, v); }) : clean)
          : [];
      } else {
        var v = clean[0] || '';
        if(!v){ out[def.key] = def.parser === 'cnae' || def.parser === 'codDesc' ? null : ''; }
        else  { out[def.key] = def.parser ? applyParser(def.parser, v) : v; }
      }

      // Avança i para depois das linhas consumidas (vazias contam, mas não param)
      // Mantemos a varredura padrão para tolerar repetições do mesmo rótulo.
    }

    // 2) Pós-processamentos / normalizações

    // CNPJ + MATRIZ/FILIAL — detecta no texto bruto pela proximidade
    var mfM = raw.match(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})\s*\n\s*(MATRIZ|FILIAL)\b/i);
    if(mfM){
      out.cnpj = mfM[1];
      out.matrizFilial = mfM[2].toUpperCase();
    } else {
      var cnpjM = raw.match(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/);
      out.cnpj = cnpjM ? cnpjM[0]
              : (out.numeroInscricao && /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(out.numeroInscricao)
                  ? out.numeroInscricao : '');
      out.matrizFilial = out.matrizFilial || '';
    }

    // CEP — uniformiza formato 99999-999
    if(out.cep){
      var cepDigits = out.cep.replace(/\D/g,'');
      if(cepDigits.length === 8) out.cep = cepDigits.slice(0,5) + '-' + cepDigits.slice(5);
    }

    // UF — duas letras maiúsculas
    if(out.uf){
      var ufm = String(out.uf).toUpperCase().match(/[A-Z]{2}/);
      out.uf = ufm ? ufm[0] : '';
    }

    // Telefone — extrai padrão (xx) xxxx[-xxxx]
    if(out.telefone){
      var telM = out.telefone.match(/\(?\d{2}\)?\s*\d{4,5}[-\s]?\d{4}/);
      out.telefone = telM ? telM[0].replace(/\s+/g,' ').trim() : out.telefone;
    }

    // E-mail — caso a linha capturada contenha lixo, tenta isolar o e-mail
    if(out.email){
      var em = out.email.match(/[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}/i);
      out.email = em ? em[0] : '';
    }

    // Data de abertura — apenas DD/MM/AAAA
    if(out.dataAbertura){
      var dm = out.dataAbertura.match(/\d{2}\/\d{2}\/\d{4}/);
      out.dataAbertura = dm ? dm[0] : out.dataAbertura;
    }
    if(out.dataSituacaoCadastral){
      var dm2 = out.dataSituacaoCadastral.match(/\d{2}\/\d{2}\/\d{4}/);
      out.dataSituacaoCadastral = dm2 ? dm2[0] : '';
    }

    // 3) Estrutura agregada de endereço
    out.endereco = {
      logradouro:  out.logradouro  || '',
      numero:      out.numero      || '',
      complemento: out.complemento || '',
      cep:         out.cep         || '',
      bairro:      out.bairro      || '',
      municipio:   out.municipio   || '',
      uf:          out.uf          || ''
    };

    // 4) Aliases legados (compatibilidade com uso anterior no SINAN)
    out.razaoSocial   = out.nomeEmpresarial || '';
    var cp            = out.cnaePrincipal || {};
    out.cnaeCode      = cp && cp.codigo    ? cp.codigo    : '';
    out.ramoAtividade = cp && cp.descricao ? cp.descricao : '';

    return out;
  }

  global.RFParser = {
    parse:  parse,
    LABELS: LABELS,
    helpers:{
      normalize:        normalize,
      isEmptyMask:      isEmptyMask,
      parseCnaeLine:    parseCnaeLine,
      parseCodDescLine: parseCodDescLine
    }
  };

  /* ============================================================
     2) INTEGRAÇÃO SINAN  (somente se #rf-panel existir)
     ============================================================ */
  if(typeof document === 'undefined' || !document.getElementById('rf-panel')) return;

  function rfTogglePanel(){
    var panel = document.getElementById('rf-panel');
    var btn   = document.getElementById('rf-toggle-btn');
    var open  = panel.style.display === 'block';
    panel.style.display = open ? 'none' : 'block';
    btn.classList.toggle('active', !open);
  }

  function normCnaeRF(s){ return (s||'').replace(/[.\-\/\s]/g,''); }

  function rfFillCnae(sinanEntry, rfCode){
    var inp  = document.getElementById('f_emp_cnae');
    var hint = document.getElementById('f_emp_cnae_hint');
    var displayCode = rfCode || sinanEntry.codigo;
    if(inp){
      inp.value = displayCode;
      inp.dataset.sinanCnae = sinanEntry.codigo;
    }
    if(hint){
      var hintText = rfCode && rfCode !== sinanEntry.codigo
        ? rfCode + ' (RF) → SINAN: ' + sinanEntry.codigo + ' — ' + sinanEntry.nome
        : sinanEntry.nome;
      hint.textContent = hintText;
      hint.style.display = 'block';
    }
  }

  function rfMatchCnae(rfCode){
    if(!rfCode || !window.SINAN_CNAES || typeof normCnae !== 'function') return null;
    var normExt = normCnaeRF(rfCode);
    var found = window.SINAN_CNAES.find(function(c){ return normCnae(c.codigo) === normExt; });
    if(found) return found;
    found = window.SINAN_CNAES.find(function(c){
      var nc = normCnae(c.codigo);
      return nc.length < normExt.length && normExt.indexOf(nc) === 0;
    });
    return found || null;
  }

  function cnaeSemantic(query, topN){
    if(!window.SINAN_CNAES || !query) return [];
    var words = query.toUpperCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^A-Z0-9\s]/g,' ')
      .split(/\s+/).filter(function(w){ return w.length > 3; });
    if(!words.length) return [];
    var scored = window.SINAN_CNAES.map(function(c){
      var nome = c.nome.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      var sc = 0; words.forEach(function(w){ if(nome.indexOf(w) >= 0) sc++; });
      return {c:c, sc:sc};
    }).filter(function(x){ return x.sc > 0; });
    scored.sort(function(a,b){ return b.sc - a.sc; });
    return scored.slice(0, topN||3).map(function(x){ return x.c; });
  }

  function rfExtrair(){
    var text = document.getElementById('rf-textarea').value;
    if(!text.trim()){ showToast('Cole o texto da Receita Federal antes de extrair.','warn'); return; }
    var info = parse(text);
    var addr = info.endereco || {};

    if(info.cnpj)        _setField('f_emp_reg',  info.cnpj);
    if(info.razaoSocial) _setField('f_emp_nome', info.razaoSocial);

    // Endereço: junta logradouro + complemento (somente se complemento for útil)
    var logr  = addr.logradouro || '';
    var compl = addr.complemento || '';
    var fullLogr = compl ? (logr ? logr + ' ' + compl : compl) : logr;
    if(fullLogr) _setField('f_emp_end', fullLogr);

    if(addr.numero) _setField('f_emp_num', addr.numero);

    if(addr.bairro){
      _setField('f_emp_bairro', addr.bairro);
      _setField('f_emp_dist',   addr.bairro);
    }

    // UF antes do município
    if(addr.uf) _setField('f_emp_uf', addr.uf);

    if(addr.municipio){
      var munNorm = addr.municipio.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      var munFound = (window.SINAN_MUNICIPIOS||[]).find(function(m){
        return m.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'') === munNorm;
      });
      if(munFound){
        _setField('f_emp_mun', munFound.nome);
        var ibgeEl = document.getElementById('f_emp_ibge');
        if(ibgeEl){ ibgeEl.value = munFound.ibge; ibgeEl.dispatchEvent(new Event('change',{bubbles:true})); }
        if(!addr.uf){ var empUfEl = document.getElementById('f_emp_uf'); if(empUfEl) empUfEl.value = munFound.uf; }
      } else {
        _setField('f_emp_mun', addr.municipio);
      }
    }

    if(info.telefone) _setField('f_emp_tel', info.telefone);

    var cnaeOk = false;
    if(info.cnaeCode || info.ramoAtividade){
      var matched = rfMatchCnae(info.cnaeCode);
      if(matched){ rfFillCnae(matched, info.cnaeCode); cnaeOk = true; }
    }

    var warn = document.getElementById('rf-cnae-warn');
    if(!cnaeOk){
      if(warn){
        var warnCode = document.getElementById('rf-cnae-warn-code');
        var warnRamo = document.getElementById('rf-cnae-warn-ramo');
        if(warnCode) warnCode.textContent = info.cnaeCode || '(não identificado)';
        if(warnRamo) warnRamo.textContent = info.ramoAtividade ? ' — ' + info.ramoAtividade : '';
        var sug = cnaeSemantic(info.ramoAtividade || info.cnaeCode, 3);
        var rfCodeEsc = (info.cnaeCode || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
        var html = sug.map(function(c){
          return '<div class="rf-cnae-sug-item" onclick="rfSelectCnaeSug(\''+c.codigo.replace(/'/g,"\\'")+'\',\''+rfCodeEsc+'\')">'
               + '<span class="rf-cnae-sug-code">'+c.codigo+'</span>'
               + '<span class="rf-cnae-sug-name">'+c.nome+'</span></div>';
        }).join('');
        var sugEl = document.getElementById('rf-cnae-sugs');
        if(sugEl) sugEl.innerHTML = html;
        warn.style.display = 'block';
      }
      showToast('Demais campos preenchidos. Escolha o CNAE manualmente.','warn',4000);
    } else {
      if(warn) warn.style.display = 'none';
      showToast('Dados da empresa preenchidos com sucesso.','ok');
    }
    document.getElementById('rf-panel').style.display = 'none';
    document.getElementById('rf-toggle-btn').classList.remove('active');
    if(typeof updateProgress === 'function') updateProgress();
  }

  function rfSelectCnaeSug(codigo, rfCode){
    var found = (window.SINAN_CNAES||[]).find(function(c){ return c.codigo === codigo; });
    if(found) rfFillCnae(found, rfCode || found.codigo);
    var warn = document.getElementById('rf-cnae-warn');
    if(warn) warn.style.display = 'none';
    showToast('CNAE selecionado.','ok');
    if(typeof updateProgress === 'function') updateProgress();
  }

  function sinanCnaeVal(){
    var el = document.getElementById('f_emp_cnae');
    if(!el) return '';
    if(el.dataset && el.dataset.sinanCnae) return el.dataset.sinanCnae;
    return el.value.replace(/-\d{2}$/, '').trim();
  }

  // Ao digitar manualmente no CNAE: descarta mapeamento RF e esconde aviso
  var cnaeEl = document.getElementById('f_emp_cnae');
  if(cnaeEl) cnaeEl.addEventListener('input', function(){
    if(this.dataset) delete this.dataset.sinanCnae;
    if(this.value.trim()){
      var w = document.getElementById('rf-cnae-warn');
      if(w) w.style.display = 'none';
    }
  });

  // Exposição global (HTML usa onclick="rfExtrair()", "rfSelectCnaeSug(...)" etc.)
  global.rfTogglePanel   = rfTogglePanel;
  global.rfExtrair       = rfExtrair;
  global.rfSelectCnaeSug = rfSelectCnaeSug;
  global.sinanCnaeVal    = sinanCnaeVal;
})(typeof window !== 'undefined' ? window : globalThis);
