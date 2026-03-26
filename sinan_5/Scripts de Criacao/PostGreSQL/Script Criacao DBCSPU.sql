
create sequence dbcspu.seq_funcao;

create sequence dbcspu.seq_grupo;

create sequence dbcspu.seq_log;

create sequence dbcspu.seq_modulo;

create sequence dbcspu.seq_sistema;

create sequence dbcspu.seq_usuario;

/*==============================================================*/
/* Table: dbcspu.rl_funcao_grupo_permissao                             */
/*==============================================================*/
create table dbcspu.rl_funcao_grupo_permissao (
co_grupo             numeric(8)           not null 
      constraint nn_funcaogruppermissao_cogrupo check (co_grupo is not null),
co_funcao            numeric(8)           not null 
      constraint nn_funcaogruppermissao_cofunc check (co_funcao is not null),
co_modulo            numeric(8)           not null 
      constraint nn_funcaogruppermissao_comodul check (co_modulo is not null),
co_sistema           numeric(8)           not null 
      constraint nn_funcaogruppermissao_cosiste check (co_sistema is not null),
st_selecionar        varchar(1)           null,
st_incluir           varchar(1)           null,
st_alterar           varchar(1)           null,
st_excluir           varchar(1)           null,
tp_operacao_seguranca varchar(1)           null,
dt_operacao_seguranca date                 null,
nu_responsavel_operacao numeric(8)           null,
constraint pk_funcao_grupo_permissao primary key (co_grupo, co_funcao, co_modulo, co_sistema)
);

comment on table dbcspu.rl_funcao_grupo_permissao is
'Tabela de Permissões dos Grupos dos Sistemas';

comment on column dbcspu.rl_funcao_grupo_permissao.co_grupo is
'Código do Grupo';

comment on column dbcspu.rl_funcao_grupo_permissao.co_funcao is
'Código da Função';

comment on column dbcspu.rl_funcao_grupo_permissao.co_modulo is
'Código do Módulo';

comment on column dbcspu.rl_funcao_grupo_permissao.co_sistema is
'Código do Sistema';

comment on column dbcspu.rl_funcao_grupo_permissao.st_selecionar is
'Se possui permissão de Select';

comment on column dbcspu.rl_funcao_grupo_permissao.st_incluir is
'Se possui permissão de Inclusão';

comment on column dbcspu.rl_funcao_grupo_permissao.st_alterar is
'Se possui permissão de Alteração';

comment on column dbcspu.rl_funcao_grupo_permissao.st_excluir is
'Se possui permissão de Deleção';

comment on column dbcspu.rl_funcao_grupo_permissao.tp_operacao_seguranca is
'Tipo da Operação Executada (I - Inserção e U - Update)';

comment on column dbcspu.rl_funcao_grupo_permissao.dt_operacao_seguranca is
'Data da Operação Executada';

comment on column dbcspu.rl_funcao_grupo_permissao.nu_responsavel_operacao is
'Usuário que Executou a operação';

/*==============================================================*/
/* Table: dbcspu.rl_grupo_usuario                                      */
/*==============================================================*/
create table dbcspu.rl_grupo_usuario (
co_grupo             numeric(8)           not null 
      constraint nn_grupousuario_cogrupo check (co_grupo is not null),
co_usuario           numeric(8)           not null 
      constraint nn_grupousuario_usuario check (co_usuario is not null),
tp_operacao_seguranca varchar(1)           null,
dt_operacao_seguranca date                 null,
nu_responsavel_operacao numeric(8)           null,
constraint pk_grupo_usuario primary key (co_grupo, co_usuario)
);

comment on table dbcspu.rl_grupo_usuario is
'Tabela de Usuários de um Grupo';

comment on column dbcspu.rl_grupo_usuario.co_grupo is
'Código do Grupo';

comment on column dbcspu.rl_grupo_usuario.co_usuario is
'Código do Usuário';

comment on column dbcspu.rl_grupo_usuario.tp_operacao_seguranca is
'Tipo da Operação Executada (I - Inserção e U - Update)';

comment on column dbcspu.rl_grupo_usuario.dt_operacao_seguranca is
'Data da Operação Executada';

comment on column dbcspu.rl_grupo_usuario.nu_responsavel_operacao is
'Usuário que Executou a operação';

/*==============================================================*/
/* Index: fk_grupo                                              */
/*==============================================================*/
create  index fk_grupo on dbcspu.rl_grupo_usuario (
co_grupo
);

/*==============================================================*/
/* Index: fk_usuario                                            */
/*==============================================================*/
create  index fk_usuario on dbcspu.rl_grupo_usuario (
co_usuario
);

