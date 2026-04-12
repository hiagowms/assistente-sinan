/*==========================================================
  shared.js — Infraestrutura compartilhada das fichas SINAN
  Requer que a ficha defina os seguintes globais ANTES de
  carregar este script:

  window.FICHA_NOME              — string (ex: 'pair')
  window.FICHA_PROG_CONFIG       — {ESS_IDS, ESS_GROUPS, STD_GROUPS,
                                     COND_GROUPS, PROG_EXCLUDE_IDS}
  window.FICHA_TRANSFER_FICHAS   — array [{id,label,sub,url,color}]
  window.FICHA_TRANSFER_SOURCE   — string (ex: 'pair')
  window.FICHA_UNIT_IDS          — array de IDs do cadeado
  window.FICHA_MUN_CONFIGS       — array [{suf, ibge, ufId?, munId?}]
  window.FICHA_UF_SELECTS        — array de IDs de <select> de UF
  window.FICHA_CID_INPUT_ID      — ID do input CID (opcional)
  window.FICHA_CID_HINT_ID       — ID do hint CID (opcional)
  window.FICHA_MOBILE_NUMERIC_IDS — array de IDs (inputmode=numeric)
  window.FICHA_MOBILE_TEL_IDS    — array de IDs (inputmode=tel)
  window.FICHA_TRANSFER_MUN_SUFS — array de sufixos mun a re-aplicar
  window.FICHA_HIDDEN_BOXES      — array de IDs de caixas a esconder no clear
  window.FAKE_PATIENTS           — array de pacientes fictícios
  window._applyVisibility()      — função da ficha (conditionals)
  window._onPostClearForm()      — hook opcional pós-clear
  window._onPostCarregarPaciente() — hook opcional pós-load
==========================================================*/

/*==========================================================
  CAPS LOCK + SEM ACENTO (todos inputs com data-caps)
==========================================================*/
document.querySelectorAll('input[data-caps]').forEach(function(inp){
  inp.addEventListener('input', function(){
    var pos = this.selectionStart;
    this.value = this.value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    try{ this.setSelectionRange(pos,pos); }catch(e){}
  });
});

/*==========================================================
  PILL TOGGLE
==========================================================*/
document.querySelectorAll('.pill').forEach(function(lbl){
  lbl.addEventListener('click', function(e){
    var inp = this.querySelector('input');
    if(!inp) return;
    e.preventDefault();
    if(inp.type === 'radio'){
      if(inp.checked){
        inp.checked = false;
        this.classList.remove('checked','checked-danger');
      } else {
        document.querySelectorAll('[name="'+inp.name+'"]').forEach(function(r){
          r.closest('.pill').classList.remove('checked','checked-danger');
        });
        inp.checked = true;
        this.classList.add('checked');
      }
    } else {
      inp.checked = !inp.checked;
      this.classList.toggle('checked', inp.checked);
    }
    inp.dispatchEvent(new Event('change',{bubbles:true}));
  });
});

/*==========================================================
  SYNC PILL GROUPS COM HIDDEN INPUTS
==========================================================*/
(function(){
  document.querySelectorAll('.pills[data-hidden]').forEach(function(grp){
    var hidId = grp.dataset.hidden;
    var hidEl = document.getElementById(hidId);
    if(!hidEl) return;
    // pill → hidden
    grp.querySelectorAll('.pill').forEach(function(p){
      p.addEventListener('click', function(){
        var radio = p.querySelector('input[type="radio"]');
        if(!radio) return;
        setTimeout(function(){
          hidEl.value = radio.checked ? radio.value : '';
          hidEl.dispatchEvent(new Event('change', {bubbles:true}));
        }, 0);
      });
    });
    // hidden → pill (quando _setField() seta o hidden)
    hidEl.addEventListener('change', function(){
      var val = hidEl.value;
      grp.querySelectorAll('.pill').forEach(function(p){
        var radio = p.querySelector('input[type="radio"]');
        var match = !!val && radio && radio.value === val;
        p.classList.toggle('checked', match);
        if(radio) radio.checked = match;
      });
    });
  });
})();

/*==========================================================
  SINAN DATA — UF SELECTS
==========================================================*/
(function(){
  var opts = '<option value="">— UF —</option>';
  (window.SINAN_UFS || []).forEach(function(u){
    opts += '<option value="' + u.sigla + '">' + u.sigla + '</option>';
  });
  (window.FICHA_UF_SELECTS || []).forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.innerHTML = opts;
  });
})();

/*==========================================================
  MOTOR GENÉRICO DE AUTOCOMPLETE
==========================================================*/
function acSetup(inputId, dropId, datafn, matchfn, labelFn, selectFn){
  var inp  = document.getElementById(inputId);
  var drop = document.getElementById(dropId);
  if(!inp || !drop) return;

  var _items = [], _active = -1;

  function render(items){
    _items = items; _active = -1;
    if(!items.length){ drop.innerHTML = ''; drop.classList.remove('show'); return; }
    drop.innerHTML = items.map(function(it, i){
      return '<div class="ac-item" data-i="' + i + '">' + labelFn(it) + '</div>';
    }).join('');
    drop.classList.add('show');
    drop.querySelectorAll('.ac-item').forEach(function(el, i){
      el.addEventListener('mousedown', function(e){
        e.preventDefault();
        selectFn(inp, _items[i]);
        drop.classList.remove('show');
        updateProgress();
      });
    });
  }

  inp.addEventListener('input', function(){
    var q = inp.value.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(q.length < 1){ drop.classList.remove('show'); return; }
    render(datafn().filter(function(d){ return matchfn(d, q); }).slice(0, 20));
  });

  inp.addEventListener('keydown', function(e){
    var els = drop.querySelectorAll('.ac-item');
    if(e.key === 'ArrowDown'){ e.preventDefault(); _active = Math.min(_active+1, els.length-1); }
    else if(e.key === 'ArrowUp'){ e.preventDefault(); _active = Math.max(_active-1, 0); }
    else if(e.key === 'Enter' && _active >= 0){ e.preventDefault(); selectFn(inp, _items[_active]); drop.classList.remove('show'); updateProgress(); return; }
    else if(e.key === 'Escape'){ drop.classList.remove('show'); return; }
    else { return; }
    els.forEach(function(el, i){ el.classList.toggle('focused', i === _active); });
  });

  inp.addEventListener('blur', function(){
    setTimeout(function(){ drop.classList.remove('show'); }, 160);
  });
}

