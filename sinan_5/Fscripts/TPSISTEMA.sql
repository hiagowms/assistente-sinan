CREATE OR REPLACE FUNCTION dbsinan.Atualiza_Tpsistema()
  RETURNS trigger AS $$
Begin
   IF (TG_OP = 'INSERT' or TG_OP = 'UPDATE') THEN
      IF (new.tp_sistema is null or new.tp_sistema = '') THEN
         new.tp_sistema = '1';
      END IF;
   RETURN NEW;
   END IF;
End;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "Atualiza_Tpsistema"
  BEFORE INSERT OR UPDATE
  ON dbsinan.tb_notificacao
  FOR EACH ROW
  EXECUTE PROCEDURE dbsinan.atualiza_tpsistema();
COMMENT ON TRIGGER "Atualiza_Tpsistema" ON dbsinan.tb_notificacao IS 'Atualiza a coluna TP_SISTEMA quando o registro for nulo: vindo de fluxo ou recebimento';

