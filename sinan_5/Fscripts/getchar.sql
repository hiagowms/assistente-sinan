SET search_path = dbsinan;

CREATE or replace FUNCTION Getchar( i integer) RETURNS varchar AS $$

declare

  CharConst varchar;

  z Integer;

  x Integer;
   
Begin

  CharConst = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  z = Length(CharConst);
 
  x = i;
 
  while x > z Loop

    x = x - z;

  End Loop;

  while x < 1 Loop

    x = x + z;

  End Loop;

  RETURN substr(CharConst,x,1);


End;
$$ LANGUAGE plpgsql;