/*==========================================================
  AUTOCOMPLETE DE MUNICÍPIO
  Configurado via window.FICHA_MUN_CONFIGS
==========================================================*/
(window.FICHA_MUN_CONFIGS || []).forEach(function(cfg){
  var ufId  = cfg.ufId  || ('f_uf_'  + cfg.suf);
  var munId = cfg.munId || ('f_mun_' + cfg.suf);
  acSetup(
    munId, munId + '-drop',
    function(){ return window.SINAN_MUNICIPIOS || []; },
    function(m, q){
      var n = m.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      return n.indexOf(q) === 0 || n.indexOf(' '+q) !== -1;
    },
    function(m){ return '<b>' + m.nome + '</b> <span style="color:#9ca3af;font-size:11px">' + m.uf + ' &mdash; ' + m.ibge + '</span>'; },
    function(inp, m){
      inp.value = m.nome;
      var ufEl = document.getElementById(ufId);
      if(ufEl) ufEl.value = m.uf;
      if(cfg.ibge){
        var ibgeEl = document.getElementById(cfg.ibge);
        if(ibgeEl) ibgeEl.value = m.ibge;
      }
    }
  );
  var ufEl = document.getElementById(ufId);
  if(ufEl) ufEl.addEventListener('change', function(){
    var munEl = document.getElementById(munId);
    if(munEl) munEl.value = '';
    if(cfg.ibge){ var ibgeEl = document.getElementById(cfg.ibge); if(ibgeEl) ibgeEl.value = ''; }
    var dr = document.getElementById(munId+'-drop');
    if(dr) dr.classList.remove('show');
    updateProgress();
  });
});

/*==========================================================
  AUTOCOMPLETE DE CID-10
  Configurado via window.FICHA_CID_INPUT_ID / FICHA_CID_HINT_ID
==========================================================*/
(function(){
  var cidId  = window.FICHA_CID_INPUT_ID;
  var hintId = window.FICHA_CID_HINT_ID;
  if(!cidId) return;

  function normCid(s){ return s.replace('.',''); }
  acSetup(
    cidId, cidId + '-drop',
    function(){ return window.SINAN_AGRAVOS || []; },
    function(a, q){
      var qn = normCid(q);
      var nome = a.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      return normCid(a.cid).indexOf(qn) === 0 || nome.indexOf(q) !== -1;
    },
    function(a){ return '<b>' + a.cid + '</b> &mdash; ' + a.nome; },
    function(inp, a){
      inp.value = a.cid;
      if(hintId){
        var hint = document.getElementById(hintId);
        if(hint){ hint.textContent = a.nome; hint.style.display = 'block'; }
      }
    }
  );
  var cidEl = document.getElementById(cidId);
  if(cidEl && hintId) cidEl.addEventListener('input', function(){
    if(!this.value.trim()){
      var h = document.getElementById(hintId);
      if(h){ h.style.display='none'; h.textContent=''; }
    }
  });
})();

/*==========================================================
  AUTOCOMPLETE DE CNAE
  Exposto como window.cnaeSetup para fichas que precisam
==========================================================*/
function normCnae(s){ return (s||'').replace(/[.\-]/g,''); }

window.cnaeSetup = function(inputId, hintId){
  acSetup(
    inputId, inputId+'-drop',
    function(){ return window.SINAN_CNAES || []; },
    function(c, q){
      var qn = normCnae(q);
      var nome = c.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      return normCnae(c.codigo).indexOf(qn) === 0 || nome.indexOf(q) !== -1;
    },
    function(c){ return '<b>'+c.codigo+'</b> &mdash; '+c.nome; },
    function(inp, c){
      inp.value = c.codigo;
      var hint = document.getElementById(hintId);
      if(hint){ hint.textContent = c.nome; hint.style.display = 'block'; }
    }
  );
  var el = document.getElementById(inputId);
  if(el) el.addEventListener('input', function(){
    if(!this.value.trim()){
      var h = document.getElementById(hintId);
      if(h){ h.style.display='none'; h.textContent=''; }
    }
  });
};

// Auto-inicializar CNAE se a ficha definiu FICHA_CNAE_INPUT_ID
if(window.FICHA_CNAE_INPUT_ID){
  window.cnaeSetup(window.FICHA_CNAE_INPUT_ID, window.FICHA_CNAE_HINT_ID);
}

/*==========================================================
  AUTOCOMPLETE DE OCUPAÇÃO / CBO
==========================================================*/
var _cboRevSyn = null;
function buildCboRevSyn(){
  if(_cboRevSyn) return _cboRevSyn;
  _cboRevSyn = {};
  var map = window.cboSinonimosMap || {};
  Object.keys(map).forEach(function(code){
    (map[code]||[]).forEach(function(syn){
      var key = syn.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
      if(!_cboRevSyn[key]) _cboRevSyn[key] = [];
      _cboRevSyn[key].push({cboCode: code, synonymText: syn});
    });
  });
  return _cboRevSyn;
}

