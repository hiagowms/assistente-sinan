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
      // campos hidden conectados a pill group — precisam de change para sincronizar visual
      if(document.querySelector('.pills[data-hidden="'+id+'"]')) el.dispatchEvent(new Event('change',{bubbles:true}));
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

/*==========================================================
  MÁSCARAS DE INPUT
==========================================================*/
(function(){
  function applyMaskOnInput(el, maskFn){
    el.addEventListener('input', function(){
      var pos = this.selectionStart;
      var raw = this.value.replace(/\D/g,'');
      var masked = maskFn(raw);
      var diff = masked.length - this.value.length;
      this.value = masked;
      try{ this.setSelectionRange(pos+diff, pos+diff); }catch(e){}
    });
  }

  // CEP: 00000-000
  var cepEl = document.getElementById('f_cep');
  if(cepEl) applyMaskOnInput(cepEl, function(r){
    r = r.slice(0,8);
    if(r.length > 5) r = r.slice(0,5) + '-' + r.slice(5);
    return r;
  });

  // Telefones: (00) 00000-0000
  function maskTel(r){
    r = r.slice(0,11);
    if(r.length === 0) return r;
    if(r.length <= 2)  return '(' + r;
    if(r.length <= 7)  return '(' + r.slice(0,2) + ') ' + r.slice(2);
    if(r.length <= 11) return '(' + r.slice(0,2) + ') ' + r.slice(2,7) + '-' + r.slice(7);
    return r;
  }
  ['f_tel_res','f_emp_tel','f_acompanhante_tel'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) applyMaskOnInput(el, maskTel);
  });

  // CNS (Cartão Nacional de Saúde): somente dígitos, máx 15
  var cnsEl = document.getElementById('f_sus');
  if(cnsEl){
    cnsEl.addEventListener('input', function(){
      this.value = this.value.replace(/\D/g,'').slice(0,15);
    });
    cnsEl.addEventListener('blur', function(){
      var v = this.value.replace(/\D/g,'');
      if(!v) return;
      var hint = document.getElementById('f_sus_cns_hint');
      if(!hint){
        hint = document.createElement('span');
        hint.id = 'f_sus_cns_hint';
        hint.style.cssText = 'font-size:11px;margin-top:3px;display:block;font-weight:600';
        this.parentNode.appendChild(hint);
      }
      if(v.length !== 15){
        hint.textContent = '⚠ CNS deve ter 15 dígitos';
        hint.style.color = '#b45309';
      } else if(_validarCNS(v)){
        hint.textContent = '✓ CNS válido';
        hint.style.color = '#16a34a';
      } else {
        hint.textContent = '⚠ CNS inválido — verifique os dígitos';
        hint.style.color = '#b45309';
      }
    });
    cnsEl.addEventListener('input', function(){
      var hint = document.getElementById('f_sus_cns_hint');
      if(hint && !this.value) hint.textContent = '';
    });
  }
})();

function _validarCNS(cns){
  cns = cns.replace(/\D/g,'');
  if(cns.length !== 15) return false;
  var p = parseInt(cns[0]);
  if(p >= 1 && p <= 2){
    var pis = cns.substring(0,11);
    var soma = 0;
    for(var i=0;i<11;i++) soma += parseInt(pis[i])*(15-i);
    var dsc = soma % 11;
    var expected;
    if(dsc !== 0){
      var resto = 11 - dsc;
      if(resto >= 10){
        soma += 2; dsc = soma % 11;
        resto = dsc !== 0 ? 11 - dsc : 0;
        expected = pis + '001' + String(resto);
      } else {
        expected = pis + '000' + String(resto);
      }
    } else {
      expected = pis + '0000';
    }
    return expected === cns;
  } else if(p >= 7 && p <= 9){
    var soma2 = 0;
    for(var j=0;j<15;j++) soma2 += parseInt(cns[j])*(15-j);
    return soma2 % 11 === 0;
  }
  return false;
}

/*==========================================================
  GESTANTE — AUTO-SELEÇÃO "NÃO SE APLICA" AO ESCOLHER MASCULINO
==========================================================*/
(function(){
  document.querySelectorAll('input[name="sexo"]').forEach(function(inp){
    inp.addEventListener('change', function(){
      var gestHid = document.getElementById('f_gest');
      if(!gestHid) return;
      if(this.value === 'M'){
        gestHid.value = '6';
        gestHid.dispatchEvent(new Event('change',{bubbles:true}));
      } else if(gestHid.value === '6'){
        gestHid.value = '';
        gestHid.dispatchEvent(new Event('change',{bubbles:true}));
      }
    });
  });
})();

