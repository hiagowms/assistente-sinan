/*==============================================================*/
/* Sequence: SQ_COSEQLOGREGISTRO				*/
/*==============================================================*/

CREATE SEQUENCE dbsisnet.sq_coseqlogregistro;
GRANT ALL ON TABLE dbsisnet.sq_coseqlogregistro TO postgres;
GRANT ALL ON TABLE dbsisnet.sq_coseqlogregistro TO sisnetweb WITH GRANT OPTION;
GRANT ALL ON TABLE dbsisnet.sq_coseqlogregistro TO cspuweb WITH GRANT OPTION;


/*==============================================================*/
/* Table: TB_LOG_REGISTRO_PROCESSADO                            */
/*==============================================================*/
create table DBSISNET.TB_LOG_REGISTRO_PROCESSADO (
   CO_SEQ_LOG_REGISTRO  NUMERIC(10,0)        not null,
   CO_RECEBIMENTO       NUMERIC(10,0)        null,
   NO_TABELA            VARCHAR(100)         null,
   NU_TOTAL_REGISTRO   NUMERIC(10,0)        null,
   NU_REGISTRO_PROCESSADO NUMERIC(10,0)        null,
   NU_REGISTRO_NPROCESSADO NUMERIC(10,0)        null,
   constraint PK_TB_LOG_REGISTRO_PROCESSADO primary key (CO_SEQ_LOG_REGISTRO)
);

comment on table DBSISNET.TB_LOG_REGISTRO_PROCESSADO is
'Tabela de log dos registros processados de cada tabela.';

comment on column DBSISNET.TB_LOG_REGISTRO_PROCESSADO.CO_SEQ_LOG_REGISTRO is
'Código sequencial do log do registro.';

comment on column DBSISNET.TB_LOG_REGISTRO_PROCESSADO.CO_RECEBIMENTO is
'Código Sequencial do Recebimento.';

comment on column DBSISNET.TB_LOG_REGISTRO_PROCESSADO.NO_TABELA is
'Nome da tabela que teve registros processados.';

comment on column DBSISNET.TB_LOG_REGISTRO_PROCESSADO.NU_TOTAL_REGISTRO is
'Número da quantidade total de registros a serem processados por tabela.';

comment on column DBSISNET.TB_LOG_REGISTRO_PROCESSADO.NU_REGISTRO_PROCESSADO is
'Número de registros processados pelo Sisnet.';

comment on column DBSISNET.TB_LOG_REGISTRO_PROCESSADO.NU_REGISTRO_NPROCESSADO is
'Número de registros não processados pelo Sisnet.';

alter table DBSISNET.TB_LOG_REGISTRO_PROCESSADO
   add constraint FK_LOGREG_CONTROLERECEBIMENTO foreign key (CO_RECEBIMENTO)
      references DBSISNET.TB_CONTROLE_RECEBIMENTO (CO_SEQ_RECEBIMENTO)
      on delete restrict on update restrict;