function searchCboSynonyms(q){
  var revMap = buildCboRevSyn();
  var cbos = window.SINAN_CBOS || [];
  var results = [];
  var seen = {};
  Object.keys(revMap).forEach(function(key){
    if(key.indexOf(q) === 0 || key.indexOf(' '+q) !== -1 || key.indexOf(q) !== -1){
      revMap[key].forEach(function(entry){
        if(seen[entry.cboCode]) return;
        seen[entry.cboCode] = true;
        var cboItem = cbos.find ? cbos.find(function(c){ return c.cbo === entry.cboCode; }) : null;
        if(!cboItem){ for(var i=0;i<cbos.length;i++){ if(cbos[i].cbo===entry.cboCode){cboItem=cbos[i];break;} } }
        if(cboItem){
          results.push({ cbo: cboItem.cbo, nome: cboItem.nome, synonymText: entry.synonymText, isSynonym: true });
        }
      });
    }
  });
  return results;
}

(function setupCboAutocomplete(){
  var ocEl   = document.getElementById('f_ocupacao');
  var ocDrop = document.getElementById('f_ocupacao-drop');
  if(!ocEl || !ocDrop) return;

  acSetup(
    'f_ocupacao', 'f_ocupacao-drop',
    function(){ return window.SINAN_CBOS || []; },
    function(c, q){
      var nome = c.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      return c.cbo.indexOf(q) === 0 || nome.indexOf(q) !== -1;
    },
    function(c){
      if(c.isSynonym){
        return '<span class="ac-synonym-badge" style="font-size:11px;background:#f39c12;color:#fff;padding:1px 6px;border-radius:4px;margin-right:4px">sinônimo</span><b>' + c.cbo + '</b> &mdash; ' + c.nome + ' <span style="color:#9ca3af;font-size:12px">(você digitou: ' + c.synonymText + ')</span>';
      }
      return '<b>' + c.cbo + '</b> &mdash; ' + c.nome;
    },
    function(inp, c){
      inp.value = c.nome;
      var hint = document.getElementById('f_ocupacao_hint');
      if(hint){
        var txt = 'CBO: ' + c.cbo;
        if(c.isSynonym) txt += ' · Inserido: nome oficial SINAN NET';
        hint.textContent = txt;
        hint.style.display = 'block';
      }
    }
  );

  // Adiciona busca de sinônimos ao dropdown
  ocEl.addEventListener('input', function(){
    var q = ocEl.value.trim().toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(q.length < 2) return;
    setTimeout(function(){
      var cbos = window.SINAN_CBOS || [];
      var directCount = cbos.filter(function(c){
        var nome = c.nome.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        return c.cbo.indexOf(q) === 0 || nome.indexOf(q) !== -1;
      }).length;
      var synonymResults = searchCboSynonyms(q).slice(0, 5);
      if(synonymResults.length === 0) return;
      var existingItems = ocDrop.querySelectorAll('.ac-item');
      if(existingItems.length === 0){
        var header = '<div style="padding:6px 14px;font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:.5px;background:#f9fafb;border-bottom:1px solid #f3f4f6">Sinônimos encontrados</div>';
        ocDrop.innerHTML = header + synonymResults.map(function(c, i){
          return '<div class="ac-item ac-synonym" data-i="syn-'+i+'">' +
            '<span style="font-size:11px;background:#f39c12;color:#fff;padding:1px 6px;border-radius:4px;margin-right:4px">sinônimo</span>' +
            '<b>' + c.cbo + '</b> &mdash; ' + c.nome +
            ' <span style="color:#9ca3af;font-size:12px">(você digitou: ' + c.synonymText + ')</span>' +
            '</div>';
        }).join('');
        ocDrop.classList.add('show');
        ocDrop.querySelectorAll('.ac-item').forEach(function(el, i){
          el.addEventListener('mousedown', function(e){
            e.preventDefault();
            var c = synonymResults[i];
            ocEl.value = c.nome;
            var hint = document.getElementById('f_ocupacao_hint');
            if(hint){ hint.textContent = 'CBO: ' + c.cbo + ' · Nome oficial SINAN NET'; hint.style.display = 'block'; }
            ocDrop.classList.remove('show');
            updateProgress();
          });
        });
      } else if(directCount < 8){
        var sepDiv = document.createElement('div');
        sepDiv.style.cssText = 'padding:4px 14px;font-size:11px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:.5px;background:#f9fafb;border-top:1px solid #f3f4f6;border-bottom:1px solid #f3f4f6';
        sepDiv.textContent = 'Sinônimos';
        ocDrop.appendChild(sepDiv);
        synonymResults.forEach(function(c){
          var el = document.createElement('div');
          el.className = 'ac-item ac-synonym';
          el.innerHTML = '<span style="font-size:11px;background:#f39c12;color:#fff;padding:1px 6px;border-radius:4px;margin-right:4px">sinônimo</span><b>' + c.cbo + '</b> &mdash; ' + c.nome + ' <span style="color:#9ca3af;font-size:12px">(você digitou: ' + c.synonymText + ')</span>';
          el.addEventListener('mousedown', function(e){
            e.preventDefault();
            ocEl.value = c.nome;
            var hint = document.getElementById('f_ocupacao_hint');
            if(hint){ hint.textContent = 'CBO: ' + c.cbo + ' · Nome oficial SINAN NET'; hint.style.display = 'block'; }
            ocDrop.classList.remove('show');
            updateProgress();
          });
          ocDrop.appendChild(el);
        });
        ocDrop.classList.add('show');
      }
    }, 0);
  });
})();

