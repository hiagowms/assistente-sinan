create sequence DBSISNET.SQ_COSEQRECEBIMENTO;

create table DBSISNET.TB_CONTROLE_RECEBIMENTO (
CO_SEQ_RECEBIMENTO   NUMERIC(10)          not null 
      constraint NN_CONTROLERECEB_COSEQRECEB check (CO_SEQ_RECEBIMENTO IS NOT NULL),
CO_IDENTIFICACAO_REMETENTE VARCHAR(20)          null,
CO_SISTEMA_LOCAL     NUMERIC(8)           null,
DT_GERACAO           DATE                 null,
DT_RECEBIMENTO       DATE                 null,
NU_LOTE              VARCHAR(8)           null,
NO_USUARIO           VARCHAR(60)          null,
DS_EMAIL_RESP        VARCHAR(100)         null,
DS_OBSERVACAO        VARCHAR(255)         null,
DS_ARQUIVO           VARCHAR(255)         null,
DT_INI_PROC          DATE                 null,
DT_FIM_PROC          DATE                 null,
NU_TAMANHO_ARQ       NUMERIC(10)          null,
ST_PROCESSAMENTO     VARCHAR(1)           null,
DS_RETRANSMISSAO     VARCHAR(200)         null,
DT_RETRANSMISSAO     DATE		  null,
NU_TENTATIVA         NUMERIC(3)           null, 
constraint PK_CONTROLE_RECEBIMENTO primary key (CO_SEQ_RECEBIMENTO)
);

comment on table DBSISNET.TB_CONTROLE_RECEBIMENTO is
'Tabela de Controle da Sequência e Processamento dos Arquivos Recebidos.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.CO_SEQ_RECEBIMENTO is
'Código Sequencial do Recebimento.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.CO_IDENTIFICACAO_REMETENTE is
'Código da identificação de instalação do remetente.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.CO_SISTEMA_LOCAL is
'Código do sistema no SISNET';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DT_GERACAO is
'Data da Geração do Arquivo de Transferência.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DT_RECEBIMENTO is
'Data do Recebimento do Arquivo.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.NU_LOTE is
'Número de Identificação do Lote.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.NO_USUARIO is
'Nome do Usuário Responsável pelo Envio.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DS_EMAIL_RESP is
'Nome do Endereço de e-mail de envio de mensagem.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DS_OBSERVACAO is
'Descrição de Observações.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DS_ARQUIVO is
'Descrição do Arquivo Recebido.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DT_INI_PROC is
'Data do Início do Processamento.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DT_FIM_PROC is
'Data do Fim do Processamento.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.NU_TAMANHO_ARQ is
'Número do Tamanho do Arquivo.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.ST_PROCESSAMENTO is
'Status do recebimento;
0 - A PROCESSAR
2 - PROCESSADO
3 - ERRO';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DS_RETRANSMISSAO is
'Descrição do status da retransmissao dos lotes.';

comment on column DBSISNET.TB_CONTROLE_RECEBIMENTO.DT_RETRANSMISSAO is
'Data da retransmissao dos lotes.';


create table DBSISNET.TB_ERRO (
CO_RECEBIMENTO       NUMERIC(10)          not null 
      constraint NN_ERRO_CORECEBIMENTO check (CO_RECEBIMENTO IS NOT NULL),
NU_LINHA             NUMERIC(10)          not null 
      constraint NN_ERRO_NULINHA check (NU_LINHA IS NOT NULL),
DS_SQL               VARCHAR(4000)        null,
DS_ERRO              VARCHAR(255)         null,
constraint PK_ERRO primary key (CO_RECEBIMENTO, NU_LINHA)
);

comment on table DBSISNET.TB_ERRO is
'Tabela de Log de Ocorrência de Erros no Processamento.';

comment on column DBSISNET.TB_ERRO.CO_RECEBIMENTO is
'Código do Recebimento';

comment on column DBSISNET.TB_ERRO.NU_LINHA is
'Número da linha no Arquivo que houve o Erro.';

comment on column DBSISNET.TB_ERRO.DS_SQL is
'Descrição do Comando SQL que gerou o Erro.';

comment on column DBSISNET.TB_ERRO.DS_ERRO is
'Descrição do Erro Ocorrido.';

create table DBSISNET.TB_IDENTIFICACAO_REMETENTE (
CO_IDENTIFICACAO_REMETENTE VARCHAR(20)          not null 
      constraint NN_IDENTREMET_COIDENTIFICACAO check (CO_IDENTIFICACAO_REMETENTE IS NOT NULL),
CO_SISTEMA_LOCAL     NUMERIC(8)           not null 
      constraint NN_IDENTREMET_COSISTEMALOCAL check (CO_SISTEMA_LOCAL IS NOT NULL),
DS_IDENTIFICACAO_REMETENTE VARCHAR(100)         null,
constraint SYS_C002304 primary key (CO_IDENTIFICACAO_REMETENTE, CO_SISTEMA_LOCAL)
);

comment on table DBSISNET.TB_IDENTIFICACAO_REMETENTE is
'Tabela de Identificação do Remetente de Arquivo';

comment on column DBSISNET.TB_IDENTIFICACAO_REMETENTE.CO_IDENTIFICACAO_REMETENTE is
'Código da identificação de instalação do remetente.';

comment on column DBSISNET.TB_IDENTIFICACAO_REMETENTE.CO_SISTEMA_LOCAL is
'Código do sistema no SISNET';