/*==============================================================*/
/* Table: dbcspu.rl_usuario_sistema                                    */
/*==============================================================*/
create table dbcspu.rl_usuario_sistema (
co_sistema           numeric(8)           not null 
      constraint nn_usuariosistema_cosistema check (co_sistema is not null),
co_usuario           numeric(8)           not null 
      constraint nn_usuariosistema_cousuario check (co_usuario is not null),
st_ativo             varchar(1),
constraint pk_usuario_sistema primary key (co_sistema, co_usuario)
);

comment on column dbcspu.rl_usuario_sistema.co_sistema is
'Código Sequencial do Sistema';

comment on column dbcspu.rl_usuario_sistema.co_usuario is
'Código Sequencial do Usuário';

/*==============================================================*/
/* Table: dbcspu.tb_funcao                                             */
/*==============================================================*/
create table dbcspu.tb_funcao (
co_seq_funcao        numeric(8)           not null 
      constraint nn_funcao_coseqfuncao check (co_seq_funcao is not null),
co_modulo            numeric(8)           not null 
      constraint nn_funcao_comodulo check (co_modulo is not null),
co_sistema           numeric(8)           not null 
      constraint nn_funcao_cosistema check (co_sistema is not null),
sg_funcao            varchar(20)          not null 
      constraint nn_funcao_sgfuncao check (sg_funcao is not null),
ds_funcao            varchar(300)         null,
tp_operacao_seguranca varchar(1)           null,
dt_operacao_seguranca date                 null,
nu_responsavel_operacao numeric(8)           null,
constraint pk_funcao primary key (co_seq_funcao, co_modulo, co_sistema)
);

comment on table dbcspu.tb_funcao is
'Tabela das Funções dos Módulos dos Sistemas';

comment on column dbcspu.tb_funcao.co_seq_funcao is
'Código Sequencial da Função';

comment on column dbcspu.tb_funcao.co_modulo is
'Código do Módulo';

comment on column dbcspu.tb_funcao.co_sistema is
'Código do Sistema';

comment on column dbcspu.tb_funcao.sg_funcao is
'Sigla da Função';

comment on column dbcspu.tb_funcao.ds_funcao is
'Descrição da Função';

comment on column dbcspu.tb_funcao.tp_operacao_seguranca is
'Tipo da Operação Executada (I - Inserção e U - Update)';

comment on column dbcspu.tb_funcao.dt_operacao_seguranca is
'Data da Operação Executada';

comment on column dbcspu.tb_funcao.nu_responsavel_operacao is
'Usuário que Executou a operação';

/*==============================================================*/
/* Table: dbcspu.tb_grupo                                              */
/*==============================================================*/
create table dbcspu.tb_grupo (
co_seq_grupo         numeric(8)           not null 
      constraint nn_grupo_coseqgrupo check (co_seq_grupo is not null),
no_grupo             varchar(50)          null,
st_ativo             varchar(1)           null,
tp_operacao_seguranca varchar(1)           null,
dt_operacao_seguranca date                 null,
nu_responsavel_operacao numeric(8)           null,
constraint pk_grupo primary key (co_seq_grupo)
);

comment on table dbcspu.tb_grupo is
'Tabela de Grupos';

comment on column dbcspu.tb_grupo.co_seq_grupo is
'Código Sequencial do Grupo';

comment on column dbcspu.tb_grupo.no_grupo is
'Nome do Grupo';

comment on column dbcspu.tb_grupo.st_ativo is
'Status do Grupo Ativo,  Sim ou Não';

comment on column dbcspu.tb_grupo.tp_operacao_seguranca is
'Tipo da Operação Executada (I - Inserção e U - Update)';

comment on column dbcspu.tb_grupo.dt_operacao_seguranca is
'Data da Operação Executada';

comment on column dbcspu.tb_grupo.nu_responsavel_operacao is
'Usuário que Executou a operação';


/*==============================================================*/
/* Table: dbcspu.tb_log                                                */
/*==============================================================*/
create table dbcspu.tb_log (
co_seq_log           numeric(8)           not null 
      constraint nn_log_coseqlog check (co_seq_log is not null),
co_usuario           numeric(8)           not null 
      constraint nn_log_cousuario check (co_usuario is not null),
co_sistema           numeric(8)           not null 
      constraint nn_log_cosistema check (co_sistema is not null),
no_tabela            varchar(100)         null,
tp_operacao          varchar(1)           null,
dt_operacao          date                 null,
ds_execucao          varchar(200)         null,
ds_host              varchar(50)          null,
constraint pk_log primary key (co_seq_log)
);

comment on table dbcspu.tb_log is
'Tabela para Armazenar os Logs de Ações dentro dos Sistemas.';