/*==========================================================
  AUTO-IDADE (calcula a partir da data de nascimento)
==========================================================*/
(function(){
  var nascEl = document.getElementById('f_nasc');
  if(!nascEl) return;
  nascEl.addEventListener('change', function(){
    var nasc = new Date(this.value + 'T00:00:00');
    if(isNaN(nasc)) return;
    var hoje = new Date();
    hoje.setHours(0,0,0,0);
    var diffMs = hoje - nasc;
    if(diffMs < 0) return;
    var diffDias = Math.floor(diffMs / 86400000);
    var idadeEl = document.getElementById('f_idade_val');
    var unEl    = document.getElementById('f_idade_un');
    if(!idadeEl || !unEl) return;
    if(diffDias < 29){
      idadeEl.value = diffDias;
      unEl.value = '2'; // Dia
    } else if(diffDias < 365){
      idadeEl.value = Math.floor(diffDias / 30.44);
      unEl.value = '3'; // Mês
    } else {
      idadeEl.value = Math.floor(diffDias / 365.25);
      unEl.value = '4'; // Ano
    }
    unEl.dispatchEvent(new Event('change', {bubbles:true}));
    updateProgress();
  });

  // Auto-selecionar Ano ao digitar manualmente no campo de idade sem unidade
  var idadeInp = document.getElementById('f_idade_val');
  if(idadeInp) idadeInp.addEventListener('input', function(){
    var unEl = document.getElementById('f_idade_un');
    if(unEl && !unEl.value && this.value){ unEl.value = '4'; unEl.dispatchEvent(new Event('change',{bubbles:true})); }
  });
})();

/*==========================================================
  MODALS
==========================================================*/
function closeModal(id){ document.getElementById(id).classList.remove('show'); }
document.querySelectorAll('.ov').forEach(function(ov){
  ov.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('show'); });
});

/*==========================================================
  TOAST
==========================================================*/
var _toastTimer = null;
function showToast(msg, type, dur){
  var t = document.getElementById('toast');
  clearTimeout(_toastTimer);
  t.textContent = msg;
  t.className = 'show '+(type||'');
  _toastTimer = setTimeout(function(){ t.className=''; }, dur||3000);
}

/*==========================================================
  PROGRESS + GAMIFICATION
==========================================================*/
var CIRCUMFERENCE = 2 * Math.PI * 29; // r=29
var _prevPct = -1;
var _sectionMilestones = {};
var _globalMilestones = {25:false,50:false,80:false,100:false};

var _pc = window.FICHA_PROG_CONFIG || {};
var ESS_IDS          = _pc.ESS_IDS          || {};
var ESS_GROUPS       = _pc.ESS_GROUPS        || [];
var STD_GROUPS       = _pc.STD_GROUPS        || [];
var COND_GROUPS      = _pc.COND_GROUPS       || {};
var PROG_EXCLUDE_IDS = _pc.PROG_EXCLUDE_IDS  || {};
var ESS_W = 8, STD_W = 1;

function isElemVisible(el){
  var node = el;
  while(node && node.className !== 'wrapper'){
    if(node.style && node.style.display === 'none') return false;
    node = node.parentElement;
  }
  return true;
}

function getPatientAgeYears(){
  var nascEl = document.getElementById('f_nasc');
  if(nascEl && nascEl.value){
    var nasc = new Date(nascEl.value + 'T00:00:00');
    if(!isNaN(nasc)){
      var today = new Date();
      var age = today.getFullYear() - nasc.getFullYear();
      var m = today.getMonth() - nasc.getMonth();
      if(m < 0 || (m === 0 && today.getDate() < nasc.getDate())) age--;
      return age;
    }
  }
  var valEl = document.getElementById('f_idade_val');
  var unEl  = document.getElementById('f_idade_un');
  if(valEl && valEl.value && unEl && (unEl.value === 'A' || unEl.value === '4')) return parseInt(valEl.value, 10);
  return null;
}

function groupHasCheck(name){
  return !!document.querySelector('[name="'+name+'"]:checked');
}

var STATUS_MSGS = [
  [0,'Pronto para iniciar ✏️'],[1,'Ótimo, começando!'],[10,'Continue assim! 💪'],
  [25,'25% — bom ritmo!'],[40,'Quase na metade!'],[50,'50% — na metade! 🔥'],
  [65,'Mais da metade! Quase lá!'],[79,'Faltam poucos campos essenciais!'],[90,'Finalizando...'],
  [99,'Último campo!'],[100,'🎉 Ficha completa!']
];
function getStatusMsg(pct){
  var msg = STATUS_MSGS[0][1];
  for(var i=0;i<STATUS_MSGS.length;i++){ if(pct>=STATUS_MSGS[i][0]) msg=STATUS_MSGS[i][1]; }
  return msg;
}

var COUNT_MSGS = [
  [0,  'Comece pelos campos marcados com ⭐ — são os mais importantes'],
  [1,  'Priorize os campos essenciais ⭐ para um registro de qualidade'],
  [26, 'Cada detalhe fortalece a vigilância epidemiológica'],
  [51, 'Você está construindo um registro de qualidade'],
  [80, 'Parabéns pelo cuidado — o registro está quase completo!'],
  [100,'Ficha exemplar — obrigado pelo compromisso com a saúde!']
];
function getCountMsg(pct){
  var msg = COUNT_MSGS[0][1];
  for(var i=0;i<COUNT_MSGS.length;i++){ if(pct>=COUNT_MSGS[i][0]) msg=COUNT_MSGS[i][1]; }
  return msg;
}

var PROG_LEVELS = [
  [0,  'Ficha Inicial',  '#9ca3af'],
  [26, 'Ficha Básica',   '#60a5fa'],
  [51, 'Ficha Útil',     '#2563eb'],
  [80, 'Padrão Ouro ✅', '#22c55e'],
  [100,'Diamante 💎',    '#d97706']
];
function getLevel(pct){
  var lv = PROG_LEVELS[0];
  for(var i=0;i<PROG_LEVELS.length;i++){ if(pct>=PROG_LEVELS[i][0]) lv=PROG_LEVELS[i]; }
  return lv;
}

