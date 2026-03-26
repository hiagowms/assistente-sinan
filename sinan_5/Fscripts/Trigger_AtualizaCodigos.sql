CREATE TRIGGER "AtualizaCodigo"
  BEFORE INSERT OR UPDATE
  ON dbsinan.tb_notificacao
  FOR EACH ROW
  EXECUTE PROCEDURE dbsinan.atualizacodigo();
COMMENT ON TRIGGER "AtualizaCodigo" ON dbsinan.tb_notificacao IS 'Atualiza Codigo';