comment on column dbcspu.tb_log.co_seq_log is
'Código Sequencial do Log de Segurança';

comment on column dbcspu.tb_log.co_usuario is
'Código Sequencial do Usuario';

comment on column dbcspu.tb_log.co_sistema is
'Código Sequencial do Sistema';

comment on column dbcspu.tb_log.no_tabela is
'Nome da Tabela que sofreu a ação.';

comment on column dbcspu.tb_log.tp_operacao is
'Tipo da Ação';

comment on column dbcspu.tb_log.dt_operacao is
'Data da Ação';

comment on column dbcspu.tb_log.ds_execucao is
'Descrição da Execução';

comment on column dbcspu.tb_log.ds_host is
'Ip da Máquina que Executou a Ação';

/*==============================================================*/
/* Table: dbcspu.tb_modulo                                             */
/*==============================================================*/
create table dbcspu.tb_modulo (
co_seq_modulo        numeric(8)           not null 
      constraint nn_modulo_coseqmodulo check (co_seq_modulo is not null),
co_sistema           numeric(8)           not null 
      constraint nn_modulo_cosistema check (co_sistema is not null),
sg_modulo            varchar(20)          not null 
      constraint nn_modulo_sgmodulo check (sg_modulo is not null),
ds_modulo            varchar(300)         null,
tp_operacao_seguranca varchar(1)           null,
dt_operacao_seguranca date                 null,
nu_responsavel_operacao numeric(8)           null,
constraint pk_modulo primary key (co_seq_modulo, co_sistema)
);

comment on table dbcspu.tb_modulo is
'Tabela de  Módulos do Sistemas';

comment on column dbcspu.tb_modulo.co_seq_modulo is
'Código Sequencial do Módulo';

comment on column dbcspu.tb_modulo.co_sistema is
'Código do Sistema';

comment on column dbcspu.tb_modulo.sg_modulo is
'Sigla do Módulo';

comment on column dbcspu.tb_modulo.ds_modulo is
'Descrição do Módulo';

comment on column dbcspu.tb_modulo.tp_operacao_seguranca is
'Tipo da Operação Executada (I - Inserção e U - Update)';

comment on column dbcspu.tb_modulo.dt_operacao_seguranca is
'Data da Operação Executada';

comment on column dbcspu.tb_modulo.nu_responsavel_operacao is
'Usuário que Executou a operação';

/*==============================================================*/
/* Table: dbcspu.tb_sistema                                            */
/*==============================================================*/
create table dbcspu.tb_sistema (
co_seq_sistema       numeric(8)           not null 
      constraint nn_sistema_coseqsistema check (co_seq_sistema is not null),
sg_sistema           varchar(20)          not null 
      constraint nn_sistema_sgsistema check (sg_sistema is not null),
no_sistema           varchar(100)         null,
ds_sistema           varchar(300)         null,
ds_url               varchar(50)          null,
tp_operacao_seguranca varchar(1)           null,
dt_operacao_seguranca date                 null,
nu_responsavel_operacao numeric(8)           null,
constraint pk_sistema primary key (co_seq_sistema)
);

comment on table dbcspu.tb_sistema is
'Tabela de Sistemas';

comment on column dbcspu.tb_sistema.co_seq_sistema is
'Código Sequencial do Sistema';

comment on column dbcspu.tb_sistema.sg_sistema is
'Sigla do Sistema';

comment on column dbcspu.tb_sistema.no_sistema is
'Nome do Sistema';

comment on column dbcspu.tb_sistema.ds_sistema is
'Descrição do Sistema';

comment on column dbcspu.tb_sistema.ds_url is
'Nome do Sistema na WEB';

comment on column dbcspu.tb_sistema.tp_operacao_seguranca is
'Tipo da Operação Executada (I - Inserção e U - Update)';

comment on column dbcspu.tb_sistema.dt_operacao_seguranca is
'Data da Operação Executada';

comment on column dbcspu.tb_sistema.nu_responsavel_operacao is
'Usuário que Executou a operação';


/*==============================================================*/
/* Table: dbcspu.tb_usuario                                            */
/*==============================================================*/
create table dbcspu.tb_usuario (
co_seq_usuario       numeric(8)           not null 
      constraint nn_usuario_cosequsuario check (co_seq_usuario is not null),
co_sistema           numeric(8)           null ,
no_usuario           varchar(70)          null,
co_pais              numeric(4)           null,
co_estado            varchar(2)           null,
co_municipio         varchar(6)           null,
co_regional          numeric(8)           null,
no_login             varchar(50)          null,
ds_senha             varchar(15)          null,
st_ativo             varchar(1)           null,
st_expirado          varchar(1)           null,
tp_operacao_seguranca varchar(1)           null,
dt_operacao_seguranca date                 null,
nu_responsavel_operacao numeric(8)           null,
nu_cpf               varchar(11)          null,
st_usuario_uf        varchar(1)           null,
st_sistema_responsavel varchar(1)           null,
constraint pk_usuario primary key (co_seq_usuario)
);