function updateProgress(){
  var totalW = 0, filledW = 0;
  var essTotal = 0, essFilled = 0;

  Object.keys(ESS_IDS).forEach(function(id){
    var el = document.getElementById(id);
    if(!el) return;
    totalW += ESS_W; essTotal++;
    if(el.value && el.value.trim()){ filledW += ESS_W; essFilled++; }
  });

  ESS_GROUPS.forEach(function(name){
    totalW += ESS_W; essTotal++;
    if(groupHasCheck(name)){ filledW += ESS_W; essFilled++; }
  });

  var stdEls = Array.from(document.querySelectorAll('input:not([type=radio]):not([type=checkbox]):not([type=hidden]),select'));
  var _ageYrs = getPatientAgeYears();
  var _skipOcup = _ageYrs !== null && _ageYrs < 14;
  stdEls.forEach(function(el){
    if(PROG_EXCLUDE_IDS[el.id] || el.readOnly) return;
    if(ESS_IDS[el.id]) return;
    if(!isElemVisible(el)) return;
    if(el.id === 'f_ocupacao' && _skipOcup) return;
    totalW += STD_W;
    if(el.value && el.value.trim()) filledW += STD_W;
  });

  STD_GROUPS.forEach(function(name){
    var grpEl = document.querySelector('[name="'+name+'"]');
    if(!grpEl || !isElemVisible(grpEl)) return;
    totalW += STD_W;
    if(groupHasCheck(name)) filledW += STD_W;
  });

  Object.keys(COND_GROUPS).forEach(function(name){
    var cont = document.getElementById(COND_GROUPS[name]);
    if(!cont || cont.style.display === 'none') return;
    totalW += STD_W;
    if(groupHasCheck(name)) filledW += STD_W;
  });

  var pct = totalW > 0 ? Math.round(filledW/totalW*100) : 0;
  var level = getLevel(pct);

  // Progress bar strip
  var barFill = document.getElementById('prog-bar-fill');
  if(barFill){ barFill.style.width = pct+'%'; barFill.style.background = level[2]; }
  var barStrip = document.getElementById('prog-bar-strip');
  if(barStrip){ barStrip.style.background = pct>0?'rgba(0,0,0,.1)':'rgba(255,255,255,.08)'; }

  // Progress ring
  var ring = document.getElementById('prog-ring');
  if(ring){
    var offset = CIRCUMFERENCE - (pct/100)*CIRCUMFERENCE;
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = level[2];
  }
  var pctEl = document.getElementById('prog-pct');
  if(pctEl) pctEl.textContent = pct+'%';
  var statusEl = document.getElementById('prog-status');
  if(statusEl) statusEl.textContent = getStatusMsg(pct);
  var countEl = document.getElementById('prog-count');
  if(countEl) countEl.textContent = getCountMsg(pct);
  var levelEl = document.getElementById('prog-level');
  if(levelEl){ levelEl.textContent = level[1]; levelEl.style.color = level[2]; }

  // Mobile bar sync
  var mobPct = document.getElementById('mob-prog-pct');
  if(mobPct) mobPct.textContent = pct+'%';

  // Milestone toasts
  [25,50].forEach(function(m){
    if(pct>=m && !_globalMilestones[m]){
      _globalMilestones[m]=true;
      showToast(m===25?'🎯 25% preenchido — ótimo começo!':'🔥 Metade concluída! Continue assim!','t-mile',3800);
    }
  });
  if(pct>=80 && !_globalMilestones[80]){
    _globalMilestones[80]=true;
    showToast('🏆 Padrão Ouro! Todos os campos essenciais preenchidos!','t-ok',4500);
  }
  if(pct===100 && !_globalMilestones[100]){
    _globalMilestones[100]=true;
    showToast('Ficha completa! Preenchimento 100%.','t-ok',4500);
  }
  if(pct<80) _globalMilestones[80]=false;
  if(pct<100) _globalMilestones[100]=false;

  updateSectionBadges();
  _prevPct = pct;
}

function updateSectionBadges(){
  for(var s=1; document.getElementById('sec'+s); s++){
    var secEl = document.getElementById('sec'+s);
    var badge = document.getElementById('badge'+s);
    if(!badge) continue;

    var essFlds = secEl.querySelectorAll('[data-ess]');
    var essFilled=0;
    essFlds.forEach(function(el){ if(el.value&&el.value.trim()) essFilled++; });

    var allInSec = Array.from(secEl.querySelectorAll('input:not([type=radio]):not([type=checkbox]):not([type=hidden]),select'))
      .filter(function(el){ return !PROG_EXCLUDE_IDS[el.id] && !el.readOnly && isElemVisible(el); });
    var allFilled=0;
    allInSec.forEach(function(el){ if(el.value&&el.value.trim()) allFilled++; });
    var allTotal = allInSec.length;

    if(allTotal===0){
      badge.textContent = '—';
      badge.className = 'sec-badge badge-empty';
      secEl.classList.remove('done','partial');
      continue;
    }

    var essDone = essFlds.length===0 || essFilled===essFlds.length;
    var allDone = allFilled===allTotal;

    if(allDone){
      badge.textContent = '✓ Completo';
      badge.className = 'sec-badge badge-done';
      if(!_sectionMilestones[s]){
        _sectionMilestones[s]=true;
        showToast('✅ Seção '+s+' totalmente preenchida!', 't-ok', 2500);
      }
      secEl.classList.remove('partial');
      secEl.classList.add('done');
    } else if(essDone && allFilled>0){
      badge.textContent = '⭐ Essenciais OK';
      badge.className = 'sec-badge badge-done';
      if(!_sectionMilestones[s]){
        _sectionMilestones[s]=true;
        showToast('⭐ Seção '+s+' — campos essenciais preenchidos!', 't-ok', 2500);
      }
      secEl.classList.remove('partial');
      secEl.classList.add('done');
    } else if(allFilled>0){
      badge.textContent = 'Em andamento';
      badge.className = 'sec-badge badge-partial';
      _sectionMilestones[s]=false;
      secEl.classList.remove('done');
      secEl.classList.add('partial');
    } else {
      badge.textContent = '—';
      badge.className = 'sec-badge badge-empty';
      _sectionMilestones[s]=false;
      secEl.classList.remove('done','partial');
    }
  }
}

document.querySelectorAll('input,select,textarea').forEach(function(el){
  el.addEventListener('input', updateProgress);
  el.addEventListener('change', updateProgress);
});
updateProgress();

