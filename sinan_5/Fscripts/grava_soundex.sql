SET search_path = dbsinan;

CREATE or replace FUNCTION AplicaSoundex( S varchar) RETURNS varchar AS $$
declare

  texto_Entrada varchar;
  separador varchar;
  texto_Saida varchar;
  pos_Inic Integer;
  i Integer;
  tam_texto Integer;
 
Begin

  texto_Entrada = trim(dbsinan.decriptografanova(S));
  Separador = ' ';
  texto_Saida = '';
  tam_texto = Length(texto_Entrada);
  pos_Inic = 1;

  If tam_texto > 0 then

    For i in 1..tam_texto Loop

      If (substr(texto_Entrada,i,1) = Separador) or (i = tam_texto) then

        If i < tam_texto then
        
          texto_Saida = texto_Saida||public.soundex(substr(texto_Entrada,pos_Inic,i-pos_Inic))||Separador;
          pos_Inic = i+1;

        Else

          texto_Saida = texto_Saida||public.soundex(substr(texto_Entrada,pos_Inic,(i+1)-pos_Inic));
          
        End If;

      End If;

    End Loop;

  End If;

  return texto_Saida;

End;
$$ LANGUAGE plpgsql;