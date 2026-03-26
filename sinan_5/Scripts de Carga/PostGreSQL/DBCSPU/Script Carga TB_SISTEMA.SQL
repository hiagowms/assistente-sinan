INSERT INTO dbcspu.tb_sistema (co_seq_sistema, sg_sistema, no_sistema, ds_sistema, ds_url, nu_responsavel_operacao, tp_operacao_seguranca, dt_operacao_seguranca) VALUES (1,'SIM_LOCAL','Sistema de Informacao de Mortalidade', 
'Sistema de Informacao de Mortalidade',NULL,0,'I',NULL);

INSERT INTO dbcspu.tb_sistema (co_seq_sistema, sg_sistema, no_sistema, ds_sistema, ds_url, nu_responsavel_operacao, tp_operacao_seguranca, dt_operacao_seguranca) VALUES (2,'SINASC_LOCAL','Sistema de Informacao de Nascidos Vivos',
'Sistema de Informacao de Nascidos Vivos',NULL,0,'I',NULL);

INSERT INTO dbcspu.tb_sistema (co_seq_sistema, sg_sistema, no_sistema, ds_sistema, ds_url, nu_responsavel_operacao, tp_operacao_seguranca, dt_operacao_seguranca) VALUES (3,'SINAN_NET','Sistema de Informacao de Agravos de Notificacao',
'Sistema de Informacao de Agravos de Notificacao',0,NULL,'I',NULL);