/*==========================================================
  VALIDAÇÃO — campos essenciais
==========================================================*/
function getMissingEssentials(){
  var missing = [];
  document.querySelectorAll('[data-ess]').forEach(function(el){
    if(!el.value||!el.value.trim()){
      el.classList.add('error');
      missing.push(el.dataset.label||el.id);
    } else {
      el.classList.remove('error');
    }
  });
  var groupLabels = _pc.ESS_GROUP_LABELS || {};
  ESS_GROUPS.forEach(function(name){
    if(!groupHasCheck(name)) missing.push(groupLabels[name]||name);
  });
  return missing;
}

/*==========================================================
  HELPERS
==========================================================*/
function getRadio(name){
  var el=document.querySelector('[name="'+name+'"]:checked');
  return el?el.value:'';
}
function getChecks(name){
  var v=[];
  document.querySelectorAll('[name="'+name+'"]:checked').forEach(function(c){v.push(c.value);});
  return v;
}
function fmtDate(val){
  if(!val) return '';
  var p=val.split('-');
  return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:val;
}
function tv(id){ return (document.getElementById(id)||{}).value||''; }

/*==========================================================
  MENU DE PACIENTES FICTÍCIOS
==========================================================*/
(function(){
  var patients = window.FAKE_PATIENTS || [];
  var listHtml = patients.map(function(p,i){
    return '<div class="tb-mi" onclick="carregarPaciente('+i+');closePacMenuAll()">' +
      '<span class="tb-mi-name">'+p.label+'</span>' +
      '<span class="tb-mi-sub">'+p.sub+'</span></div>';
  }).join('');

  var menu = document.getElementById('pac-menu');
  if(menu) menu.innerHTML = '<div class="tb-menu-hdr">Selecione um caso didático</div>' + listHtml;

  var mobList = document.getElementById('pac-mob-list');
  if(mobList) mobList.innerHTML = listHtml;
})();

function isMobile(){ return window.innerWidth <= 768; }

function togglePacMenu(e){
  if(e) e.stopPropagation();
  if(isMobile()){
    openPacSheet();
  } else {
    document.getElementById('pac-menu').classList.toggle('open');
  }
}

function openPacSheet(){
  document.getElementById('pac-mob-sheet').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePacSheet(){
  document.getElementById('pac-mob-sheet').classList.remove('show');
  document.body.style.overflow = '';
}

function closePacMenuAll(){
  document.getElementById('pac-menu').classList.remove('open');
  closePacSheet();
}

document.addEventListener('click', function(){ document.getElementById('pac-menu').classList.remove('open'); });

/*==========================================================
  HELPERS DE CAMPO
==========================================================*/
function _setField(id, val){
  var el = document.getElementById(id);
  if(!el || val === undefined || val === null || val === '') return;
  el.value = val;
  el.dispatchEvent(new Event('input',{bubbles:true}));
  el.dispatchEvent(new Event('change',{bubbles:true}));
}

function _setRadio(name, val){
  var inp = document.querySelector('input[name="'+name+'"][value="'+val+'"]');
  if(!inp) return;
  inp.closest('.pill').click();
  inp.dispatchEvent(new Event('change',{bubbles:true}));
}

function _setChecks(name, vals){
  document.querySelectorAll('input[name="'+name+'"]:checked').forEach(function(inp){
    inp.closest('.pill').click();
  });
  (vals||[]).forEach(function(v){
    var inp = document.querySelector('input[name="'+name+'"][value="'+v+'"]');
    if(inp && !inp.checked){ inp.closest('.pill').click(); inp.dispatchEvent(new Event('change',{bubbles:true})); }
  });
}

/*==========================================================
  NOVA FICHA — limpar formulário
==========================================================*/
function _clearForm(){
  document.querySelectorAll('.pill input:checked').forEach(function(inp){ inp.closest('.pill').click(); });
  document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]):not(#f-import):not([readonly]), select, textarea')
    .forEach(function(el){ el.value=''; });
  (window.FICHA_HIDDEN_BOXES || []).forEach(function(id){
    var el=document.getElementById(id); if(el) el.style.display='none';
  });
  if(typeof window._onPostClearForm === 'function') window._onPostClearForm();
  updateProgress();
}

function abrirModalNova(){ document.getElementById('confirm-modal').classList.add('show'); }
function fecharModalNova(){ document.getElementById('confirm-modal').classList.remove('show'); }
function novaFichaConfirmado(){ fecharModalNova(); _clearForm(); }

/*==========================================================
  CARREGAR PACIENTE FICTÍCIO
==========================================================*/
function carregarPaciente(idx){
  var p = (window.FAKE_PATIENTS||[])[idx]; if(!p) return;
  _clearForm();
  Object.keys(p.fields||{}).forEach(function(id){ _setField(id, p.fields[id]); });
  Object.keys(p.radios||{}).forEach(function(name){ _setRadio(name, p.radios[name]); });
  Object.keys(p.checks||{}).forEach(function(name){ _setChecks(name, p.checks[name]); });
  if(typeof window._applyVisibility === 'function') window._applyVisibility();
  // Re-aplica nomes de município (handler de change da UF apaga o mun)
  (window.FICHA_TRANSFER_MUN_SUFS || []).forEach(function(suf){
    var id = 'f_mun_' + suf;
    if(p.fields && p.fields[id]){
      var el = document.getElementById(id);
      if(el) el.value = p.fields[id];
    }
  });
  document.querySelectorAll('.ac-drop').forEach(function(d){ d.innerHTML=''; d.classList.remove('show'); });
  updateProgress();
  if(typeof window._onPostCarregarPaciente === 'function') window._onPostCarregarPaciente(p);
  window.scrollTo({top:0, behavior:'smooth'});
  showToast('Paciente fictício carregado: '+p.label,'t-ok',3500);
}

