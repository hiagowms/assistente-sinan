CREATE TABLE dbsinan.tb_unid_notificadora_externa
(
  co_seq_unid_notifica_externa numeric(10,0) NOT NULL, -- Chave primária da tabela obtida através da sequência: DBSINAN.SQ_UNDNOTEXT_COSQUNDNOTEXT
  tp_unid_notifica_externa numeric(1,0), -- Identifica o tipo da unidade notificadora externa:...
  co_unid_notifica_externa character varying(15), -- Código que identifica a unidade notificadora em seu orgão de origem.
  no_unid_notifica_externa character varying(255), -- Nome da unidade notificadora em seu orgão de origem.
  co_uf_ibge character varying(2), -- Código da UF relacionada a unidade notificadora externa.
  co_municipio_ibge character varying(6), -- Código do Município relacionado a unidade notificadora externa.
  CONSTRAINT pk_unidnotificadoraexterna PRIMARY KEY (co_seq_unid_notifica_externa)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE dbsinan.tb_unid_notificadora_externa OWNER TO postgres;
COMMENT ON COLUMN dbsinan.tb_unid_notificadora_externa.co_seq_unid_notifica_externa IS 'Chave primária da tabela obtida através da sequência: DBSINAN.SQ_UNDNOTEXT_COSQUNDNOTEXT';
COMMENT ON COLUMN dbsinan.tb_unid_notificadora_externa.tp_unid_notifica_externa IS 'Identifica o tipo da unidade notificadora externa:
1 - Unidade de Saúde
2 - Unidade de Assistência Social
3 - Estabelecimento de Ensino
4 - Conselho Tutelar
5 - Unidade de saúde Indígena
6 - Centro Especializado de atendimento à mulher
7 - Outros';
COMMENT ON COLUMN dbsinan.tb_unid_notificadora_externa.co_unid_notifica_externa IS 'Código que identifica a unidade notificadora em seu orgão de origem.';
COMMENT ON COLUMN dbsinan.tb_unid_notificadora_externa.no_unid_notifica_externa IS 'Nome da unidade notificadora em seu orgão de origem.';
COMMENT ON COLUMN dbsinan.tb_unid_notificadora_externa.co_uf_ibge IS 'Código da UF relacionada a unidade notificadora externa.';
COMMENT ON COLUMN dbsinan.tb_unid_notificadora_externa.co_municipio_ibge IS 'Código do Município relacionado a unidade notificadora externa.';
