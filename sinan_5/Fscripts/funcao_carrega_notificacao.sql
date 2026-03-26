SET search_path = dbsinan;

CREATE OR REPLACE FUNCTION CarregaNotificacao() RETURNS varchar AS $$
DECLARE

   cursor1 CURSOR FOR SELECT nu_notificacao, dt_notificacao, co_cid, co_municipio_notificacao
                    FROM dbsinan.tb_notificacao
                    WHERE no_nome_paciente is not null
                    and ts_codigo1 is null;

   v_nu_notificacao varchar(7);
   v_dt_notificacao date;
   v_co_cid varchar(5);
   v_co_municipio_notificacao varchar(6);


BEGIN

   OPEN cursor1;
   FETCH cursor1 INTO v_nu_notificacao, v_dt_notificacao, v_co_cid, v_co_municipio_notificacao;
   WHILE FOUND LOOP

      UPDATE dbsinan.tb_notificacao
      SET ts_codigo1 = public.to_tsvector('simple', dbsinan.aplicasoundex(no_nome_paciente)),
          ts_codigo2 = public.to_tsvector('simple', dbsinan.aplicasoundex(no_nome_mae))
      WHERE nu_notificacao = v_nu_notificacao
      AND dt_notificacao = v_dt_notificacao
      AND co_cid = v_co_cid
      AND co_municipio_notificacao = v_co_municipio_notificacao;
      
   FETCH cursor1 INTO v_nu_notificacao, v_dt_notificacao, v_co_cid, v_co_municipio_notificacao;
   END LOOP;
   CLOSE cursor1;

   RETURN 'OK';
   
END;
$$ LANGUAGE plpgsql;