comment on table dbcspu.tb_usuario is
'Tabela de Usuários';

comment on column dbcspu.tb_usuario.co_seq_usuario is
'Código Sequencial do Usuário';

comment on column dbcspu.tb_usuario.co_sistema is
'Código do Sistema de Responsabilidade do Usuário';

comment on column dbcspu.tb_usuario.no_usuario is
'Descrição do Nome do Usuário';

comment on column dbcspu.tb_usuario.co_pais is
'Código do País';

comment on column dbcspu.tb_usuario.co_estado is
'Código do Estado';

comment on column dbcspu.tb_usuario.co_municipio is
'Código do Município';

comment on column dbcspu.tb_usuario.co_regional is
'Código da Regional';

comment on column dbcspu.tb_usuario.no_login is
'Login do Usuário';

comment on column dbcspu.tb_usuario.ds_senha is
'Senha do Usuário';

comment on column dbcspu.tb_usuario.st_ativo is
'Situação do Usuário - Ativo? sim ou não';

comment on column dbcspu.tb_usuario.st_expirado is
'Exigir a troca de senha ao usuário';

comment on column dbcspu.tb_usuario.tp_operacao_seguranca is
'Tipo da Operação Executada (I - Inserção e U - Update)';

comment on column dbcspu.tb_usuario.dt_operacao_seguranca is
'Data da Operação Executada';

comment on column dbcspu.tb_usuario.nu_responsavel_operacao is
'Usuário que Executou a operação';

comment on column dbcspu.tb_usuario.nu_cpf is
'CPF do Usuário';

comment on column dbcspu.tb_usuario.st_usuario_uf is
'Se o usuário irá cadastrar apenas seu Estado';

comment on column dbcspu.tb_usuario.st_sistema_responsavel is
'Se o Usuário é responsável Federal por Algum Sistema';


alter table dbcspu.rl_funcao_grupo_permissao
   add constraint fk_funcaogrupopermissao_funcao foreign key (co_funcao, co_modulo, co_sistema)
      references dbcspu.tb_funcao (co_seq_funcao, co_modulo, co_sistema)
      on delete cascade on update restrict;

alter table dbcspu.rl_funcao_grupo_permissao
   add constraint fk_funcaogrupopermissao_grupo foreign key (co_grupo)
      references dbcspu.tb_grupo (co_seq_grupo)
      on delete cascade on update restrict;

alter table dbcspu.rl_grupo_usuario
   add constraint fk_grupo_usuario_grupo foreign key (co_grupo)
      references dbcspu.tb_grupo (co_seq_grupo)
      on delete restrict on update restrict;

alter table dbcspu.rl_grupo_usuario
   add constraint fk_grupousuario_usuario foreign key (co_usuario)
      references dbcspu.tb_usuario (co_seq_usuario)
      on delete restrict on update restrict;

alter table dbcspu.rl_usuario_sistema
   add constraint fk_usuariosistema_sistema foreign key (co_sistema)
      references dbcspu.tb_sistema (co_seq_sistema)
      on delete restrict on update restrict;

alter table dbcspu.rl_usuario_sistema
   add constraint fk_usuariosistema_usuario foreign key (co_usuario)
      references dbcspu.tb_usuario (co_seq_usuario)
      on delete restrict on update restrict;

alter table dbcspu.tb_funcao
   add constraint fk_funcao_modulo foreign key (co_modulo, co_sistema)
      references dbcspu.tb_modulo (co_seq_modulo, co_sistema)
      on delete cascade on update restrict;

alter table dbcspu.tb_log
   add constraint fk_log_sistema foreign key (co_sistema)
      references dbcspu.tb_sistema (co_seq_sistema)
      on delete restrict on update restrict;

alter table dbcspu.tb_log
   add constraint fk_usuario_log foreign key (co_usuario)
      references dbcspu.tb_usuario (co_seq_usuario)
      on delete restrict on update restrict;

alter table dbcspu.tb_modulo
   add constraint fk_modulo_sistema foreign key (co_sistema)
      references dbcspu.tb_sistema (co_seq_sistema)
      on delete cascade on update restrict;

alter table dbcspu.tb_usuario
   add constraint fk_usuario_sistema foreign key (co_sistema)
      references dbcspu.tb_sistema (co_seq_sistema)
      on delete restrict on update restrict;

