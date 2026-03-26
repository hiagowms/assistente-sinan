SET search_path = dbsinan;

CREATE OR REPLACE FUNCTION DBSINAN.AtualizaCodigo()
  RETURNS trigger AS $$

Begin

   IF (TG_OP = 'INSERT') THEN
      new.ts_codigo1 = public.to_tsvector('simple', DBSINAN.aplicasoundex(new.no_nome_paciente));
      new.ts_codigo2 = public.to_tsvector('simple', DBSINAN.aplicasoundex(new.no_nome_mae));
      RETURN NEW;
   END IF;
   IF (TG_OP = 'UPDATE') THEN
      IF (new.no_nome_paciente <> old.no_nome_paciente) THEN
         new.ts_codigo1 = public.to_tsvector('simple', DBSINAN.aplicasoundex(new.no_nome_paciente));
      END IF;
      IF (new.no_nome_mae <> old.no_nome_mae) THEN
         new.ts_codigo2 = public.to_tsvector('simple', DBSINAN.aplicasoundex(new.no_nome_mae));
      END IF;
   RETURN NEW;
   END IF;

End;
$$ LANGUAGE plpgsql