comment on column DBSISNET.TB_IDENTIFICACAO_REMETENTE.DS_IDENTIFICACAO_REMETENTE is
'Descrição do remetente.';

create table DBSISNET.TB_SISTEMA_LOCAL (
CO_SEQ_SISTEMA_LOCAL NUMERIC(8)           not null 
      constraint NN_SISTEMALOCAL_COSEQSISTEMA check (CO_SEQ_SISTEMA_LOCAL IS NOT NULL),
SG_SISTEMA           VARCHAR(20)          null,
DS_SISTEMA           VARCHAR(100)         null,
DS_EMAIL_RESP_SISTEMA VARCHAR(60)          null,
NO_USUARIO_ORACLE    VARCHAR(30)          null,
NO_SENHA_ORACLE      VARCHAR(40)          null,
NO_VERSAO            VARCHAR(30)          null,
NO_INSTANCE          VARCHAR(30)          null,
CO_SISTEMA           NUMERIC(8)           null,
DS_ROLE_TOTAL	     VARCHAR(20)          null,
ST_PROCESSA_LOCAL    VARCHAR(1)           null,
DS_NIVEL_INSTALACAO  VARCHAR(20)          null,
DS_OWNER             VARCHAR(20)          null,
ds_email_retorno_local VARCHAR(60)	  NULL,
ds_servidor 	     VARCHAR(40)	  NULL,
st_recebe_local      VARCHAR(1)		  NULL,
ds_nivel_superior    VARCHAR(40)	  NULL,
ds_porta_nivel_superior VARCHAR(6)	  null,
co_configuracao 	VARCHAR(20)	  null,
constraint PK_SISTEMA_LOCAL primary key (CO_SEQ_SISTEMA_LOCAL)
);

comment on table DBSISNET.TB_SISTEMA_LOCAL is
'Tabela dos Sistemas que serão atendidos pelo SISNET, bem como algumas configurações específicas dos sistemas';

comment on column DBSISNET.TB_SISTEMA_LOCAL.CO_SEQ_SISTEMA_LOCAL is
'Código Sequencial do Sistema Local';

comment on column DBSISNET.TB_SISTEMA_LOCAL.SG_SISTEMA is
'Sigla do Sistema';

comment on column DBSISNET.TB_SISTEMA_LOCAL.DS_SISTEMA is
'Descrição do sistema';

comment on column DBSISNET.TB_SISTEMA_LOCAL.DS_EMAIL_RESP_SISTEMA is
'Nome do Endereço de E-mail do Responsável pelo Sistema, que  irá receber as confirmações de recebimento';

comment on column DBSISNET.TB_SISTEMA_LOCAL.NO_USUARIO_ORACLE is
'Nome do User do Sistema Destino no Oracle';

comment on column DBSISNET.TB_SISTEMA_LOCAL.NO_SENHA_ORACLE is
'Nome da Senha do Login do Sistema Destino no Oracle';

comment on column DBSISNET.TB_SISTEMA_LOCAL.NO_VERSAO is
'Nome das Versões do sistema que podem ser recebidas pela versão atual do SISNET - concatenadas por "|"';

comment on column DBSISNET.TB_SISTEMA_LOCAL.NO_INSTANCE is
'Nome da Instance de Conexão no Banco Oracle para o Sistema Destino.';

comment on column DBSISNET.TB_SISTEMA_LOCAL.CO_SISTEMA is
'Código do Sistema no Sistema de segurança (CSPU) para autenticação.';

comment on column DBSISNET.TB_SISTEMA_LOCAL.DS_ROLE_TOTAL is
'Nome da role de acesso total ao sistema';

comment on column DBSISNET.TB_SISTEMA_LOCAL.ST_PROCESSA_LOCAL is
'Indica se é para gravar ou não no banco local domínio';

comment on column DBSISNET.TB_SISTEMA_LOCAL.DS_NIVEL_INSTALACAO is
'Níveis dos lotes que podem ser recebidos';

comment on column DBSISNET.TB_SISTEMA_LOCAL.DS_OWNER is
'Owner das tabelas do sistema';

alter table DBSISNET.TB_CONTROLE_RECEBIMENTO
   add constraint FK_CONTROLERECEB_IDENTREMET foreign key (CO_IDENTIFICACAO_REMETENTE, CO_SISTEMA_LOCAL)
      references DBSISNET.TB_IDENTIFICACAO_REMETENTE (CO_IDENTIFICACAO_REMETENTE, CO_SISTEMA_LOCAL)
      on delete restrict on update restrict;

alter table DBSISNET.TB_ERRO
   add constraint FK_ERRO_CONTROLERECEBIMENTO foreign key (CO_RECEBIMENTO)
      references DBSISNET.TB_CONTROLE_RECEBIMENTO (CO_SEQ_RECEBIMENTO)
      on delete restrict on update restrict;

alter table DBSISNET.TB_IDENTIFICACAO_REMETENTE
   add constraint FK_IDENTREMETENTE_SISTEMALOCAL foreign key (CO_SISTEMA_LOCAL)
      references DBSISNET.TB_SISTEMA_LOCAL (CO_SEQ_SISTEMA_LOCAL)
      on delete restrict on update restrict;

alter table DBSISNET.TB_SISTEMA_LOCAL
   add constraint FK_SISTEMALOCAL_SISTEMA foreign key (CO_SISTEMA)
      references DBCSPU.TB_SISTEMA (CO_SEQ_SISTEMA)
      on delete restrict on update restrict;