INSERT INTO DBCSPU.TB_MODULO
(CO_SEQ_MODULO,CO_SISTEMA,SG_MODULO,DS_MODULO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(28,1,'SISNET','TRANSMISSAO DOS DADOS VIA SISNET',2,'I',NULL)
;




INSERT INTO DBCSPU.TB_FUNCAO
(CO_SEQ_FUNCAO,CO_MODULO,CO_SISTEMA,SG_FUNCAO,DS_FUNCAO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(30,28,1,'TRANSMITE','TRANSMISSAO DO SISNET',2,'I',NULL)
;




INSERT INTO DBCSPU.TB_GRUPO
(CO_SEQ_GRUPO,NO_GRUPO,ST_ATIVO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(6,'SIM - SISNET ','S',0,'I',NULL)
;




INSERT INTO DBCSPU.RL_FUNCAO_GRUPO_PERMISSAO
(CO_GRUPO,CO_FUNCAO,CO_MODULO,CO_SISTEMA,ST_SELECIONAR,ST_INCLUIR,ST_ALTERAR,ST_EXCLUIR,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(6,30,28,1,'S','S','S','S',2,'I',NULL)
;




INSERT INTO DBCSPU.TB_MODULO
(CO_SEQ_MODULO,CO_SISTEMA,SG_MODULO,DS_MODULO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(32,2,'SISNET','TRANSMISSAO DE DADOS PARA O SISNET',2,'I',NULL)
;




INSERT INTO DBCSPU.TB_FUNCAO
(CO_SEQ_FUNCAO,CO_MODULO,CO_SISTEMA,SG_FUNCAO,DS_FUNCAO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(34,32,2,'TRANSMITE','TRANSMISSAO',2,'I',NULL)
;




INSERT INTO DBCSPU.TB_GRUPO
(CO_SEQ_GRUPO,NO_GRUPO,ST_ATIVO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(21,'SINASC - SISNET','S',0,'I',NULL)
;




INSERT INTO DBCSPU.RL_FUNCAO_GRUPO_PERMISSAO
(CO_GRUPO,CO_FUNCAO,CO_MODULO,CO_SISTEMA,ST_SELECIONAR,ST_INCLUIR,ST_ALTERAR,ST_EXCLUIR,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(21,34,32,2,'S','S','S','S',2,'I',NULL)
;




INSERT INTO DBCSPU.TB_MODULO
(CO_SEQ_MODULO,CO_SISTEMA,SG_MODULO,DS_MODULO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(33,3,'SISNET','TRANSMISSAO DE DADOS PARA O SISNET',2,'I',NULL)
;


INSERT INTO DBCSPU.TB_FUNCAO
(CO_SEQ_FUNCAO,CO_MODULO,CO_SISTEMA,SG_FUNCAO,DS_FUNCAO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(35,33,3,'TRANSMITE','TRANSMISSAO DO SISNET',2,'I',NULL)
;


INSERT INTO DBCSPU.TB_GRUPO
(CO_SEQ_GRUPO,NO_GRUPO,ST_ATIVO,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(22,'SINAN_NET - SISNET','S',0,'I',NULL)
;


INSERT INTO DBCSPU.RL_FUNCAO_GRUPO_PERMISSAO
(CO_GRUPO,CO_FUNCAO,CO_MODULO,CO_SISTEMA,ST_SELECIONAR,ST_INCLUIR,ST_ALTERAR,ST_EXCLUIR,NU_RESPONSAVEL_OPERACAO,TP_OPERACAO_SEGURANCA,DT_OPERACAO_SEGURANCA)
VALUES
(22,35,33,3,'S','S','S','S',2,'I',NULL)
;


INSERT INTO dbcspu.tb_usuario ( co_seq_usuario, co_sistema, no_usuario, co_pais, co_estado, co_municipio, 
    co_regional, no_login, ds_senha, st_ativo ,st_expirado ,tp_operacao_seguranca,
    dt_operacao_seguranca, nu_responsavel_operacao, nu_cpf, st_usuario_uf, 
    st_sistema_responsavel) VALUES ( 1, 1, 'USUARIO - SISNET - SIM', NULL, NULL, NULL, NULL, 'SISnet', 
    'TtLiXyUmNx_p' , 'S' , NULL , 'S', NULL, NULL, NULL , NULL , NULL);


insert into dbcspu.rl_grupo_usuario (co_grupo, co_usuario, tp_operacao_seguranca, dt_operacao_seguranca,nu_responsavel_operacao)
      VALUES   ( 6, 1, 'I', NULL, NULL );



 

INSERT INTO dbcspu.tb_usuario ( co_seq_usuario, co_sistema, no_usuario, co_pais, co_estado, co_municipio, 
    co_regional, no_login, ds_senha, st_ativo ,st_expirado ,tp_operacao_seguranca,
    dt_operacao_seguranca, nu_responsavel_operacao, nu_cpf, st_usuario_uf, 
    st_sistema_responsavel) VALUES ( 2, 2, 'USUARIO - SISNET - SINASC', NULL, NULL, NULL, NULL, 'SISnet', 
    'TtLiXyUmNx_p' , 'S' , NULL , 'S',NULL, NULL, NULL , NULL , NULL);

 
insert into dbcspu.rl_grupo_usuario (co_grupo, co_usuario, tp_operacao_seguranca, dt_operacao_seguranca,nu_responsavel_operacao)
      VALUES   ( 21, 2, 'I', NULL, NULL );
      
      


INSERT INTO dbcspu.tb_usuario ( co_seq_usuario, co_sistema, no_usuario, co_pais, co_estado, co_municipio, 
    co_regional, no_login, ds_senha, st_ativo ,st_expirado ,tp_operacao_seguranca,
    dt_operacao_seguranca, nu_responsavel_operacao, nu_cpf, st_usuario_uf, 
    st_sistema_responsavel) VALUES ( 23, 3, 'USUARIO - SISNET - SINAN_NET', NULL, NULL, NULL, NULL, 'SISnet', 
    'TtLiXyUmNx_p' , 'S' , NULL , 'S', NULL, NULL, NULL , NULL , NULL);


insert into dbcspu.rl_grupo_usuario (co_grupo, co_usuario, tp_operacao_seguranca, dt_operacao_seguranca,nu_responsavel_operacao)
      VALUES   ( 22, 23, 'I', NULL, NULL );
      
      

INSERT INTO DBCSPU.RL_USUARIO_SISTEMA (CO_SISTEMA, CO_USUARIO) VALUES (1,1);
INSERT INTO DBCSPU.RL_USUARIO_SISTEMA (CO_SISTEMA, CO_USUARIO) VALUES (2,2);
INSERT INTO DBCSPU.RL_USUARIO_SISTEMA (CO_SISTEMA, CO_USUARIO) VALUES (3,23);