/*==========================================================
  EXPORTAR RASCUNHO
==========================================================*/
function exportarRascunho(){
  var data = {v:1, ts:new Date().toISOString(), fields:{}, radios:{}, checks:{}};
  document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]):not(#f-import), select, textarea')
    .forEach(function(el){ if(el.id && el.value!=='') data.fields[el.id]=el.value; });
  document.querySelectorAll('input[type="radio"]:checked').forEach(function(inp){ data.radios[inp.name]=inp.value; });
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(inp){
    if(!data.checks[inp.name]) data.checks[inp.name]=[];
    data.checks[inp.name].push(inp.value);
  });
  var blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'rascunho-sinan-'+(window.FICHA_NOME||'ficha')+'-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  showToast('💾 Rascunho exportado com sucesso!','t-ok',3000);
}

/*==========================================================
  IMPORTAR RASCUNHO
==========================================================*/
function importarRascunho(input){
  var file = input.files[0]; if(!file) return;
  var reader = new FileReader();
  reader.onload = function(e){
    try{
      var data = JSON.parse(e.target.result);
      if(!data.fields && !data.radios && !data.checks) throw new Error('formato inválido');
      _clearForm();
      Object.keys(data.fields||{}).forEach(function(id){ _setField(id, data.fields[id]); });
      Object.keys(data.radios||{}).forEach(function(name){ _setRadio(name, data.radios[name]); });
      Object.keys(data.checks||{}).forEach(function(name){ _setChecks(name, data.checks[name]); });
      if(typeof window._applyVisibility === 'function') window._applyVisibility();
      updateProgress();
      showToast('📂 Rascunho importado com sucesso!','t-ok',3000);
    }catch(err){
      showToast('Arquivo inválido ou corrompido','t-err',4000);
    }
    input.value='';
  };
  reader.readAsText(file);
}

/*==========================================================
  TOOLTIP TOGGLE
==========================================================*/
function _tipClose(){
  document.querySelectorAll('.tip-wrap.open').forEach(function(w){
    w.classList.remove('open');
    w.querySelector('.tip-btn').classList.remove('open');
    var pop = w.querySelector('.tip-pop');
    if(pop){ pop.removeAttribute('style'); }
  });
}

function tipToggle(btn){
  var wrap = btn.closest('.tip-wrap');
  if(!wrap) return;
  var pop  = wrap.querySelector('.tip-pop');
  var isOpen = wrap.classList.contains('open');

  _tipClose();
  if(isOpen) return;

  wrap.classList.add('open');
  btn.classList.add('open');

  var rect = btn.getBoundingClientRect();
  var GAP  = 10;
  var MAX_W = Math.min(pop.dataset.wide ? 360 : 290, window.innerWidth - 24);

  pop.style.cssText = [
    'position:fixed',
    'width:' + MAX_W + 'px',
    'max-width:' + MAX_W + 'px',
    'display:block',
    'visibility:hidden',
    'bottom:auto',
    'left:0',
    'top:0',
    'transform:none'
  ].join(';');

  var popH = pop.offsetHeight;
  var popW = pop.offsetWidth || MAX_W;

  var left = rect.left + rect.width / 2 - popW / 2;
  left = Math.max(12, Math.min(left, window.innerWidth - popW - 12));

  var topAbove = rect.top - popH - GAP;
  var topBelow = rect.bottom + GAP;
  var top, arrowBelow;
  if(topAbove >= 8){
    top = topAbove;
    arrowBelow = true;
  } else {
    top = topBelow;
    arrowBelow = false;
  }

  pop.style.cssText = [
    'position:fixed',
    'width:' + MAX_W + 'px',
    'max-width:' + MAX_W + 'px',
    'top:' + Math.round(top) + 'px',
    'left:' + Math.round(left) + 'px',
    'bottom:auto',
    'transform:none',
    'visibility:visible',
    'display:block',
    '--tip-arrow-left:' + Math.round(rect.left + rect.width/2 - left) + 'px'
  ].join(';');

  pop.dataset.arrowBelow = arrowBelow ? '1' : '0';

  setTimeout(function(){
    function _close(ev){
      if(!wrap.contains(ev.target)){ _tipClose(); }
      document.removeEventListener('click',  _close);
      document.removeEventListener('touchstart', _close);
    }
    document.addEventListener('click',     _close);
    document.addEventListener('touchstart', _close);
  }, 10);
}

/*==========================================================
  TRANSFERÊNCIA PARA OUTRA FICHA
==========================================================*/
var _transferTarget = null;

function clickTransfer(){
  var btn = document.getElementById('btn-transfer');
  if(btn && btn.classList.contains('btn-disabled')){
    document.getElementById('ov-transfer-warn').classList.add('show');
  } else {
    abrirTransferencia();
  }
}

function abrirTransferencia(){
  _transferTarget = null;
  var okBtn = document.getElementById('btn-transfer-ok');
  okBtn.style.opacity = '.45'; okBtn.style.pointerEvents = 'none';
  var cont = document.getElementById('transfer-fichas');
  cont.innerHTML = (window.FICHA_TRANSFER_FICHAS || []).map(function(f){
    return '<div class="transfer-ficha-opt" data-id="'+f.id+'" onclick="selectTransfer(this,\''+f.id+'\')">'+
      '<span class="transfer-ficha-dot" style="background:'+f.color+'"></span>'+
      '<span><strong class="transfer-ficha-name">'+f.label+'</strong><span class="transfer-ficha-sub">'+f.sub+'</span></span>'+
      '</div>';
  }).join('');
  document.getElementById('ov-transfer').classList.add('show');
}

function selectTransfer(el, id){
  document.querySelectorAll('#transfer-fichas .transfer-ficha-opt').forEach(function(o){ o.classList.remove('selected'); });
  el.classList.add('selected');
  _transferTarget = id;
  var okBtn = document.getElementById('btn-transfer-ok');
  okBtn.style.opacity = '1'; okBtn.style.pointerEvents = '';
}