/*==========================================================
  BUSCA INVERSA DE CEP VIA VIACEP
==========================================================*/
(function(){
  var cepEl = document.getElementById('f_cep');
  if(!cepEl) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.title = 'Buscar CEP por logradouro';
  btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  btn.style.cssText = 'position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#6b7280;padding:4px;line-height:0;transition:color .15s';
  btn.addEventListener('mouseenter', function(){ this.style.color='#2563eb'; });
  btn.addEventListener('mouseleave', function(){ this.style.color='#6b7280'; });

  var wrap = cepEl.parentNode;
  if(wrap.style.position !== 'relative') wrap.style.position = 'relative';
  cepEl.style.paddingRight = '34px';
  wrap.appendChild(btn);

  // Dropdown de resultados
  var drop = document.createElement('div');
  drop.className = 'ac-drop';
  drop.id = 'f_cep-drop';
  wrap.appendChild(drop);

  btn.addEventListener('click', function(){
    var uf  = (document.getElementById('f_uf_res')  || {}).value || '';
    var mun = (document.getElementById('f_mun_res') || {}).value || '';
    var logr= (document.getElementById('f_logr_res')|| {}).value || '';
    if(!uf || !mun || !logr){
      showToast('Preencha UF, Município e Logradouro para buscar o CEP','t-warn',3500);
      return;
    }
    btn.innerHTML = '…';
    drop.classList.remove('show');
    fetch('https://viacep.com.br/ws/'+encodeURIComponent(uf)+'/'+encodeURIComponent(mun)+'/'+encodeURIComponent(logr)+'/json/')
      .then(function(r){ return r.json(); })
      .then(function(data){
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        if(!Array.isArray(data) || data.length === 0){
          showToast('Nenhum CEP encontrado para este endereço','t-warn',3500);
          return;
        }
        var items = data.slice(0,10);
        drop.innerHTML = items.map(function(d,i){
          return '<div class="ac-item" data-i="'+i+'">' +
            '<b>' + d.cep + '</b> — ' + (d.logradouro||logr) + ', ' + (d.bairro||'') +
            ' <span style="color:#9ca3af;font-size:11px">'+d.localidade+'/'+d.uf+'</span>' +
            '</div>';
        }).join('');
        drop.classList.add('show');
        drop.querySelectorAll('.ac-item').forEach(function(el, i){
          el.addEventListener('mousedown', function(e){
            e.preventDefault();
            var d = items[i];
            cepEl.value = d.cep;
            cepEl.dispatchEvent(new Event('input',{bubbles:true}));
            var bairroEl = document.getElementById('f_bairro_res');
            if(bairroEl && d.bairro){ bairroEl.value = d.bairro.toUpperCase(); bairroEl.dispatchEvent(new Event('input',{bubbles:true})); }
            drop.classList.remove('show');
            updateProgress();
          });
        });
      })
      .catch(function(){
        btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        showToast('Falha na consulta ao ViaCEP — verifique sua conexão','t-err',4000);
      });
  });

  document.addEventListener('click', function(e){
    if(!wrap.contains(e.target)) drop.classList.remove('show');
  });
})();

