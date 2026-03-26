SET search_path = dbsinan;

CREATE or replace FUNCTION DecriptografaNova( S varchar) RETURNS varchar AS $$
declare

  InputString varchar;

  OutputString varchar;

  CharConst varchar;

  x Integer;

  i Integer;

  z Integer;
 
Begin

  CharConst = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  InputString = S;

  OutputString = '';

  z = Length(InputString);

  If z > 0 then

    For i in 1..z Loop

      x = strpos(CharConst,substr(InputString,i,1));
    
      If x > 0 then

        OutputString = OutputString|| dbsinan.GetChar(x - i - z);

      Else

        OutputString = OutputString||substr(InputString,i,1);

      End If;

    End Loop;

    return OutputString;

  Else

    return OutputString;

  End If;

End;
$$ LANGUAGE plpgsql;