function confirmarTransferencia(){
  if(!_transferTarget) return;
  var ficha = (window.FICHA_TRANSFER_FICHAS||[]).filter(function(f){ return f.id===_transferTarget; })[0];
  if(!ficha) return;
  var source = window.FICHA_TRANSFER_SOURCE || window.FICHA_NOME || 'ficha';
  var payload = {source:source, ts:new Date().toISOString(), fields:{}, radios:{}, checks:{}};
  document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]):not(#f-import), select, textarea')
    .forEach(function(el){ if(el.id && el.value!=='') payload.fields[el.id]=el.value; });
  document.querySelectorAll('input[type="radio"]:checked').forEach(function(inp){ payload.radios[inp.name]=inp.value; });
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(function(inp){
    if(!payload.checks[inp.name]) payload.checks[inp.name]=[];
    payload.checks[inp.name].push(inp.value);
  });
  sessionStorage.setItem('sinan_transfer', JSON.stringify(payload));
  window.location.href = ficha.url;
}

/*==========================================================
  MOBILE SYNC
==========================================================*/
(function(){
  var btnGerar = document.getElementById('btn-gerar');
  var mobBtn   = document.getElementById('mob-pdf-btn');
  if(!mobBtn || !btnGerar) return;

  new MutationObserver(function(){
    setTimeout(function(){ if(btnGerar.disabled){ mobBtn.disabled = false; } }, 5000);
  }).observe(btnGerar, {attributes:true, attributeFilter:['disabled']});

  (window.FICHA_MOBILE_NUMERIC_IDS || []).forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.setAttribute('inputmode','numeric');
  });
  (window.FICHA_MOBILE_TEL_IDS || []).forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.setAttribute('inputmode','tel');
  });
})();

/*==========================================================
  SESSIONSSTORAGE TRANSFER IMPORT
==========================================================*/
(function(){
  var raw = sessionStorage.getItem('sinan_transfer');
  if(!raw) return;
  try {
    var data = JSON.parse(raw);
    sessionStorage.removeItem('sinan_transfer');
    setTimeout(function(){
      Object.keys(data.fields||{}).forEach(function(id){ _setField(id, data.fields[id]); });
      Object.keys(data.radios||{}).forEach(function(name){ _setRadio(name, data.radios[name]); });
      // Re-aplica nomes de município após disparo de change da UF
      (window.FICHA_TRANSFER_MUN_SUFS || []).forEach(function(suf){
        var id = 'f_mun_' + suf;
        if(data.fields && data.fields[id]){
          var el = document.getElementById(id);
          if(el) el.value = data.fields[id];
        }
      });
      document.querySelectorAll('.ac-drop').forEach(function(d){ d.innerHTML=''; d.classList.remove('show'); });
      if(typeof window._applyVisibility === 'function') window._applyVisibility();
      updateProgress();
      showToast('✓ Dados da ficha anterior transferidos!','t-ok',4000);
    }, 200);
  } catch(e){ sessionStorage.removeItem('sinan_transfer'); }
})();

/*==========================================================
  UNIDADE NOTIFICADORA — CADEADO PERSISTENTE
==========================================================*/
var UNIT_KEY = 'sinan_unidade';
var UNIT_IDS = window.FICHA_UNIT_IDS || [];

function _unitSetUI(locked){
  var g=document.getElementById('lock-grp-notif'); if(!g) return;
  if(locked){g.classList.add('locked');}else{g.classList.remove('locked');}
  var ht=g.querySelector('.lock-hint-txt');
  if(ht) ht.textContent=locked
    ?'\u2713 Unidade notificadora salva \u2014 n\u00e3o ser\u00e1 necess\u00e1rio preencher novamente neste computador. Clique no cadeado para editar.'
    :'Estes campos representam a unidade notificadora deste computador. Trave o cadeado para salvar e n\u00e3o precisar preencher novamente nas pr\u00f3ximas fichas.';
}

function toggleUnitLock(){
  var g=document.getElementById('lock-grp-notif'); if(!g) return;
  var warn=document.getElementById('lock-tipo-un-warn');
  if(g.classList.contains('locked')){
    _unitSetUI(false); localStorage.removeItem(UNIT_KEY);
    if(warn) warn.style.display='none';
  } else {
    var d={};
    UNIT_IDS.forEach(function(id){var el=document.getElementById(id);if(el)d[id]=el.value;});
    localStorage.setItem(UNIT_KEY,JSON.stringify(d));
    _unitSetUI(true);
    if(warn) warn.style.display='none';
    showToast('\uD83D\uDD12 Unidade notificadora salva neste computador','t-ok',3500);
  }
}

(function initUnitLock(){
  var raw=localStorage.getItem(UNIT_KEY); if(!raw) return;
  try{
    var d=JSON.parse(raw);
    UNIT_IDS.forEach(function(id){
      var el=document.getElementById(id); if(!el||d[id]===undefined) return;
      el.value=d[id];
      // f_tipo_un é hidden conectado a pill group — precisa de change para sincronizar visual
      if(id==='f_tipo_un') el.dispatchEvent(new Event('change',{bubbles:true}));
    });
    // Se tipo de unidade não foi salvo (dados vieram de outra ficha),
    // deixa desbloqueado e exibe aviso para o usuário preencher o campo extra.
    var tipoEl=document.getElementById('f_tipo_un');
    if(tipoEl){
      var tipoSalvo=d['f_tipo_un']&&d['f_tipo_un']!=='';
      if(!tipoSalvo){
        var warn=document.getElementById('lock-tipo-un-warn');
        if(warn) warn.style.display='flex';
      } else {
        setTimeout(function(){_unitSetUI(true);},80);
      }
    } else {
      setTimeout(function(){_unitSetUI(true);},80);
    }
  }catch(e){localStorage.removeItem(UNIT_KEY);}
})();