/*==========================================================
  AUTO-SAVE COM LOCALSTORAGE
==========================================================*/
(function(){
  var KEY = 'sinan_autosave_' + (window.FICHA_NOME || 'ficha');
  var _saveTimer = null;

  function _doSave(){
    try{
      var data = {ts: new Date().toISOString(), fields:{}, radios:{}, checks:{}};
      document.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]):not(#f-import), select, textarea')
        .forEach(function(el){ if(el.id && el.value!=='') data.fields[el.id]=el.value; });
      document.querySelectorAll('input[type="radio"]:checked')
        .forEach(function(inp){ data.radios[inp.name]=inp.value; });
      document.querySelectorAll('input[type="checkbox"]:checked')
        .forEach(function(inp){
          if(!data.checks[inp.name]) data.checks[inp.name]=[];
          data.checks[inp.name].push(inp.value);
        });
      localStorage.setItem(KEY, JSON.stringify(data));
    }catch(e){}
  }

  function _schedSave(){
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(_doSave, 500);
  }

  // Restaurar rascunho salvo ao carregar (pula se houver transferência pendente)
  (function _restore(){
    if(sessionStorage.getItem('sinan_transfer')) return;
    var raw;
    try{ raw = localStorage.getItem(KEY); }catch(e){ return; }
    if(!raw) return;
    try{
      var data = JSON.parse(raw);
      if(!data.fields && !data.radios) return;
      setTimeout(function(){
        Object.keys(data.fields||{}).forEach(function(id){ _setField(id, data.fields[id]); });
        Object.keys(data.radios||{}).forEach(function(name){ _setRadio(name, data.radios[name]); });
        Object.keys(data.checks||{}).forEach(function(name){ _setChecks(name, data.checks[name]); });
        if(typeof window._applyVisibility==='function') window._applyVisibility();
        (window.FICHA_TRANSFER_MUN_SUFS||[]).forEach(function(suf){
          var id='f_mun_'+suf;
          if(data.fields&&data.fields[id]){ var el=document.getElementById(id); if(el) el.value=data.fields[id]; }
        });
        document.querySelectorAll('.ac-drop').forEach(function(d){ d.innerHTML=''; d.classList.remove('show'); });
        updateProgress();
        showToast('📋 Rascunho restaurado automaticamente','t-ok',3000);
      }, 300);
    }catch(e){ try{localStorage.removeItem(KEY);}catch(_){} }
  })();

  // Monitorar mudanças
  document.querySelectorAll('input,select,textarea').forEach(function(el){
    el.addEventListener('input', _schedSave);
    el.addEventListener('change', _schedSave);
  });

  // Limpar ao gerar PDF
  var btnGerar = document.getElementById('btn-gerar');
  if(btnGerar) btnGerar.addEventListener('click', function(){
    try{ localStorage.removeItem(KEY); }catch(e){}
  }, true);
  var mobBtn = document.getElementById('mob-pdf-btn');
  if(mobBtn) mobBtn.addEventListener('click', function(){
    try{ localStorage.removeItem(KEY); }catch(e){}
  }, true);
})();

/*==========================================================
  ACESSIBILIDADE — NAVEGAÇÃO POR TECLADO NAS PILLS
==========================================================*/
(function(){
  document.querySelectorAll('.pill').forEach(function(lbl){
    if(!lbl.querySelector('input')) return;
    lbl.setAttribute('tabindex','0');
    lbl.setAttribute('role','button');
    lbl.addEventListener('keydown', function(e){
      if(e.key === ' ' || e.key === 'Enter'){
        e.preventDefault();
        lbl.click();
      }
    });
  });
})();

/*==========================================================
  SELEÇÃO EM MASSA (BATCH SELECTION)
==========================================================*/
(function(){
  // Encontra grupos de sublabel seguidos de grids com subgrupos Sim/Não
  var BATCH_VALUES = {
    'Sim':    '1',
    'Não':    '2',
    'Ignorado':'9'
  };
  var MIN_ITEMS = 3;

  document.querySelectorAll('.sublabel').forEach(function(sl){
    // Próximo sibling deve ser um grid de flds com pills Sim/Não
    var grid = sl.nextElementSibling;
    if(!grid) return;
    if(grid.tagName !== 'DIV') return;
    // Verificar se é um grid de subgrupos
    var subFlds = grid.querySelectorAll('.fld');
    if(subFlds.length < MIN_ITEMS) return;
    // Verificar se os flds contêm pills com Sim/Não
    var hasSim = grid.querySelector('[value="1"]');
    var hasNao = grid.querySelector('[value="2"]');
    if(!hasSim || !hasNao) return;
    var hasIgn = grid.querySelector('[value="9"]');

    // Determinar nome do grupo (todos os radios no grid devem ser diferentes)
    var names = new Set();
    grid.querySelectorAll('input[type="radio"]').forEach(function(inp){ names.add(inp.name); });
    if(names.size < MIN_ITEMS) return;

    // Criar barra de batch selection
    var bar = document.createElement('div');
    bar.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap';

    var lbl = document.createElement('span');
    lbl.style.cssText = 'font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.5px';
    lbl.textContent = 'Marcar todos:';
    bar.appendChild(lbl);

    var opts = [['Sim','1','#16a34a'],['Não','2','#dc2626']];
    if(hasIgn) opts.push(['Ignorado','9','#9ca3af']);

    opts.forEach(function(opt){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = opt[0];
      b.style.cssText = 'padding:3px 11px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid '+opt[2]+';color:'+opt[2]+';background:transparent;transition:all .15s';
      b.addEventListener('mouseenter', function(){ this.style.background=opt[2]; this.style.color='#fff'; });
      b.addEventListener('mouseleave', function(){ this.style.background='transparent'; this.style.color=opt[2]; });
      b.addEventListener('click', function(){
        names.forEach(function(name){
          _setRadio(name, opt[1]);
        });
        updateProgress();
      });
      bar.appendChild(b);
    });

    sl.insertAdjacentElement('afterend', bar);
    bar.insertAdjacentElement('afterend', grid);
  });
})();
